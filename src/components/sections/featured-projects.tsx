import Link from "next/link";
import { Project } from "@/types";

interface FeaturedProjectsProps {
  projects: Project[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  if (projects.length === 0) return null;

  return (
    <section className="section">
      <div className="container-main">
        <div className="section__header" data-reveal>
          <p className="section__label">Selected Work</p>
          <Link href="/projects" className="section__link">All projects</Link>
        </div>
        <div data-reveal-stagger>
          {projects.map((project) => (
            <a
              key={project.title}
              href={project.liveUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="featured-project"
            >
              <div className="featured-project__header">
                <h3 className="featured-project__title">{project.title}</h3>
                <span className="featured-project__role">
                  {project.tags[0]}
                </span>
              </div>
              <p className="featured-project__desc">{project.description}</p>
              <div className="featured-project__tags">
                {project.tags.slice(1).map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
