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

assert_present "_site_gmacko/archive/index.html" "Building Five MVPs with AI \\(Without Lying to Myself\\)"
assert_present "_site_gmacko/archive/index.html" "You Don't Need a Team"
assert_present "_site_personal/archive/index.html" "Habits, Systems, and the Gap Between Knowing and Doing"
assert_present "_site_personal/archive/index.html" "Van Internet: Starlink \\+ LTE Failover for Life on the Road"

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
  assert_absent "$surface" "Building Five MVPs with AI \\(Without Lying to Myself\\)"
  assert_absent "$surface" "ClassCheck: My First Real Vibe-Coded Edtech App"
  assert_absent "$surface" "PlayPath: The Edtech Idea I Actually Wanted to Build"
  assert_absent "$surface" "Stream Conductor: From Twitch Tools to High School Sports"
  assert_absent "$surface" "You Don't Need a Team"
done

for surface in "${GMACKO_SURFACES[@]}"; do
  assert_absent "$surface" "Habits, Systems, and the Gap Between Knowing and Doing"
  assert_absent "$surface" "Van Build v0\\.5: Current Setup and the IIoT Future"
  assert_absent "$surface" "Van Internet: Starlink \\+ LTE Failover for Life on the Road"
done

if find _site_personal/articles -type f | rg -q 'building-five|classcheck|playpath|stream-conductor|you-dont-need-a-team'; then
  fail "personal site should not generate gmacko article pages"
fi

if find _site_gmacko/articles -type f | rg -q 'habits-systems-and-good-intentions|van-build-v0-5-current-setup-and-the-iiot-future|van-internet-starlink-lte-failover'; then
  fail "gmacko site should not generate personal article pages"
fi

echo "PASS: site isolation is intact"
