import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/members/profile - Get own member profile
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = session.user as { id: string; role: string };

    const profile = await prisma.memberProfile.findUnique({
      where: { userId: id },
    });

    if (!profile) {
      return NextResponse.json({
        userId: id,
        phone: null,
        address: null,
        birthday: null,
        photoUrl: null,
        bio: null,
        family: null,
        joinDate: null,
        isVisible: true,
      });
    }

    return NextResponse.json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

// PUT /api/members/profile - Update own profile
export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = session.user as { id: string; role: string };

    const body = await req.json();
    const { phone, address, birthday, bio, family, photoUrl, isVisible } = body;

    const profile = await prisma.memberProfile.upsert({
      where: { userId: id },
      create: {
        userId: id,
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
    });

    return NextResponse.json(profile);
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
