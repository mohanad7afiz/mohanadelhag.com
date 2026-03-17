import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const email = body.email?.trim().toLowerCase();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("newsletter_subscribers")
    .insert({ email });

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "already_subscribed" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
