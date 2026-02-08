---
layout: post
title: "Single Pane of Glass: Building a DevOps Dashboard"
date: 2026-02-07
excerpt: "When you're running 5+ products on your own infrastructure, you need one place to see everything. So I built one."
categories: [technical]
tags: [devops, dashboard, kubernetes, monitoring, gitea, harbor]
status: seed
---

## Hook Ideas
- "I counted my browser tabs one morning. Fifteen. Gitea, Grafana, ArgoCD, Harbor, Sentry, PostHog, K9s terminal, three different log views. I closed them all and started building a dashboard."
- "Every DevOps tool has a beautiful UI. The problem is you need twelve of them open simultaneously."
- "The 'single pane of glass' is the white whale of infrastructure. Everyone wants it, nobody ships it, so I built my own."

## Outline

### Section 1: The Problem — Dashboard Fatigue
- Running multiple products on self-hosted infrastructure means juggling a dozen tools
- Each tool is great at its job but none of them know about each other
- The morning routine: open Gitea, check CI runs, switch to ArgoCD, check deploys, switch to Grafana, check metrics, switch to Sentry, check errors...
- The cognitive overhead isn't any single tool — it's the context switching between all of them
- When something breaks at 2am, the last thing you want is a scavenger hunt across dashboards

### Section 2: What It Integrates
- **Gitea**: repos, PRs, CI status across all projects
- **K3s/Kubernetes**: pod health, deployments, resource usage
- **Harbor**: container registry, image vulnerabilities, storage
- **ArgoCD**: deployment status, sync state, rollback history
- **Grafana/Prometheus**: metrics, alerts, dashboards (embedded, not duplicated)
- **Sentry**: error tracking, crash rates, unresolved issues per project
- **PostHog**: product analytics, feature flags, session counts
- The goal isn't to replace any of these — it's to surface the 20% of info you check 80% of the time

### Section 3: The Architecture — Aggregation Layer
- How you pull data from a dozen different APIs without building a monster
- Lightweight polling + webhook listeners for each integration
- Normalized data model: everything becomes "service," "status," "event"
- The decision to keep it read-only (with deep links back to source tools)
- Why server-side aggregation beats client-side mashups
- Caching strategy — stale data is worse than no data

### Section 4: What the Dashboard Actually Shows
- The "at a glance" view: all services, all green/yellow/red, one screen
- Per-project drill-down: from "TrueComps is yellow" to "TrueComps has a failing health check on pod 2"
- Activity feed: unified timeline of deploys, commits, alerts, errors across everything
- The "deploy confidence" indicator — can I ship right now or is something on fire?
- Incident correlation: when an error spike, a deploy, and a resource spike happen at the same time

### Section 5: Why Internal Tools Deserve Good Design
- The temptation to make internal tools ugly because "only I use it"
- Internal tools set the pace of your entire workflow — bad UX here slows everything down
- Design choices: dark mode (obviously), information density, keyboard shortcuts
- The irony of building beautiful products while operating them through ugly dashboards
- This is the ops backbone for the [five-product sprint](/articles/2026-02/building-five-mvps-with-ai) — it has to be good or it becomes a bottleneck

### Section 6: What I'd Do Differently
- Over-engineering temptations: the urge to rebuild Grafana inside your dashboard
- Keeping scope honest — aggregation and routing, not reimplementation
- The maintenance cost of N integrations when APIs change
- Whether this should be a product or if it's inherently a "scratch your own itch" tool

## Conclusion Direction
- The single pane of glass isn't about replacing tools — it's about reducing the tax on your attention
- When you run your own infrastructure, the meta-work of monitoring the monitors can eat you alive
- ControlPanel is the tool that makes the five-product sprint operationally possible

## Notes
- Topic type: technical build + philosophy of internal tools
- Show the architecture at a high level but keep it accessible — not a Kubernetes tutorial
- The casual tone should come through in the "I was drowning in tabs" framing
- Be honest about what's built vs what's aspirational
- The "internal tools deserve good design" angle is the heart of the piece — that's what makes it interesting beyond "I built a dashboard"
