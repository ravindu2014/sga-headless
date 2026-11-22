import type { MetadataRoute } from "next";

export const dynamic = "force-static";
import { getSiteSettings } from "@/content";
import { normalizeSiteOrigin } from "@/lib/site-url";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await getSiteSettings("en");
  const origin = normalizeSiteOrigin(settings?.canonicalBaseUrl);

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    host: new URL(origin).host,
    sitemap: `${origin}/sitemap.xml`,
  };
}