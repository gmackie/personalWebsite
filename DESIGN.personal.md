# Design — grahammackie.com

Personal website for Graham Mackie. Public but personal — blog, social links, life outside of startups. See DESIGN.md for shared typography, spacing, motion, and anti-patterns.

## Product Context

- **What this is:** Personal blog and social hub
- **Who it's for:** Friends, family, anyone curious about the person behind the ventures
- **Mood:** Relaxed, warm, approachable. Less workshop, more living room.

## Color Palette

Starts as accent-swap-only from gmacko.com. Same warm paper base, blue accent. May shift to a cooler overall tone later — iterate once it's live.

### Light Mode (default)

| Token | Value | Usage |
|-------|-------|-------|
| --bg | #F7F3ED | Warm paper (same as gmacko, may cool later) |
| --surface | #EFEBE4 | Card backgrounds |
| --surface-2 | #E6E0D7 | Elevated surfaces |
| --text | #1A1714 | Body text |
| --text-strong | #110F0D | Headlines |
| --muted | #6B6159 | Secondary text |
| --accent | #4A7FB5 | Slate blue — cooler, personal, distinct from gmacko |
| --accent-hover | #3D6A96 | Darkened for hover |
| --rule | #D4CABC | Card borders |
| --rule-heavy | #B8AB9A | Section dividers |

### Dark Mode

TBD — derive from gmacko dark mode with blue accent swap when needed.

## Layout

**Single-page, two-panel layout:**

```
┌──────────────┬───────────────────────────────┐
│              │                               │
│  [Photo]     │   Blog Feed                   │
│              │                               │
│  Graham      │   ┌─────────────────────────┐ │
│  Mackie      │   │ Post title              │ │
│              │   │ excerpt...              │ │
│  Short bio   │   └─────────────────────────┘ │
│              │                               │
│  ─────────── │   ┌─────────────────────────┐ │
│              │   │ Post title              │ │
│  Links       │   │ excerpt...              │ │
│  Instagram   │   └─────────────────────────┘ │
│  SoundCloud  │                               │
│  Steam       │   ┌─────────────────────────┐ │
│              │   │ Post title              │ │
│  ─────────── │   │ excerpt...              │ │
│              │   └─────────────────────────┘ │
│  → gmacko    │                               │
│  → gmac.io   │                               │
│              │                               │
└──────────────┴───────────────────────────────┘
```

- **Left sidebar:** Fixed/sticky. Photo, short bio, social links, cross-site links. This IS the landing page.
- **Right content area:** Scrollable blog feed. Clicking a post opens the full post; sidebar stays visible.
- **Mobile:** Sidebar collapses to a top section above the blog feed.
- **No page navigation.** The whole site is one view plus individual post pages.

## Pages

- **Landing/Blog** — The single-page layout described above. One URL, one view.
- **Post** — Individual post pages with sidebar still visible on desktop.

## What This Site Doesn't Have

- No resume or careers section (→ gmacko.com)
- No startup showcase (→ gmacko.com)
- No prototype dashboard (→ gmac.io)

## Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-03-28 | Slate blue accent (#4A7FB5) | Placeholder — cooler than gmacko's burnt sienna, distinguishes the personal site. Will iterate once live. |
| 2026-03-28 | Accent-swap-only to start | Start minimal, diverge palette later if needed. Get the site live first. |
| 2026-03-28 | Single-page sidebar layout | Bio and links are always visible. No nav needed. Simple and personal. |
