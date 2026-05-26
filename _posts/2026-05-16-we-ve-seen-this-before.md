---
layout: post
title: "We've Seen This Before"
excerpt: "MIDI was going to kill musicians. No-code was going to kill developers. The pattern keeps repeating and nobody seems to notice."
categories: [life]
tags: [ai, history, software-engineering]
site: gmacko
---

In 1983, MIDI hit the commercial market and musicians started panicking. A keyboard player could now sequence an entire arrangement, quantize the timing, layer sounds from different synthesizers, and play it back perfectly every time. No band needed. No session musicians. No wrong notes. Just a guy with a Yamaha DX7 and a sequencer.

The fear was that musical performance had been decoded. If you could reduce a piano performance to note numbers, velocities, and timestamps, what was the point of a pianist? The data was the music. Anyone could edit the data.

<!--more-->

Drum machines made it worse. The LinnDrum and the TR-808 could lay down a beat that never rushed, never dragged, never needed a break. Studios that used to book drummers for a full day could program a pattern in twenty minutes. Session drummers watched their phone stop ringing.

Then auto-tune. Then sample libraries. Then loop-based production. Each one was supposed to finally make human musicians obsolete. Each one reduced some aspect of musical skill to a parameter that software could handle.

None of them killed music. None of them killed musicians. A sequencer could reproduce every note of Thriller with perfect timing and velocity, but no computer could have made Thriller without a blueprint of what Thriller was supposed to be. The creation was never in the playback. What the tools killed was a specific economic arrangement where certain skills commanded certain rates because they were scarce and hard to replicate. The skills didn't stop mattering. The economics changed.

The musicians who thrived were the ones who used the new tools. Hip-hop was born out of drum machines and samplers. Electronic music wouldn't exist without MIDI. Auto-tune became a genre-defining sound instead of just a correction tool. The technology changed what you had to be creative about.

## The no-code mirage

Software has its own version of this story, and it's been running for longer than most people realize.

Visual programming environments have been around since the early 2000s. Drag-and-drop interfaces where you connect blocks instead of writing code. Scratch came out of MIT in 2003. By the 2010s you had Bubble, Webflow, Zapier, Airtable, AppSheet, dozens of platforms promising that anyone could build software without writing a line of code.

Some of these tools are genuinely useful. Webflow is great for marketing sites. Zapier connects APIs without custom integration code. Airtable replaces a lot of internal tools that didn't need to be custom-built in the first place. For a certain category of problem, no-code works.

But the category never expanded the way people predicted. Every year someone writes the "no-code will replace developers" article and every year the demand for developers goes up. The tools get better and the prediction keeps not coming true.

The reason is the same one that kept MIDI from replacing musicians. The easy part was never the bottleneck. A drummer's value isn't that they can hit a drum in time. A developer's value isn't that they can type `for (let i = 0; i < arr.length; i++)`. The value is in knowing what to build, why, and how to make it work when the requirements get complicated.

No-code tools handle the simple cases well. They fall apart when you need custom business logic, complex data relationships, real error handling, or anything that doesn't fit the visual metaphor. And that's where most of the actual work is. The drag-and-drop interface is solving the part that was already easy.

## Thousands of hours

There's something people consistently underestimate about software. The gap between "I made a thing that works on my laptop" and "this runs in production handling real users" is enormous. It's not a gap in typing speed or syntax knowledge. It's a gap in understanding failure modes, edge cases, security implications, scaling behavior, data integrity, monitoring, deployment, and a hundred other things you only learn by getting burned.

No-code didn't close that gap. It couldn't, because the gap isn't about code. It's about the thousands of hours of accumulated judgment that tell you why this approach will break at scale, why that data model will cause problems in six months, why this authentication flow has a vulnerability. That knowledge lives in people, not in syntax.

The visual programming tools aimed at kids understood this better than the enterprise no-code platforms did. Scratch wasn't trying to replace developers. It was trying to teach computational thinking. The drag-and-drop interface was scaffolding for learning, not a replacement for expertise. Honest about what it was.

## The AI version

Now we're running the same playbook with AI. Developers are going to be obsolete. Anyone can build software by talking to a chatbot. The thousand-hour learning curve is about to get compressed to zero.

Sound familiar?

AI is genuinely better at this than no-code ever was. An LLM can produce working code, handle edge cases it's seen in training data, and iterate based on feedback. It's not a drag-and-drop toy. It can write real software. That's a meaningful difference from what came before.

But the pattern is the same. The part AI handles well is the part that was already the most mechanical. Generating boilerplate, writing CRUD endpoints, scaffolding test suites, producing code that follows known patterns. The typing. The same thing MIDI automated for musicians: the mechanical reproduction of something a skilled person could do by hand.

The part AI doesn't handle is the same part no-code didn't handle and MIDI didn't handle. Knowing what to build. Knowing why one architecture will survive and another will collapse. Knowing which corner to cut and which one will cost you six months of rework. You learn that by building things that break and figuring out why.

I've been using AI to write code every day for over a year. I ship faster than I ever have. The tools are genuinely transformative. And at no point has the need for engineering judgment decreased. If anything it's increased, because I'm making more decisions per hour and each one still requires understanding the problem.

## The drum machine didn't practice

Here's the thing about the TR-808. It could play a perfect beat. Metronomically precise, never tired, consistent forever. But it couldn't listen to a singer rush the bridge and push the tempo to match. It couldn't feel that the chorus needed more energy and dig in harder. It couldn't make the musical decisions that turn a beat into a groove.

The drummers who survived the drum machine era weren't the ones who could play the most precisely. Machines won that contest permanently. The survivors were the ones whose feel, taste, and musical judgment couldn't be sequenced. The mechanical skill became table stakes. The human skill became the differentiator.

That's where we are with code. The mechanical skill of translating logic into syntax is becoming table stakes. AI does it well enough. The human skill of understanding what needs to exist, why, and how to make it survive contact with reality is the differentiator. Same pattern. Different instrument.

The people I know who are scared of AI replacing them are mostly scared because their work was already mostly mechanical. They were the human drum machines, playing patterns someone else wrote, precisely and on time. That work is going away. It was always going to.

The people who aren't scared are the ones who spend most of their time on the hard parts. Architecture, system design, debugging novel failures, understanding the business domain well enough to know what the software actually needs to do. AI makes them faster at the mechanical parts so they can spend more time on the parts that matter.

## Every generation

Every generation of tooling kills the previous generation's scarcity. MIDI killed the scarcity of precise musical performance. Drum machines killed the scarcity of consistent rhythm. Auto-tune killed the scarcity of pitch-perfect vocals. No-code killed the scarcity of simple CRUD apps. AI is killing the scarcity of boilerplate code.

Each time, people mistake the death of a scarcity for the death of a profession. The profession adapts, the valuable skills shift, and the people who built their identity around the scarce thing have a rough few years. But the work doesn't go away. It changes shape.

If you're a developer and your main value proposition is that you can write a for loop, yeah, you should be worried. But that should have worried you before AI. If your value is that you understand the problem deeply enough to know what to build and how to make it work, you're about to get the best set of power tools your profession has ever seen.

The musicians who embraced MIDI didn't become obsolete. They became producers.
