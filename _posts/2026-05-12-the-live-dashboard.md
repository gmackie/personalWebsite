---
layout: post
title: "The Live Dashboard"
excerpt: "gmac.io now pulls live status from ForgeGraph's public feed. 24 apps, real dots, no hand-maintained YAML."
categories: [infrastructure]
tags: [forgegraph, dashboard, build-in-public, architecture]
site: [gmacko, gmac]
---

I built [gmac.io](https://gmac.io) in March as a status page for my infrastructure. Dark background, green dots for things that were up, grey dots for things that weren't. Mostly I used it to check if Gitea was responding without having to SSH into the box.

Today it tracks 24 apps and pulls live status from ForgeGraph instead of pinging URLs from the browser.

<!--more-->

## What changed

The old version pinged each app's URL from the browser with a `fetch()` call. If the request came back, green dot. If it timed out, grey dot. That told you almost nothing. A site can return 200 while its database is on fire.

ForgeGraph now publishes a [public feed](https://forgegraf.com/api/public/feed/manifest) that reports the actual status of every app it knows about: healthy, degraded, or down, plus the last deploy timestamp. The dashboard grabs this on page load and updates the dots.

The cards themselves still come from YAML files in the repo. I write the name, description, and stack tags by hand. The feed just overlays the live bits. If ForgeGraph goes down, the page still renders fine with the static data. I like that it degrades to something useful rather than a blank screen.

## Everything's on there

The dashboard has two sections. Services are the shared infrastructure: ForgeGraph, Gitea, SigNoz, Veritas, Bob. These run everything else. Below that are the prototypes and ventures: PlayTrek, AppealKey, LatchFlow, and about 19 more in various states of done.

I'm showing all of them, including the ones that are barely started. Most of the "coming soon" cards are just a name, a one-liner, and a grey dot. I could hide those and only show the polished ones, but that defeats the point. The dashboard subtitle literally says "nothing here is production." It's honest about where things are.

There's a selfish reason too. When I see a card sitting at "coming soon" for weeks, it bugs me. Either I start working on it or I delete the card. Having it public makes that itch worse.

## How the feed works

ForgeGraph serves a manifest at `/api/public/feed/manifest` that points to the current generation of app data. The dashboard JS fetches the manifest, follows the `apps_url` link, and gets back a JSON array of every app with its slug, status, deploy time, and metadata.

Each card in the HTML has a `data-feed-slug` attribute that maps to a ForgeGraph app slug. The JS matches them up and swaps the CSS class on the status dot. `healthy` becomes `dot-live` (green, pulsing). `degraded` becomes `dot-degraded` (amber). `unknown` leaves the YAML status alone.

```
YAML → what appears on the page (editorial)
Feed → whether the dot is green or red (live)
```

I kept the old health-ping JS as a fallback for services that aren't in the ForgeGraph feed yet, like Gitea and SigNoz.

## The three sites

This post shows up on both gmacko.com and gmac.io because it's tagged for both. The [three-site setup](/2026/03/28/three-sites-one-repo/) hasn't changed: one Jekyll repo, three configs, three Cloudflare Pages projects. gmacko.com is the portfolio and blog, grahammackie.com is personal, gmac.io is the dashboard.

ForgeGraph deploys apps to Hetzner nodes over Tailscale, tracks their health, and now publishes that data through the public feed. The dashboard is just a static page that reads from it.

## What I want to add

Screenshots. ForgeGraph should capture a screenshot of each app's landing page periodically and serve it through the feed. Right now the cards are text-only, which is fine but boring.

The other thing is dependency health. ForgeGraph already knows if an app's database or cache is down. I want to let you expand a card and see that breakdown instead of just a single dot color.

Neither of those is started yet, but the feed infrastructure is in place, so the hard part is done.
