import "server-only";

import { mapMarketingPage } from "./marketing-page";
import { resolveLocalizedField } from "./locale";
import { sanityFetch } from "./sanity-fetch";
import type {
  ContentLocale,
  FaqItemDto,
  FaqPageDto,
  LocalizedField,
} from "./types";

type FaqRow = {
  question?: LocalizedField<string>;
  answer?: LocalizedField<string>;
};

type FaqPageDocument = Parameters<typeof mapMarketingPage>[0] & {
  items?: FaqRow[];
};

const FAQ_PAGE_QUERY = `*[_type == "faqPage"][0]{
  heroHeadline,
  heroSubheadline,
  body,
  items[]{
    question,
    answer
  }
}`;

export async function getFaqPage(
  locale: ContentLocale,
): Promise<FaqPageDto | null> {
  const doc = await sanityFetch<FaqPageDocument | null>(FAQ_PAGE_QUERY);
  const base = mapMarketingPage(doc, locale);
  if (!base) {
    return null;
  }

  const items: FaqItemDto[] = [];
  for (const row of doc?.items ?? []) {
    const question = resolveLocalizedField(row.question, locale);
    const answer = resolveLocalizedField(row.answer, locale);
    if (!question || !answer) continue;
    items.push({ question, answer });
  }

  return { ...base, items };
}