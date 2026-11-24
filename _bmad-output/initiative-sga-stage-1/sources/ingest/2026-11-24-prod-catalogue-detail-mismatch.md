---
title: Production catalogue empty while vehicle detail OK
description: Ingest note — static build parity, Pages URL, Sanity fetch, and post-publish rebuild.
template: document
ingested: 2026-11-24
source: agent-transcript/c2761140-36cc-41f8-a183-edf184159ef8 (Cursor thread 2026-11-24)
---

# Production catalogue empty while vehicle detail OK

## Summary

After Cloudflare Pages deploy, **`/en/vehicles/{slug}`** showed the Nissan vehicle, but **`/en/vehicles`** and **home featured** showed empty states. Sanity had the vehicle published (later **available**, **featured**). Root cause: static export generated **inconsistent HTML** — catalogue/home built with an empty CMS list while detail routes were generated with slug data (parallel build steps and/or Sanity CDN staleness; deploy on **Pages** URL vs Worker hello-world confusion).

## Decisions and fixes (implemented in repo)

| Item | Evidence / outcome |
|------|---------------------|
| Single vehicle fetch per build worker | `src/content/vehicles.ts` — one `fetchVehicleRows()` for list, featured, slugs, detail |
| Sanity API at build (not CDN default) | `src/content/client.ts` — `useCdn` only when `SANITY_USE_CDN=true` |
| Post-build guard | `scripts/verify-static-vehicles.mjs` — fails build if detail HTML exists but catalogue HTML lacks slug links |
| Ops | `docs/ops-deploy.md`, `docs/cloudflare-dashboard.md` — Workers Builds UI, `npm run pages:deploy`, Pages `*.pages.dev` |
| Content rules | Sold excluded from catalogue; **Featured** required for home strip; **Publish** in Studio + **rebuild** for live site |

## Owner actions

1. Use **`https://sga-headless.pages.dev`** (not `*.workers.dev`) for the marketing site.
2. After Sanity **Publish**, run Cloudflare **build from latest `main`** (not retry old deployment).
3. Push commits with vehicle-fetch + verify changes; confirm build log shows catalogue routes with slug.

## Open / unclear

- Sanity **webhook → rebuild** not live; manual rebuild per AD-7 until configured.
- Custom domain **serendibglobalauto.lk** on Pages project TBD.

## Traceability

- Epic 4 (vehicle catalogue), Epic 5 (deploy ops)
- Architecture AD-5 (build-time Sanity), AD-7 (rebuild)
- FR-61–62, FR-64a–b