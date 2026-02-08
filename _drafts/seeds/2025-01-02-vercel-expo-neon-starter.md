---
layout: post
title: "The Vercel + Expo + Neon Stack: A Modern Full-Stack Starter Kit"
date: 2026-02-07
excerpt: "Building a production-ready starter template for web and mobile apps with serverless backend"
categories: [technical]
tags: [vercel, expo, neon, nextjs, react-native, postgres, starter-kit, fullstack]
status: draft
comments: true
---

Every project I started last year began with the same three days of work. Set up the monorepo. Wire up auth. Connect the database. Configure the ORM. Set up tRPC. Get Expo and Next.js to share types without fighting. Write the same user-settings-profile CRUD for the hundredth time. By the time I got to the actual product logic, I'd already burned my motivation on plumbing.

<!--more-->

So I built a starter kit. Not a tutorial project, not a template with TODO comments everywhere -- an actual working foundation that I deploy from and build on top of. This is the "modified create-t3-turbo" I mentioned in the [five MVPs post](/articles/2026-02/building-five-mvps-with-ai). Every one of those products starts from this repo. Here's what's in it and why.

## Why this specific combination

The requirements I optimized for: web and mobile from a shared codebase. Serverless so I'm not managing infrastructure for early-stage products. Postgres, because I want a real relational database, not a document store I'll outgrow. Free-tier friendly so prototyping costs nothing. And it needs to scale when something actually gets traction, without a rewrite.

**Next.js on Vercel** handles the web frontend and API layer. The app router is stable now, server components work well for data-heavy pages, and Vercel's deployment story is genuinely zero-config for Next.js projects. Push to main, it deploys. Preview deployments on PRs. Edge functions if I need them later. I've used Vercel in production and the reliability has been solid.

**Expo** for mobile. React Native has rough edges, but Expo has sanded down most of them. EAS Build means I don't need a Mac to build iOS (though I have one). Over-the-air updates mean I can ship bug fixes without going through App Store review. The decision to use Expo over raw React Native CLI wasn't close -- the developer experience gap is enormous.

**Neon** for the database. This is the choice that surprises people, so let me explain. Neon is serverless Postgres. Real Postgres, not a Postgres-compatible API over something else. The killer feature is branching -- I can create a database branch for a PR, test against it, and delete it when the PR merges. It also scales to zero on the free tier, which means my prototype databases cost nothing until they have real traffic.

Why not Supabase? Supabase is great, but it's opinionated in ways that don't match how I build. Supabase wants to be your backend -- auth, storage, realtime, edge functions, all through their client libraries. I wanted a database. Just a really good serverless Postgres with connection pooling that works with serverless functions. Neon is that and nothing more, and "nothing more" is exactly what I wanted. I handle auth separately, I handle storage separately, and I keep the database as a database.

Why not PlanetScale? They dropped their free tier and then got acquired. Even before that, MySQL (PlanetScale's engine) doesn't have the extension ecosystem that Postgres does. Postgres with pg_trgm for fuzzy search, PostGIS for geo queries if I need them, and jsonb for semi-structured data -- that flexibility matters once products start diverging.

## The architecture

The monorepo is Turborepo. Inside it:

```
apps/
  web/          # Next.js app
  mobile/       # Expo app
packages/
  api/          # tRPC router definitions
  db/           # Drizzle schema + migrations
  auth/         # Shared auth logic
  ui/           # Shared UI components (where possible)
  validators/   # Zod schemas shared between client and server
```

**tRPC** is the glue. It gives me end-to-end type safety from the database query to the UI component, with zero code generation. I define a router procedure, and both the Next.js frontend and the Expo app get fully typed clients. When I change an API response shape, TypeScript immediately tells me everywhere that breaks. No OpenAPI spec to maintain, no GraphQL schema to write. For a solo developer or small team building fast, the productivity gain is massive.

The tRPC router lives in `packages/api` and is consumed two ways: the Next.js app uses it via server-side callers (no HTTP overhead for server components) and via the HTTP handler for client components. The Expo app hits the same HTTP endpoint. Same router, same types, same validation -- two platforms.

**Drizzle ORM** over Prisma. This was a recent switch. Prisma's query engine is a Rust binary that doesn't play well with serverless cold starts -- the engine needs to initialize, and on Vercel's serverless functions, that added 200-500ms to cold starts. Drizzle generates SQL directly with no engine binary. Cold starts dropped noticeably. Drizzle also lets me write raw SQL when the ORM abstraction gets in the way, which happens more often than ORM advocates admit.

The schema is defined in TypeScript with Drizzle's schema builder. Migrations are SQL files generated by `drizzle-kit`. I keep the migration flow simple: generate, review the SQL, apply. No auto-migration in production.

## Auth

Auth is Clerk. I tried building auth from scratch for about two projects before accepting that auth is not a competitive advantage for any product I'm building. Clerk gives me social login, email/password, multi-factor, session management, and a hosted UI I can customize. The Next.js middleware protects routes. The Expo app uses Clerk's React Native SDK. Both share the same user pool.

The auth package in the monorepo wraps Clerk's APIs with helpers that my app code uses. If I ever want to swap Clerk for something else (Lucia, Auth.js, custom), I change the package internals and the rest of the codebase doesn't know.

## What's wired in by default

Beyond the core stack, every project that starts from this template gets:

- **Sentry** for error tracking on both web and mobile. Initialized in the Next.js instrumentation hook and the Expo app entry point. Source maps upload automatically on build.
- **PostHog** for product analytics. Event tracking, feature flags, session replay on web. The feature flags are useful even in early development -- I use them to gate half-finished features on production while I iterate.
- **Resend** for transactional email. Welcome emails, password resets, notifications. Resend's API is simple, their free tier is generous, and the React Email integration means I write email templates in JSX.
- **Uploadthing** for file uploads when needed. It handles the S3 plumbing so I don't have to configure buckets and signed URLs for every project.

Each of these is configured but wrapped behind a thin adapter. The product code calls `analytics.track("event")` or `email.send("template", data)`, not the vendor's SDK directly. Swapping vendors means changing one file, not grep-replacing across the codebase.

## The web app

Next.js app router with server components as the default. Pages that need interactivity use client components. The layout follows a pattern I've settled on: authenticated layouts wrap a sidebar and top nav, public pages get a marketing-style layout.

Styling is Tailwind. I've gone back and forth on CSS approaches over the years, and Tailwind won by attrition. It's fast to write, easy to maintain, and the design system constraints (spacing scale, color palette, typography) prevent the visual inconsistency that creeps in when you're moving fast.

Shadcn/ui for components. Not a component library -- a collection of accessible, unstyled-by-default components I copy into my project and own. When I need a dialog, a dropdown, or a data table, I add the component from shadcn, style it with Tailwind, and move on. No dependency to update, no breaking changes from upstream.

## The mobile app

Expo with file-based routing (Expo Router). The navigation structure mirrors the web app where it makes sense, but mobile gets its own navigation patterns -- tab bars instead of sidebars, stack navigation instead of page URLs.

Sharing components between web and mobile is possible in theory and painful in practice. I share business logic, types, validation schemas, and API calls. I do not try to share UI components. The platforms are too different. A form that works well on a 27-inch monitor is not the same form that works well on a phone. I accepted this early and it saved me a lot of frustration.

The build pipeline uses EAS Build for both iOS and Android. The CI workflow builds on PR merge to main, uploads to TestFlight and Google Play internal testing. Over-the-air updates via EAS Update handle the patches between store releases.

## Database patterns

Neon's connection pooling is critical for serverless. Each Vercel function invocation opens a connection, and without pooling, you'd exhaust the database connection limit in minutes under any real traffic. Neon provides a pooled connection string by default -- I use that for the serverless functions and a direct connection string for migrations and local development.

The starter includes a base schema: users, sessions, and a simple tenant/organization model. Every project needs multi-tenancy eventually, and retrofitting it is painful. The base schema also includes soft deletes, created/updated timestamps, and audit fields. Boring, but every single project I've built needed these, and I got tired of adding them in week two.

## Getting started

Clone the repo, copy `.env.example` to `.env.local`, fill in the API keys (Clerk, Neon, Sentry, PostHog, Resend), run `pnpm install && pnpm dev`. The web app starts on localhost:3000, the Expo app starts in the iOS simulator or Android emulator.

First deploy: push to a GitHub repo, connect it to Vercel, set the environment variables, and it's live. Database migrations run as part of the build step. The whole process takes about fifteen minutes if you already have accounts with the vendors.

## What this doesn't solve

This is a starter kit for products, not a framework. It makes opinions about the stack so you don't have to. If you disagree with those opinions -- you want GraphQL instead of tRPC, MongoDB instead of Postgres, Flutter instead of React Native -- this isn't for you, and that's fine.

It also doesn't include anything domain-specific. No payment integration, no admin panel, no CMS. Those are product decisions, not platform decisions. The starter gives you the foundation; you build the product.

The biggest limitation is that it's optimized for my workflow. I'm a solo developer building MVPs fast. If you're a team of ten with a dedicated platform engineer, you probably want different tradeoffs -- more abstraction layers, more testing infrastructure, maybe a different deployment target. But if you're one or two people trying to get something real into users' hands without spending the first week on boilerplate, this is the starting line.
