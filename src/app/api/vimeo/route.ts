import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface VimeoApiVideo {
  id: number;
  title: string;
  description: string;
  thumbnail_large: string;
  upload_date: string;
  user_id: number;
}

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = process.env.VIMEO_USER_ID;

  if (!userId) {
    return NextResponse.json(
      { error: "Vimeo User ID must be configured" },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(`https://vimeo.com/api/v2/${userId}/videos.json`);
    const data: VimeoApiVideo[] = await res.json();

    if (!Array.isArray(data) || data.length === 0) {
      return NextResponse.json({ error: "No videos found" }, { status: 404 });
    }

    let synced = 0;
    for (const video of data) {
      const vimeoId = String(video.id);

      await prisma.vimeoVideo.upsert({
        where: { vimeoId },
        update: {
          title: video.title,
          description: video.description,
          thumbnail: video.thumbnail_large,
          publishedAt: new Date(video.upload_date),
        },
        create: {
          vimeoId,
          title: video.title,
          description: video.description,
          thumbnail: video.thumbnail_large,
          publishedAt: new Date(video.upload_date),
          channelId: userId,
        },
      });
      synced++;
    }

    return NextResponse.json({ synced });
  } catch {
    return NextResponse.json({ error: "Failed to sync videos" }, { status: 500 });
  }
}
