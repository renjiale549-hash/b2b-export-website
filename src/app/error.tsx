"use client";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="text-3xl font-bold">Something went wrong</h1>
      <p className="mt-4 text-muted-foreground">The page could not load correctly. Please try again.</p>
      <button onClick={reset} className="mt-6 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">
        Try again
      </button>
    </section>
  );
}
