import Link from "next/link";
import type { SiteConfig } from "@/lib/types";
import { ButtonLink } from "./button-link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/applications", label: "Applications" },
  { href: "/about", label: "About Us" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Header({ site }: { site: SiteConfig }) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="text-lg font-bold text-foreground">
            {site.name}
          </Link>
          <ButtonLink href="/contact" className="lg:hidden">
            Inquiry
          </ButtonLink>
        </div>
        <nav aria-label="Main navigation" className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium text-muted-foreground">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-primary">
              {item.label}
            </Link>
          ))}
        </nav>
        <ButtonLink href="/contact" className="hidden lg:inline-flex">
          Request Quote
        </ButtonLink>
      </div>
    </header>
  );
}
