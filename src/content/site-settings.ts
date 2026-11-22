import "server-only";

import { resolveLocalizedField } from "./locale";
import { sanityFetch } from "./sanity-fetch";
import type { ContentLocale, LocalizedField, SiteSettingsDto } from "./types";

/** Raw shape from Studio (epic 2); mapped to DTO here only. */
type SiteSettingsDocument = {
  phone?: string;
  whatsapp?: string;
  email?: string;
  canonicalBaseUrl?: string;
  defaultSeoTitle?: LocalizedField<string>;
  defaultSeoDescription?: LocalizedField<string>;
};

const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  phone,
  whatsapp,
  email,
  canonicalBaseUrl,
  defaultSeoTitle,
  defaultSeoDescription
}`;

export async function getSiteSettings(
  locale: ContentLocale,
): Promise<SiteSettingsDto | null> {
  const doc = await sanityFetch<SiteSettingsDocument | null>(SITE_SETTINGS_QUERY);
  if (!doc?.phone || !doc.whatsapp || !doc.email) {
    return null;
  }

  const seoTitle = resolveLocalizedField(doc.defaultSeoTitle, locale);
  const seoDescription = resolveLocalizedField(doc.defaultSeoDescription, locale);

  return {
    phone: doc.phone,
    whatsapp: doc.whatsapp,
    email: doc.email,
    ...(doc.canonicalBaseUrl ? { canonicalBaseUrl: doc.canonicalBaseUrl } : {}),
    ...(seoTitle ? { seoTitle } : {}),
    ...(seoDescription ? { seoDescription } : {}),
  };
}