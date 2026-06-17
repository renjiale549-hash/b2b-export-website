import { NextResponse } from "next/server";
import { requireAdminRequest, adminError } from "@/lib/admin/api";
import { revalidateStorefront, themeSectionToSanity } from "@/lib/admin/sanity-utils";
import { getThemeSettings } from "@/lib/content";
import { getSanityWriteClient } from "@/sanity/write-client";

const themeId = "themeSettings.default";

export async function GET(request: Request) {
  const authError = requireAdminRequest(request);
  if (authError) {
    return authError;
  }

  return NextResponse.json({ theme: await getThemeSettings() });
}

export async function PATCH(request: Request) {
  const authError = requireAdminRequest(request);
  if (authError) {
    return authError;
  }

  try {
    const body = await request.json();
    const sections = Array.isArray(body.sections) ? body.sections.map(themeSectionToSanity) : [];
    const doc = {
      _id: themeId,
      _type: "themeSettings",
      primaryColor: body.primaryColor || "#0f766e",
      accentColor: body.accentColor || "#f59e0b",
      sections,
    };

    const theme = await getSanityWriteClient().createOrReplace(doc);
    revalidateStorefront();
    return NextResponse.json({ theme });
  } catch (error) {
    return adminError(error);
  }
}
