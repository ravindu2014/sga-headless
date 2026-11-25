"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { NavIcon } from "./NavIcon";
import { isNavActive, NAV_ITEMS } from "./nav-items";

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
          className="absolute left-0 right-0 top-16 z-40 border-b border-primary bg-surface px-page-gutter-mobile py-3"
          aria-label={t("primary")}
        >
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const active = isNavActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={
                      active
                        ? "flex min-h-tap items-center gap-3 border-l-4 border-primary bg-primary/5 px-3 text-body font-semibold text-primary"
                        : "flex min-h-tap items-center gap-3 border-l-4 border-transparent px-3 text-body font-medium text-on-surface"
                    }
                    onClick={() => setOpen(false)}
                  >
                    <NavIcon name={item.key} />
                    <span>{t(item.key)}</span>
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
