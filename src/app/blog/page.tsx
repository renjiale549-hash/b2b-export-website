import Link from "next/link";
import type { Metadata } from "next";
import { Section } from "@/components/section";
import { getBlogPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description: "B2B sourcing tips for overseas buyers, importers, distributors, and engineering procurement teams.",
};

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();

  return (
    <Section eyebrow="Blog" title="Sourcing insights for B2B buyers" description="Short practical articles that help overseas procurement teams prepare clearer inquiries and supplier evaluations.">
      <div className="grid gap-6 md:grid-cols-3">
        {blogPosts.map((post) => (
          <article key={post.slug} className="rounded-lg border border-border bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">{post.date} - {post.readTime}</p>
            <h2 className="mt-3 text-xl font-bold">{post.title}</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{post.excerpt}</p>
            <Link href="/contact" className="mt-5 inline-flex text-sm font-semibold text-primary">
              Ask our team
            </Link>
          </article>
        ))}
      </div>
    </Section>
  );
}
