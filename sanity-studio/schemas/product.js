import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (Rule) => Rule.required() }),
    defineField({ name: "category", title: "Category", type: "reference", to: [{ type: "category" }], validation: (Rule) => Rule.required() }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "sourceUrl", title: "Original source URL", type: "url" }),
    defineField({ name: "mainImage", title: "Main image", type: "image", options: { hotspot: true }, validation: (Rule) => Rule.required() }),
    defineField({ name: "galleryImages", title: "Gallery images", type: "array", of: [{ type: "image", options: { hotspot: true }, fields: [{ name: "alt", type: "string", title: "Alt text" }] }] }),
    defineField({ name: "order", title: "Catalogue order", type: "number" }),
  ],
  preview: { select: { title: "title", media: "mainImage", subtitle: "category.title" } },
});
