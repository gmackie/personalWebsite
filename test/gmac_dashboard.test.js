const assert = require('node:assert/strict');
const { readFile } = require('node:fs/promises');
const { test } = require('node:test');
const vm = require('node:vm');

async function loadDashboardApi(document) {
  const sourcePath = require.resolve('../js/gmac-dashboard.js');
  const source = await readFile(sourcePath, 'utf8');
  const context = { URL, window: {} };
  if (document) context.document = document;
  vm.runInNewContext(source, context, { filename: sourcePath });
  return context.window.GmacDashboard;
}

test('builds truthful summary metrics with app data as a fallback', async () => {
  const dashboard = await loadDashboardApi();
  const model = dashboard.buildSummaryModel(
    { counts: { total: 3, healthy: 2, degraded: 1, down: 0 }, deploys_last_24h: 4 },
    { apps: [{ public_status: 'healthy' }] },
  );

  assert.deepEqual(JSON.parse(JSON.stringify(model)), {
    total: 3,
    healthy: 2,
    degraded: 1,
    down: 0,
    deploys: 4,
  });
});

test('does not claim zero deploys when summary data is unavailable', async () => {
  const dashboard = await loadDashboardApi();
  const model = dashboard.buildSummaryModel(null, {
    apps: [{ public_status: 'healthy' }],
  });

  assert.equal(model.deploys, '\u2014');
});

test('renders clip evidence while escaping feed-authored text', async () => {
  const dashboard = await loadDashboardApi();
  const markup = dashboard.renderEventMarkup({
    id: 'evt-1',
    app_slug: 'forgegraph',
    event_type: 'deployment_succeeded',
    occurred_at: '2026-08-05T00:00:00Z',
    headline: '<script>alert(1)</script>',
    summary: 'Production deploy succeeded.',
    status_impact: 'positive',
    tags: ['deploy', '<unsafe>'],
    artifacts: [
      {
        kind: 'clip',
        url: 'https://forgegraf.test/clip.webm',
        alt: 'ForgeGraph UI clip',
      },
      {
        kind: 'thumbnail',
        url: 'https://forgegraf.test/poster.jpg',
      },
    ],
  });

  assert.match(markup, /<video/);
  assert.match(markup, /poster="https:\/\/forgegraf\.test\/poster\.jpg"/);
  assert.match(markup, /&lt;script&gt;alert\(1\)&lt;\/script&gt;/);
  assert.match(markup, /&lt;unsafe&gt;/);
  assert.doesNotMatch(markup, /<script>alert/);
});

test('keeps video evidence visible ahead of the activity limit', async () => {
  const dashboard = await loadDashboardApi();
  const screenshots = Array.from({ length: 10 }, (_, index) => ({
    id: `screenshot-${index}`,
    site_targets: ['gmac'],
    artifacts: [{ kind: 'screenshot', url: `https://forgegraf.test/${index}.jpg` }],
  }));
  const clip = {
    id: 'clip-1',
    site_targets: ['gmac'],
    artifacts: [{ kind: 'clip', url: 'https://forgegraf.test/clip.webm' }],
  };

  const selected = dashboard.eventsForSite({ items: screenshots.concat(clip) }, 'gmac');

  assert.equal(selected.length, 9);
  assert.equal(selected[0].id, 'clip-1');
  assert.equal(selected[1].id, 'screenshot-0');
});

test('restores the static fallback for an empty event generation', async () => {
  const activityRoot = {
    innerHTML: '<article>stale event</article>',
    setAttribute() {},
  };
  const fallback = { hidden: true };
  const document = {
    addEventListener() {},
    querySelector(selector) {
      if (selector === '[data-feed-activity-root]') return activityRoot;
      if (selector === '[data-feed-static-build-log]') return fallback;
      return null;
    },
  };
  const dashboard = await loadDashboardApi(document);

  dashboard.applyActivity({ events: { items: [] } });

  assert.equal(activityRoot.innerHTML, '');
  assert.equal(fallback.hidden, false);
});

test('marks the dashboard stale when a required refresh fails', async () => {
  const listeners = {};
  const syncLabel = { textContent: '' };
  const panel = {
    state: 'live',
    getAttribute(name) {
      return name === 'data-feed-state' ? this.state : null;
    },
    setAttribute(name, value) {
      if (name === 'data-feed-state') this.state = value;
    },
    querySelector(selector) {
      return selector === '[data-feed-sync-label]' ? syncLabel : null;
    },
  };
  const activityRoot = { setAttribute() {} };
  const document = {
    addEventListener(type, listener) {
      listeners[type] = listener;
    },
    querySelector(selector) {
      if (selector === '[data-feed-summary-panel]') return panel;
      if (selector === '[data-feed-activity-root]') return activityRoot;
      return null;
    },
  };
  await loadDashboardApi(document);

  listeners['public-feed:failed']();

  assert.equal(panel.state, 'stale');
  assert.equal(syncLabel.textContent, 'stale / refresh failed');

  panel.state = 'waiting';
  listeners['public-feed:failed']();

  assert.equal(panel.state, 'unavailable');
  assert.equal(syncLabel.textContent, 'unavailable');
});

test('removes health details from apps not targeted to gmac', async () => {
  let removed = false;
  const healthLine = { remove() { removed = true; } };
  const card = {
    getAttribute() { return 'forgegraph'; },
    querySelector() { return healthLine; },
  };
  const document = {
    addEventListener() {},
    querySelectorAll(selector) {
      return selector === '[data-feed-slug]' ? [card] : [];
    },
  };
  const dashboard = await loadDashboardApi(document);

  dashboard.applyCardHealth({
    apps: { apps: [{ slug: 'forgegraph', site_targets: ['gmacko'] }] },
  }, 'gmac');

  assert.equal(removed, true);
});

test('keeps lifecycle metadata separate from the health detail', async () => {
  const attributes = { 'data-feed-slug': 'forgegraph' };
  let healthLine = null;
  const card = {
    getAttribute(name) { return attributes[name] || null; },
    setAttribute(name, value) { attributes[name] = value; },
    appendChild(line) { healthLine = line; },
    querySelector(selector) {
      return selector === '[data-feed-health-line]' ? healthLine : null;
    },
  };
  const document = {
    addEventListener() {},
    createElement() {
      return {
        className: '',
        textContent: '',
        setAttribute() {},
      };
    },
    querySelectorAll(selector) {
      return selector === '[data-feed-slug]' ? [card] : [];
    },
  };
  const dashboard = await loadDashboardApi(document);

  dashboard.applyCardHealth({
    apps: {
      apps: [{
        slug: 'forgegraph',
        lifecycle: 'launched',
        public_status: 'degraded',
        site_targets: ['gmac'],
        endpoints_total: 2,
        endpoints_healthy: 1,
      }],
    },
  }, 'gmac');

  assert.equal(attributes['data-feed-lifecycle'], 'launched');
  assert.equal(healthLine.textContent, 'degraded / 1/2 checks');
});
