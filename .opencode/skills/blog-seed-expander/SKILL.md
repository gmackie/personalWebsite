---
name: blog-seed-expander
description: "Turn one-line blog ideas into structured draft outlines. Lowers the barrier to start writing."
---

# Blog Seed Expander

Transform one-line ideas into structured blog draft outlines, making it easier to start writing.

## Configuration

| Setting | Value |
|---------|-------|
| Output Path | `_drafts/seeds/` |
| Style Guide | `blog-helper.md` |
| Status | `seed` (distinguishes from developed drafts) |

## Commands

### `expand <idea>`

Expand a single one-liner into a draft outline.

**Example:**
```
expand: NixOS for homelab, macos, and WSL
```

### `expand-list`

Expand multiple ideas at once (inline or from file).

**Examples:**
```
expand these ideas:
- Idea one
- Idea two
- Idea three
```

```
expand ideas from ~/obsidian/blog-seeds.md
```

## Process

For each one-liner:

1. **Infer topic type:**
   - **Technical project** → Problem, Solution, Architecture, Lessons
   - **Personal reflection** → Observation, Why It Matters, My Experience, Takeaway
   - **Journey/evolution** → Before, The Change, After, What's Next
   - **Opinion/hot take** → The Claim, Why People Disagree, My Evidence, Nuance

2. **Generate contextual hook ideas** (2-3 options):
   - Technical: "The moment I realized X was broken..."
   - Reflection: "I've been thinking about X lately..."
   - Journey: "Three years ago, I would have laughed at..."
   - Opinion: "Unpopular opinion: X is actually..."

3. **Create section outline** with 3-4 sections:
   - Section title
   - 2-3 bullets of what to cover
   - Questions to answer

4. **Suggest conclusion direction**

5. **Infer categories and tags** from keywords

## Output Format

**Filename:** `_drafts/seeds/YYYY-MM-DD-slugified-title.md`

```markdown
---
layout: post
title: "Best-guess Title from Idea"
date: YYYY-MM-DD
excerpt: ""
categories: [inferred-category]
tags: [inferred, tags, here]
status: seed
---

## Hook Ideas
- [Possible opening angle 1]
- [Possible opening angle 2]
- [Possible opening angle 3]

## Outline

### Section 1: [Title]
- What to cover here
- Key point or question to answer
- Specific example to include

### Section 2: [Title]
- What to cover here
- Key point or question to answer

### Section 3: [Title]
- What to cover here
- Key point or question to answer

### Section 4: [Title] (optional)
- What to cover here

## Conclusion Direction
- [How this post might wrap up]
- [The takeaway or call to action]

## Notes
- [Topic type: technical/reflection/journey/opinion]
- [Any context worth preserving from the original idea]
- [Potential connections to other posts]
```

## Topic Type Patterns

### Technical Project
```
### The Problem
- What wasn't working
- Why existing solutions fell short

### The Solution
- What you built/configured
- Key technical decisions

### How It Works
- Architecture or setup details
- Code snippets or diagrams to include

### Lessons Learned
- What surprised you
- What you'd do differently
```

### Personal Reflection
```
### The Observation
- What triggered this thought
- Specific moment or example

### Why It Matters
- Broader implications
- Who else might feel this way

### My Experience
- Personal stories
- What you've tried

### The Takeaway
- What you've concluded
- Open questions remaining
```

### Journey/Evolution
```
### Where I Started
- The "before" state
- What I believed/used/did

### The Catalyst
- What changed
- Why you reconsidered

### The Transition
- How you made the switch
- Challenges along the way

### Where I Am Now
- Current state
- What's next
```

### Opinion/Hot Take
```
### The Claim
- State the opinion clearly
- Why it might be controversial

### The Counterargument
- What most people think
- Why they think that way

### My Evidence
- Why you believe differently
- Specific examples

### The Nuance
- Where you might be wrong
- When the opposite is true
```

## Style Reference

From `blog-helper.md`:
- Personal & conversational ("I" statements)
- Honest about uncertainty
- Specific anecdotes over abstractions
- Hook → Context → Journey → Insights → Future

## Example Transformations

**Input:** `"Pride in what you do"`

**Inferred type:** Personal reflection

**Output sections:**
- Hook Ideas: The contractor who stayed late, why I refactor "working" code
- The Observation: Examples of pride vs. indifference
- Why It Matters: Quality compounds, reputation in details
- The Hard Part: Caring vs. shipping, perfectionism trap
- My Take: Where I draw the line

---

**Input:** `"NixOS for homelab, macos, and WSL"`

**Inferred type:** Technical project (journey flavor)

**Output sections:**
- Hook Ideas: "Works on my machine" finally being true
- The Problem: Config drift, dependency hell across machines
- The Journey: Homelab first, then macOS, then WSL
- How It Works: Flakes, home-manager, key patterns
- What I Learned: Steep curve, worth it, what still sucks
