import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "si"],
  defaultLocale: "en",
  localePrefix: "always",
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];

export function localeStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}