import { defineField, defineType } from "sanity";

export const category = defineType({
  name: "category",
  title: "产品分类",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "分类名称",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "网址标识",
      type: "slug",
      description: "用于生成分类标识，建议使用英文小写和连字符。",
      options: { source: "name" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "分类描述",
      type: "text",
      rows: 3,
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
