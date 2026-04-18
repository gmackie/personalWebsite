---
layout: post
title: "PlayPath: The Edtech Idea I Actually Wanted to Build"
date: 2026-02-08
site: gmacko
excerpt: "ClassCheck got me into edtech. PlayPath is closer to the thing I had been orbiting for years: game-native learning, adaptive systems, and finally having the tooling to build it."
categories: [startups, gaming, ai]
tags: [startups, playpath, edtech, roblox, learning, gamedev, ai, lti, coppa]
comments: true
status: draft
source_notes:
  - /Users/mackieg/obsidian/Projects/PlayPath.md
  - /Users/mackieg/obsidian/Projects/PlayPath/ideas/game-engine-for-k-8-learning.md
---

One of the first real tech projects I ever shipped was `tf2heatmaps.net`.

I built it as a senior in high school for indie `Team Fortress 2` map developers. The site took kill-location data, dropped it onto top-down map images, and turned it into heat maps so people could see where fights were clustering and where a level might be breaking down.

It was not a startup. It was not polished. It was just one of the first times I felt the specific satisfaction of taking a weird niche problem, wiring a few tools together, and making something people in that world actually wanted.

That itch never really left.

<!--more-->

Game development kept sitting in the background for me after that, but mostly as an interest instead of a sustained practice. I would tinker, poke at engines, sketch ideas, then bounce off the same reality every time: traditional game development is slow, asset-heavy, and full of tedious work before anything starts to feel alive.

For a long time, that made it hard to keep choosing.

Then two things changed.

First, I got deeper into edtech through [ClassCheck](/articles/2026-02/classcheck-attendance-and-bus-tracking). Second, AI tooling started to reduce some of the startup cost of experimenting with systems, content variation, and game logic. Not all of it. But enough that the space felt newly buildable.

That is where PlayPath comes from.

## ClassCheck got me into edtech. PlayPath gave me a reason to stay.

ClassCheck was a useful wedge because it forced me to learn the real mechanics of school software: `LTI 1.3`, SIS integrations, district procurement, compliance, parent visibility, all the stuff that sounds boring until you realize it decides whether a product can exist.

But the more I learned, the clearer it became that attendance was not the part of edtech I was actually pulled toward. The more interesting question was always somewhere else:

What would it look like to build learning software that kids would choose even if nobody made them?

That is a much harder standard than "make school software nicer." It is also the standard I care about.

## The thesis is simple

Most "gamified learning" products still feel like worksheets wearing a costume.

You get points. Maybe a badge. Maybe a cheerful mascot. But the core loop is still obvious: stop having fun, answer the educational prompt, resume having fun. Kids notice that immediately.

PlayPath starts from a stricter rule: the learning mechanic has to be the game mechanic.

If the child is working on fractions, the fraction reasoning should be what makes the rocket launch, the puzzle unlock, or the system progress. If they are working on reading, the comprehension should be inside the play loop, not bolted on as a quiz between levels.

That difference is the whole product.

## Why Roblox matters

I am not interested in building educational software inside some imaginary perfect environment where kids patiently log in because adults told them to.

Roblox matters because attention already lives there. It is where kids already spend time, where game-native expectations already exist, and where "this is fun" is a real bar instead of a marketing line.

If you want to take play-based learning seriously, you have to respect where play already happens.

That does not mean "just build a Roblox game and call it edtech." It means using the habits, expectations, and social texture of that environment as the starting point instead of trying to smuggle another worksheet through the front door.

## Why AI changes the feasibility

The part that got more interesting with AI was not the fantasy version where a model simply teaches the child.

The useful version is more practical:

- adapting content difficulty
- generating more variation around the same skill
- changing themes and surface details without rebuilding the whole engine
- personalizing examples without losing standards alignment

That is what makes the idea feel more buildable now than it did a few years ago.

If the learning engine underneath is solid, AI can help the surface stay fresh instead of turning into the same question bank with different fonts. It can also help content scale across more themes, mechanics, and student profiles than a tiny team could manually author from scratch.

I still do not want the model driving the educational core blindly. The mastery model, standards alignment, progression, and guardrails need to be explicit. But AI makes the content system around that core much more flexible.

## What PlayPath actually is

Right now I think about PlayPath less as one game and more as a learning engine that can live inside multiple game loops.

The current shape includes:

- standards-aligned skills and mastery tracking
- spaced repetition and progression systems
- AI-assisted personalization
- an SDK layer for game integrations
- parent and teacher visibility where it matters
- school-facing plumbing like `LTI 1.3` so it can live inside real education workflows

That is why this project feels bigger than "build a Roblox mini-game." The long-term opportunity is to build the underlying system that different educational play experiences can sit on top of.

## Why this one feels different

Attendance software solves a real problem. I still believe that.

But PlayPath hits the overlap I have been circling for years: games, learning, adaptive systems, and tools that make creation faster instead of slower. It also feels like the kind of category where getting early matters. The research around play-based learning is there. The tooling is getting better. AI is expanding what a small team can realistically prototype.

So this is the honest framing:

ClassCheck got me into edtech.

PlayPath is the project that made me want to stay there.
