import { NextResponse } from "next/server";
import { requireAdminRequest, adminError } from "@/lib/admin/api";
import { revalidateStorefront, siteSettingsToSanityDoc } from "@/lib/admin/sanity-utils";
import { getSiteSettings } from "@/lib/content";
import { getSanityWriteClient } from "@/sanity/write-client";

const siteSettingsId = "siteSettings.default";

export async function GET(request: Request) {
  const authError = requireAdminRequest(request);
  if (authError) {
    return authError;
  }

  return NextResponse.json({ settings: await getSiteSettings() });
}

export async function PATCH(request: Request) {
  const authError = requireAdminRequest(request);
  if (authError) {
    return authError;
  }

  try {
    const body = await request.json();
    const settings = await getSanityWriteClient().createOrReplace({
      _id: siteSettingsId,
      ...siteSettingsToSanityDoc(body),
    });

    revalidateStorefront();
    return NextResponse.json({ settings });
  } catch (error) {
    return adminError(error);
  }
}
