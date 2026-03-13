"use client";

import { useState } from "react";
import Link from "next/link";
import { Post } from "@/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate, cn } from "@/lib/utils";

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
      {/* Filters */}
      <div className="mb-8 flex flex-wrap items-center gap-4">
        {/* Type filter */}
        <div className="flex gap-1 rounded-lg border border-border p-1">
          {(["all", "article", "note"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setTypeFilter(type)}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-medium transition-colors cursor-pointer",
                typeFilter === type
                  ? "bg-accent text-white"
                  : "text-muted hover:text-foreground"
              )}
            >
              {type === "all"
                ? "All"
                : type === "article"
                  ? "Articles"
                  : "Notes"}
            </button>
          ))}
        </div>

        {/* Tag filter */}
        <div className="flex flex-wrap gap-1.5">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setTagFilter(tagFilter === tag ? null : tag)}
              className={cn(
                "rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors cursor-pointer",
                tagFilter === tag
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border text-muted hover:text-foreground"
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Post list */}
      {filtered.length === 0 ? (
        <p className="py-12 text-center text-muted">
          No posts found. Try adjusting the filters.
        </p>
      ) : (
        <div className="grid gap-4">
          {filtered.map((post) =>
            post.type === "article" ? (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-6">
                  <div className="shrink-0 text-sm text-muted sm:w-32">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <p>{post.readingTime}</p>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold leading-snug">
                      {post.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted line-clamp-2">
                      {post.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {post.tags.map((tag) => (
                        <Badge key={tag}>{tag}</Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              </Link>
            ) : (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card className="flex items-center gap-4">
                  <Badge className="shrink-0 border-accent/30 text-accent">
                    Note
                  </Badge>
                  <div className="flex-1">
                    <h3 className="font-medium">{post.title}</h3>
                  </div>
                  <div className="shrink-0 text-sm text-muted">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                  </div>
                </Card>
              </Link>
            )
          )}
        </div>
      )}
    </>
  );
}
