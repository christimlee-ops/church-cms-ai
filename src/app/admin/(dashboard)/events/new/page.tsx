"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiSave, FiArrowLeft, FiImage, FiUpload, FiRepeat } from "react-icons/fi";
import Link from "next/link";
import ImagePickerModal from "@/components/admin/ImagePickerModal";
import AIContentGenerator from "@/components/admin/AIContentGenerator";

export default function NewEventPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
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
      let { featuredImage } = form;

      // Auto-generate image if none provided
      if (!featuredImage && form.title) {
        setGeneratingImage(true);
        try {
          const aiRes = await fetch("/api/ai/generate-image", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: `Church event image for: ${form.title}`, style: "warm, inviting, community" }),
          });
          const aiData = await aiRes.json();
          if (aiData.url) featuredImage = aiData.url;
        } catch {
          // Continue saving without image if generation fails
        } finally {
          setGeneratingImage(false);
        }
      }

      const payload = {
        ...form,
        featuredImage,
        recurring: form.recurring || null,
        recurringDays: form.recurring && form.recurring !== "monthly" ? JSON.stringify(form.recurringDays) : null,
        recurringTime: form.recurring ? form.recurringTime || null : null,
        recurringEndTime: form.recurring ? form.recurringEndTime || null : null,
      };
      const res = await fetch("/api/events", {
        method: "POST",
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

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/events" className="p-2 hover:bg-gray-100 rounded-lg"><FiArrowLeft className="w-5 h-5" /></Link>
        <div>
          <h1 className="text-3xl font-heading font-bold text-secondary-800">New Event</h1>
          <p className="text-secondary-500 mt-1">Create a new church event</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1.5">Title</label>
              <input type="text" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value, slug: generateSlug(e.target.value) })} className="input-field" placeholder="Event Title" />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1.5">Slug</label>
              <input type="text" required value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="input-field" />
            </div>
          </div>

          <div className="mb-5">
            <div className="flex items-center gap-3 mb-1.5">
              <label className="block text-sm font-medium text-secondary-700">Description</label>
              <AIContentGenerator
                contentType="event"
                onInsert={(content) => {
                  setForm(prev => ({ ...prev, description: content }));
                }}
              />
            </div>
            <textarea rows={4} required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input-field resize-none" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1.5">Location</label>
              <input type="text" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="input-field" placeholder="e.g., Main Sanctuary" />
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
                  <input type="checkbox" checked={form.allDay} onChange={(e) => setForm({ ...form, allDay: e.target.checked })} className="w-4 h-4 text-primary-500 rounded" />
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
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
            <FiSave className="w-4 h-4" /> {saving ? "Saving..." : "Save Event"}
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
