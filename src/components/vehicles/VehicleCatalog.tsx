"use client";

import { useMemo, useState } from "react";
import type { VehicleSummaryDto } from "@/content";
import type { Locale } from "@/i18n/routing";
import {
  VehicleSummaryCard,
  type VehicleSummaryCardLabels,
} from "./VehicleSummaryCard";

export type VehicleCatalogLabels = VehicleSummaryCardLabels & {
  filterMake: string;
  filterModel: string;
  filterYear: string;
  filterBudget: string;
  filterAll: string;
  budgetUnder: string;
  budgetMid: string;
  budgetOver: string;
  budgetPoa: string;
  filterEmpty: string;
  clearFilters: string;
};

type Props = {
  vehicles: VehicleSummaryDto[];
  locale: Locale;
  labels: VehicleCatalogLabels;
};

type Budget = "" | "under" | "mid" | "over" | "poa";

function matchesBudget(vehicle: VehicleSummaryDto, budget: Budget): boolean {
  if (!budget) return true;
  if (budget === "poa") return vehicle.priceLkr == null;
  if (vehicle.priceLkr == null) return false;
  if (budget === "under") return vehicle.priceLkr < 5_000_000;
  if (budget === "mid") {
    return vehicle.priceLkr >= 5_000_000 && vehicle.priceLkr <= 10_000_000;
  }
  return vehicle.priceLkr > 10_000_000;
}

export function VehicleCatalog({ vehicles, locale, labels }: Props) {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [budget, setBudget] = useState<Budget>("");

  const makes = useMemo(
    () => [...new Set(vehicles.map((v) => v.make))].sort(),
    [vehicles],
  );
  const models = useMemo(() => {
    const source = make ? vehicles.filter((v) => v.make === make) : vehicles;
    return [...new Set(source.map((v) => v.model))].sort();
  }, [vehicles, make]);
  const years = useMemo(
    () =>
      [...new Set(vehicles.map((v) => v.year))].sort((a, b) => b - a),
    [vehicles],
  );

  const filtered = useMemo(
    () =>
      vehicles.filter((v) => {
        if (make && v.make !== make) return false;
        if (model && v.model !== model) return false;
        if (year && String(v.year) !== year) return false;
        if (!matchesBudget(v, budget)) return false;
        return true;
      }),
    [vehicles, make, model, year, budget],
  );

  const selectClass = "field-select text-body-sm";

  function reset() {
    setMake("");
    setModel("");
    setYear("");
    setBudget("");
  }

  return (
    <div>
      <div
        className="mt-4 flex flex-col gap-3 lg:flex-row lg:flex-nowrap lg:items-end"
        role="group"
        aria-label={labels.filterMake}
      >
        <label className="flex min-w-0 flex-1 flex-col gap-1 text-body-sm">
          <span className="text-label text-on-surface-muted">
            {labels.filterMake}
          </span>
          <select
            className={`${selectClass} w-full`}
            value={make}
            onChange={(e) => {
              setMake(e.target.value);
              setModel("");
            }}
          >
            <option value="">{labels.filterAll}</option>
            {makes.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label className="flex min-w-0 flex-1 flex-col gap-1 text-body-sm">
          <span className="text-label text-on-surface-muted">
            {labels.filterModel}
          </span>
          <select
            className={`${selectClass} w-full`}
            value={model}
            onChange={(e) => setModel(e.target.value)}
          >
            <option value="">{labels.filterAll}</option>
            {models.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label className="flex min-w-0 flex-1 flex-col gap-1 text-body-sm">
          <span className="text-label text-on-surface-muted">
            {labels.filterYear}
          </span>
          <select
            className={`${selectClass} w-full`}
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option value="">{labels.filterAll}</option>
            {years.map((item) => (
              <option key={item} value={String(item)}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label className="flex min-w-0 flex-[1.4] flex-col gap-1 text-body-sm">
          <span className="text-label text-on-surface-muted">
            {labels.filterBudget}
          </span>
          <select
            className={`${selectClass} w-full`}
            value={budget}
            onChange={(e) => setBudget(e.target.value as Budget)}
          >
            <option value="">{labels.filterAll}</option>
            <option value="under">{labels.budgetUnder}</option>
            <option value="mid">{labels.budgetMid}</option>
            <option value="over">{labels.budgetOver}</option>
            <option value="poa">{labels.budgetPoa}</option>
          </select>
        </label>
        <button
          type="button"
          className="min-h-tap shrink-0 rounded-md border border-border-strong px-3 text-body-sm font-semibold text-primary"
          onClick={reset}
        >
          {labels.clearFilters}
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-8 rounded-container border border-border p-card-padding">
          <p className="text-body text-on-surface-muted">{labels.filterEmpty}</p>
        </div>
      ) : (
        <div className="mt-6 grid items-stretch gap-catalogue-gap bg-background sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((vehicle) => (
            <VehicleSummaryCard
              key={vehicle.slug}
              vehicle={vehicle}
              locale={locale}
              labels={labels}
              headingLevel="h2"
            />
          ))}
        </div>
      )}
    </div>
  );
}
