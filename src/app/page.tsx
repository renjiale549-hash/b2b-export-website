import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { ButtonLink } from "@/components/button-link";
import { ContactForm } from "@/components/contact-form";
import { Section } from "@/components/section";
import { getAdvantages, getCategories, getSiteSettings } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteSettings();

  return {
    title: site.seoTitle ?? "OddHug Toys | Ugly-Cute Plush Toys & Quirky Gifts",
    description:
      site.seoDescription ??
      "OddHug Toys creates ugly-cute plush toys, quirky monster gifts, and custom toy projects for retailers, brands, and toy lovers.",
  };
}

export default async function HomePage() {
  const [siteConfig, categories, advantages] = await Promise.all([
    getSiteSettings(),
    getCategories(),
    getAdvantages(),
  ]);

  return (
    <>
      <section className="wave-band relative overflow-hidden bg-[#fff8e8]">
        <div className="relative z-10 mx-auto grid min-h-[680px] max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.92fr] lg:px-8">
          <div className="min-w-0">
            <div className="inline-flex rotate-[-2deg] rounded-full bg-white px-4 py-2 text-sm font-extrabold text-primary shadow-sm">
              Oddly adorable plush friends
            </div>
            <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[0.98] tracking-normal text-foreground sm:text-6xl lg:text-7xl">
              Ugly-Cute Toys That Make People Smile
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              Meet OddHug Toys - quirky plush friends, weird little monsters, and collectible gifts designed for brands, retailers, and toy lovers.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact">Send Inquiry</ButtonLink>
              <ButtonLink href="/products" variant="secondary">
                View Collections
              </ButtonLink>
            </div>
          </div>
          <div className="relative min-w-0">
            <div className="absolute left-0 top-10 z-10 rotate-[-10deg] rounded-3xl bg-white px-4 py-3 text-sm font-black text-foreground shadow-lg sm:-left-7">
              weirdly hug-ready
            </div>
            <div className="absolute bottom-12 right-0 z-10 rotate-[7deg] rounded-3xl bg-accent px-4 py-3 text-sm font-black text-foreground shadow-lg sm:-right-4">
              custom orders
            </div>
            <div className="toy-shadow relative overflow-hidden rounded-[3rem] border-4 border-white bg-white">
              <Image
                src={siteConfig.heroImage || "/oddhug/hero-toy-scene.svg"}
                alt="OddHug Toys ugly-cute plush friends and quirky monster collectibles"
                width={1000}
                height={800}
                priority
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <Section
        eyebrow="Collections"
        title="Four ways to get wonderfully weird."
        description="Start with a toy mood, a retail shelf need, or a custom character idea. OddHug keeps the process inquiry-based and practical."
      >
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <Link
              key={category.slug}
              href="/products"
              className="wiggle-card rounded-[2rem] border-2 border-white bg-white p-6 shadow-[0_16px_36px_rgba(47,35,66,0.1)] transition duration-300 hover:shadow-[0_24px_46px_rgba(47,35,66,0.16)]"
              style={{ "--tilt": `${index % 2 === 0 ? -1.5 : 1.5}deg` } as CSSProperties}
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-sm font-black">
                {["PL", "MM", "GF", "DIY"][index] ?? "OH"}
              </div>
              <h3 className="text-xl font-black">{category.name}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{category.description}</p>
            </Link>
          ))}
        </div>
      </Section>

      <section id="why-oddhug" className="bg-white/70 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-9 max-w-3xl">
            <p className="mb-3 text-sm font-extrabold uppercase tracking-wide text-primary">Why OddHug</p>
            <h2 className="text-3xl font-black tracking-normal text-foreground sm:text-4xl">
              Cute is easy. Memorable is a little weird.
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
              OddHug toys are made to feel soft, retail-friendly, and instantly recognizable.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {advantages.map((advantage, index) => (
              <article key={advantage} className="rounded-[2rem] border-2 border-white bg-[#fff8e8] p-5 shadow-sm">
                <div
                  className="mb-5 h-3 w-16 rounded-full"
                  style={{ background: ["#ff7fb2", "#b8f6d2", "#ffe66d", "#d9c4ff"][index] }}
                />
                <h3 className="text-lg font-black">{advantage}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Section
        eyebrow="About OddHug"
        title="Imperfect little monsters, made worth hugging."
        description="OddHug Toys is a character-led toy brand focused on strange but lovable plush friends, quirky mini monsters, and custom gift projects. We believe the most memorable toys are not perfectly polished. They have funny eyes, awkward shapes, soft textures, and a tiny personality problem that makes people smile."
      >
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["For retailers", "Giftable characters with strong shelf presence and easy-to-understand stories."],
            ["For brands", "Custom mascot and campaign toy concepts that feel playful, tactile, and shareable."],
            ["For toy lovers", "Weird little friends that make imperfection feel warm, funny, and collectible."],
          ].map(([title, text]) => (
            <article key={title} className="sticker-border rounded-[2rem] bg-white p-6 shadow-sm">
              <h3 className="text-xl font-black">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p>
            </article>
          ))}
        </div>
      </Section>

      <section id="inquiry" className="bg-[#fff0f7] py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-wide text-primary">Inquiry</p>
            <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-4xl">
              Send us your weird-cute toy idea.
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              No cart, no payment, no account. Just tell us what kind of plush friend, mini monster, wholesale order, or custom toy project you have in mind.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
