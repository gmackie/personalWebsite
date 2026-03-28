# Design — gmac.io

Prototype dashboard. Bold, aggressive, dark. Where startups are born. Caveat emptor — explicitly not production. See DESIGN.md for shared typography, spacing, motion, and anti-patterns.

## Product Context

- **What this is:** Live dashboard for prototypes and experiments running on Hetzner VPSs and local homelab
- **Who it's for:** Graham (primary), anyone curious enough to poke around
- **Mood:** Neon signage in a dark workshop. The page breathes — live things glow, dead things don't. Raw status, no polish.

## Color Palette

Dark mode only. Neon accents for status signaling.

| Token | Value | Usage |
|-------|-------|-------|
| --bg | #0D0D0D | Near-black |
| --surface | #1A1A1A | Card backgrounds |
| --surface-2 | #242424 | Elevated surfaces |
| --text | #E0E0E0 | Body text |
| --text-strong | #FFFFFF | Headlines |
| --muted | #707070 | Secondary text |
| --accent | #BF5AF2 | Neon purple — primary accent, headers, labels |
| --accent-hover | #A344D4 | Hover state |
| --rule | #2A2A2A | Card borders, grid lines |
| --rule-heavy | #3A3A3A | Section dividers |

### Status Colors (neon set)

| Status | Color | Glow |
|--------|-------|------|
| Live | #00FF88 | `box-shadow: 0 0 8px #00FF88` |
| Degraded | #FFB800 | `box-shadow: 0 0 8px #FFB800`, slow pulse |
| Down | #FF3366 | `box-shadow: 0 0 8px #FF3366` |
| Coming soon | #707070 | No glow |
| Local only | #00BFFF | `box-shadow: 0 0 6px #00BFFF` |

## Visual Treatment

### Grid Background

Subtle graph paper. `1px` lines at `40px` intervals, very faint (`#161616` on `#0D0D0D`). Uses `--grid-line` token, separate from `--rule` so card borders remain visible. Applied to `body` or the main container. Not decorative — structural.

```css
background-image:
  linear-gradient(var(--rule) 1px, transparent 1px),
  linear-gradient(90deg, var(--rule) 1px, transparent 1px);
background-size: 40px 40px;
```

### Neon Glow

- Status dots: colored `box-shadow` per status table above
- Headings: `text-shadow: 0 0 20px var(--accent)` — neon purple glow, like a sign seen from across the street
- Stack pills: faint neon border (`1px solid` with low-opacity accent)

### Breathing Animation

Live services pulse slowly. Dead services are static. The page has life.

```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
.status-live { animation: pulse 2s ease-in-out infinite; }
```

## Layout

### Dashboard Grid

```
┌─────────────────────────────────────────────────┐
│  gmac.io                            3 live      │
│  prototypes & experiments                       │
├─────────────────────────────────────────────────┤
│                                                 │
│  ● ForgeGraph        forge.gmac.io     24d up   │
│    nix · caddy · gitea                          │
│    ▾ dependencies                               │
│      ● gitea          healthy     12ms          │
│      ● caddy          healthy      3ms          │
│      ● postgres       healthy      8ms          │
│      ○ redis          unreachable               │
│                                                 │
│  ◐ Bob               tailscale only             │
│    go · tailscale                               │
│                                                 │
│  ○ LevelForge        coming soon                │
│    godot · rust                                 │
│                                                 │
├─────────────────────────────────────────────────┤
│  ● live  ◐ local-only  ○ coming soon            │
├─────────────────────────────────────────────────┤
│                                                 │
│  BUILD LOG                                      │
│  ─────────                                      │
│  2026-03-27  ForgeGraph: added health endpoint  │
│  2026-03-25  Bob: migrated to Go                │
│  2026-03-20  PlayTrek: initial prototype        │
│                                                 │
└─────────────────────────────────────────────────┘
```

- **Prototype cards:** Monospace-heavy. Name, URL, stack pills, uptime. Clicking expands the dependency health tree.
- **Dependency tree:** Inherits neon dot treatment. Unreachable deps get red glow. Parent dot goes amber if any child is degraded.
- **Build log:** Below the dashboard grid. Posts from `_posts/gmac/` rendered as a changelog feed. Monospace dates, short descriptions.
- **Max width:** 960px (same as other sites)

## Data Sources

### Static Catalog

`_data/gmac/prototypes.yml` — editorial content, updated manually:

```yaml
- name: ForgeGraph
  url: https://forge.gmac.io
  description: Graph-oriented deployment and infrastructure orchestration
  status: active
  stack: [nix, caddy, gitea]

- name: Bob
  url: https://bob.tail1e1a32.ts.net
  description: Task management over Tailscale
  status: active
  stack: [go, tailscale]
  internal: true
```

### Client-Side Health

Small vanilla JS module:
1. For public URLs: `fetch(url)` with timeout, green/red based on response
2. For ForgeGraph apps: calls a ForgeGraph deep health endpoint, returns dependency tree with per-dependency status and latency
3. For internal/Tailscale URLs: shows "local only" badge, no ping
4. Fallback: if health endpoint unreachable, show static YAML catalog with "status unknown" badges

## Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-03-28 | Dark mode only | Dashboard aesthetic. No light mode needed — this is a workshop, not a reading room. |
| 2026-03-28 | Neon signage over terminal/hacker | Neon glow gives the "alive" energy without cosplaying a terminal. Glowing status dots are instantly readable. |
| 2026-03-28 | Deep health tree from ForgeGraph | ForgeGraph already has `forge service health --deep`. Surface the data, don't just show top-level green/red. |
| 2026-03-28 | Hybrid static + client-side data | YAML catalog for what exists (editorial), JS health ping for liveness (dynamic). Graceful fallback if API unreachable. |
