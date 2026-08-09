import { Link, useParams } from "react-router-dom";
import { ArrowLeft, MapPin } from "lucide-react";
import { tenant } from "@/tenants";
import { Section } from "@/components/ui/Section";
import { buttonClasses } from "@/lib/button-styles";
import { Seo } from "@/components/shared/Seo";
import { PropertyGallery } from "@/components/shared/PropertyGallery";
import { formatCurrency } from "@/lib/utils";
import { NotFound } from "./NotFound";

export function PropertyDetails() {
  const { slug } = useParams();
  const property = tenant.properties.find((p) => p.slug === slug);

  if (!property) return <NotFound />;

  return (
    <Section>
      <Seo title={property.name} description={property.description} />

      <Link
        to="/imoveis"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink/60 transition-colors hover:text-brand"
      >
        <ArrowLeft className="size-4" aria-hidden />
        Voltar para imoveis
      </Link>

      <div className="mt-6 max-w-4xl">
        <span className="flex items-center gap-1.5 text-sm text-ink/60">
          <MapPin className="size-4 text-accent" aria-hidden />
          {property.neighborhood}, {property.city}
        </span>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-brand sm:text-5xl">
          {property.name}
        </h1>
        <p className="mt-4 text-lg text-ink/70">{property.description}</p>

        {property.images.length > 0 && (
          <div className="mt-8">
            <PropertyGallery images={property.images} alt={property.name} />
          </div>
        )}

        <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
          <div className="rounded-[var(--radius-brand)] border border-brand/10 bg-paper p-4">
            <dt className="text-xs uppercase tracking-wide text-ink/50">Dormitorios</dt>
            <dd className="mt-1 font-medium text-brand">{property.bedrooms}</dd>
          </div>
          <div className="rounded-[var(--radius-brand)] border border-brand/10 bg-paper p-4">
            <dt className="text-xs uppercase tracking-wide text-ink/50">Metragem</dt>
            <dd className="mt-1 font-medium text-brand">{property.area}</dd>
          </div>
          <div className="rounded-[var(--radius-brand)] border border-brand/10 bg-paper p-4">
            <dt className="text-xs uppercase tracking-wide text-ink/50">Entrega</dt>
            <dd className="mt-1 font-medium text-brand">
              {property.delivery ?? "A definir"}
            </dd>
          </div>
          {property.priceFrom !== undefined && (
            <div className="rounded-[var(--radius-brand)] border border-brand/10 bg-paper p-4">
              <dt className="text-xs uppercase tracking-wide text-ink/50">A partir de</dt>
              <dd className="mt-1 font-medium text-brand">
                {formatCurrency(property.priceFrom)}
              </dd>
            </div>
          )}
        </dl>

        {property.features.length > 0 && (
          <div className="mt-8">
            <h2 className="font-display text-xl font-semibold text-brand">Diferenciais</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {property.features.map((feature) => (
                <li
                  key={feature}
                  className="rounded-full border border-brand/10 bg-paper px-3 py-1.5 text-sm text-ink/80"
                >
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="mt-8 text-sm text-ink/50">
          Valores e disponibilidade sujeitos a alteracao.
        </p>

        <div className="mt-6">
          <Link to="/contato" className={buttonClasses("primary", "lg")}>
            Agendar visita
          </Link>
        </div>

        {property.images.length === 0 && (
          <p className="mt-10 inline-block rounded-[var(--radius-brand)] border border-brand/10 bg-paper px-4 py-3 text-sm text-ink/60">
            Plantas, area de lazer e localizacao detalhada chegam nas proximas
            fases.
          </p>
        )}
      </div>
    </Section>
  );
}
