import { defineField, defineType } from "sanity";

export const serviceItem = defineType({
  name: "serviceItem",
  title: "Service",
  type: "object",
  fields: [
    defineField({
      name: "key",
      title: "Service key",
      type: "string",
      description: "Stable id for ordering (matches D-1).",
      options: {
        list: [
          { title: "1 — Auction bidding", value: "auction-bidding" },
          { title: "2 — Export handling", value: "export-handling" },
          { title: "3 — Import to Sri Lanka", value: "import-sri-lanka" },
          { title: "4 — Customs clearance", value: "customs-clearance" },
          { title: "5 — Delivery", value: "delivery" },
        ],
        layout: "dropdown",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "localeString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "localeText",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "title.en", key: "key" },
    prepare({ title, key }) {
      return { title: title || key || "Service" };
    },
  },
});