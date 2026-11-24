# Cloudflare dashboard — `sga-headless` (your setup)

You are on **Workers & Pages → sga-headless → Settings → Builds** (Workers **Builds**), not classic “Pages only” Git. There is **no “Build output directory”** field. Static files come from repo [`wrangler.toml`](../wrangler.toml): `pages_build_output_dir = "out"`.

## Settings that match your screenshots

| Field | Value |
|-------|--------|
| Git repository | `ravindu2014/sga-headless` |
| Production branch | `main` |
| Build command | `npm run build` |
| Deploy command | `npm run pages:deploy` |
| Root directory | `/` |

### Build variables (keep only these)

- `NODE_VERSION` = `22.12.0`
- `SANITY_PROJECT_ID` = `n2zalqm8`
- `SANITY_DATASET` = `production`

Do **not** add `CLOUDFLARE_API_TOKEN` or `CLOUDFLARE_ACCOUNT_ID` here (account is in `wrangler.toml`).

### API token (Builds section)

Uses **“sga-headless build token”** (or replace it).

Default Workers Builds tokens often have **Workers Scripts → Edit** but **not** **Cloudflare Pages → Edit**.  
`wrangler pages deploy` needs **Pages → Edit** and fails with **Authentication error [10000]**.

This repo’s deploy step on Cloudflare runs **`wrangler deploy`**, which uploads `out/` via `pages_build_output_dir` and needs **Workers Scripts → Edit** on the build token.

**If deploy still fails:**

1. **Builds → API token → Create new token** (while logged in as **serendibglobalauto@gmail.com**).
2. Use template **Edit Cloudflare Workers** (includes Workers Scripts edit).
3. Add **Account → Cloudflare Pages → Edit** if offered.
4. Save and retry build.

Or: [My Profile → API Tokens](https://dash.cloudflare.com/profile/api-tokens) → edit **sga-headless build token** → add **Cloudflare Pages → Edit**, then retry.

## Runtime variables

**Settings → Variables and secrets** (runtime) can stay empty for this static site.

## Alternative: classic Pages (optional)

If Workers Builds keeps failing:

1. **Workers & Pages → Create → Pages → Connect to Git**
2. Same repo; **Build command** `npm run build`; **Build output directory** `out`
3. **No deploy command**
4. Disable or disconnect the Worker **sga-headless** project to avoid two deploys

## After changing repo deploy script

Push `main`, then **Retry build** on Cloudflare so the latest `scripts/cf-pages-deploy.mjs` runs.