import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { path, referrer, deviceType, sessionId } = body;

  if (!path || !sessionId) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const supabase = await createClient();

  await supabase.from("page_views").insert({
    path,
    referrer: referrer || null,
    device_type: deviceType || null,
    session_id: sessionId,
  });

  return NextResponse.json({ success: true });
}
