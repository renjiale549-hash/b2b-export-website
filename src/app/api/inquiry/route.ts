import { NextResponse } from "next/server";

type InquiryPayload = {
  name?: string;
  email?: string;
  company?: string;
  country?: string;
  product?: string;
  message?: string;
  website?: string;
};

const requiredEnvVars = ["RESEND_API_KEY", "INQUIRY_TO_EMAIL", "INQUIRY_FROM_EMAIL"] as const;

function clean(value: unknown) {
  return String(value ?? "").trim().slice(0, 2000);
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderInquiryEmail(payload: Required<Omit<InquiryPayload, "website">>) {
  const rows = [
    ["Name", payload.name],
    ["Email", payload.email],
    ["Company", payload.company || "Not provided"],
    ["Country / Region", payload.country || "Not provided"],
    ["Product Interest", payload.product || "Not provided"],
  ];

  return `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827">
      <h2>New B2B Inquiry</h2>
      <table style="border-collapse:collapse;width:100%;max-width:720px">
        ${rows
          .map(
            ([label, value]) => `
              <tr>
                <td style="border:1px solid #d9e2ec;padding:10px;font-weight:700;background:#f8fafc;width:180px">${escapeHtml(label)}</td>
                <td style="border:1px solid #d9e2ec;padding:10px">${escapeHtml(value)}</td>
              </tr>
            `,
          )
          .join("")}
      </table>
      <h3>Message</h3>
      <p style="white-space:pre-wrap;border:1px solid #d9e2ec;padding:14px;background:#f8fafc">${escapeHtml(payload.message)}</p>
    </div>
  `;
}

export async function POST(request: Request) {
  let body: InquiryPayload;

  try {
    body = (await request.json()) as InquiryPayload;
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  if (clean(body.website)) {
    return NextResponse.json({ message: "Inquiry received." });
  }

  const payload = {
    name: clean(body.name),
    email: clean(body.email),
    company: clean(body.company),
    country: clean(body.country),
    product: clean(body.product),
    message: clean(body.message),
  };

  if (!payload.name || !isEmail(payload.email) || payload.message.length < 10) {
    return NextResponse.json({ message: "Please provide a valid name, email, and message." }, { status: 400 });
  }

  const missingEnv = requiredEnvVars.filter((key) => !process.env[key]);

  if (missingEnv.length > 0) {
    return NextResponse.json(
      { message: `Email service is not configured. Missing: ${missingEnv.join(", ")}` },
      { status: 503 },
    );
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.INQUIRY_FROM_EMAIL,
      to: [process.env.INQUIRY_TO_EMAIL],
      reply_to: payload.email,
      subject: `New inquiry from ${payload.name}`,
      html: renderInquiryEmail(payload),
    }),
  });

  if (!response.ok) {
    return NextResponse.json({ message: "Failed to send inquiry. Please email us directly." }, { status: 502 });
  }

  return NextResponse.json({ message: "Inquiry received." });
}
