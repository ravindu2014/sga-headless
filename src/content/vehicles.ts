import "server-only";

import { resolveLocalizedField } from "./locale";
import { sanityFetch } from "./sanity-fetch";
import type { ContentLocale, LocalizedField, LocalizedValue } from "./types";

export type VehicleSummaryDto = {
  slug: string;
  title: LocalizedValue<string>;
  featured: boolean;
};

type VehicleListItem = {
  slug?: string;
  title?: LocalizedField<string>;
  featured?: boolean;
};

const VEHICLE_LIST_QUERY = `*[_type == "vehicle" && defined(slug.current)] | order(_updatedAt desc){
  "slug": slug.current,
  title,
  featured
}`;

/** Published vehicle catalogue (empty until epic 2 schemas + content). */
export async function getVehicles(
  locale: ContentLocale,
): Promise<VehicleSummaryDto[]> {
  const rows = await sanityFetch<VehicleListItem[] | null>(VEHICLE_LIST_QUERY);
  if (!rows?.length) {
    return [];
  }

  const vehicles: VehicleSummaryDto[] = [];

  for (const row of rows) {
    if (!row.slug) continue;
    const title = resolveLocalizedField(row.title, locale);
    if (!title) continue;
    vehicles.push({
      slug: row.slug,
      title,
      featured: Boolean(row.featured),
    });
  }

  return vehicles;
}