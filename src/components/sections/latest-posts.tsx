import Link from "next/link";
import { Post } from "@/types";
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
    <section className="py-24">
      <Container>
        <AnimateIn>
          <SectionHeading
            title="Latest Writing"
            subtitle="Thoughts on frontend engineering, architecture, and building products."
          />
        </AnimateIn>

        <div className="divide-y divide-border">
          {posts.map((post, i) => (
            <AnimateIn key={post.slug} delay={i * 0.1}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block py-6 first:pt-0 transition-colors"
              >
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-6">
                  <div className="flex shrink-0 items-center gap-2 text-sm text-muted sm:w-40">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <span>&middot;</span>
                    <span>{post.readingTime}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-semibold leading-snug group-hover:text-accent transition-colors">
                      {post.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted line-clamp-2">
                      {post.description}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {post.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag}>{tag}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn>
          <div className="mt-8">
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
