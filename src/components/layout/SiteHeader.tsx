"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageSwitch } from "./LanguageSwitch";
import { MobileNav } from "./MobileNav";
import { NavIcon } from "./NavIcon";
import { isNavActive, NAV_ITEMS } from "./nav-items";

function DesktopNav() {
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <nav
      className="hidden bg-primary lg:block"
      aria-label={t("primary")}
    >
      <ul className="mx-auto flex max-w-content items-stretch gap-1 px-page-gutter-desktop">
        {NAV_ITEMS.map((item) => {
          const active = isNavActive(pathname, item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={
                  active
                    ? "flex min-h-tap items-center gap-2 border-b-2 border-on-primary bg-white/15 px-3 text-body-sm font-semibold text-on-primary"
                    : "flex min-h-tap items-center gap-2 border-b-2 border-transparent px-3 text-body-sm font-medium text-on-primary/90 hover:bg-white/10 hover:text-on-primary"
                }
              >
                <NavIcon name={item.key} />
                <span>{t(item.key)}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function SiteHeader() {
  const t = useTranslations("common");

  return (
    <header className="sticky top-0 z-50 border-b border-primary bg-surface">
      <div className="mx-auto flex h-16 max-w-content items-center justify-between gap-4 px-page-gutter-mobile md:px-page-gutter-desktop">
        <Link href="/" className="shrink-0">
          <Image
            src="/brand/sga_small_logo.jpg"
            alt={t("brandName")}
            width={160}
            height={40}
            className="h-10 w-auto"
            priority
          />
        </Link>
        <div className="flex items-center gap-3">
          <LanguageSwitch />
          <MobileNav />
        </div>
      </div>
      <DesktopNav />
    </header>
  );
}
