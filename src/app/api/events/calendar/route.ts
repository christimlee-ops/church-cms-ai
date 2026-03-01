import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateOccurrences } from "@/lib/recurrence";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const now = new Date();
  const month = parseInt(searchParams.get("month") ?? String(now.getMonth() + 1), 10);
  const year = parseInt(searchParams.get("year") ?? String(now.getFullYear()), 10);

  if (isNaN(month) || isNaN(year) || month < 1 || month > 12) {
    return NextResponse.json({ error: "Invalid month or year" }, { status: 400 });
  }

  // First day of the requested month and first day of the next month
  const monthStart = new Date(year, month - 1, 1);
  const monthEnd = new Date(year, month, 1);

  try {
    // Fetch one-time events that overlap the month
    const oneTimeEvents = await prisma.event.findMany({
      where: {
        status: { in: ["UPCOMING", "ONGOING"] },
        recurring: null,
        startDate: { lt: monthEnd },
        OR: [
          { endDate: { gte: monthStart } },
          { endDate: null, startDate: { gte: monthStart } },
        ],
      },
      orderBy: { startDate: "asc" },
      select: {
        id: true,
        title: true,
        slug: true,
        startDate: true,
        endDate: true,
        allDay: true,
        location: true,
        category: true,
      },
    });

    // Fetch recurring events that started on or before monthEnd
    const recurringEvents = await prisma.event.findMany({
      where: {
        status: { in: ["UPCOMING", "ONGOING"] },
        recurring: { not: null },
        startDate: { lt: monthEnd },
      },
      select: {
        id: true,
        title: true,
        slug: true,
        startDate: true,
        endDate: true,
        allDay: true,
        location: true,
        category: true,
        recurring: true,
        recurringDays: true,
        recurringTime: true,
        recurringEndTime: true,
      },
    });

    // Generate virtual occurrences for recurring events
    const recurringOccurrences = recurringEvents.flatMap((event) =>
      generateOccurrences(event, monthStart, monthEnd)
    );

    // Map one-time events to the same shape
    const oneTimeOccurrences = oneTimeEvents.map((ev) => ({
      id: ev.id,
      eventId: ev.id,
      title: ev.title,
      slug: ev.slug,
      startDate: ev.startDate.toISOString(),
      endDate: ev.endDate ? ev.endDate.toISOString() : null,
      allDay: ev.allDay,
      location: ev.location,
      category: ev.category,
      isRecurring: false,
    }));

    // Merge, sort by startDate
    const allEvents = [...oneTimeOccurrences, ...recurringOccurrences].sort(
      (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );

    return NextResponse.json(allEvents);
  } catch {
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}
