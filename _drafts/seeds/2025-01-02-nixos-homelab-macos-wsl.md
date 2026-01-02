---
layout: post
title: "NixOS Everywhere: My Journey to Declarative Computing"
date: 2025-01-02
excerpt: "How I unified my homelab, MacOS development, and WSL environments with NixOS and Nix flakes"
categories: [technical]
tags: [nixos, homelab, macos, wsl, devops, reproducibility]
status: seed
---

## Hook Ideas
- "I used to spend hours setting up new machines. Now it takes one command."
- "The moment I realized my development environment was a lie"
- "What if your entire system was version controlled like your code?"

## Outline

### Section 1: The Problem — Environment Drift Hell
- Every machine slightly different (homebrew versions, dotfiles out of sync)
- "Works on my machine" but it's YOUR machines disagreeing with each other
- The breaking point that made me search for something better

### Section 2: Why NixOS / Nix (Not Ansible, Not Docker)
- Declarative vs imperative configuration
- Reproducibility guarantees that actually work
- The learning curve is steep but the payoff is real
- Quick comparison: when to use Nix vs Docker vs traditional config management

### Section 3: The Homelab Setup
- What's running (services, hardware)
- Flake structure for server configuration
- Secrets management approach (agenix/sops-nix?)
- Deployment workflow (nixos-rebuild, deploy-rs, or similar)

### Section 4: MacOS with Nix-Darwin
- What nix-darwin controls vs what stays native
- Home-manager for user-level config
- Handling the awkward bits (GUI apps, system preferences)
- Brew still exists for some things — and that's okay

### Section 5: WSL Integration
- Why WSL needs special handling
- NixOS-WSL or nix on Ubuntu/Debian WSL
- Sharing config with the MacOS setup via flakes
- Windows interop considerations

### Section 6: The Unified Flake Structure
- How all three environments share common modules
- Machine-specific overrides
- Managing secrets across platforms
- CI/CD for your dotfiles (if applicable)

## Conclusion Direction
- Time investment vs time saved calculation
- Who this setup is actually for (and who should skip it)
- The mental shift from "install and configure" to "declare and apply"

## Notes
- Topic type: technical project / journey
- Include actual flake.nix snippets if possible
- Be honest about pain points and ongoing maintenance
- Consider linking to the actual repo if public
