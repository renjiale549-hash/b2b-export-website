import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="wiggle-card overflow-hidden rounded-[2rem] border-2 border-white bg-white shadow-[0_18px_40px_rgba(47,35,66,0.1)] transition duration-300 hover:shadow-[0_24px_50px_rgba(47,35,66,0.16)]" style={{ "--tilt": "-1deg" } as CSSProperties}>
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/3] bg-muted">
          <Image src={product.image} alt={product.name} fill className="object-cover" sizes="(min-width: 1024px) 33vw, 100vw" />
        </div>
        <div className="p-5">
          <p className="text-xs font-extrabold uppercase tracking-wide text-primary">{product.category}</p>
          <h3 className="mt-2 text-xl font-black text-foreground">{product.name}</h3>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{product.summary}</p>
          <span className="mt-5 inline-flex rounded-full bg-yellow-100 px-4 py-2 text-sm font-extrabold text-foreground">Meet this friend</span>
        </div>
      </Link>
    </article>
  );
}
