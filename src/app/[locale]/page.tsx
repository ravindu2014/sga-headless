import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  getFeaturedVehicles,
  getHomePage,
  type MarketingPageDto,
} from "@/content";
import { MarketingHero } from "@/components/cms/MarketingHero";
import { PortableTextBody } from "@/components/cms/PortableTextBody";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
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
    title: tNav("home"),
    description: tMeta("homeDescription"),
  });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const contentLocale = locale as Locale;
  const t = await getTranslations("home");
  const cta = await getTranslations("cta");

  const cms = await getHomePage(contentLocale);
  const featured = await getFeaturedVehicles(contentLocale);

  const page: MarketingPageDto = cms ?? {
    heroHeadline: { value: t("defaultHero"), usedFallback: false },
    heroSubheadline: { value: t("defaultSub"), usedFallback: false },
  };

  return (
    <main>
      <MarketingHero
        page={page}
        primaryCta={{ href: "/vehicles", label: cta("browseVehicles") }}
        secondaryCta={{ href: "/contact", label: cta("contactUs") }}
      />
      {page.body ? (
        <section className="mx-auto max-w-prose px-page-gutter-mobile pb-section-y md:px-page-gutter-desktop">
          <PortableTextBody value={page.body} />
        </section>
      ) : null}
      <section className="border-t border-border">
        <div className="mx-auto max-w-content px-page-gutter-mobile py-section-y md:px-page-gutter-desktop">
          <h2 className="text-headline text-primary">{t("featuredTitle")}</h2>
          {featured.length ? (
            <div className="mt-4 grid gap-catalogue-gap bg-background sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((vehicle) => (
                <VehicleCard
                  key={vehicle.slug}
                  vehicle={vehicle}
                  locale={contentLocale}
                />
              ))}
            </div>
          ) : (
            <p className="mt-4 text-body text-on-surface-muted">
              {t("featuredEmpty")}{" "}
              <Link href="/vehicles" className="text-primary hover:underline">
                {cta("viewAllVehicles")}
              </Link>
            </p>
          )}
        </div>
      </section>
    </main>
  );
}