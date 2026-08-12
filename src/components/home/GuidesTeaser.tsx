import { Link } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";
import { guides } from "@/data/guides";
import { Section } from "@/components/ui/Section";
import { buttonClasses } from "@/lib/button-styles";

/** Teaser da area de guias, com os 3 primeiros conteudos educativos. */
export function GuidesTeaser() {
  const highlighted = guides.slice(0, 3);

  return (
    <Section>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">
            Conteudos educativos
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-brand sm:text-4xl">
            Guias para comprar com segurança
          </h2>
        </div>
        <Link to="/guias" className={buttonClasses("ghost", "md")}>
          Ver todos os guias
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {highlighted.map((guide) => (
          <Link
            key={guide.slug}
            to={`/guias/${guide.slug}`}
            className="group flex flex-col rounded-[var(--radius-brand)] border border-brand/10 bg-paper p-6 transition-colors hover:border-brand/25"
          >
            <BookOpen className="size-5 text-accent" aria-hidden />
            <h3 className="mt-4 font-display text-lg font-semibold text-brand">
              {guide.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/70">{guide.summary}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand">
              Ler guia
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}
