import { createClient } from "@/lib/supabase/server";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const period = request.nextUrl.searchParams.get("period") || "30d";
  const days = period === "7d" ? 7 : period === "90d" ? 90 : 30;
  const since = new Date();
  since.setDate(since.getDate() - days);

  const { data: views } = await supabase
    .from("page_views")
    .select("*")
    .gte("created_at", since.toISOString());

  const allViews = views || [];

  const totalViews = allViews.length;
  const uniqueVisitors = new Set(allViews.map((v) => v.session_id)).size;

  // Top pages
  const pageCounts: Record<string, number> = {};
  for (const v of allViews) {
    pageCounts[v.path] = (pageCounts[v.path] || 0) + 1;
  }
  const topPages = Object.entries(pageCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([path, count]) => ({ path, count }));

  // Top referrers
  const refCounts: Record<string, number> = {};
  for (const v of allViews) {
    if (v.referrer) {
      refCounts[v.referrer] = (refCounts[v.referrer] || 0) + 1;
    }
  }
  const topReferrers = Object.entries(refCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([referrer, count]) => ({ referrer, count }));

  // Device breakdown
  const deviceCounts: Record<string, number> = {};
  for (const v of allViews) {
    const device = v.device_type || "unknown";
    deviceCounts[device] = (deviceCounts[device] || 0) + 1;
  }
  const devices = Object.entries(deviceCounts).map(([device, count]) => ({
    device,
    count,
  }));

  // Daily chart data
  const dailyCounts: Record<string, number> = {};
  for (let i = 0; i < days; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    dailyCounts[d.toISOString().split("T")[0]] = 0;
  }
  for (const v of allViews) {
    const day = v.created_at.split("T")[0];
    if (dailyCounts[day] !== undefined) {
      dailyCounts[day]++;
    }
  }
  const dailyViews = Object.entries(dailyCounts)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, count]) => ({ date, count }));

  return NextResponse.json({
    totalViews,
    uniqueVisitors,
    topPages,
    topReferrers,
    devices,
    dailyViews,
  });
}
