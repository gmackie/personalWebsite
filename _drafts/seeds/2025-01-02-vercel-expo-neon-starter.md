---
layout: post
title: "The Vercel + Expo + Neon Stack: A Modern Full-Stack Starter Kit"
date: 2025-01-02
excerpt: "Building a production-ready starter template for web and mobile apps with serverless backend"
categories: [technical]
tags: [vercel, expo, neon, nextjs, react-native, postgres, starter-kit, fullstack]
status: seed
---

## Hook Ideas
- "I got tired of rebuilding the same boilerplate. So I built it once, properly."
- "Web, mobile, and database — deployed in under 5 minutes"
- "The stack I wish existed when I started my last three projects"

## Outline

### Section 1: Why This Stack?
- The problem: starting new projects is repetitive
- Requirements I optimized for:
  - Web + mobile from one codebase (or close to it)
  - Serverless — no servers to manage
  - Postgres — real database, not just Firebase
  - Free tier friendly for prototypes
  - Scales when needed
- Why these specific tools beat the alternatives

### Section 2: The Architecture Overview
- **Vercel + Next.js**: Web frontend + API routes
- **Expo**: React Native for mobile
- **Neon**: Serverless Postgres
- How they connect (shared types, API layer)
- Diagram of the data flow

### Section 3: What's in the Starter Kit
- Project structure walkthrough
- Authentication setup (which provider, why)
- Database schema and migrations (Drizzle? Prisma?)
- Shared code between web and mobile
- Environment configuration
- CI/CD setup

### Section 4: Web App Deep Dive
- Next.js app router setup
- API route patterns
- Styling approach (Tailwind? something else?)
- Key pages and components included

### Section 5: Mobile App Deep Dive
- Expo configuration
- Navigation structure
- Sharing components with web (what works, what doesn't)
- Build and deployment process

### Section 6: Database Layer
- Why Neon over Supabase/PlanetScale/etc.
- Connection pooling for serverless
- Schema design in the starter
- Migration workflow

### Section 7: Getting Started Guide
- Clone, configure, deploy steps
- What to customize first
- Common modifications and extensions

## Conclusion Direction
- Projects I've built with this stack
- Limitations and when to reach for something else
- Link to the repo with encouragement to use/contribute

## Notes
- Topic type: technical project
- This should serve as both a blog post AND documentation
- Include actual code snippets for key patterns
- Make it immediately actionable — readers should be able to start using it
- Consider a companion video walkthrough
