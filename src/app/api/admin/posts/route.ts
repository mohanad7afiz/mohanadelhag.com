import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/mdx";

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const posts = getAllPosts(true);

  // Get post overrides
  const { data: overrides } = await supabase
    .from("post_overrides")
    .select("*");

  const overrideMap = new Map(
    (overrides || []).map((o) => [o.slug, o.published])
  );

  // Get view counts per post path
  const { data: views } = await supabase
    .from("page_views")
    .select("path");

  const viewCounts: Record<string, number> = {};
  for (const v of views || []) {
    const slug = v.path.replace("/blog/", "");
    if (slug && slug !== v.path) {
      viewCounts[slug] = (viewCounts[slug] || 0) + 1;
    }
  }

  const postsWithStats = posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    date: post.date,
    type: post.type,
    tags: post.tags,
    description: post.description,
    published: overrideMap.has(post.slug)
      ? overrideMap.get(post.slug)!
      : post.published,
    hasOverride: overrideMap.has(post.slug),
    views: viewCounts[post.slug] || 0,
  }));

  return NextResponse.json({ posts: postsWithStats });
}
