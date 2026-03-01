"use client";

import { useState, useRef } from "react";
import { FiImage, FiUpload } from "react-icons/fi";
import { format } from "date-fns";

type MediaItem = {
  id: string;
  filename: string;
  url: string;
  mimeType: string;
  size: number;
  alt: string | null;
  aiGenerated: boolean;
  createdAt: string;
};

export default function MediaLibrary({ initialMedia }: { initialMedia: MediaItem[] }) {
  const [media, setMedia] = useState<MediaItem[]>(initialMedia);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);

    try {
      const newItems: MediaItem[] = [];
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/media", {
          method: "POST",
          body: formData,
        });

        if (res.ok) {
          const item = await res.json();
          newItems.push(item);
        }
      }

      if (newItems.length > 0) {
        setMedia((prev) => [...newItems, ...prev]);
      }
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleUpload(e.dataTransfer.files);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-secondary-800">Media Library</h1>
          <p className="text-secondary-500 mt-1">Manage uploaded images and files</p>
        </div>
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="btn-primary disabled:opacity-50"
        >
          <FiUpload className="w-5 h-5" />
          {uploading ? "Uploading..." : "Upload"}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,video/*,application/pdf"
          className="hidden"
          onChange={(e) => handleUpload(e.target.files)}
        />
      </div>

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-8 mb-6 text-center transition-colors ${
          dragOver
            ? "border-primary-500 bg-primary-50"
            : "border-gray-200 bg-gray-50"
        }`}
      >
        <FiUpload className={`w-8 h-8 mx-auto mb-2 ${dragOver ? "text-primary-500" : "text-gray-400"}`} />
        <p className={`text-sm ${dragOver ? "text-primary-600" : "text-secondary-400"}`}>
          Drag and drop files here, or click Upload
        </p>
      </div>

      {media.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
          <FiImage className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-secondary-400">No media files yet. Upload your first image!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {media.map((item) => (
            <div key={item.id} className="card group cursor-pointer">
              <div className="aspect-square bg-church-light overflow-hidden">
                {item.mimeType.startsWith("image/") ? (
                  <img src={item.url} alt={item.alt || item.filename} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                ) : (
                  <div className="flex items-center justify-center h-full"><FiImage className="w-8 h-8 text-gray-400" /></div>
                )}
              </div>
              <div className="p-3">
                <p className="text-xs font-medium text-secondary-700 truncate">{item.filename}</p>
                <p className="text-xs text-secondary-400 mt-0.5">{format(new Date(item.createdAt), "MMM d, yyyy")}</p>
                {item.aiGenerated && <span className="inline-block mt-1 text-xs bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded">AI Generated</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
