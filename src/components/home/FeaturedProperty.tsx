import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { tenant } from "@/tenants";
import { Section } from "@/components/ui/Section";
import { buttonClasses } from "@/lib/button-styles";
import { formatCurrency } from "@/lib/utils";

/** Destaca o empreendimento marcado como `featured` nos dados do tenant ativo. */
export function FeaturedProperty() {
  const featuredProperty = tenant.properties.find((p) => p.featured);
  if (!featuredProperty) return null;

  return (
    <Section>
      <p className="text-sm font-semibold uppercase tracking-wide text-accent">
        Empreendimento em destaque
      </p>

      <div className="mt-6 grid gap-8 rounded-[var(--radius-brand)] border border-brand/10 bg-paper p-6 sm:p-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <span className="flex items-center gap-1.5 text-sm text-ink/60">
            <MapPin className="size-4 text-accent" aria-hidden />
            {featuredProperty.neighborhood}, {featuredProperty.city}
          </span>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-brand sm:text-4xl">
            {featuredProperty.name}
          </h2>
          <p className="mt-4 text-ink/70">{featuredProperty.description}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {featuredProperty.features.map((feature) => (
              <span
                key={feature}
                className="rounded-full border border-brand/10 bg-surface px-3 py-1.5 text-sm text-ink/80"
              >
                {feature}
              </span>
            ))}
          </div>

          <p className="mt-6 text-sm text-ink/50">
            Valores e disponibilidade sujeitos a alteracao.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              to={`/imoveis/${featuredProperty.slug}`}
              className={buttonClasses("primary", "md")}
            >
              Ver detalhes
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link to="/contato" className={buttonClasses("outline", "md")}>
              Agendar visita
            </Link>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-4">
          <div className="rounded-[var(--radius-brand)] border border-brand/10 bg-surface p-4">
            <dt className="text-xs uppercase tracking-wide text-ink/50">Dormitorios</dt>
            <dd className="mt-1 font-medium text-brand">{featuredProperty.bedrooms}</dd>
          </div>
          <div className="rounded-[var(--radius-brand)] border border-brand/10 bg-surface p-4">
            <dt className="text-xs uppercase tracking-wide text-ink/50">Metragem</dt>
            <dd className="mt-1 font-medium text-brand">{featuredProperty.area}</dd>
          </div>
          <div className="col-span-2 rounded-[var(--radius-brand)] border border-brand/10 bg-surface p-4">
            <dt className="flex items-center gap-1.5 text-xs uppercase tracking-wide text-ink/50">
              <CalendarDays className="size-3.5" aria-hidden />
              Previsao de entrega
            </dt>
            <dd className="mt-1 font-medium text-brand">
              {featuredProperty.delivery ?? "A definir"}
            </dd>
          </div>
          {featuredProperty.priceFrom !== undefined && (
            <div className="col-span-2 rounded-[var(--radius-brand)] border border-brand/10 bg-surface p-4">
              <dt className="text-xs uppercase tracking-wide text-ink/50">A partir de</dt>
              <dd className="mt-1 font-medium text-brand">
                {formatCurrency(featuredProperty.priceFrom)}
              </dd>
            </div>
          )}
        </dl>
      </div>
    </Section>
  );
}
