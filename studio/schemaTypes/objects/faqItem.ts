import { defineField, defineType } from "sanity";

export const faqItem = defineType({
  name: "faqItem",
  title: "FAQ item",
  type: "object",
  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "localeString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "localeText",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "question.en" },
    prepare({ title }) {
      return { title: title || "FAQ item" };
    },
  },
});