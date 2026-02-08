---
layout: post
title: "Building Five MVPs with AI (Without Lying to Myself)"
date: 2026-02-08
excerpt: "I'm trying to start five products at once by standardizing the stack and using a structured agent workflow. The trick is turning AI from a slot machine into a system."
categories: [ai, startups]
tags: [ai, llm, opencode, create-t3-turbo, turborepo, prompting, workflow]
comments: true
status: draft
---

The most dangerous thing about working on startups is not the lack of ideas.

It's the gap between "this could be huge" and "I can actually ship something that touches reality." The older I get, the more I think this is the real dividing line between "I have a lot of ideas" and "I build things." The gap isn't intelligence. It's throughput.

I have a list of products I want to build. Historically, that list has been a museum: nice concepts, rarely finished. Lots of "I should." Lots of "someday." Lots of notebooks and half-built repos.

So I'm trying a different approach.

I'm trying to build five MVPs in parallel.

<!--more-->

That sounds like a recipe for thrash. It probably is. But I'm trying to do it with two constraints that make it at least plausible.

First: I standardize the technical starting point so each product is mostly product work, not setup work.

Second: I use AI in a structured way so it behaves more like a team and less like a hype generator.

This post is a snapshot of the methodology as it exists right now. Not a manifesto. More like a field note.

## Constraint 1: a standard starter template (so I stop reinventing scaffolding)

I started from a create-t3-turbo-style baseline.

When I say "modified create-t3-turbo," I mean: a monorepo that makes it cheap to stand up a web app and (when needed) a mobile app using consistent primitives. The point isn't that the template is perfect. It's that I don't want to pay the "set up auth/db/deploy" tax five times.

At a high level, the template aims to make these decisions once:

Monorepo layout (Turborepo/pnpm). Web UI (Next.js + React). Mobile app (Expo / React Native, optional per product). API layer (tRPC for the JavaScript-heavy apps). Database (Postgres + a type-safe ORM). Auth (a consistent default, with exceptions when a product needs something else).

But the modifications that matter most (for me) are the boring operational ones. The stuff that doesn't feel like "building a product" but absolutely determines whether you ship.

I standardized infrastructure and deployment around Docker + Kubernetes, with a repeatable layout so every repo doesn't invent its own deployment dialect.

I standardized on running our own Postgres instance in the Kubernetes cluster. That's a trade-off (ops responsibility, backups, migrations), but it removes a lot of early-stage friction and makes environments behave consistently.

I standardized integrations: Sentry for errors, PostHog for product analytics, Resend for transactional email. Not because those are the only good tools, but because every MVP doesn't need to become a new vendor maze.

I standardized tooling: consistent lint/test defaults and lightweight generators so I can spin up new routes and features without hand-wiring the same plumbing.

And then I added something I didn't expect to be as important as it is: a control-panel app.

When you're operating across multiple repos and deploying to your own infrastructure, you need a single place that shows you what's actually happening. We built a control panel that monitors our self-hosted Gitea repos, the Kubernetes cluster, the Harbor registry, and Argo CD deployments.

The benefit isn't "pretty dashboards." The benefit is that I can look at one screen and see whether I'm shipping or just pushing code around.

## Constraint 2: a skills-based AI workflow (so I stop confusing text with progress)

The second constraint is more important.

LLMs are incredible at creating momentum and terrible at guaranteeing correctness. They can make you feel like you're moving fast while you're actually just generating plausible text.

So my rule is: AI only helps if it's forced into a workflow that produces evidence.

This is the difference between AI as a slot machine and AI as a system.

Slot machine: prompt, hope, paste.

System: clarify the goal, explore the codebase, write a plan, implement in small steps, and verify with real commands.

It is slower per individual iteration, but it is massively faster than shipping delusion.

## How I use agents (concretely)

The trick, for me, is to stop thinking of AI as "one model" and start thinking of it as a set of roles.

I use an explore-style agent for contextual grep and codebase mapping. That's the agent that finds where patterns live, where the real code is, and what conventions exist.

I use a librarian-style agent when I need external references and examples. That's the agent that looks up real-world usage patterns, official docs, and edge-case behavior.

I use a brainstorming step when I'm doing creative work and I need to pin down what I'm actually building before touching code.

I use a planning step when something is bigger than a couple minutes. Plans are artifacts. They create accountability. They make it harder to drift.

And I have a verification rule that is borderline obnoxious but saves me constantly: no completion claims without running the command that proves the claim.

No "should work." No "seems fine." If I didn't run the test/build/typecheck, it's not done.

## Coordination: the other half of making this feel like a team

If you want multiple agents working across multiple repos without duplicating effort, you need a shared place to put state.

We built a kanban-style board app for managing tasks across projects, and exposed it via an MCP server so agents can claim tasks, post progress updates, and attach artifacts (links, PRs, notes).

This is the part that makes the workflow feel less like "me prompting a model" and more like "a team updating a shared board." It also creates a useful forcing function: if I can't describe the work as a task on a board, it's probably not a real task yet.

## Why do this as a portfolio?

The reason I'm doing this across five products is that the early stage is mostly about finding signal.

Some ideas will be wrong. Some will be right but poorly timed. Some will have a customer but no distribution. I don't want to bet the next year on an idea that only feels good in my head.

So I want a portfolio approach where each idea has a crisp MVP and a launch plan, the stack is consistent enough that context carries over, and the AI workflow reduces the cost of iteration.

I don't think this is the only way to build. It's my attempt to stop being stuck in the idea phase.

## What I'm still figuring out

There are open questions I'm actively working through.

How much of the template should be opinionated vs optional? How do I keep the five ideas from stealing focus from each other? What does "done" mean for each MVP so I don't keep polishing? How do I keep the AI workflow from becoming bureaucracy?

The goal isn't to build five perfect products.

The goal is to build five real products that touch reality, quickly enough to learn which ones deserve the next 12 months.
