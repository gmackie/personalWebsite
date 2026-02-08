---
layout: post
title: "AI Agents and Skills: Building a Developer Workflow That Actually Works"
date: 2026-02-07
excerpt: "How I built a structured AI development workflow with Claude Code, custom skills, and MCP integrations -- and why discipline beats raw intelligence when working with LLMs"
categories: [ai, technical]
tags: [ai, agents, mcp, claude-code, skills, workflow, llm]
status: seed
---

## Hook Ideas
- "The first thing I taught my AI agent was to stop and think before writing code. Sound familiar?"
- "Everyone talks about AI replacing developers. Nobody talks about the boring infrastructure that makes AI actually useful for development."
- "I gave my AI agent a task management system, a code review checklist, and deployment verification scripts. It became 10x more useful than when I just said 'build me X.'"

## Outline

### Section 1: The Problem with Ad-Hoc AI Development
- The default mode: open a chat, paste some code, ask a question, copy the answer
- Why this breaks down for real projects (no memory, no verification, no structure)
- The "magic autocomplete" trap -- expecting AI to just know what you want
- What I wanted instead: AI as a disciplined team member, not a party trick

### Section 2: The Agent Layer -- Claude Code and Why CLI Matters
- Why a CLI agent beats a chat interface for development work
- File system access, tool use, and persistent context within a session
- The skills system: reusable prompt-based workflows that shape agent behavior
- Concrete example: what a "plan" skill session looks like vs an unstructured prompt
- Key skills: brainstorming, planning, code review, deployment verification, TDD

### Section 3: The Integration Layer -- MCP and Connecting Agents to Real Tools
- What MCP (Model Context Protocol) is and why it matters
- The principle: agents should have access to the same tools developers use
- Kubernetes MCP: agent reads pod logs, checks node health, investigates issues
- Gitea MCP: agent creates PRs, reviews code, reads commit history
- Harbor MCP: agent manages container images and verifies deployments
- Before/after: investigating a deployment issue with and without MCP

### Section 4: The Orchestration Layer -- Task Management for Agents
- Why agent work needs to be visible and tracked
- tasks.gmac.io: a task management system exposed via MCP
- Agent capabilities: claim tasks, post updates, complete/fail work, create follow-ups
- How this enables multi-agent workflows (explore -> plan -> implement)

### Section 5: Agent Types and Why Specialization Matters
- The explore/plan/implement pattern
- Why a single "do everything" agent produces worse results than specialized handoffs
- Real example: building a feature using the full explore -> plan -> implement chain

### Section 6: What I've Learned
- Structure beats intelligence: a mediocre model with a good workflow outperforms a brilliant model winging it
- Evidence-based verification: "I ran the test and it passed" vs "this should work"
- Skills are encoded engineering culture
- Honest assessment: where this still falls short

## Conclusion Direction
- This is not about AI replacing developers -- it's about building the infrastructure that makes AI a reliable collaborator
- The real competitive advantage is not access to AI models but the workflows around them
- Connection to the broader [MVP portfolio approach](/articles/2026-02/building-five-mvps-with-ai)

## Notes
- Topic type: technical + philosophy, grounded in real daily practice
- Include concrete before/after examples
- Avoid hype cycle framing -- focus on what actually works today
- Should feel like a senior engineer explaining their toolchain
