# Homepage And Blog Split Finish Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Finish the new personal-site information architecture so `/` is a polished startup landing page, `/blog` is the blog index, `/resume` remains the full resume, and the resulting Jekyll site can be built and visually verified locally.

**Architecture:** Keep the homepage data-driven through Jekyll data files and layout partials. Finish the work in three layers: content/data quality, build/verification setup, and visual QA with real thumbnails. Avoid changing post permalinks or resume structure unless required by verification findings.

**Tech Stack:** Jekyll, Liquid templates, YAML data files, SCSS, shell-based regression checks, optional browse-based screenshot capture.

**Design Source Of Truth:** [DESIGN.md](/Volumes/dev/personalWebsite/DESIGN.md) is authoritative for visual direction. If any existing landing-page code conflicts with it, `DESIGN.md` wins.

## Current State

- `/` already points at a new landing layout via [index.html](/Volumes/dev/personalWebsite/index.html).
- `/blog` already exists via [blog.html](/Volumes/dev/personalWebsite/blog.html).
- Startup cards already read from [_data/startups.yml](/Volumes/dev/personalWebsite/_data/startups.yml).
- A source-level regression check already exists at [scripts/assert_site_structure.sh](/Volumes/dev/personalWebsite/scripts/assert_site_structure.sh).
- The repo still does not have a local Jekyll/Bundler harness, so the site has not been rendered and verified end-to-end.
- Startup thumbnails currently use a fallback block instead of checked-in screenshots because live browser capture was unreliable in-session.

## Non-Goals

- Do not redesign the full resume page.
- Do not change post URLs under `/articles/...`.
- Do not add a JS framework or move off Jekyll.
- Do not broaden the homepage into a full biography page. The startup grid remains the main event.

## Design Constraints From `DESIGN.md`

These are now mandatory for remaining homepage work:

- No gradients, colored section backgrounds, illustrations, or decorative blobs.
- Typography-first editorial/industrial look.
- Left-aligned hero, not a centered “welcome mat”.
- Warm paper palette:
  - bg `#F7F3ED`
  - surface `#EFEBE4`
  - surface-2 `#E6E0D7`
  - text `#1A1714`
  - muted `#6B6159`
  - accent `#B5451B`
  - border `#D4CABC`
  - heavy rule `#B8AB9A`
- Fonts:
  - Satoshi for display/headlines
  - Instrument Sans for body/UI
  - JetBrains Mono for kickers, metadata, domains
- Thick section rules between major sections.
- Card radius should stay restrained, around 8-12px, never bubbly.
- Buttons and pills can use small radii, but not oversized rounded capsules as the dominant motif.
- Hover motion stays minimal: `translateY(-2px)` plus accent/border shift.

## Immediate Design Debt In Current Homepage

The current landing implementation in [_layouts/landing.html](/Volumes/dev/personalWebsite/_layouts/landing.html) and [_sass/pages/_landing.scss](/Volumes/dev/personalWebsite/_sass/pages/_landing.scss) should be treated as interim only. It currently conflicts with `DESIGN.md` in these ways:

- hero uses a gradient background
- hero content is centered instead of left-aligned
- stat cards and CTA buttons are too rounded
- section rhythm relies on spacing rather than thick editorial dividers
- typography does not yet load or apply the specified font stack
- overall surface treatment feels startup-polished rather than editorial/industrial

### Task 1: Add A Local Jekyll Build Harness

**Files:**
- Create: [Gemfile](/Volumes/dev/personalWebsite/Gemfile)
- Create: [.ruby-version](/Volumes/dev/personalWebsite/.ruby-version) if needed for consistency
- Modify: [README.md](/Volumes/dev/personalWebsite/README.md)
- Test: [scripts/assert_site_structure.sh](/Volumes/dev/personalWebsite/scripts/assert_site_structure.sh)

**Step 1: Write the failing verification command**

Run:

```bash
bundle exec jekyll build
```

Expected: fail immediately because the repo currently has no `Gemfile`.

**Step 2: Write minimal build configuration**

Create `Gemfile` with the minimum needed to build this site:

```ruby
source "https://rubygems.org"

gem "jekyll", "~> 4.3"
gem "webrick", "~> 1.8"
```

If the local environment depends on a specific Ruby version, add `.ruby-version`:

```txt
3.2.2
```

**Step 3: Install dependencies**

Run:

```bash
bundle install
```

Expected: `Bundle complete!`

**Step 4: Run the build**

Run:

```bash
bundle exec jekyll build
```

Expected: `_site/` is generated without Liquid or Sass errors.

**Step 5: Update docs**

Replace the current “install Jekyll manually” guidance in [README.md](/Volumes/dev/personalWebsite/README.md) with exact local commands:

```bash
bundle install
bundle exec jekyll build
bundle exec jekyll serve
```

**Step 6: Commit**

```bash
git add Gemfile Gemfile.lock .ruby-version README.md
git commit -m "build: add local jekyll toolchain"
```

### Task 2: Add A Rendered-Site Regression Check

**Files:**
- Modify: [scripts/assert_site_structure.sh](/Volumes/dev/personalWebsite/scripts/assert_site_structure.sh)
- Create: [scripts/assert_rendered_site.sh](/Volumes/dev/personalWebsite/scripts/assert_rendered_site.sh)

**Step 1: Write the failing rendered-site script**

Create a script that checks the built HTML in `_site/`:

```bash
#!/usr/bin/env bash
set -euo pipefail

[ -f _site/index.html ] || { echo "FAIL: missing built home page"; exit 1; }
[ -f _site/blog/index.html ] || { echo "FAIL: missing built blog page"; exit 1; }
[ -f _site/resume/index.html ] || { echo "FAIL: missing built resume page"; exit 1; }

grep -q "Current portfolio" _site/index.html || { echo "FAIL: home page missing startup section"; exit 1; }
grep -q "Latest from the blog" _site/index.html || { echo "FAIL: home page missing blog teaser"; exit 1; }
grep -q "class=\"post-title\"" _site/blog/index.html || { echo "FAIL: blog page missing post listing"; exit 1; }
grep -q "Bio" _site/resume/index.html || { echo "FAIL: resume page missing resume content"; exit 1; }

echo "PASS: rendered site structure looks correct"
```

**Step 2: Run it before the build**

Run:

```bash
./scripts/assert_rendered_site.sh
```

Expected: fail because `_site/` or the new pages are not yet built in this workflow.

**Step 3: Build and rerun**

Run:

```bash
bundle exec jekyll build
./scripts/assert_rendered_site.sh
```

Expected: both pass.

**Step 4: Commit**

```bash
git add scripts/assert_site_structure.sh scripts/assert_rendered_site.sh
git commit -m "test: add rendered site assertions"
```

### Task 3: Replace Placeholder Startup Copy With Final Curated Copy

**Files:**
- Modify: [_data/startups.yml](/Volumes/dev/personalWebsite/_data/startups.yml)
- Reference: [_drafts/2026-02-08-stream-conductor-student-run-broadcasting.md](/Volumes/dev/personalWebsite/_drafts/2026-02-08-stream-conductor-student-run-broadcasting.md)

**Step 1: Review each current description**

Open [_data/startups.yml](/Volumes/dev/personalWebsite/_data/startups.yml) and mark which blurbs are still inferred instead of confirmed from source material.

**Step 2: Rewrite each blurb to a consistent format**

Format rule:
- 1 sentence
- 16-28 words
- concrete product language
- no generic “experiments around” phrasing unless the company is intentionally vague

Example target style:

```yaml
- name: GenTrellis
  domain: gentrellis.com
  url: https://gentrellis.com
  description: Private AI infrastructure for businesses that need on-prem deployment, internal tools, and compliance-friendly automation without sending data to public models.
```

**Step 3: Rebuild and inspect output**

Run:

```bash
bundle exec jekyll build
grep -n "startup-copy" _site/index.html
```

Expected: the updated blurbs appear in the built homepage.

**Step 4: Commit**

```bash
git add _data/startups.yml
git commit -m "content: finalize startup landing copy"
```

### Task 4: Align Landing Page With `DESIGN.md`

**Files:**
- Modify: [_includes/head.html](/Volumes/dev/personalWebsite/_includes/head.html)
- Modify: [_layouts/landing.html](/Volumes/dev/personalWebsite/_layouts/landing.html)
- Modify: [_sass/pages/_landing.scss](/Volumes/dev/personalWebsite/_sass/pages/_landing.scss)
- Modify: [css/main.scss](/Volumes/dev/personalWebsite/css/main.scss) only if import order needs adjustment
- Reference: [DESIGN.md](/Volumes/dev/personalWebsite/DESIGN.md)

**Step 1: Load the fonts specified in `DESIGN.md`**

Add the required external font stylesheets in [_includes/head.html](/Volumes/dev/personalWebsite/_includes/head.html):

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;700&display=swap">
```

**Step 2: Replace the current visual language in `_landing.scss`**

Remove or rewrite rules that violate the design spec:
- gradient hero
- centered hero text/actions
- oversized rounded button shapes
- soft colorful surfaces

Replace with:
- paper background and restrained card surfaces
- thick top borders between major sections
- left-aligned poster-style hero
- monospace kickers and domains
- small-radius controls

Expected SCSS direction:

```scss
.landing-page {
  color: #1A1714;
}

.landing-section {
  border-top: 2px solid #B8AB9A;
  padding-top: 3rem;
}

.landing-kicker,
.startup-domain,
.blog-tease-meta {
  font-family: "JetBrains Mono", monospace;
}
```

**Step 3: Recompose the hero markup if needed**

In [_layouts/landing.html](/Volumes/dev/personalWebsite/_layouts/landing.html):
- keep the startup grid as the main event
- keep the hero left-aligned
- avoid decorative wrapper elements that exist only for styling
- ensure the content itself carries the visual weight

**Step 4: Build and verify**

Run:

```bash
bundle exec jekyll build
./scripts/assert_rendered_site.sh
```

Expected: build passes and rendered assertions still pass after the redesign.

**Step 5: Commit**

```bash
git add _includes/head.html _layouts/landing.html _sass/pages/_landing.scss css/main.scss
git commit -m "style: align landing page with design system"
```

### Task 5: Add Checked-In Startup Thumbnails

**Files:**
- Create: [img/startups/](/Volumes/dev/personalWebsite/img/startups)
- Modify: [_data/startups.yml](/Volumes/dev/personalWebsite/_data/startups.yml)
- Modify: [_layouts/landing.html](/Volumes/dev/personalWebsite/_layouts/landing.html)

**Step 1: Capture one screenshot per startup**

Preferred file names:

```text
img/startups/playtrek.jpg
img/startups/controlsfoundry.jpg
img/startups/gentrellis.jpg
img/startups/latchflow.jpg
img/startups/driftport.jpg
img/startups/levelforge.jpg
img/startups/forgegraph.jpg
img/startups/appealkey.jpg
img/startups/streamconductor.jpg
```

If using the browse workflow, keep each image:
- desktop viewport
- cropped to above-the-fold
- compressed to a web-friendly size

**Step 2: Update startup data**

Replace fallback-only entries with local asset paths:

```yaml
image: /img/startups/playtrek.jpg
```

**Step 3: Update landing layout if needed**

In [_layouts/landing.html](/Volumes/dev/personalWebsite/_layouts/landing.html), support both local images and fallback blocks:

```liquid
{% if startup.image %}
<img src="{{ site.url }}{{ startup.image }}" alt="{{ startup.name }} homepage thumbnail">
{% else %}
<div class="startup-thumb-fallback">
  <span>{{ startup.domain }}</span>
</div>
{% endif %}
```

This avoids broken relative paths when images are stored as root-relative site assets.

**Step 4: Rebuild and verify**

Run:

```bash
bundle exec jekyll build
rg -n "/img/startups/" _site/index.html
```

Expected: all startup cards reference local assets.

**Step 5: Commit**

```bash
git add img/startups _data/startups.yml _layouts/landing.html
git commit -m "feat: add startup thumbnails to landing page"
```

### Task 6: Tighten Homepage Layout And Mobile Behavior

**Files:**
- Modify: [_sass/pages/_landing.scss](/Volumes/dev/personalWebsite/_sass/pages/_landing.scss)
- Modify: [_layouts/landing.html](/Volumes/dev/personalWebsite/_layouts/landing.html)

**Step 1: Write the visual acceptance checklist**

Homepage must satisfy:
- hero buttons wrap cleanly on small screens
- startup cards have equal visual weight
- long startup descriptions do not cause awkward overflow
- overview cards and blog teaser do not look wider or heavier than the startup grid
- top spacing works with the existing sidebar layout

**Step 2: Make targeted CSS fixes**

Likely fixes:

```scss
.startup-card {
  height: 100%;
}

.startup-copy p {
  margin-bottom: 0;
}

.blog-tease-list {
  grid-template-columns: repeat(1, minmax(0, 1fr));

  @include media-query($small-screen) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
```

Only keep rules that solve visible issues after verification.

**Step 3: Run the build**

```bash
bundle exec jekyll build
```

Expected: no Sass compile failures.

**Step 4: Commit**

```bash
git add _sass/pages/_landing.scss _layouts/landing.html
git commit -m "style: polish landing page layout"
```

### Task 7: Make Navigation Match The New Information Architecture

**Files:**
- Modify: [_includes/sidebar.html](/Volumes/dev/personalWebsite/_includes/sidebar.html)
- Modify: [_includes/nav.html](/Volumes/dev/personalWebsite/_includes/nav.html) if needed

**Step 1: Define target nav behavior**

Required nav destinations:
- `/`
- `/blog/`
- `/resume/`
- `/archive/`

Optional:
- external GitHub link in the social area only, not duplicated in nav

**Step 2: Verify generated page-title loop is gone**

The current sidebar already hardcodes nav. Confirm that no Liquid page loop remains that would reintroduce odd ordering or duplicate titles.

**Step 3: Decide on post-nav home target**

If the icon in [_includes/nav.html](/Volumes/dev/personalWebsite/_includes/nav.html) should still return to the site root, leave it.
If blog readers should bounce back to `/blog/`, change only the center icon link:

```liquid
<a href="{{ site.url }}/blog/">
```

Choose one and keep it consistent.

**Step 4: Rebuild and verify**

Run:

```bash
bundle exec jekyll build
rg -n "href=\"https://grahammackie.com/(|blog/|resume/|archive/)\"" _site -g '*.html'
```

Expected: all nav routes appear as intended.

**Step 5: Commit**

```bash
git add _includes/sidebar.html _includes/nav.html
git commit -m "feat: align navigation with new site structure"
```

### Task 8: Improve Homepage SEO And Social Metadata

**Files:**
- Modify: [index.html](/Volumes/dev/personalWebsite/index.html)
- Modify: [_includes/head.html](/Volumes/dev/personalWebsite/_includes/head.html)

**Step 1: Add explicit homepage metadata**

Set front matter on [index.html](/Volumes/dev/personalWebsite/index.html):

```yaml
---
layout: landing
permalink: /
title: Graham Mackie
excerpt: "Startup portfolio, writing, and resume for Graham Mackie."
---
```

**Step 2: Make Open Graph URL page-aware**

In [_includes/head.html](/Volumes/dev/personalWebsite/_includes/head.html), change the static OG URL:

```liquid
<meta property="og:url" content="{{ page.url | replace:'index.html','' | prepend: site.url }}">
```

This prevents all pages from claiming the site root as their canonical OG URL.

**Step 3: Build and verify**

Run:

```bash
bundle exec jekyll build
sed -n '1,80p' _site/index.html
```

Expected: correct title, meta description, canonical URL, and OG URL for the homepage.

**Step 4: Commit**

```bash
git add index.html _includes/head.html
git commit -m "seo: improve homepage metadata"
```

### Task 9: Run Visual QA On Built Pages

**Files:**
- No source changes required unless issues are found
- Verification targets:
  - [_site/index.html](/Volumes/dev/personalWebsite/_site/index.html)
  - [_site/blog/index.html](/Volumes/dev/personalWebsite/_site/blog/index.html)
  - [_site/resume/index.html](/Volumes/dev/personalWebsite/_site/resume/index.html)

**Step 1: Serve the built site locally**

Run:

```bash
bundle exec jekyll serve --host 127.0.0.1 --port 4000
```

**Step 2: Check three pages at desktop and mobile widths**

Verify:
- `/` startup cards look intentional
- `/blog` still behaves like the original post listing
- `/resume` remains readable and unchanged in substance
- sidebar + content column layout does not create clipping or impossible scrolling on mobile

**Step 3: Capture screenshots for review**

Save:

```text
/tmp/personal-site-home-desktop.png
/tmp/personal-site-home-mobile.png
/tmp/personal-site-blog-desktop.png
/tmp/personal-site-resume-desktop.png
```

**Step 4: Fix only observed issues**

If problems appear, loop back to the exact template or Sass file, make the smallest fix, rebuild, and repeat QA.

**Step 5: Commit**

```bash
git add .
git commit -m "qa: verify homepage blog and resume routes"
```

### Task 10: Clean Up Repository Noise And Final Docs

**Files:**
- Modify: [README.md](/Volumes/dev/personalWebsite/README.md)
- Modify: [CLAUDE.md](/Volumes/dev/personalWebsite/CLAUDE.md)
- Review existing unrelated changes like [.gitignore](/Volumes/dev/personalWebsite/.gitignore)

**Step 1: Review repo status carefully**

Run:

```bash
git status --short
```

Expected: only intended files remain staged for this feature. Do not overwrite unrelated user changes.

**Step 2: Update repo docs**

Add a short section describing:
- homepage content lives in `_data/startups.yml`
- blog index lives at `/blog`
- resume stays at `/resume`
- local verification commands

**Step 3: Final verification**

Run:

```bash
./scripts/assert_site_structure.sh
./scripts/assert_rendered_site.sh
bundle exec jekyll build
```

Expected: all green.

**Step 4: Commit**

```bash
git add README.md CLAUDE.md
git commit -m "docs: document homepage and blog workflow"
```

## Recommended Execution Order

1. Task 1, unblock local builds.
2. Task 2, add rendered verification.
3. Task 4, align the landing page with `DESIGN.md` before adding more homepage polish.
4. Task 3, finalize startup copy inside the new visual system.
5. Task 5, add local thumbnails.
6. Task 6, polish layout and mobile behavior.
7. Task 7, confirm nav behavior.
8. Task 8, fix metadata.
9. Task 9, visual QA.
10. Task 10, final docs and cleanup.

## Final Verification Checklist

- `bundle exec jekyll build` succeeds locally
- `./scripts/assert_site_structure.sh` passes
- `./scripts/assert_rendered_site.sh` passes
- `_site/index.html` contains startup grid, overview, and blog teaser
- `_site/blog/index.html` renders the post list
- `_site/resume/index.html` still renders the resume page
- startup cards use checked-in thumbnails or deliberate fallbacks, not broken remote images
- metadata is correct for `/`
- no unrelated user files were reverted

## Risks To Watch

- Jekyll 3 vs 4 differences may affect Sass or permalink behavior
- Existing absolute `site.url` links may make local preview slightly awkward but should still build
- Startup screenshots may require manual cleanup if live sites are slow, gated, or visually unstable
- Sidebar + fixed cover layout may behave poorly on narrow screens and may need a small responsive patch
