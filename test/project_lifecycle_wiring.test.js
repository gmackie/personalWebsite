const assert = require('node:assert/strict');
const { readFile } = require('node:fs/promises');
const { test } = require('node:test');

test('exposes lifecycle hydration targets on portfolio and dashboard surfaces', async () => {
  const [card, venture, dashboard] = await Promise.all([
    readFile('_includes/venture-card.html', 'utf8'),
    readFile('_layouts/venture.html', 'utf8'),
    readFile('_layouts/dashboard.html', 'utf8'),
  ]);

  assert.match(card, /data-feed-lifecycle-label/);
  assert.match(venture, /data-feed-slug=/);
  assert.match(venture, /data-feed-lifecycle-label/);
  assert.equal((dashboard.match(/data-feed-lifecycle-label/g) || []).length, 2);
});
