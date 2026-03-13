import Link from "next/link";
import { Project } from "@/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { AnimateIn } from "@/components/ui/animate-in";

interface FeaturedProjectsProps {
  projects: Project[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  if (projects.length === 0) return null;

  return (
    <section className="py-20">
      <Container>
        <AnimateIn>
          <SectionHeading
            title="Featured Projects"
            subtitle="Some of the things I've built."
          />
        </AnimateIn>

        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project, i) => (
            <AnimateIn key={project.title} delay={i * 0.1}>
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
                      Source
                    </Link>
                  )}
                </div>
              </Card>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn>
          <div className="mt-10 text-center">
            <Link
              href="/projects"
              className="text-sm font-medium text-accent hover:underline"
            >
              View all projects &rarr;
            </Link>
          </div>
        </AnimateIn>
      </Container>
    </section>
  );
}
