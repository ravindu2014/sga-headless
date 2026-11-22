import { defineType } from "sanity";
import { marketingPageFields } from "../fields/marketingPageFields";

/** Singleton — about / company story. */
export const aboutPage = defineType({
  name: "aboutPage",
  title: "About page",
  type: "document",
  fields: marketingPageFields,
  preview: {
    prepare() {
      return { title: "About page" };
    },
  },
});