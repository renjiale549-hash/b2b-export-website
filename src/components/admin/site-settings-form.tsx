"use client";

import { useState } from "react";
import type { SiteConfig } from "@/lib/types";

export function SiteSettingsForm({ settings }: { settings: SiteConfig }) {
  const [form, setForm] = useState({
    ...settings,
    navText: (settings.navItems ?? []).map((item) => `${item.label}|${item.href}`).join("\n"),
  });
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  function update(key: string, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setMessage("");

    const navItems = form.navText
      .split(/\r?\n/)
      .map((line) => {
        const [label, ...rest] = line.split("|");
        return { label: label?.trim(), href: rest.join("|").trim() };
      })
      .filter((item) => item.label && item.href);

    const response = await fetch("/api/admin/site-settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, navItems }),
    });
    const data = await response.json().catch(() => ({}));
    setIsSaving(false);

    if (!response.ok) {
      setMessage(data.message || "保存失败");
      return;
    }

    setMessage("网站设置已保存，前台页面已刷新。");
  }

  return (
    <form onSubmit={save} className="space-y-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-blue-600">网站设置</p>
          <h2 className="text-2xl font-bold tracking-normal">公司资料、SEO 和导航</h2>
        </div>
        <button type="submit" disabled={isSaving} className="rounded-md bg-blue-600 px-4 py-2 text-sm font-bold text-white disabled:opacity-60">
          {isSaving ? "保存中" : "保存设置"}
        </button>
      </div>

      {message ? <p className="rounded-md bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700">{message}</p> : null}

      <section className="grid gap-4 md:grid-cols-2">
        <Field label="公司名称" value={form.name} onChange={(value) => update("name", value)} />
        <Field label="网站地址" value={form.url} onChange={(value) => update("url", value)} />
        <Field label="联系邮箱" value={form.email} onChange={(value) => update("email", value)} />
        <Field label="联系电话" value={form.phone} onChange={(value) => update("phone", value)} />
        <Field label="公司地址" value={form.address} onChange={(value) => update("address", value)} />
        <Field label="品牌标语" value={form.tagline} onChange={(value) => update("tagline", value)} />
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Field label="首页 Hero 小标题" value={form.heroEyebrow || ""} onChange={(value) => update("heroEyebrow", value)} />
        <Field label="首页 Hero 标题" value={form.heroTitle || ""} onChange={(value) => update("heroTitle", value)} />
        <TextArea label="首页 Hero 描述" value={form.heroDescription || ""} onChange={(value) => update("heroDescription", value)} />
        <TextArea label="公司介绍区描述" value={form.companySectionDescription || ""} onChange={(value) => update("companySectionDescription", value)} />
        <Field label="询盘 CTA 小标题" value={form.ctaEyebrow || ""} onChange={(value) => update("ctaEyebrow", value)} />
        <Field label="询盘 CTA 标题" value={form.ctaTitle || ""} onChange={(value) => update("ctaTitle", value)} />
        <TextArea label="询盘 CTA 描述" value={form.ctaDescription || ""} onChange={(value) => update("ctaDescription", value)} />
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Field label="主品牌色" value={form.primaryColor || ""} onChange={(value) => update("primaryColor", value)} />
        <Field label="辅助强调色" value={form.accentColor || ""} onChange={(value) => update("accentColor", value)} />
        <TextArea label="导航菜单，每行：名称|链接" value={form.navText} onChange={(value) => update("navText", value)} />
        <TextArea label="SEO 描述" value={form.seoDescription || ""} onChange={(value) => update("seoDescription", value)} />
        <Field label="SEO 标题" value={form.seoTitle || ""} onChange={(value) => update("seoTitle", value)} />
      </section>
    </form>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="text-sm font-semibold text-slate-700">
      {label}
      <input value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2" />
    </label>
  );
}

function TextArea({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="text-sm font-semibold text-slate-700 md:col-span-2">
      {label}
      <textarea value={value} onChange={(event) => onChange(event.target.value)} rows={4} className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2" />
    </label>
  );
}
