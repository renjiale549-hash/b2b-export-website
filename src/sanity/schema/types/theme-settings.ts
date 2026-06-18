import { defineArrayMember, defineField, defineType } from "sanity";

const sectionTypes = [
  { title: "Hero 首屏", value: "hero" },
  { title: "产品分类", value: "categories" },
  { title: "热门产品", value: "featuredProducts" },
  { title: "核心优势", value: "advantages" },
  { title: "应用场景", value: "applications" },
  { title: "公司介绍", value: "company" },
  { title: "常见问题", value: "faq" },
  { title: "询盘 CTA", value: "cta" },
];

export const themeSettings = defineType({
  name: "themeSettings",
  title: "店铺设计",
  type: "document",
  fields: [
    defineField({ name: "primaryColor", title: "主色", type: "string", initialValue: "#ff7fb2" }),
    defineField({ name: "accentColor", title: "强调色", type: "string", initialValue: "#ffe66d" }),
    defineField({
      name: "sections",
      title: "首页区块",
      type: "array",
      of: [
        defineArrayMember({
          name: "section",
          title: "首页区块",
          type: "object",
          fields: [
            defineField({ name: "id", title: "区块 ID", type: "string" }),
            defineField({
              name: "type",
              title: "区块类型",
              type: "string",
              options: { list: sectionTypes },
              validation: (rule) => rule.required(),
            }),
            defineField({ name: "enabled", title: "是否显示", type: "boolean", initialValue: true }),
            defineField({ name: "sortOrder", title: "排序", type: "number", initialValue: 100 }),
            defineField({ name: "eyebrow", title: "小标题", type: "string" }),
            defineField({ name: "title", title: "主标题", type: "string" }),
            defineField({ name: "description", title: "描述", type: "text", rows: 3 }),
            defineField({ name: "image", title: "区块图片", type: "image", options: { hotspot: true } }),
            defineField({ name: "buttonLabel", title: "按钮文字", type: "string" }),
            defineField({ name: "buttonHref", title: "按钮链接", type: "string" }),
            defineField({ name: "productLimit", title: "产品展示数量", type: "number" }),
            defineField({
              name: "variant",
              title: "视觉风格",
              type: "string",
              options: {
                list: [
                  { title: "深色", value: "dark" },
                  { title: "浅色", value: "light" },
                ],
              },
            }),
          ],
          preview: {
            select: { title: "title", type: "type", enabled: "enabled" },
            prepare(selection) {
              return {
                title: selection.title || sectionTypes.find((item) => item.value === selection.type)?.title || "首页区块",
                subtitle: selection.enabled === false ? "已隐藏" : "已显示",
              };
            },
          },
        }),
      ],
    }),
  ],
});
