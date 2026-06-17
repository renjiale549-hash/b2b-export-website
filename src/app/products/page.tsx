import type { Metadata } from "next";
import { InquiryCta } from "@/components/inquiry-cta";
import { ProductCard } from "@/components/product-card";
import { Section } from "@/components/section";
import { getCategories, getProducts, getSiteSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Products",
  description: "Browse export-ready industrial valves, pipe fittings, and custom assemblies for B2B procurement.",
};

export default async function ProductsPage() {
  const [site, categories, products] = await Promise.all([getSiteSettings(), getCategories(), getProducts()]);

  return (
    <>
      <Section eyebrow="Products" title="Industrial products for global buyers" description="Use this mock catalog as the starting point for a real product database, CMS, or ERP integration later.">
        <div className="mb-8 flex flex-wrap gap-3">
          {categories.map((category) => (
            <span key={category.slug} className="rounded-md border border-border bg-white px-4 py-2 text-sm font-semibold text-muted-foreground">
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
