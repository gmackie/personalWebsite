---
layout: post
title: "Pride in What You Do"
date: 2026-02-07
excerpt: "On craftsmanship, caring about your work, and why it matters even when no one's watching"
categories: [thoughts]
tags: [craftsmanship, career, work-ethic, philosophy, personal-growth]
comments: true
status: draft
---

The code worked. It passed the tests, it handled the edge cases we'd specced, and it would have sailed through review. But I sat there staring at it for another twenty minutes because something was off. Not broken-off. Just... sloppy. A function that did two things when it should have done one. A variable name that made sense to me at 4pm but would confuse anyone reading it next month. Some copy-pasted logic that was begging to be extracted.

Nobody was going to notice. The ticket would close either way. I stayed late and fixed it anyway.

<!--more-->

I've been thinking about why I did that, and what it says about the way I want to work. Not as some productivity hack or career strategy -- just as a thing I've noticed about myself that I think matters.

## The furniture test

My grandfather built furniture. Not as a business -- he was an engineer by trade -- but in his garage on weekends. Bookshelves, tables, a rocking chair I still have. The joints were tight. The sanding was thorough on surfaces you'd never see. The underside of a shelf looked as clean as the top.

I asked him once why he bothered finishing the parts nobody would look at. He said something like "I'd know." That's it. Not a philosophy. Not a lecture. Just the quiet fact that he'd know if he'd cut a corner, and that would bother him.

I didn't understand it then. I do now. There's a version of your work that's good enough for everyone else, and a version that's good enough for you. The gap between those two versions is where pride lives.

## Pride is not perfectionism

I want to be careful here because these two things get confused constantly, and the confusion causes real damage.

Perfectionism is the inability to stop. It's rewriting the same function six times not because each iteration is better, but because none of them quiet the anxiety. It's a fear response dressed up as high standards. I've been there -- spending three hours on a config file that works fine, telling myself I'm being "thorough" when I'm actually just avoiding the harder problem I don't want to face yet.

Pride in your work is different. It's a compass, not a cage. It's the thing that makes you pause before you ship and ask: did I actually do this well? Not perfectly. Not optimally. Just well. Would I be comfortable showing this to someone I respect and saying "yeah, I built that"?

The perfectionist can't ship. The craftsman ships, but ships something they're not embarrassed by. That's the whole difference, and it's enormous.

## The "ship it" tension

I'm building five MVPs right now. The entire point is speed. Move fast, get to users, learn what's real. In that context, "pride in what you do" sounds like a luxury -- the kind of thing you say at a conference but ignore when there's a deadline.

But here's what I've found: the sloppy version isn't actually faster. Not in any timeframe that matters.

Last month I was rushing to get a feature out and I skipped writing the database migration properly. Hardcoded some values, didn't handle the rollback case, told myself I'd fix it later. Two days later I needed to change the schema again and the whole thing collapsed. I spent four hours untangling something that would have taken thirty minutes to do right the first time.

That's not a parable. That's a Tuesday. The "fast" path that skips quality is only fast if you never have to touch the code again. And you always have to touch the code again.

The real skill isn't choosing between speed and quality. It's knowing which corners actually don't matter and which ones will cost you later. A prototype can have ugly CSS. A prototype should not have a broken data model. Pride isn't about making everything perfect -- it's about knowing where the load-bearing walls are and refusing to cut through them.

## The feeling

There's a specific feeling I'm chasing, and I think anyone who builds things knows it. It's the moment after you finish something and you sit back and it's just... solid. Not flashy. Not impressive in a way that'll get Twitter engagement. Just solid. The tests pass. The code reads clearly. The abstractions make sense. Someone could pick this up in six months and understand what's happening.

It's a quiet feeling. Nobody gives you a trophy for clean database schemas or well-named variables or thoughtful error handling. The reward is entirely internal -- you know that what you built is sound, and that knowledge sits in you differently than shipping something you're not sure about.

I've shipped things I wasn't proud of. The paycheck clears the same way. But there's a low-grade background hum of doubt that comes with it. You know the module that's held together with duct tape. You know the test you skipped because it was hard to write. It doesn't keep you up at night, but it's there, like a notification you keep swiping away.

## It's a choice, not a trait

I don't think pride in your work is something you're born with. It's a decision you make over and over, often in small moments when no one's watching. When you're tired and the code works and you could just commit it. When the review feedback is "looks good" but you know it's not your best. When the deadline is real and the shortcut is right there.

Sometimes the shortcut is the right call. I'm not pretending otherwise. But there's a difference between choosing the shortcut consciously -- knowing what you're trading away, planning to come back -- and just not caring. The first one is pragmatism. The second one is how you end up with a codebase that everyone hates and nobody owns.

I stayed late that night not because anyone asked me to. I stayed because the version of the code I'd written wasn't the version I wanted to exist. The working version and the good version were different, and I wanted the good one.

That's all pride is. Giving a damn when you don't have to.
