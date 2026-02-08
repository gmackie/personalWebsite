---
layout: post
title: "The Startup Ouroboros: When Startups Only Sell to Each Other"
date: 2026-02-07
excerpt: "A look at the VC-funded ecosystem where startups are each other's best customers"
categories: [thoughts]
tags: [startups, venture-capital, tech-industry, business, economics]
comments: true
status: draft
---

The developer tools startup sells to the fintech startup. The fintech startup buys HR software from the people ops startup. The people ops startup pays for infrastructure from the cloud dev tools startup. Somewhere in this loop, everyone is posting 3x YoY revenue growth on LinkedIn and nobody is asking where the money originally came from.

I've been watching this pattern for years, and I still can't decide if it's the natural result of specialization or a financial terrarium that only works when the water keeps getting added from outside.

<!--more-->

## The loop

Here's the version that sounds normal: startups have unique needs, they move fast, and they prefer buying tools from companies that understand their problems. A 50-person fintech doesn't want to negotiate a two-year Oracle contract. They want to swipe a credit card and get something that works by Thursday. Other startups build those tools because they understand the buyer. Everyone's happy.

Here's the version that sounds less normal: a significant chunk of the B2B SaaS ecosystem is venture capital entering through one company's bank account, becoming salary, becoming SaaS spend at another venture-backed company, becoming that company's revenue, becoming their story for raising more venture capital. The snake eats its tail.

I noticed this concretely a few years ago when I mapped out the vendor stack at a startup I was working at. Our tooling bill -- observability, CI/CD, feature flags, error tracking, customer data platform, analytics, internal comms, HR platform, expense management -- was almost entirely other venture-backed startups. And our customers? Mostly other startups too. We were a node in a graph where nearly every edge connected to another node funded by the same handful of firms.

That's not a scandal. But it is a structure worth understanding.

## Where the money actually comes from

Follow the dollars. A VC fund writes a $10M check into Company A. Company A hires engineers. Those engineers need tools. Company A spends $400K/year on SaaS from Companies B, C, and D -- all venture-backed. Those companies report the revenue, raise more capital, hire more people, buy more tools. The loop tightens.

Loops are fine as long as value exits somewhere. The Fortune 500 company paying for Datadog. The consumer paying for Spotify. The small business paying for Shopify. That's where the loop connects to the real economy. The question is how many companies in the ecosystem have that connection, and how many are just passing VC money in a circle with a margin skimmed off each hop.

## 2022-2023 gave us the answer

When interest rates went up and VC funding tightened, we got to run the experiment. And it was clarifying.

The companies with real customers outside the bubble -- enterprises, consumers, small businesses with actual revenue -- tightened their belts but survived. The companies whose customer base was almost entirely other startups watched their churn spike in lockstep. One startup cutting costs meant ten others losing a customer.

I watched three tools I used at work get acquired or shut down within the same six-month window. All three had the same profile: beloved by developers, strong NPS, growing fast in the startup segment, almost no enterprise presence. When their customers started dying, they started dying.

The startups that weathered it were the ones doing the unfashionable work: enterprise sales, government contracts, SMB customers who'd never heard of Y Combinator. Boring distribution into boring markets. Turns out boring is another word for durable.

## The counterargument -- and it's real

I don't want to be glib about this because the counterargument is strong. Specialization is genuinely valuable. The reason startups buy from startups isn't just cultural affinity -- it's that a small team building a focused tool for a specific workflow will often build something better than a giant company bolting on a feature. Stripe is better at payments than anything a bank built in-house. That's real.

And the loop does eventually produce companies that break out. Plenty of today's enterprise staples started as tools that only startups used. Slack started in gaming. AWS started as internal infrastructure. The startup-to-startup phase can be a legitimate stage in a company's growth, not its permanent ceiling.

The question isn't whether the loop exists -- it does. The question is whether a given company has a credible path from "startups buy this" to "everyone buys this," or whether the startup market is the only market it'll ever have.

## The test I apply to myself

I'm building products right now, and this framing haunts me in a productive way. For each one, I ask: if every VC-funded company in my target market disappeared overnight, would there still be a customer?

For TrueComps -- property tax appeals for homeowners -- the answer is obviously yes. Homeowners exist regardless of funding cycles. For a developer tools product, the answer gets murky fast. "Developers at funded startups with generous tooling budgets" is a very different population than "developers," and the first group is far more volatile.

The loop has broken before. It will break again. Know whether your model survives the contraction.

## The ouroboros isn't evil. It's fragile.

There's nothing morally wrong with startups selling to startups. Specialization is good. The ecosystem produces real innovation and real value.

But it also produces a specific kind of blindness. When all your customers look like you, think like you, and are funded like you, it's easy to mistake the ecosystem for the economy. Your metrics look great. Your churn is low. And then interest rates move two points and you discover that your entire market was a weather pattern, not geography.

The question I keep coming back to is simple, and I think anyone building a company should sit with it honestly: if all VCs stopped funding tomorrow, would my customers still exist?

If the answer is yes, you're building on something real. If the answer is "it's complicated" -- well, at least you know what kind of snake you're riding.
