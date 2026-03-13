import { Project } from "@/types";

export const companyProjects: Project[] = [
  {
    title: "Salla Merchant Dashboard v4",
    description:
      "Large scale ecommerce management platform built using micro frontend architecture to support modular team ownership and independent deployments. Powers thousands of online stores across the MENA region.",
    tags: ["React", "TypeScript", "Micro Frontends", "Design System"],
    liveUrl: "https://salla.com",
    featured: true,
  },
  {
    title: "Sehhaty",
    description:
      "National digital health platform by the Ministry of Health, serving nationwide users with accessible healthcare services.",
    tags: ["React", "TypeScript", "Accessibility", "Healthcare"],
    liveUrl: "https://www.moh.gov.sa/en/eServices/Sehhaty/Pages/default.aspx",
    featured: true,
  },
  {
    title: "Seha",
    description:
      "National health platform focused on usability, accessibility (WCAG), and cross platform performance. Built scalable component architecture and state management patterns.",
    tags: ["React", "TypeScript", "Accessibility", "Healthcare"],
    liveUrl: "https://www.seha.sa/en",
    featured: false,
  },
  {
    title: "ANAT",
    description:
      "Digital communication and service platform for healthcare professionals, supporting multi device experiences and performance optimized UI.",
    tags: ["TypeScript", "Vue.js", "Healthcare", "Performance"],
    liveUrl: "https://anat.sa/",
    featured: false,
  },
];

export const personalProjects: Project[] = [
  {
    title: "RepostEngine",
    description:
      "SaaS tool that turns a single YouTube video into optimized posts for 10+ platforms in 30 seconds. Handles transcript extraction, platform specific formatting, and direct sharing.",
    tags: ["Next.js", "React", "Tailwind CSS", "SaaS"],
    liveUrl: "https://repostengine.com",
    featured: true,
  },
];
