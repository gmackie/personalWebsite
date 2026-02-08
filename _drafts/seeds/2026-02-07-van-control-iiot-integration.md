---
layout: post
title: "Industrial IoT in a Camper Van: Overengineering My Mobile Home"
date: 2026-02-07
excerpt: "I'm building an industrial controls system for my van. ESP32 sensor nodes, MQTT, fail-safe defaults, and watchdog timers -- because my house deserves the same reliability as a factory."
categories: [projects, technical]
tags: [vanlife, iiot, esp32, mqtt, embedded, controls, van-build]
status: seed
---

## Hook Ideas
- "My van has a diesel heater, a water pump, and a 400Ah battery bank. None of them talk to each other. That's about to change."
- "Home Assistant is fine for turning lights on and off. But when the system runs your house and a failure means waking up to a dead battery at 3am in the mountains, you want industrial reliability."
- "I spent a decade building cloud infrastructure. Now I'm applying the same principles to a 2004 Sprinter van."

## Outline

### Section 1: Why Not Just Use Home Assistant?
- The consumer home automation trap: designed for "nice to have," not "runs your house"
- When the control system fails in a house, you flip a manual switch. In a van, you might not have that option
- Industrial controls think about failure modes first. Home automation thinks about features first
- What "industrial" means in this context: watchdogs, heartbeats, fail-safe defaults, alarm prioritization

### Section 2: The Sensor Architecture
- ESP32-based sensor nodes: one per subsystem (electrical, water, climate, doors)
- What each node monitors: battery voltage/current, tank levels, temperatures, door state
- Communication via MQTT to a central broker on a Raspberry Pi
- Why MQTT over WiFi (not Zigbee, not BLE, not CAN bus) -- for now
- The heartbeat pattern: every node announces it's alive every 30 seconds

### Section 3: The Control Logic -- Think Like a PLC Programmer
- Load shedding: when battery drops below threshold, non-critical loads get cut automatically
- Pump protection: pump won't run if the tank is empty
- Heater safety: exhaust temperature monitoring with automatic shutdown
- The fail-safe principle: if the control system itself fails, every output defaults to the safe state
- Alarm design: priority levels, escalation paths, and alarm fatigue prevention

### Section 4: The Dashboard -- A 7-Inch Window Into Everything
- Mounted touchscreen showing real-time system status
- What it displays: battery SOC, tank levels, temperatures, active alarms
- Phone app as secondary display with push notifications for critical alarms
- Design philosophy: glanceable, not interactive. Most of the time you just need to see that everything is green

### Section 5: Control Logic and Fail-Safes
- Watchdog timers on every node -- if firmware hangs, hardware reboots it
- Heartbeat monitoring -- if a node goes silent, the supervisor knows within 60 seconds
- Data logging to InfluxDB for trend analysis
- The bridge to the homelab: when on home WiFi, data replicates to Kubernetes for long-term storage

### Section 6: What I'm Building First (MVP)
- Single ESP32 node monitoring battery voltage and current via INA219
- Mosquitto broker on a Raspberry Pi
- Basic web dashboard showing live battery state of charge and a 24-hour trend
- Low battery alarm that triggers a visual alert
- Why starting with battery monitoring: it's the most critical subsystem

## Conclusion Direction
- This is overengineering in the best sense: applying proven industrial patterns to a problem that genuinely benefits from them
- The van is a constrained environment that forces good engineering
- The MVP is deliberately small, but the architecture supports the full vision without rework
- Invitation: if you've done van automation or IIoT projects, I want to hear about your approach

## Notes
- Topic type: technical project walkthrough with design rationale
- Pairs with the van-setup-current-and-future seed
- Include architecture diagram when available
- Keep the "overengineering" framing self-aware and humorous
- Potential series: design, build, firmware, dashboard, lessons learned
