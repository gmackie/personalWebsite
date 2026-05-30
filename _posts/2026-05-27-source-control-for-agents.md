---
layout: post
title: "Source Control for Agents"
excerpt: "Git is dying and nobody has built what replaces it. Theo said the quiet part loud, and I've been in a design psychosis about it for weeks."
categories: [tech]
tags: [forgegraph, ai, architecture, build-in-public]
site: gmacko
---

Theo posted a thread on May 26th that broke something in my brain. The thesis: git is dying, GitHub is not the right primitive for agents, commits are a bad abstraction, worktrees are an abomination, and source control shouldn't require a real OS and file system. 146K views. The replies were mostly "yes, exactly" or "you're insane." Both camps had a point.

I've been building ForgeGraph for six months as a delivery control plane. It started as a way to get off GitHub, partly because of the training-on-your-code thing and partly because I wanted to own the pipeline from code change through production. It runs my git server, my CI, my deployments across a fleet of Hetzner VPSs, all of it tracked in a single delivery graph.

Somewhere in the last few weeks, while following Theo's thinking and doing my own design work, ForgeGraph stopped being "my deployment tool" and started being something bigger.

<!--more-->

## The git problem

Theo's points are worth restating.

"Open source" doesn't mean "100% of our code is public 100% of the time." We've all worked on repos where we've put energy into preventing credential leaks, where security fixes sit unpublished because someone might exploit them before the patch rolls out, where a monorepo would be better but we split into multiple repos because we can't scope visibility within one. The unit of sharing in git is the entire repository. You're either all-in or all-out.

Commits are a bad primitive. Jujutsu figured this out. Your work is constantly staged. Snapshots are taken when you run any command. The idea that you have to stop and compose a commit message to make a state exist is a tax on your attention. You should be able to just edit the code and worry about how it's tracked later.

Worktrees are the worst of it. You want to work on two things at once, and git's answer is "here's a completely separate checkout of the repo that you have to manually keep in sync." AI agents need this constantly. Every agent running in parallel needs its own working copy. Right now the answer is to spin up worktrees or clone the repo again, and both are expensive and fragile.

Source control shouldn't need a file system. In a world where agents are writing code through API calls, requiring a full kernel and file system just to interact with source control is absurd. Reading and updating files should be doable with simple API calls.

I've been thinking about all of this for months, but Theo saying it publicly, with 146K people watching, made me realize the window is open.

## What I've been designing

ForgeGraph already has Jujutsu's changeset identity model baked in. Changes survive rebases and amendments because the identity is on the change, not the commit. That was the foundation.

The new design goes way further. I've been writing architecture decision records for weeks and the stack is getting tall. Short version:

**Snapshots, not commits.** History is a DAG of immutable snapshots. Every write auto-creates a snapshot. You never compose a commit message to make a state exist. Names and labels come later when you need them. Agents edit code in tight loops. The system should track every state, not force them to pause and package their work.

**AST, not bytes.** Code files are stored as AST trees with stable node IDs. Bytes are a projection produced by a deterministic pretty-printer on read. Formatting changes become config changes, not commits. You flip a project's quote style and every file re-renders. No diff, no PR, no merge conflict from someone else's semicolon preference. Two people with different formatters working on the same function can't conflict on formatting because formatting doesn't exist in storage.

**Symbols, not files.** The repository is a graph of typed symbols connected by relationships. Files don't exist at the storage layer. They're produced on demand by view projections. "All functions that call `fetch`" is a graph query, not a grep. "All public APIs in this module" is a graph query. Tests that exercise a symbol are a graph edge. The file system is just one way to look at the graph, materialized through a FUSE mount for backward compatibility with existing tools.

**Symbol-addressed writes.** Agents can write directly to `ts:src/foo.ts:MyClass.handleRequest.body` without knowing line numbers or byte offsets. The symbol path is stable across renames and refactors. This is what agents actually want. They don't think in line numbers. They think in "change this function."

## The npm-killer part

This is where I lost my mind a little.

I've had this thought rattling around for years about functions as a service. Not Lambda-the-AWS-product. The actual idea. Individual functions that you can share and reuse across projects without the ceremony of publishing a package.

The npm ecosystem is a monument to this unmet need. Left-pad happened because there was no native way to share a one-line function across projects without publishing it to a global registry. So people published one-line functions to a global registry. And then one of them got unpublished and half the internet broke.

ForgeGraph's design solves this at the source control layer. The workspace is a symbol container that sits above repositories. You write a utility function once at workspace scope, and every repo in the workspace can reference it. No publish step. No `package.json` change. No `node_modules`.

It goes further than workspace scope. External packages enter the symbol graph through an AST registry. When an agent needs `slugify` from npm, the registry extracts just that symbol's AST and its transitive deps within the package. Not the whole package. Just what's actually used. The repo materializes them into its own graph with full provenance. No `node_modules`. No phantom dependencies. No unused code sitting in your project that could harbor a supply chain attack.

Repos are born tree-shaken and self-contained. The audit surface is exactly the code you use and nothing else.

That's what I mean by functions as a service for source control. An agent composes an application from symbols. Some written locally, some pulled from the workspace pool, some materialized from npm. The source control system tracks all of it with provenance and graph relationships. The file system is a projection. The package manager dissolves into the VCS. Dependencies are symbols, not packages.

## Why now

AI agents are already rewriting how source control works. Right now they're bolted onto git through worktrees and branch-per-agent workflows and it's painful. The tools are fighting them.

What I've been designing is agent-first but human-compatible. The FUSE mount means VS Code still works. The git mirror means you can still `git clone` a read-only copy. The native interface is symbol-addressed, API-driven, built for the tight edit-search-edit loops that agents actually run.

I don't know if this is what turns ForgeGraph from "my deployment tool" into a product other people use. It's the most excited I've been about a technical direction since I left Amazon. The design space is wide open and I haven't seen anyone else building here.

Theo's right that git is dying. I think the replacement looks like a symbol graph with AST storage, workspace-scoped sharing, and materialized dependencies. I've got 82 architecture decision records and counting. Now I have to build it.
