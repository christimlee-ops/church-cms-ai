"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  isWithinInterval,
  parseISO,
} from "date-fns";
import { FiChevronLeft, FiChevronRight, FiMapPin, FiClock, FiX, FiRepeat } from "react-icons/fi";

interface CalendarEvent {
  id: string;
  eventId?: string;
  title: string;
  slug: string;
  startDate: string;
  endDate: string | null;
  allDay: boolean;
  location: string | null;
  category: string | null;
  isRecurring?: boolean;
}

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DAY_LABELS_SHORT = ["S", "M", "T", "W", "T", "F", "S"];

/** Max events to show inline per day cell before "+N more" */
const MAX_VISIBLE_DESKTOP = 3;

export default function EventsCalendar() {
  const [currentMonth, setCurrentMonth] = useState(() => startOfMonth(new Date()));
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);

  const fetchEvents = useCallback(async (date: Date) => {
    setLoading(true);
    try {
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const res = await fetch(`/api/events/calendar?month=${month}&year=${year}`);
      if (res.ok) {
        setEvents(await res.json());
      }
    } catch {
      // Silently fail — calendar will just show no events
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents(currentMonth);
  }, [currentMonth, fetchEvents]);

  // Close modal on Escape key
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setSelectedDate(null);
    }
    if (selectedDate) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [selectedDate]);

  const goToToday = () => {
    const today = startOfMonth(new Date());
    setCurrentMonth(today);
    setSelectedDate(new Date());
  };

  // Build the calendar grid — full weeks from Sunday to Saturday
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const gridStart = startOfWeek(monthStart);
  const gridEnd = endOfWeek(monthEnd);

  const days: Date[] = [];
  let day = gridStart;
  while (day <= gridEnd) {
    days.push(day);
    day = addDays(day, 1);
  }

  const today = new Date();

  // Get events for a specific day
  function eventsForDay(d: Date): CalendarEvent[] {
    return events.filter((ev) => {
      const start = parseISO(ev.startDate);
      const end = ev.endDate ? parseISO(ev.endDate) : start;
      return isWithinInterval(d, { start: startOfDay(start), end: startOfDay(end) });
    });
  }

  const selectedEvents = selectedDate ? eventsForDay(selectedDate) : [];

  return (
    <div className="w-full">
      {/* Header with navigation */}
      <div className="bg-navy-500 rounded-t-xl px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
        <button
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="text-white hover:text-gold-300 transition-colors p-1"
          aria-label="Previous month"
        >
          <FiChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        <div className="flex items-center gap-3 md:gap-4">
          <h3 className="text-white text-lg md:text-2xl font-semibold !mb-0">
            {format(currentMonth, "MMMM yyyy")}
          </h3>
          <button
            onClick={goToToday}
            className="text-xs md:text-sm bg-navy-400 hover:bg-navy-300 text-white px-2 md:px-3 py-0.5 md:py-1 rounded transition-colors"
          >
            Today
          </button>
        </div>
        <button
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="text-white hover:text-gold-300 transition-colors p-1"
          aria-label="Next month"
        >
          <FiChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>

      {/* Day-of-week headers */}
      <div className="grid grid-cols-7 bg-navy-50 border-x border-navy-100">
        {DAY_LABELS.map((label, idx) => (
          <div key={label} className="py-2 md:py-3 text-center text-xs md:text-sm font-semibold text-navy-500 uppercase tracking-wide">
            <span className="hidden md:inline">{label}</span>
            <span className="md:hidden">{DAY_LABELS_SHORT[idx]}</span>
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 border-x border-b border-navy-100 rounded-b-xl overflow-hidden bg-white">
        {days.map((d, i) => {
          const inMonth = isSameMonth(d, currentMonth);
          const isToday = isSameDay(d, today);
          const isSelected = selectedDate ? isSameDay(d, selectedDate) : false;
          const dayEvents = !loading ? eventsForDay(d) : [];
          const hasEvents = dayEvents.length > 0;
          const visibleEvents = dayEvents.slice(0, MAX_VISIBLE_DESKTOP);
          const extraCount = dayEvents.length - MAX_VISIBLE_DESKTOP;

          return (
            <button
              key={i}
              onClick={() => setSelectedDate(isSelected ? null : d)}
              className={`
                relative flex flex-col items-start
                min-h-[52px] md:min-h-[130px] p-1 md:p-2 border-t border-navy-50
                transition-colors duration-150 text-left
                ${inMonth ? "hover:bg-church-cream" : "bg-gray-50/50"}
                ${isSelected ? "bg-church-cream ring-2 ring-inset ring-navy-400" : ""}
              `}
            >
              {/* Day number */}
              <span
                className={`
                  inline-flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-full text-xs md:text-base shrink-0
                  ${!inMonth ? "text-gray-300" : "text-navy-800"}
                  ${isToday ? "font-bold bg-gold-500 text-white" : ""}
                  ${isSelected && !isToday ? "bg-navy-500 text-white" : ""}
                `}
              >
                {format(d, "d")}
              </span>

              {/* Mobile: event dot indicators */}
              {hasEvents && (
                <div className="flex gap-0.5 mt-0.5 md:hidden justify-center w-full flex-wrap">
                  {dayEvents.slice(0, 3).map((ev) => (
                    <span key={ev.id} className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                  ))}
                  {dayEvents.length > 3 && (
                    <span className="w-1.5 h-1.5 rounded-full bg-navy-300" />
                  )}
                </div>
              )}

              {/* Desktop: inline event list with wrapping text */}
              <div className="hidden md:flex w-full flex-col gap-0.5 overflow-hidden flex-1 mt-1">
                {visibleEvents.map((ev) => (
                  <div
                    key={ev.id}
                    className="rounded px-1.5 py-0.5 bg-gold-100 border-l-2 border-gold-500"
                  >
                    <span className="text-xs text-navy-700 font-medium leading-tight line-clamp-2">
                      {!ev.allDay && (
                        <span className="text-navy-400 mr-1 whitespace-nowrap">
                          {format(parseISO(ev.startDate), "h:mma").toLowerCase()}
                        </span>
                      )}
                      {ev.title}
                    </span>
                  </div>
                ))}
                {extraCount > 0 && (
                  <span className="text-xs text-navy-400 font-medium px-1.5">
                    +{extraCount} more
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Loading indicator */}
      {loading && (
        <div className="text-center py-4 text-secondary-400 text-sm">Loading events...</div>
      )}

      {/* Modal popup for selected day */}
      {selectedDate && !loading && (
        <div
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedDate(null);
          }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          {/* Modal content */}
          <div
            ref={modalRef}
            className="
              relative z-10 bg-white w-full
              md:max-w-lg md:rounded-xl
              rounded-t-2xl
              shadow-2xl
              max-h-[85vh] flex flex-col
              animate-slide-up md:animate-fade-in
            "
          >
            {/* Modal header */}
            <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-navy-100">
              {/* Mobile drag handle */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-gray-300 md:hidden" />

              <div>
                <p className="text-sm text-navy-400 font-medium">
                  {format(selectedDate, "EEEE")}
                </p>
                <h4 className="text-xl font-bold text-navy-800 !mb-0">
                  {format(selectedDate, "MMMM d, yyyy")}
                </h4>
              </div>
              <button
                onClick={() => setSelectedDate(null)}
                className="text-secondary-400 hover:text-navy-800 transition-colors p-2 -mr-2 rounded-full hover:bg-navy-50"
                aria-label="Close"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Modal body */}
            <div className="overflow-y-auto flex-1 px-5 py-4">
              {selectedEvents.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 rounded-full bg-navy-50 flex items-center justify-center mx-auto mb-3">
                    <FiClock className="w-6 h-6 text-navy-300" />
                  </div>
                  <p className="text-secondary-400 text-sm">No events on this day.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {selectedEvents.map((ev) => (
                    <Link
                      key={ev.id}
                      href={`/events/${ev.slug}`}
                      className="block border-l-4 border-gold-500 bg-church-cream/50 rounded-r-lg hover:shadow-md active:scale-[0.98] transition-all p-4"
                    >
                      <p className="font-semibold text-navy-800 text-base">{ev.title}</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-secondary-400">
                        {!ev.allDay && (
                          <span className="flex items-center gap-1.5">
                            <FiClock className="w-4 h-4 text-gold-500" />
                            {format(parseISO(ev.startDate), "h:mm a")}
                            {ev.endDate && (
                              <> &ndash; {format(parseISO(ev.endDate), "h:mm a")}</>
                            )}
                          </span>
                        )}
                        {ev.allDay && (
                          <span className="flex items-center gap-1.5">
                            <FiClock className="w-4 h-4 text-gold-500" />
                            All day
                          </span>
                        )}
                        {ev.location && (
                          <span className="flex items-center gap-1.5">
                            <FiMapPin className="w-4 h-4 text-gold-500" />
                            {ev.location}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {ev.isRecurring && (
                          <span className="inline-flex items-center gap-1 text-xs font-medium bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                            <FiRepeat className="w-3 h-3" /> Recurring
                          </span>
                        )}
                        {ev.category && (
                          <span className="inline-block text-xs font-medium capitalize bg-gold-100 text-gold-700 px-2 py-0.5 rounded-full">
                            {ev.category}
                          </span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Modal footer */}
            <div className="px-5 py-3 border-t border-navy-100 bg-navy-50/50 rounded-b-xl">
              <button
                onClick={() => setSelectedDate(null)}
                className="w-full md:w-auto text-sm font-medium text-navy-500 hover:text-navy-800 transition-colors py-2 px-4 rounded-lg hover:bg-navy-100"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/** Zero out the time portion of a date for day-level comparison */
function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}
