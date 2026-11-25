import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { VehicleSummaryDto } from "@/content";
import { formatLkr } from "@/lib/format";
import type { Locale } from "@/i18n/routing";

export type VehicleSummaryCardLabels = {
  priceOnRequest: string;
  featured: string;
  available: string;
  sold: string;
  unavailable: string;
  viewDetails: string;
  factYear: string;
  factMileage: string;
  factTransmission: string;
};

type Props = {
  vehicle: VehicleSummaryDto;
  locale: Locale;
  labels: VehicleSummaryCardLabels;
  headingLevel?: "h2" | "h3";
};

function formatKm(value: number, locale: Locale): string {
  return `${value.toLocaleString(locale === "si" ? "si-LK" : "en-LK")} km`;
}

export function VehicleSummaryCard({
  vehicle,
  locale,
  labels,
  headingLevel = "h3",
}: Props) {
  const Heading = headingLevel;
  const href = `/vehicles/${vehicle.slug}`;
  const priceLabel =
    vehicle.priceLkr != null
      ? formatLkr(vehicle.priceLkr, locale)
      : labels.priceOnRequest;

  return (
    <article className="flex h-full flex-col rounded-container border border-border bg-surface">
      <Link href={href} className="block">
        <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-surface">
          {vehicle.mainImage?.url ? (
            <Image
              src={vehicle.mainImage.url}
              alt={vehicle.mainImage.alt ?? vehicle.title.value}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center px-4 text-center text-body-sm text-on-surface-muted">
              {vehicle.title.value}
            </div>
          )}
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-card-padding">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          {vehicle.featured ? (
            <span className="inline-block rounded-full bg-primary px-2 py-0.5 text-label font-medium text-on-primary">
              {labels.featured}
            </span>
          ) : null}
          <span
            className={
              vehicle.availability === "available"
                ? "inline-block rounded-full bg-[#DCFCE7] px-2 py-0.5 text-label font-medium text-success"
                : "inline-block rounded-full border border-border px-2 py-0.5 text-label font-medium text-on-surface-muted"
            }
          >
            {labels[vehicle.availability]}
          </span>
        </div>
        <Heading className="text-body font-semibold leading-snug text-on-surface">
          <Link href={href} className="hover:text-primary">
            {vehicle.title.value}
          </Link>
        </Heading>
        <p className="mt-1 text-body-sm text-on-surface-muted">
          {vehicle.make} · {vehicle.model}
        </p>
        <p className="mt-2 text-body-sm text-on-surface">
          {[
            String(vehicle.year),
            vehicle.mileage != null ? formatKm(vehicle.mileage, locale) : null,
            vehicle.transmission,
          ]
            .filter(Boolean)
            .join(" · ")}
        </p>
        <p className="mt-2 text-price text-on-surface">{priceLabel}</p>
        <Link
          href={href}
          className="mt-3 inline-flex min-h-tap items-center justify-center rounded-md bg-accent px-3 text-body font-semibold text-on-accent hover:bg-accent-hover"
        >
          {labels.viewDetails}
        </Link>
      </div>
    </article>
  );
}
