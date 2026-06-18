import type { Metadata } from "next";
import { Section } from "@/components/section";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for OddHug Toys website inquiries and contact information.",
};

export default function PrivacyPolicyPage() {
  return (
    <Section eyebrow="Legal" title="Privacy Policy" description="How OddHug Toys handles information shared through this website.">
      <div className="max-w-3xl space-y-6 rounded-[2rem] border-2 border-white bg-white p-6 text-sm leading-7 text-muted-foreground shadow-sm">
        <p>We collect contact information submitted through inquiry forms, including name, company or store name, email, country, product interest, estimated quantity, and message details.</p>
        <p>We use this information to respond to toy inquiries, discuss samples or custom projects, prepare quotations, and improve communication with prospective customers.</p>
        <p>We do not sell personal information. Information may be shared with logistics, inspection, or production partners only when necessary to support a requested quotation or order.</p>
        <p>You may contact us to request correction or deletion of your contact information.</p>
      </div>
    </Section>
  );
}
