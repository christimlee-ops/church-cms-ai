import Link from "next/link";
import { FiCalendar, FiMapPin, FiClock } from "react-icons/fi";
import { format } from "date-fns";

interface EventCardProps {
  slug: string;
  title: string;
  startDate: Date;
  allDay: boolean;
  location: string | null;
  featuredImage: string | null;
}

export default function EventCard({ slug, title, startDate, allDay, location, featuredImage }: EventCardProps) {
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
        <div className="flex items-center gap-2 text-secondary-500 text-sm font-medium mb-1">
          <FiCalendar className="w-4 h-4" />
          {format(new Date(startDate), "EEEE, MMMM d, yyyy")}
        </div>
        {!allDay && (
          <div className="flex items-center gap-2 text-secondary-400 text-sm mb-2">
            <FiClock className="w-4 h-4" />
            {format(new Date(startDate), "h:mm a")}
          </div>
        )}
        <h3 className="text-xl mb-2 group-hover:text-gold-600 transition-colors">{title}</h3>
        {location && (
          <p className="flex items-center gap-2 text-secondary-400 text-sm">
            <FiMapPin className="w-4 h-4" /> {location}
          </p>
        )}
      </div>
    </Link>
  );
}
