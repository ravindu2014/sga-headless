import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getSiteSettings } from "@/content";
import type { Locale } from "@/i18n/routing";
import {
  absoluteUrl,
  hrefLangAlternates,
  normalizeSiteOrigin,
} from "@/lib/site-url";

type PageSeoInput = {
  /** Path after locale, e.g. `about` or `vehicles/my-slug`. Empty for home. */
  path?: string;
  title: string;
  description?: string;
  imageUrl?: string;
  openGraphType?: "website" | "article";
};

export async function buildPageMetadata(
  locale: Locale,
  input: PageSeoInput,
): Promise<Metadata> {
  const [settings, tMeta] = await Promise.all([
    getSiteSettings(locale),
    getTranslations({ locale, namespace: "metadata" }),
  ]);

  const origin = normalizeSiteOrigin(settings?.canonicalBaseUrl);
  const path = input.path ?? "";
  const url = absoluteUrl(origin, locale, path);
  const description =
    input.description ??
    settings?.seoDescription?.value ??
    tMeta("description");
  const siteName = settings?.seoTitle?.value ?? tMeta("title");
  const image = input.imageUrl ?? `${origin}/brand/sga_small_logo.jpg`;

  const alternateLocale = routingLocaleTag(
    locale === "en" ? "si" : "en",
  );

  return {
    title: input.title,
    description,
    alternates: {
      canonical: url,
      languages: hrefLangAlternates(origin, path),
    },
    openGraph: {
      title: input.title,
      description,
      url,
      siteName,
      locale: routingLocaleTag(locale),
      alternateLocale: [alternateLocale],
      type: input.openGraphType ?? "website",
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description,
      images: [image],
    },
  };
}

function routingLocaleTag(locale: Locale | string): string {
  return locale === "si" ? "si_LK" : "en_LK";
}