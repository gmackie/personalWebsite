---
layout: post
title: "Peanut Butter and Jelly"
excerpt: "The most useful skill in AI development is something my third-grade teacher taught me."
categories: [tech]
tags: [ai, prompt-engineering]
site: gmacko
---

When I was in third grade, my teacher stood at the front of the class and said, "Pretend I'm an alien. I've never seen a human kitchen before. Tell me how to make a peanut butter and jelly sandwich."

A kid said, "Put the peanut butter on the bread."

The teacher picked up the jar of peanut butter and set it on top of a slice of bread. The class lost it. "No, you need to open it first!" So the teacher opened the jar. "Now get the peanut butter out and put it on the bread." The teacher reached into the jar with their bare hand, scooped out a handful, and slapped it onto the bread.

<!--more-->

It went on like this for a while. Every instruction the kids gave was correct and useless. They had to learn to say "pick up the knife," "put the knife into the jar," "scoop out about a tablespoon," "spread it across one side of the bread in an even layer." They had to be specific about things they'd never thought to be specific about, because they'd never had to explain sandwich-making to something that didn't already know what a sandwich was.

The lesson was supposed to be about specificity and logical thinking. I don't think my teacher was preparing us for prompt engineering, but here we are.

## The alien in the terminal

Working with LLMs is the same exercise. You can't say "make me the app." You can't even say "add Stripe integration and switch from Clerk to BetterAuth." It'll try. It'll produce something. And somewhere in the middle it'll do the equivalent of scooping peanut butter out with its hand because you didn't specify that it should use a knife.

The failure mode isn't that the model is stupid. It doesn't share your assumptions. It doesn't know which parts of your request are simple and which are load-bearing. It doesn't know that when you said "switch auth providers" you meant "migrate the existing user sessions" and not "rip out the old one and drop everyone's login state." It takes you at your word, and your words weren't precise enough.

I've watched people get frustrated with AI tools and blame the model when the real problem was the prompt. "I told it to refactor the service and it broke everything." Yeah, because "refactor the service" is "put the peanut butter on the bread." You didn't say what to keep, what to change, how to verify it still works, or when to stop.

The skill is learning to say:
- Here's what I want the end state to look like.
- Here are the constraints. Don't touch these files. Keep this interface stable.
- Here's how to verify you did it right. Run these tests. Check that this endpoint still returns the same shape.
- Stop and ask me before you do anything irreversible.

Intent, constraints, verification, stopping conditions. Everything else is details.

## Teaching the alien

The real lesson wasn't about sandwiches. It was watching the kids learn to think about what they actually meant. They knew how to make a sandwich. They'd made hundreds of them. But they'd never decomposed the process into steps that someone with no context could follow. The knowledge was in their hands, not in their heads.

Prompt engineering is the same kind of translation. You know what you want. You've built systems like this before. The work is turning that tacit knowledge into explicit instructions that something without your experience can execute. What do you actually mean by "clean up this code"? What does "make it production-ready" look like? What are the edge cases you're worried about?

Most people skip this step because it feels like unnecessary overhead. Just let the model figure it out. And sometimes it does. GPT-4 and Claude are good enough that vague prompts often produce reasonable output. But "often reasonable" isn't "reliably correct," and the gap between those two things is where production bugs live.

The people I know who are most effective with AI tools are the ones who spend more time on the prompt than on reviewing the output. They write the acceptance criteria before they ask for the implementation. They describe the sandwich step by step and the alien makes it right on the first try.

## Everyone's inventing their own language

The thing nobody talks about is that there's no shared playbook for any of this. And there probably can't be, because everyone likes their sandwich different.

Some people like the peanut butter on both slices and the jelly in the middle. Some want jelly first. Some want it on toast. Everyone who's effective with AI tools has arrived at their own way of talking to the alien. Structured prompts with acceptance criteria. Skills files and system prompts. Conversational back-and-forth with corrections along the way. Everyone is independently discovering the same lessons and encoding them in their own style. The preferences are personal, but the patterns that work keep showing up: be specific, state your constraints, define what done looks like.

The tricky part is that those personal preferences are becoming de facto standards. The way you like your sandwich gets baked into your prompt templates, your skills files, your team conventions. And then someone new joins and inherits your sandwich preferences without understanding why you do it that way. It's the early days of programming all over again, before anyone agreed on control structures or naming conventions. We might converge eventually. Or we might not, because the aliens keep changing.

There's a weirder question underneath all of this. We're teaching the alien to use a butter knife because that's what we use. But what if the butter knife was never invented before peanut butter and jelly existed? Would we have ended up with something completely different? Some kind of bear-claw scooper optimized for the task? We're constraining the alien to human workflows because those are the only ones we know how to describe. The most optimal alien-made sandwich might use tools we haven't thought of, and we'd never find out because we're too busy explaining how butter knives work.

That applies to software, creative work, writing, analysis. We're teaching AI to work the way we work, and that might be leaving most of the value on the table.

Meanwhile the reactions are polarized in a way that's not helpful. Some people mock the aliens as dumb, pointing at failure cases as proof that AI is overhyped. Others let the aliens take the wheel entirely, which doesn't lead anywhere good either. The people getting real value are somewhere in the middle, quietly building their own vocabulary for talking to the thing without evangelizing or dismissing it.

## Whether aliens can teach themselves

Maybe this is a temporary skill. Models are getting better at inferring intent from vague instructions. The gap between "put the peanut butter on the bread" and a usable sandwich is shrinking with every generation. Maybe in a year or two you really can just say "make me the app" and get something that works.

Maybe. People are working on that. Agents that plan, verify, and correct themselves. Models that ask clarifying questions before they start. Systems that break down vague requests into specific steps without being told to.

But right now the skill that matters is teaching the alien to make the sandwich. Being precise without being so prescriptive that you prevent it from being useful. Knowing which instructions need to be explicit and which ones it can figure out on its own.

My third-grade teacher was teaching us to think clearly by communicating clearly. That turned out to be the whole game.
