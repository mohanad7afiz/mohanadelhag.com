import { TOPIC_POOLS, type TopicCategory } from "./config.js";
import { getExistingPosts } from "./get-existing-posts.js";
import { generateContent } from "./generate-content.js";
import { writeMdxFile } from "./write-mdx.js";

function pickTopic(): string {
  const hint = process.env.TOPIC_HINT;
  if (hint) {
    console.log(`Using topic hint: ${hint}`);
    return hint;
  }

  const categories = Object.keys(TOPIC_POOLS) as TopicCategory[];
  const category = categories[Math.floor(Math.random() * categories.length)];
  const topics = TOPIC_POOLS[category];
  const topic = topics[Math.floor(Math.random() * topics.length)];

  console.log(`Selected topic from "${category}": ${topic}`);
  return topic;
}

async function main() {
  try {
    console.log("Scanning existing posts...");
    const existingPosts = getExistingPosts();
    console.log(`Found ${existingPosts.length} existing posts`);

    const topic = pickTopic();

    console.log("Generating content...");
    const post = await generateContent(
      topic,
      existingPosts.map((p) => ({
        title: p.title,
        description: p.description,
      }))
    );

    console.log(`Generated: "${post.title}"`);

    const slug = writeMdxFile(post);
    console.log(`Done! New post slug: ${slug}`);
  } catch (error) {
    console.error(
      "Failed to generate post:",
      error instanceof Error ? error.message : error
    );
    // Exit 0 so the workflow doesn't fail noisily
  }
}

main();
