import { defineField, defineType } from "sanity";

/** Singleton — one published doc for global contact + default SEO (no street address). */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
      description: "Shown on Contact and used for tel: links.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "whatsapp",
      title: "WhatsApp",
      type: "string",
      description: "E.164 or international format for wa.me links (e.g. +94719186125).",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "canonicalBaseUrl",
      title: "Canonical site URL",
      type: "url",
      description: "Base URL for sitemap, Open Graph, and canonical tags.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "defaultSeoTitle",
      title: "Default SEO title",
      type: "localeString",
      description: "Fallback when a page has no specific title.",
    }),
    defineField({
      name: "defaultSeoDescription",
      title: "Default SEO description",
      type: "localeText",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site settings" };
    },
  },
  initialValue: {
    phone: "+94719186125",
    whatsapp: "+94719186125",
    email: "serendibglobalauto@gmail.com",
    canonicalBaseUrl: "https://serendibglobalauto.lk",
  },
});