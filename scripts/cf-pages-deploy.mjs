/**
 * Deploy static export (`out/`) to Cloudflare Pages.
 *
 * Workers Builds UI: Build `npm run build`, Deploy `npm run pages:deploy`.
 * Use `wrangler pages deploy` (not `wrangler deploy` — that needs a Worker entry).
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

const args = [
  "wrangler",
  "pages",
  "deploy",
  "out",
  `--project-name=${PROJECT_NAME}`,
];

const branch =
  process.env.CF_PAGES_BRANCH?.trim() ||
  process.env.GITHUB_REF_NAME?.trim() ||
  process.env.CI_COMMIT_BRANCH?.trim();
if (branch) {
  args.push(`--branch=${branch}`);
}

console.log(`cf-pages-deploy: npx ${args.join(" ")}`);

const result = spawnSync("npx", args, { stdio: "inherit", env, shell: false });
process.exit(result.status === null ? 1 : result.status);