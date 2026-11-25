"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";

export function LanguageSwitch() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const t = useTranslations("lang");

  return (
    <div
      className="inline-flex rounded-full bg-lang-track p-1 text-body-sm"
      role="group"
      aria-label={t("switch")}
    >
      {routing.locales.map((loc) => {
        const active = loc === locale;
        return (
          <Link
            key={loc}
            href={pathname}
            locale={loc}
            className={`flex h-8 min-w-[2.75rem] items-center justify-center rounded-full px-3 text-center font-medium transition-colors ${
              active
                ? "bg-surface text-primary"
                : "text-on-surface hover:text-primary"
            }`}
            aria-current={active ? "true" : undefined}
          >
            {t(loc)}
          </Link>
        );
      })}
    </div>
  );
}