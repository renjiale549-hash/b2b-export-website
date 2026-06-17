"use client";

import Image from "next/image";
import { useState } from "react";
import type { HomeSectionConfig, ThemeSettings } from "@/lib/types";

const sectionNames: Record<HomeSectionConfig["type"], string> = {
  hero: "Hero 首屏",
  categories: "产品分类",
  featuredProducts: "热门产品",
  advantages: "核心优势",
  applications: "应用场景",
  company: "公司介绍",
  faq: "FAQ",
  cta: "询盘 CTA",
};

export function ThemeDesigner({ theme }: { theme: ThemeSettings }) {
  const [primaryColor, setPrimaryColor] = useState(theme.primaryColor);
  const [accentColor, setAccentColor] = useState(theme.accentColor);
  const [sections, setSections] = useState<HomeSectionConfig[]>([...theme.sections].sort((a, b) => a.sortOrder - b.sortOrder));
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  function updateSection(index: number, patch: Partial<HomeSectionConfig>) {
    setSections((current) => current.map((section, itemIndex) => (itemIndex === index ? { ...section, ...patch } : section)));
  }

  async function uploadSectionImage(index: number, file: File | null) {
    if (!file) {
      return;
    }

    setMessage("正在上传区块图片...");
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch("/api/admin/upload-image", { method: "POST", body: formData });
    const data = await response.json();

    if (!response.ok) {
      setMessage(data.message || "图片上传失败");
      return;
    }

    updateSection(index, { image: data.url, imageAssetId: data.assetId });
    setMessage("图片已上传，保存后前台生效。");
  }

  async function saveTheme() {
    setIsSaving(true);
    setMessage("");

    const response = await fetch("/api/admin/theme", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ primaryColor, accentColor, sections }),
    });
    const data = await response.json().catch(() => ({}));
    setIsSaving(false);

    if (!response.ok) {
      setMessage(data.message || "保存失败");
      return;
    }

    setMessage("店铺设计已保存，前台页面已刷新。");
  }

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-blue-600">店铺设计</p>
            <h2 className="text-2xl font-bold tracking-normal">首页区块和品牌颜色</h2>
            <p className="mt-2 text-sm text-slate-500">使用预设区块组合，避免页面被随意拖乱，同时能编辑主要内容和图片。</p>
          </div>
          <button type="button" onClick={saveTheme} disabled={isSaving} className="rounded-md bg-blue-600 px-4 py-2 text-sm font-bold text-white disabled:opacity-60">
            {isSaving ? "保存中" : "保存设计"}
          </button>
        </div>
        {message ? <p className="mt-4 rounded-md bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700">{message}</p> : null}
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <ColorField label="主品牌色" value={primaryColor} onChange={setPrimaryColor} />
        <ColorField label="辅助强调色" value={accentColor} onChange={setAccentColor} />
      </section>

      <section className="space-y-4">
        {sections.map((section, index) => (
          <article key={section.id} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500">{sectionNames[section.type]}</p>
                <h3 className="mt-1 text-xl font-bold">{section.title || "未设置标题"}</h3>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={section.enabled}
                    onChange={(event) => updateSection(index, { enabled: event.target.checked })}
                  />
                  显示
                </label>
                <label className="text-sm font-semibold text-slate-700">
                  排序
                  <input
                    type="number"
                    value={section.sortOrder}
                    onChange={(event) => updateSection(index, { sortOrder: Number(event.target.value) })}
                    className="ml-2 w-20 rounded-md border border-slate-300 px-2 py-1"
                  />
                </label>
              </div>
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-[220px_1fr]">
              <div>
                <div className="aspect-[4/3] overflow-hidden rounded-md border border-slate-200 bg-slate-100">
                  {section.image ? <Image src={section.image} alt={section.title || "区块图片"} width={440} height={330} className="h-full w-full object-cover" /> : null}
                </div>
                <input type="file" accept="image/*" onChange={(event) => uploadSectionImage(index, event.target.files?.[0] ?? null)} className="mt-3 text-sm" />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Field label="小标题" value={section.eyebrow || ""} onChange={(value) => updateSection(index, { eyebrow: value })} />
                <Field label="标题" value={section.title || ""} onChange={(value) => updateSection(index, { title: value })} />
                <label className="text-sm font-semibold text-slate-700 md:col-span-2">
                  描述
                  <textarea
                    value={section.description || ""}
                    onChange={(event) => updateSection(index, { description: event.target.value })}
                    rows={3}
                    className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2"
                  />
                </label>
                <Field label="按钮文案" value={section.buttonLabel || ""} onChange={(value) => updateSection(index, { buttonLabel: value })} />
                <Field label="按钮链接" value={section.buttonHref || ""} onChange={(value) => updateSection(index, { buttonHref: value })} />
                <label className="text-sm font-semibold text-slate-700">
                  产品展示数量
                  <input
                    type="number"
                    value={section.productLimit || 4}
                    onChange={(event) => updateSection(index, { productLimit: Number(event.target.value) })}
                    className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2"
                  />
                </label>
                <label className="text-sm font-semibold text-slate-700">
                  区块样式
                  <select
                    value={section.variant || "light"}
                    onChange={(event) => updateSection(index, { variant: event.target.value as HomeSectionConfig["variant"] })}
                    className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2"
                  >
                    <option value="light">浅色</option>
                    <option value="dark">深色</option>
                  </select>
                </label>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="rounded-lg border border-slate-200 bg-white p-5 text-sm font-semibold text-slate-700 shadow-sm">
      {label}
      <div className="mt-3 flex items-center gap-3">
        <input type="color" value={value} onChange={(event) => onChange(event.target.value)} className="h-10 w-14 rounded border border-slate-200" />
        <input value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-md border border-slate-300 px-3 py-2" />
      </div>
    </label>
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
