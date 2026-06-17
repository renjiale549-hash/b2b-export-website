import { ButtonLink } from "./button-link";

type InquiryCtaProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
};

export function InquiryCta({
  eyebrow = "Ready to source?",
  title = "Send your RFQ and receive a practical export quotation.",
  description = "Share product specs, target quantity, destination, and packaging requirements. Our team will respond with suitable options.",
}: InquiryCtaProps) {
  return (
    <section className="bg-primary py-14 text-primary-foreground">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-100">{eyebrow}</p>
          <h2 className="mt-2 text-3xl font-bold tracking-normal">{title}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-teal-50">
            {description}
          </p>
        </div>
        <ButtonLink href="/contact" variant="secondary" className="shrink-0 border-white bg-white text-primary hover:bg-teal-50">
          Start Inquiry
        </ButtonLink>
      </div>
    </section>
  );
}
