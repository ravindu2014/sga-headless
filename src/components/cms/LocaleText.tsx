import type { LocalizedValue } from "@/content";
import { FallbackChip } from "./FallbackChip";

type Props = {
  value: LocalizedValue<string>;
  as?: "p" | "span" | "div";
  className?: string;
};

export function LocaleText({ value, as: Tag = "p", className }: Props) {
  return (
    <Tag className={className}>
      {value.value}
      <FallbackChip show={value.usedFallback} />
    </Tag>
  );
}