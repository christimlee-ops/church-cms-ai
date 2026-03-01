"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiEdit2, FiEye, FiArchive, FiRotateCcw } from "react-icons/fi";

type Page = {
  id: string;
  title: string;
  slug: string;
  status: string;
  author: { name: string };
};

const TABS = ["Active", "Archived"] as const;

export default function PagesTable({ pages }: { pages: Page[] }) {
  const [activeTab, setActiveTab] = useState<string>("Active");
  const [archiving, setArchiving] = useState<string | null>(null);
  const router = useRouter();

  const filtered = activeTab === "Archived"
    ? pages.filter((p) => p.status === "ARCHIVED")
    : pages.filter((p) => p.status !== "ARCHIVED");

  const handleArchive = async (id: string) => {
    setArchiving(id);
    try {
      await fetch(`/api/pages/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "ARCHIVED" }),
      });
      router.refresh();
    } finally {
      setArchiving(null);
    }
  };

  const handleUnarchive = async (id: string) => {
    setArchiving(id);
    try {
      await fetch(`/api/pages/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "DRAFT" }),
      });
      router.refresh();
    } finally {
      setArchiving(null);
    }
  };

  return (
    <div>
      <div className="flex gap-1 mb-4 bg-gray-100 rounded-lg p-1 w-fit">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab
                ? "bg-white text-secondary-800 shadow-sm"
                : "text-secondary-500 hover:text-secondary-700"
            }`}
          >
            {tab}
            <span className="ml-1.5 text-xs text-secondary-400">
              ({tab === "Archived"
                ? pages.filter((p) => p.status === "ARCHIVED").length
                : pages.filter((p) => p.status !== "ARCHIVED").length})
            </span>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-secondary-400">
            <p>{activeTab === "Archived" ? "No archived pages." : "No pages yet. Create your first page!"}</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-medium text-secondary-500">Title</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-secondary-500">Status</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-secondary-500">Author</th>
                <th className="text-right px-6 py-3 text-sm font-medium text-secondary-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((page) => (
                <tr key={page.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-secondary-800">{page.title}</p>
                      <p className="text-sm text-secondary-400">/{page.slug}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                      page.status === "PUBLISHED" ? "bg-green-100 text-green-700" :
                      page.status === "DRAFT" ? "bg-yellow-100 text-yellow-700" :
                      "bg-gray-100 text-gray-700"
                    }`}>
                      {page.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-secondary-500">{page.author.name}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/${page.slug}`} className="p-2 text-gray-400 hover:text-primary-500"><FiEye className="w-4 h-4" /></Link>
                      <Link href={`/admin/pages/${page.id}`} className="p-2 text-gray-400 hover:text-primary-500"><FiEdit2 className="w-4 h-4" /></Link>
                      {page.status === "ARCHIVED" ? (
                        <button
                          onClick={() => handleUnarchive(page.id)}
                          disabled={archiving === page.id}
                          className="p-2 text-gray-400 hover:text-green-600 disabled:opacity-50"
                          title="Unarchive page"
                        >
                          <FiRotateCcw className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleArchive(page.id)}
                          disabled={archiving === page.id}
                          className="p-2 text-gray-400 hover:text-amber-600 disabled:opacity-50"
                          title="Archive page"
                        >
                          <FiArchive className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
