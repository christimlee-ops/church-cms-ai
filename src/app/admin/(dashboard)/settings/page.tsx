"use client";

import { useState, useEffect } from "react";
import { FiSave, FiLoader } from "react-icons/fi";

interface Settings {
  churchName: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
  vimeoUserId: string;
  facebookUrl: string;
  instagramUrl: string;
  gaTrackingId: string;
  gaPropertyId: string;
}

const defaultSettings: Settings = {
  churchName: "",
  tagline: "",
  email: "",
  phone: "",
  address: "",
  vimeoUserId: "",
  facebookUrl: "",
  instagramUrl: "",
  gaTrackingId: "",
  gaPropertyId: "",
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        setSettings({
          churchName: data.churchName || "",
          tagline: data.tagline || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
          vimeoUserId: data.vimeoUserId || "",
          facebookUrl: data.facebookUrl || "",
          instagramUrl: data.instagramUrl || "",
          gaTrackingId: data.gaTrackingId || "",
          gaPropertyId: data.gaPropertyId || "",
        });
      })
      .catch(() => setError("Failed to load settings"))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    setError("");

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (!res.ok) throw new Error("Failed to save");
      const data = await res.json();
      setSettings({
        churchName: data.churchName || "",
        tagline: data.tagline || "",
        email: data.email || "",
        phone: data.phone || "",
        address: data.address || "",
        vimeoUserId: data.vimeoUserId || "",
        facebookUrl: data.facebookUrl || "",
        instagramUrl: data.instagramUrl || "",
        gaTrackingId: data.gaTrackingId || "",
        gaPropertyId: data.gaPropertyId || "",
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setError("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <FiLoader className="w-8 h-8 animate-spin text-navy-500" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-secondary-800">Settings</h1>
        <p className="text-secondary-500 mt-1">Configure your church website</p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-heading font-semibold text-secondary-800 mb-4">General</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1.5">Church Name</label>
              <input type="text" value={settings.churchName} onChange={(e) => setSettings({ ...settings, churchName: e.target.value })} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1.5">Tagline</label>
              <input type="text" value={settings.tagline} onChange={(e) => setSettings({ ...settings, tagline: e.target.value })} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1.5">Email</label>
              <input type="email" value={settings.email} onChange={(e) => setSettings({ ...settings, email: e.target.value })} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1.5">Phone</label>
              <input type="tel" value={settings.phone} onChange={(e) => setSettings({ ...settings, phone: e.target.value })} className="input-field" />
            </div>
          </div>
          <div className="mt-5">
            <label className="block text-sm font-medium text-secondary-700 mb-1.5">Address</label>
            <input type="text" value={settings.address} onChange={(e) => setSettings({ ...settings, address: e.target.value })} className="input-field" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-heading font-semibold text-secondary-800 mb-4">Integrations</h2>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1.5">Vimeo User ID</label>
              <input type="text" value={settings.vimeoUserId} onChange={(e) => setSettings({ ...settings, vimeoUserId: e.target.value })} className="input-field" placeholder="user157825759" />
              <p className="text-xs text-secondary-400 mt-1">Used to sync sermon videos</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1.5">Facebook Page URL</label>
              <input type="url" value={settings.facebookUrl} onChange={(e) => setSettings({ ...settings, facebookUrl: e.target.value })} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1.5">Instagram URL</label>
              <input type="url" value={settings.instagramUrl} onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })} className="input-field" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-heading font-semibold text-secondary-800 mb-4">Google Analytics</h2>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1.5">GA4 Measurement ID</label>
              <input type="text" value={settings.gaTrackingId} onChange={(e) => setSettings({ ...settings, gaTrackingId: e.target.value })} className="input-field" placeholder="G-XXXXXXXXXX" />
              <p className="text-xs text-secondary-400 mt-1">Enables Google Analytics tracking on all public pages</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1.5">GA4 Property ID</label>
              <input type="text" value={settings.gaPropertyId} onChange={(e) => setSettings({ ...settings, gaPropertyId: e.target.value })} className="input-field" placeholder="123456789" />
              <p className="text-xs text-secondary-400 mt-1">Numeric property ID used to fetch analytics data in the admin dashboard</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button type="submit" disabled={saving} className="btn-primary disabled:opacity-50">
            <FiSave className="w-4 h-4" /> {saving ? "Saving..." : "Save Settings"}
          </button>
          {saved && <span className="text-green-600 text-sm">Settings saved!</span>}
        </div>
      </form>
    </div>
  );
}
