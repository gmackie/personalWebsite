#!/usr/bin/env bash

set -euo pipefail

ROOT="${1:-.}"
cd "$ROOT"

fail() {
  echo "FAIL: $1" >&2
  exit 1
}

assert_absent() {
  local path="$1"
  local pattern="$2"
  if rg -q "$pattern" "$path"; then
    fail "unexpected match for '$pattern' in $path"
  fi
}

assert_present() {
  local path="$1"
  local pattern="$2"
  if ! rg -q "$pattern" "$path"; then
    fail "missing '$pattern' in $path"
  fi
}

assert_present "_site_gmacko/archive/index.html" "Source Control for Agents"
assert_present "_site_gmacko/archive/index.html" "Not Enough Humans"
assert_present "_site_personal/archive/index.html" "Four Months Out"
assert_present "_site_personal/archive/index.html" "Sandcastles"

PERSONAL_SURFACES=(
  "_site_personal/index.html"
  "_site_personal/feed.xml"
  "_site_personal/archive/index.html"
  "_site_personal/tags/index.html"
  "_site_personal/categories/index.html"
)

GMACKO_SURFACES=(
  "_site_gmacko/index.html"
  "_site_gmacko/feed.xml"
  "_site_gmacko/archive/index.html"
  "_site_gmacko/tags/index.html"
  "_site_gmacko/categories/index.html"
)

for surface in "${PERSONAL_SURFACES[@]}"; do
  assert_absent "$surface" "Source Control for Agents"
  assert_absent "$surface" "Not Enough Humans"
done

for surface in "${GMACKO_SURFACES[@]}"; do
  assert_absent "$surface" "Four Months Out"
  assert_absent "$surface" "Sandcastles"
done

if find _site_personal/articles -type f | rg -q 'source-control-for-agents|not-enough-humans'; then
  fail "personal site should not generate gmacko article pages"
fi

if find _site_gmacko/articles -type f | rg -q 'four-months-out|sandcastles'; then
  fail "gmacko site should not generate personal article pages"
fi

echo "PASS: site isolation is intact"
