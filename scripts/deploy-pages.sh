#!/usr/bin/env bash
# Build one or all sites and deploy to Cloudflare Pages.
#
# Usage:
#   ./scripts/deploy-pages.sh <site>     # site = gmacko | personal | gmac | all
#
# Requires: bundle, wrangler (authenticated via `wrangler login`).

set -euo pipefail

SITES=(gmacko personal gmac)

deploy_site() {
  local site="$1"
  local dest="_site_${site}"

  echo "==> Building ${site}"
  bundle exec jekyll build \
    --config "_config.yml,_config.${site}.yml" \
    --destination "${dest}"

  echo "==> Deploying ${site} to Cloudflare Pages"
  wrangler pages deploy "${dest}" \
    --project-name "${site}" \
    --branch main \
    --commit-dirty=true
}

case "${1:-}" in
  gmacko|personal|gmac)
    deploy_site "$1"
    ;;
  all)
    for s in "${SITES[@]}"; do deploy_site "$s"; done
    ;;
  *)
    echo "Usage: $0 <gmacko|personal|gmac|all>" >&2
    exit 1
    ;;
esac
