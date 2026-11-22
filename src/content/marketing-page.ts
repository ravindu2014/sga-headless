import "server-only";

import { mapSanityImage } from "./images";
import { resolveLocalizedField } from "./locale";
import type {
  ContentLocale,
  LocalizedField,
  MarketingPageDto,
  PortableTextValue,
} from "./types";

type MarketingPageDocument = {
  heroHeadline?: LocalizedField<string>;
  heroSubheadline?: LocalizedField<string>;
  body?: LocalizedField<PortableTextValue>;
  heroImage?: { asset?: { url?: string }; alt?: string };
  enquiryIntro?: LocalizedField<string>;
};

export function mapMarketingPage(
  doc: MarketingPageDocument | null | undefined,
  locale: ContentLocale,
): MarketingPageDto | null {
  if (!doc) {
    return null;
  }

  const heroHeadline = resolveLocalizedField(doc.heroHeadline, locale);
  if (!heroHeadline) {
    return null;
  }

  const heroSubheadline = resolveLocalizedField(doc.heroSubheadline, locale);
  const body = resolveLocalizedField(doc.body, locale);
  const enquiryIntro = resolveLocalizedField(doc.enquiryIntro, locale);
  const heroImage = mapSanityImage(doc.heroImage);

  return {
    heroHeadline,
    ...(heroSubheadline ? { heroSubheadline } : {}),
    ...(body ? { body } : {}),
    ...(heroImage ? { heroImage } : {}),
    ...(enquiryIntro ? { enquiryIntro } : {}),
  };
}