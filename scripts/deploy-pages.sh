#!/usr/bin/env bash
# Build one or all sites and deploy to Cloudflare Pages.
#
# Usage:
#   ./scripts/deploy-pages.sh <site>     # site = gmacko | personal | gmac | all
#
# Requires: bundle, wrangler (authenticated via `wrangler login`).

set -euo pipefail

SITES=(gmacko personal gmac)

write_build_data() {
  # Capture commit SHA + build timestamp for /.well-known/forge-health.
  # Regenerated on every build; _data/build.yml is gitignored.
  mkdir -p _data
  cat > _data/build.yml <<EOF
commit_sha: "$(git rev-parse HEAD 2>/dev/null || echo unknown)"
commit_short: "$(git rev-parse --short HEAD 2>/dev/null || echo unknown)"
built_at: "$(date -u +%Y-%m-%dT%H:%M:%SZ)"
EOF
}

deploy_site() {
  local site="$1"
  local dest="_site_${site}"

  write_build_data

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
