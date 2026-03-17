import Anthropic from "@anthropic-ai/sdk";
import { buildSystemPrompt, buildUserPrompt } from "./prompts.js";

export interface GeneratedPost {
  title: string;
  description: string;
  tags: string[];
  imageQuery: string;
  content: string;
}

const MAX_RETRIES = 2;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function validatePost(post: GeneratedPost): boolean {
  if (!post.title || !post.description || !post.content) return false;
  if (!Array.isArray(post.tags) || post.tags.length === 0) return false;
  if (post.content.length < 500 || post.content.length > 15000)
    return false;
  if (post.description.length < 50 || post.description.length > 200)
    return false;
  return true;
}

export async function generateContent(
  topic: string,
  existingPosts: { title: string; description: string }[],
  context?: string,
  keyword?: string
): Promise<GeneratedPost> {
  const client = new Anthropic();

  const systemPrompt = buildSystemPrompt();
  const userPrompt = buildUserPrompt(topic, existingPosts, context, keyword);

  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    if (attempt > 0) {
      const delay = 2000 * Math.pow(2, attempt - 1);
      console.log(`Retry ${attempt}/${MAX_RETRIES} after ${delay}ms...`);
      await sleep(delay);
    }

    try {
      const response = await client.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: 4000,
        temperature: 0.7,
        system: systemPrompt,
        messages: [{ role: "user", content: userPrompt }],
      });

      const textBlock = response.content.find(
        (block) => block.type === "text"
      );
      if (!textBlock || textBlock.type !== "text") {
        throw new Error("No text content in response");
      }

      const raw = textBlock.text.trim();
      const post: GeneratedPost = JSON.parse(raw);

      if (!validatePost(post)) {
        throw new Error(
          `Validation failed: title=${!!post.title}, desc=${!!post.description}, tags=${post.tags?.length}, content_len=${post.content?.length}`
        );
      }

      return post;
    } catch (error) {
      lastError =
        error instanceof Error ? error : new Error(String(error));
      console.error(`Attempt ${attempt + 1} failed:`, lastError.message);
    }
  }

  throw lastError ?? new Error("Generation failed after all retries");
}
