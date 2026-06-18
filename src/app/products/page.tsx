import type { Metadata } from "next";
import { InquiryCta } from "@/components/inquiry-cta";
import { ProductCard } from "@/components/product-card";
import { Section } from "@/components/section";
import { getCategories, getProducts, getSiteSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Collections",
  description: "Explore ugly-cute plush friends, mini monster toys, funny gifts, and custom toy projects from OddHug Toys.",
};

export default async function ProductsPage() {
  const [site, categories, products] = await Promise.all([getSiteSettings(), getCategories(), getProducts()]);

  return (
    <>
      <Section
        eyebrow="Collections"
        title="Pick the kind of weird you want to hug."
        description="Browse our starter collection of plush friends, pocket monsters, funny gifts, and custom character projects. Every order begins with an inquiry."
      >
        <div className="mb-8 flex flex-wrap gap-3">
          {categories.map((category, index) => (
            <span
              key={category.slug}
              className="rounded-full border-2 border-white px-4 py-2 text-sm font-extrabold text-foreground shadow-sm"
              style={{ background: ["#fff0f7", "#e8fff1", "#fff8cc", "#f2ebff"][index % 4] }}
            >
              {category.name}
            </span>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </Section>
      <InquiryCta eyebrow={site.ctaEyebrow} title={site.ctaTitle} description={site.ctaDescription} />
    </>
  );
}
