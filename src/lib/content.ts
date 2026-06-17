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
} from "@/sanity/queries";

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
