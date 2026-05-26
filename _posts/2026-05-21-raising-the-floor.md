---
layout: post
title: "Raising the Floor"
excerpt: "The best developers don't need LLMs to write clean code. The researchers who've been copy-pasting Python snippets for a decade absolutely do."
categories: [life]
tags: [ai, software-engineering]
site: gmacko
---

I've spent enough time working with research scientists to know what their code looks like. It's not pretty. These are people with PhDs in biology or economics or public health who learned Python the way you learn to use a chainsaw when a tree falls on your driveway: urgently, from YouTube, with no regard for long-term technique.

They have never heard of Bob Martin. They don't know what Clean Code is. The Pragmatic Programmer is not on their shelf. They didn't take software engineering courses because they were taking courses in their actual field, the one they've spent their career advancing. Code was always a means to an end.

<!--more-->

## The amalgamation

The worst of it comes from social science researchers who barely consider themselves programmers at all. Over a decade of grad school and postdoc work, they've assembled Python scripts from snippets shared by labmates, copied from Stack Overflow, adapted from tutorial notebooks that were themselves adapted from other tutorial notebooks. The result is a working pipeline held together by variable names like `df2_final_v3_USE_THIS` and comments that say `# don't touch this part` with no explanation of what it does or why touching it would be bad.

I'm not exaggerating. I've seen production research code where every variable is a single letter. Not because the author was writing tight mathematical notation — because they ran out of ideas after `x`, `y`, and `z` and started on `a`, `b`, `c`. I've seen functions that are four hundred lines long because nobody told them functions could call other functions. I've seen the same data loaded from disk six times in one script because copying the load block was easier than passing a variable between sections.

This code works. It produces papers that get published in real journals. The results are valid. But the code itself is a liability. Nobody else can run it. Nobody else can understand it. When the original author leaves the lab, the pipeline goes with them.

This isn't anecdotal. In 2022, researchers at Harvard analyzed over nine thousand R scripts from published replication datasets. Seventy-four percent of them failed to execute at all. Not produced wrong results — wouldn't run. Even after automated cleanup, more than half still failed. The code behind published, peer-reviewed science literally does not work if anyone else tries to run it.

And when the code does run but contains errors, the consequences are real. In 2006, a crystallographer named Geoffrey Chang had to retract five papers from *Science* and other journals because his homemade analysis script flipped two columns of data, inverting the electron-density map of the proteins he'd been studying. Hundreds of other scientists had built on his flawed results. The bug was trivial — the kind of thing a code review would have caught in minutes. Nobody reviewed the code because nobody in his field reviewed code.

Then there's the Excel gene name disaster. Around twenty percent of published genomics papers contain errors where gene names like SEPT2 and MARCH1 were silently auto-converted to dates by Excel. A follow-up study in 2021 found the rate had gotten worse, up to thirty-one percent. The problem was so intractable that the Human Gene Name Consortium gave up and renamed the genes. MARCH1 is now MARCHF1. They changed human genetics nomenclature because researchers couldn't be trusted to turn off auto-formatting in a spreadsheet.

Reproducibility isn't a technical problem in these cases. It's a code quality problem, and the people writing the code don't have the training to know it's a problem. Greg Wilson, who co-founded Software Carpentry to teach researchers basic programming skills, put it well: "It isn't software engineering — most people aren't designing a hydroelectric dam, but should know how to do a few home repairs."

## The interpreter

Here's what changed. An LLM can read that four-hundred-line function with single-letter variables and tell you what it does. Not approximately — precisely. It can trace the logic, identify the transformations, name the intermediate steps, and explain the whole thing in plain English. Then it can rewrite it into something a new grad student could pick up in an afternoon.

That sounds incremental. It isn't. Before LLMs, the only way to untangle legacy research code was to find a developer who understood both the codebase and the domain, sit them down for weeks, and have them reverse-engineer the intent from the implementation. Most labs couldn't afford that. Most labs didn't even know they needed it. The code worked, so it was fine, until someone needed to modify it or reproduce it or extend it, at which point they discovered that working and maintainable are very different things.

Now a researcher can paste their script into a conversation and say "what does this do and how should it be structured?" and get back something that follows conventions they didn't know existed. Descriptive variable names. Functions that do one thing. Docstrings where they matter. Error handling that isn't just a bare `except: pass`. The LLM isn't doing anything a senior developer couldn't do. It's doing something the researcher would never think to ask a senior developer to do, because they didn't know the code was bad.

## Greenfield protection

The rewriting matters. But I think the bigger impact is on new code.

When a researcher starts a new project and builds it with an LLM, the code comes out following conventions by default. Not because the researcher learned the conventions. Because the model was trained on millions of repositories that follow them. The researcher asks for a data processing pipeline and gets back code with meaningful names, modular functions, type hints, and sensible structure. They didn't request any of that. It just showed up.

This is the part that's hard to see if you've been writing software professionally for years. For experienced developers, conventions are obvious. Of course you name your variables descriptively. Of course you break long functions into smaller ones. Of course you don't reuse the same variable name for three different things in the same scope. These aren't advanced concepts. They're basic hygiene.

But basic hygiene requires knowing the hygiene exists. A researcher who's been writing Python for ten years without ever encountering a style guide doesn't know that `temp` is a bad variable name. They don't know because nobody told them, and nobody told them because they don't work with developers. They work with other researchers who also name things `temp`.

LLMs bypass the entire education problem. The code just comes out right. The researcher doesn't need to learn what PEP 8 is. They don't need to read a book about refactoring. The guardrails are built into the tool.

## Wrapping the worst instincts

This extends beyond academia. Every team has developers who take shortcuts that make the codebase worse. Variable name reuse because it's one less line to type. Vague names because the developer knows what `process_data` means right now and doesn't think about what it'll mean to someone else in six months. Copy-pasted blocks instead of extracted functions because extraction felt like over-engineering at the time.

These aren't signs of incompetence. They're signs of laziness in the specific, human sense — the path of least resistance in the moment, with costs deferred to the future. Every developer does this sometimes. Some developers do it constantly.

LLMs act like a wrapper around these instincts. When a developer who would normally name something `tmp2` asks an LLM to write the same logic, the output has a real name. When someone who would normally inline everything gets code generated, it comes out modular. The LLM doesn't get lazy. It doesn't take shortcuts. It doesn't think "this is a one-off script so who cares."

The floor rises. The best developers aren't affected much — their code was already clean. But the gap between the best and worst code on a team gets smaller, and that gap is where most maintenance cost lives.

## Standards at the speed of thought

There's a secondary effect that I think will matter more over time. Team coding standards have always been aspirational documents. You write a style guide, you configure a linter, you do code reviews, and the codebase still drifts because enforcement is expensive and inconsistent. A linter catches formatting. It doesn't catch "this abstraction doesn't make sense" or "this function does three things and should do one."

On one of my previous teams, we maintained a wiki page that tried to bridge this gap. It wasn't a style guide — the linter handled that. It was a collection of conventions that were too nuanced for automated enforcement. How exceptions should be thrown and caught. How retries should be structured. How logging should work across service boundaries. Each section was a paragraph or two explaining not just the pattern but the reasoning behind it. Why we wrapped retries this way. Why we caught at this layer and not that one. Why our error types looked the way they did.

It was one of the best engineering documents I've ever worked with, and it was still only as good as the last person who remembered to consult it. New engineers would read it during onboarding, forget half of it by their second week, and rediscover it months later during code review when someone pointed out they'd done something the wiki explicitly covered. The knowledge existed. The enforcement didn't.

LLMs close that gap. You can take that same wiki — the one that describes exception patterns, retry semantics, error propagation, naming for domain concepts — and encode it as context for the model. Not as a linter rule that flags violations after the fact. As instructions that shape the code at generation time. The developer doesn't have to remember the convention. The convention is built into the tool they're already using.

This is already happening across the industry. Teams are putting convention files in their repositories — `CLAUDE.md`, `.cursorrules`, `copilot-instructions.md` — that describe the standards a linter can't express. Architectural decision records capture the why. Convention files capture the what. And the LLM makes both actionable at the moment code is written, not days later in a code review.

The cost of maintaining standards drops from "constant human vigilance" to "write it down once and the tool handles it." Refactoring to match updated standards isn't a quarter-long initiative anymore. It's an afternoon.

## The surplus

I keep coming back to a pattern I've noticed throughout my life. Every time I find a shortcut, I don't use it to reduce my effort. I use it to redirect the effort somewhere new.

When I found faster ways to handle operational work at Amazon, I didn't coast. I used the freed-up time to push into problems that were previously out of reach. When tools automated parts of my workflow, I didn't slow down. I moved the frontier.

LLMs are the same pattern at a different scale. The people who will win with these tools aren't the ones who use them to do less. They're the ones who keep putting in the same effort and use the surplus to go further. Write the same amount of code but make it do more. Spend the same hours but solve harder problems. The shortcut isn't the destination. It's the launchpad.

## Unlocking the builders

The part I find most exciting isn't about professional developers at all. It's about the people who have always thought in systems and products but couldn't build them because programming was the bottleneck.

I've met founders who can describe exactly what their product should do, how users should interact with it, what the data model should look like — and they can't build it because the translation from idea to working software requires skills they don't have and can't acquire quickly enough. They're not lacking in creativity or judgment. They're lacking in a specific technical skill that used to be the only way to make software exist.

That barrier is crumbling. Not gone, not yet, and maybe not entirely ever. But an agentic person with good taste and clear thinking can now build things that would have required a development team two years ago. The creative and strategic skills that were always the hard part are suddenly the only part that matters. The mechanical translation is handled.

This applies to art and music too. It's not about telling the AI to make the whole thing. It's about having the AI handle the work that was too tedious for a human to do manually but too mechanical to be the actual creative contribution. The session drummer playing a click track. The developer writing boilerplate. The researcher formatting data. The stuff that had to get done but wasn't the point.

The goal was never to replace humans. It was to stop needing a trillion of them just to unlock what a few good ones can envision.
