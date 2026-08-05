#!/usr/bin/env bash

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
FIXTURE="$ROOT/_posts/2099-01-01-build-update-surface-fixture.md"
DEST="$(mktemp -d "${TMPDIR:-/tmp}/gmacko-build-update.XXXXXX")"

cleanup() {
  rm -f "$FIXTURE"
  rm -rf "$DEST"
}
trap cleanup EXIT

fail() {
  echo "FAIL: $1" >&2
  exit 1
}

cat > "$FIXTURE" <<'EOF'
---
layout: post
title: "Build update surface fixture"
date: 2099-01-01
site: gmacko
post_type: build-update
venture_slug: forgegraph
excerpt: "Fixture proving that build evidence stays separate from editorial writing."
tags: [forgegraph, build-update]
source_event_ids: [evt_surface_fixture]
evidence:
  - label: "UI proof"
    url: "https://example.com/ui-proof.png"
---

This fixture exists only while the rendered-site test runs.
EOF

cd "$ROOT"
bundle exec jekyll build --future \
  --config _config.yml,_config.gmacko.yml \
  --destination "$DEST" >/dev/null

HOME_PAGE="$DEST/index.html"
VENTURE_PAGE="$DEST/ventures/forgegraph/index.html"
POST_PAGE="$DEST/articles/2099-01/build-update-surface-fixture.html"

[ -f "$HOME_PAGE" ] || fail "missing gmacko home page"
[ -f "$VENTURE_PAGE" ] || fail "missing ForgeGraph venture page"
[ -f "$POST_PAGE" ] || fail "missing build update page"

grep -q 'data-build-update-title="Build update surface fixture"' "$HOME_PAGE" || fail "home page missing build update rail entry"
if grep -q 'data-editorial-title="Build update surface fixture"' "$HOME_PAGE"; then
  fail "build update leaked into editorial writing lane"
fi

grep -q 'data-venture-proof-title="Build update surface fixture"' "$VENTURE_PAGE" || fail "venture page missing proof rail entry"
grep -q 'Build update' "$POST_PAGE" || fail "post missing build update identity"
grep -q 'ForgeGraph event' "$POST_PAGE" || fail "post missing source event label"
grep -q 'evt_surface_fixture' "$POST_PAGE" || fail "post missing source event id"
grep -q 'UI proof' "$POST_PAGE" || fail "post missing evidence link"
grep -q 'Human-written field notes' "$POST_PAGE" || fail "post missing authorship boundary"

echo "PASS: build updates render as portfolio proof, not editorial"
