import "server-only";

import { mapMarketingPage } from "./marketing-page";
import { sanityFetch } from "./sanity-fetch";
import type { ContentLocale, MarketingPageDto } from "./types";

const PAGE_FIELDS = `{
  heroHeadline,
  heroSubheadline,
  body,
  heroImage {
    alt,
    asset->{url}
  },
  enquiryIntro
}`;

async function getMarketingSingleton(
  type: string,
  locale: ContentLocale,
): Promise<MarketingPageDto | null> {
  const doc = await sanityFetch<Record<string, unknown> | null>(
    `*[_type == $type][0]${PAGE_FIELDS}`,
    { type },
  );
  return mapMarketingPage(doc, locale);
}

export function getHomePage(locale: ContentLocale) {
  return getMarketingSingleton("homePage", locale);
}

export function getAboutPage(locale: ContentLocale) {
  return getMarketingSingleton("aboutPage", locale);
}

export function getContactPage(locale: ContentLocale) {
  return getMarketingSingleton("contactPage", locale);
}