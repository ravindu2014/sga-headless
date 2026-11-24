/**
 * Fail the build if detail HTML exists but the catalogue HTML is still empty.
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const EXPORT_SENTINEL = "__no_vehicles_export_sentinel__";

function detailSlugs() {
  const dir = join("out", "en", "vehicles");
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith(".html") && !f.includes(EXPORT_SENTINEL))
    .map((f) => f.replace(/\.html$/, ""));
}

const slugs = detailSlugs();
if (slugs.length === 0) {
  process.exit(0);
}

const indexPath = join("out", "en", "vehicles.html");
if (!existsSync(indexPath)) {
  process.exit(0);
}

const html = readFileSync(indexPath, "utf8");
const missing = slugs.filter((slug) => !html.includes(`/vehicles/${slug}`));
if (missing.length > 0) {
  console.error(
    "[verify-static-vehicles] Catalogue HTML missing slugs that have detail pages:",
    missing.join(", "),
  );
  process.exit(1);
}