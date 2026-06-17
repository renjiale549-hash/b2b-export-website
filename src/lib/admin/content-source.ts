import { advantages, applications, blogPosts, categories, faqs } from "@/lib/data";
import { getSanityClient } from "@/sanity/client";

export type AdminContentType = "category" | "application" | "faq" | "advantage" | "blogPost";

export type AdminContentItem = Record<string, string | number | string[] | undefined> & {
  id?: string;
};

const queries = {
  category: `*[_type == "category"] | order(sortOrder asc, name asc) {
    "id": _id, name, "slug": slug.current, description, sortOrder
  }`,
  application: `*[_type == "application"] | order(sortOrder asc, title asc) {
    "id": _id, title, description, industries, sortOrder
  }`,
  faq: `*[_type == "faq"] | order(sortOrder asc, question asc) {
    "id": _id, question, answer, sortOrder
  }`,
  advantage: `*[_type == "advantage"] | order(sortOrder asc, title asc) {
    "id": _id, title, sortOrder
  }`,
  blogPost: `*[_type == "blogPost"] | order(date desc, title asc) {
    "id": _id, title, "slug": slug.current, date, excerpt, readTime, seoTitle, seoDescription
  }`,
};

const fallback = {
  category: categories,
  application: applications,
  faq: faqs,
  advantage: advantages.map((title) => ({ title })),
  blogPost: blogPosts,
};

export async function getAdminContentItems(type: AdminContentType): Promise<AdminContentItem[]> {
  const client = getSanityClient();

  if (!client) {
    return fallback[type];
  }

  try {
    const items = await client.fetch<AdminContentItem[]>(queries[type]);
    return items?.length ? items : fallback[type];
  } catch {
    return fallback[type];
  }
}

export async function getAllAdminContent() {
  const [category, application, faq, advantage, blogPost] = await Promise.all([
    getAdminContentItems("category"),
    getAdminContentItems("application"),
    getAdminContentItems("faq"),
    getAdminContentItems("advantage"),
    getAdminContentItems("blogPost"),
  ]);

  return { category, application, faq, advantage, blogPost };
}
