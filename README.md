# Personal Websites

One Jekyll repo, three sites:

| Domain | What | Theme |
|--------|------|-------|
| [gmacko.com](https://gmacko.com) | Build-in-public hub, startups, blog, resume | Warm editorial, burnt sienna |
| [grahammackie.com](https://grahammackie.com) | Personal blog, social links | Warm editorial, slate blue |
| [gmac.io](https://gmac.io) | Prototype & service dashboard | Dark mode, neon purple |

## Build

```bash
bundle install

# Build one site
bundle exec jekyll build --config _config.yml,_config.gmacko.yml --destination _site_gmacko

# Build all three
for site in gmacko personal gmac; do
  bundle exec jekyll build --config _config.yml,_config.${site}.yml --destination _site_${site}
done
```

## Serve locally

```bash
bundle exec jekyll serve --config _config.yml,_config.gmacko.yml --destination _site_gmacko
```

## Deploy

Hosted on Cloudflare Pages — three projects (`gmacko`, `personal`, `gmac`) mapped to gmacko.com, grahammackie.com, and gmac.io respectively. A workstation LaunchAgent checks GitHub `main` every five minutes, deploys changed commits from a dedicated clean worktree, and verifies that all three health endpoints report the exact SHA.

```bash
# One-time: authenticate
wrangler login

# Deploy one site
./scripts/deploy-pages.sh gmacko    # → gmacko.com
./scripts/deploy-pages.sh personal  # → grahammackie.com
./scripts/deploy-pages.sh gmac      # → gmac.io

# Or all three
./scripts/deploy-pages.sh all
```

The deploy script refuses dirty checkouts so uncommitted drafts cannot leak into production. Use a separate clean worktree for every production or preview deployment.

Install or refresh the unattended deployment job after authenticating Wrangler:

```bash
npx wrangler login
./scripts/install-cloudflare-deploy-sync.sh
```

The scheduler uses the local Wrangler OAuth session instead of copying a broad Cloudflare token into Forgejo. Force an immediate reconciliation with `FORCE_DEPLOY=1 ./scripts/run-cloudflare-deploy-sync.sh`.

Install the independent public-content canary after the sites and ForgeGraph feed are live:

```bash
./scripts/install-public-content-canary.sh
```

Every five minutes it verifies feed freshness, generation consistency, CORS,
summary totals, the `gmac.io` hydration bootstrap, and convergence of all three
site health commits. Successful JSON summaries are written to
`~/Library/Logs/personalWebsite/public-content-canary.log`; failures are written
to the matching `.error.log` and exit nonzero. The canary observes production
but never publishes content or blocks the deployment agent.

## Structure

- `_config.yml` — Shared base config
- `_config.{gmacko,personal,gmac}.yml` — Per-site overrides
- `DESIGN.md` — Shared design system (typography, spacing, motion)
- `DESIGN.{gmacko,personal,gmac}.md` — Per-site palettes and layouts
- `_layouts/` — Shared + per-site layouts (landing, personal, dashboard)
- `_sass/` — CSS custom properties on `:root` with per-site theme overrides
- `_data/gmac/` — Services and prototypes for the dashboard
- `pages/{gmac,personal}/` — Per-site page templates

## Content

Posts need a `site` front matter field: `site: gmacko`, `site: personal`, `site: gmac`, or `site: [gmacko, personal]` for cross-posting. Templates filter by `site_id` from each site's config.
