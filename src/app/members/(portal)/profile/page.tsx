"use client";

import { useEffect, useState } from "react";
import { FiSave } from "react-icons/fi";

interface ProfileData {
  phone: string;
  address: string;
  birthday: string;
  bio: string;
  family: string;
  photoUrl: string;
  isVisible: boolean;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData>({
    phone: "",
    address: "",
    birthday: "",
    bio: "",
    family: "",
    photoUrl: "",
    isVisible: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetch("/api/members/profile")
      .then((res) => res.json())
      .then((data) => {
        setProfile({
          phone: data.phone || "",
          address: data.address || "",
          birthday: data.birthday ? data.birthday.split("T")[0] : "",
          bio: data.bio || "",
          family: data.family || "",
          photoUrl: data.photoUrl || "",
          isVisible: data.isVisible ?? true,
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/members/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

      if (res.ok) {
        setMessage({ type: "success", text: "Profile updated successfully!" });
      } else {
        setMessage({ type: "error", text: "Failed to update profile. Please try again." });
      }
    } catch {
      setMessage({ type: "error", text: "An error occurred. Please try again." });
    }

    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-navy-500 border-t-gold-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-heading font-bold text-secondary-900">
          My Profile
        </h1>
        <p className="text-secondary-500 mt-1">
          Update your information visible to other members.
        </p>
      </div>

      {message && (
        <div
          className={`px-4 py-3 rounded-lg mb-6 text-sm ${
            message.type === "success"
              ? "bg-green-50 text-green-600"
              : "bg-red-50 text-red-600"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="card p-8 max-w-2xl">
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1.5">
              Phone
            </label>
            <input
              type="tel"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              className="input-field"
              placeholder="(555) 123-4567"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1.5">
              Address
            </label>
            <input
              type="text"
              value={profile.address}
              onChange={(e) => setProfile({ ...profile, address: e.target.value })}
              className="input-field"
              placeholder="123 Main St, City, State"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1.5">
              Birthday
            </label>
            <input
              type="date"
              value={profile.birthday}
              onChange={(e) => setProfile({ ...profile, birthday: e.target.value })}
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1.5">
              Bio
            </label>
            <textarea
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              className="input-field"
              rows={3}
              placeholder="Tell other members a little about yourself..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1.5">
              Family
            </label>
            <input
              type="text"
              value={profile.family}
              onChange={(e) => setProfile({ ...profile, family: e.target.value })}
              className="input-field"
              placeholder="e.g., Smith Family"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1.5">
              Photo URL
            </label>
            <input
              type="url"
              value={profile.photoUrl}
              onChange={(e) => setProfile({ ...profile, photoUrl: e.target.value })}
              className="input-field"
              placeholder="https://example.com/photo.jpg"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isVisible"
              checked={profile.isVisible}
              onChange={(e) => setProfile({ ...profile, isVisible: e.target.checked })}
              className="w-4 h-4 rounded border-gray-300 text-navy-500 focus:ring-navy-500"
            />
            <label htmlFor="isVisible" className="text-sm text-secondary-700">
              Show my profile in the member directory
            </label>
          </div>
        </div>

        <div className="mt-8">
          <button
            type="submit"
            disabled={saving}
            className="btn-primary inline-flex items-center gap-2"
          >
            <FiSave className="w-4 h-4" />
            {saving ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </form>
    </div>
  );
}
