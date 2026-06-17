import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "网站设置",
  type: "document",
  fields: [
    defineField({ name: "name", title: "公司名称", type: "string" }),
    defineField({ name: "url", title: "网站地址", type: "url" }),
    defineField({ name: "email", title: "联系邮箱", type: "string" }),
    defineField({ name: "phone", title: "联系电话", type: "string" }),
    defineField({ name: "address", title: "公司地址", type: "string" }),
    defineField({ name: "tagline", title: "品牌标语", type: "text", rows: 2 }),
    defineField({ name: "heroEyebrow", title: "首页 Hero 小标题", type: "string" }),
    defineField({ name: "heroTitle", title: "首页 Hero 主标题", type: "string" }),
    defineField({ name: "heroDescription", title: "首页 Hero 描述", type: "text", rows: 3 }),
    defineField({ name: "heroImage", title: "首页 Hero 图片", type: "image", options: { hotspot: true } }),
    defineField({ name: "categorySectionTitle", title: "产品分类区标题", type: "string" }),
    defineField({ name: "categorySectionDescription", title: "产品分类区描述", type: "text", rows: 3 }),
    defineField({ name: "featuredProductsTitle", title: "热门产品区标题", type: "string" }),
    defineField({ name: "featuredProductsDescription", title: "热门产品区描述", type: "text", rows: 3 }),
    defineField({ name: "companySectionTitle", title: "公司介绍区标题", type: "string" }),
    defineField({ name: "companySectionDescription", title: "公司介绍区描述", type: "text", rows: 3 }),
    defineField({ name: "ctaEyebrow", title: "询盘 CTA 小标题", type: "string" }),
    defineField({ name: "ctaTitle", title: "询盘 CTA 主标题", type: "string" }),
    defineField({ name: "ctaDescription", title: "询盘 CTA 描述", type: "text", rows: 3 }),
    defineField({ name: "primaryColor", title: "主品牌色", type: "string" }),
    defineField({ name: "accentColor", title: "辅助强调色", type: "string" }),
    defineField({
      name: "navItems",
      title: "导航菜单",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "菜单名称", type: "string" }),
            defineField({ name: "href", title: "链接", type: "string" }),
          ],
        },
      ],
    }),
    defineField({ name: "seoTitle", title: "网站 SEO 标题", type: "string" }),
    defineField({ name: "seoDescription", title: "网站 SEO 描述", type: "text", rows: 3 }),
  ],
});
