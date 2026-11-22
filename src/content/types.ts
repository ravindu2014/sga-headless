import type { Locale } from "@/i18n/routing";

export type ContentLocale = Locale;

/** CMS field shape per AD-4 — English required, Sinhala optional. */
export type LocalizedField<T = string> = {
  en: T;
  si?: T;
};

export type LocalizedValue<T = string> = {
  value: T;
  usedFallback: boolean;
};

export type ContentLayerStatus = {
  projectId: string;
  dataset: string;
  apiVersion: string;
  reachable: boolean;
};

export type ImageDto = {
  url: string;
  alt?: string;
};

/** Portable Text blocks — rendered in epic 3+. */
export type PortableTextValue = unknown[];

export type MarketingPageDto = {
  heroHeadline: LocalizedValue<string>;
  heroSubheadline?: LocalizedValue<string>;
  body?: LocalizedValue<PortableTextValue>;
  heroImage?: ImageDto;
  enquiryIntro?: LocalizedValue<string>;
};

export type ServiceItemDto = {
  key: string;
  title: LocalizedValue<string>;
  body: LocalizedValue<string>;
};

export type ServicesPageDto = MarketingPageDto & {
  services: ServiceItemDto[];
};

export type FaqItemDto = {
  question: LocalizedValue<string>;
  answer: LocalizedValue<string>;
};

export type FaqPageDto = MarketingPageDto & {
  items: FaqItemDto[];
};

export type VehicleAvailability = "available" | "sold" | "unavailable";

export type VehicleSummaryDto = {
  slug: string;
  title: LocalizedValue<string>;
  make: string;
  model: string;
  year: number;
  featured: boolean;
  availability: VehicleAvailability;
  priceLkr?: number;
  mainImage?: ImageDto;
};

export type VehicleDetailDto = VehicleSummaryDto & {
  mileage?: number;
  transmission?: string;
  fuelType?: string;
  exteriorColour?: string;
  description?: LocalizedValue<string>;
  features?: LocalizedValue<string>;
  gallery: ImageDto[];
};

/** Public DTO — no Sanity document types in UI. */
export type SiteSettingsDto = {
  phone: string;
  whatsapp: string;
  email: string;
  canonicalBaseUrl?: string;
  seoTitle?: LocalizedValue<string>;
  seoDescription?: LocalizedValue<string>;
};