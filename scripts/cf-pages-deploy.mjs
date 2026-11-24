/**
 * Deploy `out/` to Cloudflare Pages (Workers Builds + local + GitHub Actions).
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
    `cf-pages-deploy: CLOUDFLARE_API_TOKEN length=${env.CLOUDFLARE_API_TOKEN.length} (compare with local curl token)`,
  );
} else if (onCf) {
  console.log(
    "cf-pages-deploy: no CLOUDFLARE_API_TOKEN in env — using Workers Builds configured token.",
  );
}

if (onCf && process.env.CLOUDFLARE_API_TOKEN) {
  console.warn(
    "cf-pages-deploy: If deploy fails with 10000 but curl works locally, the variable token here is NOT the same as your local token (re-paste or remove it).",
  );
}

console.log(
  `cf-pages-deploy: wrangler pages deploy → project=${PROJECT_NAME} account=${env.CLOUDFLARE_ACCOUNT_ID}`,
);

const result = spawnSync(
  "npx",
  ["wrangler", "pages", "deploy", "out", `--project-name=${PROJECT_NAME}`],
  { stdio: "inherit", env, shell: false },
);

process.exit(result.status === null ? 1 : result.status);