import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { VehicleSummaryDto } from "@/content";
import { formatLkr } from "@/lib/format";
import type { Locale } from "@/i18n/routing";
import { AvailabilityBadge } from "./AvailabilityBadge";

type Props = {
  vehicle: VehicleSummaryDto;
  locale: Locale;
};

function specLine(vehicle: VehicleSummaryDto): string {
  const parts = [vehicle.fuelType, vehicle.transmission].filter(Boolean);
  return parts.join(" · ");
}

export async function VehicleCard({ vehicle, locale }: Props) {
  const t = await getTranslations("vehicles");
  const priceLabel =
    vehicle.priceLkr != null
      ? formatLkr(vehicle.priceLkr, locale)
      : t("priceOnRequest");

  const specs = specLine(vehicle);

  return (
    <Link
      href={`/vehicles/${vehicle.slug}`}
      className="block rounded-container border border-border bg-surface transition-colors hover:border-border-strong"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-container border-b border-border bg-surface">
        {vehicle.mainImage?.url ? (
          <Image
            src={vehicle.mainImage.url}
            alt={vehicle.mainImage.alt ?? vehicle.title.value}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-body-sm text-on-surface-muted">
            {vehicle.title.value}
          </div>
        )}
      </div>
      <div className="p-card-padding">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          {vehicle.featured ? (
            <span className="inline-block rounded-full bg-primary px-2 py-0.5 text-label font-medium text-on-primary">
              {t("featured")}
            </span>
          ) : null}
          <AvailabilityBadge availability={vehicle.availability} />
        </div>
        <h3 className="text-title text-on-surface">{vehicle.title.value}</h3>
        <p className="mt-1 text-body-sm text-on-surface-muted">
          {vehicle.year} · {vehicle.make} · {vehicle.model}
        </p>
        {specs ? (
          <p className="mt-1 text-body-sm text-on-surface-muted">{specs}</p>
        ) : null}
        <p className="mt-2 text-price text-on-surface">{priceLabel}</p>
      </div>
    </Link>
  );
}