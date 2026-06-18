import { NextResponse } from "next/server";

type InquiryPayload = {
  name?: string;
  email?: string;
  company?: string;
  country?: string;
  product?: string;
  quantity?: string;
  message?: string;
  website?: string;
  startedAt?: number;
};

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

function renderInquiryEmail(payload: {
  name: string;
  email: string;
  company: string;
  country: string;
  product: string;
  quantity: string;
  message: string;
}) {
  const rows = [
    ["Name", payload.name],
    ["Email", payload.email],
    ["Company / Store Name", payload.company || "Not provided"],
    ["Country", payload.country || "Not provided"],
    ["Interested Product Type", payload.product || "Not provided"],
    ["Estimated Quantity", payload.quantity || "Not provided"],
  ];

  return `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#2f2342;background:#fff8e8;padding:24px">
      <div style="max-width:720px;margin:0 auto;background:#ffffff;border-radius:24px;padding:28px">
      <p style="color:#ff5f9e;font-weight:700;margin:0 0 8px">OddHug Toys</p>
      <h2 style="margin:0 0 24px">New Website Inquiry</h2>
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
      <p style="white-space:pre-wrap;border:1px solid #d9e2ec;padding:14px;background:#fffdf8">${escapeHtml(payload.message)}</p>
      </div>
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

  const startedAt = Number(body.startedAt);
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < 2000) {
    return NextResponse.json({ message: "Please wait a moment before sending your inquiry." }, { status: 429 });
  }

  const payload = {
    name: clean(body.name),
    email: clean(body.email),
    company: clean(body.company),
    country: clean(body.country),
    product: clean(body.product),
    quantity: clean(body.quantity),
    message: clean(body.message),
  };

  if (!payload.name || !isEmail(payload.email) || !payload.message) {
    return NextResponse.json({ message: "Please provide a valid name, email, and message." }, { status: 400 });
  }

  const receiverEmail = process.env.INQUIRY_RECEIVER_EMAIL || process.env.INQUIRY_TO_EMAIL;
  const missingEnv = [
    !process.env.RESEND_API_KEY ? "RESEND_API_KEY" : null,
    !receiverEmail ? "INQUIRY_RECEIVER_EMAIL" : null,
    !process.env.INQUIRY_FROM_EMAIL ? "INQUIRY_FROM_EMAIL" : null,
  ].filter(Boolean);

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
      to: [receiverEmail],
      reply_to: payload.email,
      subject: "New Inquiry from OddHug Toys Website",
      html: renderInquiryEmail(payload),
    }),
  });

  if (!response.ok) {
    return NextResponse.json({ message: "Failed to send inquiry. Please email us directly." }, { status: 502 });
  }

  return NextResponse.json({ message: "Inquiry received." });
}
