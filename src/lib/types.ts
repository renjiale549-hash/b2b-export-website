export type Product = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  description: string;
  image: string;
  specs: {
    label: string;
    value: string;
  }[];
  features: string[];
  applications: string[];
  seoTitle?: string;
  seoDescription?: string;
};

export type Category = {
  name: string;
  slug: string;
  description: string;
};

export type Application = {
  title: string;
  description: string;
  industries: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  readTime: string;
  seoTitle?: string;
  seoDescription?: string;
};

export type Faq = {
  question: string;
  answer: string;
};

export type SiteConfig = {
  name: string;
  url: string;
  email: string;
  phone: string;
  address: string;
  tagline: string;
  heroEyebrow?: string;
  heroTitle?: string;
  heroDescription?: string;
  heroImage?: string;
  categorySectionTitle?: string;
  categorySectionDescription?: string;
  featuredProductsTitle?: string;
  featuredProductsDescription?: string;
  companySectionTitle?: string;
  companySectionDescription?: string;
  ctaEyebrow?: string;
  ctaTitle?: string;
  ctaDescription?: string;
  seoTitle?: string;
  seoDescription?: string;
};
