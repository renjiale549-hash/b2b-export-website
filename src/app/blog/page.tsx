import Link from "next/link";
import type { Metadata } from "next";
import { Section } from "@/components/section";
import { getBlogPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Toy Notes",
  description: "Ideas and practical notes about ugly-cute plush toys, quirky retail gifts, and custom toy projects.",
};

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();

  return (
    <Section
      eyebrow="Toy Notes"
      title="Soft ideas for wonderfully weird products."
      description="Short reads for retailers, brands, and toy people planning memorable plush, collectible, and custom character projects."
    >
      <div className="grid gap-6 md:grid-cols-3">
        {blogPosts.map((post, index) => (
          <article key={post.slug} className="rounded-[2rem] border-2 border-white bg-white p-6 shadow-sm">
            <div className="mb-5 h-3 w-16 rounded-full" style={{ background: ["#ff7fb2", "#b8f6d2", "#ffe66d"][index % 3] }} />
            <p className="text-xs font-extrabold uppercase tracking-wide text-primary">{post.date} - {post.readTime}</p>
            <h2 className="mt-3 text-xl font-black">{post.title}</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{post.excerpt}</p>
            <Link href="/contact" className="mt-5 inline-flex text-sm font-extrabold text-primary">
              Ask about a project
            </Link>
          </article>
        ))}
      </div>
    </Section>
  );
}
