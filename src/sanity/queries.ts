export const siteSettingsQuery = `*[_type == "siteSettings"] | order(_updatedAt desc)[0]{
  _id,
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
  primaryColor,
  accentColor,
  navItems[]{label, href},
  seoTitle,
  seoDescription
}`;

export const themeSettingsQuery = `*[_type == "themeSettings"] | order(_updatedAt desc)[0]{
  _id,
  primaryColor,
  accentColor,
  sections[]{
    _key,
    id,
    type,
    title,
    eyebrow,
    description,
    enabled,
    sortOrder,
    productLimit,
    "image": image.asset->url,
    "imageAssetId": image.asset->_id,
    buttonLabel,
    buttonHref,
    variant
  }
}`;

export const categoriesQuery = `*[_type == "category"] | order(sortOrder asc, name asc) {
  "id": _id,
  name,
  "slug": slug.current,
  description
}`;

export const productsQuery = `*[_type == "product"] | order(sortOrder asc, name asc) {
  "id": _id,
  name,
  "slug": slug.current,
  "categoryId": category->_id,
  "category": coalesce(category->name, categoryName),
  summary,
  description,
  "image": coalesce(image.asset->url, imageUrl),
  "imageAssetId": image.asset->_id,
  gallery[]{
    "url": asset->url,
    "assetId": asset->_id,
    alt
  },
  specs[]{label, value},
  features,
  applications,
  seoTitle,
  seoDescription
}`;

export const productBySlugQuery = `*[_type == "product" && slug.current == $slug][0] {
  "id": _id,
  name,
  "slug": slug.current,
  "categoryId": category->_id,
  "category": coalesce(category->name, categoryName),
  summary,
  description,
  "image": coalesce(image.asset->url, imageUrl),
  "imageAssetId": image.asset->_id,
  gallery[]{
    "url": asset->url,
    "assetId": asset->_id,
    alt
  },
  specs[]{label, value},
  features,
  applications,
  seoTitle,
  seoDescription
}`;

export const applicationsQuery = `*[_type == "application"] | order(sortOrder asc, title asc) {
  "id": _id,
  title,
  description,
  industries
}`;

export const advantagesQuery = `*[_type == "advantage"] | order(sortOrder asc, title asc) {
  "id": _id,
  title
}`;

export const faqsQuery = `*[_type == "faq"] | order(sortOrder asc, question asc) {
  "id": _id,
  question,
  answer
}`;

export const blogPostsQuery = `*[_type == "blogPost"] | order(date desc, title asc) {
  "id": _id,
  title,
  "slug": slug.current,
  date,
  excerpt,
  readTime,
  seoTitle,
  seoDescription
}`;
