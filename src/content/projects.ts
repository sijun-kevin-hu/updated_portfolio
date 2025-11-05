export type Project = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  tags: string[];
  links?: { github?: string; demo?: string };
};

export const projects: Project[] = [
  {
    slug: "portfolio-redesign",
    title: "Portfolio Redesign",
    excerpt: "Apple-style scroll storytelling with buttery animations.",
    image: "/images/placeholder-2.jpg",
    tags: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    links: { github: "https://github.com/your-username/repo", demo: "https://example.com" },
  },
  {
    slug: "ml-dashboard",
    title: "ML Dashboard",
    excerpt: "Realtime insights with optimistic UI and smooth transitions.",
    image: "/images/placeholder-3.jpg",
    tags: ["React", "D3", "WebSockets"],
  },
];


