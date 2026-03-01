import { prisma } from "@/lib/prisma";
import { FiVideo, FiRefreshCw, FiStar } from "react-icons/fi";
import { format } from "date-fns";
import Link from "next/link";

async function getVideos() {
  try {
    return await prisma.vimeoVideo.findMany({
      orderBy: { publishedAt: "desc" },
      take: 50,
    });
  } catch {
    return [];
  }
}

export default async function AdminVimeoPage() {
  const videos = await getVideos();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-secondary-800">Vimeo Integration</h1>
          <p className="text-secondary-500 mt-1">Manage sermon videos from Vimeo</p>
        </div>
        <form action="/api/vimeo" method="POST">
          <button type="submit" className="btn-primary">
            <FiRefreshCw className="w-5 h-5" /> Sync Videos
          </button>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <h3 className="text-lg font-semibold text-secondary-800 mb-2">Setup</h3>
        <p className="text-secondary-500 text-sm">
          Configure your Vimeo User ID in the{" "}
          <Link href="/admin/settings" className="text-primary-500 hover:underline">Settings</Link>
          {" "}page to sync videos automatically.
        </p>
      </div>

      {videos.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
          <FiVideo className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-secondary-400">No videos synced yet. Click &quot;Sync Videos&quot; to import from Vimeo.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div key={video.id} className="card">
              <div className="aspect-video bg-secondary-800 relative overflow-hidden">
                {video.thumbnail ? (
                  <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full"><FiVideo className="w-12 h-12 text-gray-500" /></div>
                )}
                {video.featured && (
                  <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 rounded-full p-1.5"><FiStar className="w-4 h-4" /></div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold line-clamp-2">{video.title}</h3>
                <p className="text-secondary-400 text-xs mt-1">{format(new Date(video.publishedAt), "MMM d, yyyy")}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
