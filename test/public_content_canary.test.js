const assert = require('node:assert/strict');
const { readFile } = require('node:fs/promises');
const { test } = require('node:test');

const {
  validateCors,
  validateHealthConvergence,
  validateManifest,
  validateSummary,
  runCanary,
} = require('../scripts/public-content-canary.js');

const generationId = '2026-08-11T03-36-38-841Z';
const commitHash = 'a'.repeat(40);

function manifest(overrides = {}) {
  const base = 'https://forgegraf.test/api/public/feed';
  return {
    generation_id: generationId,
    published_at: '2026-08-11T03:36:38.841Z',
    apps_url: `${base}/apps?generation_id=${generationId}`,
    events_url: `${base}/events?generation_id=${generationId}`,
    summary_url: `${base}/summary?generation_id=${generationId}`,
    timeline_url: `${base}/timeline?generation_id=${generationId}`,
    ...overrides,
  };
}

test('accepts a fresh manifest whose resources share one generation', () => {
  const result = validateManifest(manifest(), {
    now: new Date('2026-08-11T03:40:00.000Z'),
    maxAgeMs: 15 * 60 * 1000,
  });

  assert.equal(result.generationId, generationId);
  assert.equal(result.ageSeconds, 201);
});

test('rejects a stale manifest', () => {
  assert.throws(
    () => validateManifest(manifest(), {
      now: new Date('2026-08-11T04:00:00.000Z'),
      maxAgeMs: 15 * 60 * 1000,
    }),
    /manifest is stale/,
  );
});

test('rejects a manifest timestamp too far in the future', () => {
  assert.throws(
    () => validateManifest(manifest({
      published_at: '2026-08-11T04:00:00.000Z',
    }), { now: new Date('2026-08-11T03:40:00.000Z') }),
    /manifest timestamp is in the future/,
  );
});

test('rejects a resource URL from a different generation', () => {
  assert.throws(
    () => validateManifest(manifest({
      events_url: 'https://forgegraf.test/api/public/feed/events?generation_id=other',
    }), { now: new Date('2026-08-11T03:40:00.000Z') }),
    /events_url generation mismatch/,
  );
});

test('requires feed responses to allow the public site origin', () => {
  assert.doesNotThrow(() => validateCors('*', 'https://gmac.io'));
  assert.doesNotThrow(() => validateCors('https://gmac.io', 'https://gmac.io'));
  assert.throws(
    () => validateCors('https://private.example', 'https://gmac.io'),
    /does not allow https:\/\/gmac.io/,
  );
});

test('rejects summary counts that contradict the app inventory', () => {
  const apps = {
    apps: [
      { slug: 'forgegraph', public_status: 'healthy' },
      { slug: 'bizpulse', public_status: 'degraded' },
    ],
  };

  assert.throws(
    () => validateSummary({
      counts: { total: 3, healthy: 2, degraded: 1, down: 0 },
    }, apps),
    /summary total 3 does not match 2 apps/,
  );
});

test('rejects status buckets that contradict app health', () => {
  assert.throws(
    () => validateSummary({
      counts: { total: 2, healthy: 2, degraded: 0, down: 0 },
    }, {
      apps: [
        { slug: 'forgegraph', public_status: 'healthy' },
        { slug: 'bizpulse', public_status: 'degraded' },
      ],
    }),
    /summary degraded 0 does not match 1 apps/,
  );
});

test('rejects an empty public app inventory', () => {
  assert.throws(
    () => validateSummary({ counts: { total: 0 } }, { apps: [] }),
    /public app inventory is empty/,
  );
});

test('requires all public site health endpoints to report one commit', () => {
  assert.equal(validateHealthConvergence([
    { domain: 'gmacko.com', commitHash },
    { domain: 'gmac.io', commitHash },
    { domain: 'grahammackie.com', commitHash },
  ]), commitHash);

  assert.throws(
    () => validateHealthConvergence([
      { domain: 'gmacko.com', commitHash: 'a'.repeat(40) },
      { domain: 'gmac.io', commitHash: 'b'.repeat(40) },
    ]),
    /site health commits diverged/,
  );

  assert.throws(
    () => validateHealthConvergence([
      { domain: 'gmacko.com', commitHash: 'unknown' },
      { domain: 'gmac.io', commitHash: 'unknown' },
      { domain: 'grahammackie.com', commitHash: 'unknown' },
    ]),
    /valid Git commit/,
  );
});

function jsonResponse(body, allowedOrigin = '*', cacheControl = 'public, max-age=60') {
  return new Response(JSON.stringify(body), {
    headers: {
      'access-control-allow-origin': allowedOrigin,
      'cache-control': cacheControl,
      'content-type': 'application/json',
    },
  });
}

function canaryFixture(overrides = {}) {
  const currentManifest = manifest();
  const manifestUrl = 'https://forgegraf.test/api/public/feed/manifest';
  const websiteUrl = 'https://gmac.test/';
  const healthUrls = [
    'https://gmacko.test/.well-known/forge-health',
    'https://gmac.test/.well-known/forge-health',
    'https://grahammackie.test/.well-known/forge-health',
  ];
  const responses = new Map([
    [manifestUrl, jsonResponse(currentManifest)],
    [currentManifest.apps_url, jsonResponse({ generation_id: generationId, apps: [
      { slug: 'forgegraph', public_status: 'healthy' },
    ] })],
    [currentManifest.events_url, jsonResponse({ generation_id: generationId, items: [] })],
    [currentManifest.summary_url, jsonResponse({
      generation_id: generationId,
      counts: { total: 1, healthy: 1, degraded: 0, down: 0 },
      deploys_last_24h: 2,
    })],
    [currentManifest.timeline_url, jsonResponse({ generation_id: generationId, items: [] })],
    [websiteUrl, new Response(
      '<script id="public-feed-config" type="application/json">' +
      JSON.stringify({ enabled: true, manifest_url: manifestUrl }) +
      '</script>' +
      '<script src="/js/public-feed.js"></script><script src="/js/gmac-dashboard.js"></script>',
    )],
    ...healthUrls.map((url) => [url, jsonResponse({ commitHash })]),
  ]);

  for (const [url, response] of Object.entries(overrides)) responses.set(url, response);

  return {
    manifestUrl,
    websiteUrl,
    healthUrls,
    fetchImpl: async (url) => {
      const response = responses.get(url);
      if (!response) return new Response('missing fixture', { status: 404 });
      return response.clone();
    },
  };
}

test('checks the live feed, public bootstrap, and converged site health', async () => {
  const result = await runCanary({
    ...canaryFixture(),
    now: new Date('2026-08-11T03:40:00.000Z'),
  });

  assert.deepEqual(result, {
    status: 'ok',
    generationId,
    publishedAt: '2026-08-11T03:36:38.841Z',
    ageSeconds: 201,
    apps: 1,
    events: 0,
    timeline: 0,
    deploysLast24h: 2,
    healthCommit: commitHash,
    sites: 3,
  });
});

test('rejects a generation resource body with a mismatched generation', async () => {
  const currentManifest = manifest();
  const fixture = canaryFixture({
    [currentManifest.events_url]: jsonResponse({ generation_id: 'other', items: [] }),
  });

  await assert.rejects(
    () => runCanary({ ...fixture, now: new Date('2026-08-11T03:40:00.000Z') }),
    /events generation mismatch/,
  );
});

test('rejects a disabled public-feed bootstrap', async () => {
  const fixture = canaryFixture({
    'https://gmac.test/': new Response(
      `<script id="public-feed-config" type="application/json">` +
      '{"enabled":false,"manifest_url":"https://forgegraf.test/api/public/feed/manifest"}' +
      '</script><script src="/js/public-feed.js"></script>' +
      '<script src="/js/gmac-dashboard.js"></script>',
    ),
  });

  await assert.rejects(
    () => runCanary({ ...fixture, now: new Date('2026-08-11T03:40:00.000Z') }),
    /public-feed hydration is disabled/,
  );
});

test('rejects a defensive feed fallback while allowing an empty happy-path timeline', async () => {
  const currentManifest = manifest();
  const fixture = canaryFixture({
    [currentManifest.events_url]: jsonResponse(
      { generation_id: generationId, items: [] },
      '*',
      'public, max-age=10',
    ),
  });

  await assert.rejects(
    () => runCanary({ ...fixture, now: new Date('2026-08-11T03:40:00.000Z') }),
    /events is serving a defensive fallback/,
  );
});

test('checks feed CORS for both public website origins', async () => {
  const fixture = canaryFixture();
  const seenOrigins = new Set();
  const fetchImpl = async (url, options = {}) => {
    if (String(url).startsWith('https://forgegraf.test/')) {
      seenOrigins.add(options.headers && options.headers.Origin);
    }
    return fixture.fetchImpl(url, options);
  };

  await runCanary({
    ...fixture,
    fetchImpl,
    now: new Date('2026-08-11T03:40:00.000Z'),
  });

  assert.deepEqual([...seenOrigins].sort(), ['https://gmac.io', 'https://gmacko.com']);
});

test('schedules the production canary every five minutes with dedicated logs', async () => {
  const [plist, installer] = await Promise.all([
    readFile('ops/launchd/com.gmacko.public-content-canary.plist.in', 'utf8'),
    readFile('scripts/install-public-content-canary.sh', 'utf8'),
  ]);

  assert.match(plist, /<string>com\.gmacko\.public-content-canary<\/string>/);
  assert.match(plist, /scripts\/public-content-canary\.js/);
  assert.match(plist, /<integer>300<\/integer>/);
  assert.match(plist, /public-content-canary\.log/);
  assert.match(plist, /public-content-canary\.error\.log/);
  assert.match(installer, /com\.gmacko\.public-content-canary/);
  assert.match(installer, /launchctl bootstrap/);
  assert.match(installer, /launchctl kickstart -k/);
});
