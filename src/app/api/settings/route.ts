import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    let settings = await prisma.siteSettings.findUnique({
      where: { id: "default" },
    });

    if (!settings) {
      settings = await prisma.siteSettings.create({
        data: { id: "default" },
      });
    }

    return NextResponse.json(settings);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();

    const settings = await prisma.siteSettings.upsert({
      where: { id: "default" },
      update: {
        churchName: body.churchName,
        tagline: body.tagline,
        email: body.email,
        phone: body.phone,
        address: body.address,
        logoUrl: body.logoUrl,
        heroImageUrl: body.heroImageUrl,
        vimeoUserId: body.vimeoUserId,
        facebookUrl: body.facebookUrl,
        instagramUrl: body.instagramUrl,
        gaTrackingId: body.gaTrackingId,
        gaPropertyId: body.gaPropertyId,
      },
      create: {
        id: "default",
        churchName: body.churchName,
        tagline: body.tagline,
        email: body.email,
        phone: body.phone,
        address: body.address,
        vimeoUserId: body.vimeoUserId,
        facebookUrl: body.facebookUrl,
        instagramUrl: body.instagramUrl,
        gaTrackingId: body.gaTrackingId,
        gaPropertyId: body.gaPropertyId,
      },
    });

    return NextResponse.json(settings);
  } catch {
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    );
  }
}
