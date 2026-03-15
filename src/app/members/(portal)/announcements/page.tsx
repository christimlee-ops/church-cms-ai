"use client";

import { useEffect, useState } from "react";
import AnnouncementCard from "@/components/members/AnnouncementCard";

interface Announcement {
  id: string;
  title: string;
  content: string;
  pinned: boolean;
  createdAt: string;
  author: {
    name: string;
  };
}

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/members/announcements")
      .then((res) => res.json())
      .then((data) => {
        setAnnouncements(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const pinnedAnnouncements = announcements.filter((a) => a.pinned);
  const regularAnnouncements = announcements.filter((a) => !a.pinned);
  const sortedAnnouncements = [...pinnedAnnouncements, ...regularAnnouncements];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-heading font-bold text-secondary-900">
          Announcements
        </h1>
        <p className="text-secondary-500 mt-1">
          Stay up to date with the latest news from Calvary.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-4 border-navy-500 border-t-gold-500 rounded-full animate-spin" />
        </div>
      ) : sortedAnnouncements.length > 0 ? (
        <div className="space-y-4">
          {sortedAnnouncements.map((announcement) => (
            <AnnouncementCard
              key={announcement.id}
              announcement={announcement}
            />
          ))}
        </div>
      ) : (
        <div className="card p-8 text-center text-secondary-500">
          No announcements yet.
        </div>
      )}
    </div>
  );
}
