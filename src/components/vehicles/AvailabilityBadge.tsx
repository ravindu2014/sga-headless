import { getTranslations } from "next-intl/server";
import type { VehicleAvailability } from "@/content";
import type { Locale } from "@/i18n/routing";

type Props = {
  availability: VehicleAvailability;
  locale: Locale;
};

export async function AvailabilityBadge({ availability, locale }: Props) {
  const t = await getTranslations({ locale, namespace: "vehicles" });

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