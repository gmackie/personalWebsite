---
layout: post
title: "TrueComps: TurboTax for Property Tax Appeals"
date: 2026-02-08
excerpt: "Your property taxes are probably wrong. TrueComps is a $49 report that gives you the evidence to prove it."
categories: [startups]
tags: [startups, truecomps, proptech, property-taxes, taxes, pdf, seo]
comments: true
status: draft
---

Your property taxes are probably wrong. Not in a conspiracy way -- in a "counties are running valuations on a deadline across hundreds of thousands of parcels with imperfect data" way. The errors aren't rare. They're a predictable output of a system with too much surface area and not enough time.

And most people just... pay it. Because the appeal process feels like something only lawyers or professional tax consultants do.

TrueComps is my attempt to make that not true anymore.

<!--more-->

## The appeal process is fragmented, not hard

Here's the weird part: actually appealing your property tax assessment isn't that complicated. You find comparable sales, show that your assessed value is too high, and submit the evidence. That's it.

But the experience around that simple idea is miserable. Every county does it differently. Texas has a hard May 15 deadline. Other places have their own unforgiving windows. The documentation, terminology, evidence expectations, and submission methods can all change when you cross a county line. And since most people do this once or twice in their lives, the learning curve never pays off.

So you get two reactions when you tell a homeowner they can appeal. Either "wait, that's a thing?" or "sure, but I'm not hiring a lawyer for this." Both make sense. The process feels like paperwork roulette. You don't know what "good" looks like. You don't know what evidence matters. You don't know whether you'll end up in a hearing trying to explain a Zestimate to someone who's heard every bad argument a thousand times.

The incumbents solve this by doing it for you -- full-service, contingency-based, taking 25-50% of whatever you save. If your appeal saves $1,000, you keep $500-$750. That's better than nothing, but it creates a quiet default I don't love: "over-assessment happens" becomes "call someone" becomes "give up a big chunk of the upside."

## A $49 report, not a $500 consultant

TrueComps is built around a flat fee: pay $49, get an appeal-ready PDF you can submit yourself.

Not a blog post about how to do it. Not "upload ten documents and wait for a consultant." An actual evidence packet that does the parts homeowners don't want to do -- pulling comps, formatting them the way assessor offices expect to see them, mapping the geography (maps matter a lot in comps arguments), and explaining the methodology in plain English.

The pricing goes up from there in ways that make sense: $79/year if you want to re-run it annually, $129/year if you own multiple properties, $99/month if you're a consultant filing for clients. But the core bet is the $49 single report. If a homeowner can go from "ugh, my assessment is too high" to "submitted" in under an hour for fifty bucks, the product works. If it requires persuasion or a sales call, the economics get weird fast.

## The actually hard part: county adapters

The easiest way to misunderstand this product is to think the PDF is the hard part. The PDF is the output. The hard part is making the input reliable.

Every county exposes property and sales data differently. Some have modern APIs. Some have web portals that feel like they were built by an intern in 2009 and never touched again. Some are half-structured documents you have to parse. None of them are trying to make the life of a small product team easy.

So most of the real work is what I'd call boring data plumbing: building county adapters that ingest assessment and sales data, normalizing it into a unified schema, and making sure it stays correct as data sources change underneath you. Once you have normalized data, you can run the analysis -- a mix of regression and comparable-selection heuristics to estimate fair market value. But the analysis is only as good as the normalization, and the normalization is only as good as the adapters.

This is also why I'm not trying to be "nationwide" on day one. I'm starting where the economics are strongest and where a deadline creates real urgency. Texas is the forcing function -- that May 15 deadline creates a seasonal spike that concentrates demand in a predictable window.

## What I'm watching for

Three things tell me whether this is working:

Will people pay $49 without a sales call? If the product requires hand-holding, it's a different business than the one I want to build.

Is the report actually good enough that people submit it and get reductions? "Good enough" isn't academic -- it means the evidence packet matches how real appeal boards work.

Can the funnel run on county-specific SEO? The intent is extremely local and extremely seasonal, which is a rare and useful combination if you can build content that matches it.

I don't have a grand theory here. I'm trying to take a fragmented, deadline-driven government workflow and turn it into something that behaves like a modern consumer product. If it works, it'll look obvious in hindsight.

This is one of five MVPs I'm building in parallel. If you want the bigger picture on why and how, here's the meta post: [Building Five MVPs with AI](/articles/2026-02/building-five-mvps-with-ai).
