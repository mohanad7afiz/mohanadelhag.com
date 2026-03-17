import fs from "node:fs";
import path from "node:path";

const BLOG_IMAGES_DIR = path.resolve(
  import.meta.dirname,
  "../../public/blog"
);

export interface ImageResult {
  localPath: string;
  photographerName: string;
  photographerUrl: string;
}

interface UnsplashPhoto {
  urls: { regular: string };
  user: {
    name: string;
    links: { html: string };
  };
}

interface UnsplashSearchResponse {
  results: UnsplashPhoto[];
}

export async function fetchImage(
  query: string,
  slug: string
): Promise<ImageResult | null> {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  if (!accessKey) {
    console.warn("UNSPLASH_ACCESS_KEY not set, skipping image fetch");
    return null;
  }

  try {
    const params = new URLSearchParams({
      query,
      per_page: "1",
      orientation: "landscape",
    });

    const res = await fetch(
      `https://api.unsplash.com/search/photos?${params}`,
      {
        headers: { Authorization: `Client-ID ${accessKey}` },
      }
    );

    if (!res.ok) {
      throw new Error(`Unsplash API error: ${res.status} ${res.statusText}`);
    }

    const data: UnsplashSearchResponse = await res.json();

    if (data.results.length === 0) {
      console.warn(`No Unsplash results for query: "${query}"`);
      return null;
    }

    const photo = data.results[0];

    // Download the image
    const imageRes = await fetch(photo.urls.regular);
    if (!imageRes.ok) {
      throw new Error(`Image download failed: ${imageRes.status}`);
    }

    fs.mkdirSync(BLOG_IMAGES_DIR, { recursive: true });

    const buffer = Buffer.from(await imageRes.arrayBuffer());
    const filePath = path.join(BLOG_IMAGES_DIR, `${slug}.jpg`);
    fs.writeFileSync(filePath, buffer);

    console.log(`Image saved: ${filePath}`);

    // Trigger Unsplash download endpoint (required by API guidelines)
    await fetch(
      `https://api.unsplash.com/photos/${photo.urls.regular.split("/")[3]?.split("?")[0]}/download`,
      { headers: { Authorization: `Client-ID ${accessKey}` } }
    ).catch(() => {});

    return {
      localPath: `/blog/${slug}.jpg`,
      photographerName: photo.user.name,
      photographerUrl: photo.user.links.html,
    };
  } catch (error) {
    console.warn(
      "Image fetch failed (non-fatal):",
      error instanceof Error ? error.message : error
    );
    return null;
  }
}
