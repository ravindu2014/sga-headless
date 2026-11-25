import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { getSiteSettings } from "@/content";
import { NotFoundContent } from "@/components/layout/NotFoundContent";
import { SiteShell } from "@/components/layout/SiteShell";
import { routing } from "@/i18n/routing";
import { fontVariables } from "./fonts";

export default async function NotFound() {
  const locale = routing.defaultLocale;
  setRequestLocale(locale);
  const [messages, settings] = await Promise.all([
    getMessages({ locale }),
    getSiteSettings(locale),
  ]);

  return (
    <html lang={locale}>
      <body className={`${fontVariables} min-h-screen`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SiteShell locale={locale} settings={settings}>
            <NotFoundContent />
          </SiteShell>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
