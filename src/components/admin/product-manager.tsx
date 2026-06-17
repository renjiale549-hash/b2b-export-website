"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { Category, Product } from "@/lib/types";

type ProductForm = Product & {
  sortOrder?: number;
  specsText: string;
  featuresText: string;
  applicationsText: string;
};

const emptyProduct: ProductForm = {
  slug: "",
  name: "",
  category: "",
  summary: "",
  description: "",
  image: "",
  specs: [],
  specsText: "",
  features: [],
  featuresText: "",
  applications: [],
  applicationsText: "",
  gallery: [],
  sortOrder: 100,
};

function toForm(product: Product): ProductForm {
  return {
    ...product,
    specsText: product.specs.map((spec) => `${spec.label}|${spec.value}`).join("\n"),
    featuresText: product.features.join("\n"),
    applicationsText: product.applications.join("\n"),
    sortOrder: 100,
  };
}

export function ProductManager({ products, categories }: { products: Product[]; categories: Category[] }) {
  const [form, setForm] = useState<ProductForm>(products[0] ? toForm(products[0]) : emptyProduct);
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const selectedId = form.id || "";
  const selectedProduct = useMemo(() => products.find((product) => product.id === selectedId), [products, selectedId]);

  function update<K extends keyof ProductForm>(key: K, value: ProductForm[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function uploadFile(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch("/api/admin/upload-image", { method: "POST", body: formData });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "图片上传失败");
    }

    return data as { assetId: string; url: string };
  }

  async function uploadMainImage(file: File | null) {
    if (!file) {
      return;
    }

    setMessage("正在上传主图...");
    const image = await uploadFile(file);
    setForm((current) => ({ ...current, image: image.url, imageAssetId: image.assetId }));
    setMessage("主图已上传，记得保存产品。");
  }

  async function uploadGallery(files: FileList | null) {
    if (!files?.length) {
      return;
    }

    setMessage("正在上传图册...");
    const uploaded = await Promise.all(Array.from(files).map(uploadFile));
    setForm((current) => ({
      ...current,
      gallery: [
        ...(current.gallery ?? []),
        ...uploaded.map((item) => ({ url: item.url, assetId: item.assetId, alt: current.name })),
      ],
    }));
    setMessage("图册已上传，记得保存产品。");
  }

  async function saveProduct(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setMessage("");

    const payload = {
      ...form,
      specs: form.specsText,
      features: form.featuresText,
      applications: form.applicationsText,
    };

    const response = await fetch("/api/admin/products", {
      method: form.id ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await response.json().catch(() => ({}));
    setIsSaving(false);

    if (!response.ok) {
      setMessage(data.message || "保存失败");
      return;
    }

    setMessage("保存成功，前台页面已刷新。");
    window.setTimeout(() => window.location.reload(), 600);
  }

  async function deleteProduct() {
    if (!form.id || !confirm(`确定删除产品：${form.name}？`)) {
      return;
    }

    const response = await fetch(`/api/admin/products?id=${encodeURIComponent(form.id)}`, { method: "DELETE" });
    setMessage(response.ok ? "产品已删除。" : "删除失败。");
    window.setTimeout(() => window.location.reload(), 600);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
      <aside className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">商品列表</h2>
          <button type="button" onClick={() => setForm(emptyProduct)} className="rounded-md bg-blue-600 px-3 py-2 text-sm font-bold text-white">
            新增
          </button>
        </div>
        <div className="mt-4 space-y-2">
          {products.map((product) => (
            <button
              key={product.id || product.slug}
              type="button"
              onClick={() => setForm(toForm(product))}
              className={`w-full rounded-md px-3 py-3 text-left text-sm transition ${
                selectedProduct?.slug === product.slug ? "bg-blue-50 font-bold text-blue-700" : "bg-slate-50 text-slate-700 hover:bg-slate-100"
              }`}
            >
              <span className="block truncate">{product.name}</span>
              <span className="mt-1 block text-xs text-slate-500">{product.category}</span>
            </button>
          ))}
        </div>
      </aside>

      <form onSubmit={saveProduct} className="space-y-5 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-blue-600">商品管理</p>
            <h2 className="text-2xl font-bold">{form.id ? "编辑产品" : "新增产品"}</h2>
          </div>
          <div className="flex gap-2">
            {form.id ? (
              <button type="button" onClick={deleteProduct} className="rounded-md border border-red-200 px-4 py-2 text-sm font-bold text-red-700">
                删除
              </button>
            ) : null}
            <button type="submit" disabled={isSaving} className="rounded-md bg-blue-600 px-4 py-2 text-sm font-bold text-white disabled:opacity-60">
              {isSaving ? "保存中" : "保存产品"}
            </button>
          </div>
        </div>

        {message ? <p className="rounded-md bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700">{message}</p> : null}

        <div className="grid gap-4 md:grid-cols-2">
          <Field label="产品名称" value={form.name} onChange={(value) => update("name", value)} />
          <Field label="URL 标识" value={form.slug} onChange={(value) => update("slug", value)} placeholder="english-slug" />
          <label className="text-sm font-semibold text-slate-700">
            产品分类
            <select
              value={form.categoryId || ""}
              onChange={(event) => {
                const category = categories.find((item) => item.id === event.target.value);
                setForm((current) => ({ ...current, categoryId: event.target.value, category: category?.name || current.category }));
              }}
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2"
            >
              <option value="">手动填写分类</option>
              {categories.map((category) => (
                <option key={category.id || category.slug} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
          <Field label="备用分类名称" value={form.category} onChange={(value) => update("category", value)} />
        </div>

        <TextArea label="产品摘要" value={form.summary} onChange={(value) => update("summary", value)} rows={3} />
        <TextArea label="产品详情描述" value={form.description} onChange={(value) => update("description", value)} rows={5} />

        <div className="grid gap-5 lg:grid-cols-[240px_1fr]">
          <div>
            <p className="text-sm font-semibold text-slate-700">产品主图</p>
            <div className="mt-2 aspect-[4/3] overflow-hidden rounded-md border border-slate-200 bg-slate-100">
              {form.image ? <Image src={form.image} alt={form.name || "产品主图"} width={480} height={360} className="h-full w-full object-cover" /> : null}
            </div>
            <input type="file" accept="image/*" onChange={(event) => uploadMainImage(event.target.files?.[0] ?? null)} className="mt-3 text-sm" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-700">产品图册</p>
            <div className="mt-2 grid grid-cols-2 gap-3 md:grid-cols-4">
              {(form.gallery ?? []).map((item, index) => (
                <div key={`${item.url}-${index}`} className="relative aspect-square overflow-hidden rounded-md border border-slate-200 bg-slate-100">
                  <Image src={item.url} alt={item.alt || form.name || "图册"} fill className="object-cover" sizes="140px" />
                  <button
                    type="button"
                    onClick={() => setForm((current) => ({ ...current, gallery: current.gallery?.filter((_, itemIndex) => itemIndex !== index) ?? [] }))}
                    className="absolute right-2 top-2 rounded bg-white px-2 py-1 text-xs font-bold text-red-600 shadow"
                  >
                    删除
                  </button>
                </div>
              ))}
            </div>
            <input type="file" accept="image/*" multiple onChange={(event) => uploadGallery(event.target.files)} className="mt-3 text-sm" />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <TextArea label="规格参数" value={form.specsText} onChange={(value) => update("specsText", value)} rows={7} placeholder="Material|Stainless Steel" />
          <TextArea label="产品特点" value={form.featuresText} onChange={(value) => update("featuresText", value)} rows={7} placeholder="每行一个特点" />
          <TextArea label="应用场景" value={form.applicationsText} onChange={(value) => update("applicationsText", value)} rows={7} placeholder="每行一个场景" />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Field label="SEO 标题" value={form.seoTitle || ""} onChange={(value) => update("seoTitle", value)} />
          <Field label="SEO 描述" value={form.seoDescription || ""} onChange={(value) => update("seoDescription", value)} />
        </div>
      </form>
    </div>
  );
}

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string }) {
  return (
    <label className="text-sm font-semibold text-slate-700">
      {label}
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  rows,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows: number;
  placeholder?: string;
}) {
  return (
    <label className="text-sm font-semibold text-slate-700">
      {label}
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </label>
  );
}
