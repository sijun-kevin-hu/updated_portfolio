import { Section } from "@/components/Section";
import { ProjectGrid } from "@/components/ProjectGrid";

export const metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <Section>
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">Projects</h1>
      <div className="mt-8">
        <ProjectGrid />
      </div>
    </Section>
  );
}


