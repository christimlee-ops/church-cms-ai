import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const SYSTEM_PROMPTS: Record<string, string> = {
  blog: "You are a content writer for Calvary Lutheran Church, a WELS congregation in Chandler, Arizona. Write engaging, warm blog posts that reflect Christian values and the Lutheran faith. Pastor Martin Spaude leads the congregation. Include relevant Scripture references when appropriate.",
  event: "You are a content writer for Calvary Lutheran Church, a WELS congregation in Chandler, Arizona. Write clear, inviting event descriptions that encourage participation. Include practical details.",
  page: "You are a content writer for Calvary Lutheran Church, a WELS congregation in Chandler, Arizona. Write informative, welcoming website page content. Reflect the church's commitment to God's Word and the Lutheran Confessions.",
};

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "OpenAI API key not configured" }, { status: 400 });
  }

  try {
    const body = await req.json();
    const { type, prompt, context } = body as {
      type: "blog" | "event" | "page";
      prompt: string;
      context?: string;
    };

    if (!type || !prompt) {
      return NextResponse.json({ error: "Missing required fields: type and prompt" }, { status: 400 });
    }

    const systemPrompt = SYSTEM_PROMPTS[type];
    if (!systemPrompt) {
      return NextResponse.json({ error: "Invalid content type" }, { status: 400 });
    }

    const userMessage = context ? `${prompt}\n\nAdditional context: ${context}` : prompt;

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      const msg = data?.error?.message || "OpenAI API request failed";
      return NextResponse.json({ error: msg }, { status: res.status });
    }

    const rawContent = data.choices?.[0]?.message?.content;
    if (!rawContent) {
      return NextResponse.json({ error: "No content in OpenAI response" }, { status: 500 });
    }

    // Try to extract a title if the content starts with a title-like line
    let title: string | undefined;
    let content = rawContent.trim();

    const titleMatch = content.match(/^#\s+(.+)\n/);
    if (titleMatch) {
      title = titleMatch[1].trim();
      content = content.slice(titleMatch[0].length).trim();
    } else {
      // Check for a bold title line like **Title Here**
      const boldMatch = content.match(/^\*\*(.+?)\*\*\n/);
      if (boldMatch) {
        title = boldMatch[1].trim();
        content = content.slice(boldMatch[0].length).trim();
      }
    }

    // Generate excerpt from first ~150 chars of content
    const plainText = content.replace(/[#*_\[\]()]/g, "").trim();
    const excerpt = plainText.length > 150 ? plainText.slice(0, 150).trim() + "..." : plainText;

    return NextResponse.json({ content, title, excerpt });
  } catch {
    return NextResponse.json({ error: "Failed to generate content" }, { status: 500 });
  }
}
