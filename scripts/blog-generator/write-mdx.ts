import fs from "node:fs";
import path from "node:path";
import type { GeneratedPost } from "./generate-content.js";
import type { ImageResult } from "./fetch-image.js";

const BLOG_DIR = path.resolve(
  import.meta.dirname,
  "../../src/content/blog"
);

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function getUniqueSlug(slug: string): string {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return slug;

  const suffixed = `${slug}-2`;
  const suffixedPath = path.join(BLOG_DIR, `${suffixed}.mdx`);
  if (!fs.existsSync(suffixedPath)) return suffixed;

  return `${slug}-${Date.now()}`;
}

function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

export function writeMdxFile(
  post: GeneratedPost,
  image?: ImageResult | null
): string {
  const slug = getUniqueSlug(slugify(post.title));
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

  const lines = [
    "---",
    `title: "${post.title.replace(/"/g, '\\"')}"`,
    `date: ${formatDate(new Date())}`,
    `tags: [${post.tags.map((t) => `"${t}"`).join(", ")}]`,
    `type: "article"`,
    `description: "${post.description.replace(/"/g, '\\"')}"`,
    `published: true`,
  ];

  if (image) {
    lines.push(`image: "${image.localPath}"`);
    lines.push(`imageCredit: "${image.photographerName.replace(/"/g, '\\"')}"`);
    lines.push(`imageCreditUrl: "${image.photographerUrl}"`);
  }

  lines.push("---");

  const frontmatter = lines.join("\n");
  const fileContent = `${frontmatter}\n\n${post.content}\n`;

  fs.writeFileSync(filePath, fileContent, "utf-8");
  console.log(`Written: ${filePath}`);

  return slug;
}
