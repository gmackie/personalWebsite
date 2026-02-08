---
layout: post
title: "Building Five MVPs with AI (Without Lying to Myself)"
date: 2026-02-08
excerpt: "I'm building five products at once by standardizing the stack and treating AI like a junior dev with structure, not a magic wand. Here's how."
categories: [startups, ai]
tags: [startups, venture-studio, ai, llm, opencode, create-t3-turbo, turborepo, mcp, kubernetes, gitea, harbor, argocd, postgres, sentry, posthog, resend, prompting, workflow]
comments: true
status: draft
---

I have a graveyard of half-built repos and notebooks full of product ideas that never shipped. You probably do too.

The problem was never ideas. It was throughput. The gap between "this could work" and "someone can actually use this" is enormous, and I kept getting stuck in the middle -- endlessly scaffolding, endlessly tweaking, never shipping.

So I'm trying something that sounds reckless: building five MVPs in parallel.

<!--more-->

Two things make it less crazy than it sounds. I standardized the tech so I'm not paying the setup tax five times. And I built a structured AI workflow that acts more like a disciplined junior dev than a magic autocomplete.

Here's what each product actually is:

- [TrueComps](/articles/2026-02/truecomps-turbotax-for-property-taxes) -- TurboTax for property tax appeals. Pull comps, generate evidence packets, file the appeal.
- [Stream Conductor HS](/articles/2026-02/stream-conductor-student-run-broadcasting) -- Lets high school students run their own sports broadcasts with compliance guardrails baked in.
- [ClassCheck](/articles/2026-02/classcheck-attendance-and-bus-tracking) -- Attendance and bus tracking for schools that are still doing it on clipboards.
- [PlayPath](/articles/2026-02/playpath-learning-inside-roblox) -- Educational content that lives inside Roblox, where the kids already are.
- [GachaHabit](/articles/2026-02/gachahabit-gacha-rpg-for-habits) -- A gacha RPG where completing real habits powers your team in battle.

## One stack, five products

Every product starts from the same modified create-t3-turbo monorepo. Turborepo, Next.js, Expo when I need mobile, tRPC, Postgres, consistent auth. The point isn't that it's the best stack -- it's that I make the boring decisions once.

The parts that matter most are the ones nobody talks about. Docker + Kubernetes deployment with a repeatable layout so every repo doesn't invent its own deploy script. Our own Postgres in the cluster instead of a managed service -- more ops work, but zero early-stage friction. Sentry, PostHog, Resend wired in by default so each product doesn't become a new vendor maze.

And a control panel that ties it together. One screen showing me what's actually happening across Gitea repos, the K8s cluster, Harbor registry, and Argo CD deployments. The value isn't dashboards -- it's knowing whether I'm shipping or just pushing code around.

## What an AI work session actually looks like

Here's the thing about LLMs: they're incredible at creating momentum and terrible at guaranteeing correctness. They make you feel fast while you generate plausible nonsense. I've done it. You've done it.

So I stopped using AI like a slot machine and started using it like a system.

A typical session: I open Claude Code and describe what I want to build. But instead of just prompting and hoping, there's a workflow. First, an explore agent greps through the codebase and maps out where the relevant patterns live. Then I brainstorm the approach -- what am I actually building, what are the constraints, what could go wrong. Then a plan gets written as an artifact, not a thought. Then implementation happens in small steps with real verification after each one.

The rule that saves me the most: no completion claims without running the command that proves it. No "should work." No "seems fine." If the test didn't pass, it's not done.

I also have agents that can claim tasks from a shared board, post progress, and hand off to each other. It sounds over-engineered until you're juggling five repos and realize you can't remember what state anything is in. The board is the forcing function -- if I can't describe the work as a task, it's not a real task yet.

## Why five at once

I'm not hedging. I'm searching.

Early-stage products are mostly about finding signal. Some ideas are wrong. Some are right but poorly timed. Some have a customer but no distribution. I don't want to bet the next year on whichever idea felt most exciting on a Tuesday afternoon.

Five MVPs with a shared stack means context carries over between them. Something I learn deploying TrueComps makes ClassCheck's deploy faster. A pattern I nail in GachaHabit's mobile app applies directly to PlayPath. The portfolio isn't five separate bets -- it's one system that explores five directions.

The goal is brutally simple: build five things that touch reality, fast enough to learn which ones deserve the next twelve months.

## What I'm still figuring out

How much of the template should be opinionated versus flexible. How to keep five products from stealing focus from each other. What "done" means for each MVP so I stop polishing. How to keep the AI workflow from becoming its own form of procrastination.

I don't have clean answers to any of those. But I have five repos, a shared stack, a workflow that forces verification, and a board that tracks what's actually happening.

That's further than the notebook ever got.
