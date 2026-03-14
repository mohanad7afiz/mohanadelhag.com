import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export interface ExistingPost {
  title: string;
  slug: string;
  tags: string[];
  description: string;
}

const CONTENT_ROOT = path.resolve(
  import.meta.dirname,
  "../../src/content"
);

function scanDirectory(dir: string): ExistingPost[] {
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data } = matter(raw);
      return {
        title: (data.title as string) || "",
        slug: file.replace(/\.mdx$/, ""),
        tags: (data.tags as string[]) || [],
        description: (data.description as string) || "",
      };
    });
}

export function getExistingPosts(): ExistingPost[] {
  return [
    ...scanDirectory(path.join(CONTENT_ROOT, "blog")),
    ...scanDirectory(path.join(CONTENT_ROOT, "notes")),
  ];
}
