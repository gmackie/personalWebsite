---
layout: post
title: "Van Internet: Starlink + LTE Failover for Life on the Road"
date: 2026-02-07
excerpt: "I get better internet parked in a national forest than most hotels deliver. Here's the hardware, architecture, and real numbers behind a Starlink + LTE failover setup for full-time remote work from a van."
categories: [technical]
tags: [vanlife, starlink, lte, networking, mobile-internet, remote-work]
comments: true
status: draft
---

The Zoom call dropped. Again. I was parked in a national forest, my phone showed four bars of LTE, and my coworker was mid-sentence when the connection just evaporated. I rejoined thirty seconds later, apologized, and spent the rest of the meeting wondering if this whole "work from a van" thing was actually sustainable.

That was the phone-hotspot era. It's over now. These days I routinely pull 50-200 Mbps down from a clearing in the mountains and my calls don't drop. The setup isn't cheap and it isn't simple, but it works -- and if you're trying to hold down a real remote job from the road, "it works" is the only metric that matters.

<!--more-->

## The mobile internet problem

Let me be specific about what "works" means here. I'm not streaming Netflix and calling it a day. I need to hold video calls for hours, push and pull code, SSH into servers, and occasionally transfer large files. Latency matters. Uptime matters. Bandwidth matters less than you'd think, but when you need it, you really need it.

Phone hotspots fail this test in three ways. Carriers throttle hotspot data -- even "unlimited" plans cap you at 5-15 Mbps after some threshold, and that's before the deprioritization kicks in when the tower is busy. Coverage is binary: you either have signal or you don't, and in the places I actually want to park, you often don't. And the latency spikes are unpredictable. You can have full bars and still get 300ms pings because the tower is congested or you're on a distant band.

The anxiety was the worst part. Every morning started with "will I have internet today?" instead of "what am I building today?" That's not a way to live or work.

## The hardware stack

The system has two independent internet paths: Starlink as primary, LTE as failover. Here's what's physically in the van.

**Starlink Mini.** The flat dish sits on the roof when parked. It needs a clear view of the sky -- trees are the enemy, not clouds. I went with the Roam plan because I move constantly. The dish itself draws 75-100W continuously, which is a real number when you're running on solar and batteries. More on that in a minute.

**LTE router with external MIMO antennas.** This was the single most impactful upgrade to my mobile internet, period. I'm running a Peplink router with a dual-SIM setup (T-Mobile and AT&T) and two external MIMO antennas mounted on the roof. Before the external antennas, my LTE was whatever the internal radio could pull -- maybe 5-15 Mbps on a good day, with constant drops. After mounting proper MIMO antennas up high and outside the metal box that is a van, I consistently get 25-80 Mbps and have seen over 100 Mbps on a strong tower. The van's body is a Faraday cage. Getting the antennas outside of it is not optional.

**The router itself** handles both WAN connections and does automatic failover. When Starlink drops -- tree cover, weather, moving between coverage areas -- traffic shifts to LTE within seconds. When Starlink comes back, traffic shifts back. Inside the van, everything connects to one WiFi network. My laptop doesn't know or care which upstream path is active.

## Failover, not bonding

This is the decision most people get wrong when researching dual-WAN setups. Bonding sounds better on paper -- combine both connections for maximum speed. In practice, bonding requires a cloud relay server, adds latency to every packet, costs extra monthly, and creates a single point of failure (the relay). If that relay goes down, you lose both connections simultaneously.

Failover is simpler and more reliable. Starlink is the primary path. If it goes unhealthy, traffic moves to LTE. That's it. You don't get combined bandwidth, but you almost never need combined bandwidth. What you need is for the internet to not disappear, and failover delivers that.

The one trick that makes failover seamless: a WireGuard tunnel to a cheap VPS. All my traffic routes through the tunnel regardless of which upstream connection is active. When the router switches from Starlink to LTE, the tunnel just re-establishes over the new path. The VPS IP stays the same, so from the perspective of whatever I'm connected to -- Zoom, SSH sessions, VPN -- nothing changed. No dropped connections, no re-authentication. WireGuard reconnects in under two seconds and is lightweight enough that it adds maybe 1-2ms of latency. It's the glue that makes failover invisible.

## Real-world numbers

I've been running this setup for months across the western US. Here's what I actually see, not what the spec sheets promise.

**Starlink:** 50-200 Mbps down, 10-25 Mbps up, 25-60ms latency. The variance is real -- you'll see 200 Mbps in an open field in Montana and 50 Mbps when you're pushing your luck with partial tree cover. Upload is the weak link. It's enough for video calls and pushing code, but if you're uploading large files regularly, plan for it to take a while. Latency is solid for everything except competitive gaming, which I'm guessing isn't your top priority if you're living in a van.

**LTE (with external MIMO antennas):** 5-100+ Mbps, wildly variable. Near a tower in a small town, I've clocked 120 Mbps. In a remote canyon, 5 Mbps if I'm lucky. The dual-SIM setup helps a lot -- T-Mobile and AT&T have different coverage maps, and having both means I rarely have zero signal. Average in the places I typically camp: 20-50 Mbps.

**Failover transitions:** Under 5 seconds with WireGuard, usually 2-3. Fast enough that a video call might stutter for a moment but won't drop.

For video calls specifically -- which is the make-or-break use case -- Starlink handles them without issues. The latency is low enough that conversations feel natural. I've done full-day meetings from campgrounds and nobody knew I wasn't in an apartment.

## Power is the real constraint

Starlink draws 75-100W. Continuously. That's not a footnote -- it's the central tension of running this setup off-grid. Over a work day, the dish alone consumes 600-800Wh. Add the router, antennas, and my laptop, and the internet + work stack draws around 900-1100Wh per day.

I cover this with a combination of roof solar and LiFePO4 batteries. The full electrical system is a whole separate conversation -- I wrote about it in [my van build post](/articles/2026-02/van-setup-current-and-future) -- but the short version is that 400-600W of solar handles it on sunny days, and on cloudy days I'm watching the battery state of charge and making decisions about what to run.

The practical implication: I turn Starlink off when I'm not actively working. The LTE router stays on 24/7 because it draws under 10W, so I always have basic connectivity for messages and notifications. Starlink comes on when I sit down to work and goes off when I'm done. That single habit cut my daily internet power consumption nearly in half.

## What it costs

No point dancing around this. Running a real mobile internet setup isn't cheap.

- Starlink Roam: ~$165/month (50GB priority, unlimited standard)
- T-Mobile hotspot plan: ~$50/month
- AT&T prepaid data: ~$35/month
- WireGuard VPS: ~$5/month
- **Total: ~$255/month**

Hardware was a bigger one-time hit. The Starlink dish, Peplink router, MIMO antennas, cabling, and mounting hardware came to roughly $1,500-2,000 depending on what you already have.

Is it worth it? If you're working remotely full-time from a van, yes. Without question. That $255/month is less than the internet + coworking space I'd pay in most cities, and it follows me everywhere. If you're a weekend warrior or casual traveler, it's overkill. A phone hotspot with a decent plan will cover you.

## What I'd do differently

Two things. I'd buy the external MIMO antennas first, before anything else. I spent months with mediocre LTE because I thought the router's internal antennas were "good enough." They aren't. The antennas were a $150 upgrade that tripled my average speeds.

And I'd set up the WireGuard tunnel from day one. I burned too many hours troubleshooting dropped SSH sessions and Zoom reconnects before I realized the real problem was IP changes during failover, not the failover itself.

The rest of the setup I'm happy with. Starlink as primary, LTE as failover, WireGuard as the glue. It's not perfect, but it's reliable -- and reliable internet is what makes the difference between "I live in a van and kind of work sometimes" and "I live in a van and do my job."
