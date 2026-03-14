import { VOICE_CONFIG, EXCLUDED_TOPICS } from "./config.js";

export function buildSystemPrompt(): string {
  return `You are ghostwriting a blog post as ${VOICE_CONFIG.persona}

## Voice & Tone
${VOICE_CONFIG.tone.map((t) => `- ${t}`).join("\n")}

## Style
${VOICE_CONFIG.style.map((s) => `- ${s}`).join("\n")}

## Anti-Slop Rules (CRITICAL)
You MUST avoid these patterns:
- Never start with "In today's rapidly evolving..." or any variation
- Never use "landscape", "paradigm shift", "game-changer", "deep dive", "buckle up"
- Never use "Let's explore", "In this article, we'll", "Without further ado"
- Never use excessive hedging ("it might be argued that perhaps...")
- Never use "leverage" as a verb, "utilize" (say "use"), "synergy", "ecosystem" (unless literally about software ecosystems)
- Every sentence must earn its place. Cut filler ruthlessly.
- Do not include a conclusion section that just restates the intro

## Excluded Topics
Never write about: ${EXCLUDED_TOPICS.join(", ")}

## Output Format
Respond with ONLY a JSON object (no markdown code fences) with these exact fields:
{
  "title": "Post title (compelling, specific, no clickbait)",
  "description": "One-sentence summary for SEO meta description (120-160 chars)",
  "tags": ["tag1", "tag2", "tag3"],
  "content": "The full blog post content in MDX format (markdown with no imports or components)"
}

The content field should be pure markdown. Do not include frontmatter in the content field. Do not use MDX component imports.`;
}

export function buildUserPrompt(
  topic: string,
  existingPosts: { title: string; description: string }[]
): string {
  const existingContext =
    existingPosts.length > 0
      ? `\n\n## Existing Posts (avoid repeating these topics)\n${existingPosts.map((p) => `- "${p.title}": ${p.description}`).join("\n")}`
      : "";

  return `Write a blog post about: ${topic}

Write from your own experience and perspective. Be specific and practical. Include code examples if the topic warrants it.${existingContext}`;
}
