import { defineField, defineType } from "sanity";

/** AD-4 — English required; Sinhala optional (site falls back to `en`). */
export const localeString = defineType({
  name: "localeString",
  title: "Localized string",
  type: "object",
  fields: [
    defineField({
      name: "en",
      title: "English",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "si",
      title: "Sinhala",
      type: "string",
      description: "Optional. Empty Sinhala uses English on the public site.",
    }),
  ],
});