import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

const pathsToRevalidate = ["/", "/products", "/applications", "/about", "/blog", "/contact"];

export async function POST(request: Request) {
  const secret = request.headers.get("x-revalidate-secret");

  if (!process.env.SANITY_REVALIDATE_SECRET || secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid revalidation secret." }, { status: 401 });
  }

  for (const path of pathsToRevalidate) {
    revalidatePath(path);
  }

  revalidatePath("/products/[slug]", "page");

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
