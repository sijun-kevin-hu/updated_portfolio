import { ReactNode } from "react";

export function Section({ id, children, className = "" }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 ${className}`}>
      {children}
    </section>
  );
}


