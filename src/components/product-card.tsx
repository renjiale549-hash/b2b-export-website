import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="overflow-hidden rounded-lg border border-border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/3] bg-muted">
          <Image src={product.image} alt={product.name} fill className="object-cover" sizes="(min-width: 1024px) 33vw, 100vw" />
        </div>
        <div className="p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">{product.category}</p>
          <h3 className="mt-2 text-xl font-bold text-foreground">{product.name}</h3>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{product.summary}</p>
          <span className="mt-5 inline-flex text-sm font-semibold text-primary">View details</span>
        </div>
      </Link>
    </article>
  );
}
