---
layout: post
title: "Van Build v0.5: Current Setup and the IIoT Future"
date: 2026-02-07
excerpt: "A tour of my current van build -- livable but rough -- plus the ESP32-based control system I'm planning to bring industrial IoT thinking to a 70-square-foot home."
categories: [projects]
tags: [vanlife, van-build, iiot, home-automation, esp32, embedded]
comments: true
status: draft
---

My van is a livable apartment, a mobile office, and an unfinished construction site, all in about 70 square feet. The bed is comfortable. The kitchen works. The electrical system keeps my laptop and Starlink running. And the storage situation is a disaster, the cable management would make an electrician cry, and I still don't have hot water.

This is what "v0.5" means. Everything works well enough to live in full-time, and almost nothing works as well as I want it to.

<!--more-->

## The current state: a tour

Let me walk through what's actually in the van right now, system by system. No glamour shots. Just what's built, what works, and what's held together with zip ties and optimism.

**Bed and living space.** Fixed platform bed across the back, sized for a full mattress. Under the bed is the main storage area, which is technically a lot of cubic feet and practically a black hole where things disappear. There's no organization system -- it's bins and bags piled in there. Finding my climbing shoes requires pulling out half the contents. The bed itself is great. The storage beneath it is a problem I keep not solving.

**Kitchen.** Two-burner propane stove, a small sink with a hand pump, and a slide-out cutting board. It works for cooking real meals -- I eat well out of this van -- but the layout is clunky. Counter space is almost nonexistent. The stove, sink, and prep area are all competing for the same two square feet. Cooking anything more complex than a one-pot meal turns into a choreographed dance of moving things on and off surfaces. I've thought about rebuilding the kitchen module at least a dozen times and keep deciding it's not bad enough to justify tearing it apart while I'm living in it.

**Water system.** 20-gallon fresh water tank, a small grey water tank underneath, and a 12V pump. No hot water -- I heat water on the stove when I need it, which is a minor annoyance in summer and genuinely miserable in winter. The tanks have no level sensors, so I estimate how much water I have left based on vibes and how many days it's been since I filled up. This is exactly the kind of problem that makes me want a control system, but I'm getting ahead of myself.

**Diesel heater.** A Chinese diesel heater (the kind you find on Amazon for $150-200) plumbed into the van's fuel tank. It's the single best purchase I've made for the build. This thing runs on a trickle of diesel and keeps the van at 65-70F when it's below freezing outside. It draws about 10-30W depending on the heat setting, and the fuel consumption is negligible. I've camped comfortably at 15F. Without it, vanlife would be a three-season activity at best.

**Insulation.** Thinsulate throughout the walls and ceiling, XPS foam on the floor. Good enough that the heater keeps up in cold weather, but I still get condensation on the windows and some of the less-insulated metal panels. Condensation management is an ongoing battle in any van. I deal with it by cracking a vent fan and accepting that I'll wipe down windows in the morning.

**Electrical system.** This is the one I care about most because it's the one that constrains everything else.

400W of roof-mounted solar panels feeding an MPPT charge controller, charging a bank of LiFePO4 batteries (280Ah at 12V, so roughly 3.4kWh of usable capacity). A 2000W pure sine inverter for AC loads. The system is sized for my actual daily consumption, which is dominated by two things: my [Starlink + LTE internet setup](/articles/2026-02/starlink-lte-van-internet) and my laptop. On a sunny day, the solar keeps up and I end the day at the same state of charge I started. On cloudy days, I'm drawing down the battery bank, and after two consecutive overcast days, I start making tradeoffs about what to run.

The monitoring situation is primitive. I have a battery monitor (Victron SmartShunt) that tells me voltage, current, and state of charge via Bluetooth. Everything else -- solar production, load distribution, individual circuit status -- I'm either checking manually at the components or not checking at all. I know roughly how the system is performing, but I don't have data. No trends, no history, no alerts. If something is slowly going wrong, I won't notice until it's actually wrong.

## What "v0.5" really means

The version number isn't cute branding. It's honest. Here's what's rough:

**Storage is disorganized.** I have enough space but no system. Things migrate. I spend time looking for stuff that a better layout would just solve.

**The kitchen is functional but annoying.** Every meal involves a setup and teardown process that takes longer than it should. I've adapted to it, which is its own kind of problem -- adapting to friction instead of fixing it.

**No hot water.** Heating water on the stove works, but it turns a five-minute task into a fifteen-minute task and makes me skip things I shouldn't skip (like properly cleaning dishes in winter).

**Cable management is a mess.** The electrical system was built incrementally, and it shows. Wires are routed based on whatever was convenient at the time, not based on a plan. It all works, but tracing a circuit or adding a new one is harder than it should be.

**No instrumentation.** I don't know my water level without guessing. I don't know my solar production without opening an app and squinting at a graph. I don't know the temperature distribution in the van. I don't get alerts when something needs attention. I'm flying mostly blind, and for a system that runs my home, that's not great.

Building while living in the van is possible but slow. Every improvement competes with daily life for the same space. I can't tear out the kitchen for a weekend rebuild because the kitchen is where I make dinner tonight. Upgrades happen in small windows -- a few hours here, a day there -- which is why v0.5 has stayed v0.5 for longer than I'd like.

## The future: an IIoT control system

Here's where it gets interesting. I'm not thinking about this like a home automation project. I'm thinking about it like an industrial controls problem.

The difference matters. Home automation is about convenience -- "hey Alexa, turn off the lights." Industrial IoT is about visibility, reliability, and automated decision-making for critical systems. My electrical system, water system, and climate system aren't smart home toys. They're infrastructure that keeps my home running. When the battery gets low, the response shouldn't be a notification I might ignore. It should be automated load shedding that protects the battery bank.

The architecture I'm designing centers on ESP32 microcontrollers as the sensor and control layer. ESP32s are cheap ($5-10 each), run on 3.3V, have built-in WiFi, and there's a massive ecosystem of libraries for sensors and actuators. Each subsystem gets its own ESP32 node:

- **Power node:** monitors battery voltage, current, state of charge, solar production, and individual circuit loads. Controls load shedding relays.
- **Water node:** ultrasonic sensors in the fresh and grey tanks for actual level readings. Monitors pump status and flow rate.
- **Climate node:** temperature sensors throughout the van (interior, exterior, under-bed storage, near the heater). Controls the diesel heater and vent fans.

All the nodes communicate over MQTT -- a lightweight publish-subscribe messaging protocol that's the standard for IoT. An MQTT broker runs on a Raspberry Pi that also handles data logging, a local web dashboard, and alert logic. Everything stays on the local network. No cloud dependency. If my internet goes down, the control system keeps running.

The part I'm most excited about is automated load shedding. Right now, when the battery drops below a certain level, I manually decide what to turn off. That's fine when I'm paying attention, but I've woken up to a nearly dead battery bank more than once because I forgot to turn off Starlink before bed. With the control system, the power node can shed non-critical loads automatically based on battery state of charge -- Starlink first, then the inverter, then the water pump -- and restore them in reverse order when solar production catches up.

The data logging piece is almost as valuable. Right now I have no idea what my actual daily power consumption looks like broken down by load, or how my water usage patterns change between seasons, or how the insulation performs in different climates. With sensor data flowing into a time-series database, I can make informed decisions about upgrades instead of guessing. Should I add more solar? The data will tell me. Is the diesel heater cycling too often? The data will tell me that too.

## Why bother

I get asked this whenever I describe the control system idea. "It's a van. Why are you treating it like a factory?"

Because power management is the central constraint of vanlife, and right now I'm managing it by feel. Every decision about where to camp, how long to stay, what to run, and when to drive is influenced by how much energy I have. Making those decisions with real data and automated guardrails instead of gut feeling isn't over-engineering. It's taking the most important system in my home seriously.

The real answer is also that this is a genuinely interesting project. It sits at the intersection of embedded systems, networking, control theory, and practical problem-solving. Building it teaches me things I want to learn, and the result is something I'll actually use every day.

The control system is still in the planning and prototyping phase. I've got ESP32 dev boards on my desk, sensors in a box, and a growing collection of notes about the architecture. The first node I'm building is the power monitor, because that's where the most value is and where the data gap hurts the most.

v1.0 is the van where the systems talk to each other, where I know what's happening without checking, and where the infrastructure manages itself. v0.5 is where I'm living today. The distance between them is a lot of soldering, a lot of code, and a lot of testing in a space where failures mean my lights go out or my water pump dies.

I'm looking forward to it.
