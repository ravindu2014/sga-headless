import { defineField, defineType } from "sanity";

/** AD-4 — multiline localized copy. */
export const localeText = defineType({
  name: "localeText",
  title: "Localized text",
  type: "object",
  fields: [
    defineField({
      name: "en",
      title: "English",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "si",
      title: "Sinhala",
      type: "text",
      rows: 4,
      description: "Optional. Empty Sinhala uses English on the public site.",
    }),
  ],
});