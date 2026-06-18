import Link from "next/link";
import type { SiteConfig } from "@/lib/types";
import { ButtonLink } from "./button-link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Collections" },
  { href: "/#why-oddhug", label: "Why OddHug" },
  { href: "/contact", label: "Inquiry" },
];

export function Header({ site }: { site: SiteConfig }) {
  const items = site.navItems?.length ? site.navItems : navItems;

  return (
    <header className="sticky top-0 z-50 border-b border-pink-100 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto grid max-w-7xl gap-3 px-4 py-4 sm:px-6 lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-8 lg:px-8">
        <Link href="/" className="inline-flex min-w-0 items-center gap-2 text-xl font-black text-foreground">
          <span className="flex h-9 w-9 shrink-0 rotate-[-8deg] items-center justify-center rounded-2xl bg-accent text-lg shadow-sm">O</span>
          <span className="truncate">{site.name}</span>
        </Link>
        <nav aria-label="Main navigation" className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-bold text-muted-foreground lg:justify-center">
          {items.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-primary">
              {item.label}
            </Link>
          ))}
        </nav>
        <ButtonLink href="/contact" className="w-full lg:w-auto">
          Send Inquiry
        </ButtonLink>
      </div>
    </header>
  );
}
