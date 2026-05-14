---
layout: post
title: "Four Months Out"
excerpt: "Left Amazon, built a bunch of things, still not sure any of it will work. Some thoughts on AI, supply chain worms, and who gets to build things."
categories: [life, tech]
tags: [amazon, ai, security, startups]
site: personal
---

I'm officially done at Amazon. Not "on leave" done or "vesting out" done. Done done. Badge returned, laptop shipped back, corporate VPN deleted from my phone. Four months of building things on my own and the safety net is fully gone.

It feels good. It also feels like jumping off a diving board and realizing mid-air that you haven't checked if there's water in the pool.

<!--more-->

## What AI development actually feels like right now

I've been writing code with AI tools for over a year now, but doing it full-time for four months has been a different thing entirely. I'm running 20+ ventures and experiments from one desk -- you can see the full list on [gmacko.com](https://gmacko.com). Some of them have real users. Most of them don't yet. The point is that I can build them at all.

Three years ago, standing up a new product meant weeks of boilerplate before you got to the interesting part. Now I can go from idea to deployed prototype in a day or two. I'm hitting 100% of my weekly Codex and Claude Code limits and it still doesn't feel like enough. I've been experimenting with t3code and building out my own agent harness (Bob) to orchestrate work across repos. The scaffolding that used to eat my time just doesn't anymore. I'm spending almost all of my effort on the actual problems I'm trying to solve, not the ceremony around them.

That's exciting for me, but the thing I keep thinking about is what it means for people who aren't developers. The William Gibson line gets quoted to death, but it's true: the future is here, it's just not evenly distributed. If you want to build a software product right now, you either need to code or you need to pay someone who can. AI is starting to close that gap, and a lot of what I'm building is aimed at that.

PlayTrek is where most of my focus goes. It's an adaptive learning platform built inside the games kids already play -- K-8 math and reading, but the kid thinks they're just playing a game. It leans on LevelForge for procedural game asset generation: a catalog of 45,000+ CC0 assets with AI filling the gaps. A solo developer who could never afford an art team can now prototype a visually complete game, and PlayTrek uses that pipeline to generate learning content that doesn't look like homework.

Controls Foundry is the other one I'm really excited about. It's cloud intelligence for industrial PLC programs -- AI-annotated ladder logic for manufacturers and utilities still running SCADA systems and automation equipment from the '90s. I'm building out an initial consultancy around it for ICS, remote management and monitoring of industrial control systems. These are organizations that know they need to modernize but don't have the in-house talent. LLMs are finally good enough to help read and annotate the programs these systems run on.

GenTrellis is the observability layer -- distributed tracing, metrics, and log analysis with AI-powered anomaly detection. Less flashy than the others, but it's the kind of infrastructure that every serious deployment needs.

Turntable.bot is the one that makes me happiest to explain. There are people who have incredible taste in music, who spend hours building playlists and digging through crates at record stores, but who have zero interest in learning to beatmatch or operate DJ software. They have the ear but not the technical skills, and until now that meant they just made playlists on Spotify. Turntable.bot lets them work with an AI to put together actual mixed sets. The transitions, the BPM matching, the phrasing -- the bot handles the mechanics while they make the creative decisions. It opens up DJing to people who were locked out by the tools, not by their taste.

StreamConductor is a similar idea applied to live production. Right now, if you want to livestream a youth basketball game or a local tournament, you need someone who knows OBS, understands encoding settings, can manage scene transitions, and can troubleshoot audio issues in real time. That's a lot of specialized knowledge for a parent who just wants other families to be able to watch the game. StreamConductor handles the production side so you can focus on pointing the camera. And yeah, it works for Twitch streamers too, but the amateur sports angle is the one I'm most excited about.

Most of what I'm building comes back to the same thing: people who should be able to do something but can't because the tools were built for specialists. The AI isn't replacing their taste or their knowledge. It's just removing the technical barriers that kept them from using what they already have.

## Building tools for myself too

Not everything is for other people. I've also been building things to get better at specific skills, which is maybe the nerdiest possible use of this time.

Test Dojo is an interview prep platform that I'm actively using to keep my coding skills sharp. I'm still working through LeetCode problems manually, writing solutions by hand, timing myself. No AI assist on the actual problem-solving -- that would defeat the purpose. But I built the trainer itself with AI, and it's tailored to how I like to practice: timed rounds, specific problem categories, progress tracking. If I do end up back in big tech, I want to walk into those interviews warmed up.

I also built a poker trainer because I have this fantasy of playing poker as a side revenue stream. I'm mostly joking. Mostly.

HabitPlay ties it all together. It ingests progress from the other tools and ventures and gamifies it -- converting completed work into XP and currency that I spend on in-game items. It's how I track whether I'm actually making progress across all of this or just context-switching between twenty things and finishing none of them. Turns out seeing a flat XP graph is a pretty effective way to catch yourself slacking.

## Supply chain nightmares

I should be purely optimistic about AI making everything easier to build, but I can't ignore the security side.

Andrew Nesbitt published a [fictional incident report](https://nesbitt.io/2026/02/03/incident-report-cve-2024-yikes.html) back in February about a made-up npm package called left-justify. In the story, an attacker steals the solo maintainer's credentials through a phishing site, publishes a malicious version, and the compromise cascades through transitive dependencies across npm, PyPI, Cargo, and RubyGems. 4.2 million developer machines infected. It was satire. Exaggerated to make a point. The CVE identifier was literally "YIKES."

Three months later, almost exactly that scenario played out for real. The Mini Shai-Hulud worm -- named after the sandworms in Dune, which is either terrifying or hilarious depending on your relationship with your own mortality -- compromised 170+ packages across npm and PyPI. TanStack React Router, Mistral AI's official SDK, UiPath packages. Over 500 million cumulative downloads affected. The attackers didn't even need stolen npm credentials. They exploited GitHub Actions workflows, poisoned the CI cache, and extracted OIDC tokens from runner process memory. The worm was self-spreading. It used each compromised package's credentials to infect more packages automatically.

The payload installed a persistent daemon on developer machines that harvested GitHub tokens, npm tokens, cloud credentials, Kubernetes service accounts, SSH keys. And if the stolen tokens got revoked, it tried to `rm -rf ~/` before self-destructing. Just out of spite.

Nesbitt's satire wasn't exaggerated enough.

The same tools that let me prototype 20 ventures in four months would let an attacker generate convincing phishing pages, craft polymorphic malware, or create thousands of fake packages with plausible names. The barrier to building is dropping for everyone, including people who want to break things.

I've been putting off getting my OSCP certification for over five years now. I started studying, got busy at Amazon, let it slide, repeated that cycle a few times. I'm finally building out an OSCP study notebook and actually working through the material. The security landscape is moving fast enough that I can't justify ignoring my own skills gap anymore. Supply chain attacks, AI-generated social engineering, automated exploitation -- if I'm going to build things that other people depend on, I need to understand how they get broken.

I don't have a clean answer for the broader problem. Supply chain verification, package signing, reproducible builds, and actual security audits need to become as standard as CI/CD pipelines. We're not there yet.

## Whether any of this works

Four months of full-time work and I'm not sure any of the ventures will actually pay out. That's the truth. I have a lot of interesting prototypes and a few that are close to generating revenue, but nothing that's replaced my Amazon salary yet. The burn rate of "zero income plus Seattle rent" has a timer on it.

I'm going to keep going because the work is interesting to me in a way that Amazon stopped being. I wake up wanting to work on these things, which wasn't always true when I was writing operational readiness documents for a reInvent launch. Building something that lets a kid learn math without realizing they're studying, or lets a manufacturer finally read their own PLC code, or lets someone who loves music create their own DJ sets -- I'd rather spend my time on that and have it not work out than go back to something safe that I'm not excited about.

Maybe the ventures pay off. Maybe I end up back in big tech with a bunch of shipped prototypes and some good stories. Either way, I'm learning more per week right now than I did per quarter inside a big company.
