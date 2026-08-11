#!/usr/bin/env node

'use strict';

const RESOURCE_KEYS = ['apps_url', 'events_url', 'summary_url', 'timeline_url'];

function validateManifest(manifest, options = {}) {
  const now = options.now || new Date();
  const maxAgeMs = options.maxAgeMs || 15 * 60 * 1000;
  const maxFutureSkewMs = options.maxFutureSkewMs ?? 5 * 60 * 1000;
  const generationId = manifest && manifest.generation_id;
  const publishedAt = new Date(manifest && manifest.published_at).getTime();

  if (!generationId) throw new Error('manifest is missing generation_id');
  if (!Number.isFinite(publishedAt)) throw new Error('manifest has invalid published_at');

  const ageMs = now.getTime() - publishedAt;
  if (ageMs < -maxFutureSkewMs) {
    throw new Error(
      `manifest timestamp is in the future by ${Math.ceil(Math.abs(ageMs) / 1000)} seconds`,
    );
  }
  if (ageMs > maxAgeMs) {
    throw new Error(`manifest is stale by ${Math.floor(ageMs / 1000)} seconds`);
  }

  for (const key of RESOURCE_KEYS) {
    const value = manifest[key];
    let url;
    try {
      url = new URL(value);
    } catch (_) {
      throw new Error(`manifest has invalid ${key}`);
    }
    if (url.protocol !== 'https:') throw new Error(`${key} must use https`);
    if (url.searchParams.get('generation_id') !== generationId) {
      throw new Error(`${key} generation mismatch`);
    }
  }

  return {
    generationId,
    publishedAt: manifest.published_at,
    ageSeconds: Math.max(0, Math.floor(ageMs / 1000)),
  };
}

function validateCors(allowedOrigin, origin) {
  if (allowedOrigin !== '*' && allowedOrigin !== origin) {
    throw new Error(`feed CORS does not allow ${origin}`);
  }
}

function validateFeedResponse(response, label, origin) {
  validateCors(response.headers.get('access-control-allow-origin'), origin);
  const cacheControl = response.headers.get('cache-control') || '';
  const maxAge = /(?:^|,)\s*max-age=(\d+)/i.exec(cacheControl);
  if (!maxAge || Number(maxAge[1]) < 60) {
    throw new Error(`${label} is serving a defensive fallback`);
  }
}

function validateSummary(summary, appsPayload) {
  const apps = (appsPayload && appsPayload.apps) || [];
  if (apps.length === 0) {
    throw new Error('public app inventory is empty');
  }

  const total = summary && summary.counts && summary.counts.total;
  if (total !== apps.length) {
    throw new Error(`summary total ${total} does not match ${apps.length} apps`);
  }

  const mismatches = [];
  for (const status of ['healthy', 'degraded', 'down', 'building', 'private', 'unknown']) {
    const reported = summary.counts[status] ?? 0;
    const actual = apps.filter((app) => app.public_status === status).length;
    if (reported !== actual) {
      mismatches.push(`summary ${status} ${reported} does not match ${actual} apps`);
    }
  }
  if (mismatches.length > 0) throw new Error(mismatches.join('; '));
}

function validateHealthConvergence(healthRows) {
  if (healthRows.some((row) => !/^[0-9a-f]{40}$/i.test(row.commitHash || ''))) {
    throw new Error('site health does not report a valid Git commit');
  }
  const commits = new Set(healthRows.map((row) => row.commitHash).filter(Boolean));
  if (commits.size !== 1 || healthRows.some((row) => !row.commitHash)) {
    throw new Error('site health commits diverged');
  }
  return commits.values().next().value;
}

function validateWebsiteBootstrap(websiteHtml, manifestUrl) {
  const configMatch = websiteHtml.match(
    /<script\b[^>]*\bid=["']public-feed-config["'][^>]*>([\s\S]*?)<\/script>/i,
  );
  if (!configMatch) throw new Error('public website is missing public-feed config');

  let config;
  try {
    config = JSON.parse(configMatch[1]);
  } catch (_) {
    throw new Error('public website has invalid public-feed config');
  }
  if (config.enabled !== true) throw new Error('public-feed hydration is disabled');
  if (config.manifest_url !== manifestUrl) {
    throw new Error(`public website is missing ${manifestUrl}`);
  }

  for (const required of ['/js/public-feed.js', '/js/gmac-dashboard.js']) {
    if (!websiteHtml.includes(required)) {
      throw new Error(`public website is missing ${required}`);
    }
  }
}

async function fetchChecked(fetchImpl, url, options = {}) {
  const response = await fetchImpl(url, options);
  if (!response.ok) throw new Error(`HTTP ${response.status} for ${url}`);
  return response;
}

async function runCanary(options = {}) {
  const fetchImpl = options.fetchImpl || fetch;
  const manifestUrl = options.manifestUrl || 'https://forgegraf.com/api/public/feed/manifest';
  const origins = options.origins || [options.origin || 'https://gmac.io', 'https://gmacko.com'];
  const primaryOrigin = origins[0];
  const websiteUrl = options.websiteUrl || 'https://gmac.io/';
  const healthUrls = options.healthUrls || [
    'https://gmacko.com/.well-known/forge-health',
    'https://gmac.io/.well-known/forge-health',
    'https://grahammackie.com/.well-known/forge-health',
  ];
  const timeoutMs = options.timeoutMs || 15_000;
  const requestOptions = {
    headers: { Origin: primaryOrigin },
    signal: AbortSignal.timeout(timeoutMs),
  };

  const manifestResponse = await fetchChecked(fetchImpl, manifestUrl, requestOptions);
  validateFeedResponse(manifestResponse, 'manifest', primaryOrigin);
  const manifest = await manifestResponse.json();
  const manifestState = validateManifest(manifest, {
    now: options.now,
    maxAgeMs: options.maxAgeMs,
  });

  const resourceEntries = await Promise.all(RESOURCE_KEYS.map(async (key) => {
    const response = await fetchChecked(fetchImpl, manifest[key], requestOptions);
    const label = key.replace('_url', '');
    validateFeedResponse(response, label, primaryOrigin);
    const payload = await response.json();
    if (payload.generation_id !== manifestState.generationId) {
      throw new Error(`${label} generation mismatch`);
    }
    return [label, payload];
  }));
  const resources = Object.fromEntries(resourceEntries);

  await Promise.all(origins.slice(1).flatMap((origin) => (
    [manifestUrl, ...RESOURCE_KEYS.map((key) => manifest[key])].map(async (url, index) => {
      const label = index === 0 ? 'manifest' : RESOURCE_KEYS[index - 1].replace('_url', '');
      const response = await fetchChecked(fetchImpl, url, {
        headers: { Origin: origin },
        signal: AbortSignal.timeout(timeoutMs),
      });
      validateFeedResponse(response, label, origin);
    })
  )));

  validateSummary(resources.summary, resources.apps);

  const websiteResponse = await fetchChecked(fetchImpl, websiteUrl, {
    signal: AbortSignal.timeout(timeoutMs),
  });
  const websiteHtml = await websiteResponse.text();
  validateWebsiteBootstrap(websiteHtml, manifestUrl);

  const healthRows = await Promise.all(healthUrls.map(async (url) => {
    const response = await fetchChecked(fetchImpl, url, {
      signal: AbortSignal.timeout(timeoutMs),
    });
    const payload = await response.json();
    return { domain: new URL(url).hostname, commitHash: payload.commitHash };
  }));

  return {
    status: 'ok',
    generationId: manifestState.generationId,
    publishedAt: manifestState.publishedAt,
    ageSeconds: manifestState.ageSeconds,
    apps: resources.apps.apps.length,
    events: resources.events.items.length,
    timeline: resources.timeline.items.length,
    deploysLast24h: resources.summary.deploys_last_24h,
    healthCommit: validateHealthConvergence(healthRows),
    sites: healthRows.length,
  };
}

async function main() {
  const result = await runCanary({
    maxAgeMs: Number(process.env.PUBLIC_FEED_MAX_AGE_MS || 15 * 60 * 1000),
    timeoutMs: Number(process.env.PUBLIC_FEED_TIMEOUT_MS || 15_000),
  });
  process.stdout.write(`${JSON.stringify(result)}\n`);
}

if (require.main === module) {
  main().catch((error) => {
    process.stderr.write(`public content canary failed: ${error.message}\n`);
    process.exitCode = 1;
  });
}

module.exports = {
  runCanary,
  validateCors,
  validateHealthConvergence,
  validateManifest,
  validateSummary,
};
