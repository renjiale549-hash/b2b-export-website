"use client";

import type { FormEvent } from "react";
import { useState } from "react";

type FormState = "idle" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const email = String(form.get("email") ?? "");
    const message = String(form.get("message") ?? "");

    if (!email.includes("@") || message.trim().length < 10) {
      setState("error");
      setFeedback("Please enter a valid email and a message with at least 10 characters.");
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
        body: JSON.stringify(Object.fromEntries(form)),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message ?? "Unable to submit inquiry.");
      }

      formElement.reset();
      setState("success");
      setFeedback("Thank you. Your inquiry has been sent to our sales team.");
    } catch (error) {
      setState("error");
      setFeedback(error instanceof Error ? error.message : "Unable to submit inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-border bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-semibold text-foreground">
          Name
          <input name="name" required className="mt-2 w-full rounded-md border border-border px-3 py-3 text-sm outline-none focus:border-primary" />
        </label>
        <label className="text-sm font-semibold text-foreground">
          Work Email
          <input name="email" type="email" required className="mt-2 w-full rounded-md border border-border px-3 py-3 text-sm outline-none focus:border-primary" />
        </label>
        <label className="text-sm font-semibold text-foreground">
          Company
          <input name="company" className="mt-2 w-full rounded-md border border-border px-3 py-3 text-sm outline-none focus:border-primary" />
        </label>
        <label className="text-sm font-semibold text-foreground">
          Country / Region
          <input name="country" className="mt-2 w-full rounded-md border border-border px-3 py-3 text-sm outline-none focus:border-primary" />
        </label>
      </div>
      <label className="mt-4 block text-sm font-semibold text-foreground">
        Product Interest
        <input name="product" className="mt-2 w-full rounded-md border border-border px-3 py-3 text-sm outline-none focus:border-primary" />
      </label>
      <label className="mt-4 block text-sm font-semibold text-foreground">
        Message
        <textarea
          name="message"
          required
          rows={6}
          placeholder="Please include product specs, quantity, destination port, and any OEM packaging requirements."
          className="mt-2 w-full rounded-md border border-border px-3 py-3 text-sm outline-none focus:border-primary"
        />
      </label>
      <label className="hidden">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      {state === "error" ? (
        <p className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{feedback}</p>
      ) : null}
      {state === "success" ? (
        <p className="mt-4 rounded-md bg-teal-50 px-3 py-2 text-sm text-teal-800">{feedback}</p>
      ) : null}
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-teal-800 sm:w-auto"
      >
        {isSubmitting ? "Sending..." : "Submit Inquiry"}
      </button>
    </form>
  );
}
