import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const userRole = (session?.user as { role?: string })?.role;

  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const visibility = searchParams.get("visibility");

  try {
    // Build visibility filter based on auth
    let visibilityFilter: string[] = ["PUBLIC"];
    if (userRole === "MEMBER") {
      visibilityFilter = ["PUBLIC", "MEMBERS_ONLY"];
    } else if (userRole === "ADMIN" || userRole === "EDITOR") {
      visibilityFilter = ["PUBLIC", "MEMBERS_ONLY", "ADMIN_ONLY"];
    }

    const where: Record<string, unknown> = {
      visibility: { in: visibility ? [visibility] : visibilityFilter },
    };

    if (category) {
      where.category = category;
    }

    const documents = await prisma.document.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: { author: { select: { name: true } } },
    });

    return NextResponse.json(documents);
  } catch {
    return NextResponse.json({ error: "Failed to fetch documents" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userRole = (session.user as { role?: string })?.role;
  if (userRole !== "ADMIN" && userRole !== "EDITOR") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const document = await prisma.document.create({
      data: {
        title: body.title,
        description: body.description || null,
        filename: body.filename,
        url: body.url,
        mimeType: body.mimeType,
        size: body.size,
        category: body.category || "OTHER",
        visibility: body.visibility || "PUBLIC",
        publishedAt: body.publishedAt ? new Date(body.publishedAt) : new Date(),
        authorId: (session.user as { id: string }).id,
      },
    });
    return NextResponse.json(document, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create document" }, { status: 500 });
  }
}
