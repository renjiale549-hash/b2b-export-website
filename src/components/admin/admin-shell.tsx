import Link from "next/link";
import { LogoutButton } from "./logout-button";

const menus = [
  { href: "/admin", label: "首页仪表盘", icon: "⌂" },
  { href: "/admin/products", label: "商品管理", icon: "□" },
  { href: "/admin/design", label: "店铺设计", icon: "◇" },
  { href: "/admin/content", label: "内容管理", icon: "≡" },
  { href: "/admin/settings", label: "网站设置", icon: "⚙" },
  { href: "/studio", label: "高级后台", icon: "↗" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-900">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 border-r border-slate-200 bg-white lg:block">
        <div className="flex h-16 items-center border-b border-slate-100 px-6">
          <span className="text-xl font-bold tracking-normal">OddHug Admin</span>
        </div>
        <nav className="space-y-1 px-3 py-4 text-sm font-medium">
          {menus.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-md px-3 py-2.5 text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
            >
              <span className="flex h-5 w-5 items-center justify-center text-slate-500">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <div className="lg:pl-60">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 lg:px-8">
          <div>
            <p className="text-xs font-semibold text-slate-500">OddHug Toys 管理后台</p>
            <h1 className="text-base font-bold">内容、商品和店铺设计</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              查看网站
            </Link>
            <LogoutButton />
          </div>
        </header>

        <div className="border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
          <div className="flex gap-2 overflow-x-auto text-sm font-semibold">
            {menus.map((item) => (
              <Link key={item.href} href={item.href} className="shrink-0 rounded-md bg-slate-100 px-3 py-2">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <main className="mx-auto max-w-7xl px-4 py-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
