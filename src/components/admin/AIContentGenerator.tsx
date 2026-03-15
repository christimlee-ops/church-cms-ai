"use client";

import { useState } from "react";
import { FiX, FiZap } from "react-icons/fi";

interface AIContentGeneratorProps {
  contentType: "blog" | "event" | "page";
  onInsert: (content: string, title?: string, excerpt?: string) => void;
  buttonLabel?: string;
}

export default function AIContentGenerator({ contentType, onInsert, buttonLabel }: AIContentGeneratorProps) {
  const [showModal, setShowModal] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [tone, setTone] = useState("Warm & Inviting");
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<{ content: string; title?: string; excerpt?: string } | null>(null);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setGenerating(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/ai/generate-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: contentType,
          prompt: prompt.trim(),
          context: `Tone/style: ${tone}`,
        }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setResult(data);
      }
    } catch {
      setError("Failed to generate content. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  const handleInsert = () => {
    if (result) {
      onInsert(result.content, result.title, result.excerpt);
      setShowModal(false);
      setPrompt("");
      setResult(null);
      setError("");
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setPrompt("");
    setResult(null);
    setError("");
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="btn-outline text-sm inline-flex items-center gap-1.5"
      >
        <FiZap className="w-4 h-4" />
        {buttonLabel || "AI Generate Content"}
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="text-lg font-heading font-bold text-secondary-800">Generate Content with AI</h2>
              <button type="button" onClick={handleClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                <FiX className="w-5 h-5 text-secondary-500" />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 space-y-4 overflow-y-auto flex-1">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1.5">
                  What would you like to write about?
                </label>
                <textarea
                  rows={3}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="input-field resize-none"
                  placeholder={
                    contentType === "blog"
                      ? "e.g., Write a blog post about our upcoming Lenten season services and how members can prepare spiritually..."
                      : contentType === "event"
                      ? "e.g., Write a description for our annual church picnic with games, food, and fellowship..."
                      : "e.g., Write content for our About Us page describing our history and mission..."
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1.5">Style / Tone</label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="input-field"
                >
                  <option value="Warm & Inviting">Warm & Inviting</option>
                  <option value="Formal & Reverent">Formal & Reverent</option>
                  <option value="Casual & Friendly">Casual & Friendly</option>
                  <option value="Informative">Informative</option>
                </select>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={generating || !prompt.trim()}
                  className="btn-primary disabled:opacity-50 text-sm"
                >
                  {generating ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Generating...
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5">
                      <FiZap className="w-4 h-4" /> Generate
                    </span>
                  )}
                </button>
                {result && (
                  <button
                    type="button"
                    onClick={handleGenerate}
                    disabled={generating}
                    className="btn-outline text-sm disabled:opacity-50"
                  >
                    Regenerate
                  </button>
                )}
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                  {error}
                </div>
              )}

              {result && (
                <div className="border border-gray-200 rounded-lg">
                  <div className="p-3 bg-gray-50 border-b border-gray-200 text-xs font-medium text-secondary-500 uppercase tracking-wide">
                    Generated Content Preview
                  </div>
                  <div className="p-4 max-h-64 overflow-y-auto">
                    {result.title && (
                      <h3 className="text-lg font-bold text-secondary-800 mb-2">{result.title}</h3>
                    )}
                    <div className="text-sm text-secondary-700 whitespace-pre-wrap leading-relaxed">
                      {result.content}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            {result && (
              <div className="p-5 border-t border-gray-100 flex justify-end gap-3">
                <button type="button" onClick={handleClose} className="btn-outline text-sm">
                  Cancel
                </button>
                <button type="button" onClick={handleInsert} className="btn-primary text-sm">
                  Use This Content
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
