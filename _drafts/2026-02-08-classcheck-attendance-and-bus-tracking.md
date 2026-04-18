---
layout: post
title: "ClassCheck: My First Real Vibe-Coded Edtech App"
date: 2026-02-08
site: gmacko
excerpt: "ClassCheck started at SXSW EDU 2025 as my first real AI-built edtech product. It taught me how K-12 software actually fits together and pointed me toward the part of edtech I cared about more."
categories: [startups, ai]
tags: [startups, classcheck, k12, edtech, attendance, mqtt, lti, sis, ai, vibe-coding]
comments: true
status: draft
source_notes:
  - /Users/mackieg/obsidian/Projects/ClassCheck.md
---

`SXSW EDU 2025` was the week this project snapped into focus for me.

I was down there thinking about education, software, and where AI coding tools might actually be useful. Claude Code was landing in the same window, and I wanted a project that was real enough to be honest but bounded enough that I would actually finish something.

Attendance sounded boring enough to work.

That lasted about five minutes.

<!--more-->

The second you move past "mark a student present or absent," school operations get messy fast. Attendance touches transportation. Transportation touches parent communication. Rosters live in the SIS. Assignments live in the LMS. Identity flows through `Clever`, `ClassLink`, district SSO, and whatever legacy rules the school already has. By the time you get to something as basic as "did this student get on the bus and make it to class," you are already knee-deep in real integration work.

That is why ClassCheck became my first real vibe-coded edtech app. It was not simple. It was just concrete.

## Why ClassCheck was the right first wedge

I did not start ClassCheck because attendance was my lifelong calling. I started it because it forced several useful questions into the same product:

- How far can AI-assisted building actually carry a real side project?
- What do `LTI 1.3`, `SIS` sync, `ClassLink`, `Clever`, and district procurement look like once you are the one wiring them up?
- Could a small team using AI responsibly build something credible in K-12?

The app grew into a pretty serious prototype: Go backend, React frontend, Expo mobile work, `OpenAPI`-generated clients, and bus tracking over `MQTT`. More important than the code, though, was what it forced me to learn. I stopped talking about edtech in the abstract and started learning how the stack actually fits together.

## The actual product shape

ClassCheck ended up sitting on three connected problems:

- attendance workflows that teachers will actually use quickly
- real-time bus visibility that parents actually care about
- school integrations that district IT can say yes to

That last one is the killer. A lot of founders see a school pain point and imagine they are selling a cleaner interface. In reality, they are selling a new piece of infrastructure into a system that already has `PowerSchool`, Canvas, SSO, procurement thresholds, privacy reviews, and a district calendar that does not care about your startup timeline.

So the real one-line pitch became: attendance, transportation visibility, and SIS/LMS integration in one product that feels modern and stays auditable.

That framing kept the project honest. If I could not make the integrations credible, then the product story was fake no matter how nice the UI looked.

## What it taught me about edtech

The biggest lesson was that K-12 software is mostly a coordination problem wearing a software costume.

Teachers pay for fragmentation with time. Parents pay for it with uncertainty. District IT pays for it with brittle integrations and procurement fatigue. Even pricing works differently than in most startups. If you cannot fit inside the kind of pilot motion a school can actually approve, you have a go-to-market problem before you have a feature problem.

It also made me respect the boring parts more. `FERPA`, `COPPA`, role-based access, audit trails, and legible system behavior are not side quests in this market. They are part of the product. So the architecture stayed intentionally boring in the good way: Go, `Echo`, clean API definitions, React, predictable data flow, and one unusual piece in the middle where `MQTT` made sense for live bus telemetry.

The bus side was the interesting technical wrinkle. GPS streams are easy enough. Tying them back into school operations in a way that turns "boarded the bus," "arrived at school," and "marked present" into one coherent system is where the product got real.

## What it taught me about AI coding

ClassCheck was also where AI coding stopped feeling like a toy.

Not because the model built the company for me. It did not. The useful pattern was much narrower than that. AI was good at pushing scaffolding forward, exploring known shapes, and helping me move a prototype faster after work than I would have on my own. It was bad at protecting me from domain ignorance.

That distinction matters.

If I did not understand what `LTI 1.3` really implied, the model could still generate something that looked reassuring. If I did not understand SIS sync, it could happily invent plausible nonsense. ClassCheck forced me to learn enough of the domain to tell the difference.

That was probably the most valuable part of the project. I got a product prototype, but I also got a real education in how edtech and AI-assisted development actually behave under pressure.

## Why it pointed me somewhere else

The deeper I got into ClassCheck, the clearer another truth became: attendance was not the part of edtech I cared about most.

I had already been carrying game-development ideas around in the background for years. I was interested in play-based learning. I kept noticing the research around intrinsic motivation and adaptive systems. As the AI tooling got better, I found myself getting more excited about that direction than about attendance workflows.

So ClassCheck became a bridge.

It gave me the wedge into edtech. It taught me the acronyms, the procurement reality, the integration surface, and the compliance posture. Then it pointed me toward the part of the market that felt more alive to me, which is what later became [PlayPath](/articles/2026-02/playpath-learning-inside-roblox).

That is still how I think about it now. ClassCheck is not dead. It is just not the thing I am most compelled to push today.

It did its job. It got me into the space for real, and it made the next idea smarter.
