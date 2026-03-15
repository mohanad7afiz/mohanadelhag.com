export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function slugify(text: string): string {
  return text
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\u0600-\u06ff]+/g, "-")
    .replace(/(^-|-$)/g, "")
    || "heading";
}

export function extractHeadings(
  content: string
): { level: number; text: string; id: string }[] {
  const headingRegex = /^#{2,3}\s+(.+)$/gm;
  const headings: { level: number; text: string; id: string }[] = [];
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[0].startsWith("###") ? 3 : 2;
    const text = match[1].trim();
    const id = slugify(text);
    headings.push({ level, text, id });
  }
  return headings;
}
