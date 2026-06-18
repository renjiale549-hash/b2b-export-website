import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-primary">404</p>
      <h1 className="mt-3 text-3xl font-bold">Page not found</h1>
      <p className="mt-4 text-muted-foreground">This little monster wandered off. The page does not exist or has moved.</p>
      <Link href="/" className="mt-6 inline-flex rounded-full bg-primary px-5 py-3 text-sm font-extrabold text-primary-foreground shadow-[0_5px_0_#d94f88]">
        Back to Home
      </Link>
    </section>
  );
}
