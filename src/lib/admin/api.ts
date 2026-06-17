import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin/auth";

export function requireAdminRequest(request: Request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ message: "请先登录后台" }, { status: 401 });
  }

  return null;
}

export function adminError(error: unknown, status = 400) {
  const message = error instanceof Error ? error.message : "操作失败，请稍后重试";
  return NextResponse.json({ message }, { status });
}
