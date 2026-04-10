#!/usr/bin/env bash

set -euo pipefail

ROOT="${1:-.}"
cd "$ROOT"

fail() {
  echo "FAIL: $1" >&2
  exit 1
}

GMACKO_DEST="_site_gmacko_test"

~/.rbenv/shims/bundle exec jekyll build --config _config.yml,_config.gmacko.yml --destination "$GMACKO_DEST" >/dev/null

[ -f "$GMACKO_DEST/index.html" ] || fail "missing gmacko landing build"

grep -q "data-public-feed-landing" "$GMACKO_DEST/index.html" || fail "gmacko landing missing public feed bootstrap"
grep -q 'data-feed-grid="infrastructure-ai"' "$GMACKO_DEST/index.html" || fail "gmacko landing missing infrastructure feed grid"
grep -q 'data-feed-grid="experiments"' "$GMACKO_DEST/index.html" || fail "gmacko landing missing experiments feed grid"
grep -q "/js/gmacko-public-feed.js" "$GMACKO_DEST/index.html" || fail "gmacko landing missing feed script"
grep -q "bizpulse.cc" "$GMACKO_DEST/index.html" || fail "gmacko landing missing bizpulse.cc fallback"
grep -q "blder.bot" "$GMACKO_DEST/index.html" || fail "gmacko landing missing blder.bot fallback"

echo "PASS: gmacko feed-backed sections keep fallback portfolio content and bootstrap markers"
