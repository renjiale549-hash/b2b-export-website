import { defineField, defineType } from "sanity";

export const faq = defineType({
  name: "faq",
  title: "常见问题",
  type: "document",
  fields: [
    defineField({
      name: "question",
      title: "问题",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "answer",
      title: "回答",
      type: "text",
      rows: 4,
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
