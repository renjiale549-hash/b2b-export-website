import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

export function Section({ eyebrow, title, description, children, className }: SectionProps) {
  return (
    <section className={cn("py-16 sm:py-20", className)}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-9 max-w-3xl">
          {eyebrow ? <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">{eyebrow}</p> : null}
          <h2 className="text-3xl font-bold tracking-normal text-foreground sm:text-4xl">{title}</h2>
          {description ? <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">{description}</p> : null}
        </div>
        {children}
      </div>
    </section>
  );
}
