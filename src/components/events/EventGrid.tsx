"use client";

import { useState } from "react";
import EventCard from "./EventCard";

interface Event {
  id: string;
  slug: string;
  title: string;
  startDate: Date;
  allDay: boolean;
  location: string | null;
  featuredImage: string | null;
}

interface EventGridProps {
  events: Event[];
  perPage?: number;
}

export default function EventGrid({ events, perPage = 8 }: EventGridProps) {
  const [visible, setVisible] = useState(perPage);

  const shown = events.slice(0, visible);
  const hasMore = visible < events.length;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {shown.map((event) => (
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
      {hasMore && (
        <div className="text-center mt-10">
          <button
            onClick={() => setVisible((v) => v + perPage)}
            className="btn-outline"
          >
            Show More Events
          </button>
        </div>
      )}
    </>
  );
}
