# Design System — Graham Mackie (.com)

## Product Context
- **What this is:** Personal website/blog for a serial builder running 8+ ventures across edtech, industrial software, AI infrastructure, workflow tooling, game dev, and more
- **Who it's for:** Potential collaborators, investors, hiring candidates, fellow builders
- **Space/industry:** Builder/founder personal sites (peers: Patrick Collison, Rasmus Andersson, Linus Lee, Dan Wang)
- **Project type:** Portfolio site with startup showcase, blog, and resume

## Aesthetic Direction
- **Direction:** Editorial/Industrial hybrid
- **Decoration level:** Intentional. Thick horizontal rules as section dividers. Monospace uppercase kickers as structural rhythm. No gradients, no illustrations, no colored backgrounds.
- **Mood:** A workshop wall pinned with active bets. Warm, serious, alive. The content IS the design. Typography and structure do all the work.
- **Reference sites:** patrickcollison.com (minimalism), rsms.me (grid + single accent), linus.coffee (monospace-forward), danwang.co (editorial prose)

## Typography
- **Display/Hero:** Satoshi (900 weight) — Geometric confidence without being cold. Distinctive at large sizes, not overused in the builder/founder category. Load from Fontshare.
- **Body:** Instrument Sans (400, 500, 600, 700) — Warmer than typical grotesks, excellent readability at body sizes. Google Fonts.
- **UI/Labels:** Same as body (Instrument Sans)
- **Data/Tables:** JetBrains Mono (tabular-nums support) — For domains, dates, kickers, metadata, code. Technical credibility signal.
- **Code:** JetBrains Mono
- **Loading:**
  - Satoshi: `https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap`
  - Instrument Sans + JetBrains Mono: Google Fonts
- **Scale:** 15px base (1rem), 1.5 line-height
  - h1: 4rem (display, Satoshi 900, -0.02em tracking)
  - h2: 1.75rem (section headers, Satoshi 700)
  - h3: 1rem-1.1rem (card titles, Satoshi 700)
  - body: 15px / 1.05rem (Instrument Sans 400)
  - small/meta: 14px (Instrument Sans)
  - kicker: 11px (JetBrains Mono 700, 0.18em tracking, uppercase)
  - mono-data: 13px (JetBrains Mono 400)
  - mono-pill: 10px (JetBrains Mono 700, 0.08em tracking, uppercase)

## Color
- **Approach:** Restrained. One warm accent against paper-toned neutrals.
- **Background:** `#F7F3ED` — warm paper, not clinical white
- **Surface/cards:** `#EFEBE4` — slightly darker paper
- **Surface-2:** `#E6E0D7` — elevated surface for thumbnails/depth
- **Text:** `#1A1714` — warm near-black
- **Text-strong:** `#110F0D` — headlines
- **Muted:** `#6B6159` — warm stone for secondary text
- **Accent:** `#B5451B` — burnt sienna. Warm, confident, distinct from tech-blue/startup-green
- **Accent-hover:** `#9A3A17` — darkened for hover states
- **Rule/border:** `#D4CABC` — warm rule for card borders
- **Rule-heavy:** `#B8AB9A` — thick section dividers
- **Semantic:** success `#2D5F1A`/`#E8F5E0`, warning `#6B4A0A`/`#FEF3E0`, error `#7A1A1A`/`#FDE8E8`, info `#1A4A6B`/`#E4F0F8`
- **Dark mode:**
  - bg: `#171411`, surface: `#1E1B17`, surface-2: `#262220`
  - text: `#E5DFD6`, text-strong: `#F5F0E8`, muted: `#8A8078`
  - accent: `#D4612E` (brightened for contrast), accent-hover: `#E87040`
  - rule: `#2E2A25`, rule-heavy: `#3D3732`

## Spacing
- **Base unit:** 8px
- **Density:** Comfortable
- **Scale:** 2xs(4) xs(8) sm(12) md(16) lg(24) xl(32) 2xl(48) 3xl(64)

## Layout
- **Approach:** Grid-disciplined with editorial tension
- **Grid:** Single column at mobile, 2-col startup grid at 600px+, 3-col overview grid at 600px+
- **Max content width:** 960px
- **Border radius:** sm: 4px (buttons, pills, inputs), md: 8px (cards), lg: 12px (hero containers). No bubbly/full-round on cards.
- **Alignment:** Left-aligned by default. Hero as poster composition, not centered welcome mat.
- **Section rhythm:** Thick horizontal rules (`border-top: 2px solid var(--rule-heavy)`) between major sections. 48px vertical spacing between sections.

## Motion
- **Approach:** Minimal-functional
- **Easing:** enter(ease-out) exit(ease-in) move(ease-in-out)
- **Duration:** micro(50-100ms) short(150ms) medium(250ms)
- **Card hover:** translateY(-2px) + border-color change to accent, 150ms
- **Link transitions:** color 150ms ease
- **No choreography, no scroll-driven animation, no entrance animations**

## Anti-Patterns (never use)
- Purple/violet gradients
- 3-column icon grids with colored circles
- Centered everything with uniform spacing
- Uniform bubbly border-radius (999px on cards)
- Gradient buttons
- Decorative blobs, illustrations, or background patterns
- Inter, Roboto, Poppins, Montserrat, Open Sans, Lato as primary fonts

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-03-28 | Initial design system created | Created by /design-consultation with competitive research (7 builder sites) + Codex and Claude subagent design voices. All three voices agreed on: kill green/purple, use monospace for metadata, typography-first with minimal decoration. Codex proposed warm editorial direction, subagent proposed dark dashboard. Final system synthesizes warm editorial palette with live-system energy. |
| 2026-03-28 | Chose Satoshi over Canela/GT America | Codex recommended Canela (paid serif), subagent recommended GT America (paid sans). Satoshi chosen as free alternative that's distinctive, geometric, and modern without requiring a license. |
| 2026-03-28 | Chose Instrument Sans over Sohne | Both external voices recommended Sohne (Klim Type Foundry, paid). Instrument Sans is the free alternative with similar warmth and excellent body readability. |
| 2026-03-28 | Burnt sienna accent (#B5451B) | Deliberately non-tech. Every builder site uses blue, green, or grayscale. Warm rust accent matches the paper palette and says "editorial studio" not "SaaS landing page." |
