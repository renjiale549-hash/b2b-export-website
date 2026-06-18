import type { Metadata } from "next";
import { InquiryCta } from "@/components/inquiry-cta";
import { Section } from "@/components/section";
import { getApplications, getSiteSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Ways to Work With OddHug",
  description: "Explore retail, brand campaign, collectible, wholesale, and custom toy project ideas with OddHug Toys.",
};

export default async function ApplicationsPage() {
  const [site, applications] = await Promise.all([getSiteSettings(), getApplications()]);

  return (
    <>
      <Section
        eyebrow="Ways to Work Together"
        title="Little monsters for shelves, campaigns, and collections."
        description="OddHug toys can begin as a ready collection inquiry or a custom character idea for your store, brand, event, or gift program."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {applications.map((application, index) => (
            <article key={application.title} className="rounded-[2rem] border-2 border-white bg-white p-6 shadow-sm">
              <div className="mb-5 h-3 w-20 rounded-full" style={{ background: ["#ff7fb2", "#b8f6d2", "#d9c4ff"][index % 3] }} />
              <h2 className="text-2xl font-black">{application.title}</h2>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">{application.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {application.industries.map((industry) => (
                  <span key={industry} className="rounded-full bg-muted px-3 py-2 text-xs font-extrabold text-muted-foreground">
                    {industry}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Section>
      <InquiryCta eyebrow={site.ctaEyebrow} title={site.ctaTitle} description={site.ctaDescription} />
    </>
  );
}
