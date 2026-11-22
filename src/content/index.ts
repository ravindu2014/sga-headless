/**
 * AD-2 content boundary — UI imports typed helpers from here only (no GROQ in pages).
 */

export { getContentLayerStatus } from "./health";
export { getSiteSettings } from "./site-settings";
export { getVehicles } from "./vehicles";
export { resolveLocalizedField } from "./locale";
export type { VehicleSummaryDto } from "./vehicles";
export type {
  ContentLayerStatus,
  ContentLocale,
  LocalizedField,
  LocalizedValue,
  SiteSettingsDto,
} from "./types";