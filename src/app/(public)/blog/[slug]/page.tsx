import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { FiCalendar, FiUser, FiArrowLeft } from "react-icons/fi";
import Link from "next/link";

async function getPost(slug: string) {
  try {
    return await prisma.blogPost.findUnique({
      where: { slug, status: "PUBLISHED" },
      include: { author: { select: { name: true } } },
    });
  } catch {
    return null;
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);

  if (!post) notFound();

  return (
    <>
      <section className="bg-gradient-to-b from-church-light to-church-cream section-padding">
        <div className="container-wide mx-auto">
          <Link href="/blog" className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 mb-6">
            <FiArrowLeft /> Back to Blog
          </Link>
          <h1 className="mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 text-secondary-400">
            {post.publishedAt && (
              <span className="flex items-center gap-2">
                <FiCalendar className="w-4 h-4" />
                {format(new Date(post.publishedAt), "MMMM d, yyyy")}
              </span>
            )}
            <span className="flex items-center gap-2">
              <FiUser className="w-4 h-4" />
              {post.author.name}
            </span>
          </div>
        </div>
      </section>

      <section className="section-padding bg-church-cream">
        <div className="container-wide mx-auto">
          {post.featuredImage && (
            <img src={post.featuredImage} alt={post.title} className="w-full rounded-xl mb-10" />
          )}
          <div className="prose-church" dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </section>
    </>
  );
}
