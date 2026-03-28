<!-- /autoplan restore point: /Users/mackieg/.gstack/projects/gmackie-personalWebsite/main-autoplan-restore-20260328-114555.md -->
# Multi-Site Architecture: gmacko.com, grahammackie.com, gmac.io

**Date:** 2026-03-28
**Status:** Design complete, ready for implementation

## Overview

One Jekyll repository produces three static sites, each deployed independently via Nix closures and ForgeGraph.

| Domain | Purpose | Theme |
|--------|---------|-------|
| gmacko.com | Build-in-public hub, startups, blog, resume | Warm editorial, burnt sienna accent |
| grahammackie.com | Personal blog, social links | Warm editorial, slate blue accent |
| gmac.io | Prototype dashboard | Dark mode, neon accents |

## Repository Structure

```
personalWebsite/
├── _config.yml                  # Shared base config
├── _config.gmacko.yml           # gmacko.com overrides
├── _config.personal.yml         # grahammackie.com overrides
├── _config.gmac.yml             # gmac.io overrides
│
├── DESIGN.md                    # Shared design (typography, spacing, motion)
├── DESIGN.gmacko.md             # gmacko.com palette + layout
├── DESIGN.personal.md           # grahammackie.com palette + layout
├── DESIGN.gmac.md               # gmac.io palette + layout
│
├── _posts/
│   ├── gmacko/                  # Tech, startup, build-in-public posts
│   ├── personal/                # Personal blog posts
│   └── gmac/                    # Experiment logs, build log entries
│
├── _data/
│   ├── gmacko/                  # startups.yml, careers.yml, skills.yml
│   ├── personal/                # Social links, personal projects
│   ├── gmac/                    # prototypes.yml
│   └── shared/                  # Owner info shared across sites
│
├── _layouts/                    # Shared: default, post, page
│   └── dashboard.html           # gmac.io-specific
├── _includes/
├── _sass/
│   ├── _theme-base.scss         # CSS custom properties (gmacko defaults)
│   ├── _theme-personal.scss     # Blue accent overrides
│   ├── _theme-dashboard.scss    # Dark + neon overrides
│   ├── components/
│   └── pages/
│
├── pages/
│   ├── gmacko/                  # Landing, blog, resume, startups
│   ├── personal/                # Single-page sidebar + blog
│   └── gmac/                    # Dashboard
│
├── flake.nix                    # Nix flake — three build targets
└── CLAUDE.md
```

## Build System

Each site builds with Jekyll multi-config merge:

```bash
jekyll build --config _config.yml,_config.gmacko.yml
jekyll build --config _config.yml,_config.personal.yml
jekyll build --config _config.yml,_config.gmac.yml
```

### Config Strategy

**Base `_config.yml`** holds shared settings:
- Timezone, markdown, kramdown, permalink format
- Font URLs
- Owner info

**Site configs** override:
- `title`, `url`, `site_theme`, `site_id`
- `defaults` scoping content to the site's directories
- `include`/`exclude` to filter content directories

### Content Filtering

Primary mechanism: directory-based include/exclude in site configs.

Secondary mechanism: front matter `site` tag for cross-posted content:

```yaml
---
layout: post
title: "Why I Build in Public"
site: [gmacko, personal]
---
```

## Theming

Three-layer CSS custom property system:

1. **`_theme-base.scss`** — All variables with gmacko.com defaults
2. **`_theme-personal.scss`** / **`_theme-dashboard.scss`** — Scoped overrides via `body.theme-personal` / `body.theme-dashboard`
3. **Components** — Only reference `var(--token)`, never raw colors

The `<body>` tag gets a class from `site_theme` in the config.

## Deployment

### Nix

`flake.nix` exposes three packages:

```nix
packages = {
  gmacko = buildJekyllSite { config = "_config.yml,_config.gmacko.yml"; };
  personal = buildJekyllSite { config = "_config.yml,_config.personal.yml"; };
  gmac = buildJekyllSite { config = "_config.yml,_config.gmac.yml"; };
};
```

Each produces a Nix closure with static files + web server config.

### ForgeGraph

Three registered apps, three routes:
- `gmacko` → gmacko.com
- `personal` → grahammackie.com
- `gmac` → gmac.io

Deploy independently: `forge deploy gmacko`

### Gitea CI Triggers

| Changed files | Deploys |
|---------------|---------|
| `_posts/gmacko/`, `pages/gmacko/`, `_config.gmacko.yml`, `_data/gmacko/` | gmacko only |
| `_posts/personal/`, `pages/personal/`, `_config.personal.yml`, `_data/personal/` | personal only |
| `_posts/gmac/`, `pages/gmac/`, `_config.gmac.yml`, `_data/gmac/` | gmac only |
| `_layouts/`, `_includes/`, `_sass/`, `_config.yml`, `DESIGN.md` | All three |

## gmac.io Dashboard Specifics

### Data: Static YAML + Client-Side Health

**`_data/gmac/prototypes.yml`** — Manual catalog of prototypes with name, URL, description, status, stack tags, and `internal` flag for Tailscale-only services.

**Client-side JS:**
- Public URLs: fetch with timeout → green/red status dot
- ForgeGraph apps: deep health endpoint → expandable dependency tree with per-dep status and latency
- Internal URLs: "local only" badge, no ping
- Fallback: static catalog with "status unknown" if health endpoint unreachable

### Visual Treatment

- Dark grid background (graph paper, 40px intervals)
- Neon glow on status dots (green/amber/red `box-shadow`)
- Subtle `text-shadow` on headings
- Live services pulse (2s ease-in-out opacity animation)
- Build log feed from `_posts/gmac/` below the dashboard grid

---

## Review Findings (from /autoplan)

### Critical: Content Isolation Strategy

Jekyll does NOT respect `exclude` for `_posts/` subdirectories. All posts in `_posts/**` are processed in every build. Content filtering must happen at the **template level** using Liquid:

```liquid
{% assign posts = site.posts | where_exp: "post", "post.path contains '_posts/gmacko'" %}
```

Every layout, include, and feed template that iterates posts must filter by directory path or `site` front matter tag. This applies to: post listings, blog feeds, RSS/Atom feeds, related posts, tag/category pages.

**Action:** Add a `site_id` variable to each site config. All post-listing templates filter with:
```liquid
{% assign site_posts = site.posts | where_exp: "p", "p.path contains site.site_id or p.site contains site.site_id" %}
```

### Critical: Migration Plan

Existing content must move into the new directory structure:

| Current Location | New Location | Notes |
|------------------|--------------|-------|
| `_posts/*.md` | `_posts/gmacko/*.md` | All existing posts are gmacko content |
| `_data/ventures.yml` | `_data/gmacko/ventures.yml` | Richer schema than startups.yml, use this |
| `_data/startups.yml` | DELETE | Superseded by ventures.yml |
| `_data/experiments.yml` | `_data/gmac/prototypes.yml` | Rename + enrich |
| `_data/updates.yml` | `_data/gmacko/updates.yml` | |
| `_data/now.yml` | `_data/gmacko/now.yml` | |
| `_data/index/*` | `_data/gmacko/*` | careers, education, skills, projects |
| `_ventures/*.md` | `pages/gmacko/ventures/` | Or keep as collection under gmacko |
| `index.html` | `pages/gmacko/index.html` | |
| `blog.html` | `pages/gmacko/blog.html` | |
| Top-level pages (`now.html`, `lab.html`, etc.) | `pages/gmacko/` | |

**URL Compatibility:** Existing grahammackie.com URLs should redirect to gmacko.com equivalents. Create a redirect map or use ForgeGraph route rules.

### High: Template Refactor Scope

Existing shared templates (`sidebar.html`, `head.html`, `landing.html`) hardcode single-site nav, metadata, and content queries. These need refactoring:

- `_includes/sidebar.html` — Must become site-aware (different nav per site)
- `_includes/head.html` — Must use `site.title`, `site.url` from per-site config
- `_layouts/landing.html` — Currently gmacko-specific, stays as gmacko layout
- `_layouts/venture.html` — gmacko-specific, stays as gmacko layout
- NEW: `_layouts/personal.html` — Sidebar + blog feed for grahammackie.com
- NEW: `_layouts/dashboard.html` — Dark dashboard for gmac.io

### High: Nix Build Derivation

`flake.nix` must:
1. Use `bundlerEnv` with `Gemfile` + `Gemfile.lock` to create Ruby environment
2. Run `jekyll build --config X,Y --destination $out/site` per package
3. Wrap output with Caddy/Nginx config serving static files
4. Pin Ruby version and gem hashes for reproducibility

### Medium: gmac.io Health Architecture

Client-side `fetch()` to arbitrary URLs will hit CORS restrictions. Options:
- **A)** Same-origin proxy: ForgeGraph health endpoint at `gmac.io/api/health` aggregates status
- **B)** Build-time snapshot: Cron job writes `health.json`, Jekyll includes it as data
- **C)** `no-cors` mode: Only checks reachability (opaque response), no response body

Recommend: Start with **B** (build-time snapshot via cron), upgrade to **A** when ForgeGraph has the API.

### Medium: Interaction States (gmac.io)

Add to DESIGN.gmac.md:
- **Loading:** Skeleton pulse on status dots while health check runs
- **Stale:** If health data is >5 minutes old, show timestamp + "last checked" label
- **Timeout:** After 3 seconds, show "unknown" badge (grey dot)
- **Partial:** If some deps healthy and some unreachable, parent dot goes amber

### Medium: Responsive Strategy (gmac.io)

Add to DESIGN.gmac.md:
- Mobile: Stack prototype cards vertically, hide dependency tree by default
- Dependency tree: Tap to expand (no hover), full-width on mobile
- Build log: Single column, date above message
- Breakpoint: 640px

### High: Blog Post Layout Undesigned

Neither the DESIGN files nor the preview HTMLs show what an individual blog post looks like. This is the page users spend the most time on. Need to specify for each site:
- Content max-width (640px for readability)
- Heading styles within content (h2/h3/h4)
- Code block styling
- Image treatment (full-width or contained?)
- Back-to-feed navigation
- For grahammackie.com: sidebar + post content two-panel layout

### High: Sass Variable Migration

Existing SCSS uses Sass variables (`$accent`, `$bg` in `_variables.scss`). The plan requires CSS custom properties (`var(--accent)`). This migration must be an explicit task touching every component SCSS file. It's a prerequisite, not a parallel task.

### High: Jekyll Multi-Config Shallow Merge

Jekyll's `--config a.yml,b.yml` does a **shallow merge** of top-level keys. If `_config.yml` has `defaults` and `_config.gmacko.yml` also has `defaults`, the base defaults are replaced entirely. Shared defaults must be duplicated in each site config, or structured to avoid overlap.

### High: gmac.io Invisible Card Borders

`--rule: #1A1A1A` and `--surface: #1A1A1A` are the same color — card borders are invisible. Fix: set `--rule: #2A2A2A` (matching DESIGN.gmac.md) in the theme.

### Medium: Theme Class Pattern Conflict

Plan says `body.theme-*` classes for theming. Preview HTMLs use `:root` variables. Since each site builds independently, the simplest approach is: define all tokens on `:root` in each site's SCSS (no body class needed). Dark mode via `@media (prefers-color-scheme: dark)` or `[data-theme="dark"]`. Drop the `body.theme-*` approach.

### Medium: Rollout Sequencing

Don't ship three sites simultaneously. Sequence:
1. Ship gmacko.com first with new theme system
2. Add grahammackie.com as second build target once stable
3. Add gmac.io last (dark theme + client-side JS is most complex)

### Medium: Self-Host Fonts

Download Satoshi, Instrument Sans, and JetBrains Mono at build time. Serve from same origin. Eliminates 3 external preconnect origins, improves load time, removes CSP concerns.

### Low: Accessibility Baseline

Add to shared DESIGN.md:
- Focus visible on all interactive elements
- `prefers-reduced-motion` disables pulse animations
- Status dots include `aria-label` text (not color-only)
- Minimum touch target: 44x44px
- Contrast: WCAG AA for all text (4.5:1 body, 3:1 large)

### Low: CI Trigger Completeness

Add to trigger matrix: `feed.xml`, `Gemfile`, `Gemfile.lock`, `flake.nix` → all three sites.

---

## Decision Audit Trail

| # | Phase | Decision | Principle | Rationale | Rejected |
|---|-------|----------|-----------|-----------|----------|
| 1 | CEO | Mode: SELECTIVE EXPANSION | P1+P3 | Feature enhancement on existing system | EXPANSION, HOLD, REDUCTION |
| 2 | CEO | Approach A (multi-config) | P5 | Simplest, proven Jekyll pattern | B (monorepo subdirs), C (SSG migration) |
| 3 | CEO | Three sites confirmed | User | User accepted fragmentation cost | Two sites, one site |
| 4 | CEO | Consolidate ventures.yml | P4 | DRY, ventures.yml has richer schema | Keep both files |
| 5 | CEO | Posts filter at template level | P5 | Jekyll exclude doesn't work for _posts subdirs | Rely on exclude (broken) |
| 6 | CEO | Default: untagged posts belong to directory's site | P5 | Explicit over clever | Appear everywhere, appear nowhere |
| 7 | CEO | Health endpoint opt-in per prototype | P5 | Security: don't leak topology by default | All public |
| 8 | Design | Add loading/stale/timeout states | P1 | Completeness: users need feedback | Leave to implementer |
| 9 | Design | Add responsive rules for gmac.io | P1 | Mobile is not afterthought | Desktop-only |
| 10 | Design | Add accessibility baseline | P1 | Non-negotiable for public sites | Skip a11y |
| 11 | Eng | Template refactor is real work | P5 | Existing templates hardcode single-site | Minimal changes |
| 12 | Eng | Build-time health snapshot first | P3 | Pragmatic: avoids CORS, works now | Client-side fetch |
| 13 | Eng | Nix derivation needs detail | P5 | Hand-waved buildJekyllSite won't work | Figure it out later |
| 14 | Eng | Migration script needed | P1 | Existing content must move cleanly | Manual migration |

## GSTACK REVIEW REPORT

| Review | Trigger | Why | Runs | Status | Findings |
|--------|---------|-----|------|--------|----------|
| CEO Review | `/plan-ceo-review` | Scope & strategy | 1 | CLEAR (via /autoplan) | 3-site strategy confirmed, migration gap identified |
| Codex Review | `/codex review` | Independent 2nd opinion | 3 | CLEAR (via /autoplan) | CEO: brand fragmentation, Design: interaction gaps, Eng: content isolation |
| Eng Review | `/plan-eng-review` | Architecture & tests (required) | 1 | CLEAR (via /autoplan) | 5 findings, 2 critical (content isolation, migration) |
| Design Review | `/plan-design-review` | UI/UX gaps | 1 | CLEAR (via /autoplan) | 6 findings, a11y and responsive need work |

**UNRESOLVED:** 0
**VERDICT:** CEO + ENG + DESIGN CLEARED — ready to implement with the additions above.
