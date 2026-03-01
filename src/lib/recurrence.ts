import { addDays, differenceInWeeks } from "date-fns";

export interface RecurringEvent {
  id: string;
  title: string;
  slug: string;
  startDate: Date | string;
  endDate: Date | string | null;
  allDay: boolean;
  location: string | null;
  category: string | null;
  recurring: string | null;
  recurringDays: string | null;
  recurringTime: string | null;
  recurringEndTime: string | null;
}

export interface CalendarOccurrence {
  id: string;
  eventId: string;
  title: string;
  slug: string;
  startDate: string;
  endDate: string | null;
  allDay: boolean;
  location: string | null;
  category: string | null;
  isRecurring: boolean;
}

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/**
 * Generate virtual occurrences of a recurring event within a date range.
 * Non-recurring events are returned as-is (single occurrence).
 */
export function generateOccurrences(
  event: RecurringEvent,
  rangeStart: Date,
  rangeEnd: Date
): CalendarOccurrence[] {
  if (!event.recurring) {
    // Non-recurring: return as a single occurrence if it falls in range
    const start = new Date(event.startDate);
    const end = event.endDate ? new Date(event.endDate) : start;
    if (start < rangeEnd && end >= rangeStart) {
      return [{
        id: event.id,
        eventId: event.id,
        title: event.title,
        slug: event.slug,
        startDate: start.toISOString(),
        endDate: event.endDate ? end.toISOString() : null,
        allDay: event.allDay,
        location: event.location,
        category: event.category,
        isRecurring: false,
      }];
    }
    return [];
  }

  const occurrences: CalendarOccurrence[] = [];
  const eventStart = new Date(event.startDate);
  const days: number[] = event.recurringDays ? JSON.parse(event.recurringDays) : [];

  // Iterate day-by-day through the range
  let current = new Date(Math.max(rangeStart.getTime(), eventStart.getTime()));
  // Align to start of day
  current = new Date(current.getFullYear(), current.getMonth(), current.getDate());

  while (current < rangeEnd) {
    const dayOfWeek = current.getDay();
    let match = false;

    if (event.recurring === "weekly") {
      match = days.includes(dayOfWeek);
    } else if (event.recurring === "biweekly") {
      if (days.includes(dayOfWeek)) {
        const weeksDiff = differenceInWeeks(current, eventStart);
        match = weeksDiff >= 0 && weeksDiff % 2 === 0;
      }
    } else if (event.recurring === "monthly") {
      match = current.getDate() === eventStart.getDate();
    }

    if (match) {
      const dateStr = formatDateStr(current);
      const startISO = event.recurringTime
        ? new Date(`${dateStr}T${event.recurringTime}:00`).toISOString()
        : new Date(dateStr).toISOString();
      const endISO = event.recurringEndTime
        ? new Date(`${dateStr}T${event.recurringEndTime}:00`).toISOString()
        : null;

      occurrences.push({
        id: `${event.id}_${dateStr}`,
        eventId: event.id,
        title: event.title,
        slug: event.slug,
        startDate: startISO,
        endDate: endISO,
        allDay: event.allDay,
        location: event.location,
        category: event.category,
        isRecurring: true,
      });
    }

    current = addDays(current, 1);
  }

  return occurrences;
}

/** Format a Date as "YYYY-MM-DD" */
function formatDateStr(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/**
 * Build a human-readable schedule string for a recurring event.
 * e.g. "Every Sunday at 10:00 AM" or "Every Sun & Wed at 7:00 PM"
 */
export function formatRecurringSchedule(
  recurring: string,
  recurringDays: string | null,
  recurringTime: string | null
): string {
  const days: number[] = recurringDays ? JSON.parse(recurringDays) : [];
  const dayNames = days.map((d) => DAY_NAMES[d]);

  let prefix = "Every";
  if (recurring === "biweekly") prefix = "Every other";
  if (recurring === "monthly") prefix = "Monthly on the";

  let schedule = prefix;
  if (recurring === "monthly") {
    // Monthly doesn't use day names — uses day-of-month from startDate
    schedule = "Monthly";
  } else if (dayNames.length > 0) {
    schedule += ` ${dayNames.join(" & ")}`;
  }

  if (recurringTime) {
    const timeStr = formatTime12h(recurringTime);
    schedule += ` at ${timeStr}`;
  }

  return schedule;
}

/** Convert "HH:mm" to "h:mm AM/PM" */
function formatTime12h(time: string): string {
  const [hStr, mStr] = time.split(":");
  let h = parseInt(hStr, 10);
  const ampm = h >= 12 ? "PM" : "AM";
  if (h === 0) h = 12;
  else if (h > 12) h -= 12;
  return `${h}:${mStr} ${ampm}`;
}
