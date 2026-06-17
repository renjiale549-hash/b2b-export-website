import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { getSiteSettings } from "@/lib/content";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteSettings();

  return {
    metadataBase: new URL(site.url),
    title: {
      default: site.seoTitle ?? `${site.name} | B2B Export Industrial Products`,
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
  const site = await getSiteSettings();

  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Header site={site} />
        <main>{children}</main>
        <Footer site={site} />
      </body>
    </html>
  );
}
