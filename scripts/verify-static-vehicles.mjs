/**
 * Fail the build if detail HTML exists but the catalogue HTML is still empty.
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const EXPORT_SENTINEL = "__no_vehicles_export_sentinel__";

function exportedPage(locale) {
  const flat = join("out", `${locale}.html`);
  const nested = join("out", locale, "index.html");
  if (existsSync(flat)) return flat;
  if (existsSync(nested)) return nested;
  return null;
}

function assertLocalePages() {
  const siPath = exportedPage("si");
  const enPath = exportedPage("en");
  if (!siPath || !enPath) {
    console.error("[verify-static-vehicles] Missing exported home page for en or si.");
    process.exit(1);
  }
  const si = readFileSync(siPath, "utf8");
  const en = readFileSync(enPath, "utf8");
  const siNeed = ["විශේෂිත වාහන", "විස්තර බලන්න", "මිල විමසීමට", 'href="/si"'];
  const enNeed = ["Featured vehicles", "View details", "Price on request", 'href="/en"'];
  const problems = [];
  for (const needle of siNeed) {
    if (!si.includes(needle)) problems.push(`si missing ${needle}`);
  }
  if (si.includes('href="/en/si"') || si.includes(">Featured vehicles<")) {
    problems.push("si home is still using English labels or the /en/si link");
  }
  for (const needle of enNeed) {
    if (!en.includes(needle)) problems.push(`en missing ${needle}`);
  }
  if (en.includes('href="/si/en"') || en.includes("විශේෂිත වාහන")) {
    problems.push("en home is using Sinhala labels or the /si/en link");
  }
  if (problems.length > 0) {
    console.error("[verify-static-vehicles] Locale pages failed:", problems.join("; "));
    process.exit(1);
  }
}

assertLocalePages();

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
const missing = slugs.filter(
  (slug) =>
    !html.includes(`/vehicles/${slug}`) &&
    !html.includes(`/en/vehicles/${slug}`),
);
if (missing.length > 0) {
  console.error(
    "[verify-static-vehicles] Catalogue HTML missing slugs that have detail pages:",
    missing.join(", "),
  );
  process.exit(1);
}