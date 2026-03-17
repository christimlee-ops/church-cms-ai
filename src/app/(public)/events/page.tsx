import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { FiCalendar } from "react-icons/fi";
import { startOfDay, addMonths } from "date-fns";
import EventsCalendar from "@/components/events/EventsCalendar";
import EventGrid from "@/components/events/EventGrid";
import { generateOccurrences } from "@/lib/recurrence";

export const metadata = {
  title: "Events & Activities | Calvary Lutheran Church Chandler AZ",
  description: "Upcoming events, worship services, Bible studies, and community activities at Calvary Lutheran Church in Chandler, Arizona. Join us!",
};

async function getAllExpandedEvents() {
  const today = startOfDay(new Date());
  const rangeEnd = addMonths(today, 3); // Show next 3 months

  try {
    const [oneTimeEvents, recurringEvents] = await Promise.all([
      prisma.event.findMany({
        where: {
          status: "UPCOMING",
          recurring: null,
          OR: [
            { endDate: { gte: today } },
            { endDate: null, startDate: { gte: today } },
          ],
        },
        orderBy: { startDate: "asc" },
        take: 50,
      }),
      prisma.event.findMany({
        where: {
          status: "UPCOMING",
          recurring: { not: null },
        },
      }),
    ]);

    // Expand recurring events into individual occurrences
    const expandedRecurring = recurringEvents.flatMap((event) =>
      generateOccurrences(event, today, rangeEnd).map((occ) => ({
        id: occ.id,
        slug: occ.slug,
        title: occ.title,
        startDate: new Date(occ.startDate),
        endDate: occ.endDate ? new Date(occ.endDate) : null,
        allDay: occ.allDay,
        location: occ.location,
        featuredImage: event.featuredImage,
        recurring: null as string | null, // Treat as normal dated event
        recurringDays: null as string | null,
        recurringTime: null as string | null,
      }))
    );

    // Merge and sort by date
    const allEvents = [
      ...oneTimeEvents.map((e) => ({
        id: e.id,
        slug: e.slug,
        title: e.title,
        startDate: e.startDate,
        endDate: e.endDate,
        allDay: e.allDay,
        location: e.location,
        featuredImage: e.featuredImage,
        recurring: null as string | null,
        recurringDays: null as string | null,
        recurringTime: null as string | null,
      })),
      ...expandedRecurring,
    ].sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

    return allEvents;
  } catch {
    return [];
  }
}

export default async function EventsPage() {
  const allEvents = await getAllExpandedEvents();

  return (
    <>
      {/* Hero */}
      <section className="page-hero">
        <div className="absolute inset-0">
          <Image src="/images/church-event.webp" alt="Events at Calvary Lutheran Church Chandler AZ" fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative section-padding w-full">
          <div className="container-wide mx-auto text-center">
            <h1 className="text-white mb-4">Upcoming Events</h1>
            <p className="text-lg text-navy-100 max-w-2xl mx-auto">
              Stay connected with what&apos;s happening at Calvary Lutheran Church.
            </p>
          </div>
        </div>
      </section>

      {/* Calendar */}
      <section className="section-padding bg-church-cream">
        <div className="container-wide mx-auto">
          <EventsCalendar />
        </div>
      </section>

      {/* All Events */}
      <section className="section-padding bg-church-light">
        <div className="container-wide mx-auto">
          <h2 className="text-center mb-10">All Upcoming Events</h2>

          {allEvents.length === 0 ? (
            <div className="text-center py-16">
              <FiCalendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl text-secondary-400">No upcoming events</h3>
              <p className="text-secondary-400 mt-2">Check back soon for new events!</p>
            </div>
          ) : (
            <EventGrid events={allEvents} perPage={8} />
          )}
        </div>
      </section>
    </>
  );
}
