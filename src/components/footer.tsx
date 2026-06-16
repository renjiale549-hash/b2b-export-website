import Link from "next/link";
import { siteConfig } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-border bg-slate-950 text-slate-200">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <p className="text-lg font-bold text-white">{siteConfig.name}</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-300">{siteConfig.tagline}</p>
          <p className="mt-4 text-sm text-slate-400">{siteConfig.address}</p>
        </div>
        <div>
          <p className="font-semibold text-white">Company</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-slate-300">
            <Link href="/about">About Us</Link>
            <Link href="/applications">Applications</Link>
            <Link href="/blog">Blog</Link>
          </div>
        </div>
        <div>
          <p className="font-semibold text-white">Support</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-slate-300">
            <Link href="/contact">Contact</Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-of-service">Terms of Service</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-800 px-4 py-5 text-center text-xs text-slate-500">
        Copyright {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}
