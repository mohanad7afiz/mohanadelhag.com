import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { AnimateIn } from "@/components/ui/animate-in";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Mohanad Elhag — senior frontend engineer with 9+ years of experience building web applications at scale.",
};

const techStack = [
  { category: "Frontend", items: ["React", "Vue.js", "Next.js", "Nuxt"] },
  { category: "Styling", items: ["Tailwind CSS", "CSS Modules", "Sass"] },
  { category: "Language", items: ["TypeScript", "JavaScript", "HTML/CSS"] },
  { category: "Tools", items: ["Git", "Vite", "Webpack", "Docker"] },
  { category: "Testing", items: ["Vitest", "Playwright", "Jest"] },
  { category: "Backend", items: ["Node.js", "REST APIs", "GraphQL"] },
];

const experience = [
  {
    role: "Senior Frontend Engineer",
    company: "Salla",
    period: "2021 — Present",
    description:
      "Leading frontend architecture for the e-commerce platform. Building the theme engine, design system, and developer tools that power thousands of online stores.",
  },
  {
    role: "Frontend Engineer",
    company: "Salla",
    period: "2019 — 2021",
    description:
      "Built core merchant dashboard features and contributed to the transition from a monolithic architecture to a modern, component-based frontend.",
  },
  {
    role: "Frontend Developer",
    company: "Freelance & Agencies",
    period: "2016 — 2019",
    description:
      "Worked with various clients and agencies on web applications, landing pages, and interactive experiences. Built a strong foundation in JavaScript and modern CSS.",
  },
];

export default function AboutPage() {
  return (
    <div className="py-20">
      <Container size="narrow">
        {/* Intro */}
        <AnimateIn>
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
            About Me
          </h1>
          <div className="space-y-4 text-lg leading-relaxed text-muted">
            <p>
              I&apos;m Mohanad — a senior frontend engineer based in Sudan with
              9+ years of experience building web applications. I currently work
              at{" "}
              <Link
                href="https://salla.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                Salla
              </Link>
              , where I help build the platform that powers thousands of
              e-commerce stores across the MENA region.
            </p>
            <p>
              I care about building things that work well — products that are
              fast, accessible, and a joy to use. I believe the best frontend
              code is the kind users never notice, because everything just works.
            </p>
            <p>
              Outside of work, I write about what I learn, experiment with new
              tools and patterns, and try to give back to the developer
              community. I&apos;m a firm believer that sharing knowledge makes
              everyone better.
            </p>
          </div>
        </AnimateIn>

        {/* What I care about */}
        <AnimateIn>
          <section className="mt-16">
            <h2 className="mb-6 text-2xl font-bold tracking-tight">
              What I Care About
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {[
                {
                  title: "Building Products",
                  description:
                    "Not just features — complete products that solve real problems and delight users.",
                },
                {
                  title: "Developer Experience",
                  description:
                    "Great DX leads to better products. I invest in tools, patterns, and systems that make teams faster.",
                },
                {
                  title: "Performance",
                  description:
                    "Every millisecond matters. I obsess over Core Web Vitals and real-user metrics.",
                },
                {
                  title: "Sharing Knowledge",
                  description:
                    "Writing, speaking, mentoring — I believe sharing what we learn raises the whole community.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-lg border border-border p-5"
                >
                  <h3 className="mb-2 font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted">{item.description}</p>
                </div>
              ))}
            </div>
          </section>
        </AnimateIn>

        {/* Tech Stack */}
        <AnimateIn>
          <section className="mt-16">
            <h2 className="mb-6 text-2xl font-bold tracking-tight">
              Tech Stack
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {techStack.map((group) => (
                <div key={group.category}>
                  <h3 className="mb-2 text-sm font-medium text-muted">
                    {group.category}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <Badge key={item}>{item}</Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </AnimateIn>

        {/* Experience */}
        <AnimateIn>
          <section className="mt-16">
            <h2 className="mb-8 text-2xl font-bold tracking-tight">
              Experience
            </h2>
            <div className="relative space-y-8 border-l-2 border-border pl-8">
              {experience.map((job) => (
                <div key={job.period} className="relative">
                  <div className="absolute -left-[calc(2rem+5px)] top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-background" />
                  <p className="mb-1 text-sm text-muted">{job.period}</p>
                  <h3 className="font-semibold">
                    {job.role}{" "}
                    <span className="text-accent">@ {job.company}</span>
                  </h3>
                  <p className="mt-1 text-sm text-muted">{job.description}</p>
                </div>
              ))}
            </div>
          </section>
        </AnimateIn>

        {/* Social */}
        <AnimateIn>
          <section className="mt-16">
            <h2 className="mb-4 text-2xl font-bold tracking-tight">
              Connect
            </h2>
            <p className="text-muted">
              Find me on{" "}
              <Link
                href="https://github.com/mohanad7afiz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                GitHub
              </Link>
              ,{" "}
              <Link
                href="https://linkedin.com/in/mohanadelhag"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                LinkedIn
              </Link>
              , or{" "}
              <Link
                href="https://x.com/mohanad7afiz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                X
              </Link>
              .
            </p>
          </section>
        </AnimateIn>
      </Container>
    </div>
  );
}
