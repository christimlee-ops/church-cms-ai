"use client";

import { useState, useEffect } from "react";
import {
  FiSave,
  FiPlus,
  FiTrash2,
  FiChevronDown,
  FiChevronUp,
  FiArrowUp,
  FiArrowDown,
} from "react-icons/fi";
import RichTextEditor from "@/components/admin/RichTextEditor";

interface ServiceTime {
  name: string;
  time: string;
  subtitle: string;
}

interface HighlightItem {
  title: string;
  description: string;
  link: string;
  icon: string;
}

interface HeroSection {
  welcomeLabel: string;
  title: string;
  titleAccent: string;
  description: string;
  primaryBtnText: string;
  primaryBtnLink: string;
  secondaryBtnText: string;
  secondaryBtnLink: string;
}

interface ServiceSection {
  label: string;
  title: string;
  description: string;
  times: ServiceTime[];
}

interface HighlightSection {
  label: string;
  title: string;
  description: string;
  items: HighlightItem[];
}

interface SermonSection {
  label: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

interface CtaSection {
  title: string;
  description: string;
  primaryBtnText: string;
  primaryBtnLink: string;
  secondaryBtnText: string;
  secondaryBtnLink: string;
}

interface CustomSection {
  id: string;
  title: string;
  content: string;
  bgColor: string;
}

const ICON_OPTIONS = [
  "FiBookOpen",
  "FiBook",
  "FiUsers",
  "FiHeart",
  "FiCalendar",
  "FiMusic",
  "FiStar",
  "FiHome",
  "FiCoffee",
  "FiGlobe",
];

function CollapsibleSection({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <h2 className="text-lg font-heading font-semibold text-secondary-800">
          {title}
        </h2>
        {open ? (
          <FiChevronUp className="w-5 h-5 text-secondary-400" />
        ) : (
          <FiChevronDown className="w-5 h-5 text-secondary-400" />
        )}
      </button>
      {open && <div className="px-6 pb-6 border-t border-gray-100 pt-4">{children}</div>}
    </div>
  );
}

export default function AdminHomepagePage() {
  const [hero, setHero] = useState<HeroSection>({
    welcomeLabel: "",
    title: "",
    titleAccent: "",
    description: "",
    primaryBtnText: "",
    primaryBtnLink: "",
    secondaryBtnText: "",
    secondaryBtnLink: "",
  });
  const [service, setService] = useState<ServiceSection>({
    label: "",
    title: "",
    description: "",
    times: [],
  });
  const [highlight, setHighlight] = useState<HighlightSection>({
    label: "",
    title: "",
    description: "",
    items: [],
  });
  const [sermon, setSermon] = useState<SermonSection>({
    label: "",
    title: "",
    description: "",
    buttonText: "",
    buttonLink: "",
  });
  const [cta, setCta] = useState<CtaSection>({
    title: "",
    description: "",
    primaryBtnText: "",
    primaryBtnLink: "",
    secondaryBtnText: "",
    secondaryBtnLink: "",
  });

  const [customSections, setCustomSections] = useState<CustomSection[]>([]);

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/homepage")
      .then((res) => res.json())
      .then((data) => {
        if (data.heroSection) setHero(data.heroSection);
        if (data.serviceSection) setService(data.serviceSection);
        if (data.highlightSection) setHighlight(data.highlightSection);
        if (data.sermonSection) setSermon(data.sermonSection);
        if (data.ctaSection) setCta(data.ctaSection);
        if (data.customSections) setCustomSections(data.customSections);
      })
      .catch(() => setError("Failed to load homepage content"))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    setError("");

    try {
      const res = await fetch("/api/homepage", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          heroSection: hero,
          serviceSection: service,
          highlightSection: highlight,
          sermonSection: sermon,
          ctaSection: cta,
          customSections,
        }),
      });

      if (!res.ok) throw new Error("Save failed");
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setError("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // Service times helpers
  const addServiceTime = () => {
    setService({
      ...service,
      times: [...service.times, { name: "", time: "", subtitle: "" }],
    });
  };
  const removeServiceTime = (index: number) => {
    setService({
      ...service,
      times: service.times.filter((_, i) => i !== index),
    });
  };
  const updateServiceTime = (
    index: number,
    field: keyof ServiceTime,
    value: string
  ) => {
    const updated = [...service.times];
    updated[index] = { ...updated[index], [field]: value };
    setService({ ...service, times: updated });
  };

  // Highlight items helpers
  const addHighlightItem = () => {
    setHighlight({
      ...highlight,
      items: [
        ...highlight.items,
        { title: "", description: "", link: "", icon: "FiBookOpen" },
      ],
    });
  };
  const removeHighlightItem = (index: number) => {
    setHighlight({
      ...highlight,
      items: highlight.items.filter((_, i) => i !== index),
    });
  };
  const updateHighlightItem = (
    index: number,
    field: keyof HighlightItem,
    value: string
  ) => {
    const updated = [...highlight.items];
    updated[index] = { ...updated[index], [field]: value };
    setHighlight({ ...highlight, items: updated });
  };

  // Custom sections helpers
  const addCustomSection = () => {
    setCustomSections([
      ...customSections,
      { id: Date.now().toString(), title: "", content: "", bgColor: "bg-church-cream" },
    ]);
  };
  const removeCustomSection = (index: number) => {
    setCustomSections(customSections.filter((_, i) => i !== index));
  };
  const updateCustomSection = (index: number, field: keyof CustomSection, value: string) => {
    const updated = [...customSections];
    updated[index] = { ...updated[index], [field]: value };
    setCustomSections(updated);
  };
  const moveCustomSection = (index: number, direction: "up" | "down") => {
    const updated = [...customSections];
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= updated.length) return;
    [updated[index], updated[target]] = [updated[target], updated[index]];
    setCustomSections(updated);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-gold-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-secondary-800">
          Homepage Editor
        </h1>
        <p className="text-secondary-500 mt-1">
          Edit the content displayed on your public homepage
        </p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
        {/* Hero Section */}
        <CollapsibleSection title="Hero Section" defaultOpen>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1.5">
                Welcome Label
              </label>
              <input
                type="text"
                value={hero.welcomeLabel}
                onChange={(e) =>
                  setHero({ ...hero, welcomeLabel: e.target.value })
                }
                className="input-field"
                placeholder="Welcome to Calvary"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1.5">
                  Title (Line 1)
                </label>
                <input
                  type="text"
                  value={hero.title}
                  onChange={(e) =>
                    setHero({ ...hero, title: e.target.value })
                  }
                  className="input-field"
                  placeholder="Grow in Grace."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1.5">
                  Title Accent (Line 2, gold text)
                </label>
                <input
                  type="text"
                  value={hero.titleAccent}
                  onChange={(e) =>
                    setHero({ ...hero, titleAccent: e.target.value })
                  }
                  className="input-field"
                  placeholder="Know Your Savior."
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1.5">
                Description
              </label>
              <textarea
                value={hero.description}
                onChange={(e) =>
                  setHero({ ...hero, description: e.target.value })
                }
                className="input-field"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1.5">
                  Primary Button Text
                </label>
                <input
                  type="text"
                  value={hero.primaryBtnText}
                  onChange={(e) =>
                    setHero({ ...hero, primaryBtnText: e.target.value })
                  }
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1.5">
                  Primary Button Link
                </label>
                <input
                  type="text"
                  value={hero.primaryBtnLink}
                  onChange={(e) =>
                    setHero({ ...hero, primaryBtnLink: e.target.value })
                  }
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1.5">
                  Secondary Button Text
                </label>
                <input
                  type="text"
                  value={hero.secondaryBtnText}
                  onChange={(e) =>
                    setHero({ ...hero, secondaryBtnText: e.target.value })
                  }
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1.5">
                  Secondary Button Link
                </label>
                <input
                  type="text"
                  value={hero.secondaryBtnLink}
                  onChange={(e) =>
                    setHero({ ...hero, secondaryBtnLink: e.target.value })
                  }
                  className="input-field"
                />
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* Service Times Section */}
        <CollapsibleSection title="Service Times">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1.5">
                Section Label
              </label>
              <input
                type="text"
                value={service.label}
                onChange={(e) =>
                  setService({ ...service, label: e.target.value })
                }
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1.5">
                Section Title
              </label>
              <input
                type="text"
                value={service.title}
                onChange={(e) =>
                  setService({ ...service, title: e.target.value })
                }
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1.5">
                Section Description
              </label>
              <textarea
                value={service.description}
                onChange={(e) =>
                  setService({ ...service, description: e.target.value })
                }
                className="input-field"
                rows={2}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-secondary-700">
                  Service Times
                </label>
                <button
                  type="button"
                  onClick={addServiceTime}
                  className="text-sm text-gold-600 hover:text-gold-700 font-medium inline-flex items-center gap-1"
                >
                  <FiPlus className="w-4 h-4" /> Add Time
                </button>
              </div>
              <div className="space-y-3">
                {service.times.map((st, i) => (
                  <div
                    key={i}
                    className="flex gap-3 items-start bg-gray-50 rounded-lg p-3"
                  >
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                      <input
                        type="text"
                        value={st.name}
                        onChange={(e) =>
                          updateServiceTime(i, "name", e.target.value)
                        }
                        className="input-field"
                        placeholder="Service name"
                      />
                      <input
                        type="text"
                        value={st.time}
                        onChange={(e) =>
                          updateServiceTime(i, "time", e.target.value)
                        }
                        className="input-field"
                        placeholder="9:00 AM"
                      />
                      <input
                        type="text"
                        value={st.subtitle}
                        onChange={(e) =>
                          updateServiceTime(i, "subtitle", e.target.value)
                        }
                        className="input-field"
                        placeholder="Brief description"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeServiceTime(i)}
                      className="text-red-400 hover:text-red-600 p-2"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {service.times.length === 0 && (
                  <p className="text-sm text-secondary-400 italic">
                    No service times added. Click &quot;Add Time&quot; to create one.
                  </p>
                )}
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* Ministry Highlights Section */}
        <CollapsibleSection title="Ministry Highlights">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1.5">
                Section Label
              </label>
              <input
                type="text"
                value={highlight.label}
                onChange={(e) =>
                  setHighlight({ ...highlight, label: e.target.value })
                }
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1.5">
                Section Title
              </label>
              <input
                type="text"
                value={highlight.title}
                onChange={(e) =>
                  setHighlight({ ...highlight, title: e.target.value })
                }
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1.5">
                Section Description
              </label>
              <textarea
                value={highlight.description}
                onChange={(e) =>
                  setHighlight({ ...highlight, description: e.target.value })
                }
                className="input-field"
                rows={2}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-secondary-700">
                  Highlight Cards
                </label>
                <button
                  type="button"
                  onClick={addHighlightItem}
                  className="text-sm text-gold-600 hover:text-gold-700 font-medium inline-flex items-center gap-1"
                >
                  <FiPlus className="w-4 h-4" /> Add Card
                </button>
              </div>
              <div className="space-y-4">
                {highlight.items.map((item, i) => (
                  <div
                    key={i}
                    className="bg-gray-50 rounded-lg p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-secondary-600">
                        Card {i + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeHighlightItem(i)}
                        className="text-red-400 hover:text-red-600 p-1"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) =>
                          updateHighlightItem(i, "title", e.target.value)
                        }
                        className="input-field"
                        placeholder="Card title"
                      />
                      <input
                        type="text"
                        value={item.link}
                        onChange={(e) =>
                          updateHighlightItem(i, "link", e.target.value)
                        }
                        className="input-field"
                        placeholder="/page-link"
                      />
                    </div>
                    <textarea
                      value={item.description}
                      onChange={(e) =>
                        updateHighlightItem(i, "description", e.target.value)
                      }
                      className="input-field"
                      rows={2}
                      placeholder="Card description"
                    />
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-1.5">
                        Icon
                      </label>
                      <select
                        value={item.icon}
                        onChange={(e) =>
                          updateHighlightItem(i, "icon", e.target.value)
                        }
                        className="input-field"
                      >
                        {ICON_OPTIONS.map((icon) => (
                          <option key={icon} value={icon}>
                            {icon.replace("Fi", "")}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
                {highlight.items.length === 0 && (
                  <p className="text-sm text-secondary-400 italic">
                    No highlight cards added. Click &quot;Add Card&quot; to create one.
                  </p>
                )}
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* Sermon Section */}
        <CollapsibleSection title="Sermon Section">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1.5">
                Section Label
              </label>
              <input
                type="text"
                value={sermon.label}
                onChange={(e) =>
                  setSermon({ ...sermon, label: e.target.value })
                }
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1.5">
                Section Title
              </label>
              <input
                type="text"
                value={sermon.title}
                onChange={(e) =>
                  setSermon({ ...sermon, title: e.target.value })
                }
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1.5">
                Description
              </label>
              <textarea
                value={sermon.description}
                onChange={(e) =>
                  setSermon({ ...sermon, description: e.target.value })
                }
                className="input-field"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1.5">
                  Button Text
                </label>
                <input
                  type="text"
                  value={sermon.buttonText}
                  onChange={(e) =>
                    setSermon({ ...sermon, buttonText: e.target.value })
                  }
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1.5">
                  Button Link
                </label>
                <input
                  type="text"
                  value={sermon.buttonLink}
                  onChange={(e) =>
                    setSermon({ ...sermon, buttonLink: e.target.value })
                  }
                  className="input-field"
                />
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* CTA Section */}
        <CollapsibleSection title="Call to Action Section">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1.5">
                Title
              </label>
              <input
                type="text"
                value={cta.title}
                onChange={(e) => setCta({ ...cta, title: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1.5">
                Description
              </label>
              <textarea
                value={cta.description}
                onChange={(e) =>
                  setCta({ ...cta, description: e.target.value })
                }
                className="input-field"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1.5">
                  Primary Button Text
                </label>
                <input
                  type="text"
                  value={cta.primaryBtnText}
                  onChange={(e) =>
                    setCta({ ...cta, primaryBtnText: e.target.value })
                  }
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1.5">
                  Primary Button Link
                </label>
                <input
                  type="text"
                  value={cta.primaryBtnLink}
                  onChange={(e) =>
                    setCta({ ...cta, primaryBtnLink: e.target.value })
                  }
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1.5">
                  Secondary Button Text
                </label>
                <input
                  type="text"
                  value={cta.secondaryBtnText}
                  onChange={(e) =>
                    setCta({ ...cta, secondaryBtnText: e.target.value })
                  }
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1.5">
                  Secondary Button Link
                </label>
                <input
                  type="text"
                  value={cta.secondaryBtnLink}
                  onChange={(e) =>
                    setCta({ ...cta, secondaryBtnLink: e.target.value })
                  }
                  className="input-field"
                />
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* Custom HTML Sections */}
        <CollapsibleSection title="Custom HTML Sections">
          <p className="text-sm text-secondary-400 mb-4">
            Add, remove, and reorder custom content sections on the homepage. Each section includes a rich text editor for full HTML control.
          </p>
          <div className="space-y-6">
            {customSections.map((section, i) => (
              <div key={section.id} className="bg-gray-50 rounded-lg p-4 space-y-4 border border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-secondary-600">
                    Section {i + 1}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => moveCustomSection(i, "up")}
                      disabled={i === 0}
                      className="p-1.5 text-secondary-400 hover:text-navy-500 disabled:opacity-30"
                      title="Move up"
                    >
                      <FiArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveCustomSection(i, "down")}
                      disabled={i === customSections.length - 1}
                      className="p-1.5 text-secondary-400 hover:text-navy-500 disabled:opacity-30"
                      title="Move down"
                    >
                      <FiArrowDown className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeCustomSection(i)}
                      className="p-1.5 text-red-400 hover:text-red-600"
                      title="Remove section"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1.5">
                      Section Title (optional)
                    </label>
                    <input
                      type="text"
                      value={section.title}
                      onChange={(e) => updateCustomSection(i, "title", e.target.value)}
                      className="input-field"
                      placeholder="e.g. Welcome Message"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1.5">
                      Background Color
                    </label>
                    <select
                      value={section.bgColor}
                      onChange={(e) => updateCustomSection(i, "bgColor", e.target.value)}
                      className="input-field"
                    >
                      <option value="bg-church-cream">Cream</option>
                      <option value="bg-church-light">Light</option>
                      <option value="bg-white">White</option>
                      <option value="bg-navy-500 text-white">Navy</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1.5">
                    Content
                  </label>
                  <RichTextEditor
                    value={section.content}
                    onChange={(val) => updateCustomSection(i, "content", val)}
                    style={{ minHeight: "200px" }}
                  />
                </div>
              </div>
            ))}
            {customSections.length === 0 && (
              <p className="text-sm text-secondary-400 italic">
                No custom sections. Click &quot;Add Section&quot; to create one.
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={addCustomSection}
            className="mt-4 text-sm text-gold-600 hover:text-gold-700 font-medium inline-flex items-center gap-1"
          >
            <FiPlus className="w-4 h-4" /> Add Section
          </button>
        </CollapsibleSection>

        {/* Save Button */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="btn-primary disabled:opacity-50"
          >
            <FiSave className="w-4 h-4" />{" "}
            {saving ? "Saving..." : "Save Homepage"}
          </button>
          {saved && (
            <span className="text-green-600 text-sm">
              Homepage content saved!
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
