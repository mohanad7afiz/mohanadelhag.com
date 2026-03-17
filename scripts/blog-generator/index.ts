import { TOPIC_POOLS, type TopicCategory } from "./config.js";
import { getExistingPosts } from "./get-existing-posts.js";
import { discoverTopic } from "./discover-topic.js";
import { generateContent } from "./generate-content.js";
import { fetchImage } from "./fetch-image.js";
import { generateLinkedIn } from "./generate-linkedin.js";
import { writeMdxFile } from "./write-mdx.js";
import { writeLinkedInFile } from "./write-linkedin.js";

const SITE_URL = process.env.SITE_URL || "https://mohanadelhag.dev";

function pickFromPool(): string {
  const categories = Object.keys(TOPIC_POOLS) as TopicCategory[];
  const category = categories[Math.floor(Math.random() * categories.length)];
  const topics = TOPIC_POOLS[category];
  const topic = topics[Math.floor(Math.random() * topics.length)];
  console.log(`Fallback: picked topic from "${category}": ${topic}`);
  return topic;
}

async function main() {
  try {
    // 1. Scan existing posts
    console.log("Scanning existing posts...");
    const existingPosts = getExistingPosts();
    console.log(`Found ${existingPosts.length} existing posts`);

    // 2. Determine topic
    let topic: string;
    let context: string | undefined;
    let keyword: string | undefined;

    const topicHint = process.env.TOPIC_HINT;
    if (topicHint) {
      console.log(`Using topic hint: ${topicHint}`);
      topic = topicHint;
    } else {
      // Try web search discovery, fall back to static pool
      try {
        console.log("Discovering trending topic via web search...");
        const discovered = await discoverTopic(
          existingPosts.map((p) => p.title)
        );
        topic = discovered.topic;
        context = discovered.context;
        keyword = discovered.keyword;
        console.log(`Discovered topic: ${topic}`);
        console.log(`SEO keyword: ${keyword}`);
        if (discovered.sources.length > 0) {
          console.log(`Sources: ${discovered.sources.join(", ")}`);
        }
      } catch (error) {
        console.warn(
          "Web search discovery failed, falling back to static pool:",
          error instanceof Error ? error.message : error
        );
        topic = pickFromPool();
      }
    }

    // 3. Generate blog post
    console.log("Generating content...");
    const post = await generateContent(
      topic,
      existingPosts.map((p) => ({
        title: p.title,
        description: p.description,
      })),
      context,
      keyword
    );
    console.log(`Generated: "${post.title}"`);

    // 4. Fetch hero image from Unsplash
    let image = null;
    if (post.imageQuery) {
      console.log(`Fetching image for query: "${post.imageQuery}"`);
      const slugForImage = post.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
      image = await fetchImage(post.imageQuery, slugForImage);
    }

    // 5. Write MDX file
    const slug = writeMdxFile(post, image);
    console.log(`Blog post slug: ${slug}`);

    // 6. Generate LinkedIn summary
    try {
      console.log("Generating LinkedIn post...");
      const imageUrl = image ? `${SITE_URL}${image.localPath}` : undefined;
      const linkedInText = await generateLinkedIn(post, slug, SITE_URL, imageUrl);
      writeLinkedInFile(slug, linkedInText);
    } catch (error) {
      console.warn(
        "LinkedIn generation failed (non-fatal):",
        error instanceof Error ? error.message : error
      );
    }

    console.log("Done!");
  } catch (error) {
    console.error(
      "Failed to generate post:",
      error instanceof Error ? error.message : error
    );
    // Exit 0 so the workflow doesn't fail noisily
  }
}

main();
