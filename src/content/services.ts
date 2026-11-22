import "server-only";

import { mapMarketingPage } from "./marketing-page";
import { resolveLocalizedField } from "./locale";
import { sanityFetch } from "./sanity-fetch";
import type {
  ContentLocale,
  LocalizedField,
  ServiceItemDto,
  ServicesPageDto,
} from "./types";

type ServiceRow = {
  key?: string;
  title?: LocalizedField<string>;
  body?: LocalizedField<string>;
};

type ServicesPageDocument = Parameters<typeof mapMarketingPage>[0] & {
  services?: ServiceRow[];
};

const SERVICES_PAGE_QUERY = `*[_type == "servicesPage"][0]{
  heroHeadline,
  heroSubheadline,
  body,
  services[]{
    key,
    title,
    body
  }
}`;

export async function getServicesPage(
  locale: ContentLocale,
): Promise<ServicesPageDto | null> {
  const doc = await sanityFetch<ServicesPageDocument | null>(
    SERVICES_PAGE_QUERY,
  );
  const base = mapMarketingPage(doc, locale);
  if (!base) {
    return null;
  }

  const services: ServiceItemDto[] = [];
  for (const row of doc?.services ?? []) {
    if (!row.key) continue;
    const title = resolveLocalizedField(row.title, locale);
    const body = resolveLocalizedField(row.body, locale);
    if (!title || !body) continue;
    services.push({ key: row.key, title, body });
  }

  return { ...base, services };
}