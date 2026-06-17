import { NextResponse } from "next/server";
import { setAdminSession, validateAdminPassword } from "@/lib/admin/auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));

  if (!validateAdminPassword(body.password)) {
    return NextResponse.json({ message: "密码不正确，请重新输入" }, { status: 401 });
  }

  await setAdminSession();
  return NextResponse.json({ ok: true });
}
