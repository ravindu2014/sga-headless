import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";

export async function SkipLink({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale });
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-on-primary"
    >
      {t("skipLink")}
    </a>
  );
}