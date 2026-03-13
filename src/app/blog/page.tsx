import type { Metadata } from "next";
import { getAllPosts } from "@/lib/mdx";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { BlogListClient } from "@/app/blog/blog-list-client";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles and notes on frontend engineering, architecture, and building products.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const allTags = [...new Set(posts.flatMap((p) => p.tags))].sort();

  return (
    <div className="py-20">
      <Container>
        <SectionHeading
          title="Blog"
          subtitle="Long-form articles and quick notes on frontend engineering."
        />
        <BlogListClient posts={posts} allTags={allTags} />
      </Container>
    </div>
  );
}
