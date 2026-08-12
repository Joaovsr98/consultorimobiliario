import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { tenant } from "@/tenants";
import { Section } from "@/components/ui/Section";
import { PropertyCard } from "@/components/shared/PropertyCard";
import { buttonClasses } from "@/lib/button-styles";

/**
 * Catalogo de oportunidades na Home — o produto como protagonista. Usa o
 * PropertyCard fotografico. Nao usa `priority` porque na Home estes cards
 * ficam abaixo da dobra (a imagem critica de LCP e a da Hero).
 *
 * A ressalva de valores vive uma vez aqui, no rodape da secao — por isso o
 * card em si mostra o preco de forma limpa.
 */
export function Opportunities() {
  const { properties } = tenant;
  if (properties.length === 0) return null;

  return (
    <Section>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">
            Oportunidades
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-brand sm:text-4xl">
            Empreendimentos selecionados
          </h2>
        </div>
        <Link to="/imoveis" className={buttonClasses("ghost", "md")}>
          Ver todos os imóveis
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      <p className="mt-6 text-sm text-ink/50">
        Valores e disponibilidade sujeitos a alteração.
      </p>
    </Section>
  );
}
