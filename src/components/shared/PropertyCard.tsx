import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import type { Property } from "@/types";
import { formatPriceFrom } from "@/lib/utils";
import { PropertyImage } from "@/components/ui/PropertyImage";
import { StatusBadge } from "@/components/ui/StatusBadge";

type PropertyCardProps = {
  property: Property;
  /**
   * `eager` + prioridade alta apenas para cards acima da dobra (ex.: primeiro
   * da grade). Padrao `lazy` para nao competir com o LCP.
   */
  priority?: boolean;
};

/**
 * Card fotografico de empreendimento. Reutilizavel em Home, /imoveis e
 * resultados futuros, para qualquer tenant — nao contem dado de marca.
 *
 * Principios (Lote 1): imagem como protagonista, poucos dados essenciais (nao
 * e ficha tecnica), preco so quando existe, um unico CTA. Preco fica sem
 * ressalva no card por densidade — a ressalva "valores sujeitos a alteração"
 * vive uma vez por secao/pagina, como ja acontece hoje.
 */
export function PropertyCard({ property, priority = false }: PropertyCardProps) {
  const essentials = [
    property.bedrooms,
    property.area,
    property.delivery ? `Entrega ${property.delivery}` : null,
  ].filter(Boolean);

  return (
    <Link
      to={`/imoveis/${property.slug}`}
      aria-label={`${property.name} — ${property.neighborhood}, ${property.city}`}
      className="group flex h-full flex-col overflow-hidden rounded-card border border-brand/10 bg-paper shadow-card transition-[box-shadow,border-color] duration-300 hover:border-brand/20 hover:shadow-card-hover"
    >
      <div className="relative">
        <PropertyImage
          src={property.images[0]}
          alt={property.name}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          className="rounded-none"
          imgClassName="transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
        {property.status && (
          <StatusBadge status={property.status} className="absolute left-3 top-3" />
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="flex items-center gap-1.5 text-sm text-ink/55">
          <MapPin className="size-3.5 shrink-0 text-accent" aria-hidden />
          {property.neighborhood} · {property.city}
        </p>

        <h3 className="mt-1.5 font-display text-xl font-semibold leading-snug tracking-tight text-brand">
          {property.name}
        </h3>

        {essentials.length > 0 && (
          <p className="mt-2 text-sm text-ink/70">{essentials.join(" · ")}</p>
        )}

        <div className="mt-4 flex flex-1 flex-col justify-end gap-3">
          {property.priceFrom !== undefined && (
            <p className="text-sm text-ink/60">
              A partir de{" "}
              <span className="font-display text-lg font-semibold text-brand">
                {formatPriceFrom(property.priceFrom)}
              </span>
            </p>
          )}

          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
            Conhecer empreendimento
            <ArrowRight
              className="size-4 text-accent transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden
            />
          </span>
        </div>
      </div>
    </Link>
  );
}
