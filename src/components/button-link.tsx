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
        "inline-flex min-h-11 items-center justify-center rounded-full px-6 py-3 text-sm font-extrabold transition focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        variant === "primary" && "bg-primary text-primary-foreground shadow-[0_10px_0_rgba(47,35,66,0.14)] hover:-translate-y-0.5 hover:bg-[#ff5fa1]",
        variant === "secondary" && "sticker-border bg-white text-foreground shadow-sm hover:-translate-y-0.5 hover:border-primary hover:text-primary",
        variant === "ghost" && "text-primary hover:bg-pink-50",
        className,
      )}
    >
      {children}
    </Link>
  );
}
