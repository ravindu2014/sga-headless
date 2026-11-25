import { getTranslations } from "next-intl/server";
import type { VehicleSummaryDto } from "@/content";
import type { Locale } from "@/i18n/routing";
import { VehicleSummaryCard } from "./VehicleSummaryCard";

type Props = {
  vehicle: VehicleSummaryDto;
  locale: Locale;
};

export async function VehicleCard({ vehicle, locale }: Props) {
  const t = await getTranslations("vehicles");

  return (
    <VehicleSummaryCard
      vehicle={vehicle}
      locale={locale}
      labels={{
        priceOnRequest: t("priceOnRequest"),
        featured: t("featured"),
        available: t("available"),
        sold: t("sold"),
        unavailable: t("unavailable"),
        viewDetails: t("viewDetails"),
        factYear: t("factYear"),
        factMileage: t("factMileage"),
        factTransmission: t("factTransmission"),
      }}
    />
  );
}
