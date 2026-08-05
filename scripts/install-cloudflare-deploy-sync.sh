#!/usr/bin/env bash

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
LABEL="com.gmacko.pages-deploy-sync"
TEMPLATE="${REPO_ROOT}/ops/launchd/${LABEL}.plist.in"
DESTINATION="${HOME}/Library/LaunchAgents/${LABEL}.plist"
DOMAIN="gui/$(id -u)"

mkdir -p "${HOME}/Library/LaunchAgents" "${HOME}/Library/Logs/personalWebsite"
sed \
  -e "s|__REPO_ROOT__|${REPO_ROOT}|g" \
  -e "s|__HOME__|${HOME}|g" \
  "${TEMPLATE}" > "${DESTINATION}.tmp"
plutil -lint "${DESTINATION}.tmp" >/dev/null
mv "${DESTINATION}.tmp" "${DESTINATION}"

launchctl bootout "${DOMAIN}/${LABEL}" >/dev/null 2>&1 || true
launchctl bootstrap "${DOMAIN}" "${DESTINATION}"
launchctl enable "${DOMAIN}/${LABEL}"
launchctl kickstart -k "${DOMAIN}/${LABEL}"

echo "Installed ${LABEL}; production main is checked every five minutes."
