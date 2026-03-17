import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { FiCalendar } from "react-icons/fi";
import { startOfDay } from "date-fns";
import EventsCalendar from "@/components/events/EventsCalendar";
import EventGrid from "@/components/events/EventGrid";

export const metadata = { title: "Events" };

async function getEvents() {
  const today = startOfDay(new Date());
  try {
    return await prisma.event.findMany({
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
    });
  } catch {
    return [];
  }
}

async function getRecurringEvents() {
  try {
    return await prisma.event.findMany({
      where: {
        status: "UPCOMING",
        recurring: { not: null },
      },
      orderBy: { title: "asc" },
    });
  } catch {
    return [];
  }
}

export default async function EventsPage() {
  const [events, recurringEvents] = await Promise.all([
    getEvents(),
    getRecurringEvents(),
  ]);

  const allEvents = [...recurringEvents, ...events];

  return (
    <>
      {/* Hero */}
      <section className="page-hero">
        <div className="absolute inset-0">
          <Image src="/images/church-event.webp" alt="Events at Calvary Lutheran Church" fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-navy-900/50" />
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
