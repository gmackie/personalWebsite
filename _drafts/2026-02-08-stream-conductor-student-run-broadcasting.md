---
layout: post
title: "Stream Conductor HS: Student-Run Sports Broadcasting, Powered by the Cloud"
date: 2026-02-08
excerpt: "High school sports streaming is either expensive or low-quality. Stream Conductor HS is my attempt to make multi-camera production accessible to students and schools."
categories: [startups]
tags: [streamconductor, streaming, k12, sports, obs, web, mobile]
comments: true
status: draft
---

I've watched enough high school sports streams to know the pattern.

The "stream" is a single fixed camera bolted somewhere high in a gym. The scoreboard is half cut off. The audio is mostly wind noise and sneakers. The moment the WiFi hiccups, the whole thing falls apart. And parents still pay for it because, even with all of those flaws, it's often the only way to see the game.

It's not that anyone is trying to make a bad product. It's that "good" production is expensive, and "cheap" production is fragile.

<!--more-->

Stream Conductor HS is my attempt to bridge that gap: a cloud broadcasting platform designed specifically for student-run high school sports production.

Not "teach kids OBS and hope for the best." Not "buy a broadcast truck." More like: give students a modern control room in a browser, wrap it in the constraints schools actually live with, and make the output good enough that parents will happily watch.

## The real problem isn't streaming. It's production.

If all you need is "video goes to YouTube," the world already has a hundred ways to do it. The reason high school streams are usually mediocre is that production is where quality comes from, and production is where tools get complex.

The current choices for a school are basically:

Either pay $500-$2,000 per event for professional production, which doesn't scale to JV games and non-revenue sports, or use a low-touch network that gives you a fixed camera and a subscription product for parents, or do the volunteer setup where someone tries to run things from a phone or a laptop and fights a new set of surprises every week.

All of those paths can "work." None of them feel like the obvious, modern default.

## The underappreciated angle: schools also want CTE outcomes

There's a parallel need here that makes the product more interesting than "better streaming": schools need career-connected learning and CTE programs that teach real skills.

Media production is a perfect fit because it's concrete. Students can see the outcome of their work immediately. A broadcast is a tangible artifact. It teaches collaboration, planning, attention to detail, and a pile of technical skills that map nicely to real jobs.

But most schools aren't going to adopt a program that requires a teacher to also be a full-time streaming engineer.

So the platform needs to make it easy to say yes. It has to support the learning loop and the output loop at the same time: students learn how to produce, and the school gets its games streamed.

## The product: a student-friendly broadcast control room

Stream Conductor HS is a web dashboard that lets a small student crew run a broadcast with a workflow that looks like a real production switcher. The idea is to keep the powerful parts (multi-camera, overlays, transitions, scene control) while keeping the cognitive load low enough that you can train a team in a club setting.

That means the product is intentionally opinionated. It's not a generic creator tool. It's designed around the predictable shape of school sports:

You tend to have the same camera placements (wide shot, under-basket, sideline). You tend to have the same overlays (scoreboard, sponsor, lineup). The crew is small. The environment is chaotic. When something breaks, you don't have time to debug.

So the interface has to be forgiving, the setup has to be repeatable, and the "good broadcast" path has to be the default path.

## Compliance isn't paperwork. It's a feature.

School sports come with rules: league requirements, association policies, district policies, and all the edge cases that show up when you stream minors.

I want compliance to be enforced by default, not stapled on later. That means having a place in the system where you can encode real constraints (recording rules, distribution rules, permissions) and let the product nudge operators toward the right thing.

This isn't the sexy part of the story, but it's the part that decides whether a district will say yes.

## What's built (and what I'm betting on)

The broader Stream Conductor stack is modern and pretty flexible: a Next.js dashboard, an Expo mobile app, a Go backend with real-time control paths (gRPC/WebSocket), and a media layer (MediaMTX) to handle ingest/output.

But the bet is not "we can stream video." Lots of companies can.

The bet is that a remote control room that is designed for schools (and specifically for students) is a wedge that can win. The product has to be reliable, repeatable, and simple enough that it becomes infrastructure, not a hobby project.

## What success looks like

My near-term definition of success is boring in the best way: onboard real teams, ship a compliance engine for a few key states, publish curriculum-aligned lesson plans, and convert the first paid schools by the fall season.

If this works, it won't be because the UI is pretty. It'll be because the product makes it easy for a school to say yes.

Easy for an athletic director to justify. Easy for a teacher to sponsor. Easy for students to run.
