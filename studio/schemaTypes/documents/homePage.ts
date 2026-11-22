import { defineField, defineType } from "sanity";
import { marketingPageFields } from "../fields/marketingPageFields";

/** Singleton — one published home document. */
export const homePage = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  fields: [
    ...marketingPageFields,
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "image",
      options: { hotspot: true },
      description: "Optional hero or featured vehicle visual (right column on desktop).",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Home page" };
    },
  },
});