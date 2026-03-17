import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { FiCalendar, FiUser, FiArrowRight } from "react-icons/fi";
import { format } from "date-fns";

export const metadata = {
  title: "Blog | Calvary Lutheran Church Chandler AZ",
  description: "Devotionals, faith insights, and community updates from Calvary Lutheran Church in Chandler, Arizona. Grow in God's Word with us.",
};

async function getPosts() {
  try {
    return await prisma.blogPost.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
      include: { author: { select: { name: true } } },
      take: 20,
    });
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <section className="page-hero">
        <div className="absolute inset-0">
          <Image src="/images/closed-book.jpg" alt="Blog at Calvary Lutheran Church Chandler AZ" fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative section-padding w-full">
          <div className="container-wide mx-auto text-center">
            <h1 className="text-white mb-4">Blog</h1>
            <p className="text-lg text-navy-100 max-w-2xl mx-auto">
              Thoughts, devotionals, and updates from our church family.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-church-cream">
        <div className="container-wide mx-auto">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-xl text-secondary-400">No posts yet</h3>
              <p className="text-secondary-400 mt-2">Check back soon for new content!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="card group">
                  {post.featuredImage ? (
                    <div className="aspect-video bg-church-light overflow-hidden relative">
                      <Image src={post.featuredImage} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                    </div>
                  ) : (
                    <div className="aspect-video bg-gradient-to-br from-navy-500 to-navy-700 flex items-center justify-center">
                      <span className="text-white/20 font-heading text-6xl font-bold">CLC</span>
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-secondary-400 mb-3">
                      {post.publishedAt && (
                        <span className="flex items-center gap-1">
                          <FiCalendar className="w-3.5 h-3.5" />
                          {format(new Date(post.publishedAt), "MMM d, yyyy")}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <FiUser className="w-3.5 h-3.5" />
                        {post.author.name}
                      </span>
                    </div>
                    <h3 className="text-xl mb-2 group-hover:text-navy-500 transition-colors">{post.title}</h3>
                    {post.excerpt && (
                      <p className="text-secondary-400 text-sm line-clamp-3">{post.excerpt}</p>
                    )}
                    <span className="inline-flex items-center gap-1 text-gold-600 text-sm font-semibold mt-4">
                      Read More <FiArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
