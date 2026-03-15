import type { Metadata } from "next";
import { companyProjects, personalProjects } from "@/data/projects";
import { Project } from "@/types";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A showcase of projects and products built throughout my career.",
};

function ProjectItem({ project }: { project: Project }) {
  return (
    <a
      href={project.liveUrl || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="featured-project"
    >
      <div className="featured-project__header">
        <h3 className="featured-project__title">{project.title}</h3>
      </div>
      <p className="featured-project__desc">{project.description}</p>
      <div className="featured-project__tags">
        {project.tags.map((tag) => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>
    </a>
  );
}

export default function ProjectsPage() {
  return (
    <div>
      <section style={{ paddingTop: "var(--space-2xl)" }}>
        <div className="container-main">
          <h1 className="section__title" data-reveal style={{ fontSize: "var(--text-3xl)", marginBottom: "var(--space-sm)" }}>
            Projects
          </h1>
          <p style={{ color: "var(--fg-muted)", fontSize: "var(--text-base)", marginBottom: "var(--space-xl)" }} data-reveal>
            Enterprise platforms and personal experiments.
          </p>

          {/* Enterprise */}
          <div data-reveal>
            <p className="project-section__label">Enterprise</p>
          </div>
          <div data-reveal-stagger>
            {companyProjects.map((project) => (
              <ProjectItem key={project.title} project={project} />
            ))}
          </div>

          <hr className="project-divider" />

          {/* Personal */}
          <div data-reveal>
            <p className="project-section__label">Personal</p>
          </div>
          <div data-reveal-stagger>
            {personalProjects.map((project) => (
              <ProjectItem key={project.title} project={project} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
