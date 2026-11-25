import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { getSiteSettings } from "@/content";
import { NotFoundContent } from "@/components/layout/NotFoundContent";
import { SiteShell } from "@/components/layout/SiteShell";
import { routing } from "@/i18n/routing";
import { fontVariables } from "./fonts";

export default async function NotFound() {
  setRequestLocale(routing.defaultLocale);
  const [messages, settings] = await Promise.all([
    getMessages(),
    getSiteSettings(routing.defaultLocale),
  ]);

  return (
    <html lang={routing.defaultLocale}>
      <body className={`${fontVariables} min-h-screen`}>
        <NextIntlClientProvider messages={messages}>
          <SiteShell settings={settings}>
            <NotFoundContent />
          </SiteShell>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
