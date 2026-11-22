import { defineField, defineType } from "sanity";
import { marketingPageFields } from "../fields/marketingPageFields";

/** Singleton — contact intro (phone/email/WhatsApp come from site settings). */
export const contactPage = defineType({
  name: "contactPage",
  title: "Contact page",
  type: "document",
  fields: [
    ...marketingPageFields,
    defineField({
      name: "enquiryIntro",
      title: "Enquiry intro",
      type: "localeText",
      description: "Short text above enquiry actions (e.g. WhatsApp handoff).",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Contact page" };
    },
  },
});