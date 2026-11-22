"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Link } from "@/i18n/navigation";
import type { VehicleSummaryDto } from "@/content";
import { formatLkr } from "@/lib/format";
import type { Locale } from "@/i18n/routing";

export type VehicleCatalogLabels = {
  priceOnRequest: string;
  featured: string;
  available: string;
  sold: string;
  unavailable: string;
  filterMake: string;
  filterFuel: string;
  filterTransmission: string;
  filterAll: string;
  filterEmpty: string;
  clearFilters: string;
};

type Props = {
  vehicles: VehicleSummaryDto[];
  locale: Locale;
  labels: VehicleCatalogLabels;
};

function specsLine(vehicle: VehicleSummaryDto): string {
  return [vehicle.fuelType, vehicle.transmission].filter(Boolean).join(" · ");
}

export function VehicleCatalog({ vehicles, locale, labels }: Props) {
  const [make, setMake] = useState("");
  const [fuel, setFuel] = useState("");
  const [transmission, setTransmission] = useState("");

  const makes = useMemo(
    () => [...new Set(vehicles.map((v) => v.make))].sort(),
    [vehicles],
  );
  const fuels = useMemo(
    () =>
      [...new Set(vehicles.map((v) => v.fuelType).filter(Boolean))].sort() as string[],
    [vehicles],
  );
  const transmissions = useMemo(
    () =>
      [...new Set(vehicles.map((v) => v.transmission).filter(Boolean))].sort() as string[],
    [vehicles],
  );

  const filtered = useMemo(
    () =>
      vehicles.filter((v) => {
        if (make && v.make !== make) return false;
        if (fuel && v.fuelType !== fuel) return false;
        if (transmission && v.transmission !== transmission) return false;
        return true;
      }),
    [vehicles, make, fuel, transmission],
  );

  const showFilters =
    makes.length > 1 || fuels.length > 0 || transmissions.length > 0;

  const selectClass =
    "min-h-tap rounded-md border border-border bg-surface px-3 text-body-sm text-on-surface";

  return (
    <div>
      {showFilters ? (
        <div className="mt-6 flex flex-wrap gap-3" role="group" aria-label="Filters">
          {makes.length > 1 ? (
            <label className="flex flex-col gap-1 text-body-sm">
              <span className="text-label text-on-surface-muted">
                {labels.filterMake}
              </span>
              <select
                className={selectClass}
                value={make}
                onChange={(e) => setMake(e.target.value)}
              >
                <option value="">{labels.filterAll}</option>
                {makes.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </label>
          ) : null}
          {fuels.length > 0 ? (
            <label className="flex flex-col gap-1 text-body-sm">
              <span className="text-label text-on-surface-muted">
                {labels.filterFuel}
              </span>
              <select
                className={selectClass}
                value={fuel}
                onChange={(e) => setFuel(e.target.value)}
              >
                <option value="">{labels.filterAll}</option>
                {fuels.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </label>
          ) : null}
          {transmissions.length > 0 ? (
            <label className="flex flex-col gap-1 text-body-sm">
              <span className="text-label text-on-surface-muted">
                {labels.filterTransmission}
              </span>
              <select
                className={selectClass}
                value={transmission}
                onChange={(e) => setTransmission(e.target.value)}
              >
                <option value="">{labels.filterAll}</option>
                {transmissions.map((tr) => (
                  <option key={tr} value={tr}>
                    {tr}
                  </option>
                ))}
              </select>
            </label>
          ) : null}
        </div>
      ) : null}

      {filtered.length === 0 ? (
        <div className="mt-8 rounded-container border border-border p-card-padding">
          <p className="text-body text-on-surface-muted">{labels.filterEmpty}</p>
          <button
            type="button"
            className="mt-3 text-body-sm font-medium text-primary hover:underline"
            onClick={() => {
              setMake("");
              setFuel("");
              setTransmission("");
            }}
          >
            {labels.clearFilters}
          </button>
        </div>
      ) : (
        <div className="mt-8 grid gap-catalogue-gap bg-background sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((vehicle) => {
            const priceLabel =
              vehicle.priceLkr != null
                ? formatLkr(vehicle.priceLkr, locale)
                : labels.priceOnRequest;
            const specs = specsLine(vehicle);
            return (
              <Link
                key={vehicle.slug}
                href={`/vehicles/${vehicle.slug}`}
                className="block rounded-container border border-border bg-surface transition-colors hover:border-border-strong"
              >
                <div className="relative aspect-[4/3] overflow-hidden border-b border-border bg-surface">
                  {vehicle.mainImage?.url ? (
                    <Image
                      src={vehicle.mainImage.url}
                      alt={vehicle.mainImage.alt ?? vehicle.title.value}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="flex aspect-[4/3] items-center justify-center text-body-sm text-on-surface-muted">
                      {vehicle.title.value}
                    </div>
                  )}
                </div>
                <div className="p-card-padding">
                  <div className="mb-2 flex flex-wrap gap-2">
                    {vehicle.featured ? (
                      <span className="inline-block rounded-full bg-primary px-2 py-0.5 text-label font-medium text-on-primary">
                        {labels.featured}
                      </span>
                    ) : null}
                    <span className="inline-block rounded-full bg-surface-muted px-2 py-0.5 text-label font-medium text-on-surface-muted">
                      {labels[vehicle.availability]}
                    </span>
                  </div>
                  <h2 className="text-title text-on-surface">
                    {vehicle.title.value}
                  </h2>
                  <p className="mt-1 text-body-sm text-on-surface-muted">
                    {vehicle.year} · {vehicle.make} · {vehicle.model}
                  </p>
                  {specs ? (
                    <p className="mt-1 text-body-sm text-on-surface-muted">
                      {specs}
                    </p>
                  ) : null}
                  <p className="mt-2 text-price text-on-surface">{priceLabel}</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}