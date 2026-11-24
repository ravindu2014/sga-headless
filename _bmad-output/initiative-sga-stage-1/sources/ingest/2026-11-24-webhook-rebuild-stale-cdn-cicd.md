---
title: Webhook rebuild did not surface new vehicle; CI/CD dedupe
description: Ingest — Daihatsu publish, Pages stale, CDN at build, canonical deploy path.
template: document
ingested: 2026-11-24
source: Cursor thread 2026-11-24; commit f9609f0
---

# Webhook ran but new vehicle missing on Pages

## Summary

After publishing **2025-daihatsu-rocky-g-premium** in Sanity, the **sga-sanity-rebuild** Worker triggered **Rebuild site**. Live **`sga-headless.pages.dev`** still showed only the Nissan on `/en/vehicles`; Daihatsu detail returned **404**. Sanity API returned both vehicles as **available**.

## Causes

| Layer | Finding |
|-------|---------|
| Deploy | Webhook triggers **build**; **Pages** updates only if **Deploy to Cloudflare Pages** succeeds (`CLOUDFLARE_DEPLOY_ENABLED=true` + secrets). |
| Sanity CDN | `src/content/client.ts` had **`useCdn: true`** by default — builds immediately after publish can miss new documents. |
| SSG parallelism | Module-level vehicle cache was not reliable across parallel static pages; fixed with **`unstable_cache`** (one list per export). |
| CI overlap | **CI** and **Rebuild** both ran on every `main` push → duplicate builds; **CI** now **PR-only**. |
| Cloudflare clutter | Git-connected **Worker** `sga-headless` vs **Pages** `sga-headless` — canonical host is **Pages**; Worker Git build should be removed. |

## Fixes (f9609f0)

- `SANITY_USE_CDN` opt-in; workflows set API mode for builds.
- `unstable_cache` for vehicle rows; verify accepts `/en/vehicles/{slug}` in catalogue HTML.
- `docs/ops-deploy.md` **Canonical CI/CD** table (GitHub build+deploy; Pages + webhook Worker only).

## Owner verification

1. Actions → **Rebuild site** on `main`: build + deploy green.
2. `https://sga-headless.pages.dev/en/vehicles` lists both slugs.
3. Delete/disconnect Cloudflare **Worker** `sga-headless` (Git), keep **Pages** + **sga-sanity-rebuild**.

## Traceability

- Epic 4 story id 1 (parity + API snapshot)
- Epic 5 story id 1 (webhook), ops canonical deploy (story id 3)
- AD-5, AD-7