import { defineArrayMember, defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "产品",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "产品名称",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "网址标识",
      type: "slug",
      description: "用于生成产品详情页网址，建议使用英文小写和连字符。",
      options: { source: "name" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "产品分类",
      type: "reference",
      to: [{ type: "category" }],
    }),
    defineField({
      name: "categoryName",
      title: "备用分类名称",
      type: "string",
      description: "如果没有选择产品分类，则使用这里填写的分类名称。",
    }),
    defineField({
      name: "summary",
      title: "产品摘要",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "产品详情描述",
      type: "text",
      rows: 5,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "产品图片",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "imageUrl",
      title: "备用外部图片链接",
      type: "url",
      description: "如果没有上传 Sanity 图片，则使用这里的外部图片链接。",
    }),
    defineField({
      name: "specs",
      title: "产品规格参数",
      type: "array",
      of: [
        defineArrayMember({
          name: "spec",
          title: "规格项",
          type: "object",
          fields: [
            defineField({ name: "label", title: "参数名称", type: "string" }),
            defineField({ name: "value", title: "参数值", type: "string" }),
          ],
        }),
      ],
    }),
    defineField({
      name: "features",
      title: "产品特点",
      type: "array",
      of: [defineArrayMember({ title: "特点", type: "string" })],
    }),
    defineField({
      name: "applications",
      title: "适用场景",
      type: "array",
      of: [defineArrayMember({ title: "场景", type: "string" })],
    }),
    defineField({
      name: "sortOrder",
      title: "排序",
      type: "number",
      description: "数字越小越靠前。",
      initialValue: 100,
    }),
    defineField({
      name: "seoTitle",
      title: "SEO 标题",
      type: "string",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO 描述",
      type: "text",
      rows: 3,
    }),
  ],
});
