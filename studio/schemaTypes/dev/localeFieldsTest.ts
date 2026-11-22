import { defineField, defineType } from "sanity";

/**
 * Temporary document for story 2.2 — remove or hide from desk after real page types ship.
 */
export const localeFieldsTest = defineType({
  name: "localeFieldsTest",
  title: "Locale fields (dev test)",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sampleString",
      title: "Sample string",
      type: "localeString",
    }),
    defineField({
      name: "sampleText",
      title: "Sample text",
      type: "localeText",
    }),
    defineField({
      name: "sampleBlock",
      title: "Sample rich text",
      type: "localeBlock",
    }),
  ],
});