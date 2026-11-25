import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { getSiteSettings, getVehicleBySlug, getVehicleSlugs } from "@/content";
import { LocaleText } from "@/components/cms/LocaleText";
import { AvailabilityBadge } from "@/components/vehicles/AvailabilityBadge";
import { VehicleEnquiry } from "@/components/vehicles/VehicleEnquiry";
import { EXPORT_SENTINEL_SLUG } from "@/lib/constants";
import { formatLkr } from "@/lib/format";
import { buildPageMetadata } from "@/lib/seo";
import { absoluteUrl, normalizeSiteOrigin } from "@/lib/site-url";
import { routing, type Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const slugs = await getVehicleSlugs();
  if (slugs.length === 0) {
    // `output: export` requires at least one prerendered path for dynamic segments.
    return [{ slug: EXPORT_SENTINEL_SLUG }];
  }
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (slug === EXPORT_SENTINEL_SLUG) return {};
  if (!hasLocale(routing.locales, locale)) return {};
  const contentLocale = locale as Locale;
  const vehicle = await getVehicleBySlug(contentLocale, slug);
  if (!vehicle) return {};
  const summary = `${vehicle.year} ${vehicle.make} ${vehicle.model}`;
  return buildPageMetadata(contentLocale, {
    path: `vehicles/${slug}`,
    title: vehicle.title.value,
    description: summary,
    imageUrl: vehicle.mainImage?.url,
    openGraphType: "article",
  });
}

export default async function VehicleDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  if (slug === EXPORT_SENTINEL_SLUG) {
    notFound();
  }
  setRequestLocale(locale);
  const contentLocale = locale as Locale;

  const [vehicle, settings] = await Promise.all([
    getVehicleBySlug(contentLocale, slug),
    getSiteSettings(contentLocale),
  ]);

  if (!vehicle) {
    notFound();
  }

  const t = await getTranslations("vehicles");
  const detail = await getTranslations("vehicleDetail");
  const priceLabel =
    vehicle.priceLkr != null
      ? formatLkr(vehicle.priceLkr, contentLocale)
      : t("priceOnRequest");

  const pageUrl = absoluteUrl(
    normalizeSiteOrigin(settings?.canonicalBaseUrl),
    contentLocale,
    `vehicles/${vehicle.slug}`,
  );

  const mileageLabel =
    vehicle.mileage != null
      ? `${vehicle.mileage.toLocaleString(contentLocale === "si" ? "si-LK" : "en-LK")} km`
      : "";
  const specRows = [
    { label: detail("year"), value: String(vehicle.year) },
    { label: detail("make"), value: vehicle.make },
    { label: detail("model"), value: vehicle.model },
    { label: detail("mileage"), value: mileageLabel },
    { label: detail("transmission"), value: vehicle.transmission ?? "" },
    { label: detail("fuel"), value: vehicle.fuelType ?? "" },
    { label: detail("colour"), value: vehicle.exteriorColour ?? "" },
  ].filter((row) => row.value.trim().length > 0);

  const hasPhotos = Boolean(vehicle.mainImage?.url) || vehicle.gallery.length > 0;
  const description = vehicle.description;
  const features = vehicle.features;
  const hasStory = Boolean(description || features);

  function renderStory() {
    if (!description && !features) return null;
    return (
      <div className="space-y-4">
        {description ? (
          <LocaleText value={description} className="text-body text-on-surface" />
        ) : null}
        {features ? (
          <LocaleText
            value={features}
            as="div"
            className="whitespace-pre-wrap text-body-sm text-on-surface-muted"
          />
        ) : null}
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-content px-page-gutter-mobile py-4 md:px-page-gutter-desktop min-[1264px]:px-page-gutter-wide">
      <div className="lg:grid lg:grid-cols-[1.2fr_0.8fr] lg:items-start lg:gap-4">
        {hasPhotos || hasStory ? (
          <div className="space-y-4 lg:col-start-1">
            {hasPhotos ? (
              <div className="space-y-2">
                {vehicle.mainImage?.url ? (
                  <div className="relative aspect-[16/10] overflow-hidden rounded-container border border-border">
                    <Image
                      src={vehicle.mainImage.url}
                      alt={vehicle.mainImage.alt ?? vehicle.title.value}
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />
                  </div>
                ) : null}
                {vehicle.gallery.length > 0 ? (
                  <div className="grid grid-cols-3 gap-2">
                    {vehicle.gallery.map((img, index) => (
                      <div
                        key={index}
                        className="relative aspect-[16/10] overflow-hidden rounded-container border border-border"
                      >
                        <Image
                          src={img.url}
                          alt={img.alt ?? `${vehicle.title.value} ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="20vw"
                        />
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}
            {hasStory ? <div className="hidden lg:block">{renderStory()}</div> : null}
          </div>
        ) : null}

        <div
          className={
            hasPhotos
              ? "mt-4 lg:col-start-2 lg:mt-0 lg:self-stretch"
              : "lg:col-start-2 lg:self-stretch"
          }
        >
          <div className="flex flex-wrap items-center gap-2">
            <AvailabilityBadge availability={vehicle.availability} />
            {vehicle.featured ? (
              <span className="inline-block rounded-full bg-primary px-2 py-0.5 text-label font-medium text-on-primary">
                {t("featured")}
              </span>
            ) : null}
          </div>
          <h1 className="mt-2 text-headline text-primary">{vehicle.title.value}</h1>
          <p className="mt-1 text-body-sm text-on-surface-muted">
            {vehicle.year} · {vehicle.make} · {vehicle.model}
          </p>
          <p className="mt-4 text-price text-on-surface">{priceLabel}</p>
          {specRows.length > 0 ? (
            <section aria-labelledby="vehicle-specs" className="mt-4">
              <h2 id="vehicle-specs" className="text-title text-primary">
                {detail("specsTitle")}
              </h2>
              <dl className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {specRows.map((row) => (
                  <div
                    key={row.label}
                    className="rounded-container border border-border px-3 py-1.5"
                  >
                    <dt className="text-label text-on-surface-muted">{row.label}</dt>
                    <dd className="font-medium text-on-surface">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ) : null}
          {settings ? (
            <div className="mt-4 h-fit rounded-container border border-border p-card-padding lg:sticky lg:top-[5.5rem]">
              <VehicleEnquiry
                whatsapp={settings.whatsapp}
                vehicleTitle={vehicle.title.value}
                pageUrl={pageUrl}
              />
            </div>
          ) : null}
        </div>

        {hasStory ? <div className="mt-4 lg:hidden">{renderStory()}</div> : null}
      </div>
    </main>
  );
}