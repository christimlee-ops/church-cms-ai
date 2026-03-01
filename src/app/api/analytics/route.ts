import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { BetaAnalyticsDataClient } from "@google-analytics/data";

function getAnalyticsClient() {
  const keyJson = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!keyJson) throw new Error("GOOGLE_SERVICE_ACCOUNT_KEY not configured");

  const credentials = JSON.parse(keyJson);
  return new BetaAnalyticsDataClient({
    credentials: {
      client_email: credentials.client_email,
      private_key: credentials.private_key,
    },
    projectId: credentials.project_id,
  });
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const settings = await prisma.siteSettings.findUnique({
    where: { id: "default" },
    select: { gaPropertyId: true },
  });

  const propertyId = settings?.gaPropertyId;
  if (!propertyId) {
    return NextResponse.json(
      { error: "GA4 Property ID not configured. Add it in Settings." },
      { status: 400 }
    );
  }

  let client: BetaAnalyticsDataClient;
  try {
    client = getAnalyticsClient();
  } catch {
    return NextResponse.json(
      { error: "Google service account not configured. Set GOOGLE_SERVICE_ACCOUNT_KEY env var." },
      { status: 500 }
    );
  }

  const property = `properties/${propertyId}`;

  try {
    const [summaryRes, topPagesRes, dailySessionsRes] = await Promise.all([
      // Summary: pageViews + activeUsers for 7d and 30d
      client.runReport({
        property,
        dateRanges: [
          { startDate: "7daysAgo", endDate: "today" },
          { startDate: "30daysAgo", endDate: "today" },
        ],
        metrics: [
          { name: "screenPageViews" },
          { name: "activeUsers" },
        ],
      }),
      // Top 10 pages by views (30d)
      client.runReport({
        property,
        dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
        dimensions: [{ name: "pagePath" }],
        metrics: [{ name: "screenPageViews" }],
        orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
        limit: 10,
      }),
      // Daily sessions (30d) for chart
      client.runReport({
        property,
        dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
        dimensions: [{ name: "date" }],
        metrics: [{ name: "sessions" }],
        orderBys: [{ dimension: { dimensionName: "date" } }],
      }),
    ]);

    // Parse summary
    const summaryRows = summaryRes[0].rows || [];
    const summary = {
      pageViews7d: Number(summaryRows[0]?.metricValues?.[0]?.value || 0),
      activeUsers7d: Number(summaryRows[0]?.metricValues?.[1]?.value || 0),
      pageViews30d: Number(summaryRows[1]?.metricValues?.[0]?.value || 0),
      activeUsers30d: Number(summaryRows[1]?.metricValues?.[1]?.value || 0),
    };

    // Parse top pages
    const topPages = (topPagesRes[0].rows || []).map((row) => ({
      path: row.dimensionValues?.[0]?.value || "",
      views: Number(row.metricValues?.[0]?.value || 0),
    }));

    // Parse daily sessions
    const dailySessions = (dailySessionsRes[0].rows || []).map((row) => ({
      date: row.dimensionValues?.[0]?.value || "",
      sessions: Number(row.metricValues?.[0]?.value || 0),
    }));

    return NextResponse.json({ summary, topPages, dailySessions });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to fetch analytics";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
