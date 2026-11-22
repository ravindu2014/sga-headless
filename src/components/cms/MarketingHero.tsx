import Image from "next/image";
import type { MarketingPageDto } from "@/content";
import { LocaleText } from "./LocaleText";
import { Link } from "@/i18n/navigation";

type Props = {
  page: MarketingPageDto;
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
};

export function MarketingHero({ page, primaryCta, secondaryCta }: Props) {
  return (
    <section className="mx-auto grid max-w-content gap-8 px-page-gutter-mobile py-section-y md:grid-cols-[1.1fr_0.9fr] md:items-center md:px-page-gutter-desktop">
      <div>
        <h1 className="text-display-mobile text-primary md:text-display">
          {page.heroHeadline.value}
          {page.heroHeadline.usedFallback ? (
            <span className="ml-2 text-label text-on-surface-muted">
              (English)
            </span>
          ) : null}
        </h1>
        {page.heroSubheadline ? (
          <LocaleText
            value={page.heroSubheadline}
            className="mt-3 max-w-prose text-body text-on-surface-muted"
          />
        ) : null}
        {primaryCta || secondaryCta ? (
          <div className="mt-6 flex flex-wrap gap-3">
            {primaryCta ? (
              <Link
                href={primaryCta.href}
                className="inline-flex min-h-tap items-center justify-center rounded-md bg-accent px-6 font-semibold text-body text-on-accent hover:bg-accent-hover"
              >
                {primaryCta.label}
              </Link>
            ) : null}
            {secondaryCta ? (
              <Link
                href={secondaryCta.href}
                className="inline-flex min-h-tap items-center justify-center rounded-md border border-border-strong bg-surface px-6 font-semibold text-body text-primary"
              >
                {secondaryCta.label}
              </Link>
            ) : null}
          </div>
        ) : null}
      </div>
      <div className="overflow-hidden rounded-container border border-border bg-surface">
        {page.heroImage?.url ? (
          <Image
            src={page.heroImage.url}
            alt={page.heroImage.alt ?? page.heroHeadline.value}
            width={1200}
            height={900}
            className="aspect-[4/3] h-auto w-full object-cover"
          />
        ) : (
          <div className="flex aspect-[4/3] items-center justify-center text-body-sm text-on-surface-muted">
            Hero image
          </div>
        )}
      </div>
    </section>
  );
}