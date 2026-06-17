import { defineArrayMember, defineField, defineType } from "sanity";

export const application = defineType({
  name: "application",
  title: "应用场景",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "场景标题",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "场景描述",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "industries",
      title: "相关行业",
      type: "array",
      of: [defineArrayMember({ title: "行业", type: "string" })],
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
