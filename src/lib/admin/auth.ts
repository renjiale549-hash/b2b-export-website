import crypto from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const cookieName = "b2b_admin_session";
const maxAgeSeconds = 60 * 60 * 24 * 7;

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "development-admin-secret";
}

function sign(value: string) {
  return crypto.createHmac("sha256", getSecret()).update(value).digest("hex");
}

function verifyToken(token: string | undefined) {
  if (!token) {
    return false;
  }

  const [expiresAt, signature] = token.split(".");

  if (!expiresAt || !signature || Number(expiresAt) < Date.now()) {
    return false;
  }

  const expected = sign(expiresAt);
  if (signature.length !== expected.length) {
    return false;
  }

  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}

export function createAdminToken() {
  const expiresAt = String(Date.now() + maxAgeSeconds * 1000);
  return `${expiresAt}.${sign(expiresAt)}`;
}

export async function setAdminSession() {
  const cookieStore = await cookies();
  cookieStore.set(cookieName, createAdminToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: maxAgeSeconds,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(cookieName);
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  return verifyToken(cookieStore.get(cookieName)?.value);
}

export async function requireAdminPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }
}

export function isAdminRequest(request: Request) {
  const cookie = request.headers.get("cookie") ?? "";
  const token = cookie
    .split(";")
    .map((entry) => entry.trim())
    .find((entry) => entry.startsWith(`${cookieName}=`))
    ?.split("=")[1];

  return verifyToken(token);
}

export function validateAdminPassword(password: string) {
  return Boolean(process.env.ADMIN_PASSWORD && password === process.env.ADMIN_PASSWORD);
}
