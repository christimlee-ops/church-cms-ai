"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { FiSave, FiArrowLeft, FiTrash2, FiImage, FiUpload } from "react-icons/fi";
import Link from "next/link";
import RichTextEditor from "@/components/admin/RichTextEditor";
import ImagePickerModal from "@/components/admin/ImagePickerModal";
import AIContentGenerator from "@/components/admin/AIContentGenerator";

export default function EditBlogPostPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [generatingImage, setGeneratingImage] = useState(false);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    featuredImage: "",
    status: "DRAFT" as string,
    tags: "",
  });

  useEffect(() => {
    fetch(`/api/blog/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) return;
        setForm({
          title: data.title,
          slug: data.slug,
          content: data.content,
          excerpt: data.excerpt || "",
          featuredImage: data.featuredImage || "",
          status: data.status,
          tags: ((data.tags || []) as string[]).join(", "),
        });
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleGenerateImage = async () => {
    if (!form.title) return;
    setGeneratingImage(true);
    try {
      const res = await fetch("/api/ai/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: `Church blog post image for: ${form.title}`, style: "warm, inviting, spiritual" }),
      });
      const data = await res.json();
      if (data.url) {
        setForm({ ...form, featuredImage: data.url });
      } else {
        alert(data.error || "Failed to generate image");
      }
    } catch (err) {
      console.error("Failed to generate image:", err);
      alert("Failed to generate image. Check console for details.");
    } finally {
      setGeneratingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      let { featuredImage } = form;

      // Auto-generate image if none provided
      if (!featuredImage && form.title) {
        setGeneratingImage(true);
        try {
          const aiRes = await fetch("/api/ai/generate-image", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: `Church blog post image for: ${form.title}`, style: "warm, inviting, spiritual" }),
          });
          const aiData = await aiRes.json();
          if (aiData.url) featuredImage = aiData.url;
        } catch {
          // Continue saving without image if generation fails
        } finally {
          setGeneratingImage(false);
        }
      }

      const res = await fetch(`/api/blog/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          featuredImage,
          tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        }),
      });
      if (res.ok) {
        router.push("/admin/blog");
        router.refresh();
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/blog/${id}`, { method: "DELETE" });
      if (res.ok) {
        router.push("/admin/blog");
        router.refresh();
      }
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-secondary-400">Loading post...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/blog" className="p-2 hover:bg-gray-100 rounded-lg">
            <FiArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-heading font-bold text-navy-800">Edit Post</h1>
            <p className="text-secondary-500 mt-1">{form.title}</p>
          </div>
        </div>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="text-red-500 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors disabled:opacity-50"
          title="Delete post"
        >
          <FiTrash2 className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1.5">Title</label>
              <input type="text" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1.5">Slug</label>
              <input type="text" required value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="input-field" />
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-secondary-700 mb-1.5">Excerpt</label>
            <textarea rows={2} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className="input-field resize-none" />
          </div>

          <div className="mb-5">
            <div className="flex items-center gap-3 mb-1.5">
              <label className="block text-sm font-medium text-secondary-700">Content</label>
              <AIContentGenerator
                contentType="blog"
                onInsert={(content, title, excerpt) => {
                  setForm(prev => ({ ...prev, content, ...(title && { title }), ...(excerpt && { excerpt }) }));
                }}
              />
            </div>
            <RichTextEditor value={form.content} onChange={(content: string) => setForm({ ...form, content })} className="bg-white rounded-lg" style={{ minHeight: "300px" }} />
          </div>

          <div className="mb-5 mt-16">
            <label className="block text-sm font-medium text-secondary-700 mb-1.5">Featured Image</label>
            <div className="flex items-center gap-3">
              <input type="text" value={form.featuredImage} onChange={(e) => setForm({ ...form, featuredImage: e.target.value })} className="input-field" placeholder="Image URL or path" />
              <button type="button" onClick={() => setShowImagePicker(true)} className="btn-outline whitespace-nowrap disabled:opacity-50">
                <FiUpload className="w-4 h-4" /> Browse
              </button>
              <button type="button" onClick={handleGenerateImage} disabled={generatingImage || !form.title} className="btn-outline whitespace-nowrap disabled:opacity-50">
                <FiImage className="w-4 h-4" />
                {generatingImage ? "Generating..." : "AI Generate"}
              </button>
            </div>
            {form.featuredImage && <img src={form.featuredImage} alt="Preview" className="mt-3 rounded-lg max-h-48 object-cover" />}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1.5">Tags (comma-separated)</label>
              <input type="text" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1.5">Status</label>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="input-field">
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
                <option value="SCHEDULED">Scheduled</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Link href="/admin/blog" className="btn-outline">Cancel</Link>
          <button type="submit" disabled={saving} className="btn-primary disabled:opacity-50">
            <FiSave className="w-4 h-4" /> {generatingImage ? "Generating image..." : saving ? "Saving..." : "Update Post"}
          </button>
        </div>
      </form>

      <ImagePickerModal
        open={showImagePicker}
        onClose={() => setShowImagePicker(false)}
        onInsert={(url) => setForm({ ...form, featuredImage: url })}
      />
    </div>
  );
}
