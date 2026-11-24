/**
 * Deploy `out/` to a Cloudflare Pages project (Workers Builds deploy step).
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

function run(args) {
  return spawnSync("npx", args, { stdio: "inherit", env, shell: false });
}

console.log(
  `cf-pages-deploy: ensure Pages project "${PROJECT_NAME}" exists…`,
);
const create = run([
  "wrangler",
  "pages",
  "project",
  "create",
  PROJECT_NAME,
  "--production-branch=main",
]);

if (create.status !== 0 && create.status !== null) {
  console.log(
    "cf-pages-deploy: create skipped (project may already exist — continuing).",
  );
}

console.log(
  `cf-pages-deploy: wrangler pages deploy out --project-name=${PROJECT_NAME}`,
);
const deploy = run([
  "wrangler",
  "pages",
  "deploy",
  "out",
  `--project-name=${PROJECT_NAME}`,
  "--branch=main",
]);

process.exit(deploy.status === null ? 1 : deploy.status);