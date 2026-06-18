import Link from "next/link";
import type { SiteConfig } from "@/lib/types";

export function Footer({ site }: { site: SiteConfig }) {
  return (
    <footer className="border-t border-pink-100 bg-[#2f2342] text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <p className="text-2xl font-black text-white">OddHug Toys</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-pink-100">Ugly-cute toys, plush friends & quirky gifts.</p>
          <p className="mt-4 text-sm text-pink-100">Email: {site.email || "inquiry@oddhugtoys.com"}</p>
        </div>
        <div>
          <p className="font-bold text-white">Explore</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-pink-100">
            <Link href="/products">Collections</Link>
            <Link href="/about">About OddHug</Link>
            <Link href="/blog">Blog</Link>
          </div>
        </div>
        <div>
          <p className="font-bold text-white">Inquiry</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-pink-100">
            <Link href="/contact">Send Inquiry</Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-of-service">Terms of Service</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-pink-100">
        Copyright {new Date().getFullYear()} OddHug Toys. All rights reserved.
      </div>
    </footer>
  );
}
