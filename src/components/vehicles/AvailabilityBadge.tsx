import { getTranslations } from "next-intl/server";
import type { VehicleAvailability } from "@/content";

type Props = {
  availability: VehicleAvailability;
};

export async function AvailabilityBadge({ availability }: Props) {
  const t = await getTranslations("vehicles");

  if (availability === "available") {
    return (
      <span className="inline-block rounded-full bg-[#DCFCE7] px-2 py-0.5 text-label font-medium text-success">
        {t("available")}
      </span>
    );
  }

  if (availability === "sold") {
    return (
      <span className="inline-block rounded-full bg-surface-muted px-2 py-0.5 text-label font-medium text-on-surface-muted">
        {t("sold")}
      </span>
    );
  }

  return (
    <span className="inline-block rounded-full bg-surface-muted px-2 py-0.5 text-label font-medium text-on-surface-muted">
      {t("unavailable")}
    </span>
  );
}