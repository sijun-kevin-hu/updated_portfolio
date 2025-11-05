import { notFound } from "next/navigation";
import { projects } from "@/content/projects";
import { Section } from "@/components/Section";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default function ProjectDetailPage({ params }: Props) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return notFound();

  return (
    <Section>
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">{project.title}</h1>
      <p className="mt-2 text-neutral-600 dark:text-neutral-300">{project.excerpt}</p>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={project.image} alt="" className="mt-6 w-full rounded-2xl border border-neutral-200/60 dark:border-neutral-800/60" />
      <div className="mt-6 flex flex-wrap gap-2">
        {project.tags.map((t) => (
          <span key={t} className="rounded-full border px-3 py-1 text-xs">{t}</span>
        ))}
      </div>
    </Section>
  );
}


