"use client";

import { useMemo, useState } from "react";
import type { AdminContentItem, AdminContentType } from "@/lib/admin/content-source";

const labels: Record<AdminContentType, string> = {
  category: "产品分类",
  application: "应用场景",
  faq: "FAQ",
  advantage: "核心优势",
  blogPost: "博客文章",
};

const fields: Record<AdminContentType, { key: string; label: string; type?: "textarea" | "date" }[]> = {
  category: [
    { key: "name", label: "分类名称" },
    { key: "slug", label: "URL 标识" },
    { key: "description", label: "分类描述", type: "textarea" },
    { key: "sortOrder", label: "排序" },
  ],
  application: [
    { key: "title", label: "场景标题" },
    { key: "description", label: "场景描述", type: "textarea" },
    { key: "industries", label: "行业标签，每行一个", type: "textarea" },
    { key: "sortOrder", label: "排序" },
  ],
  faq: [
    { key: "question", label: "问题" },
    { key: "answer", label: "答案", type: "textarea" },
    { key: "sortOrder", label: "排序" },
  ],
  advantage: [
    { key: "title", label: "优势文案", type: "textarea" },
    { key: "sortOrder", label: "排序" },
  ],
  blogPost: [
    { key: "title", label: "文章标题" },
    { key: "slug", label: "URL 标识" },
    { key: "date", label: "发布日期", type: "date" },
    { key: "excerpt", label: "摘要", type: "textarea" },
    { key: "readTime", label: "阅读时间" },
    { key: "seoTitle", label: "SEO 标题" },
    { key: "seoDescription", label: "SEO 描述", type: "textarea" },
  ],
};

const emptyByType: Record<AdminContentType, AdminContentItem> = {
  category: { name: "", slug: "", description: "", sortOrder: 100 },
  application: { title: "", description: "", industries: [], sortOrder: 100 },
  faq: { question: "", answer: "", sortOrder: 100 },
  advantage: { title: "", sortOrder: 100 },
  blogPost: { title: "", slug: "", date: new Date().toISOString().slice(0, 10), excerpt: "", readTime: "4 min read" },
};

export function ContentManager({ initial }: { initial: Record<AdminContentType, AdminContentItem[]> }) {
  const [type, setType] = useState<AdminContentType>("category");
  const [items, setItems] = useState(initial);
  const [form, setForm] = useState<AdminContentItem>(initial.category[0] ?? emptyByType.category);
  const [message, setMessage] = useState("");
  const typeItems = items[type] ?? [];

  const selectedId = form.id || "";
  const title = useMemo(() => {
    return String(form.name || form.title || form.question || "新内容");
  }, [form]);

  async function refresh(nextType = type) {
    const response = await fetch(`/api/admin/content?type=${nextType}`);
    const data = await response.json();
    setItems((current) => ({ ...current, [nextType]: data.items ?? [] }));
  }

  function switchType(nextType: AdminContentType) {
    setType(nextType);
    setForm(items[nextType]?.[0] ?? emptyByType[nextType]);
    setMessage("");
  }

  function update(key: string, value: string) {
    setForm((current) => ({ ...current, [key]: key === "industries" ? value.split(/\r?\n/).filter(Boolean) : value }));
  }

  function fieldValue(key: string) {
    const value = form[key];
    return Array.isArray(value) ? value.join("\n") : String(value ?? "");
  }

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await fetch(`/api/admin/content?type=${type}`, {
      method: form.id ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      setMessage(data.message || "保存失败");
      return;
    }

    setMessage("保存成功，前台页面已刷新。");
    await refresh();
  }

  async function remove() {
    if (!form.id || !confirm(`确定删除：${title}？`)) {
      return;
    }

    const response = await fetch(`/api/admin/content?type=${type}&id=${encodeURIComponent(form.id)}`, { method: "DELETE" });
    setMessage(response.ok ? "删除成功。" : "删除失败。");
    await refresh();
    setForm(emptyByType[type]);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
      <aside className="space-y-4">
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-lg font-bold">内容类型</h2>
          <div className="mt-4 space-y-2">
            {(Object.keys(labels) as AdminContentType[]).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => switchType(item)}
                className={`w-full rounded-md px-3 py-2 text-left text-sm font-semibold ${type === item ? "bg-blue-50 text-blue-700" : "bg-slate-50 text-slate-700"}`}
              >
                {labels[item]}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">列表</h2>
            <button type="button" onClick={() => setForm(emptyByType[type])} className="rounded-md bg-blue-600 px-3 py-2 text-sm font-bold text-white">
              新增
            </button>
          </div>
          <div className="mt-4 space-y-2">
            {typeItems.map((item, index) => (
              <button
                key={item.id || index}
                type="button"
                onClick={() => setForm(item)}
                className={`w-full rounded-md px-3 py-2 text-left text-sm ${selectedId && selectedId === item.id ? "bg-blue-50 font-bold text-blue-700" : "bg-slate-50 text-slate-700"}`}
              >
                {String(item.name || item.title || item.question || `内容 ${index + 1}`)}
              </button>
            ))}
          </div>
        </div>
      </aside>

      <form onSubmit={save} className="space-y-5 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-blue-600">{labels[type]}</p>
            <h2 className="text-2xl font-bold">{title}</h2>
          </div>
          <div className="flex gap-2">
            {form.id ? (
              <button type="button" onClick={remove} className="rounded-md border border-red-200 px-4 py-2 text-sm font-bold text-red-700">
                删除
              </button>
            ) : null}
            <button type="submit" className="rounded-md bg-blue-600 px-4 py-2 text-sm font-bold text-white">
              保存
            </button>
          </div>
        </div>
        {message ? <p className="rounded-md bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700">{message}</p> : null}
        <div className="grid gap-4 md:grid-cols-2">
          {fields[type].map((field) => (
            <label key={field.key} className={`text-sm font-semibold text-slate-700 ${field.type === "textarea" ? "md:col-span-2" : ""}`}>
              {field.label}
              {field.type === "textarea" ? (
                <textarea value={fieldValue(field.key)} onChange={(event) => update(field.key, event.target.value)} rows={5} className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2" />
              ) : (
                <input
                  type={field.type === "date" ? "date" : "text"}
                  value={fieldValue(field.key)}
                  onChange={(event) => update(field.key, event.target.value)}
                  className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2"
                />
              )}
            </label>
          ))}
        </div>
      </form>
    </div>
  );
}
