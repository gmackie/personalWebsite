#!/usr/bin/env bash

set -euo pipefail

ROOT="${1:-.}"
cd "$ROOT"

fail() {
  echo "FAIL: $1" >&2
  exit 1
}

DEST="_site_gmac_live_wall_test"
bundle exec jekyll build --config _config.yml,_config.gmac.yml --destination "$DEST" >/dev/null

[ -f "$DEST/index.html" ] || fail "missing gmac.io dashboard build"
[ -f "$DEST/js/gmac-dashboard.js" ] || fail "missing gmac dashboard runtime"
grep -q 'data-feed-summary-panel' "$DEST/index.html" || fail "missing live summary panel"
grep -q 'data-feed-activity-root' "$DEST/index.html" || fail "missing live activity root"
grep -q 'data-feed-static-build-log' "$DEST/index.html" || fail "missing static build-log fallback"
grep -q '/js/gmac-dashboard.js' "$DEST/index.html" || fail "missing gmac dashboard script"
grep -q '"refresh_interval_ms"' "$DEST/index.html" || fail "missing feed refresh interval"

echo "PASS: gmac.io renders live summary and activity hydration targets"
