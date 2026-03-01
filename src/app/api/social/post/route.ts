import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { blogPostId } = body;

    if (!blogPostId) {
      return NextResponse.json({ error: "Blog post ID required" }, { status: 400 });
    }

    const post = await prisma.blogPost.findUnique({
      where: { id: blogPostId },
    });

    if (!post) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }

    const results = [];

    // Facebook posting
    if (process.env.FACEBOOK_PAGE_ACCESS_TOKEN) {
      try {
        const fbRes = await fetch(
          `https://graph.facebook.com/v18.0/me/feed`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              message: `${post.title}\n\n${post.excerpt || ""}\n\nRead more at localhost:3001/blog/${post.slug}`,
              access_token: process.env.FACEBOOK_PAGE_ACCESS_TOKEN,
            }),
          }
        );
        const fbData = await fbRes.json();

        const socialPost = await prisma.socialPost.create({
          data: {
            platform: "facebook",
            content: post.title,
            postUrl: fbData.id ? `https://facebook.com/${fbData.id}` : null,
            postedAt: new Date(),
            status: fbData.id ? "posted" : "failed",
            blogPostId: post.id,
          },
        });
        results.push(socialPost);
      } catch (err) {
        console.error("Facebook posting failed:", err);
      }
    }

    // Record pending social posts for platforms not yet configured
    if (!process.env.FACEBOOK_PAGE_ACCESS_TOKEN) {
      const pendingPost = await prisma.socialPost.create({
        data: {
          platform: "facebook",
          content: `${post.title}\n\n${post.excerpt || ""}`,
          status: "pending",
          blogPostId: post.id,
        },
      });
      results.push(pendingPost);
    }

    return NextResponse.json({ results });
  } catch {
    return NextResponse.json({ error: "Failed to post to social media" }, { status: 500 });
  }
}
