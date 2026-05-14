---
layout: post
title: "Sandcastles"
excerpt: "I can build things all day. The hard part is getting anyone to care."
categories: [life]
tags: [startups, solo-dev]
site: personal
---

I've been building for four months straight. Twenty-something ventures, prototypes, experiments. I can stand up a new app in a day or two. I can explain every line of code in it because I wrote it, or at least reviewed it before it shipped. None of it is AI slop. I understand how all of it works.

And none of it has users.

<!--more-->

The building is the easy part. Nobody tells you that when you leave a big company. I spent a decade at Amazon learning how to ship software. I know how to build distributed systems that handle 10,000 transactions per second. I know how to run an operational review and write a six-pager and survive re:Invent launch week.

What I don't know how to do is get a stranger to try my app.

Here's a funny thing: four months out of Amazon and I haven't touched AWS. I used it briefly when I first left, poking around at startup ideas, but I stopped pretty quickly. Everything I'm running fits on a couple of Hetzner VPS instances and the Cloudflare free tier. That's it. That handles the amount of traffic I have, which is essentially zero.

I spent years getting deep on AWS. It's one of the things that makes me marketable. But for a solo founder with no revenue, AWS is overkill. The free tier runs out, the bill starts climbing, and you're paying enterprise prices for hobby traffic. Hetzner gives me a box for five euros a month and I can run whatever I want on it. I don't see that changing until a venture hits the point where startup credits make sense. Once it does, I know how to build the devops tooling around AWS without needing third-party platforms. But that's a Series A problem, and I'm at the "does anyone want this" stage.

The bottleneck isn't infrastructure. It's distribution.

## The sandcastle problem

Building a startup alone feels like building a sandcastle. You can make it absurdly detailed. You can add towers and moats and little flags on top. You can spend all day on it and feel great about what you made. Then you look up and realize you're the only person on the beach.

The sandcastle doesn't survive contact with the tide. And you don't know which parts of it are any good until someone else looks at it and tells you what they actually want.

I've been building against problems I can see. PlayTrek exists because adaptive learning inside games is obviously better than worksheet apps. Controls Foundry exists because manufacturers are running PLC-5s from the '90s and the people who programmed them are retired. These are real problems. I'm confident about that.

What I don't have is a single customer who agrees with me yet.

At Amazon the problems came to me. Someone filed a ticket, or a metric turned red, or a VP sent an email at 11pm. I never had to wonder whether the problem was real. I just had to fix it. Now I'm out here building solutions to problems I've identified on my own, and I don't know where to find the people who have those problems. I don't even know if they describe the problem the same way I do.

It's not that I can't talk to customers or solve their problems once I find them. I can. The gap is finding them in the first place. Where do manufacturers who need PLC migration hang out online? Where do parents who are frustrated with their kid's math app go to complain? I don't know. And writing more code isn't going to answer that question.

The obvious advice is to post on LinkedIn. Comment on people's stuff. Build a personal brand. Get your name out there. I know that's what I should be doing. I also know that every time I open LinkedIn and see someone posting "3 things I learned from failing at my startup" with a selfie attached, I want to close my laptop. The performative vulnerability, the engagement farming, the "thoughts?" at the end of every post. I can't make myself do it.

X is the same story. I've always been a lurker, not a poster. And right now every platform is drowning in AI-generated content. Everyone has their slop cannons pointed at the feed and the trigger taped down. Adding my own voice to that noise feels like pissing into the ocean. I'd rather build something worth talking about and figure out distribution later, but "figure out distribution later" is famously how startups die.

## What I'm good at vs. what I need

The thing I was best at during my time at Amazon was working the gap between corporate tech teams and fulfillment center operations. The ops teams on the warehouse floor did whatever it took to get the job done. That meant Excel files held together with VBA macros, GreaseMonkey scripts bolted onto internal tools, Python scripts running on someone's laptop, copy-paste workflows that took three hours a day. It was messy and it didn't scale, but it worked. And every so often an operations leader would build something genuinely clever that spread to other buildings by word of mouth.

There were two camps at Amazon and they hated each other's tools. The ops side saw the tech teams as slow-moving monoliths. Any feature request, no matter how small, turned into months of development, testing, validation, sign-off chains, director approval, financial justification. By the time a feature shipped it was either bloated beyond recognition or so late that the business had moved on. The tech side saw the ops-built tools as scrappy garbage. Unmaintainable code, no tests, regular production outages, user errors taking down systems. Both sides were right about the other's weaknesses and blind to their own.

I got good at code-switching between them. I liked wearing both hats. My team sat in the middle and took the best of each: the ops team's speed and closeness to the actual problem, the tech team's CS fundamentals and ability to build something maintainable. We'd work with the person who built the spreadsheet, understand what they were actually solving, and ship a version that could run at 100 fulfillment centers instead of three. The solution needed to be more abstract than the original hack but still targeted at what the field was asking for. Not a full enterprise platform. Just enough structure to be extensible without slowing us down.

Riding that line, delivering fast while keeping the technical bar high enough that you're not creating tomorrow's outage, is the work I enjoy most. That's how I build now too. I start scrappy, iterate toward something solid, and don't reach for the enterprise playbook until the problem demands it.

I like the solo dev loop. I like having full context on every system I touch. I like that when something breaks at 2am it's my fault and I can fix it without filing a ticket.

What I need is to figure out where my customers are. All that building instinct doesn't help if I'm solving a problem nobody's hired me to solve yet.

## What's next, honestly

I don't know. I think about it a lot.

Maybe one of these ventures catches. PlayTrek has the clearest path because the market is real and I can see how it gets to revenue. Controls Foundry has a different angle. There are manufacturers running Allen-Bradley PLC-5s from the '90s and the integrators who programmed them are retired. Those companies will pay to understand their own equipment. I just have to find them.

Maybe I find a co-founder who already knows where the customers are. Someone who's been in the industry, has the network, and gets energy from customer conversations the way I get energy from debugging a production issue.

Maybe I join something early-stage. A startup that has users and needs someone who can build. That would scratch the itch without the full risk of doing it alone.

Maybe I go back to a regular job. Probably not FAANG again. I'm burnt out on that world. The oncall rotations, the operational reviews, the reorgs every six months. I don't miss it. But there are companies doing interesting work that aren't run like that, and a steady paycheck would take the pressure off.

Right now it feels like I'm filling out lottery tickets. Each venture is a ticket. I'm trying to buy as many as I can while the money holds out. The smart move is probably to pick two or three and go deep instead of spreading across twenty. I know that intellectually. I haven't done it yet because picking means killing the others, and I'm not ready for that.

All I can do is keep building, start talking to people more, and try to increase the surface area for something to catch. The building part I've got. The rest of it I'm still figuring out.
