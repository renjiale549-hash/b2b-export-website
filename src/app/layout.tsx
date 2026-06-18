import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { RootChrome } from "@/components/root-chrome";
import { getSiteSettings, getThemeSettings } from "@/lib/content";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteSettings();

  return {
    metadataBase: new URL(site.url),
    title: {
      default: site.seoTitle ?? "OddHug Toys | Ugly-Cute Plush Toys & Quirky Gifts",
      template: `%s | ${site.name}`,
    },
    description: site.seoDescription ?? site.tagline,
    openGraph: {
      title: site.name,
      description: site.tagline,
      url: site.url,
      siteName: site.name,
      type: "website",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [site, theme] = await Promise.all([getSiteSettings(), getThemeSettings()]);

  return (
    <html lang="en" className={inter.variable}>
      <body
        style={
          {
            "--primary": theme.primaryColor || site.primaryColor || "#ff7fb2",
            "--accent": theme.accentColor || site.accentColor || "#ffe66d",
          } as CSSProperties
        }
      >
        <RootChrome site={site}>{children}</RootChrome>
      </body>
    </html>
  );
}
