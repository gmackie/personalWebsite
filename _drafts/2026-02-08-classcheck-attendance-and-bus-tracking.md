---
layout: post
title: "ClassCheck: Attendance and Bus Tracking as One System"
date: 2026-02-08
excerpt: "K-12 attendance software is a mess of fragmented tools that don't talk to each other. ClassCheck combines attendance, bus tracking, and LMS/SIS integration into one system for $2/student/year."
categories: [startups]
tags: [startups, classcheck, k12, edtech, attendance, mqtt, lti, sis]
comments: true
status: draft
---

If you want to understand how weird K-12 software is, look at attendance.

On paper it's the simplest domain imaginable. A student is present or absent. You could build the core feature in an afternoon.

In reality, attendance is "simple" the way "sending an email" is simple inside a company with SSO, compliance rules, audit trails, and a bunch of legacy systems that were never designed to work together. The core concept is trivial. Everything around it is not.

<!--more-->

## The patchwork problem

Most districts run on a patchwork of tools that all claim to be "the system of record" for something. Attendance lives in one app. Transportation visibility lives somewhere else -- if it exists at all. Grades and rosters live in the SIS. Assignments live in the LMS. Parent communication is spread across email threads, robocalls, and whatever portal the district happened to buy five years ago.

Teachers pay for that fragmentation with time. Parents pay with uncertainty. District IT pays with brittle integrations and yearly renewal negotiations that never get easier.

And the timing is brutal. Chronic absenteeism has gotten worse since the pandemic. States are demanding more reporting. At the same time, districts are hitting the ESSER funding cliff, which turns "we can tolerate three vendors" into "we need one vendor or none." The consolidation pressure is real and it's happening now.

## Why price matters more than features

In education, pricing isn't revenue strategy. It's procurement strategy.

ClassCheck is targeting $2/student/year at the school level, $1.50/student/year at the district level. That sounds low until you compare it to incumbents and think about the consolidation story: replace multiple tools, reduce manual work, and land in a price band that makes adoption possible without a year-long RFP process. If you price above the threshold where a principal can swipe a card, you've turned a product decision into a committee decision. I'd rather be cheap and fast than expensive and "enterprise."

## The wedge: attendance + bus tracking + integration

ClassCheck is built around three things that force the product to be honest.

Teachers need attendance to be fast and low-friction. Parents want to know where the bus is and whether their kid actually got on it. District IT needs everything to integrate with the systems they already have, because ripping out a SIS or forcing a new identity system is not a realistic sales pitch.

If you nail those three, you earn the right to expand. If you can't, it doesn't matter how many features you ship. So the one-sentence version: unify attendance workflows, real-time transportation visibility, and SIS/LMS integrations into one system that is secure and auditable by default.

## The tech is intentionally boring (except for the bus)

K-12 isn't forgiving. It's multi-tenant. It includes minors. It has strict privacy requirements -- FERPA, COPPA. It needs role-based access control that isn't "admin/user" but something closer to a real org chart. And it needs to be legible during audits.

The architecture is boring on purpose: Go backend with Echo, an OpenAPI spec for clean client generation, React/Vite on the frontend. Boring choices that behave predictably under load and can be explained to a district compliance officer without hand-waving.

The one un-boring piece is bus tracking. For real-time location streaming, I'm using MQTT -- it's built for high-frequency telemetry and it's a natural fit for the "where is my kid's bus right now" use case. The interesting challenge isn't the protocol. It's tying the GPS data back into the attendance system so that "got on the bus" and "arrived at school" become part of the same data model instead of living in separate apps.

## What success looks like

Success in the next phase isn't "sign a massive district." It's the unglamorous work that proves the wedge is real.

Complete a clean Canvas LTI 1.3 integration. Get a few pilot agreements in Washington state. Prove the bus tracking workflow is reliable enough to earn parent trust. Get listed where districts actually buy.

If those happen, ClassCheck becomes a wedge product in a category that desperately wants consolidation but is allergic to risk. The consolidation pressure does the selling -- I just have to be the product that's cheap enough, integrated enough, and trustworthy enough to be the obvious choice.

This is one of five MVPs I'm building in parallel. If you want the bigger picture on why and how, here's the meta post: [Building Five MVPs with AI](/articles/2026-02/building-five-mvps-with-ai).
