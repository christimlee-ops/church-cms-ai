import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { FiCalendar, FiClock, FiMapPin, FiArrowLeft, FiRepeat } from "react-icons/fi";
import Link from "next/link";
import { formatRecurringSchedule } from "@/lib/recurrence";

async function getEvent(slug: string) {
  try {
    return await prisma.event.findUnique({
      where: { slug },
      include: { author: { select: { name: true } } },
    });
  } catch {
    return null;
  }
}

export default async function EventDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const event = await getEvent(params.slug);

  if (!event) notFound();

  return (
    <>
      <section className="bg-gradient-to-b from-church-light to-church-cream section-padding">
        <div className="container-wide mx-auto">
          <Link href="/events" className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 mb-6">
            <FiArrowLeft /> Back to Events
          </Link>
          <h1 className="mb-4">{event.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-secondary-400">
            {event.recurring ? (
              <span className="flex items-center gap-2">
                <FiRepeat className="w-4 h-4" />
                {formatRecurringSchedule(event.recurring, event.recurringDays, event.recurringTime)}
              </span>
            ) : (
              <>
                <span className="flex items-center gap-2">
                  <FiCalendar className="w-4 h-4" />
                  {format(new Date(event.startDate), "EEEE, MMMM d, yyyy")}
                </span>
                {!event.allDay && (
                  <span className="flex items-center gap-2">
                    <FiClock className="w-4 h-4" />
                    {format(new Date(event.startDate), "h:mm a")}
                    {event.endDate && ` – ${format(new Date(event.endDate), "h:mm a")}`}
                  </span>
                )}
              </>
            )}
            {event.location && (
              <span className="flex items-center gap-2">
                <FiMapPin className="w-4 h-4" />
                {event.location}
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="section-padding bg-church-cream">
        <div className="container-wide mx-auto">
          {event.featuredImage && (
            <img src={event.featuredImage} alt={event.title} className="w-full rounded-xl mb-10" />
          )}
          <div className="prose-church" dangerouslySetInnerHTML={{ __html: event.description }} />
        </div>
      </section>
    </>
  );
}
