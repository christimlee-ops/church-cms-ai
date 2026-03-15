"use client";

import { useEffect, useState } from "react";
import { FiDownload, FiFile } from "react-icons/fi";

interface Document {
  id: string;
  title: string;
  description: string | null;
  category: string;
  fileUrl: string;
}

const categories = ["All", "Bible Study", "Bulletin", "Sermon Notes", "Newsletter"];

export default function ResourcesPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    fetch("/api/documents?visibility=PUBLIC,MEMBERS_ONLY")
      .then((res) => res.json())
      .then((data) => {
        setDocuments(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredDocuments =
    activeCategory === "All"
      ? documents
      : documents.filter((doc) => doc.category === activeCategory);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-heading font-bold text-secondary-900">
          Resources
        </h1>
        <p className="text-secondary-500 mt-1">
          Access documents, study materials, and more.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeCategory === category
                ? "bg-navy-500 text-white"
                : "bg-white text-secondary-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-4 border-navy-500 border-t-gold-500 rounded-full animate-spin" />
        </div>
      ) : filteredDocuments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((doc) => (
            <div key={doc.id} className="card p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-navy-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FiFile className="w-5 h-5 text-navy-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading font-semibold text-secondary-900 mb-1 truncate">
                    {doc.title}
                  </h3>
                  {doc.description && (
                    <p className="text-sm text-secondary-500 mb-3 line-clamp-2">
                      {doc.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="inline-block px-2 py-0.5 text-xs font-medium bg-gold-500/10 text-gold-500 rounded">
                      {doc.category}
                    </span>
                    <a
                      href={doc.fileUrl}
                      download
                      className="inline-flex items-center gap-1.5 text-sm text-navy-500 hover:text-navy-600 font-medium transition-colors"
                    >
                      <FiDownload className="w-4 h-4" />
                      Download
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card p-8 text-center text-secondary-500">
          {activeCategory === "All"
            ? "No resources available yet."
            : `No ${activeCategory} resources found.`}
        </div>
      )}
    </div>
  );
}
