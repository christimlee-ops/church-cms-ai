"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { FiSave, FiArrowLeft, FiUploadCloud, FiFile, FiX } from "react-icons/fi";
import Link from "next/link";

export default function NewDocumentPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [uploadedFile, setUploadedFile] = useState<{
    filename: string;
    url: string;
    mimeType: string;
    size: number;
  } | null>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "OTHER",
    visibility: "PUBLIC",
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/documents/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setUploadedFile(data);
        // Auto-fill title from filename if empty
        if (!form.title) {
          const nameWithoutExt = file.name.replace(/\.[^.]+$/, "");
          setForm((prev) => ({ ...prev, title: nameWithoutExt }));
        }
      } else {
        const data = await res.json();
        setError(data.error || "Failed to upload file");
      }
    } catch {
      setError("Failed to upload file");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!uploadedFile) {
      setError("Please upload a file first");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const res = await fetch("/api/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          category: form.category,
          visibility: form.visibility,
          filename: uploadedFile.filename,
          url: uploadedFile.url,
          mimeType: uploadedFile.mimeType,
          size: uploadedFile.size,
        }),
      });

      if (res.ok) {
        router.push("/admin/documents");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Failed to create document");
      }
    } catch {
      setError("Failed to create document");
    } finally {
      setSaving(false);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/documents" className="p-2 hover:bg-gray-100 rounded-lg">
          <FiArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-heading font-bold text-secondary-800">Upload Document</h1>
          <p className="text-secondary-500 mt-1">Add a new document or resource</p>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* File Upload Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <label className="block text-sm font-medium text-secondary-700 mb-3">File</label>

          {!uploadedFile ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-primary-400 hover:bg-primary-50/30 transition-colors"
            >
              {uploading ? (
                <div className="text-secondary-500">
                  <div className="animate-spin w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full mx-auto mb-3" />
                  <p className="font-medium">Uploading...</p>
                </div>
              ) : (
                <>
                  <FiUploadCloud className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                  <p className="text-sm font-medium text-secondary-600">Click to upload a file</p>
                  <p className="text-xs text-secondary-400 mt-1">PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, TXT, etc.</p>
                </>
              )}
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          ) : (
            <div className="flex items-center gap-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <FiFile className="w-8 h-8 text-green-600 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-secondary-800 truncate">{uploadedFile.filename}</p>
                <p className="text-xs text-secondary-400">{formatFileSize(uploadedFile.size)} - {uploadedFile.mimeType}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setUploadedFile(null);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                className="p-1.5 text-secondary-400 hover:text-red-500 rounded-lg"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>
          )}
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
              placeholder="Document title"
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
          <button type="submit" disabled={saving || !uploadedFile} className="btn-primary disabled:opacity-50">
            <FiSave className="w-4 h-4" /> {saving ? "Saving..." : "Save Document"}
          </button>
        </div>
      </form>
    </div>
  );
}
