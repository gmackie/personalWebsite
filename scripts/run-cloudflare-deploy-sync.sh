#!/usr/bin/env bash

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SOURCE_URL="${PERSONAL_WEBSITE_SOURCE_URL:-https://github.com/gmackie/personalWebsite.git}"
BRANCH="${PERSONAL_WEBSITE_DEPLOY_BRANCH:-main}"
STATE_DIR="${PERSONAL_WEBSITE_DEPLOY_STATE_DIR:-${HOME}/Library/Application Support/personalWebsite-deploy}"
WORKTREE_ROOT="${PERSONAL_WEBSITE_DEPLOY_WORKTREE:-${HOME}/.config/superpowers/worktrees/personalWebsite/scheduled-deploy}"
STATE_FILE="${STATE_DIR}/last-successful-sha"
LOCK_DIR="${STATE_DIR}/lock"
HEALTH_URLS=(
  "https://gmacko.com/.well-known/forge-health"
  "https://grahammackie.com/.well-known/forge-health"
  "https://gmac.io/.well-known/forge-health"
)

NVM_NODE_BIN="$(find "${HOME}/.nvm/versions/node" -mindepth 2 -maxdepth 2 -type d -name bin 2>/dev/null | sort -V | tail -n 1)"
export PATH="${HOME}/.rbenv/shims:/opt/homebrew/bin:/usr/local/bin:${NVM_NODE_BIN:-}:${PATH}"

mkdir -p "${STATE_DIR}" "$(dirname "${WORKTREE_ROOT}")"
if ! mkdir "${LOCK_DIR}" 2>/dev/null; then
  echo "Another personalWebsite deployment sync is already running."
  exit 0
fi
trap 'rmdir "${LOCK_DIR}"' EXIT

live_matches() {
  local expected_sha="$1"
  local health_url
  local live_sha

  for health_url in "${HEALTH_URLS[@]}"; do
    live_sha="$(curl -fsS --max-time 15 "${health_url}" | jq -r '.commitHash // empty')" || return 1
    [[ "${live_sha}" == "${expected_sha}" ]] || return 1
  done
}

git -C "${REPO_ROOT}" fetch --quiet "${SOURCE_URL}" "${BRANCH}"
TARGET_SHA="$(git -C "${REPO_ROOT}" rev-parse FETCH_HEAD)"
LAST_SHA="$(cat "${STATE_FILE}" 2>/dev/null || true)"

if [[ "${FORCE_DEPLOY:-0}" != "1" ]] && live_matches "${TARGET_SHA}"; then
  if [[ "${LAST_SHA}" != "${TARGET_SHA}" ]]; then
    printf '%s\n' "${TARGET_SHA}" > "${STATE_FILE}.tmp"
    mv "${STATE_FILE}.tmp" "${STATE_FILE}"
  fi
  echo "Production already serves ${TARGET_SHA}; nothing to deploy."
  exit 0
fi

if [[ "${DRY_RUN:-0}" == "1" ]]; then
  echo "Would deploy ${TARGET_SHA} from ${WORKTREE_ROOT}."
  exit 0
fi

if [[ ! -f "${WORKTREE_ROOT}/.git" ]]; then
  if [[ -e "${WORKTREE_ROOT}" ]]; then
    echo "Deploy worktree path exists but is not a Git worktree: ${WORKTREE_ROOT}" >&2
    exit 1
  fi
  git -C "${REPO_ROOT}" worktree add --quiet --detach "${WORKTREE_ROOT}" "${TARGET_SHA}"
fi

if [[ -n "$(git -C "${WORKTREE_ROOT}" status --porcelain --untracked-files=all)" ]]; then
  echo "Deploy worktree is dirty; refusing to publish uncommitted content." >&2
  exit 1
fi

git -C "${WORKTREE_ROOT}" checkout --quiet --detach "${TARGET_SHA}"
[[ "$(git -C "${WORKTREE_ROOT}" rev-parse HEAD)" == "${TARGET_SHA}" ]]

(
  cd "${WORKTREE_ROOT}"
  ./scripts/deploy-pages.sh all
)

for _attempt in {1..10}; do
  if live_matches "${TARGET_SHA}"; then
    printf '%s\n' "${TARGET_SHA}" > "${STATE_FILE}.tmp"
    mv "${STATE_FILE}.tmp" "${STATE_FILE}"
    echo "Deployed and verified ${TARGET_SHA} on all three domains."
    exit 0
  fi
  sleep 6
done

echo "Cloudflare deploy completed, but production health did not converge to ${TARGET_SHA}." >&2
exit 1
