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

Deployed to hetzner-master via ForgeGraph. Caddy serves static files directly.

```bash
# Build + deploy one site
bundle exec jekyll build --config _config.yml,_config.gmac.yml --destination _site_gmac
rsync -avz --delete _site_gmac/ root@gmac.io:/var/www/gmac.io/
```

See `docs/forgegraph-static-deploy.md` for the automated Gitea workflow.

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
