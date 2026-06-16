import type { Metadata } from "next";
import { InquiryCta } from "@/components/inquiry-cta";
import { Section } from "@/components/section";
import { advantages, siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Atlas Industrial Supply, a B2B export partner for industrial products and custom assemblies.",
};

export default function AboutPage() {
  return (
    <>
      <Section eyebrow="About Us" title="A practical export partner for repeat B2B supply." description={`${siteConfig.name} supports overseas importers, distributors, and engineering customers with product sourcing, OEM packaging, and documentation for international trade.`}>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-lg border border-border bg-white p-6 shadow-sm">
            <p className="text-4xl font-bold text-primary">12+</p>
            <p className="mt-2 text-sm font-semibold text-muted-foreground">Export markets served</p>
          </div>
          <div className="rounded-lg border border-border bg-white p-6 shadow-sm">
            <p className="text-4xl font-bold text-primary">48h</p>
            <p className="mt-2 text-sm font-semibold text-muted-foreground">Typical quote preparation window</p>
          </div>
          <div className="rounded-lg border border-border bg-white p-6 shadow-sm">
            <p className="text-4xl font-bold text-primary">OEM</p>
            <p className="mt-2 text-sm font-semibold text-muted-foreground">Branding and packaging support</p>
          </div>
        </div>
      </Section>
      <Section className="bg-white" eyebrow="How We Work" title="Clear process from inquiry to shipment">
        <div className="grid gap-4 md:grid-cols-4">
          {["RFQ review", "Specification confirmation", "Sampling or order approval", "Production and export"].map((step, index) => (
            <div key={step} className="rounded-lg border border-border p-5">
              <p className="text-sm font-bold text-primary">Step {index + 1}</p>
              <h2 className="mt-2 font-bold">{step}</h2>
            </div>
          ))}
        </div>
      </Section>
      <Section eyebrow="Strengths" title="What buyers can expect">
        <ul className="grid gap-4 md:grid-cols-2">
          {advantages.map((advantage) => (
            <li key={advantage} className="rounded-lg border border-border bg-white p-5 font-semibold shadow-sm">
              {advantage}
            </li>
          ))}
        </ul>
      </Section>
      <InquiryCta />
    </>
  );
}
