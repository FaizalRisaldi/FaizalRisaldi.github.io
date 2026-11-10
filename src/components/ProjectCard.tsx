import { ArrowUpRight } from "lucide-react";
import type { Project } from "../data/projects";
import ProjectVisual from "./ProjectVisual";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className={`project-card project-card-${project.theme}`}>
      <a className="project-link" href="#contact" aria-label={`Discuss ${project.name}`}>
        <ProjectVisual project={project} />
        <div className="project-info">
          <div className="project-copy">
            <div className="project-meta"><span>{project.number} / SELECTED WORK</span><span>{project.category}</span></div>
            <h3>{project.name} <ArrowUpRight className="project-title-arrow" size={20} /></h3>
            <p>{project.summary}</p>
            <div className="stack-list">
              {project.stack.map((item) => <span key={item}>{item}</span>)}
            </div>
          </div>
        </div>
      </a>
    </article>
  );
}
