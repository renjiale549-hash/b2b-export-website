import type { Metadata } from "next";
import { Section } from "@/components/section";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for B2B inquiries and business contact information.",
};

export default function PrivacyPolicyPage() {
  return (
    <Section eyebrow="Legal" title="Privacy Policy" description="This template explains how inquiry information is handled on this demo B2B website. Replace it with legal copy reviewed for your business before launch.">
      <div className="max-w-3xl space-y-6 rounded-lg border border-border bg-white p-6 text-sm leading-7 text-muted-foreground shadow-sm">
        <p>We collect business contact information submitted through inquiry forms, including name, company, email, country, product interest, and message details.</p>
        <p>We use this information to respond to inquiries, prepare quotations, coordinate samples or orders, and improve communication with prospective customers.</p>
        <p>We do not sell personal information. Information may be shared with logistics, inspection, or production partners only when necessary to support a requested quotation or order.</p>
        <p>You may contact us to request correction or deletion of your business contact information.</p>
      </div>
    </Section>
  );
}
