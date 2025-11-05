import { Section } from "@/components/Section";
import { SocialLinks } from "@/components/SocialLinks";

export const metadata = { title: "Socials" };

export default function SocialsPage() {
  return (
    <Section>
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">Socials</h1>
      <p className="mt-4 text-neutral-600 dark:text-neutral-300">Find me around the web:</p>
      <SocialLinks className="mt-6" />
    </Section>
  );
}


