import { Project } from "@/types";

export const projects: Project[] = [
  {
    title: "Salla Theme Engine",
    description:
      "Built the next-generation theme engine for Salla's e-commerce platform, powering thousands of online stores with customizable, performant storefronts.",
    tags: ["Vue.js", "TypeScript", "Tailwind CSS", "E-commerce"],
    liveUrl: "https://salla.com",
    featured: true,
  },
  {
    title: "Design System",
    description:
      "Led the development of a comprehensive design system used across multiple products, ensuring consistency and accelerating development velocity.",
    tags: ["React", "TypeScript", "Storybook", "Figma"],
    featured: true,
  },
  {
    title: "Content Platform",
    description:
      "A headless CMS-powered content platform with MDX support, real-time collaboration, and multi-language support including RTL languages.",
    tags: ["Next.js", "TypeScript", "MDX", "i18n"],
    sourceUrl: "https://github.com/mohanad7afiz",
    featured: false,
  },
];
