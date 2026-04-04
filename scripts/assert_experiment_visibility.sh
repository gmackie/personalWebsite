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

echo "PASS: experiment visibility includes bizpulse.cc and blder.bot on gmac.io and gmacko"
