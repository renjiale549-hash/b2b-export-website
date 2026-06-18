import type { Metadata } from "next";
import { Section } from "@/components/section";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms for using the OddHug Toys product and inquiry website.",
};

export default function TermsOfServicePage() {
  return (
    <Section eyebrow="Legal" title="Terms of Service" description="Basic terms for browsing OddHug Toys and sending product inquiries.">
      <div className="max-w-3xl space-y-6 rounded-[2rem] border-2 border-white bg-white p-6 text-sm leading-7 text-muted-foreground shadow-sm">
        <p>Toy descriptions, colors, sizes, materials, and project examples on this website are provided for general reference and may be updated without notice.</p>
        <p>Quotations, samples, lead times, specifications, packaging, and custom requirements are confirmed separately in written communication.</p>
        <p>Users should provide accurate inquiry information and confirm that requested products meet the regulations and import requirements of their market.</p>
        <p>Using this website or sending an inquiry does not create a purchase agreement. Final terms are defined by an accepted quotation and related sales documents.</p>
      </div>
    </Section>
  );
}
