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

/** Public DTO — no Sanity document types in UI. */
export type SiteSettingsDto = {
  phone: string;
  whatsapp: string;
  email: string;
  seoTitle?: LocalizedValue<string>;
  seoDescription?: LocalizedValue<string>;
};