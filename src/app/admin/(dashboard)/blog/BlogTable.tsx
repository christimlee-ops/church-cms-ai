"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiEdit2, FiEye, FiArchive, FiRotateCcw } from "react-icons/fi";
import { format } from "date-fns";

type Post = {
  id: string;
  title: string;
  slug: string;
  status: string;
  createdAt: string;
  author: { name: string };
};

const TABS = ["Active", "Archived"] as const;

export default function BlogTable({ posts }: { posts: Post[] }) {
  const [activeTab, setActiveTab] = useState<string>("Active");
  const [archiving, setArchiving] = useState<string | null>(null);
  const router = useRouter();

  const filtered = activeTab === "Archived"
    ? posts.filter((p) => p.status === "ARCHIVED")
    : posts.filter((p) => p.status !== "ARCHIVED");

  const handleArchive = async (id: string) => {
    setArchiving(id);
    try {
      await fetch(`/api/blog/${id}`, {
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
      await fetch(`/api/blog/${id}`, {
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
                ? posts.filter((p) => p.status === "ARCHIVED").length
                : posts.filter((p) => p.status !== "ARCHIVED").length})
            </span>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-secondary-400">
            <p>{activeTab === "Archived" ? "No archived posts." : "No blog posts yet. Write your first post!"}</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-medium text-secondary-500">Title</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-secondary-500">Status</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-secondary-500">Author</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-secondary-500">Date</th>
                <th className="text-right px-6 py-3 text-sm font-medium text-secondary-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="font-medium text-secondary-800">{post.title}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                      post.status === "PUBLISHED" ? "bg-green-100 text-green-700" :
                      post.status === "DRAFT" ? "bg-yellow-100 text-yellow-700" :
                      post.status === "ARCHIVED" ? "bg-gray-100 text-gray-700" :
                      "bg-blue-100 text-blue-700"
                    }`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-secondary-500">{post.author.name}</td>
                  <td className="px-6 py-4 text-sm text-secondary-500">
                    {format(new Date(post.createdAt), "MMM d, yyyy")}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/blog/${post.slug}`} className="p-2 text-gray-400 hover:text-primary-500"><FiEye className="w-4 h-4" /></Link>
                      <Link href={`/admin/blog/${post.id}`} className="p-2 text-gray-400 hover:text-primary-500"><FiEdit2 className="w-4 h-4" /></Link>
                      {post.status === "ARCHIVED" ? (
                        <button
                          onClick={() => handleUnarchive(post.id)}
                          disabled={archiving === post.id}
                          className="p-2 text-gray-400 hover:text-green-600 disabled:opacity-50"
                          title="Unarchive post"
                        >
                          <FiRotateCcw className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleArchive(post.id)}
                          disabled={archiving === post.id}
                          className="p-2 text-gray-400 hover:text-amber-600 disabled:opacity-50"
                          title="Archive post"
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
