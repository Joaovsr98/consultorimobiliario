import type { ReactNode } from "react";
import { Section } from "@/components/ui/Section";

type PagePlaceholderProps = {
  eyebrow?: string;
  title: string;
  description: string;
  /** Nota da fase em que o conteudo completo sera implementado. */
  phaseNote?: string;
  children?: ReactNode;
};

/**
 * Estrutura base das paginas ainda nao construidas. Mantem cabecalho,
 * rodape e responsividade consistentes enquanto o conteudo chega nas
 * proximas fases.
 */
export function PagePlaceholder({
  eyebrow,
  title,
  description,
  phaseNote,
  children,
}: PagePlaceholderProps) {
  return (
    <Section>
      <div className="max-w-2xl">
        {eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-brand sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-ink/70">{description}</p>
        {children}
        {phaseNote && (
          <p className="mt-8 inline-block rounded-[var(--radius-brand)] border border-brand/10 bg-paper px-4 py-3 text-sm text-ink/60">
            {phaseNote}
          </p>
        )}
      </div>
    </Section>
  );
}
