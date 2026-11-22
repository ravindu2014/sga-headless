import "server-only";

import { getVehicleSlugs } from "./vehicles";

/** Slugs for nested `vehicles/[slug]` (parent `[locale]` supplies locale). */
export async function generateVehicleDetailSlugParams() {
  const slugs = await getVehicleSlugs();
  return slugs.map((slug) => ({ slug }));
}