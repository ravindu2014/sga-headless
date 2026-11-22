import { defineField, defineType } from "sanity";

const availabilityOptions = [
  { title: "Available", value: "available" },
  { title: "Sold", value: "sold" },
  { title: "Unavailable", value: "unavailable" },
];

export const vehicle = defineType({
  name: "vehicle",
  title: "Vehicle",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "localeString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title.en", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "make",
      title: "Make",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "model",
      title: "Model",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
      validation: (rule) => rule.required().min(1900).max(2100).integer(),
    }),
    defineField({
      name: "mileage",
      title: "Mileage (km)",
      type: "number",
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: "transmission",
      title: "Transmission",
      type: "string",
    }),
    defineField({
      name: "fuelType",
      title: "Fuel type",
      type: "string",
    }),
    defineField({
      name: "exteriorColour",
      title: "Exterior colour",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "localeText",
    }),
    defineField({
      name: "features",
      title: "Features / specifications",
      type: "localeText",
    }),
    defineField({
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "availability",
      title: "Availability",
      type: "string",
      options: { list: availabilityOptions, layout: "radio" },
      initialValue: "available",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured on home",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "priceLkr",
      title: "Price (LKR)",
      type: "number",
      description: "Leave empty for Price on request.",
      validation: (rule) => rule.min(0),
    }),
  ],
  preview: {
    select: {
      title: "title.en",
      media: "mainImage",
      year: "year",
      make: "make",
      availability: "availability",
    },
    prepare({ title, media, year, make, availability }) {
      const subtitle = [year, make, availability].filter(Boolean).join(" · ");
      return {
        title: title || "Vehicle",
        subtitle,
        media,
      };
    },
  },
  orderings: [
    {
      title: "Updated (newest)",
      name: "updatedDesc",
      by: [{ field: "_updatedAt", direction: "desc" }],
    },
  ],
});