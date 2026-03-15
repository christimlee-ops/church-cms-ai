"use client";

import { FiMapPin } from "react-icons/fi";

interface AnnouncementCardProps {
  announcement: {
    id: string;
    title: string;
    content: string;
    pinned: boolean;
    createdAt: string;
    author: {
      name: string;
    };
  };
}

export default function AnnouncementCard({ announcement }: AnnouncementCardProps) {
  const formattedDate = new Date(announcement.createdAt).toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  );

  return (
    <div className="card p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {announcement.pinned && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-gold-500/10 text-gold-500 rounded">
                <FiMapPin className="w-3 h-3" />
                Pinned
              </span>
            )}
            <h3 className="font-heading font-semibold text-secondary-900">
              {announcement.title}
            </h3>
          </div>

          <div
            className="text-secondary-600 text-sm mb-3 prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: announcement.content }}
          />

          <div className="flex items-center gap-3 text-xs text-secondary-400">
            <span>{announcement.author.name}</span>
            <span>&middot;</span>
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
