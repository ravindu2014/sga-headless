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
    <section className="mx-auto grid max-w-content gap-4 px-page-gutter-mobile py-4 md:grid-cols-[1.1fr_0.9fr] md:items-center md:px-page-gutter-desktop min-[1264px]:px-page-gutter-wide">
      <div>
        <h1 className="text-headline text-primary">
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
            className="mt-2 max-w-prose text-body text-on-surface-muted"
          />
        ) : null}
        {primaryCta || secondaryCta ? (
          <div className="mt-4 flex flex-wrap gap-3">
            {primaryCta ? (
              <Link
                href={primaryCta.href}
                className="inline-flex min-h-tap items-center justify-center rounded-md bg-accent px-3 font-semibold text-body-sm text-on-accent hover:bg-accent-hover"
              >
                {primaryCta.label}
              </Link>
            ) : null}
            {secondaryCta ? (
              <Link
                href={secondaryCta.href}
                className="inline-flex min-h-tap items-center justify-center rounded-md border border-border-strong bg-surface px-3 font-semibold text-body-sm text-primary"
              >
                {secondaryCta.label}
              </Link>
            ) : null}
          </div>
        ) : null}
      </div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-container border border-border bg-surface">
        {page.heroImage?.url ? (
          <Image
            src={page.heroImage.url}
            alt={page.heroImage.alt ?? page.heroHeadline.value}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-body-sm text-on-surface-muted">
            Hero image
          </div>
        )}
      </div>
    </section>
  );
}