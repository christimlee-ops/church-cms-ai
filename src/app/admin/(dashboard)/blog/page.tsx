import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { FiPlus } from "react-icons/fi";
import BlogTable from "./BlogTable";

async function getPosts() {
  try {
    return await prisma.blogPost.findMany({
      orderBy: { createdAt: "desc" },
      include: { author: { select: { name: true } } },
    });
  } catch {
    return [];
  }
}

export default async function AdminBlogPage() {
  const posts = await getPosts();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-secondary-800">Blog Posts</h1>
          <p className="text-secondary-500 mt-1">Manage your blog content</p>
        </div>
        <Link href="/admin/blog/new" className="btn-primary">
          <FiPlus className="w-5 h-5" /> New Post
        </Link>
      </div>

      <BlogTable posts={JSON.parse(JSON.stringify(posts))} />
    </div>
  );
}
