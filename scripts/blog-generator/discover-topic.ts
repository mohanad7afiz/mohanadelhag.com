import Anthropic from "@anthropic-ai/sdk";
import { DISCOVER_CONFIG } from "./config.js";
import {
  buildDiscoverSystemPrompt,
  buildDiscoverUserPrompt,
} from "./prompts.js";

export interface DiscoveredTopic {
  topic: string;
  keyword: string;
  context: string;
  sources: string[];
}

const MAX_RETRIES = 2;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function discoverTopic(
  existingTitles: string[]
): Promise<DiscoveredTopic> {
  const client = new Anthropic();

  const systemPrompt = buildDiscoverSystemPrompt();
  const userPrompt = buildDiscoverUserPrompt(existingTitles);

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
        temperature: DISCOVER_CONFIG.searchTemperature,
        system: systemPrompt,
        messages: [{ role: "user", content: userPrompt }],
        tools: [
          {
            type: "web_search_20250305",
            name: "web_search",
            max_uses: DISCOVER_CONFIG.maxSearches,
          },
        ],
      });

      // Extract only text blocks (skip server_tool_use and web_search_tool_result)
      const textBlocks = response.content.filter(
        (block): block is Anthropic.TextBlock => block.type === "text"
      );

      if (textBlocks.length === 0) {
        throw new Error("No text content in discovery response");
      }

      const raw = textBlocks.map((b) => b.text).join("\n").trim();
      const result: DiscoveredTopic = JSON.parse(raw);

      if (!result.topic || !result.context) {
        throw new Error(
          `Invalid discovery result: topic=${!!result.topic}, context=${!!result.context}`
        );
      }

      result.sources = result.sources || [];
      result.keyword = result.keyword || result.topic;
      return result;
    } catch (error) {
      lastError =
        error instanceof Error ? error : new Error(String(error));
      console.error(
        `Discovery attempt ${attempt + 1} failed:`,
        lastError.message
      );
    }
  }

  throw lastError ?? new Error("Topic discovery failed after all retries");
}
