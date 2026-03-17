import Anthropic from "@anthropic-ai/sdk";
import { buildLinkedInPrompt } from "./prompts.js";
import type { GeneratedPost } from "./generate-content.js";

const MAX_RETRIES = 2;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function countWords(text: string): number {
  return text
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0).length;
}

export async function generateLinkedIn(
  post: GeneratedPost,
  slug: string,
  siteUrl: string,
  imageUrl?: string
): Promise<string> {
  const client = new Anthropic();

  const systemPrompt = buildLinkedInPrompt();
  const imageNote = imageUrl
    ? `\nHero image URL (mention that the article includes a visual): ${imageUrl}`
    : "";
  const userPrompt = `Write a LinkedIn post promoting this blog article:

Title: ${post.title}
URL: ${siteUrl}/blog/${slug}
Description: ${post.description}${imageNote}

Full article content:
${post.content}`;

  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    if (attempt > 0) {
      const delay = 2000 * Math.pow(2, attempt - 1);
      console.log(
        `LinkedIn retry ${attempt}/${MAX_RETRIES} after ${delay}ms...`
      );
      await sleep(delay);
    }

    try {
      const response = await client.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        temperature: 0.7,
        system: systemPrompt,
        messages: [{ role: "user", content: userPrompt }],
      });

      const textBlock = response.content.find(
        (block): block is Anthropic.TextBlock => block.type === "text"
      );
      if (!textBlock) {
        throw new Error("No text content in LinkedIn response");
      }

      const text = textBlock.text.trim();
      const words = countWords(text);

      if (words < 150 || words > 350) {
        throw new Error(
          `LinkedIn post word count out of range: ${words} (expected 150-350)`
        );
      }

      return text;
    } catch (error) {
      lastError =
        error instanceof Error ? error : new Error(String(error));
      console.error(
        `LinkedIn attempt ${attempt + 1} failed:`,
        lastError.message
      );
    }
  }

  throw lastError ?? new Error("LinkedIn generation failed after all retries");
}
