import Link from "next/link";
import { Project } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { AnimateIn } from "@/components/ui/animate-in";

interface FeaturedProjectsProps {
  projects: Project[];
}

function ProjectItem({ project, className }: { project: Project; className?: string }) {
  return (
    <div className={className}>
      <h3 className="text-lg font-semibold">{project.title}</h3>
      <p className="mt-2 text-sm text-muted">{project.description}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>
      <div className="mt-3 flex gap-3 text-sm">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-accent hover:underline"
          >
            Live &rarr;
          </a>
        )}
        {project.sourceUrl && (
          <a
            href={project.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-muted hover:text-foreground"
          >
            Source
          </a>
        )}
      </div>
    </div>
  );
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  if (projects.length === 0) return null;

  const [lead, ...rest] = projects;

  return (
    <section className="py-16">
      <Container>
        <AnimateIn>
          <SectionHeading
            title="Featured Projects"
            subtitle="Some of the things I've built."
          />
        </AnimateIn>

        {/* Lead project — full width, larger */}
        {lead && (
          <AnimateIn>
            <ProjectItem
              project={lead}
              className="border-l-2 border-accent pl-5 pb-8"
            />
          </AnimateIn>
        )}

        {/* Remaining projects — 2 columns with top border */}
        {rest.length > 0 && (
          <div className="mt-2 grid gap-x-8 gap-y-6 border-t border-border pt-6 sm:grid-cols-2">
            {rest.map((project, i) => (
              <AnimateIn key={project.title} delay={(i + 1) * 0.1}>
                <ProjectItem project={project} />
              </AnimateIn>
            ))}
          </div>
        )}

        <AnimateIn>
          <div className="mt-10">
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
