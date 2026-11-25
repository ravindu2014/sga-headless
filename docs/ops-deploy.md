# Deploy and rebuild operations (Stage 1)

Static site: **Next.js `output: export`** → `out/` → **Cloudflare Pages** (when connected).  
Content: **Sanity** `n2zalqm8` / `production`, read-only at build time.

BMAD process for deploy changes: [`bmad-way-of-working.md`](bmad-way-of-working.md).

## Canonical CI/CD (one build per event)

| Layer | Keep? | Role |
|-------|-------|------|
| GitHub **CI** (`ci.yml`) | Yes | Runs on **pull requests** only — lint, typecheck, build. No deploy. |
| GitHub **Rebuild site** (`rebuild.yml`) | Yes | Runs on **push to `main`**, manual dispatch, Sanity webhook — build, artifact, **Pages deploy**. |
| Cloudflare **Pages** `sga-headless` | Yes | Hosts static files (`*.pages.dev` / custom domain). **No Git connect** — fed by Actions `wrangler pages deploy`. |
| Cloudflare **Worker** `sga-sanity-rebuild` | Yes | Webhook relay only (not the website). |
| Cloudflare **Worker** `sga-headless` (Git-linked) | **Remove** | Wrong type; duplicates/confuses deploy. Disconnect repo or delete the Worker project. |
| Cloudflare **Workers Builds** on the marketing site | **No** | Do not build the Next app in Cloudflare dashboard if GitHub **Rebuild** deploys. |

**Best practice for this repo:** GitHub owns build + deploy; Cloudflare hosts Pages + one small Worker. PR → CI; merge / publish → Rebuild once.

## Dual deploy triggers (AD-7)

| Trigger | Purpose |
|---------|---------|
| **Sanity publish webhook** | Auto-rebuild when content changes (FR-64a) |
| **GitHub `workflow_dispatch`** | Manual rebuild if webhook fails (FR-64b) |

### Manual rebuild

1. GitHub → **Actions** → **Rebuild site** → **Run workflow**.
2. Optionally add a short reason in the input (log only).
3. Download the **next-static-out** artifact from the completed run, or rely on Cloudflare’s Git integration once configured.

CI on **pull requests** runs [`.github/workflows/ci.yml`](../.github/workflows/ci.yml) (no deploy). Pushes to `main` run **Rebuild site** only.

### Sanity → GitHub auto-rebuild (webhook relay)

Sanity cannot call GitHub Actions without an authenticated bridge. This repo ships a **Cloudflare Worker** at [`workers/sanity-rebuild/`](../workers/sanity-rebuild/src/index.ts) that:

1. Verifies `sanity-webhook-signature` with your webhook secret (`@sanity/webhook`).
2. POSTs GitHub **`repository_dispatch`** with `event_type: sanity-publish`.
3. Triggers [`.github/workflows/rebuild.yml`](../.github/workflows/rebuild.yml) (build + optional Cloudflare deploy).

#### One-time: deploy the relay

```bash
npm ci
# Set vars in wrangler.sanity-rebuild.toml [vars] GITHUB_REPO if not ravindu2014/sga-headless
wrangler secret put SANITY_WEBHOOK_SECRET -c wrangler.sanity-rebuild.toml
wrangler secret put GITHUB_DISPATCH_TOKEN -c wrangler.sanity-rebuild.toml
npm run deploy:webhook-relay
```

Note the Worker URL (e.g. `https://sga-sanity-rebuild.<account>.workers.dev`).

| Secret | Purpose |
|--------|---------|
| `SANITY_WEBHOOK_SECRET` | Same string you configure in Sanity webhook **Secret** |
| `GITHUB_DISPATCH_TOKEN` | Classic PAT (`repo`) or fine-grained token with **Actions: read and write** on this repository |

#### One-time: Sanity webhook

1. [sanity.io/manage](https://www.sanity.io/manage) → project **n2zalqm8** → **API** → **Webhooks** → **Create**.
2. **URL:** `https://sga-sanity-rebuild.<your-subdomain>.workers.dev` (POST).
3. **Dataset:** `production`.
4. **Trigger on:** Create, Update, Delete (or narrower GROQ filter e.g. vehicle + site settings only).
5. **Secret:** generate; copy into Wrangler `SANITY_WEBHOOK_SECRET` above.
6. **HTTP method:** POST; **API version** default.

Use **Send test request** in Sanity; in GitHub → **Actions** you should see **Rebuild site** with event `repository_dispatch` / `sanity-publish`.

#### Test without Sanity

```bash
GITHUB_DISPATCH_TOKEN=… npm run dispatch:sanity-publish
# or DRY_RUN=1 npm run dispatch:sanity-publish
```

If the relay is not deployed, use **manual rebuild** only; the site still builds correctly from `main`.

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

See [cloudflare-dashboard.md](./cloudflare-dashboard.md) for settings aligned with your Workers Builds UI (no output-directory field).

### Alternative: Cloudflare Workers Builds (Git)

The dashboard shows **Build command** + **Deploy command** only (no “Build output directory”). Static output is declared in [`wrangler.toml`](../wrangler.toml) as `pages_build_output_dir = "out"`.

| Setting | Value |
|---------|--------|
| **Build command** | `npm run build` |
| **Deploy command** | `npm run pages:deploy` |
| **Node** | `NODE_VERSION` = `22.12.0` |
| **Variables** (project env) | `SANITY_PROJECT_ID`, `SANITY_DATASET` only — **no** `CLOUDFLARE_API_TOKEN` here |

#### Fix Authentication error [10000]

Wrangler logs `The API Token is read from the CLOUDFLARE_API_TOKEN environment variable` when that variable is set under **Settings → Variables**. It **overrides** the token chosen in **Settings → Builds → Build configuration → API token**, and often fails with code **10000** if the variable token is wrong or missing Pages scopes.

1. **Delete** `CLOUDFLARE_API_TOKEN` (and `CLOUDFLARE_ACCOUNT_ID` if only used for Wrangler) from **Project → Settings → Variables**.
2. Open **Settings → Builds → Build configuration → API token** → **Create new token** (or pick one with **Account → Cloudflare Pages → Edit** and **Workers Scripts → Edit**).
3. Retry the build.

[`scripts/cf-pages-deploy.mjs`](../scripts/cf-pages-deploy.mjs) runs **`wrangler pages deploy out`** with `--account-id` from [`wrangler.toml`](../wrangler.toml). If **curl** succeeds locally but Cloudflare fails with **10000**, the token in **Variables** is usually not the same string (typo, old value, trailing newline) — compare **token length** in the deploy log with `echo -n "$TOKEN" | wc -c` locally.

Commit an updated [`package-lock.json`](../package-lock.json) whenever `package.json` changes; `npm ci` on Cloudflare fails if they are out of sync.

You can disable the GitHub **deploy** job (`CLOUDFLARE_DEPLOY_ENABLED` unset) to avoid double publishes when using Git-connected Pages.

## After publish checklist

- `sitemap.xml` and `robots.txt` at site root (build-time).
- Vehicle detail URLs appear after rebuild when new slugs are published.
- WhatsApp enquiry uses **Site settings** WhatsApp number (FR-26); default business number documented in Studio schema.