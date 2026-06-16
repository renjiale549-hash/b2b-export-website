import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ButtonLink } from "@/components/button-link";
import { InquiryCta } from "@/components/inquiry-cta";
import { getProductBySlug, products } from "@/lib/data";

type ProductDetailProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }

  return {
    title: product.name,
    description: product.summary,
  };
}

export default async function ProductDetailPage({ params }: ProductDetailProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <section className="py-14 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border bg-muted">
            <Image src={product.image} alt={product.name} fill priority className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">{product.category}</p>
            <h1 className="mt-3 text-4xl font-bold tracking-normal sm:text-5xl">{product.name}</h1>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">{product.description}</p>
            <div className="mt-8">
              <ButtonLink href="/contact">Request Product Quote</ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold">Key Features</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {product.features.map((feature) => (
                <div key={feature} className="rounded-lg border border-border p-4 text-sm font-semibold">
                  {feature}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Applications</h2>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              {product.applications.map((application) => (
                <li key={application} className="rounded-md bg-muted px-4 py-3">
                  {application}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold">Specifications</h2>
          <div className="mt-5 overflow-hidden rounded-lg border border-border bg-white">
            {product.specs.map((spec) => (
              <div key={spec.label} className="grid grid-cols-1 border-b border-border last:border-b-0 sm:grid-cols-3">
                <div className="bg-muted px-4 py-3 text-sm font-semibold">{spec.label}</div>
                <div className="px-4 py-3 text-sm text-muted-foreground sm:col-span-2">{spec.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <InquiryCta />
    </>
  );
}
