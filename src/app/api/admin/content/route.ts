import { NextResponse } from "next/server";
import { requireAdminRequest, adminError } from "@/lib/admin/api";
import { cleanString, makeKey, revalidateStorefront, slugify } from "@/lib/admin/sanity-utils";
import { getAdminContentItems } from "@/lib/admin/content-source";
import { getSanityWriteClient } from "@/sanity/write-client";

const typeMap = {
  category: "category",
  application: "application",
  faq: "faq",
  advantage: "advantage",
  blogPost: "blogPost",
} as const;

type ContentKind = keyof typeof typeMap;

function getKind(request: Request): ContentKind {
  const kind = new URL(request.url).searchParams.get("type") as ContentKind | null;
  if (!kind || !(kind in typeMap)) {
    throw new Error("内容类型不正确");
  }

  return kind;
}

function toDoc(kind: ContentKind, body: Record<string, unknown>): { _type: string; [key: string]: unknown } {
  if (kind === "category") {
    const name = cleanString(body.name);
    return {
      _type: "category",
      name,
      slug: { _type: "slug", current: slugify(cleanString(body.slug) || name) },
      description: cleanString(body.description),
      sortOrder: Number(body.sortOrder ?? 100),
    };
  }

  if (kind === "application") {
    return {
      _type: "application",
      title: cleanString(body.title),
      description: cleanString(body.description),
      industries: Array.isArray(body.industries) ? body.industries.map(cleanString).filter(Boolean) : [],
      sortOrder: Number(body.sortOrder ?? 100),
    };
  }

  if (kind === "faq") {
    return {
      _type: "faq",
      question: cleanString(body.question),
      answer: cleanString(body.answer),
      sortOrder: Number(body.sortOrder ?? 100),
    };
  }

  if (kind === "advantage") {
    return {
      _type: "advantage",
      title: cleanString(body.title),
      sortOrder: Number(body.sortOrder ?? 100),
    };
  }

  return {
    _type: "blogPost",
    title: cleanString(body.title),
    slug: { _type: "slug", current: slugify(cleanString(body.slug) || cleanString(body.title)) },
    date: cleanString(body.date),
    excerpt: cleanString(body.excerpt),
    readTime: cleanString(body.readTime),
    body: body.body || [
      {
        _key: makeKey(),
        _type: "block",
        children: [{ _key: makeKey(), _type: "span", text: cleanString(body.excerpt) }],
      },
    ],
    seoTitle: cleanString(body.seoTitle),
    seoDescription: cleanString(body.seoDescription),
  };
}

export async function GET(request: Request) {
  const authError = requireAdminRequest(request);
  if (authError) {
    return authError;
  }

  try {
    const kind = getKind(request);
    const items = await getAdminContentItems(kind);

    return NextResponse.json({ items });
  } catch (error) {
    return adminError(error);
  }
}

export async function POST(request: Request) {
  const authError = requireAdminRequest(request);
  if (authError) {
    return authError;
  }

  try {
    const kind = getKind(request);
    const body = await request.json();
    const item = await getSanityWriteClient().create(toDoc(kind, body));
    revalidateStorefront();
    return NextResponse.json({ item });
  } catch (error) {
    return adminError(error);
  }
}

export async function PATCH(request: Request) {
  const authError = requireAdminRequest(request);
  if (authError) {
    return authError;
  }

  try {
    const kind = getKind(request);
    const body = await request.json();
    const id = body.id || body._id;

    if (!id) {
      return NextResponse.json({ message: "缺少内容 ID" }, { status: 400 });
    }

    const item = await getSanityWriteClient().patch(id).set(toDoc(kind, body)).commit();
    revalidateStorefront();
    return NextResponse.json({ item });
  } catch (error) {
    return adminError(error);
  }
}

export async function DELETE(request: Request) {
  const authError = requireAdminRequest(request);
  if (authError) {
    return authError;
  }

  try {
    const id = new URL(request.url).searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "缺少内容 ID" }, { status: 400 });
    }

    await getSanityWriteClient().delete(id);
    revalidateStorefront();
    return NextResponse.json({ ok: true });
  } catch (error) {
    return adminError(error);
  }
}
