import type { Metadata } from "next";
import { getAllPosts } from "@/lib/mdx";
import { BlogListClient } from "@/app/blog/blog-list-client";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles and notes on frontend engineering, architecture, and building products.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const allTags = [...new Set(posts.flatMap((p) => p.tags))].sort();

  return (
    <div>
      <section className="section" style={{ paddingTop: "var(--space-2xl)" }}>
        <div className="container-main">
          <h1 className="section__title" data-reveal style={{ fontSize: "var(--text-3xl)", marginBottom: "var(--space-sm)" }}>
            Writing
          </h1>
          <p style={{ color: "var(--fg-muted)", fontSize: "var(--text-base)", marginBottom: "var(--space-xl)" }} data-reveal>
            Thoughts on frontend architecture, web technology, and building at scale.
          </p>
          <BlogListClient posts={posts} allTags={allTags} />
        </div>
      </section>
    </div>
  );
}
