import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

// GET /api/members - List all members
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { role } = session.user as { id: string; role: string };
    if (!["ADMIN", "EDITOR", "MEMBER"].includes(role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const isAdmin = role === "ADMIN";

    const members = await prisma.user.findMany({
      where: {
        role: "MEMBER",
        ...(isAdmin
          ? {}
          : { memberProfile: { isVisible: true } }),
      },
      include: {
        memberProfile: true,
      },
      orderBy: { name: "asc" },
    });

    // Strip password from response
    const sanitized = members.map(({ password: _pw, ...rest }) => rest); // eslint-disable-line @typescript-eslint/no-unused-vars

    return NextResponse.json(sanitized);
  } catch (error) {
    console.error("Error fetching members:", error);
    return NextResponse.json(
      { error: "Failed to fetch members" },
      { status: 500 }
    );
  }
}

// POST /api/members - Create new member (ADMIN only)
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { role } = session.user as { id: string; role: string };
    if (role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const { name, email, password, phone, address, birthday, bio, family, photoUrl } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "A user with this email already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "MEMBER",
        memberProfile: {
          create: {
            phone: phone || null,
            address: address || null,
            birthday: birthday ? new Date(birthday) : null,
            bio: bio || null,
            family: family || null,
            photoUrl: photoUrl || null,
            isVisible: true,
          },
        },
      },
      include: {
        memberProfile: true,
      },
    });

    const { password: _pw2, ...sanitized } = user; // eslint-disable-line @typescript-eslint/no-unused-vars

    return NextResponse.json(sanitized, { status: 201 });
  } catch (error) {
    console.error("Error creating member:", error);
    return NextResponse.json(
      { error: "Failed to create member" },
      { status: 500 }
    );
  }
}
