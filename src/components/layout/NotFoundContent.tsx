"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function NotFoundContent() {
  const t = useTranslations("notFound");
  const cta = useTranslations("cta");

  return (
    <main className="mx-auto max-w-content px-page-gutter-mobile py-4 md:px-page-gutter-desktop min-[1264px]:px-page-gutter-wide">
      <h1 className="text-headline text-primary">{t("title")}</h1>
      <p className="mt-2 max-w-prose text-body text-on-surface-muted">{t("body")}</p>
      <Link
        href="/vehicles"
        className="mt-4 inline-flex min-h-tap items-center justify-center rounded-md bg-accent px-3 font-semibold text-body-sm text-on-accent hover:bg-accent-hover"
      >
        {cta("browseVehicles")}
      </Link>
    </main>
  );
}
