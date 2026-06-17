import type { Metadata } from "next";
import { InquiryCta } from "@/components/inquiry-cta";
import { Section } from "@/components/section";
import { getApplications, getSiteSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Applications",
  description: "Explore industrial applications for export valves, fittings, and custom assemblies.",
};

export default async function ApplicationsPage() {
  const [site, applications] = await Promise.all([getSiteSettings(), getApplications()]);

  return (
    <>
      <Section eyebrow="Applications" title="Solutions for procurement teams and project buyers" description="Our products are selected for stable export supply across industrial, commercial, and OEM use cases.">
        <div className="grid gap-6 md:grid-cols-3">
          {applications.map((application) => (
            <article key={application.title} className="rounded-lg border border-border bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold">{application.title}</h2>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">{application.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {application.industries.map((industry) => (
                  <span key={industry} className="rounded-md bg-muted px-3 py-2 text-xs font-semibold text-muted-foreground">
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
