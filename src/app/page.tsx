import { Hero } from "@/components/sections/hero";
import { LatestPosts } from "@/components/sections/latest-posts";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { AboutSnippet } from "@/components/sections/about-snippet";

import { getAllPosts } from "@/lib/mdx";
import { companyProjects, personalProjects } from "@/data/projects";

export default function Home() {
  const posts = getAllPosts().slice(0, 3);
  const featured = [
    ...companyProjects.filter((p) => p.featured),
    ...personalProjects.filter((p) => p.featured),
  ];

  return (
    <>
      <Hero />
      <LatestPosts posts={posts} />
      <FeaturedProjects projects={featured} />
      <AboutSnippet />

    </>
  );
}
