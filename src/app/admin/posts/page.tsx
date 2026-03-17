"use client";

import { useEffect, useState } from "react";
import { PostActions } from "@/components/admin/post-actions";

interface AdminPost {
  slug: string;
  title: string;
  date: string;
  type: string;
  published: boolean;
  hasOverride: boolean;
  views: number;
}

export default function AdminPosts() {
  const [posts, setPosts] = useState<AdminPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/admin/posts")
      .then((res) => (res.ok ? res.json() : { posts: [] }))
      .then((data) => {
        if (!cancelled) {
          setPosts(data.posts || []);
          setLoading(false);
        }
      });
    return () => { cancelled = true; };
  }, []);

  const handleToggle = async (slug: string, published: boolean) => {
    const res = await fetch(`/api/admin/posts/${slug}/toggle`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published }),
    });

    if (res.ok) {
      setPosts((prev) =>
        prev.map((p) => (p.slug === slug ? { ...p, published } : p))
      );
    }
  };

  if (loading) {
    return <div className="admin-loading">Loading posts...</div>;
  }

  return (
    <div className="admin-page">
      <h1 className="admin-page__title">Posts</h1>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>Date</th>
              <th>Status</th>
              <th>Views</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.slug}>
                <td className="admin-table__title">{post.title}</td>
                <td>
                  <span className="admin-badge">{post.type}</span>
                </td>
                <td className="admin-table__date">
                  {new Date(post.date).toLocaleDateString()}
                </td>
                <td>
                  <span
                    className={`admin-badge ${
                      post.published ? "admin-badge--green" : "admin-badge--yellow"
                    }`}
                  >
                    {post.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="admin-table__views">{post.views}</td>
                <td>
                  <PostActions
                    slug={post.slug}
                    published={post.published}
                    title={post.title}
                    onToggle={handleToggle}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
