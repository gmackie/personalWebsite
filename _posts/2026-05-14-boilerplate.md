---
layout: post
title: "Boilerplate"
excerpt: "Dependency injection was always the right call. It just wasn't worth the typing. That changed."
categories: [tech]
tags: [ai, software-engineering, testing]
site: gmacko
---

Dependency injection is one of those patterns that every senior engineer knows is correct and almost nobody uses consistently. Instead of a class creating its own dependencies, you pass them in from the outside. Your database service doesn't instantiate its own connection pool. Your payment processor doesn't construct its own HTTP client. Everything comes in through the constructor or a factory, and the thing that wires it all together lives somewhere else.

The benefit is testability. When your dependencies are injected, you can swap them out. Your unit tests pass in a fake database that returns canned responses. Your integration tests use a real database but a stubbed payment gateway. You can test each piece in isolation because nothing is hardwired to anything else.

<!--more-->

Every testing textbook says this. Every conference talk on clean architecture says this. And in practice, most codebases don't do it, or do it halfway, or did it once and let it rot.

The reason is boilerplate.

## The tax

To do dependency injection properly, you need interfaces for every service boundary, concrete implementations, constructors that accept the interfaces, a composition root that wires everything together, and factories for anything with complex construction logic. Then you need test doubles on top of that: fakes, stubs, mocks, spies, whatever flavor your testing philosophy prefers.

For a small service with three or four dependencies, this is manageable. For a real application with dozens of services, repositories, clients, and adapters, it's a wall of code that does nothing interesting. It's plumbing. Every new dependency means touching the interface, the concrete class, the composition root, and the test doubles. A ten-line feature change turns into forty lines of wiring.

I've worked on teams that committed to dependency injection and stuck with it. The test suites were excellent. The code was easy to reason about. Refactoring was safe because the tests actually caught regressions. But the velocity cost was real. New developers spent their first week understanding the wiring before they could write a feature. Code reviews were full of "you forgot to update the factory" comments. The ceremony around every change was significant.

I've also worked on teams that said "we'll add DI later when we need it" and never did. Those codebases moved faster early on and became untestable nightmares within a year. No test doubles because nothing was injectable. No way to test the payment flow without hitting the real Stripe API. No way to run the test suite without a live database. The kind of codebase where the CI pipeline takes forty minutes and half the tests are flaky because they depend on external state.

Both outcomes suck. The tradeoff was real and reasonable people landed on different sides of it.

## What changed

AI writes boilerplate better than I do.

When I'm building a new service now, I describe the dependency graph and the AI generates the interfaces, the constructors, the composition root, the test doubles. All of it. The plumbing that used to take half a day takes five minutes. And it's consistent, which is more than I can say for boilerplate I've written by hand at 4pm on a Friday.

The thing that made dependency injection expensive was the human time spent maintaining the wiring. That cost is gone. Testability, loose coupling, safe refactoring were always worth having. They just weren't always worth the typing.

Now they are.

## What this looks like in practice

I've been refactoring a service in Controls Foundry that talks to PLCs over Modbus TCP. The original code had the protocol handler, the connection manager, and the data translator all tangled together. Testing meant connecting to a real PLC or not testing at all.

I described the service boundaries to Claude and asked for the DI scaffold. Within a few minutes I had a `ModbusClient` interface, a `RealModbusClient` for production, a `FakeModbusClient` that returns configurable responses, a `ConnectionPool` interface with real and fake implementations, and a composition root that wires the right ones together based on environment. The test suite runs in milliseconds against the fakes. The integration tests hit a real Modbus simulator. The production code hits real hardware.

Refactoring the data translator was safe because the tests were solid. I changed how register values get mapped to engineering units, ran the tests, and the three cases I broke showed up immediately. Without test doubles that would have been a manual test against physical hardware, assuming the hardware was available and powered on and connected to my network.

The fakes also make development faster. I don't need a PLC plugged into my desk to work on the UI. The fake client returns realistic data and I can simulate error conditions that are hard to reproduce with real hardware. Connection timeouts, corrupt responses, partial reads. All configurable in the test double.

None of this is new. People have been writing test doubles since the '90s. The difference is that the cost of creating and maintaining them dropped to near zero. The pattern that was always right became practical.

## The broader point

There's a category of software engineering practices that everyone agrees are correct but that impose enough overhead to be impractical in most contexts. Dependency injection. Comprehensive test doubles. Detailed interface contracts. Thorough documentation of internal APIs. They all make code better. They all cost time that could be spent on features.

AI collapses the cost side of that equation. Things that were too expensive to do consistently become cheap enough to do everywhere.

I catch myself doing things now that I would have called overengineering a year ago. Writing interfaces for internal boundaries that only have one implementation. Creating fakes for services that are easy to test against directly. Building out test fixtures that cover edge cases I'm not currently worried about. It feels excessive by the standards I learned, but the cost of doing it is so low that the standards don't apply anymore.

The boilerplate was the bottleneck, not the thinking. Deciding where the service boundaries should go, what the interfaces should look like, which test doubles you need and what behaviors they should simulate. That part requires understanding the problem. The part that was expensive was the typing, and the typing is the part AI is best at.
