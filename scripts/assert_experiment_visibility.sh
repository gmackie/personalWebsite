#!/usr/bin/env bash

set -euo pipefail

ROOT="${1:-.}"
cd "$ROOT"

fail() {
  echo "FAIL: $1" >&2
  exit 1
}

GMAC_DEST="_site_gmac_test"
GMACKO_DEST="_site_gmacko_test"

~/.rbenv/shims/bundle exec jekyll build --config _config.yml,_config.gmac.yml --destination "$GMAC_DEST" >/dev/null
~/.rbenv/shims/bundle exec jekyll build --config _config.yml,_config.gmacko.yml --destination "$GMACKO_DEST" >/dev/null

[ -f "$GMAC_DEST/index.html" ] || fail "missing gmac.io dashboard build"
[ -f "$GMAC_DEST/lab/index.html" ] || fail "missing gmac.io lab build"
[ -f "$GMACKO_DEST/index.html" ] || fail "missing gmacko landing build"

grep -q "bizpulse.cc" "$GMAC_DEST/index.html" || fail "gmac.io dashboard missing bizpulse.cc"
grep -q "blder.bot" "$GMAC_DEST/index.html" || fail "gmac.io dashboard missing blder.bot"

grep -q "bizpulse.cc" "$GMAC_DEST/lab/index.html" || fail "gmac.io lab missing bizpulse.cc"
grep -q "blder.bot" "$GMAC_DEST/lab/index.html" || fail "gmac.io lab missing blder.bot"

grep -q "bizpulse.cc" "$GMACKO_DEST/index.html" || fail "gmacko landing missing bizpulse.cc"
grep -q "blder.bot" "$GMACKO_DEST/index.html" || fail "gmacko landing missing blder.bot"

for dest in "$GMAC_DEST" "$GMACKO_DEST"; do
  [ -f "$dest/.well-known/forge-health" ] || fail "$dest missing /.well-known/forge-health"
  python3 -c "import json,sys; json.load(open('$dest/.well-known/forge-health'))" || fail "$dest /.well-known/forge-health is not valid JSON"
  grep -q '"version": "1.0"' "$dest/.well-known/forge-health" || fail "$dest forge-health missing version 1.0"
  [ -f "$dest/_headers" ] || fail "$dest missing _headers for Cloudflare Pages"
done

grep -q 'id="public-feed-config"' "$GMAC_DEST/index.html" || fail "gmac.io dashboard missing public-feed bootstrap"
grep -q 'data-public-feed-root="gmac"' "$GMAC_DEST/index.html" || fail "gmac.io dashboard missing public-feed root marker"
grep -q 'data-feed-target="services"' "$GMAC_DEST/index.html" || fail "gmac.io dashboard missing services hydration target"
grep -q 'data-feed-target="prototypes"' "$GMAC_DEST/index.html" || fail "gmac.io dashboard missing prototypes hydration target"
[ -f "$GMAC_DEST/js/public-feed.js" ] || fail "gmac.io build missing js/public-feed.js"

echo "PASS: experiment visibility + feed hydration wiring present on gmac.io and gmacko"
