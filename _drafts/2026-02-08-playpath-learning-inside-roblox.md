---
layout: post
title: "PlayPath: Teaching Inside Roblox Without Feeling Like Homework"
date: 2026-02-08
excerpt: "Kids already spend hours in Roblox. PlayPath puts learning inside the game loop itself -- not as an interruption, but as the mechanic."
categories: [startups]
tags: [startups, playpath, edtech, roblox, learning, spaced-repetition, lti, coppa]
comments: true
status: draft
---

The most common EdTech failure mode is chocolate-covered broccoli. You build something that's technically educational, wrap it in a thin game skin, and hope kids don't notice. Kids always notice. If the product feels like school wearing a party hat, it loses to the actual party.

And for tens of millions of kids, the actual party is Roblox.

PlayPath is my attempt to stop fighting that reality.

<!--more-->

## Roblox is where the attention is

If you spend time around parents, you hear the same tension a dozen ways. "My kid loves Roblox." "I feel guilty about screen time." "It's the only thing they'll do for hours without being asked."

Roblox wins because it's social, infinite, and identity-driven. It's not a game -- it's a place. When a kid chooses between a worksheet app and Roblox, Roblox wins every time. That's not a moral failing. It's an incentive system.

So the question is simple: what if learning lived inside the game loop kids already love?

## Learning can't interrupt play

Most educational games interrupt play with learning. You're doing something fun, a quiz pops up, answer three math problems to continue. Kids feel the "now eat your vegetables" moment instantly.

PlayPath's design constraint is strict: learning cannot interrupt play. Fractions aren't a quiz between levels. Fractions are the mechanic. The learning objective has to be identical to the thing that moves the player forward.

In Fraction Forest, you navigate a world where number lines and fraction comparisons are literally how you move. In a Physics Sandbox, the question isn't "what is the angle?" -- it's "can you make the thing go where you want?" In Rhythm Phonics, decoding and syllables are the inputs in a rhythm game that feels like something you'd play even if no adult was watching.

This is the only approach I've seen that has a real shot at being Roblox-fun and academically meaningful at the same time.

## The engine: adaptive, not creepy

If the game is going to teach, it has to adapt. Otherwise it's either too easy (boring) or too hard (frustrating), and both paths lead to churn.

The plan combines proven ideas: spaced repetition for retention, mastery tracking to decide what comes next, and a light content generation layer so the experience doesn't feel like the same worksheet in different fonts.

But the users are kids, and that changes everything.

COPPA isn't a compliance footnote I'll deal with later. It's a design constraint that shapes the architecture from day one. The easy version is a checklist: no PII in prompts, safety filtering, parent controls. The harder version -- the one I actually care about -- is earning trust by being genuinely conservative about data.

The adaptive engine runs on behavioral signals within the game (what levels a player struggles with, what they've mastered, how long they spend on a challenge) and never on identity data. Generated content goes through safety filters before a kid sees it. Parent dashboards show progress without requiring the kid to hand over anything personal. The whole thing is designed to survive an audit from a skeptical district IT director, because if we get into schools, that audit is coming.

I'd rather over-engineer the privacy layer now than discover I cut corners later.

## Schools make this harder (and way more defensible)

There are two customers for PlayPath: families and schools.

Families pay for engagement -- they want their kid's Roblox time to feel less like wasted time. That's a real market, but consumer EdTech is brutal.

Schools are harder to sell to but stickier once you're in. The catch: if a teacher can't assign this and see progress without a week of setup, it doesn't exist to them. That's why PlayPath supports LTI 1.3 launches, roster sync, and grade passback from the start. If it behaves like a normal LMS-integrated tool, a district can pilot without creating a parallel universe of logins and spreadsheets.

## What success looks like

Near-term: ship one world (Fraction Forest) that is genuinely fun enough to retain players who have zero obligation to keep playing. Build a parent dashboard that shows standards-aligned progress without requiring a PhD to read. Get a small cohort of paying families to validate the value prop outside my head.

Then schools. A real pilot: one teacher, one classroom, six weeks. The teacher assigns Fraction Forest through their LMS. Students launch it from the same place they launch everything else. The teacher sees a dashboard showing who's mastered equivalent fractions and who's stuck on number line placement. At the end of six weeks, the teacher points to measurable progress on specific Common Core standards and says "this worked" -- or "it didn't" -- with actual data.

That's the bar. Not "kids liked it." Did the teacher see learning she could measure and trust?

If PlayPath works, it should feel like cheating. The kid is "just playing Roblox" while the parent dashboard quietly shows something real is happening.

For the bigger picture on why I'm building five products at once, here's the hub post: [Building Five MVPs with AI](/articles/2026-02/building-five-mvps-with-ai).
