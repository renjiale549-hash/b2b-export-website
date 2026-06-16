import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

export function ButtonLink({ href, children, variant = "primary", className }: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex min-h-11 items-center justify-center rounded-md px-5 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        variant === "primary" && "bg-primary text-primary-foreground hover:bg-teal-800",
        variant === "secondary" && "border border-border bg-white text-foreground hover:border-primary hover:text-primary",
        variant === "ghost" && "text-primary hover:bg-teal-50",
        className,
      )}
    >
      {children}
    </Link>
  );
}
