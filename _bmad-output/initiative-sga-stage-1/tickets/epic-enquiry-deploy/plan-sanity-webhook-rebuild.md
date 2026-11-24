---
title: Sanity publish webhook triggers site rebuild
type: feature
ticket: '1'
created: '2026-11-24'
status: done
baseline_revision: ''
route: oneshot
route_source: pinned
risk: medium
review: quick
review_source: auto
lenses_ran: []
review_loop_iteration: 0
context:
  - docs/ops-deploy.md
  - .github/workflows/rebuild.yml
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** FR-64a auto-rebuild is documented as a stub; Sanity cannot call GitHub Actions without an authenticated bridge, so publish → live site still depends on manual Cloudflare/GitHub rebuild.

**Approach:** Ship a minimal Cloudflare Worker relay in-repo: verify Sanity signature, POST `repository_dispatch` with `event_type: sanity-publish` (existing `rebuild.yml` listener).

</frozen-after-approval>

## Code Map

- `.github/workflows/rebuild.yml` — already listens for `repository_dispatch` / `sanity-publish`; extend deploy trigger if needed.
- `docs/ops-deploy.md` — replace stub with worker deploy + Sanity webhook setup.
- `wrangler.toml` — Pages config only; use separate `wrangler.sanity-rebuild.toml`.
- `package.json` — add `deploy:webhook-relay` script.

## Tasks & Acceptance

**Execution:**
- [x] `workers/sanity-rebuild/src/index.ts` — POST handler: verify signature, dispatch GitHub — FR-64a
- [x] `wrangler.sanity-rebuild.toml` + `deploy:webhook-relay` — deploy relay via Wrangler
- [x] `scripts/github-repository-dispatch.mjs` — local dry-run / operator test without Sanity
- [x] `docs/ops-deploy.md` — secrets table, Sanity webhook URL, troubleshooting
- [x] `.env.example` — document operator env vars (names only)

**Acceptance Criteria:**
- Given valid Sanity signature, when POST to relay, then GitHub shows `sanity-publish` dispatch and Rebuild site workflow runs.
- Given bad signature, when POST, then 401 and no dispatch.
- Given setup doc, when owner configures secrets on Worker + GitHub, then no repo contains tokens.

## Implementation Notes

- 2026-11-24: Worker relay + ops doc + dispatch script; `rebuild.yml` unchanged (already listens for `sanity-publish`).
- Owner HITL: `wrangler secret put` ×2, `npm run deploy:webhook-relay`, Sanity webhook URL + test send.
- 2026-11-24: f9609f0 — API at build, CI PR-only, canonical deploy doc; follow ingest `2026-11-24-webhook-rebuild-stale-cdn-cicd.md`.

## Verification

**Commands:**
- `npm run typecheck` — expected: pass (worker in separate package if needed)
- `npm run lint` — expected: pass
- Worker unit: run dispatch script with `DRY_RUN=1` when no token

**Manual checks:**
- `wrangler deploy -c wrangler.sanity-rebuild.toml` with secrets; Sanity test webhook in manage UI.