#!/usr/bin/env bash

set -euo pipefail

ROOT="${1:-.}"
cd "$ROOT"

fail() {
  echo "FAIL: $1" >&2
  exit 1
}

[ -f _site/index.html ] || fail "missing built home page"
[ -f _site/blog/index.html ] || fail "missing built blog page"
[ -f _site/resume/index.html ] || fail "missing built resume page"

grep -q "Current portfolio" _site/index.html || fail "home page missing startup section"
grep -q "Latest from the blog" _site/index.html || fail "home page missing blog teaser"
grep -q 'class="post-title"' _site/blog/index.html || fail "blog page missing post listing"
grep -q "Bio" _site/resume/index.html || fail "resume page missing resume content"

echo "PASS: rendered site structure looks correct"
