---
type: retrospective
epic: epic-enquiry-deploy
date: 2026-11-24
source: ingest/2026-11-24-prod-catalogue-detail-mismatch.md
---

# Epic 5 retrospective — Enquiry, SEO, and deploy ops

## Acceptance decision

**Conditionally accepted.** Enquiry, SEO artefacts, `docs/ops-deploy.md`, `rebuild.yml`, and Cloudflare Workers Builds path are in repo; **live** custom domain and Sanity webhook remain owner follow-ups (per FR-64 and original “owner approval” guard).

## What shipped (evidence)

| Done when | Evidence |
|-----------|----------|
| Enquiry + WhatsApp context | `VehicleEnquiry.tsx`, messages `enquiry` |
| sitemap, robots, OG | `sitemap.ts`, `robots.ts`, `lib/seo.ts` |
| Manual rebuild documented | `docs/ops-deploy.md`, `.github/workflows/rebuild.yml` |
| Cloudflare wiring | `wrangler.toml`, `cf-pages-deploy.mjs`, `cloudflare-dashboard.md` |

## Findings

1. **Cloudflare UI** is Workers Builds (build + deploy commands), not classic Pages “output directory” — documented in `docs/cloudflare-dashboard.md`.
2. **Deploy friction:** API token scopes, `wrangler pages deploy` vs Worker URL, `account_id` in `wrangler.toml` rejected for Pages.
3. **Content freshness:** FR-64a satisfied by **process** (rebuild after publish); webhook not configured in Sanity yet — **AD-7** allows manual path via `docs/ops-deploy.md` only (no new FR required).
4. **Runtime URL:** Production site is **`sga-headless.pages.dev`**, not `*.workers.dev`.

## Action items

| Owner | Action |
|-------|--------|
| Owner | Optional: Sanity webhook → `repository_dispatch` per `ops-deploy.md` |
| Owner | Custom domain on **Pages** project; align Sanity `canonicalBaseUrl` |
| PM | No PRD change — FR-64a/64b + AD-7 sufficient; Cloudflare detail stays in ops doc |

## References

- AD-7, AD-8
- Ingest: `sources/ingest/2026-11-24-prod-catalogue-detail-mismatch.md`