import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { Post } from "@/types";

const contentDirs = {
  blog: path.join(process.cwd(), "src/content/blog"),
  notes: path.join(process.cwd(), "src/content/notes"),
};

function getMDXFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((file) => file.endsWith(".mdx"));
}

export function getAllPosts(): Post[] {
  const posts: Post[] = [];

  for (const [type, dir] of Object.entries(contentDirs)) {
    const files = getMDXFiles(dir);
    for (const file of files) {
      const slug = file.replace(/\.mdx$/, "");
      const filePath = path.join(dir, file);
      const raw = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(raw);
      const stats = readingTime(content);

      if (!data.published && process.env.NODE_ENV === "production") continue;

      posts.push({
        slug,
        title: data.title,
        date: data.date instanceof Date ? data.date.toISOString() : data.date,
        tags: data.tags || [],
        type: data.type || (type === "notes" ? "note" : "article"),
        description: data.description || "",
        published: data.published !== false,
        readingTime: stats.text,
        content,
      });
    }
  }

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}

export function getPostSlugs(): string[] {
  return getAllPosts().map((post) => post.slug);
}
