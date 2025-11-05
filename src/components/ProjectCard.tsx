"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Project } from "@/content/projects";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
      className="group overflow-hidden rounded-2xl border border-neutral-200/60 dark:border-neutral-800/60 bg-white dark:bg-neutral-950 shadow-sm hover:shadow-md transition-shadow"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={project.image} alt="" className="h-48 w-full object-cover" />
      <div className="p-4">
        <h4 className="text-lg font-semibold tracking-tight group-hover:opacity-90">{project.title}</h4>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">{project.excerpt}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span key={t} className="rounded-full border px-2 py-1 text-xs text-neutral-600 dark:text-neutral-300">
              {t}
            </span>
          ))}
        </div>
        <div className="mt-4 flex gap-3 text-sm">
          <Link href={`/projects/${project.slug}`} className="underline underline-offset-4">Details</Link>
          {project.links?.demo && (
            <a href={project.links.demo} target="_blank" className="text-neutral-600 dark:text-neutral-300 hover:opacity-80">
              Live
            </a>
          )}
          {project.links?.github && (
            <a href={project.links.github} target="_blank" className="text-neutral-600 dark:text-neutral-300 hover:opacity-80">
              Code
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}


