---
layout: post
title: "Living with LLMs: A Year of AI-Assisted Everything"
date: 2026-02-07
excerpt: "What I've actually learned from integrating LLMs into my daily workflow -- the wins, the failures, and the one insight that changed everything."
categories: [technical]
tags: [llm, ai, chatgpt, claude, copilot, productivity, tools]
comments: true
status: draft
---

I'm writing this in February 2026, which matters, because half of it will probably be wrong by summer. That's the nature of this moment. The tools change faster than the habits around them. But I've spent the last year and a half using LLMs for almost everything -- coding, writing, learning, brainstorming, debugging -- and I've learned enough to say something useful before the ground shifts again.

<!--more-->

Here's the headline: LLMs didn't make me 10x more productive. They made me 2-3x more productive at some things, saved me zero time on others, and actively wasted my time on a handful of tasks where I would have been faster doing it myself. The net effect is positive. But it's messier and more conditional than the hype suggests.

## From toy to tool

My first real interaction with a capable LLM was GPT-3, and I treated it like a parlor trick. Ask it to write a poem about Kubernetes. Make it explain monads in pirate speak. Fun, but not useful.

That changed fast. GPT-4 arrived, then Claude, then a wave of models that could actually hold context, follow instructions, and produce work I didn't have to rewrite from scratch. I went from "this is cool" to "I'm not sure I can go back" in about six months.

The progression looked like this: toy, curiosity, crutch, tool. The crutch phase was important and embarrassing. That's the period where I reached for AI on everything, including things I was faster at without it. I'd spend ten minutes crafting a prompt for something I could have typed in three. I'd iterate on AI output that was 80% right instead of just writing the last 20% myself.

Getting past the crutch phase required honesty about where the leverage actually was.

## Where the leverage actually is

**Coding.** This is where LLMs changed my workflow most. Not for the reasons people think. Copilot-style autocomplete is nice but incremental -- it saves me typing, not thinking. The real value is conversational coding: describing what I want, getting a first pass, iterating. I use Claude Code heavily now, and the [structured workflow I built around it](/articles/2026-02/building-five-mvps-with-ai) is how I'm running five MVPs in parallel without losing my mind.

What works: boilerplate, unfamiliar APIs, test generation, refactoring mechanical patterns, translating between languages, scaffolding new features from existing patterns. Basically anything where the shape of the answer is known but the details are tedious.

What doesn't: complex architecture decisions, subtle concurrency bugs, performance optimization, anything requiring deep understanding of why the code is structured the way it is. The model can produce code that looks right and passes a naive test while missing the actual point. I've shipped bugs this way. More than once.

**Writing.** I use LLMs for first drafts, brainstorming, and editing. Not as a ghostwriter -- as a sparring partner. I'll dump my rough thoughts and ask the model to organize them, or I'll write a first draft and ask it to find the weak arguments. The output is never publishable as-is, but it gets me to a working draft faster.

**Learning.** This is the sleeper use case. When I'm exploring a new domain, I can have a conversation with a model that's read everything and ask the dumb questions I'd be embarrassed to ask a colleague. "Explain property tax assessment appeals like I'm a developer who's never dealt with real estate." That kind of thing. It's not always accurate -- I'll get to that -- but it's an incredible starting point.

**Brainstorming.** LLMs are genuinely good thinking partners if you know how to push back. The trick is not accepting the first answer. The first answer is almost always generic. The third or fourth answer, after you've said "that's obvious, what else?" and "what am I not considering?" -- that's where it gets interesting.

## The productivity reality

Let me be specific. Last month I tracked my time loosely across projects. Rough numbers:

Tasks where AI saved significant time: about 40% of my coding work, maybe 30% of my writing. These are the wins -- things that would have taken an hour took twenty minutes, or things I wouldn't have attempted at all became feasible.

Tasks where AI was roughly neutral: about 30%. I used it, it helped a little, but the time spent prompting and verifying roughly equaled the time saved.

Tasks where AI cost me time: about 15% of what I tried. Wrestling with a model that confidently produces almost-right output. Debugging AI-generated code that passed my initial review but failed in production. Going down a rabbit hole because the model suggested an approach that sounded clever but was fundamentally wrong.

The remaining 15% I never tried AI on at all -- tasks that are too judgment-heavy, too context-dependent, or too fast to bother.

Net: I'm genuinely faster. But the margin is smaller than it feels, because the wins are dramatic and visible while the losses are subtle and spread out.

## The failures

The worst thing an LLM can do is almost work.

If it completely fails, you shrug and do it yourself. No time lost. But when it produces something that's 90% right -- code that runs but has a subtle bug, an explanation that's mostly accurate but wrong about one critical detail, a draft that sounds good but makes an argument you don't actually believe -- that's when it costs you. You spend time reviewing, verifying, second-guessing. Sometimes you miss the error entirely and ship it.

Hallucinations are the famous problem, but I think confident wrongness is the more dangerous one. A hallucination is obvious once you check. Confident wrongness is a true-sounding statement that happens to be false in a way that's hard to catch without domain expertise. I've had models cite real papers with fabricated conclusions. I've had models describe API behaviors that don't exist, using syntax that looks exactly right. I've had models explain why my code was correct when it wasn't, and explain why it was wrong when it was fine.

The pattern I've noticed: LLMs are least reliable exactly when you're least equipped to verify them. If you're an expert, you catch the errors. If you're a beginner in a domain -- the exact situation where you most want AI help -- you're also the worst at spotting when it's lying to you.

## The insight that changed everything

Here it is: **structure beats intelligence.**

A mediocre model with a good workflow outperforms a brilliant model with no workflow. I learned this the hard way, burning hours on clever prompts that produced inconsistent results. Then I started building structure around the AI interaction -- predefined steps, verification checkpoints, explicit constraints -- and the output quality jumped.

This is the core of the [AI workflow I described in the MVPs post](/articles/2026-02/building-five-mvps-with-ai). Explore the codebase first. Brainstorm before implementing. Write a plan as an artifact. Implement in small verified steps. No claiming completion without proof.

Each step is mundane. Together, they transform the AI from a slot machine into something approaching a reliable collaborator. The structure compensates for the model's weaknesses -- its tendency to drift, to skip verification, to optimize for plausible-sounding over correct.

I think this principle will outlast any specific model. GPT-5, Claude 4, whatever comes next -- it'll be smarter, but it'll still benefit from structure. The models get better at raw capability. The workflows are what turn capability into reliability.

## The surprise

The biggest surprise: working with LLMs made me value human expertise more, not less.

I expected the opposite. I thought AI would flatten expertise -- make everyone roughly equivalent by giving everyone access to the same knowledge. Instead, it amplified the gap. Experts use AI tools better because they know what to ask for, they can evaluate the output, and they know when to override it. Beginners use AI tools worse because they can't distinguish good output from confident nonsense.

The skill that matters now isn't knowing the answer. It's knowing when the answer is wrong. That's a form of expertise that only comes from having done the work yourself, and no amount of AI assistance can substitute for it.

## Where this is going

I don't know. Nobody does, and anyone who says they do is selling something.

What I believe: LLMs will keep getting better, and the workflows around them will matter more than the models themselves. The people who build structured processes for working with AI will outperform the people who just type prompts and hope. The value of deep expertise will increase, not decrease, because verification becomes the bottleneck.

What I'm doing about it: building the workflows now, while I can still feel the friction. Keeping my core skills sharp by doing hard things manually sometimes, even when the AI could help. Treating every AI output as a draft, never as a final answer.

This post will age. Some of it will look obvious in a year. Some of it will look wrong. That's fine. The point isn't to predict the future -- it's to be honest about where I am right now, in February 2026, living with these tools every day.

They're not magic. They're not useless. They're a new kind of tool that rewards structure, punishes laziness, and changes what it means to be good at your job.

I'm still figuring out that last part.
