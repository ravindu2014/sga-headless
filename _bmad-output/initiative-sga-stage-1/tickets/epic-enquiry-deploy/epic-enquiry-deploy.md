---
id: 5
type: epic
title: Enquiry, SEO, and deploy ops
parent: initiative-sga-stage-1
covers: [R5, R7, R10]
refined: false
risk: medium
---

# Enquiry, SEO, and deploy ops

## Description

WhatsApp enquiry component, SEO files, `docs/ops-deploy.md`, Sanity webhook + manual workflow_dispatch; Cloudflare Pages hookup when owner approves production.

## Outcome

SM-4, SM-9, dual deploy path D-11 documented and testable once once.

## Done when

1. Enquiry validation + wa.me with vehicle context (FR-26).
2. sitemap, robots, OG on key routes.
3. Manual rebuild documented; webhook stub or live per owner env.

## References

- architecture — `architecture-sga-stage-1/architecture-sga-stage-1.md` AD-7, AD-8
- operations — `docs/ops-deploy.md` (Sanity publish → rebuild; Cloudflare Workers Builds + Pages deploy; no extra PRD FR beyond FR-64a/b)
- retrospective — `epic-enquiry-deploy/RETROSPECTIVE.md` (2026-11-24)
- story — `epic-enquiry-deploy/tickets/tickets.toml` id 1 (Sanity webhook rebuild)
- plan — `epic-enquiry-deploy/plan-sanity-webhook-rebuild.md`
- ingest — `sources/ingest/2026-11-24-webhook-rebuild-stale-cdn-cicd.md`
- story — `epic-enquiry-deploy/tickets/tickets.toml` id 3 (canonical CI/CD)