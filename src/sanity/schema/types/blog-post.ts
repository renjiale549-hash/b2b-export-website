import { defineArrayMember, defineField, defineType } from "sanity";

export const blogPost = defineType({
  name: "blogPost",
  title: "博客文章",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "文章标题",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "网址标识",
      type: "slug",
      description: "用于生成文章网址，建议使用英文小写和连字符。",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "date",
      title: "发布日期",
      type: "date",
    }),
    defineField({
      name: "excerpt",
      title: "文章摘要",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "readTime",
      title: "阅读时长",
      type: "string",
      initialValue: "3 min read",
    }),
    defineField({
      name: "body",
      title: "文章正文",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
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
