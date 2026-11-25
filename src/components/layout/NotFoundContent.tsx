import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function NotFoundContent() {
  const t = await getTranslations("notFound");
  const cta = await getTranslations("cta");

  return (
    <main className="mx-auto max-w-content px-page-gutter-mobile py-4 md:px-page-gutter-desktop min-[1264px]:px-page-gutter-wide">
      <h1 className="text-headline text-primary">{t("title")}</h1>
      <p className="mt-2 max-w-prose text-body text-on-surface-muted">{t("body")}</p>
      <Link
        href="/vehicles"
        className="mt-4 inline-flex min-h-tap items-center justify-center rounded-md bg-accent px-3 font-semibold text-body-sm text-on-accent hover:bg-accent-hover"
      >
        {cta("browseVehicles")}
      </Link>
    </main>
  );
}
