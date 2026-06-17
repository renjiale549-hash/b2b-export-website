import { NextResponse } from "next/server";
import { requireAdminRequest, adminError } from "@/lib/admin/api";
import { productToSanityDoc, revalidateStorefront } from "@/lib/admin/sanity-utils";
import { getCategories, getProducts } from "@/lib/content";
import { getSanityWriteClient } from "@/sanity/write-client";

export async function GET(request: Request) {
  const authError = requireAdminRequest(request);
  if (authError) {
    return authError;
  }

  const [products, categories] = await Promise.all([getProducts(), getCategories()]);
  return NextResponse.json({ products, categories });
}

export async function POST(request: Request) {
  const authError = requireAdminRequest(request);
  if (authError) {
    return authError;
  }

  try {
    const body = await request.json();
    const { doc, slug } = productToSanityDoc(body);
    const created = await getSanityWriteClient().create(doc);
    revalidateStorefront([`/products/${slug}`]);
    return NextResponse.json({ product: created });
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
    const body = await request.json();
    const id = body.id || body._id;

    if (!id) {
      return NextResponse.json({ message: "缺少产品 ID" }, { status: 400 });
    }

    const { doc, slug } = productToSanityDoc(body);
    const updated = await getSanityWriteClient().patch(id).set(doc).commit();
    revalidateStorefront([`/products/${slug}`]);
    return NextResponse.json({ product: updated });
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
      return NextResponse.json({ message: "缺少产品 ID" }, { status: 400 });
    }

    await getSanityWriteClient().delete(id);
    revalidateStorefront();
    return NextResponse.json({ ok: true });
  } catch (error) {
    return adminError(error);
  }
}
