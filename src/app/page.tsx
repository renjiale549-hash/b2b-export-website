import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ButtonLink } from "@/components/button-link";
import { InquiryCta } from "@/components/inquiry-cta";
import { ProductCard } from "@/components/product-card";
import { Section } from "@/components/section";
import { advantages, applications, categories, faqs, products, siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "B2B Export Industrial Products",
  description: "Source export-ready valves, fittings, and custom assemblies for distributor and engineering procurement programs.",
};

export default function HomePage() {
  return (
    <>
      <section className="bg-slate-950 text-white">
        <div className="mx-auto grid min-h-[620px] max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-teal-200">Global B2B Supply Partner</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-normal sm:text-5xl lg:text-6xl">
              Export-ready industrial products for serious procurement teams.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              {siteConfig.name} helps importers, distributors, and engineering contractors source reliable valves, fittings, and custom assemblies with clear specifications and responsive quoting.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact">Request Quote</ButtonLink>
              <ButtonLink href="/products" variant="secondary" className="border-slate-600 bg-transparent text-white hover:border-white hover:text-white">
                View Products
              </ButtonLink>
            </div>
          </div>
          <div className="relative aspect-[5/4] overflow-hidden rounded-lg border border-slate-800 bg-slate-900">
            <Image
              src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1400&q=80"
              alt="Industrial components prepared for export"
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
          </div>
        </div>
      </section>

      <Section eyebrow="Product Categories" title="Built for distributor shelves and project sites." description="Start with standard catalog products, then adapt materials, packaging, labeling, and documentation for your market.">
        <div className="grid gap-5 md:grid-cols-3">
          {categories.map((category) => (
            <Link key={category.slug} href="/products" className="rounded-lg border border-border bg-white p-6 shadow-sm transition hover:border-primary hover:shadow-md">
              <h3 className="text-xl font-bold">{category.name}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{category.description}</p>
            </Link>
          ))}
        </div>
      </Section>

      <Section className="bg-white" eyebrow="Featured Products" title="Popular export items" description="Mock product data is centralized so your real catalog can replace it cleanly later.">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </Section>

      <Section eyebrow="Core Advantages" title="A supply process shaped around B2B procurement.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {advantages.map((advantage) => (
            <div key={advantage} className="rounded-lg border border-border bg-white p-5 shadow-sm">
              <div className="mb-4 h-2 w-12 rounded-full bg-accent" />
              <p className="font-semibold leading-7">{advantage}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-white" eyebrow="Applications" title="Where our products are used">
        <div className="grid gap-6 md:grid-cols-3">
          {applications.map((item) => (
            <article key={item.title} className="rounded-lg border border-border p-6">
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.description}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="Company" title="Export cooperation without unnecessary friction." description="We focus on clear communication, stable specifications, and documentation that helps international buyers move faster from sample approval to repeat orders.">
        <ButtonLink href="/about" variant="secondary">Learn About Us</ButtonLink>
      </Section>

      <Section className="bg-white" eyebrow="FAQ" title="Common questions from overseas buyers">
        <div className="grid gap-4 md:grid-cols-2">
          {faqs.map((faq) => (
            <article key={faq.question} className="rounded-lg border border-border p-5">
              <h3 className="font-bold">{faq.question}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{faq.answer}</p>
            </article>
          ))}
        </div>
      </Section>

      <InquiryCta />
    </>
  );
}
