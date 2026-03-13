import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { AnimateIn } from "@/components/ui/animate-in";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Mohanad Elhag, an Engineering Lead with 9+ years building scalable web platforms using React, TypeScript, and modern web technologies.",
};

const techStack = [
  {
    category: "Architecture",
    items: ["Micro Services", "Design Systems", "Scalable UI", "State Management"],
  },
  {
    category: "Languages & Frameworks",
    items: ["TypeScript", "React", "Angular", "Vue.js", "StencilJS", "Next.js", "Nuxt"],
  },
  {
    category: "Styling",
    items: ["Tailwind CSS", "CSS Modules", "Sass"],
  },
  {
    category: "DevOps & Tooling",
    items: ["Vite", "Webpack", "Lerna", "Docker", "AWS", "CI/CD", "Git"],
  },
  {
    category: "Quality",
    items: ["Performance Profiling", "Accessibility (WCAG)", "Testing Strategies"],
  },
  {
    category: "Integration",
    items: ["REST APIs", "GraphQL", "Node.js", "Supabase", "PostgreSQL"],
  },
];

const experience = [
  {
    role: "Senior Frontend Engineer III",
    company: "Salla",
    companyUrl: "https://salla.com",
    period: "Jan 2024 to Present",
    location: "Riyadh",
    description:
      "Led the architecture for Salla Merchant Dashboard (v4) using React and TypeScript, introducing a scalable micro service ecosystem enabling independent module ownership and parallel team delivery. Defined UI architecture standards, spearheaded design system adoption, and implemented performance optimization strategies including code splitting, lazy loading, and rendering profiling.",
  },
  {
    role: "Senior Frontend Engineer",
    company: "LEAN",
    companyUrl: "https://lean.sa/",
    period: "Nov 2020 to Dec 2023",
    location: "Riyadh",
    description:
      "Directed architecture decisions across nationwide digital health platforms (Sehhaty & Seha) built with React and TypeScript. Designed component architecture and state management approaches for scalable systems. Led implementation of accessible UI patterns aligned with WCAG standards and championed performance optimization under high user load.",
  },
  {
    role: "Software Engineer",
    company: "Osloob",
    companyUrl: "https://osloob.com.sa/",
    period: "May 2019 to Oct 2020",
    location: "Riyadh",
    description:
      "Designed scalable solutions using component based architecture with Vue.js and TypeScript. Established reusable UI patterns and engineering standards. Contributed to platform architecture discussions and improved CI/CD workflows.",
  },
  {
    role: "Front End Developer",
    company: "Freelancer",
    companyUrl: undefined,
    period: "Feb 2015 to May 2019",
    location: "Dammam",
    description:
      "Developed responsive web applications and reusable UI components using JavaScript and modern CSS. Collaborated with stakeholders to design intuitive user experiences and integrated applications with backend services using REST APIs.",
  },
  {
    role: "Web Developer Intern",
    company: "Jazan University",
    companyUrl: "https://www.jazanu.edu.sa/en",
    period: "Oct 2012 to Apr 2013",
    location: "Jazan",
    description:
      "Designed and implemented responsive web interfaces. Supported development and debugging of web features and assisted in website performance analysis.",
  },
];

const enterpriseProjects = [
  {
    title: "Salla Merchant Dashboard v4",
    url: "https://salla.com",
    description:
      "Large scale ecommerce management platform built with React and TypeScript using micro service architecture to support modular team ownership and independent deployments.",
  },
  {
    title: "Sehhaty",
    url: "https://www.moh.gov.sa/en/eServices/Sehhaty/Pages/default.aspx",
    description:
      "National digital health platform by the Ministry of Health, serving nationwide users with accessible healthcare services.",
  },
  {
    title: "Seha",
    url: "https://www.seha.sa/en",
    description:
      "National health platform focused on usability, accessibility (WCAG), and cross platform performance.",
  },
  {
    title: "ANAT",
    url: "https://anat.sa/",
    description:
      "Digital communication and service platform for healthcare professionals, supporting multi device experiences and performance optimized UI.",
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
              I&apos;m Mohanad, a technologist based in Riyadh, Saudi Arabia.
              With 9+ years of experience building scalable web platforms
              across ecommerce, healthcare, and government sectors using React,
              TypeScript, Vue.js, Next.js, and Node.js, I combine deep
              architecture expertise with strong leadership in engineering
              delivery, technical strategy, and team development.
            </p>
            <p>
              I&apos;m experienced in leading cross functional teams, driving
              architectural decisions, improving engineering processes, and
              delivering high impact digital products used by nationwide user
              bases. I&apos;m passionate about building high performing
              engineering teams, enabling technical excellence, and aligning
              engineering execution with business objectives.
            </p>
          </div>
        </AnimateIn>

        {/* Leadership */}
        <AnimateIn>
          <section className="mt-16">
            <h2 className="mb-6 text-2xl font-bold tracking-tight">
              What I Bring
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {[
                {
                  title: "Architecture Leadership",
                  description:
                    "Led architecture workshops across Product, UX, and Engineering teams. Translating complex systems into clear strategies and documentation.",
                },
                {
                  title: "Engineering Delivery",
                  description:
                    "Managing technical delivery from planning to production. Identifying risks early and implementing mitigation strategies.",
                },
                {
                  title: "Team Development",
                  description:
                    "Mentoring engineers through code reviews, architecture guidance, and career development. Establishing standards and best practices.",
                },
                {
                  title: "Stakeholder Collaboration",
                  description:
                    "Collaborating directly with stakeholders to translate business requirements into scalable technical solutions.",
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

        {/* Enterprise Projects */}
        <AnimateIn>
          <section className="mt-16">
            <h2 className="mb-6 text-2xl font-bold tracking-tight">
              Enterprise Projects
            </h2>
            <div className="space-y-4">
              {enterpriseProjects.map((project) => (
                <div
                  key={project.title}
                  className="rounded-lg border border-border p-5"
                >
                  <h3 className="font-semibold">
                    <Link
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent transition-colors"
                    >
                      {project.title}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-muted">
                    {project.description}
                  </p>
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
                  <p className="mb-1 text-sm text-muted">
                    {job.period} · {job.location}
                  </p>
                  <h3 className="font-semibold">
                    {job.role}{" "}
                    <span className="text-accent">
                      @{" "}
                      {job.companyUrl ? (
                        <Link
                          href={job.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {job.company}
                        </Link>
                      ) : (
                        job.company
                      )}
                    </span>
                  </h3>
                  <p className="mt-1 text-sm text-muted">{job.description}</p>
                </div>
              ))}
            </div>
          </section>
        </AnimateIn>

        {/* Education */}
        <AnimateIn>
          <section className="mt-16">
            <h2 className="mb-6 text-2xl font-bold tracking-tight">
              Education
            </h2>
            <div className="rounded-lg border border-border p-5">
              <p className="mb-1 text-sm text-muted">2015</p>
              <h3 className="font-semibold">
                <Link
                  href="http://utp.edu.my/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  University of Petronas
                </Link>{" "}
                <span className="text-accent">(UTP), Malaysia</span>
              </h3>
              <p className="mt-1 text-sm text-muted">
                B.Sc. in Information and Communication Technology, majoring in
                Software Engineering
              </p>
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
                href="https://linkedin.com/in/mohanad7afiz"
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
