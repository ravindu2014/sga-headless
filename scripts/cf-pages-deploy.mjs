/**
 * Cloudflare “Deploy” step for Git-connected Pages builds.
 *
 * On Cloudflare’s build environment (`CF_PAGES=1`), the static `out/` directory
 * from the build step is published automatically when “Build output directory”
 * is set to `out`. Running `wrangler pages deploy` here is redundant and often
 * fails if `CLOUDFLARE_API_TOKEN` lacks Pages scopes (error 10000).
 *
 * GitHub Actions / local deploys still run wrangler when `CF_PAGES` is unset.
 */
import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";

const projectName = "sga-headless";

if (process.env.CF_PAGES === "1") {
  if (!existsSync("out")) {
    console.error("cf-pages-deploy: missing out/ — run npm run build first.");
    process.exit(1);
  }
  console.log(
    "cf-pages-deploy: CF_PAGES build — publishing via build output directory (out/).",
  );
  console.log(
    "cf-pages-deploy: remove CLOUDFLARE_API_TOKEN from Pages build env if you had auth errors.",
  );
  process.exit(0);
}

if (!existsSync("out")) {
  console.error("cf-pages-deploy: missing out/ — run npm run build first.");
  process.exit(1);
}

const result = spawnSync(
  "npx",
  ["wrangler", "pages", "deploy", "out", `--project-name=${projectName}`],
  { stdio: "inherit", shell: false },
);

process.exit(result.status === null ? 1 : result.status);