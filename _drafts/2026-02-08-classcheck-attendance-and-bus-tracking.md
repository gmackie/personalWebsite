---
layout: post
title: "ClassCheck: Attendance and Bus Tracking as One System"
date: 2026-02-08
excerpt: "K-12 schools are dealing with chronic absenteeism and fragmented tooling. ClassCheck is my attempt to unify attendance, transportation visibility, and LMS/SIS integration."
categories: [startups]
tags: [classcheck, k12, edtech, attendance, mqtt, lti, sis]
comments: true
status: draft
---

If you want to understand how weird K-12 software is, look at attendance.

On paper it's the simplest domain imaginable. A student is present or absent. You could build the core of the feature in an afternoon.

In reality, attendance is "simple" in the same way that "sending an email" is simple inside a company with SSO, compliance rules, audit trails, multiple stakeholders, and a bunch of legacy systems that were never designed to work together.

The core concept is trivial. Everything around it is not.

<!--more-->

ClassCheck is the product I'm building for that reality.

## The problem isn't one system. It's the patchwork.

Most districts run on a patchwork of tools that all claim to be "the system of record" for something. Attendance lives in one application. Transportation visibility lives somewhere else (if it exists at all). Grades and rosters live in the SIS. Assignments live in the LMS. Parent communication is spread across email threads, robocalls, and whatever portal the district happened to buy five years ago.

Teachers pay for that fragmentation with time. Parents pay for it with uncertainty. District IT pays for it with brittle integrations and yearly renewal negotiations that never get easier.

There's also pressure that's hard to ignore right now: chronic absenteeism has gotten worse, and states are demanding more reporting. At the same time, districts are hitting the ESSER funding cliff, which turns "we can tolerate three vendors" into "we need one vendor or none." Consolidation pressure is real.

## The wedge: attendance + bus tracking + integration

ClassCheck is built around a wedge I keep coming back to because it forces the product to be honest.

Teachers need attendance to be fast and low-friction. Parents want to know where the bus is (and whether their kid actually got on it). District IT needs everything to integrate with the systems they already have, because ripping out a SIS or forcing a new identity system is not a realistic sales pitch.

If you can nail those three, you earn the right to expand. If you can't, it doesn't matter how many features you ship.

So the “one sentence” version of ClassCheck is: unify attendance workflows, real-time transportation visibility, and SIS/LMS integrations into one system that is secure and auditable by default.

## Why the tech choices matter here

K-12 isn't forgiving.

It's multi-tenant. It includes minors. It has strict privacy requirements (FERPA, COPPA). It needs role-based access control that is not "admin/user" but something closer to a real organization chart. And it needs to be legible during audits.

The parts that make this hard are not the database tables. The hard parts are real-time data, identity boundaries (parents, students, teachers, admins), and the integration surfaces where legacy systems leak complexity into your product.

That's why the architecture direction is intentionally boring in the right places: a Go backend (Echo), an OpenAPI spec for clean client generation, and a React/Vite frontend. For bus location streaming, MQTT is a pragmatic choice because it's built for high-frequency telemetry.

The goal is a system that behaves predictably under load and can be explained to a district compliance officer without hand-waving.

## Pricing is procurement strategy

In education, pricing isn't just revenue. It's procurement strategy.

The model I'm aiming for is something like $2/student/year at the school level and $1.50/student/year at the district level. That sounds low until you compare it to incumbents and consider the consolidation story: replace multiple tools, reduce manual work, and land in a price band that makes adoption possible without turning into a year-long RFP process.

## What success looks like

Success in the next phase is not "sign a massive district." It's the unglamorous work that proves the wedge is real.

It looks like: complete a clean Canvas LTI 1.3 integration, get a few pilot agreements in Washington state, prove the bus tracking workflow is reliable enough to earn parent trust, and get listed where districts buy.

If those happen, ClassCheck becomes a wedge product in a category that desperately wants consolidation but is allergic to risk.
