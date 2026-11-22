import type { ReactNode } from "react";
import type { SiteSettingsDto } from "@/content";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { SkipLink } from "./SkipLink";

type Props = {
  children: ReactNode;
  settings: SiteSettingsDto | null;
};

export async function SiteShell({ children, settings }: Props) {
  return (
    <div className="flex min-h-screen flex-col">
      <SkipLink />
      <SiteHeader />
      <div id="main-content" className="flex-1">
        {children}
      </div>
      <SiteFooter settings={settings} />
    </div>
  );
}