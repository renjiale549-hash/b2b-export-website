import {
  advantages as fallbackAdvantages,
  applications as fallbackApplications,
  blogPosts as fallbackBlogPosts,
  categories as fallbackCategories,
  faqs as fallbackFaqs,
  getProductBySlug as getFallbackProductBySlug,
  products as fallbackProducts,
  siteConfig as fallbackSiteConfig,
} from "./data";
import type { Application, BlogPost, Category, Faq, Product, SiteConfig } from "./types";
import { getSanityClient } from "@/sanity/client";
import {
  advantagesQuery,
  applicationsQuery,
  blogPostsQuery,
  categoriesQuery,
  faqsQuery,
  productBySlugQuery,
  productsQuery,
  siteSettingsQuery,
  themeSettingsQuery,
} from "@/sanity/queries";
import type { ThemeSettings } from "./types";

async function fetchSanity<T>(query: string, params?: Record<string, string>) {
  const client = getSanityClient();

  if (!client) {
    return null;
  }

  try {
    return await client.fetch<T>(query, params ?? {});
  } catch {
    return null;
  }
}

function stripEmptyValues<T extends Record<string, unknown>>(value: T | null | undefined) {
  if (!value) {
    return null;
  }

  return Object.fromEntries(Object.entries(value).filter(([, entry]) => entry !== null && entry !== undefined && entry !== "")) as Partial<T>;
}

function withFallbackArray<T>(items: T[] | null, fallback: T[]) {
  return items && items.length > 0 ? items : fallback;
}

function normalizeProduct(product: Product, fallback = fallbackProducts[0]): Product {
  return {
    ...fallback,
    ...stripEmptyValues(product),
    slug: product.slug || fallback.slug,
    name: product.name || fallback.name,
    category: product.category || fallback.category,
    image: product.image || fallback.image,
    specs: product.specs?.filter((spec) => spec?.label && spec?.value) ?? fallback.specs,
    features: product.features?.filter(Boolean) ?? fallback.features,
    applications: product.applications?.filter(Boolean) ?? fallback.applications,
  };
}

export async function getSiteSettings(): Promise<SiteConfig> {
  const settings = await fetchSanity<Partial<SiteConfig> | null>(siteSettingsQuery);
  return { ...fallbackSiteConfig, ...stripEmptyValues(settings) };
}

export async function getThemeSettings(): Promise<ThemeSettings> {
  const theme = await fetchSanity<Partial<ThemeSettings> | null>(themeSettingsQuery);

  return {
    id: theme?.id,
    primaryColor: theme?.primaryColor || fallbackSiteConfig.primaryColor || "#0f766e",
    accentColor: theme?.accentColor || fallbackSiteConfig.accentColor || "#f59e0b",
    sections: theme?.sections?.length
      ? theme.sections
      : [
          { id: "hero", type: "hero", enabled: true, sortOrder: 10, variant: "dark" },
          { id: "categories", type: "categories", enabled: true, sortOrder: 20 },
          { id: "featuredProducts", type: "featuredProducts", enabled: true, sortOrder: 30, productLimit: 4 },
          { id: "advantages", type: "advantages", enabled: true, sortOrder: 40 },
          { id: "applications", type: "applications", enabled: true, sortOrder: 50 },
          { id: "company", type: "company", enabled: true, sortOrder: 60 },
          { id: "faq", type: "faq", enabled: true, sortOrder: 70 },
          { id: "cta", type: "cta", enabled: true, sortOrder: 80 },
        ],
  };
}

export async function getCategories(): Promise<Category[]> {
  return withFallbackArray(await fetchSanity<Category[]>(categoriesQuery), fallbackCategories);
}

export async function getProducts(): Promise<Product[]> {
  const products = await fetchSanity<Product[]>(productsQuery);
  return withFallbackArray(products, fallbackProducts).map((product, index) => normalizeProduct(product, fallbackProducts[index] ?? fallbackProducts[0]));
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  const product = await fetchSanity<Product | null>(productBySlugQuery, { slug });
  const fallback = getFallbackProductBySlug(slug);

  if (!product) {
    return fallback;
  }

  return normalizeProduct(product, fallback ?? fallbackProducts[0]);
}

export async function getApplications(): Promise<Application[]> {
  return withFallbackArray(await fetchSanity<Application[]>(applicationsQuery), fallbackApplications);
}

export async function getAdvantages(): Promise<string[]> {
  const advantages = await fetchSanity<Array<{ title: string }>>(advantagesQuery);
  return withFallbackArray(
    advantages?.map((advantage) => advantage.title).filter(Boolean) ?? null,
    fallbackAdvantages,
  );
}

export async function getFaqs(): Promise<Faq[]> {
  return withFallbackArray(await fetchSanity<Faq[]>(faqsQuery), fallbackFaqs);
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  return withFallbackArray(await fetchSanity<BlogPost[]>(blogPostsQuery), fallbackBlogPosts);
}
