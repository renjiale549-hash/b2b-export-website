"use client";

import { usePathname } from "next/navigation";
import type { SiteConfig } from "@/lib/types";
import { Footer } from "./footer";
import { Header } from "./header";

export function RootChrome({ children, site }: { children: React.ReactNode; site: SiteConfig }) {
  const pathname = usePathname();
  const isAdminSurface = pathname.startsWith("/admin") || pathname.startsWith("/studio");

  if (isAdminSurface) {
    return <>{children}</>;
  }

  return (
    <>
      <Header site={site} />
      <main>{children}</main>
      <Footer site={site} />
    </>
  );
}
