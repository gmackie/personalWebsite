# Blog Post Generation Workflow

## Step 1: Topic Selection

Here are some topic ideas based on your existing interests:

### Linux/NixOS
- [ ] NixOS Setup and Configuration
- [ ] NixOS on WSL: Windows + Linux Development
- [ ] Nix Package Manager on macOS

### Music/Audio Production
- [ ] Ableton Live + Eurorack Integration
- [ ] Turntable.bot: AI-Powered DJ Assistant

### Data & Automation
- [ ] Peloton Python App: Tracking Personal Fitness Data
- [ ] NodeRed + Home Assistant Integration
- [ ] Home Automation with van-control
- [ ] Realtime K-12 Attendance Insights + Bus Tracking (Startup Idea)

### Van Life & Mobile Tech
- [ ] Van Build Project Overview
- [ ] Van NAS: Mobile Network Storage
- [ ] Van Network Setup: Starlink + LTE
- [ ] Van Home Automation System

### Hardware/Electronics
- [ ] Smoker Temperature Monitoring with temp-pi
- [ ] 3D Printing Adventures
- [ ] IIoT Cloud Gateway + PLC Integration
- [ ] RC2014 Computer Kit Build
- [ ] Meshtastic at Festivals: Mesh Networking
- [ ] Ski Patrol Radio Sniffing/Upload Box

### Security & Learning
- [ ] OSCP Journey and Lessons Learned

### Productivity & Tools
- [ ] Atem Mini: Video Production Setup
- [ ] Stream Deck Optimization and Setup
- [ ] Kinesis Advantage 360 Keyboard Review

### Gaming & VR
- [ ] VR Mario Party: Asymmetric VR Games
- [ ] AI EdTech Game Development
- [ ] Vibe Coding Projects

### Personal Growth
- [ ] Building Better Habits (from your draft)
- [ ] Morning Routine Evolution
- [ ] Learning in Public
- [ ] Time Management as a Manager
- [ ] Work-Life Balance in Tech

### Professional Development
- [ ] Transition to Management
- [ ] Code Review Best Practices
- [ ] Documentation as a Superpower
- [ ] Remote Work Lessons
- [ ] Building Team Culture

## Step 2: Quick Outline Generator

For your selected topic, answer these questions:

1. **What sparked this topic?** (Personal story/moment)
   > 

2. **What problem does it solve or explore?**
   > 

3. **What's your unique angle or experience?**
   > 

4. **What specific examples or stories can you share?**
   > 

5. **What did you learn or what's next?**
   > 

## Step 3: AI Prompt for Draft

```markdown
Topic: [YOUR TOPIC]
Target Length: [300-500 words]

Background: [2-3 sentences of context]

Please write a blog post in Graham's conversational, personal style that:
- Starts with a specific moment or observation
- Uses "I" statements and informal tone
- Includes [NUMBER] specific technical details or examples
- Shares honest reflection including uncertainties
- Ends with future plans or lessons learned

Key points to cover:
1. [From your outline]
2. [From your outline]
3. [From your outline]

Specific details to include:
- [Personal anecdote]
- [Technical specification]
- [Lesson learned]
```

## Step 4: Post-Generation Checklist

After generating the draft:

- [ ] Add personal details only you would know
- [ ] Verify technical accuracy
- [ ] Insert your own humor or analogies
- [ ] Check the vulnerability feels authentic, not forced
- [ ] Add links to relevant projects or previous posts
- [ ] Include code snippets or images if relevant
- [ ] Update categories and tags in front matter

## Step 5: Front Matter Template

```yaml
---
layout: post
title: "[Your Title]"
date: [YYYY-MM-DD HH:MM:SS]
excerpt: "[One sentence summary that appears in post list]"
categories: [category]
tags: [tag1, tag2, tag3]
comments: true
---
```

## Quick Example: Smoker Monitor Post Starter

```yaml
---
layout: post
title: "Building a BBQ Dashboard: Smoker Monitoring with Raspberry Pi"
date: 2024-01-16 10:00:00
excerpt: "How I built a temperature monitoring system for my smoker using a Raspberry Pi and Grafana, because good BBQ shouldn't require constant vigilance."
categories: [maker]
tags: [raspberry-pi, grafana, iot, bbq, monitoring]
comments: true
---
```

## Publishing Workflow

1. Generate draft using the templates above
2. Save to `_drafts/YYYY-MM-DD-url-friendly-title.md`
3. Edit and refine with your personal touches
4. Test locally: `jekyll serve --drafts`
5. When ready, move to `_posts/` directory
6. Commit and push to publish

## Pro Tips

- **Start small**: Aim for 300-word posts to build momentum
- **Write when inspired**: Keep notes when ideas strike
- **Batch outlines**: Create multiple outlines when motivated
- **Use voice notes**: Record thoughts while working on projects
- **Screenshot everything**: Visual aids for technical posts
- **Track metrics**: Note which posts resonate with readers