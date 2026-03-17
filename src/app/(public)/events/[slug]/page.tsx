import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import Image from "next/image";
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
      {/* Hero with event image or gradient */}
      {event.featuredImage ? (
        <section className="relative bg-black text-white overflow-hidden h-[280px] md:h-[360px] flex items-end">
          <div className="absolute inset-0">
            <Image src={event.featuredImage} alt={event.title} fill className="object-cover" priority sizes="100vw" />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="relative w-full px-4 pb-8 pt-4">
            <div className="container-wide mx-auto">
              <Link href="/events" className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 font-semibold text-sm mb-4 transition-colors">
                <FiArrowLeft /> Back to Events
              </Link>
              <h1 className="text-white mb-3">{event.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-navy-100">
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
          </div>
        </section>
      ) : (
        <section className="page-hero">
          <div className="absolute inset-0">
            <Image src="/images/candles.jpg" alt="Events at Calvary Lutheran Church" fill className="object-cover" priority sizes="100vw" />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="relative section-padding w-full">
            <div className="container-wide mx-auto">
              <Link href="/events" className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 font-semibold text-sm mb-4 transition-colors">
                <FiArrowLeft /> Back to Events
              </Link>
              <h1 className="text-white mb-3">{event.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-navy-100">
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
          </div>
        </section>
      )}

      <section className="section-padding bg-church-cream">
        <div className="container-wide mx-auto">
          <div className="prose-church max-w-none" dangerouslySetInnerHTML={{ __html: event.description }} />
        </div>
      </section>
    </>
  );
}
