import { useTranslations } from "next-intl";

type Props = {
  show: boolean;
};

export function FallbackChip({ show }: Props) {
  const t = useTranslations();
  if (!show) return null;
  return (
    <span className="ml-2 inline-block rounded-full bg-lang-track px-2 py-0.5 text-label font-medium text-on-surface-muted">
      {t("fallbackChip")}
    </span>
  );
}