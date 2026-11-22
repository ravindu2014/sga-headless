import type { SchemaTypeDefinition } from "sanity";
import { aboutPage } from "./documents/aboutPage";
import { contactPage } from "./documents/contactPage";
import { faqPage } from "./documents/faqPage";
import { homePage } from "./documents/homePage";
import { servicesPage } from "./documents/servicesPage";
import { siteSettings } from "./documents/siteSettings";
import { vehicle } from "./documents/vehicle";
import { localeFieldsTest } from "./dev/localeFieldsTest";
import { localeBlock, localeString, localeText } from "./locale";
import { faqItem } from "./objects/faqItem";
import { serviceItem } from "./objects/serviceItem";

export const schemaTypes: SchemaTypeDefinition[] = [
  localeString,
  localeText,
  localeBlock,
  serviceItem,
  faqItem,
  siteSettings,
  homePage,
  aboutPage,
  contactPage,
  servicesPage,
  faqPage,
  vehicle,
  localeFieldsTest,
];