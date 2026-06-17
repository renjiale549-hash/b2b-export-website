import Link from "next/link";
import { getCategories, getProducts, getSiteSettings, getThemeSettings } from "@/lib/content";

export default async function AdminDashboardPage() {
  const [site, products, categories, theme] = await Promise.all([
    getSiteSettings(),
    getProducts(),
    getCategories(),
    getThemeSettings(),
  ]);

  const cards = [
    { label: "产品数量", value: products.length, href: "/admin/products" },
    { label: "产品分类", value: categories.length, href: "/admin/content" },
    { label: "首页区块", value: theme.sections.length, href: "/admin/design" },
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-blue-600">首页仪表盘</p>
            <h2 className="mt-2 text-2xl font-bold tracking-normal">{site.name}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{site.tagline}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/admin/products" className="rounded-md bg-blue-600 px-4 py-2 text-sm font-bold text-white">
              新增产品
            </Link>
            <Link href="/admin/design" className="rounded-md border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700">
              设计首页
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <Link key={card.label} href={card.href} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-300">
            <p className="text-sm font-semibold text-slate-500">{card.label}</p>
            <p className="mt-3 text-3xl font-bold">{card.value}</p>
          </Link>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-bold">快速入口</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              ["商品管理", "/admin/products"],
              ["店铺设计", "/admin/design"],
              ["内容管理", "/admin/content"],
              ["网站设置", "/admin/settings"],
            ].map(([label, href]) => (
              <Link key={href} href={href} className="rounded-md bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700">
                {label}
              </Link>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-bold">上线状态</h3>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500">网站地址</dt>
              <dd className="font-semibold text-slate-900">{site.url}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500">询盘邮箱</dt>
              <dd className="font-semibold text-slate-900">{site.email}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500">Sanity Studio</dt>
              <dd>
                <Link href="/studio" className="font-semibold text-blue-600">
                  打开高级后台
                </Link>
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </div>
  );
}
