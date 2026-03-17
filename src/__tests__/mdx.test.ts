import { describe, it, expect } from "vitest";
import { getAllPosts, getPostBySlug, getPostSlugs } from "@/lib/mdx";

describe("getAllPosts", () => {
  it("returns an array of posts", () => {
    const posts = getAllPosts();
    expect(Array.isArray(posts)).toBe(true);
    expect(posts.length).toBeGreaterThan(0);
  });

  it("each post has required fields", () => {
    const posts = getAllPosts();
    for (const post of posts) {
      expect(post.slug).toBeTruthy();
      expect(post.title).toBeTruthy();
      expect(post.date).toBeTruthy();
      expect(Array.isArray(post.tags)).toBe(true);
      expect(["article", "note"]).toContain(post.type);
      expect(typeof post.published).toBe("boolean");
      expect(post.readingTime).toBeTruthy();
      expect(post.content).toBeTruthy();
    }
  });

  it("posts are sorted by date descending", () => {
    const posts = getAllPosts();
    for (let i = 1; i < posts.length; i++) {
      const prev = new Date(posts[i - 1].date).getTime();
      const curr = new Date(posts[i].date).getTime();
      expect(prev).toBeGreaterThanOrEqual(curr);
    }
  });
});

describe("getPostBySlug", () => {
  it("returns a post for a valid slug", () => {
    const post = getPostBySlug("building-modern-web-apps");
    expect(post).toBeDefined();
    expect(post!.title).toBe("Building Modern Web Applications in 2026");
  });

  it("returns undefined for an invalid slug", () => {
    expect(getPostBySlug("nonexistent-post")).toBeUndefined();
  });
});

describe("getPostSlugs", () => {
  it("returns an array of slug strings", () => {
    const slugs = getPostSlugs();
    expect(Array.isArray(slugs)).toBe(true);
    expect(slugs.length).toBeGreaterThan(0);
    for (const slug of slugs) {
      expect(typeof slug).toBe("string");
    }
  });
});
