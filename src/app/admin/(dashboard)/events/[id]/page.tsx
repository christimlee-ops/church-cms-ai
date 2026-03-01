"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { FiSave, FiArrowLeft, FiTrash2, FiImage, FiUpload, FiRepeat } from "react-icons/fi";
import Link from "next/link";
import ImagePickerModal from "@/components/admin/ImagePickerModal";

export default function EditEventPage() {
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
    description: "",
    location: "",
    address: "",
    startDate: "",
    endDate: "",
    allDay: false,
    recurring: "",
    recurringDays: [] as number[],
    recurringTime: "",
    recurringEndTime: "",
    category: "",
    featuredImage: "",
    status: "UPCOMING" as string,
  });

  useEffect(() => {
    fetch(`/api/events/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) return;
        setForm({
          title: data.title,
          slug: data.slug,
          description: data.description,
          location: data.location || "",
          address: data.address || "",
          startDate: data.startDate ? new Date(data.startDate).toISOString().slice(0, 16) : "",
          endDate: data.endDate ? new Date(data.endDate).toISOString().slice(0, 16) : "",
          allDay: data.allDay,
          recurring: data.recurring || "",
          recurringDays: data.recurringDays ? JSON.parse(data.recurringDays) : [],
          recurringTime: data.recurringTime || "",
          recurringEndTime: data.recurringEndTime || "",
          category: data.category || "",
          featuredImage: data.featuredImage || "",
          status: data.status,
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
        body: JSON.stringify({ prompt: `Church event image for: ${form.title}`, style: "warm, inviting, community" }),
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
      const payload = {
        ...form,
        recurring: form.recurring || null,
        recurringDays: form.recurring && form.recurring !== "monthly" ? JSON.stringify(form.recurringDays) : null,
        recurringTime: form.recurring ? form.recurringTime || null : null,
        recurringEndTime: form.recurring ? form.recurringEndTime || null : null,
      };
      const res = await fetch(`/api/events/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        router.push("/admin/events");
        router.refresh();
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/events/${id}`, { method: "DELETE" });
      if (res.ok) {
        router.push("/admin/events");
        router.refresh();
      }
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-secondary-400">Loading event...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/events" className="p-2 hover:bg-gray-100 rounded-lg">
            <FiArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-heading font-bold text-navy-800">Edit Event</h1>
            <p className="text-secondary-500 mt-1">{form.title}</p>
          </div>
        </div>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="text-red-500 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors disabled:opacity-50"
          title="Delete event"
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
            <label className="block text-sm font-medium text-secondary-700 mb-1.5">Description</label>
            <textarea rows={4} required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input-field resize-none" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1.5">Location</label>
              <input type="text" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1.5">Address</label>
              <input type="text" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="input-field" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1.5">{form.recurring ? "Starts On" : "Start Date & Time"}</label>
              <input type={form.recurring ? "date" : "datetime-local"} required value={form.recurring ? form.startDate.slice(0, 10) : form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} className="input-field" />
            </div>
            {!form.recurring && (
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1.5">End Date & Time</label>
                <input type="datetime-local" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} className="input-field" />
              </div>
            )}
            {!form.recurring && (
              <div className="flex items-end gap-4">
                <label className="flex items-center gap-2 pb-2.5">
                  <input type="checkbox" checked={form.allDay} onChange={(e) => setForm({ ...form, allDay: e.target.checked })} className="w-4 h-4 text-navy-500 rounded" />
                  <span className="text-sm text-secondary-700">All Day Event</span>
                </label>
              </div>
            )}
          </div>

          {/* Recurring Event Section */}
          <div className="mb-5 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <FiRepeat className="w-4 h-4 text-primary-500" />
              <label className="text-sm font-medium text-secondary-700">Recurring Event</label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-secondary-500 mb-1">Frequency</label>
                <select value={form.recurring} onChange={(e) => setForm({ ...form, recurring: e.target.value, recurringDays: [] })} className="input-field">
                  <option value="">One-time event</option>
                  <option value="weekly">Weekly</option>
                  <option value="biweekly">Biweekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              {form.recurring && form.recurring !== "monthly" && (
                <div className="md:col-span-2">
                  <label className="block text-xs text-secondary-500 mb-1">Days of Week</label>
                  <div className="flex gap-1">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, idx) => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => {
                          const days = form.recurringDays.includes(idx)
                            ? form.recurringDays.filter((d) => d !== idx)
                            : [...form.recurringDays, idx].sort();
                          setForm({ ...form, recurringDays: days });
                        }}
                        className={`px-2.5 py-1.5 rounded text-xs font-medium transition-colors ${
                          form.recurringDays.includes(idx)
                            ? "bg-primary-500 text-white"
                            : "bg-white border border-gray-300 text-secondary-600 hover:bg-gray-100"
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {form.recurring && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                <div>
                  <label className="block text-xs text-secondary-500 mb-1">Start Time</label>
                  <input type="time" value={form.recurringTime} onChange={(e) => setForm({ ...form, recurringTime: e.target.value })} className="input-field" />
                </div>
                <div>
                  <label className="block text-xs text-secondary-500 mb-1">End Time</label>
                  <input type="time" value={form.recurringEndTime} onChange={(e) => setForm({ ...form, recurringEndTime: e.target.value })} className="input-field" />
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1.5">Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input-field">
                <option value="">Select category</option>
                <option value="worship">Worship</option>
                <option value="youth">Youth</option>
                <option value="children">Children</option>
                <option value="community">Community</option>
                <option value="outreach">Outreach</option>
                <option value="special">Special Event</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1.5">Status</label>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="input-field">
                <option value="UPCOMING">Upcoming</option>
                <option value="ONGOING">Ongoing</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1.5">Featured Image</label>
              <div className="flex gap-2">
                <input type="text" value={form.featuredImage} onChange={(e) => setForm({ ...form, featuredImage: e.target.value })} className="input-field" placeholder="Image URL or path" />
                <button type="button" onClick={() => setShowImagePicker(true)} className="btn-outline whitespace-nowrap text-sm">
                  <FiUpload className="w-4 h-4" /> Browse
                </button>
                <button type="button" onClick={handleGenerateImage} disabled={generatingImage || !form.title} className="btn-outline whitespace-nowrap text-sm disabled:opacity-50">
                  <FiImage className="w-4 h-4" /> AI
                </button>
              </div>
              {form.featuredImage && <img src={form.featuredImage} alt="Preview" className="mt-3 rounded-lg max-h-48 object-cover" />}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Link href="/admin/events" className="btn-outline">Cancel</Link>
          <button type="submit" disabled={saving} className="btn-primary disabled:opacity-50">
            <FiSave className="w-4 h-4" /> {saving ? "Saving..." : "Update Event"}
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
