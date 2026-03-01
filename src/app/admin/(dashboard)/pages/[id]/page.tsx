"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { FiSave, FiArrowLeft, FiTrash2 } from "react-icons/fi";
import Link from "next/link";
import RichTextEditor from "@/components/admin/RichTextEditor";

export default function EditPagePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    content: "",
    status: "DRAFT" as string,
    showInNav: false,
  });

  useEffect(() => {
    fetch(`/api/pages/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) return;
        setForm({
          title: data.title,
          slug: data.slug,
          content: data.content,
          status: data.status,
          showInNav: data.showInNav,
        });
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`/api/pages/${id}`, {
        method: "PUT",
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

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this page?")) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/pages/${id}`, { method: "DELETE" });
      if (res.ok) {
        router.push("/admin/pages");
        router.refresh();
      }
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-secondary-400">Loading page...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/pages" className="p-2 hover:bg-gray-100 rounded-lg">
            <FiArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-heading font-bold text-navy-800">Edit Page</h1>
            <p className="text-secondary-500 mt-1">{form.title}</p>
          </div>
        </div>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="text-red-500 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors disabled:opacity-50"
          title="Delete page"
        >
          <FiTrash2 className="w-5 h-5" />
        </button>
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
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="input-field"
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
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="input-field"
              >
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>
            <label className="flex items-center gap-2 mt-6">
              <input
                type="checkbox"
                checked={form.showInNav}
                onChange={(e) => setForm({ ...form, showInNav: e.target.checked })}
                className="w-4 h-4 text-navy-500 rounded"
              />
              <span className="text-sm text-secondary-700">Show in navigation</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Link href="/admin/pages" className="btn-outline">Cancel</Link>
          <button type="submit" disabled={saving} className="btn-primary disabled:opacity-50">
            <FiSave className="w-4 h-4" />
            {saving ? "Saving..." : "Update Page"}
          </button>
        </div>
      </form>
    </div>
  );
}
