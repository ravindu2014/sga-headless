/**
 * Deploy static export (`out/`) for Cloudflare Workers Builds + local/GHA.
 *
 * Cloudflare dashboard (your screenshots): Build `npm run build`, Deploy
 * `npm run pages:deploy` — no separate “output directory” field. Static files
 * are declared in wrangler.toml via `pages_build_output_dir = "out"`.
 *
 * On Cloudflare builders: `wrangler deploy` (matches Workers Builds + wrangler.toml).
 * Elsewhere: `wrangler pages deploy` (explicit Pages project + your API token).
 */
import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";

const PROJECT_NAME = "sga-headless";
const ACCOUNT_ID = "0b8c86656a7d4d2757064a856209af7a";

function isCloudflareWorkersBuild() {
  const home = process.env.HOME ?? "";
  const cwd = process.cwd();
  if (home.includes("buildhome") || cwd.includes("buildhome")) {
    return true;
  }
  return Boolean(
    process.env.CF_PAGES ||
      process.env.CF_PAGES_BRANCH ||
      process.env.CF_PAGES_COMMIT_SHA ||
      process.env.WORKERS_CI,
  );
}

if (!existsSync("out")) {
  console.error("cf-pages-deploy: missing out/ — run npm run build first.");
  process.exit(1);
}

const onCf = isCloudflareWorkersBuild();
console.log(`cf-pages-deploy: cloudflareBuilder=${onCf}`);

const env = { ...process.env };
env.CLOUDFLARE_ACCOUNT_ID = env.CLOUDFLARE_ACCOUNT_ID?.trim() || ACCOUNT_ID;

if (env.CLOUDFLARE_API_TOKEN) {
  env.CLOUDFLARE_API_TOKEN = env.CLOUDFLARE_API_TOKEN.trim();
  console.log(
    `cf-pages-deploy: CLOUDFLARE_API_TOKEN length=${env.CLOUDFLARE_API_TOKEN.length}`,
  );
} else if (onCf) {
  console.log(
    "cf-pages-deploy: using Workers Builds API token (Builds → API token).",
  );
}

if (onCf) {
  console.log(
    "cf-pages-deploy: wrangler deploy (pages_build_output_dir=out in wrangler.toml)",
  );
  const result = spawnSync("npx", ["wrangler", "deploy"], {
    stdio: "inherit",
    env,
    shell: false,
  });
  process.exit(result.status === null ? 1 : result.status);
}

console.log(
  `cf-pages-deploy: wrangler pages deploy → project=${PROJECT_NAME}`,
);
const result = spawnSync(
  "npx",
  ["wrangler", "pages", "deploy", "out", `--project-name=${PROJECT_NAME}`],
  { stdio: "inherit", env, shell: false },
);

process.exit(result.status === null ? 1 : result.status);