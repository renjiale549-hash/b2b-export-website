export type Product = {
  id?: string;
  slug: string;
  name: string;
  category: string;
  categoryId?: string;
  summary: string;
  description: string;
  image: string;
  imageAssetId?: string;
  gallery?: {
    url: string;
    assetId?: string;
    alt?: string;
  }[];
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
  id?: string;
  name: string;
  slug: string;
  description: string;
};

export type Application = {
  id?: string;
  title: string;
  description: string;
  industries: string[];
};

export type BlogPost = {
  id?: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  readTime: string;
  seoTitle?: string;
  seoDescription?: string;
};

export type Faq = {
  id?: string;
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
  primaryColor?: string;
  accentColor?: string;
  navItems?: {
    label: string;
    href: string;
  }[];
  seoTitle?: string;
  seoDescription?: string;
};

export type HomeSectionType =
  | "hero"
  | "categories"
  | "featuredProducts"
  | "advantages"
  | "applications"
  | "company"
  | "faq"
  | "cta";

export type HomeSectionConfig = {
  id: string;
  type: HomeSectionType;
  title?: string;
  eyebrow?: string;
  description?: string;
  enabled: boolean;
  sortOrder: number;
  productLimit?: number;
  image?: string;
  imageAssetId?: string;
  buttonLabel?: string;
  buttonHref?: string;
  variant?: "dark" | "light";
};

export type ThemeSettings = {
  id?: string;
  primaryColor: string;
  accentColor: string;
  sections: HomeSectionConfig[];
};
