import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { Section } from "@/components/section";
import { getSiteSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Inquiry",
  description: "Send OddHug Toys an inquiry about plush toys, wholesale orders, mini monsters, or custom toy projects.",
};

export default async function ContactPage() {
  const siteConfig = await getSiteSettings();

  return (
    <Section
      eyebrow="Inquiry"
      title="Tell us about your next odd little friend."
      description="Share the toy style, estimated quantity, market, and any custom character or packaging ideas. We will reply with practical next steps."
    >
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <aside className="rounded-[2rem] border-2 border-white bg-[#fff0f7] p-6 shadow-sm">
          <h2 className="text-2xl font-black">OddHug Toy Desk</h2>
          <div className="mt-5 space-y-4 text-sm leading-6 text-muted-foreground">
            <p><strong className="text-foreground">Email:</strong> {siteConfig.email}</p>
            <p><strong className="text-foreground">Phone:</strong> {siteConfig.phone}</p>
            <p><strong className="text-foreground">Studio:</strong> {siteConfig.address}</p>
          </div>
          <div className="mt-6 rounded-2xl bg-white p-4 text-sm leading-6 text-muted-foreground">
            Helpful details include toy type, size, colors, estimated quantity, target market, packaging, and any character sketches or references.
          </div>
        </aside>
        <ContactForm />
      </div>
    </Section>
  );
}
