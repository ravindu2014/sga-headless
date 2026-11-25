import type { ReactNode } from "react";
import type { SiteSettingsDto } from "@/content";
import type { Locale } from "@/i18n/routing";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { SkipLink } from "./SkipLink";

type Props = {
  children: ReactNode;
  locale: Locale;
  settings: SiteSettingsDto | null;
};

export async function SiteShell({ children, locale, settings }: Props) {
  return (
    <div className="flex min-h-screen flex-col">
      <SkipLink locale={locale} />
      <SiteHeader />
      <div id="main-content" className="flex-1">
        {children}
      </div>
      <SiteFooter locale={locale} settings={settings} />
    </div>
  );
}