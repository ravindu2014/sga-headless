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

## Cloudflare Pages

Repo ships [`wrangler.toml`](../wrangler.toml) (`pages_build_output_dir = out`). Prefer **GitHub Actions → Cloudflare** (same build as local) over building on Cloudflare unless you want a dashboard-only setup.

### 1. One-time Cloudflare setup

1. [Cloudflare dashboard](https://dash.cloudflare.com) → **Workers & Pages** → note **Account ID**.
2. **My Profile** → **API Tokens** → **Create token** → template **Edit Cloudflare Workers** (includes Pages deploy), or custom token with **Account → Cloudflare Pages → Edit**.
3. (Optional) Create an empty Pages project named `sga-headless`, or let the first `wrangler pages deploy` create it.

### 2. GitHub secrets and variables

| Name | Type | Purpose |
|------|------|---------|
| `CLOUDFLARE_API_TOKEN` | Secret | Deploy token from step 2 |
| `CLOUDFLARE_ACCOUNT_ID` | Secret | Account ID |
| `CLOUDFLARE_PAGES_PROJECT` | Variable (optional) | Defaults to `sga-headless` |
| `CLOUDFLARE_DEPLOY_ENABLED` | Variable | Set to `true` once secrets are in place (deploy stays off until then) |

Create a GitHub **Environment** named `production` on this repo and add required reviewers if you want approval before each deploy (FR-64).

### 3. What deploys when

[`.github/workflows/rebuild.yml`](../.github/workflows/rebuild.yml):

| Trigger | Build | Deploy |
|---------|-------|--------|
| Push to `main` | Yes | Yes → `production` env |
| `workflow_dispatch` | Yes | Yes if **Deploy to Cloudflare** is checked (default on) |
| `repository_dispatch` (`sanity-publish`) | Yes | Yes |

CI on PRs ([`ci.yml`](../.github/workflows/ci.yml)) does **not** deploy.

### 4. Custom domain

In Cloudflare Pages → project → **Custom domains** → add **serendibglobalauto.lk** (and `www` if needed). Match **canonicalBaseUrl** in Sanity **Site settings** (FR-51, FR-53).

### 5. Local deploy (optional)

```bash
export CLOUDFLARE_API_TOKEN=…   # or wrangler login
export CLOUDFLARE_ACCOUNT_ID=…
npm run deploy:pages
```

### Alternative: Cloudflare Git build (Pages)

If you connect the repo in the Cloudflare UI, use these values exactly.

| Setting | Value |
|---------|--------|
| **Build command** | `npm run build` |
| **Build output directory** | `out` |
| **Deploy command** | `npm run pages:deploy` |
| **Node** | **`22.12.0` or newer** — set env `NODE_VERSION` = `22.12.0` (Wrangler 4 fails on Node 20) |
| **Env vars** | `SANITY_PROJECT_ID=n2zalqm8`, `SANITY_DATASET=production` |

**Do not use** `npx wrangler deploy` — that targets **Workers**, not the static `out/` folder. The repo script runs `wrangler pages deploy out`.

If your Cloudflare UI lets you omit a deploy command, leave it empty and rely on the output directory only; otherwise use `npm run pages:deploy`.

Commit an updated [`package-lock.json`](../package-lock.json) whenever `package.json` changes; `npm ci` on Cloudflare fails if they are out of sync.

You can disable the GitHub **deploy** job (`CLOUDFLARE_DEPLOY_ENABLED` unset) to avoid double publishes when using Git-connected Pages.

## After publish checklist

- `sitemap.xml` and `robots.txt` at site root (build-time).
- Vehicle detail URLs appear after rebuild when new slugs are published.
- WhatsApp enquiry uses **Site settings** WhatsApp number (FR-26); default business number documented in Studio schema.