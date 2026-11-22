# Deploy and rebuild operations (Stage 1)

Static site: **Next.js `output: export`** → `out/` → **Cloudflare Pages** (when connected).  
Content: **Sanity** `n2zalqm8` / `production`, read-only at build time.

## Dual deploy triggers (AD-7)

| Trigger | Purpose |
|---------|---------|
| **Sanity publish webhook** | Auto-rebuild when content changes (FR-64a) |
| **GitHub `workflow_dispatch`** | Manual rebuild if webhook fails (FR-64b) |

### Manual rebuild

1. GitHub → **Actions** → **Rebuild site** → **Run workflow**.
2. Optionally add a short reason in the input (log only).
3. Download the **next-static-out** artifact from the completed run, or rely on Cloudflare’s Git integration once configured.

CI on push/PR still runs [`.github/workflows/ci.yml`](../.github/workflows/ci.yml) (no artifact upload).

### Sanity → GitHub auto-rebuild (webhook stub)

Sanity cannot call GitHub Actions directly without a bridge. Stage 1 pattern:

1. **Sanity project** → **API** → **Webhooks** → create hook on **Create / Update / Delete** (published dataset).
2. Target: a small relay you control, **or** GitHub **repository_dispatch** via a PAT—recommended shape:
   - Payload URL: `https://api.github.com/repos/<owner>/<repo>/dispatches`
   - HTTP headers: `Authorization: Bearer <GITHUB_PAT>` with `repo` scope (store in Sanity webhook secrets, not in repo).
   - Body JSON: `{ "event_type": "sanity-publish", "client_payload": { "dataset": "production" } }`
3. That fires [`.github/workflows/rebuild.yml`](../.github/workflows/rebuild.yml) on `repository_dispatch` type `sanity-publish`.

If webhook is not configured yet, use **manual rebuild** only; the site still builds correctly from main.

## Environment variables

| Where | Variables |
|-------|-----------|
| GitHub Actions | `SANITY_PROJECT_ID`, `SANITY_DATASET` (set in workflow; override in repo secrets if needed) |
| Cloudflare Pages | Same Sanity vars for build; no write tokens |
| Local | Copy `.env.example` → `.env` |

Never commit `.env` or Sanity write tokens (AD-6, FR-65).

## Cloudflare Pages (owner approval required)

Until production is approved (FR-64):

1. Create a Pages project; connect this repo or upload `out/` from the rebuild artifact.
2. **Build command:** `npm ci && npm run build`
3. **Build output directory:** `out`
4. **Node:** 20
5. Set Sanity env vars in the Cloudflare dashboard.

Custom domain **serendibglobalauto.lk** should match `canonicalBaseUrl` in Sanity **Site settings** (FR-51, FR-53).

## After publish checklist

- `sitemap.xml` and `robots.txt` at site root (build-time).
- Vehicle detail URLs appear after rebuild when new slugs are published.
- WhatsApp enquiry uses **Site settings** WhatsApp number (FR-26); default business number documented in Studio schema.