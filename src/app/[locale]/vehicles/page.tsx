import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getVehicles } from "@/content";
import {
  VehicleCatalog,
  type VehicleCatalogLabels,
} from "@/components/vehicles/VehicleCatalog";
import { routing, localeStaticParams, type Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return localeStaticParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const [tVehicles, tMeta] = await Promise.all([
    getTranslations({ locale, namespace: "vehicles" }),
    getTranslations({ locale, namespace: "metadata" }),
  ]);
  return buildPageMetadata(locale as Locale, {
    path: "vehicles",
    title: tVehicles("title"),
    description: tMeta("vehiclesDescription"),
  });
}

export default async function VehiclesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const contentLocale = locale as Locale;
  const vehicles = await getVehicles(contentLocale);
  const t = await getTranslations("vehicles");
  const cta = await getTranslations("cta");

  const labels: VehicleCatalogLabels = {
    priceOnRequest: t("priceOnRequest"),
    featured: t("featured"),
    available: t("available"),
    sold: t("sold"),
    unavailable: t("unavailable"),
    filterMake: t("filterMake"),
    filterModel: t("filterModel"),
    filterYear: t("filterYear"),
    filterBudget: t("filterBudget"),
    filterAll: t("filterAll"),
    budgetUnder: t("budgetUnder"),
    budgetMid: t("budgetMid"),
    budgetOver: t("budgetOver"),
    budgetPoa: t("budgetPoa"),
    filterEmpty: t("filterEmpty"),
    clearFilters: t("clearFilters"),
    viewDetails: t("viewDetails"),
    factYear: t("factYear"),
    factMileage: t("factMileage"),
    factTransmission: t("factTransmission"),
  };

  return (
    <main className="mx-auto max-w-content px-page-gutter-mobile py-section-y md:px-page-gutter-desktop">
      <h1 className="text-headline text-primary">{t("title")}</h1>
      {vehicles.length ? (
        <VehicleCatalog
          vehicles={vehicles}
          locale={contentLocale}
          labels={labels}
        />
      ) : (
        <div className="mt-8 max-w-prose rounded-container border border-border p-card-padding">
          <h2 className="text-title text-primary">{t("emptyTitle")}</h2>
          <p className="mt-2 text-body text-on-surface-muted">{t("emptyBody")}</p>
          <Link
            href="/contact"
            className="mt-4 inline-flex min-h-tap items-center justify-center rounded-md bg-accent px-6 font-semibold text-body text-on-accent"
          >
            {cta("contactUs")}
          </Link>
        </div>
      )}
    </main>
  );
}