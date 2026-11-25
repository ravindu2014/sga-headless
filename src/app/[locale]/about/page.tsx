import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getAboutPage } from "@/content";
import { MarketingHero } from "@/components/cms/MarketingHero";
import { PortableTextBody } from "@/components/cms/PortableTextBody";
import { routing, localeStaticParams, type Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return localeStaticParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const [tNav, tMeta] = await Promise.all([
    getTranslations({ locale, namespace: "nav" }),
    getTranslations({ locale, namespace: "metadata" }),
  ]);
  return buildPageMetadata(locale as Locale, {
    path: "about",
    title: tNav("about"),
    description: tMeta("aboutDescription"),
  });
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const page = await getAboutPage(locale as Locale);
  const t = await getTranslations("nav");

  if (!page) {
    return (
      <main className="mx-auto max-w-content px-page-gutter-mobile py-section-y md:px-page-gutter-desktop min-[1264px]:px-page-gutter-wide">
        <h1 className="text-headline text-primary">{t("about")}</h1>
        <p className="mt-4 text-body text-on-surface-muted">
          Content coming soon.
        </p>
      </main>
    );
  }

  return (
    <main>
      <MarketingHero page={page} />
      {page.body ? (
        <section className="mx-auto max-w-prose px-page-gutter-mobile pb-section-y md:px-page-gutter-desktop">
          <PortableTextBody value={page.body} />
        </section>
      ) : null}
    </main>
  );
}