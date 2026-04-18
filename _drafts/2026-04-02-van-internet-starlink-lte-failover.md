---
layout: post
title: "Van Internet: Starlink + LTE Failover for Life on the Road"
date: 2026-04-02
site: personal
excerpt: "I get better internet parked in the woods than most hotels deliver. Here's the hardware, architecture, power budget, and real-world tradeoffs behind a Starlink + LTE failover setup for full-time remote work from a van."
categories: [travel, technical]
tags: [vanlife, starlink, lte, networking, mobile-internet, remote-work]
comments: true
status: draft
source_notes:
  - /Users/mackieg/obsidian/Projects/StarlinkLTE.md
---

The Zoom call dropped. Again.

I was parked in a national forest, my phone showed four bars of LTE, and my coworker was mid-sentence when the connection just evaporated. I rejoined thirty seconds later, apologized, and spent the rest of the meeting wondering if this whole "work from a van" idea was actually sustainable.

That was the phone-hotspot era. It is over now. These days I routinely pull `50-200 Mbps` from a clearing in the mountains and hold calls without thinking about it. The setup is not cheap and it is not simple, but it works, and for full-time remote work from the road, "it works" is the only metric that matters.

<!--more-->

## The actual problem

When people hear "internet in a van," they picture streaming Netflix at camp. That's not the bar. I need to hold video calls for hours, push and pull code, SSH into servers, and survive the occasional big file transfer without the day turning into a connectivity debugging session.

Phone hotspots fail this test in predictable ways. Coverage is inconsistent in exactly the places I want to park. "Unlimited" plans get weird once you lean on them. Latency spikes at random. And even when the raw bandwidth is technically enough, the reliability isn't. The psychological cost is worse than the technical one. You start every morning asking "will I have internet today?" instead of "what am I building today?"

The fix was not finding one perfect connection. It was accepting that no single internet technology works everywhere from a van.

## The architecture

The system has two independent WANs: Starlink as primary, LTE as failover.

Starlink is incredible in open areas. If I have a clear view of the sky, it's usually fast enough that I stop thinking about the fact that I'm working from the side of a mountain. The downside is equally real: tree cover wrecks it, and the dish draws a meaningful amount of power all day.

LTE is the opposite. It works under trees. It uses very little power. But it's inconsistent and carrier-dependent, and the quality swings wildly based on where I am and which tower I'm talking to.

Put them together and coverage becomes greater than the sum of the parts. When Starlink has sky, I use Starlink. When it doesn't, LTE keeps the day alive.

Inside the van, everything connects to one local network. My laptop doesn't care which upstream path is active. That's the whole point.

## The hardware that mattered

Three pieces made the setup go from clever to reliable.

**1. A roof-mounted Starlink dish.**  
I use Starlink on the Roam plan, mounted so I can get it online quickly when parked. In open terrain, I typically see `50-200 Mbps` down and `10-25 Mbps` up with latency good enough for calls, SSH, and normal dev work. Trees are still the enemy, but open-sky performance is good enough that it changes where I feel comfortable working.

**2. A dedicated LTE router with external MIMO antennas.**  
This was the single biggest LTE upgrade. A van is basically a metal box, so internal antennas start compromised. Once I moved to proper external `MIMO` antennas, the LTE link got dramatically more usable. In decent coverage I regularly see `20-50 Mbps` and sometimes much better. More importantly, the connection stopped feeling fragile.

**3. A real router doing WAN failover.**  
The router owns the policy: prefer Starlink, fall back to LTE, keep the LAN stable. That is what turns two internet sources into one usable system instead of a bunch of manual toggling and frustration.

## Failover beats bonding

This is the part that sounds less impressive on paper and works better in reality.

When people start researching dual-WAN setups, they gravitate toward bonding. It sounds ideal: combine both links, get maximum speed, maybe even redundancy at the same time. In practice, bonding usually means a cloud relay, extra cost, extra latency, and another dependency you now have to trust.

Failover is boring, and boring is exactly what you want. Starlink is primary. If it goes unhealthy, traffic moves to LTE. When Starlink comes back, traffic moves back. I do not get combined bandwidth, but I almost never need combined bandwidth. What I need is for the internet to keep existing.

The extra trick that makes this feel seamless is a `WireGuard` tunnel out to a small VPS. That gives me a stable external IP even when the underlying WAN changes. Without it, failover can kill sessions because the public IP flips underneath you. With it, the tunnel re-establishes over the new path and the rest of the stack barely notices.

## Real-world numbers

Spec sheets are less useful than "what do you actually get while parked somewhere random?" For me, the rough range looks like this:

- Starlink: `50-200 Mbps` down, `10-25 Mbps` up, `25-60ms` latency in open areas
- LTE with external antennas: `5-100+ Mbps` depending on tower quality, congestion, and terrain
- Failover transition: usually a few seconds, fast enough that most things recover without drama

Those numbers sound wide because they are. Mobile internet is a game of environments, not absolutes. The important part is that the combined system gives me enough good days to work normally, and enough graceful degradation on bad days that I don't lose the entire day.

## Power is the hidden cost

Starlink is the elephant in the room.

The dish draws roughly `75-100W` continuously, which is a very real number when your office runs on batteries and solar. Over a workday, the internet stack can easily chew through close to a kilowatt-hour once you include the router, laptop, and everything else around it.

That changes how you think about connectivity. LTE stays on all the time because it's cheap from a power perspective. Starlink gets treated like a work tool, not background infrastructure. I turn it on when I'm actively working and off when I'm done. That one habit saves a huge amount of energy.

Van internet isn't just a networking problem. It's a power-budget problem wearing a networking costume.

## What it costs

It isn't cheap, but it's also not outrageous if this is how you make a living.

- Starlink Roam: about $150-165/month depending on plan details
- LTE data plans: about $50-100/month combined
- WireGuard VPS: about $5/month
- Hardware: roughly $1,500-2,000 all-in once you include the dish, router, antennas, mounting, and cabling

If you are traveling casually, this is overkill. If you are trying to do serious remote work from the road, it is easy to justify. Reliable internet is the line between "fun travel experiment" and "sustainable life setup."

## What I'd do differently

I'd buy the external antennas earlier. I spent too long pretending the LTE side was "good enough" when it was really just compromised by the van itself.

I'd also set up the WireGuard tunnel from day one. A lot of the pain I blamed on flaky failover was really just IP changes breaking sessions in ways that felt random until I looked closely.

The big lesson is simple: do not hunt for a perfect mobile connection. Build a system that fails gracefully. That is what makes van internet usable.
