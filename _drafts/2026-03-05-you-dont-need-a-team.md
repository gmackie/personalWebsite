---
layout: post
title: "You Don't Need a Team"
date: 2026-03-05
site: gmacko
excerpt: "The old model treated engineers like capacity units. Agents break that translation layer. A few sharp people with judgment and verification discipline can now outrun the team that used to be mandatory."
categories: [engineering, ai]
tags: [ai, agents, engineering-culture, startups, teams, llm, management]
comments: true
status: draft
source_notes:
  - /Users/mackieg/obsidian/Captures/2026-02-27 - The Collapsing Translation Layer.md
  - /Users/mackieg/obsidian/Captures/2026-02-27 - Mythical Man-Month vs Vibe-Driven Development.md
---

There is a ritual every big tech company knows by heart.

Senior engineers and managers disappear into planning rooms. They come back with documents, estimates, dependency charts, and one core claim hiding underneath all the professionalism: "This work requires more people."

"We need 47 SDE-weeks."

"We need eight engineers by Q2."

"We can commit if recruiting lands."

<!--more-->

Then the machine starts. Recruiters source. Hiring loops spin up. People onboard. Whole quarters get consumed by assembling the capacity that was supposedly needed before the real work could even begin.

For a long time, that model made sense. Software had to be built by humans. Humans have finite throughput. More output meant more humans.

That is the part that changed.

## The hidden job inside most engineering orgs

On a ten-person team, only a few people are usually making the hardest decisions.

They are doing system design, debugging the ugly failures, deciding tradeoffs, and protecting conceptual integrity. The rest of the team is doing something valuable but narrower: translating those decisions into implementation. Tickets become code. Specs become tests. Architecture becomes PRs.

That translation layer used to require a lot of people.

Now it does not.

## What agents actually collapsed

Agents did not remove the need for engineering judgment. They removed a huge amount of the implementation bandwidth that used to justify the org chart.

Turning a clear task into working code is exactly the kind of work language models are surprisingly good at: boilerplate, pattern reuse, known framework moves, and filling in the obvious middle. That used to be where you needed a pile of competent engineers.

Now one strong engineer with a disciplined workflow can cover far more of that surface area directly.

I am living that right now. I am building multiple products in parallel without a traditional team behind them. The only reason that is even plausible is because the work that used to require a staff of translators can now be pushed through a structured agent loop instead.

The stack matters. The workflow matters. Verification matters. But the throughput shift is real.

## The org chart was a communication system

This is the part I think people miss.

Most engineering organizations were not just production engines. They were translation systems.

Strategy became plans. Plans became tickets. Tickets became code. Code became behavior. Every extra layer existed because the layer above could not directly produce what it needed.

Once a technically sharp person can move from idea to implementation much more directly, a lot of those hops stop looking essential. They start looking historical.

That is why yearly planning cycles feel increasingly off to me. They were built for a world where execution was scarce and coordination was the price of getting anything built. When execution gets cheaper, the overhead becomes harder to justify.

## What replaces headcount as the bottleneck

The bottleneck moves up a layer.

It is less about "do we have enough hands?" and more about:

- do we know what to build?
- can we hold the architecture in our heads?
- can we tell when the model is confidently wrong?
- do we have the discipline to verify instead of vibe our way into a mess?

That is why I think the valuable engineers from here are the ones with judgment, not just implementation stamina. If your main skill is taking a ticket and turning it into a competent PR, the market for that work gets uglier every year. If your skill is deciding the right shape of the system, seeing where the spec is wrong, and supervising output with real taste, that gets more valuable.

## This does not mean process disappears

A lot of people hear this argument and imagine "one cracked founder and some agents shipping directly to prod."

That is not what I am arguing for.

Big teams accidentally created some safety rails through review layers and handoffs. If you shrink the human team, you have to replace that with tighter explicit discipline. Smaller tasks. Real tests. Real build checks. No completion claims without evidence. Stronger review culture, not weaker.

The win is not "remove standards." The win is "remove translation work."

If you keep the chaos and add AI, you just get faster chaos.

## Where the argument does and does not hold

There are obvious exceptions. Huge production systems still need people. On-call still needs people. Compliance-heavy environments still need human review. Some domains really do require many minds moving in parallel.

There is also a real apprenticeship problem here. You cannot delete every junior role and then act surprised when no senior engineers appear later. The ladder still has to exist. It just probably stops looking like years of ticket translation and starts looking more like judgment training.

But for building new products, especially early ones, I think the old assumption is already broken.

You do not need a team the way people used to mean it.

You need a small number of people with taste, context, and the ability to use agents without lying to themselves about what the agents actually did.
