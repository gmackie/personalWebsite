---
layout: post
title: "A Web Developer's Guide to ESP32: Learning Embedded the Hard Way"
date: 2026-02-07
excerpt: "After years of JavaScript and cloud services, I picked up an ESP32 and discovered that embedded development is a different world entirely."
categories: [technical]
tags: [esp32, embedded, iot, firmware, c-cpp, hardware]
status: seed
---

## Hook Ideas
- "I've mass-deployed containerized microservices across three cloud regions. Last week, I spent four hours debugging why an LED wouldn't turn on. The wire was in the wrong breadboard row."
- "In my day job, a deployment failure means rolling back a Docker image. In my garage, a deployment failure means the magic smoke escapes from a five-dollar chip."
- "I wanted a battery monitor for my van. I could have bought one for forty dollars on Amazon. Instead, I spent six months learning C, soldering iron burns, and the I2C protocol. I regret nothing."

## Outline

### Section 1: Why a Web Developer Picked Up a Microcontroller
- The van build as the catalyst: wanting custom monitoring and control that off-the-shelf products can't provide
- Why ESP32 specifically: WiFi and Bluetooth built in, massive community, affordable, capable
- The allure of making physical things after years of purely digital work
- Initial expectations vs reality: thought it would be like "backend development but smaller"

### Section 2: The Mental Model Shift
- Memory: from "basically infinite" to counting bytes. No garbage collector, stack overflows are real
- Concurrency: from async/await to RTOS tasks, interrupts, and volatile variables
- Debugging: no browser DevTools, no breakpoints. Serial.println is your best friend
- Error handling: unhandled errors mean the device stops working until someone power-cycles it
- Dependencies: no npm, no package manager ecosystem. PlatformIO helps but many "libraries" are a single .h file from 2019

### Section 3: Hardware Fundamentals Software People Need
- Communication protocols: I2C for sensors, SPI for displays, UART for serial devices
- Analog vs digital: ADCs and their limitations on the ESP32
- Power management: 3.3V logic levels, why you can't just connect a 5V sensor
- GPIO: pull-up/down resistors, input vs output modes, PWM, interrupt-capable pins
- Common gotchas: floating pins, ground loops, electromagnetic interference

### Section 4: Building the Van Control System
- System architecture: central ESP32 + satellite sensor nodes via MQTT
- Sensor selection: INA226 for battery, DS18B20 for temperatures, capacitive for tank levels
- The display stack: TFT_eSPI vs LVGL for the dashboard
- MQTT as the communication backbone
- OTA updates: critical for devices mounted behind panels

### Section 5: What Transfers and What Doesn't
- What transfers: systematic thinking, version control, clean modular code, networking fundamentals
- What doesn't: assumptions about resources, reliance on abstractions, the "just add a dependency" mindset
- Unexpected skills that matter: reading datasheets, basic electronics (Ohm's law, voltage dividers)
- The reward difference: something uniquely satisfying about firmware controlling a physical thing

### Section 6: Getting Started -- What I'd Do Differently
- Start with Arduino framework, not ESP-IDF
- Buy a kit with sensors included rather than ordering piecemeal
- Learn to read datasheets early
- Get a logic analyzer (ten dollars on Amazon)
- Don't skip the basics: blink an LED, read a button, drive a servo

## Conclusion Direction
- How embedded development changed the way I think about software in general
- Working with constraints makes you a better engineer
- The van control system is still a work in progress but the skills are paying off
- Encourage other web developers to try it, with honest caveats

## Notes
- Topic type: narrative/reflection, not a tutorial
- Include specific anecdotes from the learning process
- The title promises "the hard way" so deliver: real struggles, real mistakes
- Could pair with a follow-up deep dive on one specific component
