import { defineField, defineType } from "sanity";

export const advantage = defineType({
  name: "advantage",
  title: "核心优势",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "优势文案",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sortOrder",
      title: "排序",
      type: "number",
      description: "数字越小越靠前。",
      initialValue: 100,
    }),
  ],
});
