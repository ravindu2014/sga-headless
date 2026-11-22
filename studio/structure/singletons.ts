export const SINGLETON_SCHEMA_TYPES = [
  "siteSettings",
  "homePage",
  "aboutPage",
  "servicesPage",
  "faqPage",
  "contactPage",
] as const;

export type SingletonSchemaType = (typeof SINGLETON_SCHEMA_TYPES)[number];

export const singletonSchemaTypes = new Set<string>(SINGLETON_SCHEMA_TYPES);