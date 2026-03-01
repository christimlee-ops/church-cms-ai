"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiEdit2, FiEye, FiArchive, FiRotateCcw, FiRepeat } from "react-icons/fi";
import { format } from "date-fns";
import { formatRecurringSchedule } from "@/lib/recurrence";

type Event = {
  id: string;
  title: string;
  slug: string;
  startDate: string;
  allDay: boolean;
  status: string;
  location: string | null;
  recurring: string | null;
  recurringDays: string | null;
  recurringTime: string | null;
};

const TABS = ["All", "Upcoming", "Completed", "Cancelled", "Archived"] as const;
const STATUS_MAP: Record<string, string> = {
  All: "",
  Upcoming: "UPCOMING",
  Completed: "COMPLETED",
  Cancelled: "CANCELLED",
  Archived: "ARCHIVED",
};

export default function EventsTable({ events }: { events: Event[] }) {
  const [activeTab, setActiveTab] = useState<string>("All");
  const [archiving, setArchiving] = useState<string | null>(null);
  const router = useRouter();

  const filtered = activeTab === "All"
    ? events.filter((e) => e.status !== "ARCHIVED")
    : events.filter((e) => e.status === STATUS_MAP[activeTab]);

  const handleArchive = async (id: string) => {
    setArchiving(id);
    try {
      await fetch(`/api/events/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "ARCHIVED" }),
      });
      router.refresh();
    } finally {
      setArchiving(null);
    }
  };

  const handleUnarchive = async (id: string) => {
    setArchiving(id);
    try {
      await fetch(`/api/events/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "UPCOMING" }),
      });
      router.refresh();
    } finally {
      setArchiving(null);
    }
  };

  return (
    <div>
      <div className="flex gap-1 mb-4 bg-gray-100 rounded-lg p-1 w-fit">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab
                ? "bg-white text-secondary-800 shadow-sm"
                : "text-secondary-500 hover:text-secondary-700"
            }`}
          >
            {tab}
            <span className="ml-1.5 text-xs text-secondary-400">
              ({tab === "All"
                ? events.filter((e) => e.status !== "ARCHIVED").length
                : events.filter((e) => e.status === STATUS_MAP[tab]).length})
            </span>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-secondary-400">
            <p>{activeTab === "Archived" ? "No archived events." : "No events found."}</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-medium text-secondary-500">Event</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-secondary-500">Date</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-secondary-500">Status</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-secondary-500">Location</th>
                <th className="text-right px-6 py-3 text-sm font-medium text-secondary-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-secondary-800">
                    <span className="flex items-center gap-1.5">
                      {event.recurring && <FiRepeat className="w-3.5 h-3.5 text-primary-500 shrink-0" />}
                      {event.title}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-secondary-500">
                    {event.recurring
                      ? formatRecurringSchedule(event.recurring, event.recurringDays, event.recurringTime)
                      : <>
                          {format(new Date(event.startDate), "MMM d, yyyy")}
                          {!event.allDay && ` at ${format(new Date(event.startDate), "h:mm a")}`}
                        </>
                    }
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                      event.status === "UPCOMING" ? "bg-blue-100 text-blue-700" :
                      event.status === "ONGOING" ? "bg-green-100 text-green-700" :
                      event.status === "COMPLETED" ? "bg-gray-100 text-gray-700" :
                      event.status === "ARCHIVED" ? "bg-gray-100 text-gray-500" :
                      "bg-red-100 text-red-700"
                    }`}>
                      {event.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-secondary-500">{event.location || "—"}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/events/${event.slug}`} className="p-2 text-gray-400 hover:text-primary-500"><FiEye className="w-4 h-4" /></Link>
                      <Link href={`/admin/events/${event.id}`} className="p-2 text-gray-400 hover:text-primary-500"><FiEdit2 className="w-4 h-4" /></Link>
                      {event.status === "ARCHIVED" ? (
                        <button
                          onClick={() => handleUnarchive(event.id)}
                          disabled={archiving === event.id}
                          className="p-2 text-gray-400 hover:text-green-600 disabled:opacity-50"
                          title="Unarchive event"
                        >
                          <FiRotateCcw className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleArchive(event.id)}
                          disabled={archiving === event.id}
                          className="p-2 text-gray-400 hover:text-amber-600 disabled:opacity-50"
                          title="Archive event"
                        >
                          <FiArchive className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
