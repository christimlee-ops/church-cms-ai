"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiSave, FiArrowLeft, FiImage, FiShare2, FiUpload } from "react-icons/fi";
import Link from "next/link";
import RichTextEditor from "@/components/admin/RichTextEditor";
import ImagePickerModal from "@/components/admin/ImagePickerModal";
import AIContentGenerator from "@/components/admin/AIContentGenerator";

export default function NewBlogPostPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [generatingImage, setGeneratingImage] = useState(false);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    featuredImage: "",
    status: "DRAFT" as "DRAFT" | "PUBLISHED",
    tags: "",
    autoPost: false,
  });

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  };

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

      const res = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          featuredImage,
          tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        }),
      });
      if (res.ok) {
        const post = await res.json();
        if (form.autoPost) {
          await fetch("/api/social/post", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ blogPostId: post.id }),
          });
        }
        router.push("/admin/blog");
        router.refresh();
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/blog" className="p-2 hover:bg-gray-100 rounded-lg">
          <FiArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-heading font-bold text-secondary-800">New Blog Post</h1>
          <p className="text-secondary-500 mt-1">Create a new blog post</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1.5">Title</label>
              <input type="text" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value, slug: generateSlug(e.target.value) })} className="input-field" placeholder="Post Title" />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1.5">Slug</label>
              <input type="text" required value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="input-field" placeholder="post-slug" />
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-secondary-700 mb-1.5">Excerpt</label>
            <textarea rows={2} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className="input-field resize-none" placeholder="Brief summary..." />
          </div>

          <div className="mb-5">
            <div className="flex items-center gap-3 mb-1.5">
              <label className="block text-sm font-medium text-secondary-700">Content</label>
              <AIContentGenerator
                contentType="blog"
                onInsert={(content, title, excerpt) => {
                  setForm(prev => ({ ...prev, content, ...(title && { title, slug: generateSlug(title) }), ...(excerpt && { excerpt }) }));
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1.5">Tags (comma-separated)</label>
              <input type="text" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} className="input-field" placeholder="faith, community, worship" />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1.5">Status</label>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as "DRAFT" | "PUBLISHED" })} className="input-field">
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
              </select>
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2 pb-2.5">
                <input type="checkbox" checked={form.autoPost} onChange={(e) => setForm({ ...form, autoPost: e.target.checked })} className="w-4 h-4 text-primary-500 rounded" />
                <span className="text-sm text-secondary-700 flex items-center gap-1"><FiShare2 className="w-4 h-4" /> Auto-post to social media</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Link href="/admin/blog" className="btn-outline">Cancel</Link>
          <button type="submit" disabled={saving} className="btn-primary disabled:opacity-50">
            <FiSave className="w-4 h-4" /> {generatingImage ? "Generating image..." : saving ? "Saving..." : "Save Post"}
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
