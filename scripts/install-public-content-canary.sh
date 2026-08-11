#!/usr/bin/env bash

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
LABEL="com.gmacko.public-content-canary"
TEMPLATE="${REPO_ROOT}/ops/launchd/${LABEL}.plist.in"
DESTINATION="${HOME}/Library/LaunchAgents/${LABEL}.plist"
DOMAIN="gui/$(id -u)"
NODE_BIN="$(command -v node || true)"

if [[ ! -x "${NODE_BIN}" ]]; then
  echo "Node.js is required to install ${LABEL}." >&2
  exit 1
fi

mkdir -p "${HOME}/Library/LaunchAgents" "${HOME}/Library/Logs/personalWebsite"
sed \
  -e "s|__REPO_ROOT__|${REPO_ROOT}|g" \
  -e "s|__HOME__|${HOME}|g" \
  -e "s|__NODE_BIN__|${NODE_BIN}|g" \
  "${TEMPLATE}" > "${DESTINATION}.tmp"
plutil -lint "${DESTINATION}.tmp" >/dev/null
mv "${DESTINATION}.tmp" "${DESTINATION}"

launchctl bootout "${DOMAIN}/${LABEL}" >/dev/null 2>&1 || true
launchctl bootstrap "${DOMAIN}" "${DESTINATION}"
launchctl enable "${DOMAIN}/${LABEL}"

echo "Installed ${LABEL}; the public content pipeline is checked every five minutes."
