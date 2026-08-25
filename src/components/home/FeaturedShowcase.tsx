import { Link } from "react-router-dom";
import { ArrowRight, BedDouble, CalendarDays, MapPin, Ruler } from "lucide-react";
import { tenant, identity } from "@/tenants";
import { Section } from "@/components/ui/Section";
import { PropertyImage } from "@/components/ui/PropertyImage";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { buttonClasses } from "@/lib/button-styles";
import { formatCurrency } from "@/lib/utils";

/**
 * Empreendimento em destaque — experiencia imersiva de produto, em fundo
 * escuro, para criar um momento de impacto no ritmo da Home. Mostra o imovel
 * marcado como `featured` no tenant. So renderiza se houver um.
 *
 * Diferenciais limitados (nao e ficha tecnica). Preco com "A partir de" +
 * ressalva de valores ao pe da secao. CTAs: conhecer (produto) e agendar
 * visita (conversao) — sem competir com um terceiro botao.
 */
export function FeaturedShowcase() {
  const property = tenant.properties.find((p) => p.featured);
  if (!property) return null;

  const facts = [
    { icon: BedDouble, label: property.bedrooms },
    { icon: Ruler, label: property.area },
    ...(property.delivery ? [{ icon: CalendarDays, label: `Entrega ${property.delivery}` }] : []),
  ];
  const differentials = property.features.slice(0, 6);

  return (
    <Section className="bg-brand text-paper">
      <p className="text-sm font-semibold uppercase tracking-wide text-accent">
        Empreendimento em destaque
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
        <div className="relative">
          <PropertyImage
            src={property.images[0]}
            alt={property.name}
            ratio="4 / 3"
            imgClassName="rounded-image"
          />
          {property.status && (
            <StatusBadge status={property.status} className="absolute left-4 top-4" />
          )}
        </div>

        <div>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
            {property.name}
          </h2>
          <p className="mt-2 flex items-center gap-1.5 text-sm text-paper/70">
            <MapPin className="size-4 shrink-0 text-accent" aria-hidden />
            {property.neighborhood}, {property.city}
          </p>

          <p className="mt-5 text-paper/75">{property.description}</p>

          <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
            {facts.map((fact) => (
              <div key={fact.label} className="flex items-center gap-2">
                <fact.icon className="size-4 text-accent" aria-hidden />
                <dd className="text-sm font-medium text-paper">{fact.label}</dd>
              </div>
            ))}
          </dl>

          {property.priceFrom !== undefined ? (
            <p className="mt-6 text-sm text-paper/70">
              A partir de{" "}
              <span className="font-display text-2xl font-semibold text-paper">
                {formatCurrency(property.priceFrom)}
              </span>
            </p>
          ) : property.priceLabel ? (
            <p className="mt-6 font-display text-2xl font-semibold text-paper">
              {property.priceLabel}
            </p>
          ) : null}

          {differentials.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2">
              {differentials.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-paper/20 px-3 py-1.5 text-sm text-paper/80"
                >
                  {item}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to={`/imoveis/${property.slug}`} className={buttonClasses("secondary", "lg")}>
              Conhecer empreendimento
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link
              to="/contato"
              className={buttonClasses("outline", "lg", "border-paper/40 text-paper hover:bg-paper/10")}
            >
              {identity.whatsappCta}
            </Link>
          </div>
        </div>
      </div>

      <p className="mt-8 text-sm text-paper/50">
        Valores e disponibilidade sujeitos a alteração.
      </p>
    </Section>
  );
}
