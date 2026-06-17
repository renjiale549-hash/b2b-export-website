import { NextResponse } from "next/server";
import { requireAdminRequest, adminError } from "@/lib/admin/api";
import { getSanityWriteClient } from "@/sanity/write-client";

export async function POST(request: Request) {
  const authError = requireAdminRequest(request);
  if (authError) {
    return authError;
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ message: "请选择要上传的图片" }, { status: 400 });
    }

    const client = getSanityWriteClient();
    const buffer = Buffer.from(await file.arrayBuffer());
    const asset = await client.assets.upload("image", buffer, {
      filename: file.name,
      contentType: file.type,
    });

    return NextResponse.json({
      assetId: asset._id,
      url: asset.url,
    });
  } catch (error) {
    return adminError(error);
  }
}
