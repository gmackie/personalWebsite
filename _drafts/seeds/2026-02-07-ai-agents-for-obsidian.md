---
layout: post
title: "AI Agents for Obsidian: Automating My Second Brain"
date: 2026-02-07
excerpt: "I built five AI agents that write directly into my Obsidian vault. One briefs me every morning, another digests my day, and I'm still not sure if this is brilliant or unhinged."
categories: [ai, projects]
tags: [ai, obsidian, agents, automation, personal-productivity]
status: seed
---

## Hook Ideas
- "I woke up this morning to a briefing I didn't write. It was in my Obsidian vault, formatted perfectly, and it knew what I was working on yesterday."
- "What if your notes app maintained itself? I gave AI agents write access to my second brain and here's what happened."
- "I have five AI employees. They work overnight, they never complain, and their only job is to keep my knowledge base alive."

## Outline

### Section 1: Why Manual Note Maintenance Fails
- Everyone starts Obsidian (or Notion, or Roam) with big ambitions
- The reality: you take notes for three weeks, stop reviewing them, and they rot
- The maintenance problem isn't capture — it's processing, connecting, and resurfacing
- Weekly reviews become monthly reviews become "I should really go through my notes sometime"
- The backlog of unprocessed notes is the silent killer of every PKM system
- My vault was 2,000+ notes and maybe 10% of them were doing anything useful

### Section 2: The Agent Architecture
- Containerized agents that run on a schedule and write directly to the vault
- Each agent is a Docker container with: a system prompt, access to the vault, a schedule, and output conventions
- They read from the vault, process information, and write new notes or update existing ones
- The vault syncs via Git — agents push, Obsidian pulls, no conflicts because agents write to designated areas
- Why containers and not just scripts: isolation, logging, independent failure, easy to add/remove agents
- The stack: Python, LLM API calls, Git, cron — intentionally boring infrastructure

### Section 3: The Five Agent Roles
- **Morning Briefer**: runs at 6am, summarizes what's on my plate today based on yesterday's notes, calendar, and active projects. The note I wake up to.
- **Evening Digestor**: runs at 10pm, takes the day's raw notes and daily log, extracts action items, tags loose threads, files things properly
- **Weekly Reviewer**: runs Sunday night, synthesizes the week, identifies patterns, surfaces forgotten threads, writes a "week in review" note
- **Cataloger**: runs daily, scans for unlinked mentions, suggests connections, maintains the tag taxonomy, keeps the vault graph healthy
- **Condenser**: runs weekly, finds verbose notes and creates concise summaries, archives stale content, keeps the active vault lean
- Each agent has specific reading/writing permissions — they don't step on each other's work

### Section 4: Writing Guidelines and Vault Conventions
- The agents follow the same formatting conventions I use: specific heading structure, tag format, link style
- This is the hardest part to get right — AI that writes in your voice, in your system
- The system prompts are long and specific: "use this date format," "never create a new top-level folder," "always link to the daily note"
- Template-driven output so the notes feel native, not AI-generated
- The tone calibration: agents write in a neutral, informational voice — not trying to be me, just useful
- Version control as safety net: every agent commit is atomic, reviewable, and revertable

### Section 5: What Actually Works vs What's Still Aspirational
- **Works great**: Morning Briefer (genuinely useful, read it every day), Evening Digestor (catches things I'd miss), Cataloger (vault hygiene I'd never do manually)
- **Works okay**: Weekly Reviewer (good but sometimes too surface-level), Condenser (aggressive about what to cut)
- **Honest problems**: sometimes agents create noise instead of signal, the quality depends entirely on prompt engineering, LLM costs add up for daily runs
- The tuning loop: reading agent output, adjusting prompts, repeat forever
- False confidence: agents can sound authoritative about connections that don't actually exist

### Section 6: The Philosophical Question
- When AI maintains your personal knowledge base, is it still personal?
- The "second brain" metaphor gets weird when a literal non-human brain is doing the maintenance
- Do I think differently because I know my notes are being processed? (Yes, actually)
- The trust gradient: I trust the Briefer completely, the Condenser barely
- Where this goes: agents that don't just maintain notes but actively research and expand them
- The line between "tool that helps me think" and "thing that thinks adjacent to me"

## Conclusion Direction
- AI agents for Obsidian started as a productivity hack and turned into something more interesting
- The vault is healthier than it's ever been — notes are connected, processed, and actually resurface
- But it changed my relationship with my own knowledge system in ways I'm still figuring out
- The practical takeaway: if you have a PKM system that's gathering dust, agents might be the maintenance layer you're missing

## Notes
- Topic type: project deep-dive + philosophical reflection
- The morning briefing hook is strong — lead with the visceral experience of waking up to AI-written notes
- Be specific about the agent prompts and output without turning this into a tutorial
- The philosophical section is what elevates this beyond "I automated my notes" — give it space
- Acknowledge the PKM/productivity nerd audience but write for a broader reader
- Don't oversell — be honest about the tuning effort and ongoing maintenance of the agents themselves
