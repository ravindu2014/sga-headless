"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageSwitch } from "./LanguageSwitch";
import { MobileNav } from "./MobileNav";

const NAV_ITEMS = [
  { href: "/", key: "home" },
  { href: "/vehicles", key: "vehicles" },
  { href: "/services", key: "services" },
  { href: "/about", key: "about" },
  { href: "/faq", key: "faq" },
  { href: "/contact", key: "contact" },
] as const;

function DesktopNav() {
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <nav
      className="hidden items-center gap-5 text-body-sm font-medium lg:flex"
      aria-label={t("primary")}
    >
      {NAV_ITEMS.map((item) => {
        const active =
          item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={
              active
                ? "text-primary"
                : "text-on-surface hover:text-primary-hover"
            }
          >
            {t(item.key)}
          </Link>
        );
      })}
    </nav>
  );
}

export function SiteHeader() {
  const t = useTranslations("common");

  return (
    <header className="relative border-b border-border bg-surface">
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
        <DesktopNav />
        <div className="flex items-center gap-3">
          <LanguageSwitch />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}