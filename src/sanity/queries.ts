export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  name,
  url,
  email,
  phone,
  address,
  tagline,
  heroEyebrow,
  heroTitle,
  heroDescription,
  "heroImage": heroImage.asset->url,
  categorySectionTitle,
  categorySectionDescription,
  featuredProductsTitle,
  featuredProductsDescription,
  companySectionTitle,
  companySectionDescription,
  ctaEyebrow,
  ctaTitle,
  ctaDescription,
  seoTitle,
  seoDescription
}`;

export const categoriesQuery = `*[_type == "category"] | order(sortOrder asc, name asc) {
  name,
  "slug": slug.current,
  description
}`;

export const productsQuery = `*[_type == "product"] | order(sortOrder asc, name asc) {
  name,
  "slug": slug.current,
  "category": coalesce(category->name, categoryName),
  summary,
  description,
  "image": coalesce(image.asset->url, imageUrl),
  specs[]{label, value},
  features,
  applications,
  seoTitle,
  seoDescription
}`;

export const productBySlugQuery = `*[_type == "product" && slug.current == $slug][0] {
  name,
  "slug": slug.current,
  "category": coalesce(category->name, categoryName),
  summary,
  description,
  "image": coalesce(image.asset->url, imageUrl),
  specs[]{label, value},
  features,
  applications,
  seoTitle,
  seoDescription
}`;

export const applicationsQuery = `*[_type == "application"] | order(sortOrder asc, title asc) {
  title,
  description,
  industries
}`;

export const advantagesQuery = `*[_type == "advantage"] | order(sortOrder asc, title asc) {
  title
}`;

export const faqsQuery = `*[_type == "faq"] | order(sortOrder asc, question asc) {
  question,
  answer
}`;

export const blogPostsQuery = `*[_type == "blogPost"] | order(date desc, title asc) {
  title,
  "slug": slug.current,
  date,
  excerpt,
  readTime,
  seoTitle,
  seoDescription
}`;
