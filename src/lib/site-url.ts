import { routing, type Locale } from "@/i18n/routing";

export const DEFAULT_SITE_ORIGIN = "https://serendibglobalauto.lk";

export function normalizeSiteOrigin(baseUrl?: string): string {
  return (baseUrl?.replace(/\/$/, "") || DEFAULT_SITE_ORIGIN).trim();
}

/** Locale-prefixed path (`localePrefix: always`). */
export function localePath(locale: Locale | string, segment = ""): string {
  const clean = segment.replace(/^\//, "").replace(/\/$/, "");
  return clean ? `/${locale}/${clean}` : `/${locale}`;
}

export function absoluteUrl(origin: string, locale: Locale | string, segment = ""): string {
  return `${normalizeSiteOrigin(origin)}${localePath(locale, segment)}`;
}

export function hrefLangAlternates(
  origin: string,
  segment: string,
): Record<string, string> {
  return Object.fromEntries(
    routing.locales.map((loc) => [loc, absoluteUrl(origin, loc, segment)]),
  );
}