---
layout: post
title: "Canyoning Meets Gaussian Splats: 3D-Scanning Slot Canyons"
date: 2026-02-07
excerpt: "What happens when you strap a GoPro to your chest, rappel into a slot canyon, and feed the footage into a Gaussian Splatting pipeline"
categories: [projects]
tags: [canyoning, gaussian-splatting, 3d-reconstruction, photogrammetry, gopro, outdoor]
status: seed
---

## Hook Ideas
- "I rappelled 80 feet into a sandstone canyon with a GoPro on my chest. Six hours of processing later, I could fly through it on my laptop."
- "Trip reports are flat. Photos lose the scale. Video forces you along one path. What if you could hand someone a canyon and let them explore it themselves?"
- "Gaussian splatting was designed for well-lit, static scenes. A wet slot canyon with shifting light beams is the opposite of that. I tried it anyway."

## Outline

### Section 1: Why Canyons Deserve Better Than Photos
- Canyoning is one of the most visually intense outdoor activities -- sculpted sandstone, waterfalls, light beams, emerald pools
- But the experience doesn't translate to 2D media: photos flatten depth, video locks you to one perspective
- The scale problem: you can't feel how tight a squeeze is or how high a rappel is from a photo
- Trip reports and route beta suffer from this -- written descriptions and single-angle shots leave gaps
- What if you could give someone a navigable 3D model of an entire canyon?

### Section 2: Gaussian Splatting in 60 Seconds
- Brief explainer: what 3DGS actually is (point clouds with learned gaussians, not meshes or voxels)
- How it differs from NeRFs (faster rendering, explicit representation, real-time capable)
- The typical pipeline: video/photos -> COLMAP (structure from motion) -> train gaussians -> render
- Why it's suddenly practical: browser-based viewers, consumer GPU training, tools like Nerfstudio and Luma AI
- The aesthetic quality of splats -- painterly, slightly dreamy, which actually suits organic environments

### Section 3: The Capture Problem -- Filming While Canyoning
- Canyoning gear already includes: harness, helmet, wetsuit, rope, rappel device -- adding a camera rig is non-trivial
- GoPro chest mount as the "passive capture" solution: always rolling, hands free for safety
- Helmet mount for supplementary angles and intentional slow pans
- The tension between "capture good footage" and "don't die" -- safety always wins
- Camera settings dilemma: 5.3K vs 4K, stabilization on vs off (EIS warps the image in ways COLMAP hates)

### Section 4: Everything That Goes Wrong in a Wet Canyon
- **Water**: moving water ghosts across frames, creating temporal artifacts the reconstruction can't resolve
- **Specular reflections**: wet rock throws highlights that shift with camera angle, confusing feature matching
- **Lens spray**: waterfalls put droplets on the lens, frames need filtering or the model gets blurry patches
- **Lighting**: slot canyons have brutal dynamic range -- blown-out sky above, deep shadow below
- Honest assessment: these problems don't have clean solutions yet, they have mitigations

### Section 5: The Processing Pipeline
- Frame extraction strategy: not every frame is useful, need to filter for sharpness, exposure, and coverage
- COLMAP: the bottleneck -- structure from motion to estimate camera poses from extracted frames
- When COLMAP fails (and it will): insufficient overlap, repetitive textures (sandstone!), lighting changes
- Training the Gaussian Splat model: Nerfstudio for flexibility, Luma AI for quick cloud-based tests
- Post-processing: removing "floaters," cropping to canyon bounds, color correction

### Section 6: The Result -- Exploring a Canyon in Your Browser
- What the final output looks like and how it feels to navigate
- Embedding a splat viewer in a blog post (three.js + gsplat.js)
- What works well: overall structure, sense of scale, the way light plays on the walls
- What's still rough: water areas, sky blowout, transitions between capture segments

## Conclusion Direction
- This project is still early -- the first models are rough but the potential is obvious
- The failure modes (water, lighting, access) are exactly what make it a compelling technical challenge
- Even imperfect splats convey the sense of place better than any photo gallery
- If you're a canyoneer who also nerds out about 3D tech, there's a lot of unexplored territory here

## Notes
- Topic type: project writeup / technical adventure
- Include embedded splat viewer if possible, otherwise screenshots of the 3D model
- Be honest about quality -- first attempts will be rough, and that's part of the story
- Reference specific canyons by name (Peek-a-boo Gulch, Pine Creek, The Subway)
- Consider splitting into a series if it gets too long
