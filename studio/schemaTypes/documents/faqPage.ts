import { defineField, defineType } from "sanity";
import { marketingPageFields } from "../fields/marketingPageFields";

/** Singleton — accordion FAQ content (neutral owner-editable copy). */
export const faqPage = defineType({
  name: "faqPage",
  title: "FAQ page",
  type: "document",
  fields: [
    ...marketingPageFields,
    defineField({
      name: "items",
      title: "Questions",
      type: "array",
      of: [{ type: "faqItem" }],
    }),
  ],
  preview: {
    prepare() {
      return { title: "FAQ page" };
    },
  },
});