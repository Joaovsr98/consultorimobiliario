import { Link } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";
import { guides } from "@/data/guides";
import { Section } from "@/components/ui/Section";
import { Seo } from "@/components/shared/Seo";

export function Guides() {
  return (
    <Section>
      <Seo
        title="Guias"
        description="Conteudos educativos sobre financiamento, FGTS, entrada, documentacao e a compra do primeiro imovel."
      />

      <p className="text-sm font-semibold uppercase tracking-wide text-accent">Guias</p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-brand sm:text-5xl">
        Conteudos para comprar com seguranca
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-ink/70">
        Guias sobre financiamento, uso do FGTS, entrada necessaria, composicao
        de renda, documentacao e a compra do primeiro imovel.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            to={`/guias/${guide.slug}`}
            className="group flex flex-col rounded-[var(--radius-brand)] border border-brand/10 bg-paper p-6 transition-colors hover:border-brand/25"
          >
            <BookOpen className="size-5 text-accent" aria-hidden />
            <h2 className="mt-4 font-display text-lg font-semibold text-brand">
              {guide.title}
            </h2>
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
