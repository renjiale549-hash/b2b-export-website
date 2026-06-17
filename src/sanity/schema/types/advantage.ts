import { defineField, defineType } from "sanity";

export const advantage = defineType({
  name: "advantage",
  title: "Core Advantage",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sortOrder",
      title: "Sort Order",
      type: "number",
      initialValue: 100,
    }),
  ],
});
