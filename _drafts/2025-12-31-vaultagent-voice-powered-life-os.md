---
layout: post
title: "VaultAgent: Building a Voice-Powered Personal Life OS"
date: 2025-12-31
excerpt: "I keep abandoning productivity systems because typing my thoughts feels like homework. So I'm building an AI that interviews me while I make coffee."
categories: [ai, maker]
tags: [voice, obsidian, llm, personal-productivity, python]
comments: true
source_note: ~/obsidian/Projects/VaultAgent.md
status: draft
---

I've tried every productivity system -- Notion, Roam, bullet journals, sticky notes on my monitor. The problem was never the system. It was me. I'd build beautiful dashboards and abandon them within a week because typing out my thoughts felt like homework.

Then I realized something obvious: I talk to myself constantly. In the shower, in the car, while making coffee. The barrier to reflection isn't time or discipline -- it's the keyboard.

<!--more-->

So I'm building VaultAgent, an AI that interviews me every morning and evening and writes the results straight into my Obsidian vault.

## The friction problem

Here's the thing about daily tracking: it works. The data is valuable. Knowing how I slept, what I accomplished, what's blocking me -- that context makes better decisions. But opening a text editor and typing "Today I woke up feeling..." kills me. It's slow and it feels performative.

Speaking is different. I can dump 300 words of stream-of-consciousness in the time it takes to type 50. When someone asks how my day went, I don't give them a bulleted list. I tell a story. That's the interaction model I want.

The morning routine is perfect for this. I'm already hands-free -- making coffee, getting dressed, walking around. If an AI asks me three smart questions during that time, I get daily reflection without changing anything about my routine.

## The architecture

The pipeline is deliberately simple:

```
Voice --> Whisper (STT) --> Claude via OpenCode --> ElevenLabs (TTS) --> Speaker
                                  |
                            Obsidian Vault
```

Whisper handles speech-to-text. Claude (via OpenCode) is the brain -- it has full context on my vault, knows yesterday's notes, understands my active projects. ElevenLabs makes responses sound human, which matters more than you'd think. A natural voice turns it into a conversation instead of dictation. And the agent reads and writes directly to the filesystem, so there are no plugins or sync issues -- just markdown files following my existing conventions.

## Conversation design matters more than tech

The agent asks one question at a time. No overwhelming. It follows up on vague answers ("tell me more about that"). It keeps the whole interaction under ten minutes.

Morning flow might be: How'd you sleep? What's your main focus today? Any blockers? Evening: What'd you get done? Any wins? What's on your mind for tomorrow?

Every response maps to a structured update. "I slept about 7 hours" becomes `sleep: 7` in today's daily note. "Need to work on the ClassCheck prototype" creates a task and links to the project file. The AI isn't just transcribing -- it's maintaining the system.

## The honest parts

I haven't written a line of code yet. Just the spec. Here's what I'm still uncertain about:

**Push-to-talk vs wake word vs always listening.** Wake words are annoying ("Hey VaultAgent"), push-to-talk adds friction, always listening is creepy. Probably starting with push-to-talk and iterating.

**Will the cost be worth it?** Roughly $15-30/month for daily STT and TTS. That's not nothing. But if it's the difference between maintaining the system and abandoning it, it's trivial.

**Am I just procrastinating on actually journaling?** Building the tool that helps you do the thing is a classic trap. But the spec is done, and I'm starting with the audio pipeline: mic capture, Whisper transcription, ElevenLabs playback. Just prove the voice interaction feels natural, then add Claude and vault operations.

## Why this might work

The bet is simple: I'm more likely to answer questions out loud than type answers. If that's true, VaultAgent solves my consistency problem. If not, I've wasted a weekend on an interesting Python project.

The deeper motivation is making the vault actually useful. Right now it's a pile of notes I rarely review. If an AI can synthesize context across my projects -- what I've been working on, where I'm stuck, how my habits are going -- the system becomes genuinely intelligent instead of just a filing cabinet.

This is a personal tool, not one of the [five MVPs I'm building in parallel](/articles/2026-02/building-five-mvps-with-ai). But it feeds into everything else -- a working VaultAgent means better daily tracking, which means better decision-making across all five products.
