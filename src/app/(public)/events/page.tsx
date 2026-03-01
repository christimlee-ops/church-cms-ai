import { prisma } from "@/lib/prisma";
import { FiCalendar, FiRepeat } from "react-icons/fi";
import { startOfDay } from "date-fns";
import EventsCalendar from "@/components/events/EventsCalendar";
import EventCard from "@/components/events/EventCard";

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
      take: 20,
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

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-church-light to-church-cream section-padding">
        <div className="container-wide mx-auto text-center">
          <h1 className="mb-4">Upcoming Events</h1>
          <p className="text-lg text-secondary-500 max-w-2xl mx-auto">
            Stay connected with what&apos;s happening at St. Mark Lutheran Church.
          </p>
        </div>
      </section>

      {/* Weekly Schedule */}
      {recurringEvents.length > 0 && (
        <section className="section-padding bg-church-cream">
          <div className="container-wide mx-auto">
            <div className="flex items-center justify-center gap-2 mb-8">
              <FiRepeat className="w-5 h-5 text-primary-500" />
              <h2 className="text-center !mb-0">Weekly Schedule</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recurringEvents.map((event) => (
                <EventCard
                  key={event.id}
                  slug={event.slug}
                  title={event.title}
                  startDate={event.startDate}
                  allDay={event.allDay}
                  location={event.location}
                  featuredImage={event.featuredImage}
                  recurring={event.recurring}
                  recurringDays={event.recurringDays}
                  recurringTime={event.recurringTime}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Calendar */}
      <section className="section-padding bg-white">
        <div className="container-wide mx-auto">
          <EventsCalendar />
        </div>
      </section>

      {/* Event card list */}
      <section className="section-padding bg-church-light">
        <div className="container-wide mx-auto">
          <h2 className="text-center mb-10">All Upcoming Events</h2>

          {events.length === 0 ? (
            <div className="text-center py-16">
              <FiCalendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl text-secondary-400">No upcoming events</h3>
              <p className="text-secondary-400 mt-2">Check back soon for new events!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <EventCard
                  key={event.id}
                  slug={event.slug}
                  title={event.title}
                  startDate={event.startDate}
                  allDay={event.allDay}
                  location={event.location}
                  featuredImage={event.featuredImage}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
