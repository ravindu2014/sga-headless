import { defineField } from "sanity";

/** Shared CMS spine for marketing singletons — EN required on hero headline via localeString. */
export const marketingPageFields = [
  defineField({
    name: "heroHeadline",
    title: "Hero headline",
    type: "localeString",
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: "heroSubheadline",
    title: "Hero subheadline",
    type: "localeText",
  }),
  defineField({
    name: "body",
    title: "Body",
    type: "localeBlock",
    description: "Main page content below the hero.",
  }),
];