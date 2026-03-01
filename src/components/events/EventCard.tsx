import Link from "next/link";
import { FiCalendar, FiMapPin, FiClock, FiRepeat } from "react-icons/fi";
import { format } from "date-fns";
import { formatRecurringSchedule } from "@/lib/recurrence";

interface EventCardProps {
  slug: string;
  title: string;
  startDate: Date;
  allDay: boolean;
  location: string | null;
  featuredImage: string | null;
  recurring?: string | null;
  recurringDays?: string | null;
  recurringTime?: string | null;
}

export default function EventCard({ slug, title, startDate, allDay, location, featuredImage, recurring, recurringDays, recurringTime }: EventCardProps) {
  return (
    <Link href={`/events/${slug}`} className="card group">
      {featuredImage && (
        <div className="aspect-video bg-church-light overflow-hidden">
          <img
            src={featuredImage}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-6">
        {recurring ? (
          <div className="flex items-center gap-2 text-primary-500 text-sm font-medium mb-2">
            <FiRepeat className="w-4 h-4" />
            {formatRecurringSchedule(recurring, recurringDays ?? null, recurringTime ?? null)}
          </div>
        ) : (
          <div className="flex items-center gap-2 text-primary-500 text-sm font-medium mb-2">
            <FiCalendar className="w-4 h-4" />
            {format(new Date(startDate), "EEEE, MMMM d, yyyy")}
          </div>
        )}
        <h3 className="text-xl mb-2 group-hover:text-primary-500 transition-colors">{title}</h3>
        {location && (
          <p className="flex items-center gap-2 text-secondary-400 text-sm">
            <FiMapPin className="w-4 h-4" /> {location}
          </p>
        )}
        {!recurring && !allDay && (
          <p className="flex items-center gap-2 text-secondary-400 text-sm mt-1">
            <FiClock className="w-4 h-4" /> {format(new Date(startDate), "h:mm a")}
          </p>
        )}
      </div>
    </Link>
  );
}
