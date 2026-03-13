import Link from "next/link";
import { Post } from "@/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { AnimateIn } from "@/components/ui/animate-in";
import { formatDate } from "@/lib/utils";

interface LatestPostsProps {
  posts: Post[];
}

export function LatestPosts({ posts }: LatestPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="py-20">
      <Container>
        <AnimateIn>
          <SectionHeading
            title="Latest Writing"
            subtitle="Thoughts on frontend engineering, architecture, and building products."
          />
        </AnimateIn>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <AnimateIn key={post.slug} delay={i * 0.1}>
              <Link href={`/blog/${post.slug}`}>
                <Card className="flex h-full flex-col">
                  <div className="mb-3 flex items-center gap-2 text-sm text-muted">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <span>&middot;</span>
                    <span>{post.readingTime}</span>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold leading-snug">
                    {post.title}
                  </h3>
                  <p className="mb-4 flex-1 text-sm text-muted line-clamp-2">
                    {post.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>
                </Card>
              </Link>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn>
          <div className="mt-10 text-center">
            <Link
              href="/blog"
              className="text-sm font-medium text-accent hover:underline"
            >
              View all posts &rarr;
            </Link>
          </div>
        </AnimateIn>
      </Container>
    </section>
  );
}
