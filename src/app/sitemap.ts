import type { MetadataRoute } from "next";

export const dynamic = "force-static";
import { getSiteSettings, getVehicleSlugs } from "@/content";
import { routing, type Locale } from "@/i18n/routing";
import { EXPORT_SENTINEL_SLUG } from "@/lib/constants";
import { absoluteUrl, normalizeSiteOrigin } from "@/lib/site-url";

const STATIC_PATHS = ["", "about", "services", "faq", "contact", "vehicles"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const settings = await getSiteSettings("en");
  const origin = normalizeSiteOrigin(settings?.canonicalBaseUrl);
  const slugs = (await getVehicleSlugs()).filter((slug) => slug !== EXPORT_SENTINEL_SLUG);

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of STATIC_PATHS) {
      entries.push({
        url: absoluteUrl(origin, locale as Locale, path),
        changeFrequency: path === "vehicles" ? "daily" : "weekly",
        priority: path === "" ? 1 : 0.7,
      });
    }
    for (const slug of slugs) {
      entries.push({
        url: absoluteUrl(origin, locale as Locale, `vehicles/${slug}`),
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  }

  return entries;
}