import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { FiCalendar, FiUser, FiArrowRight } from "react-icons/fi";
import { format } from "date-fns";

export const metadata = { title: "Blog" };

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
      <section className="bg-gradient-to-b from-church-light to-church-cream section-padding">
        <div className="container-wide mx-auto text-center">
          <h1 className="mb-4">Blog</h1>
          <p className="text-lg text-secondary-500 max-w-2xl mx-auto">
            Thoughts, devotionals, and updates from our church family.
          </p>
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
                    <div className="aspect-video bg-church-light overflow-hidden">
                      <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                  ) : (
                    <div className="aspect-video bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                      <span className="text-white/30 font-heading text-6xl font-bold">CC</span>
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
                    <h3 className="text-xl mb-2 group-hover:text-primary-500 transition-colors">{post.title}</h3>
                    {post.excerpt && (
                      <p className="text-secondary-400 text-sm line-clamp-3">{post.excerpt}</p>
                    )}
                    <span className="inline-flex items-center gap-1 text-primary-500 text-sm font-medium mt-4">
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
