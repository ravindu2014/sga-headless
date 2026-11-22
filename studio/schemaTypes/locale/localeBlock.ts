import { defineArrayMember, defineField, defineType } from "sanity";

/** AD-4 — Portable Text per locale. */
export const localeBlock = defineType({
  name: "localeBlock",
  title: "Localized rich text",
  type: "object",
  fields: [
    defineField({
      name: "en",
      title: "English",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "si",
      title: "Sinhala",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
      description: "Optional. Empty Sinhala uses English on the public site.",
    }),
  ],
});