"use client";

import { useState } from "react";
import Link from "next/link";
import { Post } from "@/types";
import { formatDate } from "@/lib/utils";

interface BlogListClientProps {
  posts: Post[];
  allTags: string[];
}

type TypeFilter = "all" | "article" | "note";

export function BlogListClient({ posts, allTags }: BlogListClientProps) {
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [tagFilter, setTagFilter] = useState<string | null>(null);

  const filtered = posts.filter((post) => {
    if (typeFilter !== "all" && post.type !== typeFilter) return false;
    if (tagFilter && !post.tags.includes(tagFilter)) return false;
    return true;
  });

  return (
    <>
      <div className="filters" data-reveal>
        {(["all", "article", "note"] as const).map((type) => (
          <button
            key={type}
            onClick={() => setTypeFilter(type)}
            className={`filter-btn${typeFilter === type ? " active" : ""}`}
          >
            {type === "all" ? "All" : type === "article" ? "Articles" : "Notes"}
          </button>
        ))}
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setTagFilter(tagFilter === tag ? null : tag)}
            className={`filter-btn${tagFilter === tag ? " active" : ""}`}
          >
            {tag}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p style={{ padding: "var(--space-2xl) 0", textAlign: "center", color: "var(--fg-muted)" }}>
          No posts found. Try adjusting the filters.
        </p>
      ) : (
        <div data-reveal-stagger>
          {filtered.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-post-item">
              <div className="blog-post-item__type">
                {post.type === "article" ? "Article" : "Note"}
              </div>
              <h3 className="blog-post-item__title">{post.title}</h3>
              {post.description && (
                <p className="blog-post-item__desc">{post.description}</p>
              )}
              <div className="blog-post-item__footer">
                <span>{formatDate(post.date)}</span>
                <span>{post.readingTime}</span>
                <div className="blog-post-item__tags">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
