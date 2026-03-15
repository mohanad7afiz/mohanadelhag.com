import Link from "next/link";
import { Post } from "@/types";
import { formatDate } from "@/lib/utils";

interface LatestPostsProps {
  posts: Post[];
}

export function LatestPosts({ posts }: LatestPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="section">
      <div className="container-main">
        <div className="section__header" data-reveal>
          <p className="section__label">Writing</p>
          <Link href="/blog" className="section__link">All posts</Link>
        </div>
        <div className="post-list" data-reveal-stagger>
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="post-item">
              <span className="post-item__title">{post.title}</span>
              <span className="post-item__meta">{formatDate(post.date)}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
