# ForgeGraph Public Portfolio Feed Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make ForgeGraph the source of truth for public app inventory, screenshots, and status so `gmac.io` and `gmacko.com` auto-populate from a sanitized near-realtime feed instead of manual YAML.

**Architecture:** Split the work into three layers. ForgeGraph stores both machine truth and public-facing overlay metadata, then publishes immutable feed generations plus a mutable `manifest.json` pointer. `personalWebsite` remains a Jekyll static site, but `gmac.io` and selected `gmacko.com` sections hydrate client-side from the published feed instead of relying on build-time YAML.

**Tech Stack:** ForgeGraph monorepo (`Next.js`, route handlers, Drizzle/Postgres, pnpm, TypeScript), personalWebsite (`Jekyll`, Liquid, vanilla JS), static JSON + screenshot assets served from `data.gmac.io`.

**Design Source Of Truth:** [mackieg-main-design-20260408-145011.md](/Users/mackieg/.gstack/projects/gmackie-personalWebsite/mackieg-main-design-20260408-145011.md) plus the engineering decisions from the 2026-04-10 eng review in this conversation.

## Critical Architecture Decisions

- **Single source of truth:** ForgeGraph owns both machine truth and public overlay metadata for v1.
- **No repo-owned CMS:** `personalWebsite` consumes the feed; it does not remain the place where new apps are registered.
- **Publish model:** ForgeGraph publishes immutable generations under `https://data.gmac.io/forgegraph/v1/generations/<generation_id>/...` and atomically updates `https://data.gmac.io/forgegraph/v1/manifest.json`.
- **v1 feed contract:** Expose only `public_status`, `last_checked_at`, `last_deploy_at`, `screenshot_taken_at`, `screenshot_url`, `description`, `thesis`, `featured`, `site_targets`, `kind`, `sort_order`, and a coarse `public_infra_class`.
- **Last-good semantics:** If a screenshot or publish job fails, keep the prior generation live and mark the app stale. Never publish partial generations.
- **Hydration scope:** `gmac.io` hydrates its main dashboard. `gmacko.com` hydrates only portfolio/experiment sections and keeps a static fallback shell.

## Repo Boundaries

### ForgeGraph repo

Root: [/Volumes/dev/ForgeGraph](/Volumes/dev/ForgeGraph)

Relevant existing files:
- App schema: [/Volumes/dev/ForgeGraph/packages/db/src/schema/app.ts](/Volumes/dev/ForgeGraph/packages/db/src/schema/app.ts)
- Schema index: [/Volumes/dev/ForgeGraph/packages/db/src/schema/index.ts](/Volumes/dev/ForgeGraph/packages/db/src/schema/index.ts)
- Existing app API list/create: [/Volumes/dev/ForgeGraph/apps/web/src/app/api/fg/apps/route.ts](/Volumes/dev/ForgeGraph/apps/web/src/app/api/fg/apps/route.ts)
- Existing app detail route: [/Volumes/dev/ForgeGraph/apps/web/src/app/api/fg/apps/[slug]/route.ts](/Volumes/dev/ForgeGraph/apps/web/src/app/api/fg/apps/%5Bslug%5D/route.ts)
- Agent heartbeat ingestion: [/Volumes/dev/ForgeGraph/apps/web/src/app/api/agent/heartbeat/route.ts](/Volumes/dev/ForgeGraph/apps/web/src/app/api/agent/heartbeat/route.ts)
- Existing service snapshots: [/Volumes/dev/ForgeGraph/packages/db/src/schema/service-snapshot.ts](/Volumes/dev/ForgeGraph/packages/db/src/schema/service-snapshot.ts)
- Existing deployments: [/Volumes/dev/ForgeGraph/packages/db/src/schema/deployment.ts](/Volumes/dev/ForgeGraph/packages/db/src/schema/deployment.ts)

### personalWebsite repo

Root: [/Volumes/dev/personalWebsite](/Volumes/dev/personalWebsite)

Relevant existing files:
- gmac dashboard layout: [/Volumes/dev/personalWebsite/_layouts/dashboard.html](/Volumes/dev/personalWebsite/_layouts/dashboard.html)
- gmacko landing layout: [/Volumes/dev/personalWebsite/_layouts/landing.html](/Volumes/dev/personalWebsite/_layouts/landing.html)
- Current gmac services data: [/Volumes/dev/personalWebsite/_data/gmac/services.yml](/Volumes/dev/personalWebsite/_data/gmac/services.yml)
- Current gmac prototypes data: [/Volumes/dev/personalWebsite/_data/gmac/prototypes.yml](/Volumes/dev/personalWebsite/_data/gmac/prototypes.yml)
- Current ventures data: [/Volumes/dev/personalWebsite/_data/ventures.yml](/Volumes/dev/personalWebsite/_data/ventures.yml)
- Existing rendered visibility assertion: [/Volumes/dev/personalWebsite/scripts/assert_experiment_visibility.sh](/Volumes/dev/personalWebsite/scripts/assert_experiment_visibility.sh)

## Feed Contract

### `manifest.json`

Path:
- `https://data.gmac.io/forgegraph/v1/manifest.json`

Shape:

```json
{
  "generation_id": "2026-04-10T21-15-00Z",
  "published_at": "2026-04-10T21:15:02Z",
  "apps_url": "https://data.gmac.io/forgegraph/v1/generations/2026-04-10T21-15-00Z/apps.json",
  "summary_url": "https://data.gmac.io/forgegraph/v1/generations/2026-04-10T21-15-00Z/summary.json",
  "timeline_url": "https://data.gmac.io/forgegraph/v1/generations/2026-04-10T21-15-00Z/timeline.json"
}
```

### `apps.json`

```json
{
  "generation_id": "2026-04-10T21-15-00Z",
  "published_at": "2026-04-10T21:15:02Z",
  "apps": [
    {
      "slug": "playtrek",
      "name": "PlayTrek.ai",
      "primary_url": "https://playtrek.ai",
      "kind": "venture",
      "site_targets": ["gmac", "gmacko"],
      "featured": true,
      "public_status": "healthy",
      "last_checked_at": "2026-04-10T21:14:30Z",
      "last_deploy_at": "2026-04-10T20:51:11Z",
      "screenshot_url": "https://data.gmac.io/forgegraph/v1/generations/2026-04-10T21-15-00Z/screenshots/playtrek.webp",
      "screenshot_taken_at": "2026-04-10T21:14:40Z",
      "freshness": "fresh",
      "description": "Adaptive learning inside the games kids already play.",
      "thesis": "Kids learn better inside games they're already playing.",
      "tags": ["ai", "education", "gaming"],
      "sort_order": 30,
      "public_infra_class": "edge-plus-metal"
    }
  ]
}
```

### `summary.json`

```json
{
  "generation_id": "2026-04-10T21-15-00Z",
  "published_at": "2026-04-10T21:15:02Z",
  "counts": {
    "total": 14,
    "healthy": 10,
    "degraded": 1,
    "down": 0,
    "building": 1,
    "private": 2
  },
  "deploys_last_24h": 5,
  "screenshots_fresh_last_hour": 9
}
```

## Rollout Stages

1. **ForgeGraph schema and metadata ownership**
2. **ForgeGraph publisher and immutable generation contract**
3. **Public hosting on `data.gmac.io`**
4. **`gmac.io` hydration**
5. **`gmacko.com` hydration**
6. **Fallback removal and cutover**

## Task 1: Add Public Overlay Metadata To ForgeGraph

**Files:**
- Create: [/Volumes/dev/ForgeGraph/packages/db/src/schema/public-app-overlay.ts](/Volumes/dev/ForgeGraph/packages/db/src/schema/public-app-overlay.ts)
- Modify: [/Volumes/dev/ForgeGraph/packages/db/src/schema/index.ts](/Volumes/dev/ForgeGraph/packages/db/src/schema/index.ts)
- Create: `/Volumes/dev/ForgeGraph/packages/db/drizzle/0040_public_app_overlay.sql`
- Test: Create `/Volumes/dev/ForgeGraph/packages/db/src/schema/public-app-overlay.test.ts` if schema tests already exist nearby, otherwise validate through route tests in Task 2

**Step 1: Write the failing route test first**

Create the route test in Task 2 before writing this schema so the missing table/fields fail for the expected reason.

**Step 2: Add the overlay table**

Create `public-app-overlay.ts`:

```ts
import { pgEnum, pgTable, text, boolean, integer, timestamp, jsonb, uniqueIndex, index } from "drizzle-orm/pg-core";
import { apps } from "./app";

export const publicStatusEnum = pgEnum("public_status", [
  "healthy",
  "degraded",
  "down",
  "building",
  "private",
  "unknown",
]);

export const publicAppKindEnum = pgEnum("public_app_kind", [
  "venture",
  "experiment",
  "service",
]);

export const publicAppOverlays = pgTable(
  "public_app_overlays",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    appId: text("app_id").notNull().references(() => apps.id),
    publicEnabled: boolean("public_enabled").notNull().default(false),
    featured: boolean("featured").notNull().default(false),
    kind: publicAppKindEnum("kind").notNull().default("venture"),
    siteTargets: jsonb("site_targets").$type<Array<"gmac" | "gmacko">>().notNull().default(["gmac"]),
    description: text("description"),
    thesis: text("thesis"),
    recruiterNote: text("recruiter_note"),
    publicInfraClass: text("public_infra_class"),
    tags: jsonb("tags").$type<string[]>().notNull().default([]),
    sortOrder: integer("sort_order").notNull().default(100),
    screenshotEnabled: boolean("screenshot_enabled").notNull().default(true),
    screenshotPath: text("screenshot_path"),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("public_app_overlay_app_id_idx").on(table.appId),
    index("public_app_overlay_enabled_idx").on(table.publicEnabled),
  ],
);
```

**Step 3: Export the new schema**

Update `packages/db/src/schema/index.ts`:

```ts
export * from "./public-app-overlay";
```

**Step 4: Add the migration**

Create `packages/db/drizzle/0040_public_app_overlay.sql` with the matching SQL for the enum + table.

**Step 5: Run typecheck**

Run:

```bash
cd /Volumes/dev/ForgeGraph
pnpm --filter @forgegraph/db typecheck
```

Expected: no TypeScript errors.

**Step 6: Commit**

```bash
cd /Volumes/dev/ForgeGraph
git add packages/db/src/schema/public-app-overlay.ts packages/db/src/schema/index.ts packages/db/drizzle/0040_public_app_overlay.sql
git commit -m "feat: add public app overlay metadata"
```

## Task 2: Add A Public Feed Builder In ForgeGraph

**Files:**
- Create: [/Volumes/dev/ForgeGraph/apps/web/src/lib/public-feed/types.ts](/Volumes/dev/ForgeGraph/apps/web/src/lib/public-feed/types.ts)
- Create: [/Volumes/dev/ForgeGraph/apps/web/src/lib/public-feed/build-public-feed.ts](/Volumes/dev/ForgeGraph/apps/web/src/lib/public-feed/build-public-feed.ts)
- Create: [/Volumes/dev/ForgeGraph/apps/web/src/lib/public-feed/freshness.ts](/Volumes/dev/ForgeGraph/apps/web/src/lib/public-feed/freshness.ts)
- Create: [/Volumes/dev/ForgeGraph/apps/web/src/lib/public-feed/__tests__/build-public-feed.test.ts](/Volumes/dev/ForgeGraph/apps/web/src/lib/public-feed/__tests__/build-public-feed.test.ts)
- Reference existing sources:
  - [/Volumes/dev/ForgeGraph/packages/db/src/schema/app.ts](/Volumes/dev/ForgeGraph/packages/db/src/schema/app.ts)
  - [/Volumes/dev/ForgeGraph/packages/db/src/schema/service-snapshot.ts](/Volumes/dev/ForgeGraph/packages/db/src/schema/service-snapshot.ts)
  - [/Volumes/dev/ForgeGraph/packages/db/src/schema/deployment.ts](/Volumes/dev/ForgeGraph/packages/db/src/schema/deployment.ts)

**Step 1: Write the failing test**

Create `build-public-feed.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { buildPublicFeed } from "../build-public-feed";

describe("buildPublicFeed", () => {
  it("builds a public app list from overlays plus app state", async () => {
    const feed = await buildPublicFeed({
      overlays: [
        {
          appId: "app_1",
          publicEnabled: true,
          featured: true,
          kind: "venture",
          siteTargets: ["gmac", "gmacko"],
          description: "Adaptive learning inside the games kids already play.",
          thesis: "Kids learn better inside games they're already playing.",
          recruiterNote: null,
          publicInfraClass: "edge-plus-metal",
          tags: ["ai", "education"],
          sortOrder: 30,
          screenshotEnabled: true,
          screenshotPath: "playtrek.webp",
        },
      ],
      apps: [
        {
          id: "app_1",
          slug: "playtrek",
          name: "PlayTrek.ai",
          healthCheckUrl: "https://playtrek.ai/health",
        },
      ],
      latestHealthByAppId: {
        app_1: { checkedAt: new Date("2026-04-10T21:14:30Z"), healthy: true },
      },
      latestDeploymentByAppId: {
        app_1: { deployedAt: new Date("2026-04-10T20:51:11Z") },
      },
      generationId: "2026-04-10T21-15-00Z",
      publishedAt: new Date("2026-04-10T21:15:02Z"),
      screenshotBaseUrl: "https://data.gmac.io/forgegraph/v1/generations/2026-04-10T21-15-00Z/screenshots",
    });

    expect(feed.apps).toHaveLength(1);
    expect(feed.apps[0]).toMatchObject({
      slug: "playtrek",
      site_targets: ["gmac", "gmacko"],
      featured: true,
      public_status: "healthy",
      freshness: "fresh",
    });
  });
});
```

**Step 2: Run the test to verify RED**

Run:

```bash
cd /Volumes/dev/ForgeGraph
pnpm test -- --runInBand build-public-feed
```

Expected: fail because `buildPublicFeed` does not exist yet.

**Step 3: Implement the feed builder**

Create `types.ts` with explicit serializable contracts. Create `freshness.ts` with pure helpers for `fresh | recent | stale | unknown`. Create `build-public-feed.ts` to merge:
- app row
- overlay row
- latest health state
- latest deployment
- generation metadata

Implementation rule:
- skip overlays where `publicEnabled === false`
- never emit an app without a matching overlay
- never emit raw node IDs, IPs, internal service names, or credentials

**Step 4: Run the test to verify GREEN**

Run:

```bash
cd /Volumes/dev/ForgeGraph
pnpm test -- --runInBand build-public-feed
```

Expected: pass.

**Step 5: Commit**

```bash
cd /Volumes/dev/ForgeGraph
git add apps/web/src/lib/public-feed
git commit -m "feat: add ForgeGraph public feed builder"
```

## Task 3: Add Immutable Generation Publishing In ForgeGraph

**Files:**
- Create: [/Volumes/dev/ForgeGraph/apps/web/src/lib/public-feed/publish-generation.ts](/Volumes/dev/ForgeGraph/apps/web/src/lib/public-feed/publish-generation.ts)
- Create: [/Volumes/dev/ForgeGraph/apps/web/src/lib/public-feed/storage.ts](/Volumes/dev/ForgeGraph/apps/web/src/lib/public-feed/storage.ts)
- Create: [/Volumes/dev/ForgeGraph/apps/web/src/lib/public-feed/__tests__/publish-generation.test.ts](/Volumes/dev/ForgeGraph/apps/web/src/lib/public-feed/__tests__/publish-generation.test.ts)
- Create: [/Volumes/dev/ForgeGraph/apps/web/src/app/api/public/feed/publish/route.ts](/Volumes/dev/ForgeGraph/apps/web/src/app/api/public/feed/publish/route.ts)
- Create: [/Volumes/dev/ForgeGraph/apps/web/src/app/api/public/feed/manifest/route.ts](/Volumes/dev/ForgeGraph/apps/web/src/app/api/public/feed/manifest/route.ts)
- Create: [/Volumes/dev/ForgeGraph/apps/web/src/app/api/public/feed/apps/route.ts](/Volumes/dev/ForgeGraph/apps/web/src/app/api/public/feed/apps/route.ts)

**Step 1: Write the failing publish test**

Create `publish-generation.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { publishGeneration } from "../publish-generation";

describe("publishGeneration", () => {
  it("writes a complete generation before updating manifest", async () => {
    const writes: string[] = [];

    await publishGeneration({
      generationId: "2026-04-10T21-15-00Z",
      payloads: {
        apps: { apps: [] },
        summary: { counts: { total: 0 } },
        timeline: { items: [] },
      },
      writeFile: async (path) => {
        writes.push(path);
      },
    });

    expect(writes.at(-1)).toBe("forgegraph/v1/manifest.json");
  });
});
```

**Step 2: Run RED**

Run:

```bash
cd /Volumes/dev/ForgeGraph
pnpm test -- --runInBand publish-generation
```

Expected: fail because publisher does not exist.

**Step 3: Implement the publisher**

`publish-generation.ts` must:
- write `apps.json`, `summary.json`, `timeline.json` into `forgegraph/v1/generations/<generation_id>/`
- write screenshots into `forgegraph/v1/generations/<generation_id>/screenshots/`
- write `manifest.json` last
- never mutate previous generations

Use `storage.ts` as the abstraction layer so v1 can target filesystem + rsync, and v2 can target object storage without rewriting the publisher logic.

**Step 4: Add public read routes**

For ForgeGraph-hosted debugging and local development, add read-only unauthenticated routes:
- `/api/public/feed/manifest`
- `/api/public/feed/apps`

These are for local preview and debugging only. Production `data.gmac.io` still serves the published static files.

**Step 5: Run GREEN**

Run:

```bash
cd /Volumes/dev/ForgeGraph
pnpm test -- --runInBand publish-generation
pnpm --filter @forgegraph/web typecheck
```

Expected: both pass.

**Step 6: Commit**

```bash
cd /Volumes/dev/ForgeGraph
git add apps/web/src/lib/public-feed apps/web/src/app/api/public/feed
git commit -m "feat: publish immutable public feed generations"
```

## Task 4: Add Screenshot Capture Metadata And Last-Good Semantics

**Files:**
- Modify: [/Volumes/dev/ForgeGraph/packages/db/src/schema/app.ts](/Volumes/dev/ForgeGraph/packages/db/src/schema/app.ts)
- Create: `/Volumes/dev/ForgeGraph/packages/db/drizzle/0041_public_screenshot_fields.sql`
- Create: [/Volumes/dev/ForgeGraph/apps/web/src/lib/public-feed/screenshot-policy.ts](/Volumes/dev/ForgeGraph/apps/web/src/lib/public-feed/screenshot-policy.ts)
- Create: [/Volumes/dev/ForgeGraph/apps/web/src/lib/public-feed/__tests__/screenshot-policy.test.ts](/Volumes/dev/ForgeGraph/apps/web/src/lib/public-feed/__tests__/screenshot-policy.test.ts)

**Step 1: Write the failing screenshot freshness test**

Create `screenshot-policy.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { deriveScreenshotFreshness } from "../screenshot-policy";

describe("deriveScreenshotFreshness", () => {
  it("returns stale when the last screenshot is older than two hours", () => {
    expect(
      deriveScreenshotFreshness({
        screenshotTakenAt: new Date("2026-04-10T18:00:00Z"),
        now: new Date("2026-04-10T21:15:00Z"),
      }),
    ).toBe("stale");
  });
});
```

**Step 2: Run RED**

Run:

```bash
cd /Volumes/dev/ForgeGraph
pnpm test -- --runInBand screenshot-policy
```

Expected: fail because helper does not exist.

**Step 3: Add minimal persistence fields**

Extend `app.ts` with fields that let the publisher point at the last known good capture:

```ts
lastPublicScreenshotPath: text("last_public_screenshot_path"),
lastPublicScreenshotAt: timestamp("last_public_screenshot_at", { withTimezone: true }),
lastPublicFeedPublishedAt: timestamp("last_public_feed_published_at", { withTimezone: true }),
```

Add matching migration `0041_public_screenshot_fields.sql`.

**Step 4: Implement screenshot freshness helper**

`screenshot-policy.ts` should expose pure helpers:
- `deriveScreenshotFreshness`
- `shouldReusePreviousScreenshot`

**Step 5: Run GREEN**

Run:

```bash
cd /Volumes/dev/ForgeGraph
pnpm test -- --runInBand screenshot-policy
pnpm --filter @forgegraph/db typecheck
```

Expected: both pass.

**Step 6: Commit**

```bash
cd /Volumes/dev/ForgeGraph
git add packages/db/src/schema/app.ts packages/db/drizzle/0041_public_screenshot_fields.sql apps/web/src/lib/public-feed/screenshot-policy.ts apps/web/src/lib/public-feed/__tests__/screenshot-policy.test.ts
git commit -m "feat: add public screenshot freshness metadata"
```

## Task 5: Create The `data.gmac.io` Feed Host

**Files:**
- Create: `/Volumes/dev/ForgeGraph/docs/plans/2026-04-10-data-gmac-io-feed-host.md`
- Create: `/Volumes/dev/ForgeGraph/scripts/publish-public-feed.sh`
- Modify if needed: `/etc/caddy/Caddyfile` on `root@gmac.io` (ops step, not repo-tracked unless you already store infra config elsewhere)

**Step 1: Write the failing dry-run**

Run:

```bash
cd /Volumes/dev/ForgeGraph
bash scripts/publish-public-feed.sh
```

Expected: fail because the script does not exist.

**Step 2: Create the publish script**

`publish-public-feed.sh` should:
- read generated artifacts from a local output directory
- rsync them to `root@gmac.io:/var/www/data.gmac.io/forgegraph/v1/`
- preserve immutable generations
- replace only `manifest.json` atomically at the end

Starter script:

```bash
#!/usr/bin/env bash
set -euo pipefail

OUT_DIR="${1:-.tmp/public-feed}"
REMOTE_ROOT="root@gmac.io:/var/www/data.gmac.io/forgegraph/v1"

test -f "$OUT_DIR/manifest.json"

rsync -avz "$OUT_DIR/generations/" "$REMOTE_ROOT/generations/"
rsync -avz "$OUT_DIR/manifest.json" "$REMOTE_ROOT/manifest.json.next"
ssh root@gmac.io "mv /var/www/data.gmac.io/forgegraph/v1/manifest.json.next /var/www/data.gmac.io/forgegraph/v1/manifest.json"
```

**Step 3: Add the host doc**

Document:
- docroot path
- Caddy vhost
- cache headers
- rollback procedure

**Step 4: Run GREEN**

Run:

```bash
cd /Volumes/dev/ForgeGraph
bash scripts/publish-public-feed.sh .tmp/public-feed
```

Expected: rsync succeeds against the remote docroot.

**Step 5: Commit**

```bash
cd /Volumes/dev/ForgeGraph
git add docs/plans/2026-04-10-data-gmac-io-feed-host.md scripts/publish-public-feed.sh
git commit -m "ops: add public feed publish workflow"
```

## Task 6: Hydrate `gmac.io` From The Public Feed

**Files:**
- Create: [/Volumes/dev/personalWebsite/js/public-feed.js](/Volumes/dev/personalWebsite/js/public-feed.js)
- Modify: [/Volumes/dev/personalWebsite/_layouts/dashboard.html](/Volumes/dev/personalWebsite/_layouts/dashboard.html)
- Modify: [/Volumes/dev/personalWebsite/css/main.scss](/Volumes/dev/personalWebsite/css/main.scss) only if required to import a new dashboard partial
- Create if needed: [/Volumes/dev/personalWebsite/_sass/pages/_dashboard-live.scss](/Volumes/dev/personalWebsite/_sass/pages/_dashboard-live.scss)
- Test: Modify [/Volumes/dev/personalWebsite/scripts/assert_experiment_visibility.sh](/Volumes/dev/personalWebsite/scripts/assert_experiment_visibility.sh)

**Step 1: Write the failing rendered assertion**

Update `assert_experiment_visibility.sh` so it builds the site, injects a stub `manifest.json` + `apps.json` into a local test host path, and checks for:
- `bizpulse.cc`
- `blder.bot`
- `data-generation-id` or equivalent hydration marker

Expected failure reason: dashboard still renders only YAML.

**Step 2: Add a dashboard shell**

Modify `_layouts/dashboard.html`:
- replace direct Liquid card rendering with:
  - an empty shell container
  - a `<noscript>` fallback listing current YAML-backed entries
  - a bootstrap element containing `data-feed-manifest-url="https://data.gmac.io/forgegraph/v1/manifest.json"`

**Step 3: Implement client hydration**

Create `js/public-feed.js`:

```js
async function loadPublicFeed(manifestUrl) {
  const manifest = await fetch(manifestUrl, { cache: "no-store" }).then((r) => r.json());
  const apps = await fetch(manifest.apps_url, { cache: "no-store" }).then((r) => r.json());
  return { manifest, apps };
}
```

Then:
- filter `site_targets` for `gmac`
- split by `kind`
- render cards with screenshot + status + deploy/screenshot ages
- fall back to the static `<noscript>`/server-rendered shell on error

**Step 4: Run GREEN**

Run:

```bash
cd /Volumes/dev/personalWebsite
./scripts/assert_experiment_visibility.sh
bundle exec jekyll build --config _config.yml,_config.gmac.yml --destination _site_gmac
```

Expected: test passes and build succeeds.

**Step 5: Commit**

```bash
cd /Volumes/dev/personalWebsite
git add _layouts/dashboard.html js/public-feed.js _sass/pages/_dashboard-live.scss css/main.scss scripts/assert_experiment_visibility.sh
git commit -m "feat: hydrate gmac dashboard from ForgeGraph public feed"
```

## Task 7: Hydrate `gmacko.com` Portfolio Sections From The Same Feed

**Files:**
- Modify: [/Volumes/dev/personalWebsite/_layouts/landing.html](/Volumes/dev/personalWebsite/_layouts/landing.html)
- Modify: [/Volumes/dev/personalWebsite/_includes/venture-card.html](/Volumes/dev/personalWebsite/_includes/venture-card.html)
- Create: [/Volumes/dev/personalWebsite/js/gmacko-public-feed.js](/Volumes/dev/personalWebsite/js/gmacko-public-feed.js)
- Create if needed: [/Volumes/dev/personalWebsite/_sass/pages/_gmacko-live.scss](/Volumes/dev/personalWebsite/_sass/pages/_gmacko-live.scss)
- Test: Create [/Volumes/dev/personalWebsite/scripts/assert_gmacko_feed_sections.sh](/Volumes/dev/personalWebsite/scripts/assert_gmacko_feed_sections.sh)

**Step 1: Write the failing gmacko assertion**

Create `assert_gmacko_feed_sections.sh` to verify the homepage includes feed-backed `bizpulse.cc` and `blder.bot` in the experiments/portfolio grouping.

Run:

```bash
cd /Volumes/dev/personalWebsite
./scripts/assert_gmacko_feed_sections.sh
```

Expected: fail because landing page still reads build-time `site.data.ventures`.

**Step 2: Add feed-backed portfolio islands**

Modify `_layouts/landing.html`:
- keep the hero and editorial framing server-rendered
- replace only the venture-group card collections with bootstrap containers
- keep a static fallback copy block so the page does not look broken before hydration

**Step 3: Implement `gmacko-public-feed.js`**

The script should:
- reuse the same manifest/apps fetch path as `gmac`
- filter `site_targets` for `gmacko`
- group by `kind/category`
- render screenshot-backed venture cards
- preserve current narrative labels like “Infrastructure & AI”, “Experiments”, etc.

**Step 4: Run GREEN**

Run:

```bash
cd /Volumes/dev/personalWebsite
./scripts/assert_gmacko_feed_sections.sh
bundle exec jekyll build --config _config.yml,_config.gmacko.yml --destination _site_gmacko
```

Expected: test passes and build succeeds.

**Step 5: Commit**

```bash
cd /Volumes/dev/personalWebsite
git add _layouts/landing.html _includes/venture-card.html js/gmacko-public-feed.js _sass/pages/_gmacko-live.scss scripts/assert_gmacko_feed_sections.sh
git commit -m "feat: hydrate gmacko portfolio sections from ForgeGraph feed"
```

## Task 8: Cut Over And Remove YAML As Primary Source

**Files:**
- Modify: [/Volumes/dev/personalWebsite/_data/gmac/services.yml](/Volumes/dev/personalWebsite/_data/gmac/services.yml)
- Modify: [/Volumes/dev/personalWebsite/_data/gmac/prototypes.yml](/Volumes/dev/personalWebsite/_data/gmac/prototypes.yml)
- Modify: [/Volumes/dev/personalWebsite/_data/ventures.yml](/Volumes/dev/personalWebsite/_data/ventures.yml)
- Modify: [/Volumes/dev/personalWebsite/README.md](/Volumes/dev/personalWebsite/README.md)
- Modify: [/Volumes/dev/personalWebsite/CLAUDE.md](/Volumes/dev/personalWebsite/CLAUDE.md)

**Step 1: Add a temporary migration note, not a silent delete**

For one release, keep the YAML files but mark them as fallback-only in comments and docs.

**Step 2: Remove them from primary rendering**

Once feed hydration is proven stable, update docs to say:
- ForgeGraph public feed is the primary source
- YAML fallback exists only for local no-network rendering or emergency rollback

**Step 3: Verification**

Run:

```bash
cd /Volumes/dev/personalWebsite
bundle exec jekyll build --config _config.yml,_config.gmac.yml --destination _site_gmac
bundle exec jekyll build --config _config.yml,_config.gmacko.yml --destination _site_gmacko
./scripts/assert_experiment_visibility.sh
./scripts/assert_gmacko_feed_sections.sh
```

Then verify live:

```bash
curl -fsSL https://gmac.io/ | rg "bizpulse\\.cc|blder\\.bot"
curl -fsSL https://gmacko.com/ | rg "bizpulse\\.cc|blder\\.bot"
curl -fsSL https://data.gmac.io/forgegraph/v1/manifest.json | jq .
```

Expected:
- both public sites render the same feed-backed apps
- manifest is reachable
- no manual YAML edit was required to add a newly-public ForgeGraph app

**Step 4: Commit**

```bash
cd /Volumes/dev/personalWebsite
git add _data/gmac/services.yml _data/gmac/prototypes.yml _data/ventures.yml README.md CLAUDE.md
git commit -m "docs: mark ForgeGraph feed as primary public inventory source"
```

## Failure Modes To Test Explicitly

- Feed generation writes `apps.json` but fails before `manifest.json` update.
  Expected: clients still read prior generation.
- Screenshot capture fails for one app.
  Expected: prior screenshot remains visible and freshness becomes `stale`.
- An app exists in ForgeGraph with no public overlay row.
  Expected: it does not appear publicly.
- An app overlay is public but has no screenshot yet.
  Expected: card renders with fallback treatment and `freshness: unknown`.
- `data.gmac.io` is unavailable during page load.
  Expected: static shell/fallback content remains usable.
- Feed contains a new `kind` not recognized by the site.
  Expected: site ignores unknown cards or buckets them safely; it does not crash rendering.

## Final Verification Checklist

### ForgeGraph

Run:

```bash
cd /Volumes/dev/ForgeGraph
pnpm --filter @forgegraph/db typecheck
pnpm --filter @forgegraph/web typecheck
pnpm test -- --runInBand build-public-feed
pnpm test -- --runInBand publish-generation
pnpm test -- --runInBand screenshot-policy
```

### personalWebsite

Run:

```bash
cd /Volumes/dev/personalWebsite
bundle exec jekyll build --config _config.yml,_config.gmac.yml --destination _site_gmac
bundle exec jekyll build --config _config.yml,_config.gmacko.yml --destination _site_gmacko
./scripts/assert_experiment_visibility.sh
./scripts/assert_gmacko_feed_sections.sh
```

### Live smoke

Run:

```bash
curl -fsSL https://data.gmac.io/forgegraph/v1/manifest.json | jq .
curl -fsSL https://gmac.io/ | rg "data.gmac.io|bizpulse\\.cc|blder\\.bot"
curl -fsSL https://gmacko.com/ | rg "data.gmac.io|bizpulse\\.cc|blder\\.bot"
```

## Recommended Commit Order

1. `feat: add public app overlay metadata`
2. `feat: add ForgeGraph public feed builder`
3. `feat: publish immutable public feed generations`
4. `feat: add public screenshot freshness metadata`
5. `ops: add public feed publish workflow`
6. `feat: hydrate gmac dashboard from ForgeGraph public feed`
7. `feat: hydrate gmacko portfolio sections from ForgeGraph feed`
8. `docs: mark ForgeGraph feed as primary public inventory source`

## Notes For The Implementer

- Do not build a second admin UI in `personalWebsite`.
- Do not let `personalWebsite` invent fields that ForgeGraph does not own.
- Do not publish mutable screenshots outside generation directories.
- Do not expose raw node IDs, private domains, IPs, or per-node internals in the v1 feed.
- Keep the first ship boring. Public cards and freshness are the product. Fancy topology and recruiter mode can wait.
