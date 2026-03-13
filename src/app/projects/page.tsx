import type { Metadata } from "next";
import Link from "next/link";
import { companyProjects, personalProjects } from "@/data/projects";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimateIn } from "@/components/ui/animate-in";
import { Project } from "@/types";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A showcase of projects and products I've built throughout my career.",
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <AnimateIn delay={index * 0.1}>
      <Card className="flex h-full flex-col">
        <h3 className="mb-2 text-lg font-semibold">{project.title}</h3>
        <p className="mb-4 flex-1 text-sm text-muted">
          {project.description}
        </p>
        <div className="mb-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
        <div className="flex gap-3 text-sm">
          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent hover:underline"
            >
              Live &rarr;
            </Link>
          )}
          {project.sourceUrl && (
            <Link
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-muted hover:text-foreground"
            >
              Source Code
            </Link>
          )}
        </div>
      </Card>
    </AnimateIn>
  );
}

export default function ProjectsPage() {
  return (
    <div className="py-20">
      <Container>
        <SectionHeading
          title="Projects"
          subtitle="Things I've built and contributed to."
        />

        {/* Company Projects */}
        <section>
          <h3 className="mb-6 text-xl font-semibold text-muted">
            Company Projects
          </h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {companyProjects.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </div>
        </section>

        {/* Personal Projects */}
        <section className="mt-16">
          <h3 className="mb-6 text-xl font-semibold text-muted">
            Personal Projects
          </h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {personalProjects.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
}
