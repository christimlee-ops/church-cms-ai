import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Auto-archive past events (skip recurring events)
    const now = new Date();
    await prisma.event.updateMany({
      where: {
        status: { in: ["UPCOMING", "ONGOING"] },
        recurring: null,
        OR: [
          { endDate: { not: null, lt: now } },
          { endDate: null, startDate: { lt: now } },
        ],
      },
      data: { status: "COMPLETED" },
    });

    const events = await prisma.event.findMany({
      orderBy: { startDate: "asc" },
      include: { author: { select: { name: true } } },
    });
    return NextResponse.json(events);
  } catch {
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const event = await prisma.event.create({
      data: {
        title: body.title,
        slug: body.slug,
        description: body.description || "",
        location: body.location,
        address: body.address,
        startDate: new Date(body.startDate),
        endDate: body.endDate ? new Date(body.endDate) : null,
        allDay: body.allDay || false,
        recurring: body.recurring || null,
        recurringDays: body.recurringDays || null,
        recurringTime: body.recurringTime || null,
        recurringEndTime: body.recurringEndTime || null,
        category: body.category,
        featuredImage: body.featuredImage,
        authorId: session.user.id,
      },
    });
    return NextResponse.json(event, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}
