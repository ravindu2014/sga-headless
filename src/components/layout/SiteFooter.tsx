import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { SiteSettingsDto } from "@/content";

const NAV_ITEMS = [
  { href: "/", key: "home" },
  { href: "/vehicles", key: "vehicles" },
  { href: "/services", key: "services" },
  { href: "/about", key: "about" },
  { href: "/faq", key: "faq" },
  { href: "/contact", key: "contact" },
] as const;

type Props = {
  settings: SiteSettingsDto | null;
};

export async function SiteFooter({ settings }: Props) {
  const nav = await getTranslations("nav");
  const footer = await getTranslations("footer");

  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto grid max-w-content gap-catalogue-gap px-page-gutter-mobile py-section-y md:grid-cols-2 md:px-page-gutter-desktop min-[1264px]:px-page-gutter-wide lg:grid-cols-3">
        <div>
          <h2 className="text-title text-primary">{footer("contactHeading")}</h2>
          {settings ? (
            <ul className="mt-3 space-y-2 text-body-sm text-on-surface">
              <li>
                <a
                  href={`tel:${settings.phone.replace(/\s/g, "")}`}
                  className="text-primary hover:text-primary-hover"
                >
                  {settings.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${settings.email}`}
                  className="text-primary hover:text-primary-hover"
                >
                  {settings.email}
                </a>
              </li>
            </ul>
          ) : (
            <p className="mt-3 text-body-sm text-on-surface-muted">
              {footer("legalPlaceholder")}
            </p>
          )}
        </div>
        <div>
          <h2 className="text-title text-primary">{footer("navHeading")}</h2>
          <ul className="mt-3 space-y-2 text-body-sm">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-on-surface hover:text-primary"
                >
                  {nav(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-body-sm text-on-surface-muted">
          {footer("legalPlaceholder")}
        </p>
      </div>
    </footer>
  );
}