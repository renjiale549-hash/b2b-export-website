import type { Metadata } from "next";
import { Section } from "@/components/section";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for using this B2B product information website.",
};

export default function TermsOfServicePage() {
  return (
    <Section eyebrow="Legal" title="Terms of Service" description="This template provides basic website terms. Replace it with final legal terms before production launch.">
      <div className="max-w-3xl space-y-6 rounded-lg border border-border bg-white p-6 text-sm leading-7 text-muted-foreground shadow-sm">
        <p>Product information on this website is provided for general B2B reference and may be updated without notice.</p>
        <p>Quotations, lead times, specifications, packaging, and documentation requirements are confirmed separately in written commercial communication.</p>
        <p>Users should provide accurate inquiry information and verify that requested products meet local regulations, standards, and import requirements.</p>
        <p>Use of this website does not create a purchase agreement. Final terms are defined by confirmed quotation, proforma invoice, and related sales documents.</p>
      </div>
    </Section>
  );
}
