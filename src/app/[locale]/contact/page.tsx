import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getContactPage, getSiteSettings } from "@/content";
import { MarketingHero } from "@/components/cms/MarketingHero";
import { LocaleText } from "@/components/cms/LocaleText";
import { PortableTextBody } from "@/components/cms/PortableTextBody";
import { whatsAppHref } from "@/lib/format";
import { routing, localeStaticParams, type Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return localeStaticParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const [tContact, tMeta] = await Promise.all([
    getTranslations({ locale, namespace: "contact" }),
    getTranslations({ locale, namespace: "metadata" }),
  ]);
  return buildPageMetadata(locale as Locale, {
    path: "contact",
    title: tContact("title"),
    description: tMeta("contactDescription"),
  });
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const contentLocale = locale as Locale;
  const [page, settings] = await Promise.all([
    getContactPage(contentLocale),
    getSiteSettings(contentLocale),
  ]);
  const t = await getTranslations("contact");

  return (
    <main>
      {page ? (
        <MarketingHero page={page} />
      ) : (
        <div className="mx-auto max-w-content px-page-gutter-mobile py-section-y md:px-page-gutter-desktop">
          <h1 className="text-headline text-primary">{t("title")}</h1>
        </div>
      )}
      {page?.body ? (
        <section className="mx-auto max-w-prose px-page-gutter-mobile pb-8 md:px-page-gutter-desktop">
          <PortableTextBody value={page.body} />
        </section>
      ) : null}
      <section className="mx-auto max-w-content px-page-gutter-mobile pb-section-y md:px-page-gutter-desktop">
        {page?.enquiryIntro ? (
          <LocaleText
            value={page.enquiryIntro}
            className="mb-3 max-w-prose text-body text-on-surface-muted"
          />
        ) : null}
        {settings ? (
          <ul className="grid gap-catalogue-gap sm:grid-cols-3">
            <li className="rounded-container border border-border p-card-padding">
              <p className="text-label text-primary">{t("whatsapp")}</p>
              <a
                href={whatsAppHref(settings.whatsapp)}
                className="mt-1 inline-flex min-h-tap items-center text-body font-medium text-on-surface hover:text-primary"
                rel="noopener noreferrer"
                target="_blank"
              >
                {settings.whatsapp}
              </a>
              <p className="mt-1 text-body-sm text-on-surface-muted">
                {t("whatsappHint")}
              </p>
            </li>
            <li className="rounded-container border border-border p-card-padding">
              <p className="text-label text-primary">{t("phone")}</p>
              <a
                href={`tel:${settings.phone.replace(/\s/g, "")}`}
                className="mt-1 inline-flex min-h-tap items-center text-body font-medium text-on-surface hover:text-primary"
              >
                {settings.phone}
              </a>
            </li>
            <li className="rounded-container border border-border p-card-padding">
              <p className="text-label text-primary">{t("email")}</p>
              <a
                href={`mailto:${settings.email}`}
                className="mt-1 inline-flex min-h-tap items-center text-body font-medium text-on-surface hover:text-primary"
              >
                {settings.email}
              </a>
            </li>
          </ul>
        ) : (
          <p className="text-body text-on-surface-muted">Contact details soon.</p>
        )}
      </section>
    </main>
  );
}