import fs from "node:fs";
import path from "node:path";

const OUTPUT_DIR = path.resolve(
  import.meta.dirname,
  "output/linkedin"
);

export function writeLinkedInFile(slug: string, content: string): string {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const filePath = path.join(OUTPUT_DIR, `${slug}.md`);
  fs.writeFileSync(filePath, content, "utf-8");

  console.log(`LinkedIn post written: ${filePath}`);
  return filePath;
}
