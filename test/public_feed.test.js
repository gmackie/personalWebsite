const assert = require('node:assert/strict');
const { readFile } = require('node:fs/promises');
const { test } = require('node:test');
const vm = require('node:vm');

const sourcePath = require.resolve('../js/public-feed.js');

async function runConsumer(payloads) {
  const source = await readFile(sourcePath, 'utf8');
  const requests = [];

  let resolveEvent;
  const event = new Promise((resolve) => {
    resolveEvent = resolve;
  });

  const document = {
    readyState: 'complete',
    getElementById(id) {
      if (id !== 'public-feed-config') return null;
      return {
        textContent: JSON.stringify({
          enabled: true,
          manifest_url: 'https://forgegraf.test/manifest',
          fetch_timeout_ms: 100,
          site_target: 'gmac',
        }),
      };
    },
    querySelectorAll() {
      return [];
    },
    dispatchEvent(dispatched) {
      resolveEvent(dispatched);
    },
  };

  const context = {
    AbortController,
    CustomEvent: class CustomEvent {
      constructor(type, init) {
        this.type = type;
        this.detail = init && init.detail;
      }
    },
    URL,
    clearTimeout,
    console,
    document,
    fetch: async (url) => {
      requests.push(url);
      if (payloads[url] instanceof Error) throw payloads[url];
      return {
        ok: true,
        async json() {
          return payloads[url];
        },
      };
    },
    setTimeout,
    window: { location: { search: '' } },
  };

  vm.runInNewContext(source, context, { filename: sourcePath });
  return { dispatched: await event, requests };
}

test('loads apps, events, and summary resources from one manifest generation', async () => {
  const manifest = {
    generation_id: 'generation-1',
    apps_url: 'https://forgegraf.test/apps',
    events_url: 'https://forgegraf.test/events',
    summary_url: 'https://forgegraf.test/summary',
  };
  const apps = { apps: [{ slug: 'forgegraph' }] };
  const events = { items: [{ id: 'evt-1' }] };
  const summary = { counts: { total: 1, healthy: 1 } };

  const result = await runConsumer({
    'https://forgegraf.test/manifest': manifest,
    'https://forgegraf.test/apps': apps,
    'https://forgegraf.test/events': events,
    'https://forgegraf.test/summary': summary,
  });

  assert.equal(result.dispatched.type, 'public-feed:loaded');
  assert.deepEqual(result.requests.sort(), [
    'https://forgegraf.test/apps',
    'https://forgegraf.test/events',
    'https://forgegraf.test/manifest',
    'https://forgegraf.test/summary',
  ]);
  assert.equal(result.dispatched.detail.manifest.generation_id, 'generation-1');
  assert.equal(result.dispatched.detail.apps.apps[0].slug, 'forgegraph');
  assert.equal(result.dispatched.detail.events.items[0].id, 'evt-1');
  assert.equal(result.dispatched.detail.summary.counts.healthy, 1);
});

test('hydrates apps when optional activity resources fail', async () => {
  const manifest = {
    generation_id: 'generation-2',
    apps_url: 'https://forgegraf.test/apps',
    events_url: 'https://forgegraf.test/events',
    summary_url: 'https://forgegraf.test/summary',
  };
  const apps = { apps: [{ slug: 'forgegraph', public_status: 'healthy' }] };

  const result = await runConsumer({
    'https://forgegraf.test/manifest': manifest,
    'https://forgegraf.test/apps': apps,
    'https://forgegraf.test/events': new Error('events unavailable'),
    'https://forgegraf.test/summary': new Error('summary unavailable'),
  });

  assert.equal(result.dispatched.type, 'public-feed:loaded');
  assert.equal(result.dispatched.detail.apps.apps[0].public_status, 'healthy');
  assert.equal(result.dispatched.detail.events, null);
  assert.equal(result.dispatched.detail.summary, null);
});
