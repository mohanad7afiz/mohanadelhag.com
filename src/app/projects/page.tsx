import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/data/projects";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimateIn } from "@/components/ui/animate-in";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A showcase of projects and products I've built throughout my career.",
};

export default function ProjectsPage() {
  return (
    <div className="py-20">
      <Container>
        <SectionHeading
          title="Projects"
          subtitle="Things I've built and contributed to."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <AnimateIn key={project.title} delay={i * 0.1}>
              <Card className="flex h-full flex-col">
                {project.image && (
                  <div className="mb-4 aspect-video overflow-hidden rounded-lg bg-card">
                    {/* Placeholder for project screenshot */}
                    <div className="flex h-full items-center justify-center text-sm text-muted">
                      {project.title}
                    </div>
                  </div>
                )}
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
                      Live Demo &rarr;
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
          ))}
        </div>
      </Container>
    </div>
  );
}
