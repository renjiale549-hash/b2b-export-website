import type { Metadata } from "next";
import { InquiryCta } from "@/components/inquiry-cta";
import { Section } from "@/components/section";
import { getAdvantages, getSiteSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "About OddHug",
  description: "Meet OddHug Toys, a warm and weird toy brand making ugly-cute plush friends and quirky collectible gifts.",
};

export default async function AboutPage() {
  const [siteConfig, advantages] = await Promise.all([getSiteSettings(), getAdvantages()]);

  return (
    <>
      <Section
        eyebrow="About OddHug"
        title="We make imperfect little monsters worth hugging."
        description="OddHug Toys creates strange-but-sweet plush friends, mini monsters, and collectible gifts. Funny eyes, awkward shapes, soft textures, and tiny personality problems are all welcome here."
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            ["Odd", "Characters with a face and silhouette people remember."],
            ["Soft", "Huggable materials and tactile details that feel good in hand."],
            ["Yours", "Wholesale and custom options for retailers, brands, and creative projects."],
          ].map(([title, text], index) => (
            <article key={title} className="rounded-[2rem] border-2 border-white bg-white p-6 shadow-sm">
              <p className="text-4xl font-black" style={{ color: ["#ff5f9e", "#41a879", "#8a63d2"][index] }}>{title}</p>
              <p className="mt-3 text-sm font-semibold leading-6 text-muted-foreground">{text}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section className="bg-white/70" eyebrow="How We Work" title="From strange idea to soft little friend">
        <div className="grid gap-4 md:grid-cols-4">
          {["Share the idea", "Shape the character", "Review a sample", "Plan the order"].map((step, index) => (
            <div key={step} className="rounded-[1.5rem] border-2 border-white bg-[#fff8e8] p-5 shadow-sm">
              <p className="text-sm font-black text-primary">Step {index + 1}</p>
              <h2 className="mt-2 font-black">{step}</h2>
            </div>
          ))}
        </div>
      </Section>
      <Section eyebrow="Why OddHug" title="A practical toy partner with a weird little point of view">
        <ul className="grid gap-4 md:grid-cols-2">
          {advantages.map((advantage) => (
            <li key={advantage} className="rounded-[1.5rem] border-2 border-white bg-white p-5 font-extrabold shadow-sm">
              {advantage}
            </li>
          ))}
        </ul>
      </Section>
      <InquiryCta eyebrow={siteConfig.ctaEyebrow} title={siteConfig.ctaTitle} description={siteConfig.ctaDescription} />
    </>
  );
}
