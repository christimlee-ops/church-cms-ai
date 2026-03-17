import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { FiPlay, FiVideo } from "react-icons/fi";
import { format } from "date-fns";

export const metadata = { title: "Sermons" };

async function getVideos() {
  try {
    return await prisma.vimeoVideo.findMany({
      orderBy: { publishedAt: "desc" },
      take: 20,
    });
  } catch {
    return [];
  }
}

export default async function SermonsPage() {
  const videos = await getVideos();

  return (
    <>
      <section className="page-hero">
        <div className="absolute inset-0">
          <Image src="/images/Piano.jpg" alt="Worship at Calvary Lutheran Church" fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-navy-900/30" />
        </div>
        <div className="relative section-padding">
          <div className="container-wide mx-auto text-center">
            <h1 className="text-white mb-4">Sermons</h1>
            <p className="text-lg text-navy-100 max-w-2xl mx-auto">
              Watch or re-watch our latest messages from Calvary Lutheran Church. Growing in God&apos;s Word together.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-church-cream">
        <div className="container-wide mx-auto">
          {videos.length === 0 ? (
            <div className="text-center py-16">
              <FiVideo className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl text-secondary-400">No sermons yet</h3>
              <p className="text-secondary-400 mt-2">Connect your Vimeo account in admin settings to display sermons.</p>
            </div>
          ) : (
            <>
              {/* Featured Sermon */}
              {videos[0] && (
                <div className="mb-12">
                  <h2 className="text-2xl mb-6">Latest Sermon</h2>
                  <div className="aspect-video rounded-xl overflow-hidden bg-black">
                    <iframe
                      src={`https://player.vimeo.com/video/${videos[0].vimeoId}`}
                      title={videos[0].title}
                      className="w-full h-full"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <h3 className="text-xl mt-4">{videos[0].title}</h3>
                  <p className="text-secondary-400 text-sm mt-1">
                    {format(new Date(videos[0].publishedAt), "MMMM d, yyyy")}
                  </p>
                </div>
              )}

              {/* Sermon Grid */}
              {videos.length > 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {videos.slice(1).map((video) => (
                    <a
                      key={video.id}
                      href={`https://vimeo.com/${video.vimeoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card group"
                    >
                      <div className="aspect-video bg-secondary-800 relative overflow-hidden">
                        {video.thumbnail ? (
                          <Image src={video.thumbnail} alt={video.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <FiVideo className="w-12 h-12 text-gray-500" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <FiPlay className="w-12 h-12 text-white" />
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-base font-semibold group-hover:text-primary-500 transition-colors line-clamp-2">{video.title}</h3>
                        <p className="text-secondary-400 text-sm mt-1">
                          {format(new Date(video.publishedAt), "MMM d, yyyy")}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
