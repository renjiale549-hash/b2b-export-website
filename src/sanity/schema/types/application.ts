import { defineArrayMember, defineField, defineType } from "sanity";

export const application = defineType({
  name: "application",
  title: "Application",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "industries",
      title: "Industries",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "sortOrder",
      title: "Sort Order",
      type: "number",
      initialValue: 100,
    }),
  ],
});
