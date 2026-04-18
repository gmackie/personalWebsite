#!/usr/bin/env bash

set -euo pipefail

ROOT="${1:-.}"
cd "$ROOT"

fail() {
  echo "FAIL: $1" >&2
  exit 1
}

[ -f index.html ] || fail "missing index.html"
[ -f blog.html ] || fail "missing blog.html"
[ -x scripts/assert_rendered_site.sh ] || fail "missing scripts/assert_rendered_site.sh"
[ -f _data/startups.yml ] || fail "missing _data/startups.yml"

grep -q '^layout: landing$' index.html || fail "home page must use landing layout"
grep -q '^permalink: /$' index.html || fail "home page permalink must remain /"

grep -q '^layout: post_listing$' blog.html || fail "blog page must use post listing layout"
grep -q '^permalink: /blog/$' blog.html || fail "blog page permalink must be /blog/"

grep -q 'PlayTrek.ai' _data/startups.yml || fail "startup data must include PlayTrek.ai"
grep -q 'streamconductor.com' _data/startups.yml || fail "startup data must include streamconductor.com"

echo "PASS: site structure matches landing + blog split"
