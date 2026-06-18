import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ButtonLink } from "@/components/button-link";
import { InquiryCta } from "@/components/inquiry-cta";
import { getProduct, getProducts, getSiteSettings } from "@/lib/content";

type ProductDetailProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }

  return {
    title: product.seoTitle ?? product.name,
    description: product.seoDescription ?? product.summary,
  };
}

export default async function ProductDetailPage({ params }: ProductDetailProps) {
  const { slug } = await params;
  const [site, product] = await Promise.all([getSiteSettings(), getProduct(slug)]);

  if (!product) {
    notFound();
  }

  const gallery = product.gallery?.length ? product.gallery : [{ url: product.image, alt: product.name }];

  return (
    <>
      <section className="py-14 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <div className="toy-shadow relative aspect-[4/3] overflow-hidden rounded-[2.5rem] border-4 border-white bg-muted">
              <Image src={product.image} alt={`${product.name} ugly-cute toy by OddHug Toys`} fill priority className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
            </div>
            {gallery.length > 1 ? (
              <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
                {gallery.map((item, index) => (
                  <div key={`${item.url}-${index}`} className="relative aspect-square overflow-hidden rounded-2xl border-2 border-white bg-muted">
                    <Image src={item.url} alt={item.alt || product.name} fill className="object-cover" sizes="120px" />
                  </div>
                ))}
              </div>
            ) : null}
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">{product.category}</p>
            <h1 className="mt-3 text-4xl font-black tracking-normal sm:text-5xl">{product.name}</h1>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">{product.description}</p>
            <div className="mt-8">
              <ButtonLink href="/contact">Send Product Inquiry</ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-black">What makes it odd</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {product.features.map((feature) => (
                <div key={feature} className="rounded-2xl border-2 border-white bg-[#fff8e8] p-4 text-sm font-extrabold shadow-sm">
                  {feature}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-black">Made for</h2>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              {product.applications.map((application) => (
                <li key={application} className="rounded-2xl bg-muted px-4 py-3 font-semibold">
                  {application}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black">Toy details</h2>
          <div className="mt-5 overflow-hidden rounded-[2rem] border-2 border-white bg-white shadow-sm">
            {product.specs.map((spec) => (
              <div key={spec.label} className="grid grid-cols-1 border-b border-border last:border-b-0 sm:grid-cols-3">
                <div className="bg-muted px-4 py-3 text-sm font-semibold">{spec.label}</div>
                <div className="px-4 py-3 text-sm text-muted-foreground sm:col-span-2">{spec.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <InquiryCta eyebrow={site.ctaEyebrow} title={site.ctaTitle} description={site.ctaDescription} />
    </>
  );
}
