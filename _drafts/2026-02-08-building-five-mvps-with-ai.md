---
layout: post
title: "Building Five MVPs with AI (Without Lying to Myself)"
date: 2026-02-08
site: gmacko
excerpt: "Five MVPs at once only works if the stack is standardized, the workflow is explicit, and each project is treated as a search for signal instead of a promise to finish."
categories: [startups, ai]
tags: [startups, venture-studio, ai, llm, opencode, create-t3-turbo, turborepo, mcp, kubernetes, gitea, harbor, argocd, postgres, sentry, posthog, resend, prompting, workflow]
comments: true
status: draft
source_notes:
  - /Users/mackieg/obsidian/Projects/AIWorkflow.md
  - /Users/mackieg/obsidian/Captures/2026-02-27 - Context Management as the Real AI Bottleneck.md
  - /Users/mackieg/obsidian/Captures/2026-02-27 - Bandwidth Asymmetry in Human-AI Communication.md
---

For years I kept repeating the same stupid loop.

New idea. New repo. New auth decision. New deploy script. New notes file. A week later: one more half-built product, one more burst of excitement spent on setup instead of learning anything real.

The problem was never ideas. It was the cost of getting an idea far enough into reality that it could prove me wrong.

So now I'm doing something that would have sounded irresponsible to me a year ago: building five MVPs in parallel.

<!--more-->

It only works because I standardized the stack and stopped treating AI like autocomplete. The model is useful when it behaves more like a junior engineer inside a workflow with real constraints.

The current portfolio looks like this:

- [TrueComps](/articles/2026-02/truecomps-turbotax-for-property-taxes): property-tax appeals with evidence packets and filing help
- [Stream Conductor HS](/articles/2026-02/stream-conductor-student-run-broadcasting): school sports broadcasting software
- [ClassCheck](/articles/2026-02/classcheck-attendance-and-bus-tracking): attendance, bus tracking, and school integrations
- [PlayPath](/articles/2026-02/playpath-learning-inside-roblox): learning systems inside Roblox-style game loops
- [GachaHabit](/articles/2026-02/gachahabit-gacha-rpg-for-habits): habit tracking through a gacha RPG loop

I am not pretending all five become companies. The point is to get each one far enough to produce signal.

## One stack, reused on purpose

Every product starts from the same modified `create-t3-turbo` monorepo. `Turborepo`, `Next.js`, `Expo` when I need mobile, `tRPC`, Postgres, the same auth assumptions, the same layout, the same deployment shape.

That is not because I think there is one blessed founder stack. It is because I am done paying the setup tax over and over.

The real leverage is in the unglamorous stuff:

- Docker and Kubernetes deploys that look the same from repo to repo
- our own Postgres in-cluster instead of making every experiment start with vendor decisions
- `Sentry`, `PostHog`, and `Resend` wired in early instead of bolted on later
- one control surface that lets me see what is happening across `Gitea`, the cluster, `Harbor`, and `Argo CD`

That last part matters more than it sounds. When I can see which repo changed, which image got built, and which deployment is live, I stop guessing whether I am shipping or just rearranging code.

Standardization also makes lessons portable. If I learn something painful once in `TrueComps`, I do not want to relearn it in `ClassCheck` three days later. I want the next product to inherit the scar tissue.

## What the AI workflow actually does

The popular version of AI coding is still mostly vibes: prompt harder, hope the model stays coherent, then act surprised when it lies confidently.

That is useful for momentum. It is terrible for trust.

My workflow is narrower and more boring. I start with an explore pass to find the real patterns in the repo. Then I write a plan. Then implementation happens in smaller chunks. Then I run the command that proves the thing works. No completion claims without evidence. No "should be fine." No "looks right to me."

That rule does most of the work. The other thing that matters is task shape. Once I started using skills, repo memory, and a board that agents could claim work from, the sessions got better fast. If the task is vague, the output is vague. If the context is polluted, the output gets weird. If the plan is real and the scope is small, the model becomes much more useful.

This is why I care so much about workflow design. A better model helps. A better context discipline helps more.

## The real bottleneck is context

I used to think the main limiter was model intelligence. It is, a little. But that is not the thing that burns most of my time anymore.

The real bottleneck is context management.

Give a model the wrong conversation history, stale decisions, abandoned approaches, and three unrelated logs, and it gets dumb in a hurry. Give it the right file, the relevant constraint, and a task small enough to reason about, and suddenly it looks much more capable.

That is why I keep building around the model instead of just swapping models:

- reusable skills for recurring workflows
- repo memory for build, deploy, and architecture rules
- fresh sessions when a thread starts to rot
- screenshots, voice notes, and plans when plain text is losing information

The trick is not "more context." It is cleaner context.

## Why five at once

People hear "five MVPs" and picture multitasking. That is not what I mean.

I mean portfolio search.

At the earliest stage, the job is not to defend one precious idea. The job is to get to reality faster than your own optimism. Some ideas are wrong. Some are early. Some have demand but no distribution. Some sound good until they touch an actual user.

A shared stack changes the economics of that search. The deployment work in one repo speeds up the next one. The analytics defaults carry over. The mobile patterns carry over. The verification habits carry over. I am not restarting from zero five times.

That also keeps me more honest. If I only chased one idea at a time, it would be too easy to protect it from evidence because I would already have months sunk into it. Five in flight makes it easier to kill weak ideas and feed the stronger ones.

The goal is simple: build enough reality, fast enough, to know what deserves the next year.

## What I am still figuring out

I still do not know how opinionated the shared template should become. I still do not know the right definition of "done" for each MVP. I still catch myself turning workflow design into a form of procrastination sometimes.

But I know this much: the old version of me would have spent the same amount of time setting up one repo and calling it progress. This version has five products touching reality, one stack that keeps getting better, and a workflow that makes it harder to lie to myself.

That is a much better place to start.
