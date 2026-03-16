import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/members/[id] - Get single member
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { role } = session.user as { id: string; role: string };
    if (!["ADMIN", "EDITOR", "MEMBER"].includes(role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = params;

    const member = await prisma.user.findUnique({
      where: { id },
      include: { memberProfile: true },
    });

    if (!member || member.role !== "MEMBER") {
      return NextResponse.json({ error: "Member not found" }, { status: 404 });
    }

    if (role !== "ADMIN" && member.memberProfile && !member.memberProfile.isVisible) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 });
    }

    const { password: _pw, ...sanitized } = member; // eslint-disable-line @typescript-eslint/no-unused-vars

    return NextResponse.json(sanitized);
  } catch (error) {
    console.error("Error fetching member:", error);
    return NextResponse.json(
      { error: "Failed to fetch member" },
      { status: 500 }
    );
  }
}

// PUT /api/members/[id] - Update member (ADMIN only)
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { role } = session.user as { id: string; role: string };
    if (role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = params;
    const body = await req.json();
    const { name, email, phone, address, birthday, bio, family, photoUrl, isVisible } = body;

    const existing = await prisma.user.findUnique({
      where: { id },
      include: { memberProfile: true },
    });

    if (!existing || existing.role !== "MEMBER") {
      return NextResponse.json({ error: "Member not found" }, { status: 404 });
    }

    if (email && email !== existing.email) {
      const emailTaken = await prisma.user.findUnique({ where: { email } });
      if (emailTaken) {
        return NextResponse.json(
          { error: "A user with this email already exists" },
          { status: 409 }
        );
      }
    }

    const user = await prisma.user.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(email !== undefined && { email }),
        memberProfile: {
          upsert: {
            create: {
              phone: phone || null,
              address: address || null,
              birthday: birthday ? new Date(birthday) : null,
              bio: bio || null,
              family: family || null,
              photoUrl: photoUrl || null,
              isVisible: isVisible ?? true,
            },
            update: {
              ...(phone !== undefined && { phone }),
              ...(address !== undefined && { address }),
              ...(birthday !== undefined && { birthday: birthday ? new Date(birthday) : null }),
              ...(bio !== undefined && { bio }),
              ...(family !== undefined && { family }),
              ...(photoUrl !== undefined && { photoUrl }),
              ...(isVisible !== undefined && { isVisible }),
            },
          },
        },
      },
      include: { memberProfile: true },
    });

    const { password: _pw2, ...sanitized } = user; // eslint-disable-line @typescript-eslint/no-unused-vars

    return NextResponse.json(sanitized);
  } catch (error) {
    console.error("Error updating member:", error);
    return NextResponse.json(
      { error: "Failed to update member" },
      { status: 500 }
    );
  }
}

// DELETE /api/members/[id] - Delete member (ADMIN only)
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { role } = session.user as { id: string; role: string };
    if (role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = params;

    const existing = await prisma.user.findUnique({ where: { id } });
    if (!existing || existing.role !== "MEMBER") {
      return NextResponse.json({ error: "Member not found" }, { status: 404 });
    }

    await prisma.user.delete({ where: { id } });

    return NextResponse.json({ message: "Member deleted successfully" });
  } catch (error) {
    console.error("Error deleting member:", error);
    return NextResponse.json(
      { error: "Failed to delete member" },
      { status: 500 }
    );
  }
}
