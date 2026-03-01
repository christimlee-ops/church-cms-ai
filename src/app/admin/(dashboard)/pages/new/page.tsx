"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiSave, FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import RichTextEditor from "@/components/admin/RichTextEditor";

export default function NewPagePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    content: "",
    status: "DRAFT" as "DRAFT" | "PUBLISHED",
    showInNav: false,
  });

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        router.push("/admin/pages");
        router.refresh();
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/pages" className="p-2 hover:bg-gray-100 rounded-lg">
          <FiArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-heading font-bold text-secondary-800">New Page</h1>
          <p className="text-secondary-500 mt-1">Create a new website page</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1.5">Title</label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value, slug: generateSlug(e.target.value) })}
                className="input-field"
                placeholder="Page Title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1.5">Slug</label>
              <input
                type="text"
                required
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="input-field"
                placeholder="page-slug"
              />
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-secondary-700 mb-1.5">Content</label>
            <RichTextEditor
              value={form.content}
              onChange={(content: string) => setForm({ ...form, content })}
              className="bg-white rounded-lg"
              style={{ minHeight: "300px" }}
            />
          </div>

          <div className="flex items-center gap-6 mt-16">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1.5">Status</label>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as "DRAFT" | "PUBLISHED" })} className="input-field">
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
              </select>
            </div>
            <label className="flex items-center gap-2 mt-6">
              <input type="checkbox" checked={form.showInNav} onChange={(e) => setForm({ ...form, showInNav: e.target.checked })} className="w-4 h-4 text-primary-500 rounded" />
              <span className="text-sm text-secondary-700">Show in navigation</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Link href="/admin/pages" className="btn-outline">Cancel</Link>
          <button type="submit" disabled={saving} className="btn-primary disabled:opacity-50">
            <FiSave className="w-4 h-4" />
            {saving ? "Saving..." : "Save Page"}
          </button>
        </div>
      </form>
    </div>
  );
}
