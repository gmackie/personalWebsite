# Blog-from-Vault Skill Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create an OpenCode skill that scans the Obsidian vault for blog-worthy notes and generates Jekyll-ready drafts.

**Architecture:** Single skill with embedded prompts for topic mining and draft generation. Reads from `~/obsidian`, writes to `_drafts/`, references existing style guides.

**Tech Stack:** OpenCode skill (Markdown), no external dependencies.

---

## Task 1: Create Skill Directory Structure

**Files:**
- Create: `.opencode/skills/blog-from-vault/SKILL.md`

**Step 1: Create the directory**

```bash
mkdir -p .opencode/skills/blog-from-vault
```

**Step 2: Verify directory exists**

```bash
ls -la .opencode/skills/blog-from-vault
```

Expected: Empty directory created

**Step 3: Commit structure**

```bash
git add .opencode/
git commit -m "chore: create blog-from-vault skill directory"
```

---

## Task 2: Create Main Skill Definition

**Files:**
- Create: `.opencode/skills/blog-from-vault/SKILL.md`

**Step 1: Write the skill file**

Create `.opencode/skills/blog-from-vault/SKILL.md` with the following content:

```markdown
---
name: blog-from-vault
description: "Generate blog drafts from Obsidian vault notes. Commands: mine (find topics), draft <note> (generate outline+prose), draft-all (batch)."
---

# Blog from Vault

Generate Jekyll-ready blog drafts from Obsidian vault notes.

## Configuration

| Setting | Value |
|---------|-------|
| Vault Path | `~/obsidian` (or `$OBSIDIAN_VAULT` env var) |
| Output Path | `_drafts/` |
| Scan Folders | `Projects/`, `Areas/` |
| Exclude | `Daily/`, `Briefings/`, `Templates/`, `Agents/` |
| Min Words | 500 |

## Commands

### `mine` - Topic Mining

Scan vault for blog-worthy notes and generate a report.

**Process:**
1. Read all `.md` files from `Projects/` and `Areas/` in the vault
2. For each note, evaluate blog-worthiness:
   - Word count (>500 = candidate)
   - Has structure (headers like ## Overview, ## Architecture, ## Why)
   - Has frontmatter (tags, status)
   - Recently modified (bonus points)
3. Score each note 0-100
4. Read `blog-topics-tracker.md` to identify already-tracked topics
5. Generate report to `_drafts/00-topic-mining-report.md`

**Output Format:**

```markdown
---
generated: YYYY-MM-DD
type: mining-report
---

# Blog Topic Mining Report

## High Potential (Score 70+)
| Note | Score | Why | Suggested Angle |
|------|-------|-----|-----------------|
| [filename] | [score] | [reasoning] | [blog title idea] |

## Developing (Score 40-69)
| Note | Score | Missing |
|------|-------|---------|
| [filename] | [score] | [what would make it ready] |

## Already Tracked
- [note] → matches "[topic]" in blog-topics-tracker.md
```

### `draft <note_name>` - Generate Draft

Transform a vault note into a blog draft with outline and prose.

**Process:**
1. Find the note in vault (search Projects/ then Areas/)
2. Read the source note content
3. Read style references:
   - `blog-helper.md` - Voice: personal, conversational, honest. Structure: hook → context → journey → insights → future
   - `blog-post-outlines.md` - Format: Hook, numbered sections with bullets, conclusion, links
4. Analyze the note to extract:
   - Core concept/problem
   - Technical details
   - Personal motivation (why this matters)
   - Challenges and lessons
5. Generate Jekyll draft with outline + prose

**Output Format:**

```markdown
---
layout: post
title: "[Generated from note title]"
date: YYYY-MM-DD
excerpt: "[One-sentence summary]"
categories: [category]
tags: [tag1, tag2, tag3]
source_note: ~/obsidian/[path/to/note.md]
status: draft
---

<!-- OUTLINE -->
## Outline

**Target Length**: [600-1000] words
**Categories**: [categories]
**Tags**: [tags]

**Hook**: "[Compelling opening sentence/anecdote]"

**Section 1: [Title]**
- Bullet point
- Bullet point

**Section 2: [Title]**
- Bullet point
- Bullet point

[... more sections ...]

**Conclusion**: "[Wrap-up thought]"

**Links to include**: [relevant links from note]

---

<!-- FIRST DRAFT -->
## Draft

[600-1000 words of prose following Graham's style:
- Personal & conversational ("I" statements)
- Honest & vulnerable (share struggles)
- Specific anecdotes and examples
- Technical details made accessible
- Forward-looking ending]
```

### `draft-all` - Batch Draft Generation

Generate drafts for all "High Potential" notes from the mining report.

**Process:**
1. Read `_drafts/00-topic-mining-report.md`
2. Extract notes from "High Potential" section
3. Run `draft` command for each note
4. Report what was generated

## Style Guide Reference

From `blog-helper.md`:

**Voice:**
- Personal & Conversational: Use "I" statements, address readers directly
- Honest & Vulnerable: Share struggles and uncertainties
- Reflective: Include self-reflection about learning and growth
- Informal but Thoughtful: Use contractions, maintain clarity

**Structure:**
1. Hook: Start with personal anecdote or specific observation
2. Context: Set the scene with background
3. Journey: Walk through the experience/project/learning
4. Insights: Share what you learned or discovered
5. Future: End with forward-looking thoughts or commitments

## Wikilink Handling

When processing vault notes:
- Strip `[[wikilinks]]` - convert to plain text or ignore
- Preserve code blocks and technical content
- Note image references as "TODO: add image" in outline

## Example Invocations

```bash
# Mine topics
opencode "use blog-from-vault to mine topics from my vault"

# Draft specific note
opencode "use blog-from-vault to draft VaultAgent"

# Batch draft
opencode "use blog-from-vault to draft all high-potential topics"
```
```

**Step 2: Verify file was created**

```bash
cat .opencode/skills/blog-from-vault/SKILL.md | head -20
```

Expected: Shows frontmatter and beginning of skill

**Step 3: Commit skill definition**

```bash
git add .opencode/skills/blog-from-vault/SKILL.md
git commit -m "feat: add blog-from-vault skill definition

Skill for generating blog drafts from Obsidian vault notes:
- mine: scan vault for blog-worthy topics
- draft: generate outline + prose for specific note  
- draft-all: batch generate from mining report"
```

---

## Task 3: Test Topic Mining

**Files:**
- Read: `~/obsidian/Projects/*.md`, `~/obsidian/Areas/**/*.md`
- Write: `_drafts/00-topic-mining-report.md`

**Step 1: Invoke the skill for mining**

```bash
# In personalWebsite directory
opencode "use the blog-from-vault skill to mine topics from my vault"
```

**Step 2: Verify output was created**

```bash
cat _drafts/00-topic-mining-report.md
```

Expected: Mining report with scored notes from vault

**Step 3: Review and adjust if needed**

If output doesn't match expected format, refine SKILL.md and re-test.

---

## Task 4: Test Draft Generation

**Files:**
- Read: `~/obsidian/Projects/VaultAgent.md`
- Read: `blog-helper.md`, `blog-post-outlines.md`
- Write: `_drafts/YYYY-MM-DD-vaultagent-*.md`

**Step 1: Invoke the skill for drafting**

```bash
opencode "use blog-from-vault skill to draft VaultAgent"
```

**Step 2: Verify output**

```bash
ls _drafts/*.md
cat _drafts/*vaultagent*.md | head -50
```

Expected: Jekyll-ready draft with frontmatter, outline, and prose sections

**Step 3: Quality check**

Verify the draft:
- [ ] Has correct Jekyll frontmatter (layout, title, date, tags)
- [ ] Has `source_note` reference
- [ ] Outline matches blog-post-outlines.md format
- [ ] Prose follows blog-helper.md style (conversational, "I" statements)
- [ ] Wikilinks are stripped/converted

---

## Task 5: Set Up Symlink

**Step 1: Create symlink from vault to drafts**

```bash
ln -s /Volumes/dev/personalWebsite/_drafts ~/obsidian/Blog\ Drafts
```

**Step 2: Verify symlink works**

```bash
ls -la ~/obsidian/Blog\ Drafts
ls ~/obsidian/Blog\ Drafts/
```

Expected: Shows symlink pointing to `_drafts/`, lists draft files

**Step 3: Test editing from Obsidian**

Open Obsidian, navigate to "Blog Drafts" folder, verify files are visible and editable.

---

## Task 6: Final Commit and Documentation

**Step 1: Ensure all changes committed**

```bash
git status
```

**Step 2: Update design doc with "Implemented" status**

Edit `docs/plans/2025-12-30-blog-from-vault-design.md`:
- Change `Status: Approved` to `Status: Implemented`

**Step 3: Commit status update**

```bash
git add docs/plans/2025-12-30-blog-from-vault-design.md
git commit -m "docs: mark blog-from-vault design as implemented"
```

---

## Success Criteria

- [ ] Skill directory exists at `.opencode/skills/blog-from-vault/`
- [ ] `SKILL.md` defines mine, draft, and draft-all commands
- [ ] `mine` command produces `_drafts/00-topic-mining-report.md`
- [ ] `draft` command produces Jekyll-ready draft with outline + prose
- [ ] Symlink allows editing drafts from Obsidian
- [ ] All changes committed to git
