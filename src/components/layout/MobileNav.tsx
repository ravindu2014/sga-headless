"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

const NAV_ITEMS = [
  { href: "/", key: "home" },
  { href: "/vehicles", key: "vehicles" },
  { href: "/services", key: "services" },
  { href: "/about", key: "about" },
  { href: "/faq", key: "faq" },
  { href: "/contact", key: "contact" },
] as const;

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className="min-h-tap min-w-tap rounded-md border border-border px-3 text-label font-medium text-on-surface"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? t("menuClose") : t("menuOpen")}
      </button>
      {open ? (
        <nav
          id="mobile-nav-panel"
          className="absolute left-0 right-0 top-16 z-40 border-b border-border bg-surface px-page-gutter-mobile py-4"
          aria-label={t("primary")}
        >
          <ul className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block min-h-tap py-2 text-body font-medium ${
                      active ? "text-primary" : "text-on-surface"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {t(item.key)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      ) : null}
    </div>
  );
}