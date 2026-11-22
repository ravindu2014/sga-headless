import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { LocalizedValue, PortableTextValue } from "@/content";
import { FallbackChip } from "./FallbackChip";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-4 text-body last:mb-0">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mb-3 text-headline text-primary">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-2 text-title text-primary">{children}</h3>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-4 list-disc space-y-1 pl-5 text-body">{children}</ul>
    ),
  },
};

type Props = {
  value: LocalizedValue<PortableTextValue>;
  className?: string;
};

export function PortableTextBody({ value, className }: Props) {
  return (
    <div className={className}>
      <PortableText value={value.value} components={components} />
      {value.usedFallback ? (
        <p className="mt-2">
          <FallbackChip show />
        </p>
      ) : null}
    </div>
  );
}