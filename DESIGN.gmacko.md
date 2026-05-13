# Design — gmacko.com

Personal marketing site for Graham Mackie. Pop-punk show flyer meets personal brand zine. See DESIGN.md for shared typography, spacing, motion, and anti-patterns.

## Product Context

- **What this is:** Personal marketing site with startup showcase, blog, and resume
- **Who it's for:** Potential collaborators, employers, fellow builders, anyone curious
- **Mood:** Digital zine. Graffiti energy, urban, online-first. Warm paper as a wheat-pasted canvas with spray-paint accents. DIY radical self-reliance. The site should feel like it was made by someone who's been on the internet for 20 years.
- **Reference vibe:** Pop-punk show flyers, skate zines, laptop sticker collage, Burning Man art car energy

## Anti-patterns (in addition to DESIGN.md)

- No SaaS landing page patterns (centered hero, 3-feature grid, gradient CTA)
- No "vibe-coded slop" — every design choice is intentional
- No smooth/corporate polish — roughness is a feature
- No LinkedIn energy in the copy
- No template-feeling symmetric grids

## Color Palette

Warm paper canvas with vivid spray-paint accents and marker-weight contrast.

### Light Mode (default)

| Token | Value | Usage |
|-------|-------|-------|
| --bg | #F7F3ED | Warm paper canvas |
| --surface | #EFEBE4 | Card backgrounds |
| --surface-2 | #E6E0D7 | Elevated surfaces |
| --text | #0A0A0A | Body text — true black, ink-on-paper contrast |
| --text-strong | #0A0A0A | Headlines — true black |
| --muted | #6B6159 | Secondary text (warm stone) |
| --accent | #D93A00 | Vivid vermillion — spray paint red |
| --accent-hover | #B83200 | Deeper on hover |
| --highlight | #FFD600 | Marker yellow — callouts, badges, hover pops |
| --rule | #D4CABC | Card borders |
| --rule-heavy | #0A0A0A | Section dividers — true black thick rules |

### Dark Mode

| Token | Value |
|-------|-------|
| --bg | #0F0D0B |
| --surface | #1A1714 |
| --surface-2 | #262220 |
| --text | #F0EBE3 |
| --text-strong | #FFFFFF |
| --muted | #8A8078 |
| --accent | #FF4D00 |
| --accent-hover | #E87040 |
| --highlight | #FFD600 |
| --rule | #2E2A25 |
| --rule-heavy | #F0EBE3 |

### Semantic Colors

- Success: #2D5F1A / #E8F5E0
- Warning: #6B4A0A / #FEF3E0
- Error: #7A1A1A / #FDE8E8
- Info: #1A4A6B / #E4F0F8

### New Semantic Tokens

| Token | Value | Usage |
|-------|-------|-------|
| --sticker-border | 3px solid var(--text) | Thick marker-weight borders on sticker elements |
| --sticker-rotate | rotate(var(--r, 0deg)) | Random slight rotation |
| --grain-opacity | 0.03 (light) / 0.02 (dark) | Paper grain texture overlay |

## Texture & Roughness

### Paper Grain
CSS-only SVG noise overlay on the background. `pointer-events: none`, `position: fixed`. Adds tactile warmth.

### Sticker Treatment
Applied to: status badges, venture tags, CTA buttons, credential pills. Thick border, slight random rotation (1-3deg via nth-child), snaps to grid on hover. Like stickers on a laptop lid.

### Thick Rules
Section dividers: 4px solid var(--rule-heavy). Marker-stroke weight, not thin hairlines.

## Layout

- **Hero:** Poster composition. Name stacked on two lines at 5.5rem. Sticker-styled CTAs with slight rotations. Monospace spec sheet for credentials.
- **Ventures:** Collage grid with variable-width cards. Cards feel placed, not flowed.
- **Sections:** Zine spreads. Oversized headers (3.5rem) with thick accent underlines. Clean content within.
- **Grid:** Single column mobile, collage at 600px+, 3-col overview at 600px+
- **Max content width:** 960px
- **Alignment:** Left-aligned. Never centered welcome mat.
- **Section rhythm:** 4px horizontal rules between major sections. 48px vertical spacing.

## Scroll Interactions

Minimal, physical-metaphor only:
- **Sticker slap:** Badges enter with scale(1.08) → scale(1) over 200ms
- **Rule draw:** Horizontal rules animate width 0 → 100% on scroll-enter, 300ms
- No fade-in-up, parallax, slide-in, or choreographed sequences
- IntersectionObserver + CSS @keyframes only, no JS animation libraries

## Copy Voice

First person, short sentences, specific, self-aware, slightly cocky but self-deprecating. Terminally online but not try-hard. Someone who says "ngl" in Slack but writes solid design docs. Subtle Burning Man radical-self-reliance undertone.

## Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-03-28 | Warm paper background (#F7F3ED) | Paper tone as canvas. Not clinical white. |
| 2026-05-12 | Vivid vermillion accent (#D93A00) | Spray paint red, not tasteful rust. Bolder, more energy. |
| 2026-05-12 | Marker yellow highlight (#FFD600) | Secondary accent for callouts and badges. |
| 2026-05-12 | True black text (#0A0A0A) | Ink-on-paper contrast. The old warm near-black was too soft. |
| 2026-05-12 | Digital zine direction | Pop-punk/graffiti/urban energy. Anti-template, anti-AI-slop. Every choice intentional. |
| 2026-05-12 | Sticker treatment on badges/CTAs | Slight rotation, thick borders. Physical metaphor — like being stuck on. |
| 2026-05-12 | Paper grain overlay | CSS-only texture for tactile warmth. Subtle but present. |
