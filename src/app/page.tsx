import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ButtonLink } from "@/components/button-link";
import { InquiryCta } from "@/components/inquiry-cta";
import { ProductCard } from "@/components/product-card";
import { Section } from "@/components/section";
import { getAdvantages, getApplications, getCategories, getFaqs, getProducts, getSiteSettings, getThemeSettings } from "@/lib/content";
import type { Application, Category, Faq, HomeSectionConfig, Product, SiteConfig } from "@/lib/types";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteSettings();

  return {
    title: site.seoTitle ?? "B2B Export Industrial Products",
    description: site.seoDescription ?? "Source export-ready valves, fittings, and custom assemblies for distributor and engineering procurement programs.",
  };
}

export default async function HomePage() {
  const [siteConfig, theme, categories, products, advantages, applications, faqs] = await Promise.all([
    getSiteSettings(),
    getThemeSettings(),
    getCategories(),
    getProducts(),
    getAdvantages(),
    getApplications(),
    getFaqs(),
  ]);
  const sections = theme.sections.filter((section) => section.enabled).sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <>
      {sections.map((section) =>
        renderHomeSection({ section, siteConfig, categories, products, advantages, applications, faqs }),
      )}
    </>
  );
}

function renderHomeSection({
  section,
  siteConfig,
  categories,
  products,
  advantages,
  applications,
  faqs,
}: {
  section: HomeSectionConfig;
  siteConfig: SiteConfig;
  categories: Category[];
  products: Product[];
  advantages: string[];
  applications: Application[];
  faqs: Faq[];
}) {
  if (section.type === "hero") {
    return (
      <section key={section.id} className={`${section.variant === "light" ? "bg-white text-foreground" : "bg-slate-950 text-white"}`}>
        <div className="mx-auto grid min-h-[620px] max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div>
            <p className={`text-sm font-semibold uppercase tracking-wide ${section.variant === "light" ? "text-primary" : "text-teal-200"}`}>
              {section.eyebrow || siteConfig.heroEyebrow}
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-normal sm:text-5xl lg:text-6xl">
              {section.title || siteConfig.heroTitle}
            </h1>
            <p className={`mt-6 max-w-2xl text-lg leading-8 ${section.variant === "light" ? "text-muted-foreground" : "text-slate-300"}`}>
              {section.description || siteConfig.heroDescription}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={section.buttonHref || "/contact"}>{section.buttonLabel || "Request Quote"}</ButtonLink>
              <ButtonLink href="/products" variant="secondary" className={section.variant === "light" ? "" : "border-slate-600 bg-transparent text-white hover:border-white hover:text-white"}>
                View Products
              </ButtonLink>
            </div>
          </div>
          <div className="relative aspect-[5/4] overflow-hidden rounded-lg border border-slate-800 bg-slate-900">
            <Image
              src={section.image || siteConfig.heroImage || "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1400&q=80"}
              alt={section.title || "Industrial components prepared for export"}
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
          </div>
        </div>
      </section>
    );
  }

  if (section.type === "categories") {
    return (
      <Section key={section.id} eyebrow={section.eyebrow || "Product Categories"} title={section.title || siteConfig.categorySectionTitle || "Product Categories"} description={section.description || siteConfig.categorySectionDescription}>
        <div className="grid gap-5 md:grid-cols-3">
          {categories.map((category) => (
            <Link key={category.slug} href="/products" className="rounded-lg border border-border bg-white p-6 shadow-sm transition hover:border-primary hover:shadow-md">
              <h3 className="text-xl font-bold">{category.name}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{category.description}</p>
            </Link>
          ))}
        </div>
      </Section>
    );
  }

  if (section.type === "featuredProducts") {
    return (
      <Section key={section.id} className="bg-white" eyebrow={section.eyebrow || "Featured Products"} title={section.title || siteConfig.featuredProductsTitle || "Featured Products"} description={section.description || siteConfig.featuredProductsDescription}>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, section.productLimit || 4).map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </Section>
    );
  }

  if (section.type === "advantages") {
    return (
      <Section key={section.id} eyebrow={section.eyebrow || "Core Advantages"} title={section.title || "A supply process shaped around B2B procurement."} description={section.description}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {advantages.map((advantage) => (
            <div key={advantage} className="rounded-lg border border-border bg-white p-5 shadow-sm">
              <div className="mb-4 h-2 w-12 rounded-full bg-accent" />
              <p className="font-semibold leading-7">{advantage}</p>
            </div>
          ))}
        </div>
      </Section>
    );
  }

  if (section.type === "applications") {
    return (
      <Section key={section.id} className="bg-white" eyebrow={section.eyebrow || "Applications"} title={section.title || "Where our products are used"} description={section.description}>
        <div className="grid gap-6 md:grid-cols-3">
          {applications.map((item) => (
            <article key={item.title} className="rounded-lg border border-border p-6">
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.description}</p>
            </article>
          ))}
        </div>
      </Section>
    );
  }

  if (section.type === "company") {
    return (
      <Section key={section.id} eyebrow={section.eyebrow || "Company"} title={section.title || siteConfig.companySectionTitle || "Company"} description={section.description || siteConfig.companySectionDescription}>
        <ButtonLink href={section.buttonHref || "/about"} variant="secondary">
          {section.buttonLabel || "Learn About Us"}
        </ButtonLink>
      </Section>
    );
  }

  if (section.type === "faq") {
    return (
      <Section key={section.id} className="bg-white" eyebrow={section.eyebrow || "FAQ"} title={section.title || "Common questions from overseas buyers"} description={section.description}>
        <div className="grid gap-4 md:grid-cols-2">
          {faqs.map((faq) => (
            <article key={faq.question} className="rounded-lg border border-border p-5">
              <h3 className="font-bold">{faq.question}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{faq.answer}</p>
            </article>
          ))}
        </div>
      </Section>
    );
  }

  return (
    <InquiryCta
      key={section.id}
      eyebrow={section.eyebrow || siteConfig.ctaEyebrow}
      title={section.title || siteConfig.ctaTitle}
      description={section.description || siteConfig.ctaDescription}
    />
  );
}
