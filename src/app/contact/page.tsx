import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { Section } from "@/components/section";
import { getSiteSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Send an inquiry for export-ready industrial products, OEM packaging, and project quotations.",
};

export default async function ContactPage() {
  const siteConfig = await getSiteSettings();

  return (
    <Section eyebrow="Contact" title="Send your inquiry" description="Tell us what you need, where it will be shipped, and which documents or packaging requirements matter for your market.">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <aside className="rounded-lg border border-border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">Sales Office</h2>
          <div className="mt-5 space-y-4 text-sm leading-6 text-muted-foreground">
            <p><strong className="text-foreground">Email:</strong> {siteConfig.email}</p>
            <p><strong className="text-foreground">Phone:</strong> {siteConfig.phone}</p>
            <p><strong className="text-foreground">Address:</strong> {siteConfig.address}</p>
          </div>
          <div className="mt-6 rounded-md bg-muted p-4 text-sm leading-6 text-muted-foreground">
            For faster quotation, include product drawings, target quantity, destination port, preferred Incoterms, and any certification needs.
          </div>
        </aside>
        <ContactForm />
      </div>
    </Section>
  );
}
