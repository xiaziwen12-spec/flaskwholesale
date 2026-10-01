import { defineField, defineType } from "sanity";

export const sitePage = defineType({
  name: "sitePage",
  title: "Site Page / Article",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (Rule) => Rule.required() }),
    defineField({ name: "path", title: "Website path", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "contentType", title: "Content type", type: "string", options: { list: ["page", "post", "case"] } }),
    defineField({ name: "summary", title: "Summary", type: "text" }),
    defineField({ name: "bodyHtml", title: "Page content", type: "text", rows: 24 }),
    defineField({ name: "publishedAt", title: "Published at", type: "datetime" }),
    defineField({ name: "sourceUrl", title: "Original source URL", type: "url" }),
    defineField({ name: "sourceImageUrls", title: "Migration image sources", type: "array", hidden: true, of: [{ type: "url" }] }),
  ],
  preview: { select: { title: "title", subtitle: "path" } },
});
