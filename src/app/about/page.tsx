import { Section } from "@/components/Section";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <Section>
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">About</h1>
      <p className="mt-4 max-w-prose text-neutral-600 dark:text-neutral-300">
        I craft modern web experiences with a focus on performance, accessibility, and animation. This portfolio showcases a mobile-first, Apple-style scroll storytelling approach.
      </p>
    </Section>
  );
}


