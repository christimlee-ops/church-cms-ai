"use client";

import { useState, useEffect, useRef } from "react";
import { FiX, FiImage, FiLink, FiUpload } from "react-icons/fi";

type MediaItem = {
  id: string;
  filename: string;
  url: string;
  mimeType: string;
  alt?: string;
};

export default function ImagePickerModal({
  open,
  onClose,
  onInsert,
}: {
  open: boolean;
  onClose: () => void;
  onInsert: (url: string) => void;
}) {
  const [tab, setTab] = useState<"url" | "upload" | "library">("upload");
  const [url, setUrl] = useState("");
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && tab === "library") {
      setLoading(true);
      fetch("/api/media")
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setMedia(data.filter((m: MediaItem) => m.mimeType.startsWith("image/")));
          }
        })
        .catch(() => setMedia([]))
        .finally(() => setLoading(false));
    }
  }, [open, tab]);

  if (!open) return null;

  const handleUrlSubmit = () => {
    if (url.trim()) {
      onInsert(url.trim());
      setUrl("");
      onClose();
    }
  };

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/media", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        const item = await res.json();
        onInsert(item.url);
        onClose();
      } else {
        const err = await res.json();
        alert(err.error || "Upload failed");
      }
    } catch {
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const tabClass = (t: string) =>
    `px-4 py-2 rounded-t-md text-sm font-medium transition-colors ${
      tab === t
        ? "bg-white text-secondary-800 border border-b-white border-gray-200 -mb-px"
        : "text-secondary-500 hover:text-secondary-700"
    }`;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-xl mx-4 max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-secondary-800">Insert Image</h3>
          <button type="button" onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg">
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <div className="flex gap-1 px-6 pt-4 bg-gray-50">
          <button type="button" onClick={() => setTab("upload")} className={tabClass("upload")}>
            <FiUpload className="inline w-4 h-4 mr-1.5 -mt-0.5" />
            Upload
          </button>
          <button type="button" onClick={() => setTab("library")} className={tabClass("library")}>
            <FiImage className="inline w-4 h-4 mr-1.5 -mt-0.5" />
            Media Library
          </button>
          <button type="button" onClick={() => setTab("url")} className={tabClass("url")}>
            <FiLink className="inline w-4 h-4 mr-1.5 -mt-0.5" />
            URL
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          {tab === "upload" ? (
            <div>
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
                  dragOver
                    ? "border-primary-500 bg-primary-50"
                    : "border-gray-200 hover:border-gray-300 bg-gray-50"
                }`}
              >
                <FiUpload className={`w-10 h-10 mx-auto mb-3 ${dragOver ? "text-primary-500" : "text-gray-400"}`} />
                {uploading ? (
                  <p className="text-sm text-secondary-500">Uploading...</p>
                ) : (
                  <>
                    <p className="text-sm font-medium text-secondary-700">
                      Click to select or drag and drop
                    </p>
                    <p className="text-xs text-secondary-400 mt-1">PNG, JPG, GIF, WebP</p>
                  </>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileUpload(e.target.files)}
              />
            </div>
          ) : tab === "url" ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1.5">Image URL</label>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="input-field"
                  autoFocus
                />
              </div>
              {url && (
                <div className="rounded-lg border border-gray-200 p-2">
                  <img
                    src={url}
                    alt="Preview"
                    className="max-h-48 mx-auto rounded object-contain"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                    onLoad={(e) => { (e.target as HTMLImageElement).style.display = "block"; }}
                  />
                </div>
              )}
              <div className="flex justify-end">
                <button type="button" onClick={handleUrlSubmit} disabled={!url.trim()} className="btn-primary disabled:opacity-50">
                  Insert Image
                </button>
              </div>
            </div>
          ) : (
            <div>
              {loading ? (
                <div className="text-center py-8 text-secondary-400">Loading media...</div>
              ) : media.length === 0 ? (
                <div className="text-center py-8 text-secondary-400">
                  <p>No images in media library.</p>
                  <p className="text-sm mt-1">Switch to the Upload tab to add one.</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-3">
                  {media.map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => {
                        onInsert(item.url);
                        onClose();
                      }}
                      className="group relative aspect-square rounded-lg overflow-hidden border-2 border-transparent hover:border-primary-500 transition-colors"
                    >
                      <img
                        src={item.url}
                        alt={item.alt || item.filename}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                      <span className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs px-2 py-1 truncate opacity-0 group-hover:opacity-100 transition-opacity">
                        {item.filename}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
