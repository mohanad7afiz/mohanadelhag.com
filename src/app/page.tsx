import { Hero } from "@/components/sections/hero";
import { LatestPosts } from "@/components/sections/latest-posts";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { AboutSnippet } from "@/components/sections/about-snippet";
import { Newsletter } from "@/components/sections/newsletter";
import { getAllPosts } from "@/lib/mdx";
import { projects } from "@/data/projects";

export default function Home() {
  const posts = getAllPosts().slice(0, 3);
  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <>
      <Hero />
      <LatestPosts posts={posts} />
      <FeaturedProjects projects={featuredProjects} />
      <AboutSnippet />
      <Newsletter />
    </>
  );
}
