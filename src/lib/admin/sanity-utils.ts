import crypto from "crypto";
import { revalidatePath } from "next/cache";
import type { HomeSectionConfig, Product, SiteConfig } from "@/lib/types";

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function makeKey() {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 12);
}

export function cleanString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export function parseStringList(value: unknown) {
  if (Array.isArray(value)) {
    return value.map((item) => cleanString(item)).filter(Boolean);
  }

  return cleanString(value)
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function parseSpecs(value: unknown) {
  if (Array.isArray(value)) {
    return value
      .map((item) => ({
        _key: makeKey(),
        label: cleanString(item?.label),
        value: cleanString(item?.value),
      }))
      .filter((item) => item.label && item.value);
  }

  return cleanString(value)
    .split(/\r?\n/)
    .map((line) => {
      const [label, ...rest] = line.split("|");
      return {
        _key: makeKey(),
        label: cleanString(label),
        value: cleanString(rest.join("|")),
      };
    })
    .filter((item) => item.label && item.value);
}

export function productToSanityDoc(input: Partial<Product> & { sortOrder?: number }) {
  const name = cleanString(input.name);
  const slug = slugify(cleanString(input.slug) || name);

  if (!name || !slug) {
    throw new Error("产品名称和网址标识不能为空");
  }

  const doc: { _type: string; [key: string]: unknown } = {
    _type: "product",
    name,
    slug: { _type: "slug", current: slug },
    summary: cleanString(input.summary),
    description: cleanString(input.description),
    categoryName: cleanString(input.category),
    specs: parseSpecs(input.specs),
    features: parseStringList(input.features),
    applications: parseStringList(input.applications),
    sortOrder: Number(input.sortOrder ?? 100),
    seoTitle: cleanString(input.seoTitle),
    seoDescription: cleanString(input.seoDescription),
  };

  if (input.categoryId) {
    doc.category = { _type: "reference", _ref: input.categoryId };
  }

  if (input.imageAssetId) {
    doc.image = {
      _type: "image",
      asset: { _type: "reference", _ref: input.imageAssetId },
    };
  } else if (input.image) {
    doc.imageUrl = input.image;
  }

  if (input.gallery?.length) {
    doc.gallery = input.gallery
      .filter((item) => item.assetId)
      .map((item) => ({
        _key: makeKey(),
        _type: "image",
        alt: cleanString(item.alt) || name,
        asset: { _type: "reference", _ref: item.assetId },
      }));
  }

  return { doc, slug };
}

export function siteSettingsToSanityDoc(input: Partial<SiteConfig>) {
  return {
    _type: "siteSettings",
    name: cleanString(input.name),
    url: cleanString(input.url),
    email: cleanString(input.email),
    phone: cleanString(input.phone),
    address: cleanString(input.address),
    tagline: cleanString(input.tagline),
    heroEyebrow: cleanString(input.heroEyebrow),
    heroTitle: cleanString(input.heroTitle),
    heroDescription: cleanString(input.heroDescription),
    categorySectionTitle: cleanString(input.categorySectionTitle),
    categorySectionDescription: cleanString(input.categorySectionDescription),
    featuredProductsTitle: cleanString(input.featuredProductsTitle),
    featuredProductsDescription: cleanString(input.featuredProductsDescription),
    companySectionTitle: cleanString(input.companySectionTitle),
    companySectionDescription: cleanString(input.companySectionDescription),
    ctaEyebrow: cleanString(input.ctaEyebrow),
    ctaTitle: cleanString(input.ctaTitle),
    ctaDescription: cleanString(input.ctaDescription),
    primaryColor: cleanString(input.primaryColor),
    accentColor: cleanString(input.accentColor),
    navItems: input.navItems?.map((item) => ({
      _key: makeKey(),
      label: cleanString(item.label),
      href: cleanString(item.href),
    })).filter((item) => item.label && item.href),
    seoTitle: cleanString(input.seoTitle),
    seoDescription: cleanString(input.seoDescription),
  };
}

export function themeSectionToSanity(section: HomeSectionConfig) {
  const doc: Record<string, unknown> = {
    _key: section.id || makeKey(),
    id: section.id || section.type,
    type: section.type,
    title: cleanString(section.title),
    eyebrow: cleanString(section.eyebrow),
    description: cleanString(section.description),
    enabled: Boolean(section.enabled),
    sortOrder: Number(section.sortOrder ?? 100),
    productLimit: Number(section.productLimit ?? 4),
    buttonLabel: cleanString(section.buttonLabel),
    buttonHref: cleanString(section.buttonHref),
    variant: section.variant || "light",
  };

  if (section.imageAssetId) {
    doc.image = {
      _type: "image",
      asset: { _type: "reference", _ref: section.imageAssetId },
    };
  }

  return doc;
}

export function revalidateStorefront(paths: string[] = []) {
  ["/", "/products", "/applications", "/about", "/blog", "/contact", ...paths].forEach((path) => {
    revalidatePath(path);
  });
}
