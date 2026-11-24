/**
 * Deploy `out/` to Cloudflare Pages (Workers Builds deploy step).
 */
import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";

const PROJECT_NAME = "sga-headless";
const ACCOUNT_ID = "0b8c86656a7d4d2757064a856209af7a";

if (!existsSync("out")) {
  console.error("cf-pages-deploy: missing out/ — run npm run build first.");
  process.exit(1);
}

const env = { ...process.env };
env.CLOUDFLARE_ACCOUNT_ID = env.CLOUDFLARE_ACCOUNT_ID?.trim() || ACCOUNT_ID;
if (env.CLOUDFLARE_API_TOKEN) {
  env.CLOUDFLARE_API_TOKEN = env.CLOUDFLARE_API_TOKEN.trim();
}

console.log(
  `cf-pages-deploy: wrangler pages deploy out --project-name=${PROJECT_NAME}`,
);

const result = spawnSync(
  "npx",
  [
    "wrangler",
    "pages",
    "deploy",
    "out",
    `--project-name=${PROJECT_NAME}`,
    "--branch=main",
  ],
  { stdio: "inherit", env, shell: false },
);

process.exit(result.status === null ? 1 : result.status);