import { projects } from "@/content/projects";
import { ProjectCard } from "./ProjectCard";

export function ProjectGrid({ limit }: { limit?: number }) {
  const items = typeof limit === "number" ? projects.slice(0, limit) : projects;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((p, i) => (
        <ProjectCard key={p.slug} project={p} index={i} />
      ))}
    </div>
  );
}


