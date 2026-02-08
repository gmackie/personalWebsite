---
layout: post
title: "TrueComps: TurboTax for Property Tax Appeals"
date: 2026-02-08
excerpt: "Property taxes feel fixed until you learn how many homes are over-assessed. TrueComps is my attempt to turn appeals into a $49 self-serve workflow."
categories: [startups]
tags: [startups, truecomps, proptech, property-taxes, taxes, pdf, seo]
comments: true
status: draft
---

I used to think of property taxes the way most people do: as a number you don't get to negotiate. You might complain about it, you might vote about it, but you don't really *do* anything about it.

The more I dug into how assessments get set, the more that belief started to feel like superstition. Counties are essentially running a valuation pipeline on a deadline, with imperfect inputs, across an absurd number of parcels. It's not malicious. It's just a system with too much surface area and not enough time.

When you have that combination, you don't get rare, exotic edge-case failures. You get predictable, repeatable errors at scale. Which means over-assessment isn't a weird thing that happens to unlucky people. It's a normal outcome of how the machine works.

<!--more-->

That's the root of TrueComps: a product shaped around the uncomfortable idea that appeals are not a niche activity for professional tax consultants. They're a mainstream, rational thing homeowners should be able to do without feeling like they're filing for bankruptcy.

## The part nobody tells you: appeals are fragmented, not hard

If you tell a homeowner, "you can appeal your property tax assessment," you usually get one of two reactions.

The first is surprise: "Wait, that's a thing?" The second is resignation: "Sure, but I'm not hiring a lawyer for this." Both reactions are rational because the process is weird in exactly the way government workflows tend to be weird.

It's deadline-driven. Texas, for example, has a hard May 15 deadline, and a lot of other places have similarly unforgiving windows. It's county-specific. The documentation, terminology, evidence expectations, and submission methods can change when you cross an invisible boundary on a map. And it's unfamiliar. Most people do it once or twice in their lives, which means the learning curve never amortizes.

So even when the savings are real, the experience feels like paperwork roulette. You don't know what "good" looks like, you don't know what evidence matters, and you don't know whether you'll end up in a hearing trying to explain a Zestimate to someone who has heard every bad argument a thousand times.

Incumbents solve this in the obvious way: they make it full-service and expensive. They file for you, then take a contingency percentage, often 25-50% of the savings. If you save $1,000, you might keep $500-$750.

That's better than nothing, but it also creates a quiet default that I don't love: "Over-assessment happens" becomes "call someone" becomes "give up a big chunk of the upside."

I think there's room for a different default.

## The product: a $49 appeal-ready report

TrueComps is built around a simple promise: if you're over-assessed, you should be able to pay a flat fee and get a professional, appeal-ready PDF that you can submit yourself.

Not "here's a blog post on how to do it." Not "upload ten documents and wait for a consultant." An actual packet that does the parts homeowners don't want to do (and shouldn't have to do) if we can automate them.

The report is meant to feel like something an assessor office is used to seeing. It should include the comps in a clean format, explain the methodology in plain English, visualize the geography (maps matter when you're making a comps argument), and give you an evidence packet you can attach to the right form for your county.

Pricing-wise, I'm experimenting with a simple ladder: a single report for $49, with an annual plan ($79/year), a household plan ($129/year for multiple properties), and a consultant tier ($99/month). The point of the flat fee isn't just marketing. It's an incentive alignment. I want to optimize for speed, clarity, and repeatability. I'm not trying to build a business where the customer relationship is measured in months. I'm trying to get a homeowner from "ugh" to "submitted".

## The non-obvious work: counties don't speak the same language

The easiest way to misunderstand this product is to think the PDF is the hard part. The PDF is the output. The hard part is making the input reliable.

Every county exposes property and sales data differently. Some are modern. Some are web portals. Some are half-structured documents. Some have APIs that look like they were built by an intern in 2009 and never touched again. None of them are trying to make the life of a small product team easy.

So a lot of the work looks like "boring data plumbing": building county adapters that ingest assessment and sales data, normalizing it into a unified schema, and then making sure it stays correct as data sources change.

Once you have normalized data, you can do analysis. TrueComps uses a mix of regression and comparable-selection heuristics to estimate fair market value and support the argument. But the analysis is only as good as the normalization, and the normalization is only as good as the adapters.

This is also why I care about coverage the way I do. I'm not trying to be "nationwide" on day one. I'm trying to be high-signal in the counties where the economics work and where a deadline creates real urgency.

Texas is the immediate forcing function here because the May 15 deadline is a hard seasonal spike. Deadlines create urgency, and urgency creates demand.

## What success looks like (and what I'm watching)

There are a few things I want to prove quickly:

First: will people pay $49 for this without a sales call? If the product requires persuasion, the economics get weird.

Second: is the report good enough that a meaningful percentage of people can submit it and get a reduction? "Good enough" isn't academic. It means the evidence packet matches how real appeals work.

Third: can the funnel be driven by county-specific SEO? The intent is extremely local and extremely seasonal, which is a rare and nice property if you can build content that matches it.

I don't have a grand philosophical point here. I'm trying to take a fragmented, deadline-driven government workflow and turn it into something that behaves like a modern consumer product.

If it works, it'll look obvious in hindsight.

If you want the broader context on why I'm doing this as a portfolio (and how I'm using AI + a standardized template to ship), I wrote that up here: [Building Five MVPs with AI](/articles/2026-02/building-five-mvps-with-ai).
