---
layout: post
title: "VaultAgent: Building a Voice-Powered Personal Life OS"
date: 2025-12-31
excerpt: "I got tired of typing daily notes, so I'm building an AI that interviews me while I make coffee."
categories: [ai, maker]
tags: [voice, obsidian, llm, personal-productivity, python]
comments: true
source_note: ~/obsidian/Projects/VaultAgent.md
status: draft
---

<!-- OUTLINE -->
## Outline

**Target Length**: 800-1000 words
**Categories**: [ai, maker]
**Tags**: [voice, obsidian, llm, personal-productivity, python]

**Hook**: "I've tried every productivity system—Notion, Roam, bullet journals, even sticky notes on my monitor. The problem was never the system. It was me. I'd build beautiful dashboards and then abandon them within a week because typing out my thoughts felt like homework."

**Section 1: The Friction Problem**
- Daily journaling/tracking requires typing
- Speaking is 3-4x faster than typing
- We naturally share more when talking
- Morning routine already has hands-free time (coffee, getting ready)

**Section 2: The VaultAgent Concept**
- AI voice agent that conducts daily "interviews"
- Integrated with sun-up/sun-down routines
- Asks tailored questions based on vault context
- Writes structured updates to Obsidian files

**Section 3: Architecture Decisions**
- Whisper for speech-to-text (fast, accurate)
- OpenCode/Claude as the "brain" with vault context
- ElevenLabs for natural-sounding responses
- Direct filesystem access to Obsidian vault

**Section 4: Conversation Design**
- One question at a time
- Follow-up on vague answers
- Context-aware (knows yesterday's tasks, current projects)
- 5-10 minute morning and evening flows

**Section 5: The Cost Reality**
- ~$15-30/month for daily use
- Could be free with local Whisper
- Worth it for consistency?

**Conclusion**: "The goal isn't to build another productivity tool—it's to make reflection as natural as conversation. If I can answer a few questions while making coffee, maybe I'll actually stick with it."

**Links to include**: OpenCode, Obsidian, ElevenLabs, Whisper

---

<!-- FIRST DRAFT -->
## Draft

I've tried every productivity system—Notion, Roam, bullet journals, even sticky notes on my monitor. The problem was never the system. It was me. I'd build beautiful dashboards and then abandon them within a week because typing out my thoughts felt like homework.

<!--more-->

Then I realized something obvious: I talk to myself constantly. In the shower, in the car, while making coffee. The barrier to reflection isn't time or discipline—it's the keyboard. So I'm building VaultAgent, an AI that interviews me every morning and evening, then updates my Obsidian vault automatically.

### The Friction Problem

Here's the thing about daily tracking: it works. The data is valuable. Knowing how I slept, what I accomplished, what's blocking me—that context makes better decisions. But the act of opening a text editor and typing "Today I woke up feeling..." kills me. It feels performative and slow.

Speaking is different. I can dump 300 words of stream-of-consciousness in the time it takes to type 50. When someone asks how my day went, I don't give them a bulleted list. I tell a story. That's the interaction model I want with my personal system.

The morning routine is perfect for this. I'm already hands-free—making coffee, getting dressed, walking around. If an AI can ask me three smart questions during that time, I get my daily reflection without changing anything about my routine.

### The Design

VaultAgent is essentially a voice-activated pipeline: my speech goes to OpenAI's Whisper for transcription, then to Claude (via OpenCode) for processing, then to ElevenLabs for natural-sounding responses. The AI has full context on my vault—yesterday's notes, active projects, health tracking—so it can ask relevant questions.

The conversation design matters more than the tech. The agent asks one question at a time (don't overwhelm), follows up on vague answers ("tell me more about that"), and keeps the whole interaction under 10 minutes. Morning might be: How'd you sleep? What's your main focus today? Any blockers? Evening might be: What'd you get done? Any wins? What's on your mind for tomorrow?

Every response maps to a structured update. "I slept about 7 hours" becomes `sleep: 7` in today's daily note. "Need to work on the ClassCheck prototype" creates a task and links to the project file. The AI isn't just taking notes—it's maintaining the system.

### The Architecture

The tech stack is deliberately simple:

```
Voice → Whisper (STT) → Claude via OpenCode → ElevenLabs (TTS) → Speaker
                              ↓
                      Obsidian Vault
```

**Whisper** handles speech-to-text. The API version is fast and accurate. I could run it locally for free, but that requires GPU and adds latency.

**OpenCode** is the brain. It runs Claude with full vault context—reading existing notes, understanding my projects, knowing what I tracked yesterday. The system prompt defines conversation flows and the format for vault updates.

**ElevenLabs** makes the responses sound human. There's something about a natural voice that makes the interaction feel like a conversation instead of dictation. Budget is maybe $5-20/month depending on usage.

**Direct filesystem access** to Obsidian means no plugins or sync issues. The agent reads and writes markdown files following my existing conventions—frontmatter for structured data, wiki-links for connections.

### The Honest Parts

This is still in planning. I haven't written a line of code yet—just the spec. Here's what I'm uncertain about:

**Push-to-talk vs wake word vs always listening?** Wake words are annoying ("Hey VaultAgent"), push-to-talk is friction, always listening is creepy. Probably starting with push-to-talk and iterating.

**Will the cost be worth it?** ~$15-30/month for daily STT and TTS. That's not nothing. But if it's the difference between maintaining the system and abandoning it, it's trivial.

**Am I just procrastinating on actually journaling?** Building the tool that helps you do the thing is a classic trap. But the spec is done. Next step is prototype code.

### Why This Might Work

The bet is simple: I'm more likely to answer questions out loud than type answers. If that's true, VaultAgent solves my consistency problem. If it's not, I've wasted a weekend on an interesting Python project.

The deeper motivation is making the vault actually useful. Right now it's a pile of notes I rarely review. If an AI can synthesize context—"You've been working on ClassCheck for two weeks, you mentioned feeling stuck on WebSocket reconnection, your fast is going well"—the system becomes genuinely intelligent.

I'm starting with the audio pipeline this week: mic capture, Whisper transcription, ElevenLabs playback. Just prove the voice interaction feels natural. Then I'll add Claude and vault operations. The goal is a working morning flow within a few sessions.

If you're curious about voice-first interfaces or have thoughts on the architecture, I'd love to hear about it. This feels like the kind of project that gets better with outside perspective.
