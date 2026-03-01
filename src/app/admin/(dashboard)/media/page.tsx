import { prisma } from "@/lib/prisma";
import MediaLibrary from "./MediaLibrary";

async function getMedia() {
  try {
    return await prisma.media.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    });
  } catch {
    return [];
  }
}

export default async function AdminMediaPage() {
  const media = await getMedia();

  return <MediaLibrary initialMedia={JSON.parse(JSON.stringify(media))} />;
}
