"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FiPlus, FiEdit2, FiTrash2, FiFile, FiDownload } from "react-icons/fi";

interface Document {
  id: string;
  title: string;
  description: string | null;
  filename: string;
  url: string;
  mimeType: string;
  size: number;
  category: string;
  visibility: string;
  publishedAt: string | null;
  createdAt: string;
  author: { name: string };
}

const CATEGORIES = [
  { value: "", label: "All" },
  { value: "BIBLE_STUDY", label: "Bible Study" },
  { value: "BULLETIN", label: "Bulletin" },
  { value: "SERMON_NOTES", label: "Sermon Notes" },
  { value: "NEWSLETTER", label: "Newsletter" },
  { value: "OTHER", label: "Other" },
];

const CATEGORY_LABELS: Record<string, string> = {
  BIBLE_STUDY: "Bible Study",
  BULLETIN: "Bulletin",
  SERMON_NOTES: "Sermon Notes",
  NEWSLETTER: "Newsletter",
  OTHER: "Other",
};

const VISIBILITY_LABELS: Record<string, string> = {
  PUBLIC: "Public",
  MEMBERS_ONLY: "Members Only",
  ADMIN_ONLY: "Admin Only",
};

const VISIBILITY_COLORS: Record<string, string> = {
  PUBLIC: "bg-green-100 text-green-700",
  MEMBERS_ONLY: "bg-blue-100 text-blue-700",
  ADMIN_ONLY: "bg-amber-100 text-amber-700",
};

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("");

  const fetchDocuments = (category: string) => {
    setLoading(true);
    const url = category ? `/api/documents?category=${category}` : "/api/documents";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setDocuments(data);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchDocuments(activeCategory);
  }, [activeCategory]);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) return;

    try {
      const res = await fetch(`/api/documents/${id}`, { method: "DELETE" });
      if (res.ok) {
        setDocuments(documents.filter((d) => d.id !== id));
      } else {
        alert("Failed to delete document");
      }
    } catch {
      alert("Failed to delete document");
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-secondary-800">Documents</h1>
          <p className="text-secondary-500 mt-1">Manage church documents and resources</p>
        </div>
        <Link href="/admin/documents/new" className="btn-primary">
          <FiPlus className="w-5 h-5" /> Upload Document
        </Link>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100 rounded-lg p-1 w-fit">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeCategory === cat.value
                ? "bg-white text-secondary-800 shadow-sm"
                : "text-secondary-500 hover:text-secondary-700"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-secondary-400">Loading documents...</div>
        </div>
      ) : documents.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <FiFile className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-secondary-600">No documents found</h3>
          <p className="text-secondary-400 mt-2">Upload your first document to get started.</p>
          <Link href="/admin/documents/new" className="btn-primary mt-4 inline-flex">
            <FiPlus className="w-4 h-4" /> Upload Document
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left px-6 py-3 text-xs font-medium text-secondary-500 uppercase tracking-wider">Title</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-secondary-500 uppercase tracking-wider">Category</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-secondary-500 uppercase tracking-wider">Visibility</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-secondary-500 uppercase tracking-wider">Size</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-secondary-500 uppercase tracking-wider">Date</th>
                  <th className="text-right px-6 py-3 text-xs font-medium text-secondary-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <FiFile className="w-5 h-5 text-secondary-400 flex-shrink-0" />
                        <div>
                          <div className="font-medium text-secondary-800">{doc.title}</div>
                          {doc.description && (
                            <div className="text-xs text-secondary-400 mt-0.5 line-clamp-1">{doc.description}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-secondary-600">
                        {CATEGORY_LABELS[doc.category] || doc.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${VISIBILITY_COLORS[doc.visibility] || "bg-gray-100 text-secondary-600"}`}>
                        {VISIBILITY_LABELS[doc.visibility] || doc.visibility}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-secondary-500">
                      {formatFileSize(doc.size)}
                    </td>
                    <td className="px-6 py-4 text-sm text-secondary-500">
                      {formatDate(doc.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <a
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-secondary-400 hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-colors"
                          title="Download"
                        >
                          <FiDownload className="w-4 h-4" />
                        </a>
                        <Link
                          href={`/admin/documents/${doc.id}`}
                          className="p-2 text-secondary-400 hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-colors"
                          title="Edit document"
                        >
                          <FiEdit2 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(doc.id, doc.title)}
                          className="p-2 text-secondary-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete document"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
