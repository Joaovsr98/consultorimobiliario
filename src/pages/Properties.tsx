import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import { tenant } from "@/tenants";
import { Section } from "@/components/ui/Section";
import { Seo } from "@/components/shared/Seo";
import { formatCurrency } from "@/lib/utils";

const { properties } = tenant;

export function Properties() {
  return (
    <Section>
      <Seo
        title="Imoveis"
        description="Empreendimentos selecionados. Valores e disponibilidade sujeitos a alteracao."
      />

      <p className="text-sm font-semibold uppercase tracking-wide text-accent">
        Imoveis
      </p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-brand sm:text-5xl">
        Empreendimentos selecionados
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-ink/70">
        Valores e disponibilidade sujeitos a alteracao.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <Link
            key={property.id}
            to={`/imoveis/${property.slug}`}
            className="group flex flex-col rounded-[var(--radius-brand)] border border-brand/10 bg-paper p-6 transition-colors hover:border-brand/25"
          >
            <span className="flex items-center gap-1.5 text-sm text-ink/60">
              <MapPin className="size-4 text-accent" aria-hidden />
              {property.neighborhood}, {property.city}
            </span>
            <h2 className="mt-2 font-display text-xl font-semibold text-brand">
              {property.name}
            </h2>
            <p className="mt-1 text-sm text-ink/70">
              {property.bedrooms} &middot; {property.area}
            </p>
            {property.priceFrom !== undefined && (
              <p className="mt-2 text-sm font-medium text-brand">
                A partir de {formatCurrency(property.priceFrom)}
              </p>
            )}
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand">
              Ver detalhes
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}
