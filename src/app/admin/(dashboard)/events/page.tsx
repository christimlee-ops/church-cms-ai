import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { FiPlus } from "react-icons/fi";
import EventsTable from "./EventsTable";

async function archiveAndGetEvents() {
  try {
    // Auto-archive past events (skip recurring events)
    const now = new Date();
    await prisma.event.updateMany({
      where: {
        status: { in: ["UPCOMING", "ONGOING"] },
        recurring: null,
        OR: [
          { endDate: { not: null, lt: now } },
          { endDate: null, startDate: { lt: now } },
        ],
      },
      data: { status: "COMPLETED" },
    });

    return await prisma.event.findMany({
      orderBy: { startDate: "desc" },
      include: { author: { select: { name: true } } },
    });
  } catch {
    return [];
  }
}

export default async function AdminEventsPage() {
  const events = await archiveAndGetEvents();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-secondary-800">Events</h1>
          <p className="text-secondary-500 mt-1">Manage church events</p>
        </div>
        <Link href="/admin/events/new" className="btn-primary">
          <FiPlus className="w-5 h-5" /> New Event
        </Link>
      </div>

      <EventsTable events={JSON.parse(JSON.stringify(events))} />
    </div>
  );
}
