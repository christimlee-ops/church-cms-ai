import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "OpenAI API key not configured" }, { status: 400 });
  }

  try {
    const body = await req.json();
    const prompt = `${body.prompt}. Style: ${body.style || "warm, inviting church community photo"}. Professional quality, suitable for a church website.`;

    const res = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt,
        n: 1,
        size: "1792x1024",
        quality: "standard",
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      const msg = data?.error?.message || "OpenAI API request failed";
      return NextResponse.json({ error: msg }, { status: res.status });
    }

    if (!data.data?.[0]?.url) {
      return NextResponse.json({ error: "No image URL in OpenAI response" }, { status: 500 });
    }

    const dalleUrl = data.data[0].url;

    // Download the image from DALL-E
    const imageRes = await fetch(dalleUrl);
    if (!imageRes.ok) {
      return NextResponse.json({ error: "Failed to download generated image" }, { status: 500 });
    }
    const imageBuffer = Buffer.from(await imageRes.arrayBuffer());

    // Save to public/uploads/ai/
    const filename = `${uuidv4()}.png`;
    const uploadDir = path.join(process.cwd(), "public", "uploads", "ai");
    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, filename), imageBuffer);

    const localUrl = `/uploads/ai/${filename}`;

    // Create Media record
    await prisma.media.create({
      data: {
        filename,
        url: localUrl,
        mimeType: "image/png",
        size: imageBuffer.length,
        alt: body.prompt || "AI generated image",
        aiGenerated: true,
      },
    });

    return NextResponse.json({ url: localUrl });
  } catch {
    return NextResponse.json({ error: "Failed to generate image" }, { status: 500 });
  }
}
