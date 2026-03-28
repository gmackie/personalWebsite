# Shared Design System

This file defines the design foundations shared across all three sites (gmacko.com, grahammackie.com, gmac.io). Site-specific palettes, layouts, and decisions live in their respective DESIGN files.

## Typography

All three sites share the same type stack. Consistency here is what makes them feel like a family.

- **Display/Hero:** Satoshi (900 weight) — Geometric confidence without being cold. Load from Fontshare.
- **Body:** Instrument Sans (400, 500, 600, 700) — Warm, excellent body readability. Google Fonts.
- **UI/Labels:** Instrument Sans
- **Data/Tables/Code:** JetBrains Mono — Tabular-nums support, technical credibility signal. Google Fonts.

### Font Loading

```
Satoshi: https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap
Instrument Sans + JetBrains Mono: Google Fonts
```

### Type Scale

Base: 15px (1rem), line-height 1.5

| Token | Size | Font | Weight | Notes |
|-------|------|------|--------|-------|
| h1 | 4rem | Satoshi | 900 | -0.02em tracking |
| h2 | 1.75rem | Satoshi | 700 | Section headers |
| h3 | 1–1.1rem | Satoshi | 700 | Card titles |
| body | 15px / 1.05rem | Instrument Sans | 400 | |
| small/meta | 14px | Instrument Sans | 400 | |
| kicker | 11px | JetBrains Mono | 700 | 0.18em tracking, uppercase |
| mono-data | 13px | JetBrains Mono | 400 | |
| mono-pill | 10px | JetBrains Mono | 700 | 0.08em tracking, uppercase |

## Spacing

- **Base unit:** 8px
- **Density:** Comfortable
- **Scale:** 2xs(4) xs(8) sm(12) md(16) lg(24) xl(32) 2xl(48) 3xl(64)

## Border Radius

- sm: 4px (buttons, pills, inputs)
- md: 8px (cards)
- lg: 12px (hero containers)
- No bubbly/full-round (999px) on cards, ever.

## Motion

- **Approach:** Minimal-functional
- **Easing:** enter(ease-out), exit(ease-in), move(ease-in-out)
- **Duration:** micro(50–100ms), short(150ms), medium(250ms)
- **Card hover:** translateY(-2px) + border-color to accent, 150ms
- **Link transitions:** color 150ms ease
- **No choreography, no scroll-driven animation, no entrance animations**

## Anti-Patterns (never use on any site)

- Purple/violet gradients
- 3-column icon grids with colored circles
- Centered everything with uniform spacing
- Uniform bubbly border-radius (999px on cards)
- Gradient buttons
- Decorative blobs, illustrations, or background patterns
- Inter, Roboto, Poppins, Montserrat, Open Sans, Lato as primary fonts

## Cross-Site Navigation

All three sites link to each other in the footer or nav:
- gmacko.com → "Personal blog" links to grahammackie.com, "Prototypes" links to gmac.io
- grahammackie.com → "What I'm building" links to gmacko.com, "Prototypes" links to gmac.io
- gmac.io → "About" links to gmacko.com, "Personal" links to grahammackie.com

## Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-03-28 | Split into shared + 3 site-specific DESIGN files | Multi-site architecture requires shared foundations with per-site overrides. One DESIGN.md was getting unwieldy. |
| 2026-03-28 | Typography shared across all three sites | Consistency across sites creates family identity. Only palettes and layouts diverge. |
| 2026-03-28 | Chose Satoshi over Canela/GT America | Free alternative that's distinctive, geometric, modern without license cost. |
| 2026-03-28 | Chose Instrument Sans over Sohne | Free alternative with similar warmth and excellent body readability. |
