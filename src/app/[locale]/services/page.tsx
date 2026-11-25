import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getServicesPage } from "@/content";
import { MarketingHero } from "@/components/cms/MarketingHero";
import { LocaleText } from "@/components/cms/LocaleText";
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
    path: "services",
    title: tNav("services"),
    description: tMeta("servicesDescription"),
  });
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const page = await getServicesPage(locale as Locale);
  const t = await getTranslations("nav");

  if (!page) {
    return (
      <main className="mx-auto max-w-content px-page-gutter-mobile py-section-y md:px-page-gutter-desktop min-[1264px]:px-page-gutter-wide">
        <h1 className="text-headline text-primary">{t("services")}</h1>
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
        <section className="mx-auto max-w-prose px-page-gutter-mobile pb-8 md:px-page-gutter-desktop">
          <PortableTextBody value={page.body} />
        </section>
      ) : null}
      <section className="border-t border-border">
        <div className="mx-auto grid max-w-content gap-catalogue-gap px-page-gutter-mobile py-section-y md:grid-cols-3 md:px-page-gutter-desktop min-[1264px]:px-page-gutter-wide">
          {page.services.map((service) => (
            <article
              key={service.key}
              className="rounded-container border border-border bg-surface p-card-padding"
            >
              <h2 className="text-title text-primary">
                {service.title.value}
              </h2>
              <LocaleText
                value={service.body}
                className="mt-2 text-body text-on-surface"
              />
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}