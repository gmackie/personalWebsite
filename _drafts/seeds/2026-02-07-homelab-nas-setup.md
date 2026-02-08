---
layout: post
title: "Building a Homelab That Actually Does Things"
date: 2026-02-07
excerpt: "Why I built a homelab, what it runs, and the decisions that mattered most along the way"
categories: [technical]
tags: [homelab, nas, kubernetes, self-hosting, networking, unifi]
status: seed
---

## Hook Ideas
- "Most homelab posts are just hardware porn. Here is what mine actually does every day."
- "I got tired of paying monthly for services I could run on a box under my desk. So I built the box."
- "The real reason to build a homelab is not saving money. It is having a place where you can break things without consequences."

## Outline

### Section 1: Why Build a Homelab at All
- The pitch: own your infrastructure, learn by doing, stop paying rent on your own data
- What pushed me over the edge (deployment target for projects, tired of free-tier limits)
- Who this is for vs who should just use cloud services
- The honest cost calculation: hardware + electricity + time vs SaaS subscriptions

### Section 2: The Hardware -- Keeping It Simple
- Mini PCs over rack servers: why wattage and noise matter more than specs
- NAS decision: Synology (easy) vs TrueNAS (flexible) vs DIY NixOS + ZFS (hard mode)
- The actual hardware list and what each piece costs
- UniFi networking gear: overkill for most people, perfect for this
- Total power draw and noise levels in a real apartment
- UPS: why you need one and which one

### Section 3: Networking That Does Not Suck
- VLANs explained for people who have never set one up (and why they matter)
- Network topology: trusted devices, IoT, servers, guest -- all separated
- Internal DNS so you type gitea.home.local instead of an IP address
- WireGuard VPN: access everything remotely without exposing anything to the internet
- Let's Encrypt certs for internal services via cert-manager
- The UniFi experience: what is good, what is annoying, what I would change

### Section 4: Kubernetes at Home -- K3s and GitOps
- Why Kubernetes for a homelab (and when it is overkill)
- K3s: lightweight K8s that actually runs on mini PCs
- The GitOps workflow: push to Git, ArgoCD syncs, service updates automatically
- Persistent storage: Longhorn vs NFS-backed volumes from the NAS
- Ingress, load balancing, and cert management on bare metal
- What breaks and how I debug it

### Section 5: The Services That Make It Worth It
- Gitea: self-hosted Git that replaces GitHub for personal projects
- Harbor: private container registry tied to CI pipelines
- Monitoring stack (Grafana + Prometheus + Loki): knowing what is happening at all times
- Uptime Kuma: dead simple uptime monitoring with notifications
- Blog infrastructure: this very site runs on the cluster
- The services I tried and dropped (and why)

### Section 6: Lessons, Tradeoffs, and What I Would Do Differently
- Build vs buy: where I wasted time doing things the hard way
- What is worth self-hosting and what is not (Bitwarden cloud at $10/year is fine)
- NixOS on servers: the declarative dream vs the debugging reality
- Maintenance burden: how much time this actually takes per week
- The 3-2-1 backup strategy and why I should have set it up on day one
- Security posture: what keeps me up at night and what I have done about it

## Conclusion Direction
- The homelab is a platform, not a hobby project. It runs real things.
- The value is in having a place to deploy, experiment, and learn without asking anyone for permission
- Start small: NAS + one service is better than a complex cluster that never gets finished
- Point readers to specific resources that helped the most

## Notes
- Topic type: technical build / walkthrough
- Include a network diagram or architecture overview
- Show real costs: hardware, electricity, time spent
- Be honest about what broke and what was harder than expected
- Mention specific models/specs for hardware so readers can actually replicate
- Cross-reference with NixOS post if it is written by then
- Related vault note: Homelab.md
