/**
 * AD-2 content boundary — UI imports typed helpers from here only (no GROQ in pages).
 */

export { getFaqPage } from "./faq";
export { getContentLayerStatus } from "./health";
export { getAboutPage, getContactPage, getHomePage } from "./pages";
export { getServicesPage } from "./services";
export { getSiteSettings } from "./site-settings";
export {
  getFeaturedVehicles,
  getVehicleBySlug,
  getVehicleSlugs,
  getVehicles,
} from "./vehicles";
export { resolveLocalizedField } from "./locale";
export type { VehicleDetailDto, VehicleSummaryDto } from "./vehicles";
export type {
  ContentLayerStatus,
  ContentLocale,
  FaqItemDto,
  FaqPageDto,
  ImageDto,
  LocalizedField,
  LocalizedValue,
  MarketingPageDto,
  ServiceItemDto,
  ServicesPageDto,
  SiteSettingsDto,
  VehicleAvailability,
} from "./types";