---
layout: post
title: "Van Build v0.5: Current Setup and the IIoT Future"
date: 2026-04-02
site: personal
excerpt: "The van is real enough to live and work from, rough enough to annoy me every day, and exactly the kind of system that makes me want better data. This is the current setup and the direction I want to take it next."
categories: [travel, projects]
tags: [vanlife, van-build, iiot, home-automation, esp32, embedded]
comments: true
status: draft
source_notes:
  - /Users/mackieg/obsidian/Projects/VanBuild.md
  - /Users/mackieg/obsidian/Projects/VanControl.md
---

The van has crossed the line where it is obviously real.

I can sleep in it comfortably. I can cook in it. I can work a normal remote job from it. I can park somewhere cold, turn on the heater, make coffee, and go about my life without feeling like I am cosplaying hardship for the internet.

It is also still rough enough that I end up cursing at it almost every day.

That is what I mean by `v0.5`.

<!--more-->

The bed works. The kitchen works. The electrical system is solid enough to keep my laptop and internet alive. Solar plus batteries plus a sensible power budget are enough that the van feels like an actual mobile office instead of a novelty. The diesel heater was one of the best purchases in the whole build. Paired with the [Starlink + LTE setup](/articles/2026-04/van-internet-starlink-lte-failover), the van supports the two things I care about most: living decently and working reliably.

I did not build this thing to look like a tiny-house reveal on Instagram. I built it to be useful. In that sense, it absolutely works.

The current layout is straightforward:

- fixed bed in the rear
- storage underneath
- small kitchen with a two-burner propane stove, sink, and 12V fridge
- roof solar, batteries, inverter, charger, and shore power
- diesel heater for winter
- roof ventilation for everything else

None of it is exotic. It is just enough infrastructure to make daily life possible.

## The friction points are now obvious

The nice thing about living in a system full time is that it does not let you lie to yourself for very long.

Storage is the biggest daily annoyance. There is enough volume under the bed, but not enough actual organization, so too many tasks start with rummaging through bins, bags, and tools to find the thing I know is technically in there somewhere.

The kitchen is usable but cramped. I can cook real meals, which matters a lot to me, but once you try to do anything more than a basic one-pan dinner, the counter space problem becomes very real.

The water system works in the most primitive possible sense. I have fresh water, grey water, a pump, and a sink. I do not have hot water. I also do not have real instrumentation, which means part of my home still runs on estimation and memory.

Then there is the electrical side. This is the system I care about most, and it is still more opaque than I want. I know enough to operate it, but I do not have the kind of visibility I would want from infrastructure I depend on every day.

That is the overall pattern: the van is good enough to live in and rough enough that I can see exactly what version `1.0` needs to fix.

## Vanlife is mostly an energy problem

People talk about vanlife like it is mainly about travel or space. In practice, it is mostly about power.

Power determines how long I can stay parked, how hard I can lean on the internet, how comfortable bad weather feels, and whether the whole system feels stable or fragile. If the battery bank is healthy and charging well, life gets easy fast. If energy gets tight, every decision starts inheriting friction.

That is why I keep obsessing over the electrical system. Solar and batteries get me through normal use just fine, but the observability is still too shallow. I can see state of charge. I can infer the rest. I cannot see the whole system with the clarity I want.

That is what keeps pulling me toward a better control layer.

## Why I think about it like industrial controls

The version of this I care about is not really "smart van" in the consumer-gadget sense.

It is closer to a tiny industrial system.

I do not care that much about voice assistants and novelty automations. I care about visibility, logging, safeguards, and graceful failure. If the battery bank gets low, I do not want a cute notification I can ignore. I want the system to shed non-critical loads. If a water tank is close to empty, I want to know before I run the pump dry. If the heater is behaving strangely, I want data instead of hunches.

That is what keeps pushing me toward the `VanControl` direction: `ESP32` nodes, `MQTT`, local dashboards, subsystem monitoring, and automation that still works even if the internet is down.

That might sound overbuilt until you remember the thing being controlled is my house.

## What version 1.0 should look like

The next version is less about aesthetics than legibility.

I want better storage so daily life stops fighting me. I want a more usable kitchen. I want hot water because some frictions are not virtuous. And I want instrumentation across the systems that matter most: power, water, climate, and connectivity.

The control side is the piece I am most excited about because it changes the van from "a pile of subsystems I manually keep alive" into "a system that knows what state it is in."

`ESP32` hardware is a good fit. `MQTT` is a good fit. A local broker and dashboard are a good fit. Not because I need to impress anyone with architecture, but because I want the van to degrade gracefully instead of relying on me to remember everything at exactly the right moment.

## Building while already living in it

This is what makes the project slower.

If the van were just a workshop project, I could tear half of it apart for the weekend and rebuild aggressively. When it is also my house, every upgrade competes with ordinary life. Rebuilding the kitchen means not having a kitchen. Reworking storage means all my stuff has to exist somewhere else for a while. Touching electrical means touching the system currently powering my home and office.

That slows everything down, but it also keeps the feedback loop honest. Every upgrade has to earn the disruption it causes. Every idea gets tested against actual daily use instead of fantasy use.

That is why I still like this project so much. Better systems make daily life better, and the line between "good idea" and "annoying overbuild" becomes obvious very quickly.

`v0.5` is the rough but proven version.

`v1.0` is the version where the van becomes much easier to trust.
