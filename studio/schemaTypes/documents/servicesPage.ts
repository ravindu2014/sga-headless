import { defineField, defineType } from "sanity";
import { marketingPageFields } from "../fields/marketingPageFields";

const defaultServices = [
  {
    _key: "auction-bidding",
    key: "auction-bidding",
    title: { en: "Vehicle bidding on auction" },
    body: { en: "Support through overseas auction selection and bidding." },
  },
  {
    _key: "export-handling",
    key: "export-handling",
    title: { en: "Export process handling" },
    body: { en: "Coordination of export logistics from source country." },
  },
  {
    _key: "import-sri-lanka",
    key: "import-sri-lanka",
    title: { en: "Import to Sri Lanka" },
    body: { en: "End-to-end import arrangements to Sri Lanka." },
  },
  {
    _key: "customs-clearance",
    key: "customs-clearance",
    title: { en: "Customs clearance" },
    body: { en: "Customs clearance support for your vehicle import." },
  },
  {
    _key: "delivery",
    key: "delivery",
    title: { en: "Delivery" },
    body: { en: "Delivery to you after clearance." },
  },
];

/** Singleton — exactly five services in display order (D-1). */
export const servicesPage = defineType({
  name: "servicesPage",
  title: "Services page",
  type: "document",
  fields: [
    ...marketingPageFields,
    defineField({
      name: "services",
      title: "Services (5 required)",
      type: "array",
      of: [{ type: "serviceItem" }],
      validation: (rule) =>
        rule
          .required()
          .min(5)
          .max(5)
          .error("Services page must have exactly five items (D-1)."),
      description:
        "Drag to reorder. Keys should match D-1: auction → export → import → customs → delivery.",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Services page" };
    },
  },
  initialValue: {
    services: defaultServices,
  },
});