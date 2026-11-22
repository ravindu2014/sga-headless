import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { routing, type Locale } from "@/i18n/routing";
import {
  getContentLayerStatus,
  getSiteSettings,
  getVehicles,
} from "@/content";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "metadata" });
  const site = await getSiteSettings(locale as Locale);

  return {
    title: site?.seoTitle?.value ?? t("title"),
    description: site?.seoDescription?.value ?? t("description"),
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const contentLocale = locale as Locale;

  await getContentLayerStatus();
  await getVehicles(contentLocale);

  const t = await getTranslations("home");

  return (
    <main className="mx-auto flex min-h-screen max-w-content flex-col items-center justify-center gap-6 px-page-gutter-mobile py-section-y text-center md:px-page-gutter-desktop">
      <Image
        src="/brand/sga_small_logo.jpg"
        alt={t("title")}
        width={200}
        height={80}
        className="h-10 w-auto"
        priority
      />
      <h1 className="text-display-mobile text-primary md:text-display">
        {t("title")}
      </h1>
      <p className="max-w-prose text-body text-on-surface-muted">
        {t("scaffoldNote")}
      </p>
      <div
        className="w-full max-w-sm rounded-container border border-border bg-surface p-card-padding text-left"
        aria-hidden
      >
        <p className="text-label text-primary">Design tokens</p>
        <p className="mt-2 text-body-sm text-on-surface">
          Primary navy, accent crimson,{" "}
          <span className="text-accent">3px container radius</span>, catalogue
          gap 1.5rem.
        </p>
      </div>
      <span className="inline-flex min-h-tap cursor-default items-center justify-center rounded-md bg-accent px-6 font-semibold text-body text-on-accent">
        Browse vehicles
      </span>
    </main>
  );
}