---
layout: post
title: "Not Enough Humans"
excerpt: "The conversation about AI and jobs assumes we have enough people to do the work. We don't. We never did."
categories: [life]
tags: [ai, software-engineering]
site: gmacko
---

When Amazon acquired Kiva Systems in 2012 for $775 million, the narrative was straightforward: robots replacing warehouse workers. Cheaper, faster, no bathroom breaks. The automation-kills-jobs story writes itself.

The actual story was different. Amazon's warehouse attrition rate was running at about 150 percent annually. The typical warehouse worker lasted eight months. At the scale Amazon was operating, they were burning through over two million workers a year. An internal memo that leaked in 2022 warned that at the current trajectory, Amazon would exhaust its available US warehouse labor pool by 2024. Not in some distant future — two years out. Specific metros were already hitting the wall. Phoenix was projected to run dry by end of 2021. The Inland Empire in California by end of 2022.

Kiva wasn't about replacing workers who existed. It was about solving for workers who didn't.

<!--more-->

## The credits roll

Watch the credits of a Marvel movie sometime. Not the cast — scroll past that. Get to the visual effects section. Avengers: Endgame listed roughly fourteen thousand VFX artists. Fourteen thousand people working on a single film's visual effects.

What were they doing? Some of them were doing genuinely creative work — designing looks, building environments, making artistic decisions about how a scene should feel. But most of them were doing something much more mundane. Rotoscoping. Paint fixes. Frame-by-frame cleanup. Adjusting a shadow that a supervisor flagged in a review. Fixing a strand of hair that crossed a mask boundary. Tedious, precise, repetitive work that takes hours and requires a trained eye but isn't creative in any meaningful sense.

These artists averaged sixty-four-hour weeks. Seventy percent reported uncompensated overtime. Seventy-five percent said they'd been forced to work through meal breaks without pay. In 2024, Marvel's VFX workers voted unanimously to unionize. Every single ballot. Zero dissenting votes. That's how bad it was.

The question isn't whether AI should replace this work. The question is why we ever thought it was reasonable to require fourteen thousand humans to do it in the first place. The creative decisions in that film were made by maybe a few hundred people. Everyone else was executing. Precisely, exhaustingly, for months on end.

James Cameron said publicly that AI could cut VFX costs in half. He framed it as saving blockbuster cinema, not replacing artists. Fewer people doing paint fixes for sixty-four hours a week isn't a loss. It's a correction.

## The paper pusher

The same thing is playing out in software. The discourse is stuck on "will AI replace junior developers?" as if the junior developer role, as it currently exists, is something worth preserving.

I'll tell you what a junior developer does at a lot of companies. They get handed a JIRA ticket with a fully spec'd-out feature. Acceptance criteria written by someone else. Design decisions made by someone else. Architecture chosen by someone else. Their job is to translate that spec into code, write the tests that were already defined for them, and push a PR. It's execution. It's the rotoscoping of software engineering.

That's exactly what AI agents are good at now. Give a well-defined spec to an agent and it can knock it out. Not every time, not perfectly, but well enough and getting better fast. If that's the entirety of your job — taking specs that someone else wrote and translating them into code — then yes, an agent can do what you do. But that was never supposed to be the job.

Nobody goes into computer science to complete fully spec'd-out tickets. That's not the point of the degree. That's not what the field is about. You're supposed to learn how to think about problems, break down complex systems, make design decisions, understand tradeoffs. The spec-to-code pipeline was always a stopgap — a way to keep junior engineers productive while they built up the judgment to do the real work.

## The validation engineer

Part of the reason I chose computer science over computer engineering was this exact dynamic. The entry-level pathway into computer engineering at the time was as a validation engineer. You didn't design chips. You didn't write logic. You wrote test harnesses to verify that the work done by the people designing the chips was correct. It was a necessary role, and the people who did it were skilled, but it was fundamentally a support function. You spent your days checking someone else's creative work, not doing your own.

That's how a lot of junior software roles feel. You're not building the system. You're implementing someone else's vision of the system, ticket by ticket, while hoping you absorb enough context to eventually be the one making the decisions. Some people get there. A lot don't, because the role itself doesn't teach you what you actually need to learn.

The team I started out on at Amazon was all SD1s and SD2s. No senior engineers. Within a year, I was the most senior person on the team. I was making the design decisions, leading the technical direction, doing the work that's normally done by someone with a senior title. Not because I was ready — because there was nobody else. The work had to get done and the judgment calls had to be made.

That's what I think the future looks like for more people. Not fewer jobs — more responsibility per person. More things to own. More decisions to make. The agents handle the execution, and you handle everything else. Which, it turns out, is a lot.

## The backlog

Here's the part nobody talks about in the "AI will eliminate jobs" conversation.

When it came time for annual planning on my team, we'd get a list of things the business wanted built. Feature requests, integrations, infrastructure work, tooling improvements. Every year, anything that was a multi-million-dollar entitlement got cut. Not because it wasn't valuable. Because we didn't have the bandwidth. We physically could not build it all with the people we had.

If we'd been able to accomplish eighty percent of what was solicited to us, we would have had incredible products. Not incrementally better — categorically different. The features that got cut weren't nice-to-haves. They were things customers actually needed, things that would have changed the product's trajectory. They died in a spreadsheet because there weren't enough engineers to build them.

This is the part that makes the zero-sum framing absurd. The assumption that adding AI to the workforce means subtracting humans from the workforce only makes sense if there's a finite amount of work to be done. There isn't. There has never been a software team in history that ran out of things to build. The backlog is infinite. The constraint has always been the people.

The play isn't to cut your team from fifty to twenty and pocket the savings. It's to keep your team at fifty, pay them what you're already paying them, and build ten times as much. A hundred times as much. Ship the features that used to get cut in planning. Build the tools that were always deprioritized. Fix the infrastructure debt that everyone knows about and nobody has time for.

## Not zero-sum

Japan's working-age population has dropped sixteen percent since 1995. Half of Japanese companies report they can't find enough full-time workers. Their care sector will be short 570,000 workers by 2040 — they need 2.8 million and will have 2.2 million. Globally, there are 3.6 million unfilled trucking positions across thirty-six countries. A third of truck drivers are over fifty-five. Six percent are under twenty-five.

These aren't problems you solve by making companies leaner. You can't lean your way out of a demographic cliff. You solve them by making each person's output go further. A force multiplier, not a replacement.

The same logic applies to every knowledge worker staring at a backlog they'll never finish. Every creative team that cuts scope because the timeline is fixed. Every startup that can't hire fast enough. Every research lab that has more questions than graduate students. The bottleneck is humans. It has always been humans.

You're always going to need someone to be responsible for the thing at the end of the day. There's too much context, too many judgment calls, too much liability for any agent to own autonomously. That's why layers of management exist. That's why someone signs off on the final product. I don't think that ever goes away. You can't just hand the keys to a fleet of agents and walk away, because when something goes wrong — and it will — a human has to be accountable.

But the work between the decision and the accountability? The execution, the tedium, the paint fixes, the spec-to-code translation, the fourteen thousand hours of rotoscoping? That was never the job anyone signed up for. It was the cost of getting the real work done. AI doesn't eliminate the job. It eliminates the tax.

The conversation about AI and jobs keeps framing it as a reduction. Fewer humans needed. Leaner teams. Cost savings. That framing assumes we had enough humans in the first place. We didn't. Amazon was running out of warehouse workers. Japan is running out of workers, full stop. Every team I've ever been on had more work than people.

It's not about reducing the human part to zero. It's about keeping it where it is and attaching rocket engines to it.
