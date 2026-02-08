---
layout: post
title: "NixOS Everywhere: My Journey to Declarative Computing"
date: 2026-02-07
excerpt: "How I unified my homelab, MacOS development, and WSL environments with NixOS and Nix flakes"
categories: [technical]
tags: [nixos, homelab, macos, wsl, devops, reproducibility]
status: draft
comments: true
---

I had three machines and three different realities. My homelab server was running Ubuntu with a rats-nest of shell scripts. My MacBook had a Brewfile that was more aspirational than accurate. My Windows desktop's WSL install was held together with dotfile symlinks and prayers. Every time I sat down at a different machine, I'd waste twenty minutes discovering that some tool was missing, some config was stale, or some alias I relied on didn't exist here.

<!--more-->

This isn't a new problem. Every developer has a version of it. The usual answer is dotfiles in a Git repo, maybe Ansible if you're feeling ambitious. I tried all of that. Dotfiles help, but they only cover the surface -- they don't manage packages, services, or system configuration. Ansible got me further, but the playbooks kept drifting from reality because the state on disk was always the real source of truth, not the YAML file claiming to describe it.

The thing that finally broke me was a Python version conflict. I had a project that needed 3.11 on all three machines. The homelab had 3.10 from Ubuntu's repos. The Mac had 3.12 from Homebrew because I'd upgraded without thinking. WSL had 3.11 but with a different set of system packages around it, so half the dependencies wouldn't build. Same project. Three machines. Three different broken states. That's when I started reading about Nix.

## Why Nix, specifically

Nix is a package manager built on a simple idea: every package is a function of its inputs, and the output is stored in an immutable path derived from a hash of those inputs. If the inputs don't change, the output doesn't change. If the inputs do change, you get a new output and the old one sticks around until you garbage-collect it.

This means you can have Python 3.11 and Python 3.12 installed simultaneously without them conflicting. It means you can describe your entire system configuration as code, and applying that code produces the exact same result every time. Not "should produce" -- actually produces.

NixOS takes this further and applies it to the entire operating system. Your boot loader, kernel modules, system services, users, firewall rules -- it's all one configuration.nix file (or, with flakes, a set of composable modules). If your system boots, it matches the config. If you change the config, you rebuild, and if something goes wrong, you roll back to the previous generation in one command.

I looked at Ansible. I've used it professionally. It's fine for managing fleets of servers that are mostly the same. But Ansible describes transitions, not end states. If you run a playbook twice, you might get the same result. If you run it on a machine that someone else touched manually, you probably won't. Nix describes the end state, and the build system figures out how to get there. That distinction matters more than I expected.

Docker solves a different problem. It gives you reproducible environments for applications, but it doesn't manage the host. My dotfiles, shell configuration, development tools, system services -- Docker doesn't touch any of that. I still use Docker (and Kubernetes) for running services. But the machine itself needs management too.

## The homelab

The [homelab](/articles/2026-02/homelab-nas-setup) runs NixOS directly. It's a set of mini PCs -- low power draw, silent, rack-mounted in my closet. The NixOS configuration defines everything: the K3s cluster, the networking (VLANs, WireGuard, internal DNS), the storage mounts, the monitoring stack. When I need to add a service or change a network rule, I edit a .nix file, push to my Gitea repo, and rebuild.

The flake structure for the server looks roughly like this:

```
flake.nix
├── hosts/
│   ├── homelab-node1/    # per-machine hardware config + overrides
│   ├── homelab-node2/
│   └── macbook/
├── modules/
│   ├── common/           # shared across all machines
│   ├── server/           # server-specific (K3s, services)
│   └── desktop/          # GUI, dev tools, user apps
├── home/                 # home-manager configs
│   ├── common.nix
│   ├── shell.nix
│   └── git.nix
└── secrets/              # agenix-encrypted secrets
```

Secrets are handled with agenix. Each machine has an SSH key, and secrets are encrypted to the set of keys that need access. The encrypted files live in the repo. When NixOS rebuilds, agenix decrypts them and places them where services expect them. No secrets in plaintext, no external secret manager to maintain, and the secret definitions are version-controlled alongside the configs that use them.

Deployment is straightforward. For the homelab nodes, I run `nixos-rebuild switch --flake .#homelab-node1 --target-host root@node1` from my laptop. It builds the new configuration, copies it to the target, and activates it. If I want to test first, I use `--target-host` with `nixos-rebuild test`, which activates the new config without making it the boot default. If anything goes sideways, a reboot brings back the last working generation.

## macOS with nix-darwin

This is where it gets interesting. Macs can't run NixOS (Apple's kernel is closed), but you can run Nix the package manager on macOS, and nix-darwin gives you a NixOS-like configuration layer on top of it.

My nix-darwin config manages: system packages (everything I'd normally `brew install`), shell configuration (zsh, starship prompt, aliases), development environments (language servers, formatters, linters), system defaults (Dock position, key repeat rate, Finder preferences), and launchd services (background processes I want running).

Home-manager handles the user-level stuff -- my git config, SSH config, Neovim setup, tmux, and all the dotfiles. The key insight is that the home-manager modules are shared between macOS and NixOS. My shell config is identical on every machine because it's the same .nix file.

Homebrew still exists on my Mac. I'm honest about that. GUI apps like Firefox, Raycast, and 1Password don't play well with Nix on macOS. I use nix-darwin's homebrew module to declaratively manage my Homebrew casks -- so the Brewfile is generated from my nix config, not maintained separately. It's not pure, but it works. The important thing is that `darwin-rebuild switch` gives me a known-good state, and the Brewfile stays in sync automatically.

The awkward part is system settings. nix-darwin can set some macOS defaults (the ones accessible via `defaults write`), but not everything. I have a small list of manual steps for a fresh Mac setup -- roughly five minutes of clicking. Not worth automating further. Don't let perfection kill the system.

## WSL integration

My Windows machine runs WSL2 with NixOS-WSL, which is a NixOS distribution built specifically for WSL. It's not a "run Nix inside Ubuntu" hack -- it's actual NixOS as the WSL distro, with a configuration.nix and everything.

This was the hardest piece to get right. WSL has its own quirks: the filesystem bridge between Windows and Linux is slow, systemd support is relatively new, and GPU passthrough (for CUDA) requires specific configuration. NixOS-WSL handles most of this, but I had to dig into WSL-specific kernel module configs and environment variable forwarding.

The payoff is worth it. My WSL environment shares the same flake as my Mac and homelab. The `home/common.nix` module gives me identical shell, git, and editor configuration. The `home/shell.nix` module detects the platform and adjusts paths accordingly (macOS uses `/opt/homebrew/bin`, NixOS uses `/run/current-system/sw/bin`, WSL needs Windows interop paths).

Windows interop deserves a mention. NixOS-WSL lets me call Windows executables from the Nix shell, so I can open files in Windows apps, use `clip.exe` for clipboard operations, and run Windows-side Docker when needed. The `/mnt/c` mount is slow for heavy I/O, so I keep all code in the Linux filesystem and only cross the boundary for occasional file access.

## The unified flake

The whole point of this setup is that one flake describes all three environments. When I add a new CLI tool to `modules/common/packages.nix`, it appears on every machine after rebuild. When I tweak my shell aliases in `home/shell.nix`, they update everywhere.

Machine-specific overrides live in the `hosts/` directory. The homelab nodes have server modules (K3s, Longhorn, monitoring). The MacBook has desktop modules (GUI apps, nix-darwin specifics). The WSL machine has its own hardware configuration and interop settings. But the foundation -- packages, shell, git, editor, development tools -- is shared.

I run CI on the flake itself. A Gitea Actions workflow builds all three configurations on push to verify nothing is broken. It doesn't deploy automatically (I don't want a bad commit to take down my servers), but it catches configuration errors before I try to rebuild a machine.

## The honest assessment

The learning curve is brutal. Nix's language is pure functional, lazily evaluated, and documented in a way that assumes you already understand it. I spent a solid month reading the Nix Pills, browsing NixOS Discourse, and staring at other people's flakes trying to understand why my module wasn't merging correctly. Flakes themselves were "experimental" for years and the documentation reflected that -- half official manual, half GitHub README, half blog posts from 2022 that may or may not still apply.

Error messages are notoriously bad. When a build fails, the trace often points to an evaluation error deep in nixpkgs rather than your config file. You learn to read them, but the first dozen times feel like deciphering ancient scrolls.

Maintenance is real but manageable. I update my flake inputs (nixpkgs, home-manager, nix-darwin) roughly every two weeks. Most updates are seamless. Occasionally something breaks -- a package was removed, a module interface changed, a macOS update broke a nix-darwin setting. Fixing these usually takes fifteen minutes of searching NixOS Discourse or checking the nixpkgs commit log.

The time investment paid for itself within about three months. Setting up a new machine went from a full day of installing, configuring, and discovering what I forgot, to about thirty minutes of cloning the repo and running one command. More importantly, I stopped thinking about my environment entirely. Every machine works the same way. That cognitive overhead being gone is worth more than the time savings.

## Who should bother

If you have one machine and it works, don't do this. Seriously. The cost-benefit doesn't make sense unless you're managing at least two or three environments, or unless you rebuild machines frequently.

If you run a homelab, Nix is worth considering for the servers alone. Being able to define your entire infrastructure stack as code, roll back atomically, and reproduce the exact same configuration on replacement hardware is transformative.

If you're the kind of person who has a 200-line Brewfile and a dotfiles repo that you obsess over, you're already doing 80% of the work for 20% of the benefit. Nix gives you the remaining 80% of the benefit, but it'll cost you a month of learning.

I wouldn't go back. The setup is boring now, and boring infrastructure is the whole point.
