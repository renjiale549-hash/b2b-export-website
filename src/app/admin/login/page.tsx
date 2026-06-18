import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/login-form";

export const metadata: Metadata = {
  title: "后台登录",
  description: "外贸独立站管理后台登录",
};

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f7fb] px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <p className="text-sm font-semibold text-pink-600">OddHug Toys</p>
          <h1 className="mt-2 text-3xl font-bold tracking-normal text-slate-950">中文管理后台</h1>
          <p className="mt-2 text-sm text-slate-500">管理产品、图片、首页区块和网站资料。</p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
