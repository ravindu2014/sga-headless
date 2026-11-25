import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getSiteSettings } from "@/content";
import { SiteShell } from "@/components/layout/SiteShell";
import { routing, localeStaticParams, type Locale } from "@/i18n/routing";
import { normalizeSiteOrigin } from "@/lib/site-url";
import { fontVariables } from "../fonts";
import "../globals.css";

export function generateStaticParams() {
  return localeStaticParams();
}

type LayoutParams = { locale: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<LayoutParams>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const contentLocale = locale as Locale;
  const [settings, t] = await Promise.all([
    getSiteSettings(contentLocale),
    getTranslations({ locale, namespace: "metadata" }),
  ]);
  const siteTitle = settings?.seoTitle?.value ?? t("title");
  const description = settings?.seoDescription?.value ?? t("description");

  return {
    metadataBase: new URL(normalizeSiteOrigin(settings?.canonicalBaseUrl)),
    title: {
      default: siteTitle,
      template: `%s | ${siteTitle}`,
    },
    description,
  };
}

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const settings = await getSiteSettings(locale as Locale);

  return (
    <html lang={locale}>
      <body
        className={`${fontVariables} min-h-screen`}
      >
        <NextIntlClientProvider messages={messages}>
          <SiteShell settings={settings}>{children}</SiteShell>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}