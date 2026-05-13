# gmacko.com — "Digital Zine" Redesign

**Date:** 2026-05-12
**Scope:** Visual identity, layout, interactions, and copy overhaul for gmacko.com
**Goal:** Transform gmacko.com from a clean-but-generic portfolio into a visually striking personal marketing site with genuine voice and editorial character.

## Design Direction

**Mood:** Pop-punk show flyer meets personal brand zine. Graffiti energy, urban, online-first. Subtle Burning Man radical-self-reliance undertone — DIY, anti-template, figure-it-out-yourself attitude. The site should feel like it was made by someone who's been on the internet for 20 years and isn't afraid to show personality.

**Anti-patterns (in addition to existing DESIGN.md anti-patterns):**
- No SaaS landing page patterns (centered hero, 3-feature grid, gradient CTA)
- No "vibe-coded slop" — every design choice should be intentional
- No smooth/corporate polish — roughness is a feature
- No LinkedIn energy in the copy

## Color Palette

Keep the warm paper base, crank contrast and accent energy.

### Light Mode

| Token | Old | New | Usage |
|-------|-----|-----|-------|
| --bg | #F7F3ED | #F7F3ED | Warm paper canvas (unchanged) |
| --surface | #EFEBE4 | #EFEBE4 | Card backgrounds (unchanged) |
| --surface-2 | #E6E0D7 | #E6E0D7 | Elevated surfaces (unchanged) |
| --text | #1A1714 | #0A0A0A | Body text — true black for ink-on-paper contrast |
| --text-strong | #110F0D | #0A0A0A | Headlines — true black |
| --muted | #6B6159 | #6B6159 | Secondary text (unchanged) |
| --accent | #B5451B | #D93A00 | Vivid vermillion — spray paint red, not tasteful rust |
| --accent-hover | #9A3A17 | #B83200 | Deeper on hover |
| --highlight | (none) | #FFD600 | Marker yellow — callouts, badges, hover pops |
| --rule | #D4CABC | #D4CABC | Card borders (unchanged) |
| --rule-heavy | #B8AB9A | #0A0A0A | Section dividers — true black thick rules |

### Dark Mode

| Token | Old | New | Usage |
|-------|-----|-----|-------|
| --bg | #171411 | #0F0D0B | Darker warm black |
| --surface | #1E1B17 | #1A1714 | Card backgrounds |
| --text | #E5DFD6 | #F0EBE3 | Slightly brighter text |
| --text-strong | #F5F0E8 | #FFFFFF | Pure white headlines |
| --accent | #D4612E | #FF4D00 | Brighter vermillion for dark |
| --highlight | (none) | #FFD600 | Marker yellow (same) |
| --rule-heavy | #3D3732 | #F0EBE3 | Light rules on dark = inverted contrast |

### New Semantic Tokens

| Token | Value | Usage |
|-------|-------|-------|
| --sticker-border | 3px solid var(--text) | Thick marker-weight borders on badge/tag elements |
| --sticker-rotate | rotate(var(--r, 0deg)) | Random slight rotation on sticker elements |
| --grain-opacity | 0.03 | Paper grain texture overlay opacity |

## Typography Changes

Fonts stay (Satoshi, Instrument Sans, JetBrains Mono). Hierarchy gets more dramatic:

- **Hero headline:** Satoshi 900, 5.5rem (up from 4rem), tracking -0.03em
- **Section headers:** Satoshi 900, 3.5rem, with thick underline (4px, --accent)
- **Kickers:** JetBrains Mono 700, 11px, 0.18em tracking, uppercase — "stamped" aesthetic (unchanged but emphasized)
- **Body:** Instrument Sans 400 at 15px — stays clean. The contrast between rough headlines and clean body IS the design
- **Credentials/data:** JetBrains Mono 400, slightly larger (14px), like a spec sheet

## Texture & Roughness

### Paper Grain

CSS-only noise texture overlay on `--bg`. No image files.

```css
.grain::before {
  content: '';
  position: fixed;
  inset: 0;
  opacity: var(--grain-opacity);
  background-image: url("data:image/svg+xml,..."); /* inline SVG noise */
  pointer-events: none;
  z-index: 9999;
}
```

### Sticker Treatment

Applied to: status badges, venture tags, CTA buttons, credential pills.

```css
.sticker {
  border: var(--sticker-border);
  border-radius: 4px;
  padding: 4px 10px;
  transform: rotate(var(--r, 0deg));
  transition: transform 150ms ease;
}
.sticker:hover {
  --r: 0deg; /* snaps to grid on hover */
}
```

Each sticker gets a unique `--r` value via inline style or nth-child:
- `nth-child(odd): --r: 1.5deg`
- `nth-child(even): --r: -1deg`
- `nth-child(3n): --r: 2deg`

### Thick Rules

Section dividers go from 2px warm-stone to 4px true-black (light mode) or 4px warm-white (dark mode). The marker-stroke weight.

## Layout Changes

### Hero — Poster Composition

```
┌─────────────────────────────────────────────┐
│                                             │
│  MAKING STUFF, USUALLY TOO MANY AT ONCE     │  ← JetBrains Mono kicker
│                                             │
│  Graham                                     │  ← Satoshi 900, 5.5rem
│  Mackie                                     │  ← stacked, not inline
│                                             │
│  Left Amazon after a decade of shipping     │
│  other people's roadmaps. Now I build my    │
│  own. Infrastructure, games, hardware,      │
│  whatever catches fire next — I ship it,    │
│  break it, ship it again.                   │
│                                             │
│  Seattle. Remote-first.                     │
│  Probably building something right now.     │
│                                             │
│  ┌──────────┐  ┌──────┐  ┌──────┐          │
│  │ LET'S    │  │RESUME│  │GITHUB│          │  ← sticker-styled CTAs
│  │ TALK     │  │ ↗    │  │ ↗   │          │    with slight rotations
│  └──────────┘  └──────┘  └──────┘          │
│                                             │
│  12+ YRS SHIPPING  ·  10 VENTURES  ·  10K  │  ← monospace spec sheet
│                        ACTIVE        TPS   │
│                                             │
├─────────────────────────────────────────────┤  ← 4px black rule
```

Name stacked on two lines for poster impact. Short punchy bio. Sticker CTAs.

### Ventures — Collage Grid

Variable-width cards using CSS grid with `auto-fill` and varied `span` values. Cards feel placed, not flowed.

```css
.venture-collage {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 24px;
}
.venture-card:nth-child(3n+1) { grid-column: span 2; } /* wider cards */
.venture-card {
  border: 3px solid var(--rule);
  border-radius: 2px; /* barely rounded — structure doesn't get sticker treatment */
  transition: border-color 150ms ease, transform 150ms ease;
}
.venture-card:hover {
  border-color: var(--accent);
  transform: translateY(-3px);
}
```

Status badges within cards get the sticker treatment (rotation, thick border, slight shadow on hover).

### Sections — Zine Spreads

Each major section gets:
- 4px top rule (full width)
- Oversized section header (Satoshi 900, 3.5rem)
- Thick accent underline on the header (4px, partial width — like a highlighter stroke)
- Clean content within — the drama is in the transitions, not the body

### Scroll Interactions

Minimal, physical-metaphor animations:
- **Sticker slap:** Badges/tags enter with `scale(1.08) rotate(var(--r))` → `scale(1) rotate(var(--r))` over 200ms. Like being stuck on.
- **Rule draw:** Horizontal rules animate `width: 0` → `width: 100%` on scroll-enter, 300ms. Marker being drawn.
- **No:** fade-in-up, parallax, slide-in, or choreographed sequences.

Use `IntersectionObserver` for scroll triggers. CSS `@keyframes` for the animations. No JS animation libraries.

## Copy Voice

### Landing Page

**Tone:** First person, short sentences, specific, self-aware, slightly cocky but self-deprecating. Terminally online but not try-hard. Someone who says "ngl" in Slack but writes solid design docs.

**Hero copy:**
> Left Amazon after a decade of shipping other people's roadmaps. Now I build my own. Infrastructure, games, hardware, whatever catches fire next — I ship it, break it, ship it again.
>
> Seattle. Remote-first. Probably building something right now.

**Section intros:** Short, punchy, no corporate framing.
- "The Amazon Years" → something like "10 years. 5 roles. A lot of oncall pages."
- "What I'm Into" → "Things I won't shut up about"
- "Since Leaving" → "Since walking out the door"

### Resume

**Format:** Classic action-verb bullets with specific details. Each bullet follows:
`[Strong verb] [specific thing] [measurable outcome or context]`

**Voice:** Professional but human. No "drove excellence" or "established best practices." Write like someone who actually did the work.

**Manager role emphasis:**
- People development, promotions achieved, mentorship approach
- Team growth and hiring

**Senior engineer emphasis:**
- Mentorship of junior engineers
- Technical leadership and system design
- Shipping at scale

Resume deep-dive session planned for later this week — current pass will use existing data and rewrite for better voice. User will correct specifics.

## Implementation Approach

### Phase 1: Palette & Typography (variables + design tokens)
- Update `_sass/components/_variables.scss` with new color values
- Add new tokens (`--highlight`, `--sticker-border`, `--sticker-rotate`, `--grain-opacity`)
- Update DESIGN.gmacko.md with new palette

### Phase 2: Texture & Components (new CSS)
- Add paper grain overlay
- Create `.sticker` class and apply to badges/tags/CTAs
- Update rule weights
- Add thick-underline header treatment

### Phase 3: Layout (landing page restructure)
- Restructure hero to poster composition (stacked name, sticker CTAs)
- Convert venture grid to collage layout
- Add zine-spread section treatment
- Add scroll interaction animations

### Phase 4: Copy (content rewrite)
- Rewrite hero copy
- Rewrite section headers and intros
- Rewrite resume bullets (first pass — user will refine)
- Update credentials strip copy

### Phase 5: Dark Mode
- Ensure all new treatments work in dark mode
- Verify contrast ratios
- Test grain overlay in dark mode

## Constraints

- Jekyll static site — no React/framework dependencies
- CSS custom properties for all theming
- Vanilla JS only for scroll interactions (IntersectionObserver)
- Mobile-first responsive — collage grid must degrade gracefully to single column
- Fonts are shared across all 3 sites — changes here don't affect grahammackie.com or gmac.io
- Must not break the data-driven architecture (ventures.yml, careers.yml, etc.)
