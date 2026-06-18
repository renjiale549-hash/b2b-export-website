"use client";

import type { FormEvent } from "react";
import { useState } from "react";

type FormState = "idle" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [startedAt] = useState(() => Date.now());

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "");
    const message = String(form.get("message") ?? "");

    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !message.trim()) {
      setState("error");
      setFeedback("Please enter your name, a valid email address, and a message.");
      return;
    }

    setIsSubmitting(true);
    setState("idle");
    setFeedback("");

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...Object.fromEntries(form), startedAt }),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message ?? "Unable to submit inquiry.");
      }

      formElement.reset();
      setState("success");
      setFeedback("Thanks! Your inquiry has been sent. We'll get back to you soon.");
    } catch (error) {
      setState("error");
      setFeedback(error instanceof Error ? error.message : "Unable to submit inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="toy-shadow rounded-[2rem] border-2 border-white bg-white p-5 sm:p-7" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-semibold text-foreground">
          Name *
          <input name="name" required autoComplete="name" className="mt-2 w-full rounded-2xl border border-border bg-[#fffdf8] px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10" />
        </label>
        <label className="text-sm font-semibold text-foreground">
          Email *
          <input name="email" type="email" required autoComplete="email" className="mt-2 w-full rounded-2xl border border-border bg-[#fffdf8] px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10" />
        </label>
        <label className="text-sm font-semibold text-foreground">
          Company / Store Name
          <input name="company" autoComplete="organization" className="mt-2 w-full rounded-2xl border border-border bg-[#fffdf8] px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10" />
        </label>
        <label className="text-sm font-semibold text-foreground">
          Country
          <input name="country" autoComplete="country-name" className="mt-2 w-full rounded-2xl border border-border bg-[#fffdf8] px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10" />
        </label>
        <label className="text-sm font-semibold text-foreground">
          Interested Product Type
          <select name="product" defaultValue="" className="mt-2 w-full rounded-2xl border border-border bg-[#fffdf8] px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10">
            <option value="" disabled>Select a toy type</option>
            <option>Plush Toys</option>
            <option>Mini Monster Toys</option>
            <option>Custom Toys</option>
            <option>Wholesale Order</option>
            <option>Other</option>
          </select>
        </label>
        <label className="text-sm font-semibold text-foreground">
          Estimated Quantity
          <input name="quantity" inputMode="numeric" placeholder="e.g. 500 pieces" className="mt-2 w-full rounded-2xl border border-border bg-[#fffdf8] px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10" />
        </label>
      </div>
      <label className="mt-4 block text-sm font-semibold text-foreground">
        Message *
        <textarea
          name="message"
          required
          rows={6}
          placeholder="Tell us about the toy style, quantity, size, colors, packaging, or custom character idea you have in mind."
          className="mt-2 w-full rounded-2xl border border-border bg-[#fffdf8] px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
        />
      </label>
      <label className="hidden">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      {state === "error" ? (
        <p role="alert" className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{feedback}</p>
      ) : null}
      {state === "success" ? (
        <p role="status" className="mt-4 rounded-2xl bg-[#e8fff1] px-4 py-3 text-sm font-semibold text-[#17623a]">{feedback}</p>
      ) : null}
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-extrabold text-primary-foreground shadow-[0_6px_0_#d94f88] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {isSubmitting ? "Sending..." : "Send Inquiry"}
      </button>
    </form>
  );
}
