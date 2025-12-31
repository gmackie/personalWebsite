# Blog-from-Vault Skill Design

**Date:** 2025-12-30  
**Status:** Approved  
**Author:** Graham + Claude

## Overview

A skill for the personalWebsite repo that reads content-rich notes from the Obsidian vault and generates Jekyll-ready blog drafts with structured outlines and first-pass prose.

## Goals

1. **Topic Mining**: Scan vault for notes that have enough substance to become blog posts
2. **Draft Generation**: Transform vault notes into blog drafts matching existing style/format
3. **Low Friction**: Manual batch process, read-only vault access, symlinked output

## Non-Goals

- Auto-publishing (manual move from `_drafts/` to `_posts/`)
- Modifying vault notes (read-only)
- Socratic development / Q&A (future `blog-interviewer` skill)
- Bi-directional sync
- Asset/image pipeline

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    personalWebsite repo                         │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  .opencode/skills/blog-from-vault/                        │  │
│  │    ├── blog-from-vault.md    (skill definition)           │  │
│  │    ├── prompts/                                           │  │
│  │    │   ├── topic-mining.md   (scan vault, find topics)    │  │
│  │    │   └── draft-generator.md (note → outline + prose)    │  │
│  │    └── config.yml            (vault path, thresholds)     │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  _drafts/  ← output destination (symlinked from vault)          │
│  blog-helper.md  ← style guide (referenced by skill)            │
│  blog-post-outlines.md  ← format reference                      │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ reads from
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      ~/obsidian vault                           │
│  Projects/     ← primary source for Note → Draft                │
│  Areas/        ← secondary source (health protocols, etc.)      │
│  Daily/        ← excluded (private)                             │
└─────────────────────────────────────────────────────────────────┘
```

---

## Commands

### `mine`

Scan vault for blog-worthy topics and generate a report.

**Process:**
1. Scan `Projects/` and `Areas/` folders for `.md` files
2. Evaluate "blog-worthiness" based on:
   - Content length (>500 words baseline)
   - Structure signals (has sections like Architecture, Overview, Why)
   - Frontmatter (has status, tags)
   - Recency (modified in last 30 days = more relevant)
3. Score and rank candidates
4. Cross-reference against `blog-topics-tracker.md` to avoid duplicates
5. Generate report

**Output:** `_drafts/00-topic-mining-report.md`

```markdown
---
generated: 2025-12-30
---

# Blog Topic Mining Report

## High Potential (ready for draft generation)
| Note | Score | Why | Suggested Angle |
|------|-------|-----|-----------------|
| VaultAgent.md | 92 | 400+ lines, full spec, unique concept | "Building a Voice-Powered Life OS" |
| ClassCheck.md | 85 | Complete architecture, real-world problem | "Real-Time School Bus Tracking" |

## Developing (needs more content)
| Note | Score | Missing |
|------|-------|---------|
| GachaHabit.md | 60 | Needs implementation details |

## Already Tracked
- ControlPanel.md → matches "Van Home Automation" in tracker
```

### `draft <note_name>`

Generate outline + prose for a specific note.

**Process:**
1. Read the source note (e.g., `Projects/VaultAgent.md`)
2. Read style references:
   - `blog-helper.md` for voice/structure guidelines
   - `blog-post-outlines.md` for format reference
3. Analyze note content to extract:
   - Core concept/problem being solved
   - Technical details and architecture
   - Personal motivation (why this matters)
   - Challenges and lessons learned
4. Generate two-part output:
   - **Part A: Structured Outline** (hook, sections, conclusion, links)
   - **Part B: First-Pass Prose** (~600-1000 words)

**Output:** `_drafts/YYYY-MM-DD-slug-from-title.md`

```markdown
---
layout: post
title: "VaultAgent: Building a Voice-Powered Life OS"
date: 2025-12-30
excerpt: "How I built a voice assistant that interviews me daily to maintain my Obsidian vault"
categories: [maker, ai]
tags: [obsidian, voice, whisper, elevenlabs, productivity]
source_note: ~/obsidian/Projects/VaultAgent.md
status: draft
---

<!-- OUTLINE -->
## Outline

**Hook**: "I realized I was more consistent talking to my coffee maker than updating my notes..."

**Section 1: The Problem**
- Note-taking friction kills consistency
- Typing requires context-switching
- Voice is natural, hands-free

**Section 2: Architecture**
- Whisper for STT, ElevenLabs for TTS
- OpenCode as the brain
- Direct vault file manipulation

[... additional sections ...]

**Links to include**: GitHub repo, Whisper docs, ElevenLabs

---

<!-- FIRST DRAFT -->
## Draft

I realized I was more consistent talking to my coffee maker than updating my notes. Every morning, I'd have these great insights while making coffee, and by the time I sat down at my desk, they'd evaporated...

[... 600-1000 words of prose ...]
```

### `draft-all`

Batch generate drafts for all "High Potential" notes from the mining report.

---

## Configuration

**Skill config** (`.opencode/skills/blog-from-vault/config.yml`):

```yaml
vault_path: ~/obsidian
output_path: _drafts/
style_guide: blog-helper.md
outline_reference: blog-post-outlines.md

mining:
  scan_folders:
    - Projects/
    - Areas/
  exclude_folders:
    - Daily/
    - Briefings/
    - Templates/
    - Agents/
  min_word_threshold: 500
  
draft:
  target_length: 600-1000  # words
  include_outline: true
  include_prose: true
```

**Environment:**
- `OBSIDIAN_VAULT` env var can override `vault_path` for different machines

---

## Setup

**One-time symlink** (so Obsidian can see/edit drafts):

```bash
ln -s /Volumes/dev/personalWebsite/_drafts ~/obsidian/Blog\ Drafts
```

---

## Invocation

```bash
# In the blog repo directory

# Topic mining - scan vault, generate report
opencode "use blog-from-vault skill to mine topics"

# Generate draft for specific note
opencode "use blog-from-vault skill to draft VaultAgent"

# Batch draft - all high-potential notes from mining report
opencode "use blog-from-vault skill to draft all ready topics"
```

---

## Style References

The skill uses existing blog documentation:

- **`blog-helper.md`**: Voice characteristics (personal, conversational, honest), structure template (hook → context → journey → insights → future), AI prompt templates
- **`blog-post-outlines.md`**: Detailed outline format with hook, numbered sections, conclusion, links to include
- **`blog-topics-tracker.md`**: Existing topic backlog (for deduplication)

---

## Boundaries & Constraints

| Concern | Solution |
|---------|----------|
| Vault path differs per machine | Config with `~` expansion, or `OBSIDIAN_VAULT` env var |
| Wikilinks in source notes | Strip/ignore when generating prose (internal references) |
| Images/attachments | Note in outline as "TODO: add image of X" — future scope |
| Private content | Only reads from `Projects/` and `Areas/` |

**What the skill does NOT do:**
- Auto-publish (manual `_drafts/` → `_posts/` move)
- Modify vault notes (read-only access)
- Handle Socratic development (that's VaultAgent / future `blog-interviewer`)
- Sync bi-directionally (drafts don't update source notes)

---

## Future Extensions

### Phase 2: `blog-interviewer` Skill

Socratic Q&A to develop blog outlines into richer content:
- Voice input via Whisper (or text via OpenCode)
- Asks probing questions about the topic
- Captures responses and integrates into draft
- Could be part of VaultAgent or standalone skill

---

## Implementation Notes

The skill will be implemented as an OpenCode skill in `.opencode/skills/blog-from-vault/`:

1. **Skill definition** (`blog-from-vault.md`): Command routing, workflow description
2. **Topic mining prompt** (`prompts/topic-mining.md`): Instructions for vault scanning and scoring
3. **Draft generator prompt** (`prompts/draft-generator.md`): Instructions for outline + prose generation
4. **Config** (`config.yml`): Paths, thresholds, options

The skill reads files directly via OpenCode's file tools — no external dependencies required.
