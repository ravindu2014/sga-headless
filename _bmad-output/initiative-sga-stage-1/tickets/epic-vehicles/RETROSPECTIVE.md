---
type: retrospective
epic: epic-vehicles
date: 2026-11-24
source: ingest/2026-11-24-prod-catalogue-detail-mismatch.md
---

# Epic 4 retrospective — Vehicle catalogue

## Acceptance decision

**Conditionally accepted.** Catalogue, detail, filters, enquiry hook, and empty states are implemented; build-time parity and API snapshot fixes shipped in **f9609f0**; confirm live Pages after each webhook **deploy** job.

## What shipped (evidence)

| Done when | Evidence |
|-----------|----------|
| Published vehicles listed; sold excluded | `getVehicles` filters `sold`; Studio `availability` |
| Empty catalogue UX | `vehicles/page.tsx` empty state |
| Detail gallery + specs | `[slug]/page.tsx`, Sanity vehicle type |
| Static slugs | `generateStaticParams` + sentinel for empty CMS |

## Findings

1. **Gap:** Epic AC did not require **catalogue/detail HTML parity** in one build — only functional listing rules.
2. **Incident:** Prod showed detail URL OK but `/en/vehicles` empty (stale/split static HTML + Pages vs Worker URL).
3. **Fix:** Unified `fetchVehicleRows()`, API-first Sanity client at build, `verify-static-vehicles.mjs`.
4. **Ops:** Users must **Publish** in Studio then **rebuild** host (static site).
5. **Follow-up (2026-11-24):** Webhook fired but Daihatsu missing — **CDN default on client** + deploy job not updating Pages; ingest `2026-11-24-webhook-rebuild-stale-cdn-cicd.md`.

## Action items

| Owner | Action |
|-------|--------|
| Dev / owner | After publish: Rebuild **deploy** green; `*.pages.dev/en/vehicles` shows new slug |
| PO | Story `epic-vehicles/tickets` id 1 — parity AC (this retro) |
| Content | Mark **Featured** for home strip; **Available** for catalogue |

## References

- Ingest: `sources/ingest/2026-11-24-prod-catalogue-detail-mismatch.md`, `sources/ingest/2026-11-24-webhook-rebuild-stale-cdn-cicd.md`
- Architecture: AD-5 build consistency paragraph