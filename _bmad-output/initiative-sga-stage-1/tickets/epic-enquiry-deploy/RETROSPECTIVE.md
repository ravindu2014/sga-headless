---
type: retrospective
epic: epic-enquiry-deploy
date: 2026-11-24
source: ingest/2026-11-24-prod-catalogue-detail-mismatch.md
---

# Epic 5 retrospective — Enquiry, SEO, and deploy ops

## Acceptance decision

**Conditionally accepted.** Enquiry, SEO, `rebuild.yml`, webhook Worker relay, and **Canonical CI/CD** in `ops-deploy.md` are in repo; owner HITL: `CLOUDFLARE_DEPLOY_ENABLED`, remove Git Worker `sga-headless`, custom domain on Pages.

## What shipped (evidence)

| Done when | Evidence |
|-----------|----------|
| Enquiry + WhatsApp context | `VehicleEnquiry.tsx`, messages `enquiry` |
| sitemap, robots, OG | `sitemap.ts`, `robots.ts`, `lib/seo.ts` |
| Manual rebuild documented | `docs/ops-deploy.md`, `.github/workflows/rebuild.yml` |
| Cloudflare wiring | `wrangler.toml`, `cf-pages-deploy.mjs`, `workers/sanity-rebuild`, `wrangler.sanity-rebuild.toml` |
| Webhook → rebuild | Worker relay; `rebuild.yml` `repository_dispatch`; ingest 2026-11-24 stale CDN |

## Findings

1. **Cloudflare UI** is Workers Builds (build + deploy commands), not classic Pages “output directory” — documented in `docs/cloudflare-dashboard.md`.
2. **Deploy friction:** API token scopes, `wrangler pages deploy` vs Worker URL, `account_id` in `wrangler.toml` rejected for Pages.
3. **Content freshness:** Webhook live when Worker + Sanity hook configured; build must use **Sanity API** and **deploy job** must succeed for Pages to update (not build-only).
4. **Runtime URL:** Production site is **`sga-headless.pages.dev`**, not `*.workers.dev`.

## Action items

| Owner | Action |
|-------|--------|
| Owner | Confirm deploy job after webhook; `CLOUDFLARE_DEPLOY_ENABLED=true`; disconnect Git **Worker** `sga-headless` |
| Owner | Custom domain on **Pages** project; align Sanity `canonicalBaseUrl` |
| PM | No PRD change — FR-64a/64b + AD-7 sufficient; Cloudflare detail stays in ops doc |

## References

- AD-7, AD-8
- Ingest: `sources/ingest/2026-11-24-prod-catalogue-detail-mismatch.md`, `sources/ingest/2026-11-24-webhook-rebuild-stale-cdn-cicd.md`
- Story: epic-enquiry-deploy/tickets id 3 (canonical CI/CD)