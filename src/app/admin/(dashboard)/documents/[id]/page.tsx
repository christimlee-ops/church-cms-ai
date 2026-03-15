"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { FiSave, FiArrowLeft, FiTrash2, FiFile, FiDownload } from "react-icons/fi";
import Link from "next/link";

export default function EditDocumentPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [fileInfo, setFileInfo] = useState({ filename: "", url: "", mimeType: "", size: 0 });
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "OTHER",
    visibility: "PUBLIC",
  });

  useEffect(() => {
    fetch(`/api/documents/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) return;
        setForm({
          title: data.title || "",
          description: data.description || "",
          category: data.category || "OTHER",
          visibility: data.visibility || "PUBLIC",
        });
        setFileInfo({
          filename: data.filename || "",
          url: data.url || "",
          mimeType: data.mimeType || "",
          size: data.size || 0,
        });
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`/api/documents/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        router.push("/admin/documents");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Failed to update document");
      }
    } catch {
      setError("Failed to update document");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this document? This cannot be undone.")) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/documents/${id}`, { method: "DELETE" });
      if (res.ok) {
        router.push("/admin/documents");
        router.refresh();
      } else {
        alert("Failed to delete document");
      }
    } finally {
      setDeleting(false);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-secondary-400">Loading document...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/documents" className="p-2 hover:bg-gray-100 rounded-lg">
            <FiArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-heading font-bold text-secondary-800">Edit Document</h1>
            <p className="text-secondary-500 mt-1">{form.title}</p>
          </div>
        </div>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="text-red-500 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors disabled:opacity-50"
          title="Delete document"
        >
          <FiTrash2 className="w-5 h-5" />
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* File Info (read-only) */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <label className="block text-sm font-medium text-secondary-700 mb-3">Attached File</label>
          <div className="flex items-center gap-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <FiFile className="w-8 h-8 text-secondary-400 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-secondary-800 truncate">{fileInfo.filename}</p>
              <p className="text-xs text-secondary-400">{formatFileSize(fileInfo.size)} - {fileInfo.mimeType}</p>
            </div>
            <a
              href={fileInfo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline text-sm"
            >
              <FiDownload className="w-4 h-4" /> Download
            </a>
          </div>
          <p className="text-xs text-secondary-400 mt-2">To change the file, delete this document and upload a new one.</p>
        </div>

        {/* Metadata Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="mb-5">
            <label className="block text-sm font-medium text-secondary-700 mb-1.5">Title</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="input-field"
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-secondary-700 mb-1.5">Description</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="input-field resize-none"
              placeholder="Brief description of this document"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1.5">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="input-field"
              >
                <option value="BIBLE_STUDY">Bible Study</option>
                <option value="BULLETIN">Bulletin</option>
                <option value="SERMON_NOTES">Sermon Notes</option>
                <option value="NEWSLETTER">Newsletter</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1.5">Visibility</label>
              <select
                value={form.visibility}
                onChange={(e) => setForm({ ...form, visibility: e.target.value })}
                className="input-field"
              >
                <option value="PUBLIC">Public - Anyone can access</option>
                <option value="MEMBERS_ONLY">Members Only</option>
                <option value="ADMIN_ONLY">Admin Only</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Link href="/admin/documents" className="btn-outline">Cancel</Link>
          <button type="submit" disabled={saving} className="btn-primary disabled:opacity-50">
            <FiSave className="w-4 h-4" /> {saving ? "Saving..." : "Update Document"}
          </button>
        </div>
      </form>
    </div>
  );
}
