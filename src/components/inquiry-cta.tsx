import { ButtonLink } from "./button-link";

type InquiryCtaProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
};

export function InquiryCta({
  eyebrow = "Start an OddHug inquiry",
  title = "Tell us what kind of weird-cute friend you want to make.",
  description = "Share your toy type, quantity, market, and custom ideas. We will reply with practical options for samples, wholesale orders, or custom toy projects.",
}: InquiryCtaProps) {
  return (
    <section className="bg-[#2f2342] py-14 text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <p className="text-sm font-extrabold uppercase tracking-wide text-[#ffe66d]">{eyebrow}</p>
          <h2 className="mt-2 text-3xl font-black tracking-normal">{title}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/80">
            {description}
          </p>
        </div>
        <ButtonLink href="/contact" variant="secondary" className="shrink-0 border-white bg-white text-[#2f2342] hover:bg-[#fff8e8]">
          Send Inquiry
        </ButtonLink>
      </div>
    </section>
  );
}
