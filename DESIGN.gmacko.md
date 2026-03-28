# Design — gmacko.com

Build-in-public hub for Graham Mackie, Gmacko Ventures LLC, and the startup portfolio. See DESIGN.md for shared typography, spacing, motion, and anti-patterns.

## Product Context

- **What this is:** Portfolio site with startup showcase, tech blog, and resume
- **Who it's for:** Potential collaborators, investors, hiring candidates, fellow builders
- **Mood:** A workshop wall pinned with active bets. Warm, serious, alive. The content IS the design.
- **Reference sites:** patrickcollison.com, rsms.me, linus.coffee, danwang.co

## Color Palette

Restrained. One warm accent against paper-toned neutrals.

### Light Mode (default)

| Token | Value | Usage |
|-------|-------|-------|
| --bg | #F7F3ED | Warm paper background |
| --surface | #EFEBE4 | Card backgrounds |
| --surface-2 | #E6E0D7 | Elevated surfaces, thumbnails |
| --text | #1A1714 | Body text (warm near-black) |
| --text-strong | #110F0D | Headlines |
| --muted | #6B6159 | Secondary text (warm stone) |
| --accent | #B5451B | Burnt sienna — warm, confident, non-tech |
| --accent-hover | #9A3A17 | Darkened for hover |
| --rule | #D4CABC | Card borders |
| --rule-heavy | #B8AB9A | Thick section dividers |

### Dark Mode

| Token | Value |
|-------|-------|
| --bg | #171411 |
| --surface | #1E1B17 |
| --surface-2 | #262220 |
| --text | #E5DFD6 |
| --text-strong | #F5F0E8 |
| --muted | #8A8078 |
| --accent | #D4612E |
| --accent-hover | #E87040 |
| --rule | #2E2A25 |
| --rule-heavy | #3D3732 |

### Semantic Colors

- Success: #2D5F1A / #E8F5E0
- Warning: #6B4A0A / #FEF3E0
- Error: #7A1A1A / #FDE8E8
- Info: #1A4A6B / #E4F0F8

## Layout

- **Grid:** Single column mobile, 2-col startup grid at 600px+, 3-col overview grid at 600px+
- **Max content width:** 960px
- **Alignment:** Left-aligned by default. Hero as poster composition, not centered welcome mat.
- **Section rhythm:** Thick horizontal rules (`border-top: 2px solid var(--rule-heavy)`) between major sections. 48px vertical spacing between sections.

## Pages

- **Landing:** Hero with name/tagline, startup grid, latest blog posts, resume highlights
- **Blog:** Post listing with excerpts, category/tag filtering
- **Resume:** Work experience, education, skills from `_data/gmacko/`
- **Startups:** Full showcase of Gmacko Ventures portfolio from `_data/gmacko/startups.yml`

## Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-03-28 | Burnt sienna accent (#B5451B) | Deliberately non-tech. Every builder site uses blue, green, or grayscale. Warm rust says "editorial studio" not "SaaS landing page." |
| 2026-03-28 | Warm paper background (#F7F3ED) | Not clinical white. Paper tone matches the editorial/industrial hybrid aesthetic. |
