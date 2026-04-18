---
layout: post
title: "Stream Conductor: From Twitch Tools to High School Sports"
date: 2026-02-08
site: gmacko
excerpt: "Stream Conductor started with Twitch tooling, OBS workflows, and watching the streaming stack get better. The real opportunity showed up when I looked back at schools and realized they still did not have software built for broadcasting."
categories: [startups, media]
tags: [startups, streamconductor, streaming, k12, sports, obs, twitch, media]
comments: true
status: draft
source_notes:
  - /Users/mackieg/obsidian/Projects/StreamConductor.md
  - /Users/mackieg/obsidian/Projects/StreamConductor/ideas/ai-augmented-sports-production.md
  - /Users/mackieg/obsidian/Projects/StreamConductor/ideas/mhsaa-youtube-broadcasting-rules.md
---

Two or three years ago I started paying a lot more attention to the streaming stack itself, not just the people on screen.

It started with watching creators like Theo and The Primeagen, then sprawled into Twitch, overlays, OBS scene switching, contribution feeds, chat tools, and all the little pieces that make a stream feel produced instead of merely live. Once you notice that layer, it is hard to unsee it. A good stream is not just a person with a camera. It is a workflow.

The interesting part was what happened when I looked back at schools after getting deeper into that world.

Creator tooling was getting better quickly. Viewer expectations were rising. Meanwhile, most schools were still limping along with fixed cameras, volunteer heroics, and setups that only worked because one unusually technical adult kept everything alive.

That gap felt personal immediately.

<!--more-->

I did AV-related work in high school. I know the rhythm of school productions, football film, media rooms, and the way schools improvise with whatever gear and people they have. I also know the sports side of it, where film matters, where watching other schools matters, and where media becomes part of the culture around the team.

So when I looked at school streaming, I did not just see a weak product category. I saw a familiar environment that still did not have software shaped for how it actually operates.

## What schools have now

In a lot of places, the options are still basically:

- a fixed camera stream with almost no production value
- a fragile setup that depends on one teacher, one parent, or one booster who knows the whole stack
- or an expensive service that captures footage but does not really turn the school into the broadcaster

That is fine if all you want is proof that the game happened.

It is not fine if you want families to watch, students to learn production, or the school to build a real media presence around its athletics.

This is also where `Hudl` helped clarify the opportunity for me. Hudl absolutely matters. They own a huge part of film, coaching, analysis, and team workflow. But that is different from helping a school run a live broadcast that people actually want to watch.

Film for coaches is one category. Broadcasting for the community is another.

## The original product direction

Stream Conductor did not start as a school product. It started much closer to creator tooling.

The first version of the idea lived in the territory of remote `OBS` control, scene editing, multi-platform output, unified chat, cloud production helpers, collaboration, and failover. A lot of that DNA is still there:

- remote OBS control
- scene editing and overlays
- unified chat and moderation
- cloud OBS instances
- contribution feeds
- multi-platform output management

But the more I looked at the general creator market, the less interested I was in building just another tool for solo streamers and power users. The more I looked at schools, the more obvious it became that the stronger wedge was vertical, not horizontal.

Schools do not just need more features. They need a workflow that matches their environment.

## Why the school workflow is different

A school sports broadcast is not running out of one person's apartment on a perfect network with one operator who knows every hotkey.

It is running in gyms, stadiums, and fields with student crews, coaches, volunteers, inconsistent Wi-Fi, limited budgets, district rules, and varying levels of technical comfort. A tool built for a creator with full control over their setup does not automatically map to that world.

That is why so many school streams feel rough. Not because the people care less. Because the workflow is wrong for the job.

What I want here is something closer to a software-defined production truck for schools:

- simple enough that students can run it
- opinionated enough that a decent broadcast is the default
- collaborative enough that a team can split roles
- flexible enough for football, basketball, wrestling, soccer, hockey, baseball, and tournaments
- constrained enough that a school can actually say yes

That last requirement is what makes the product real. If the software assumes a crew, budget, and support model most schools do not have, then it is not a school product. It is just streaming software wearing a school costume.

## Why this matters more than creator tooling

The creator tooling market is crowded and fast. There are smart people building there already.

Schools are messier, but the problem is deeper and more meaningful to me.

A better school broadcast stack can do a few things at once:

- make it easier for families to watch their kids
- give students a path into broadcasting and production
- support media and CTE programs with something tangible
- help schools produce events that feel like events instead of obligations

That is a lot more interesting to me than helping another streamer clean up an alert box.

There is also a community effect here that most school software does not have. When a school broadcast is good, people notice immediately. Students can be proud of it. Parents use it. Friends share it. Sponsors can support it. The output is public and tied to a real local community.

## The boring constraints still shape the product

This is still K-12, so the boring parts are not optional.

Rights matter. State associations matter. District policies matter. Identity and access matter. Some regular-season games are flexible. Some postseason games are not. In some places schools can stream directly to YouTube without much drama. In others, approvals and rights are the whole ballgame.

That means Stream Conductor cannot just be "OBS, but nicer." It has to be school-aware and rights-aware from the beginning.

I actually like that constraint. It makes the product harder to fake.

## What I want this to become

The near-term version is simple: help schools produce better sports broadcasts with less chaos and smaller crews.

The longer-term version is more interesting:

- a real control room for school media teams
- a path for districts to coordinate multiple venues and crews
- something students can learn on and improve with over a season
- a better connection point between live broadcast, clips, film, and post-game media

The deeper bet is that high school sports media is still underbuilt as a category.

The audience is already there. The stories are already there. The student talent is already there. What is missing is software that treats schools like they can run something better than a tripod in the corner of the gym.

That is the version I want to build.
