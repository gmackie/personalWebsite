---
layout: post
title: "Stream Conductor HS: Student-Run Sports Broadcasting, Powered by the Cloud"
date: 2026-02-08
excerpt: "High school sports streams are almost always terrible. Stream Conductor HS gives students a real broadcast control room in a browser -- and gives schools the compliance guardrails they actually need."
categories: [startups]
tags: [startups, streamconductor, streaming, k12, sports, obs, web, mobile]
comments: true
status: draft
---

I've watched enough high school sports streams to know the pattern: a single fixed camera bolted somewhere high in a gym, the scoreboard half cut off, audio that's mostly sneakers and wind noise, and the whole thing dying the second WiFi hiccups. Parents still pay for it because it's the only option. That's the bar.

It's not that anyone is making a bad product on purpose. It's that "good" production is expensive and "cheap" production is fragile, and there's basically nothing in between.

<!--more-->

Stream Conductor HS is my attempt to build the in-between: a cloud broadcasting platform designed for student-run high school sports production.

Not "teach kids OBS and hope for the best." Not "buy a broadcast truck." More like: give students a real control room in a browser, wrap it in the constraints schools actually live with, and make the output good enough that parents happily watch.

## The problem isn't streaming. It's production.

If all you need is "video goes to YouTube," a hundred tools already exist. High school streams are mediocre because production is where quality lives, and production is where tools get complicated.

A school's options today: pay $500-$2,000 per event for professional production (doesn't scale to JV or non-revenue sports), use a low-touch network with a fixed camera and a subscription product, or do the volunteer thing where someone fights new surprises every week from a phone.

All of those can "work." None feel like the obvious default.

## The underrated angle: CTE

There's a parallel need that makes this way more interesting: schools want CTE programs that teach real skills. Media production is a perfect fit -- concrete, collaborative, and students see the outcome of their work immediately.

But most schools won't adopt a program that requires a teacher to also be a part-time streaming engineer. The platform has to support both loops simultaneously: students learn to produce, and the school gets its games streamed. One activity, two outcomes.

## The product: a student-friendly control room

Stream Conductor HS is a web dashboard that lets a small student crew run a broadcast modeled on a real production switcher. Multi-camera switching, overlays, transitions, scene control -- the powerful parts stay, but cognitive load drops low enough to train a team in a club setting.

The product is intentionally opinionated. Same camera placements every game (wide shot, under-basket, sideline), same overlays (scoreboard, sponsor, lineup), small crews, chaotic environments. The interface has to be forgiving, setup has to be repeatable, and the "good broadcast" path has to be the default path.

## Compliance isn't paperwork. It's the product.

This is the section nobody wants to write, and it might be the most important one.

Schools live and die by compliance. If you don't take it seriously, nothing else matters because a district will never say yes. I've been spending real time on the edge cases, and there are a lot of them.

Start with league and association broadcasting rules. State athletic associations have different policies about who can stream, what games, and under what terms. Some require specific distribution platforms. Some have exclusive media deals restricting streaming rights for playoff brackets or championships. The product has to enforce these -- not with a warning buried in settings, but as a hard constraint in the workflow. If a game can't legally be streamed to YouTube, the option shouldn't be there.

Then there's FERPA. When you're streaming minors, things get complicated fast. If a camera catches a student's IEP aide or a disciplinary incident on the sideline, that's a potential FERPA issue. The product needs sensible defaults: restricted camera zones configurable per venue, clear policies about who appears on screen, and controls that let a faculty advisor enforce boundaries without micromanaging every frame.

District acceptable use policies add another layer. Most districts have AUPs governing what technology students can use, what data gets stored, and where it goes. That means configurable data residency, clear audit logs, and integration with the district's identity provider so we're not creating yet another account.

And then there are recording and distribution rules. Some districts require footage retained for a certain period. Some require parental opt-out mechanisms. Some have specific rules about commercial use of student images.

None of this is glamorous. But compliance should be enforced by default, not stapled on after the fact. If the system knows the rules, it can nudge operators toward the right thing without anyone memorizing a policy manual. That's the feature -- compliance as infrastructure that lets everyone else focus on making a good broadcast.

## What success looks like

My near-term bar is deliberately boring: onboard real student teams, ship a compliance engine for a few key states, publish curriculum-aligned lesson plans, and convert the first paid schools by fall season.

If this works, it won't be because the UI is pretty. It'll be because the product makes it easy for a school to say yes. Easy for an athletic director to justify. Easy for a teacher to sponsor. Easy for students to run.

For the bigger picture on the "five MVPs at once" experiment, here's the hub post: [Building Five MVPs with AI](/articles/2026-02/building-five-mvps-with-ai).
