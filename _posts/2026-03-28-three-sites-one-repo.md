---
layout: post
title: "Three Sites, One Repo: How I'm Organizing the Build"
excerpt: "gmacko.com, grahammackie.com, and gmac.io now run from one Jekyll repo with shared theming and independent deploys."
categories: [infrastructure]
tags: [jekyll, architecture, build-in-public]
site: [gmacko, gmac]
---

I just shipped a multi-site architecture that produces three websites from one Jekyll repository. Each site has its own domain, its own design palette, and its own purpose. They share typography, spacing, and component patterns. They deploy independently to Hetzner via Caddy.

Here's what each one does and why they exist separately.

<!--more-->

## The Three Sites

**[gmacko.com](https://gmacko.com)** is the build-in-public hub. Startup portfolio, tech blog, resume. The audience is fellow builders, potential collaborators, investors, anyone interested in what Gmacko Ventures is working on. Warm editorial design, burnt sienna accent, full-width layout with a top nav bar.

**[grahammackie.com](https://grahammackie.com)** is the personal site. Blog about life, music, travel, opinions that don't fit the builder brand. Sticky sidebar with photo, bio, and social links. Slate blue accent. The audience is friends, family, and anyone curious about the person behind the ventures.

**[gmac.io](https://gmac.io)** is the prototype dashboard. Dark mode, neon purple accents, green status dots that pulse when services are live. It shows every running service and venture app with health checks. The audience is mostly me, but it's public because transparency is the point.

## Why Not One Site?

I considered it. One site with sections would be simpler. But the three domains serve genuinely different audiences with different expectations. A potential collaborator checking out my startups doesn't need to scroll past personal blog posts about vinyl records. Someone visiting for the personal side doesn't need a grid of 10 startup cards.

The cross-posting system handles the overlap. A post tagged `site: [gmacko, gmac]` appears on both sites. Most content belongs to one site. The rare cross-post gets shared.

## How It Works

One `_config.yml` with shared settings. Three override files (`_config.gmacko.yml`, `_config.personal.yml`, `_config.gmac.yml`) that set the URL, title, theme, and content exclusions. Build any site with:

```bash
bundle exec jekyll build --config _config.yml,_config.gmacko.yml
```

All colors flow through CSS custom properties on `:root`. The gmacko palette is the default. The personal site swaps the accent to blue. The dashboard overrides everything to dark mode with neon. Components never reference colors directly, just `var(--accent)`, `var(--bg)`, etc.

Content filtering happens at the template level with Liquid. Jekyll processes all posts regardless of directory, so every post listing filters by `site_id`:

```liquid
{% raw %}{% assign site_posts = site.posts | where_exp: "p", "p.site contains site.site_id" %}{% endraw %}
```

## The 2026 Plan

I'm running 10 ventures right now across edtech, AI infrastructure, industrial controls, IoT, game dev, proptech, streaming, and consumer. That sounds insane. It is. But the thesis is that with AI-assisted development, a solo builder can maintain a portfolio of products at a pace that would have required a team of 10 a few years ago.

The ventures at different stages:

**Shipping now:** GenTrellis (on-prem AI boxes, first deliveries Q2), LatchFlow (escape room ops, marketplace launching), AppealKey (property tax appeals, live on iOS and web).

**Active development:** PlayTrek (adaptive learning in games), Controls Foundry (PLC analysis for industrial plants), LevelForge (AI game dev IDE), DriftPort (van/RV IoT), Stream Conductor (cloud streaming control room), HabitPlay (gamified habit tracker), x402 Arena (AI agents competing with real USDC).

**Infrastructure:** ForgeGraf ties it all together. Edge + bare metal delivery platform. Cloudflare Workers for the edge, Nix closures on Hetzner for the metal, Jujutsu for changeset identity, full delivery evidence from draft to production.

The shared infrastructure is the force multiplier. ForgeGraf deploys everything. Gitea hosts all the code. Harbor stores the images. Every venture benefits from the same CI/CD, the same monitoring, the same deployment pipeline.

## What's Next

The immediate priorities:

1. **Nix flake for this repo.** Right now I'm building Jekyll locally and rsyncing. The plan is a `flake.nix` that produces three Nix closures, deployed via ForgeGraf.
2. **Gitea Actions workflow.** Push to main, all three sites rebuild and deploy automatically. No more manual rsync.
3. **gmac.io health upgrades.** The dashboard currently does basic `fetch()` pings. ForgeGraf has deep health check data (dependency trees, latencies) that should surface on the dashboard.
4. **Content.** The sites are architecturally sound but content-light. More blog posts, more venture updates, more build-in-public documentation.

Building in public means the dashboard shows the real state. Some things are green. Some things will be red. That's the point.
