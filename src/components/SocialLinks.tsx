import Link from "next/link";

type Social = { name: string; href: string };

const socials: Social[] = [
  { name: "GitHub", href: "https://github.com/your-username" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/your-username" },
  { name: "X", href: "https://x.com/your-username" },
];

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <nav className={`flex items-center gap-4 ${className}`} aria-label="Social links">
      {socials.map((s) => (
        <Link
          key={s.name}
          href={s.href}
          target="_blank"
          className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
        >
          {s.name}
        </Link>
      ))}
    </nav>
  );
}


