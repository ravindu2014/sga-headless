import type { ContentLocale, LocalizedField, LocalizedValue } from "./types";

/** Resolve CMS `{ en, si? }` with English fallback (AD-4). */
export function resolveLocalizedField<T>(
  field: LocalizedField<T> | null | undefined,
  locale: ContentLocale,
): LocalizedValue<T> | null {
  if (field?.en === undefined || field.en === null) {
    return null;
  }

  if (locale === "si" && field.si !== undefined && field.si !== null) {
    return { value: field.si, usedFallback: false };
  }

  if (locale === "si") {
    return { value: field.en, usedFallback: true };
  }

  return { value: field.en, usedFallback: false };
}