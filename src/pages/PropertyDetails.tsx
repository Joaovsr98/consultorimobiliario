import { Link, useParams } from "react-router-dom";
import { ArrowLeft, BedDouble, CalendarDays, MapPin, MessageCircle, Ruler, Tag } from "lucide-react";
import { tenant, identity } from "@/tenants";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { buttonClasses } from "@/lib/button-styles";
import { buildWhatsappLink } from "@/lib/whatsapp";
import { Seo } from "@/components/shared/Seo";
import { PropertyGallery } from "@/components/shared/PropertyGallery";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatCurrency } from "@/lib/utils";
import { NotFound } from "./NotFound";

/** Separa as imagens por tipo pelo nome do arquivo (convencao atual dos assets). */
function splitImages(images: string[]) {
  const plantas = images.filter((s) => s.includes("/planta"));
  const localizacao = images.filter((s) => /mapa-localizacao|foto-aerea|implantacao/.test(s));
  const galeria = images.filter((s) => !plantas.includes(s) && !localizacao.includes(s));
  return { galeria, plantas, localizacao };
}

export function PropertyDetails() {
  const { slug } = useParams();
  const property = tenant.properties.find((p) => p.slug === slug);

  if (!property) return <NotFound />;

  const whatsapp = identity.contact.whatsapp;
  const heroImage = property.images[0];
  const { galeria, plantas, localizacao } = splitImages(property.images);

  const facts = [
    { icon: BedDouble, label: "Dormitórios", value: property.bedrooms },
    { icon: Ruler, label: "Metragem", value: property.area },
    { icon: CalendarDays, label: "Entrega", value: property.delivery ?? "A definir" },
    ...(property.priceFrom !== undefined
      ? [{ icon: Tag, label: "A partir de", value: formatCurrency(property.priceFrom) }]
      : []),
  ];

  const visitLink = whatsapp
    ? buildWhatsappLink(whatsapp, `Olá! Tenho interesse em agendar uma visita ao ${property.name}.`)
    : null;

  const mapsQuery = property.address ?? `${property.name} ${property.neighborhood} ${property.city}`;
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`;

  return (
    <>
      <Seo title={property.name} description={property.description} />

      {/* Hero visual do empreendimento */}
      <section className="relative isolate flex min-h-[52vh] items-end overflow-hidden bg-brand">
        {heroImage && (
          <img
            src={heroImage}
            alt={property.name}
            loading="eager"
            fetchPriority="high"
            className="absolute inset-0 size-full object-cover"
            style={{ objectPosition: "center 35%" }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-brand/90 via-brand/45 to-brand/20" aria-hidden />

        <Container className="absolute inset-x-0 top-4">
          <Link
            to="/imoveis"
            className="inline-flex items-center gap-1.5 rounded-full bg-paper/85 px-3 py-1.5 text-sm font-medium text-brand backdrop-blur-sm transition-colors hover:bg-paper"
          >
            <ArrowLeft className="size-4" aria-hidden />
            Voltar para imóveis
          </Link>
        </Container>

        <Container className="relative py-10">
          {property.status && <StatusBadge status={property.status} />}
          <h1 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight text-paper sm:text-5xl">
            {property.name}
          </h1>
          <p className="mt-2 flex items-center gap-1.5 text-paper/80">
            <MapPin className="size-4 shrink-0 text-accent" aria-hidden />
            {property.neighborhood}, {property.city}
          </p>
        </Container>
      </section>

      <Section>
        {/* Barra de fatos */}
        <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {facts.map((fact) => (
            <div
              key={fact.label}
              className="rounded-card border border-brand/10 bg-paper p-4 shadow-card"
            >
              <dt className="flex items-center gap-1.5 text-xs uppercase tracking-wide text-ink/50">
                <fact.icon className="size-3.5 text-accent" aria-hidden />
                {fact.label}
              </dt>
              <dd className="mt-1 font-display text-lg font-semibold text-brand">{fact.value}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-10 max-w-3xl text-lg leading-relaxed text-ink/75">{property.description}</p>

        {galeria.length > 0 && (
          <div className="mt-12">
            <h2 className="font-display text-2xl font-semibold text-brand">Galeria</h2>
            <div className="mt-5">
              <PropertyGallery images={galeria} alt={property.name} />
            </div>
          </div>
        )}

        {property.features.length > 0 && (
          <div className="mt-12">
            <h2 className="font-display text-2xl font-semibold text-brand">Diferenciais</h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {property.features.map((feature) => (
                <li
                  key={feature}
                  className="rounded-full border border-brand/10 bg-paper px-4 py-2 text-sm text-ink/80"
                >
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        {plantas.length > 0 && (
          <div className="mt-12">
            <h2 className="font-display text-2xl font-semibold text-brand">Plantas</h2>
            <div className="mt-5">
              <PropertyGallery images={plantas} alt={`${property.name} — planta`} />
            </div>
          </div>
        )}

        <div className="mt-12">
          <h2 className="font-display text-2xl font-semibold text-brand">Localização</h2>
          <a
            href={mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-brand/15 bg-paper px-4 py-2 text-sm font-medium text-brand shadow-card transition-colors hover:bg-brand hover:text-paper"
          >
            <MapPin className="size-4 text-accent" aria-hidden />
            Ver no Google Maps
          </a>
          {property.address && <p className="mt-3 text-sm text-ink/60">{property.address}</p>}
          <div className="mt-5 overflow-hidden rounded-card border border-brand/10 shadow-card">
            <iframe
              title={`Mapa de ${property.name}`}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(mapsQuery)}&z=15&output=embed`}
              className="h-[320px] w-full sm:h-[440px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          {localizacao.length > 0 && (
            <div className="mt-5">
              <PropertyGallery images={localizacao} alt={`${property.name} — localização`} />
            </div>
          )}
        </div>

        <p className="mt-10 text-sm text-ink/50">Valores e disponibilidade sujeitos a alteração.</p>

        {property.images.length === 0 && (
          <p className="mt-8 inline-block rounded-card border border-brand/10 bg-paper px-4 py-3 text-sm text-ink/60">
            Fotos, plantas e localização detalhada deste empreendimento chegam em breve.
          </p>
        )}
      </Section>

      {/* Fecho comercial: agendar visita */}
      <Section className="bg-brand text-paper">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold text-paper sm:text-4xl">
            Quer conhecer o {property.name} de perto?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-paper/70">
            Agende uma visita e tire suas dúvidas sobre valores, plantas e condições.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            {visitLink ? (
              <a
                href={visitLink}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses("secondary", "lg")}
              >
                <MessageCircle className="size-4" aria-hidden />
                Agendar visita
              </a>
            ) : (
              <Link to="/contato" className={buttonClasses("secondary", "lg")}>
                Agendar visita
              </Link>
            )}
          </div>
        </div>
      </Section>

      {/* Atalho flutuante de agendamento, empilhado acima do botao de WhatsApp */}
      {visitLink ? (
        <a
          href={visitLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Agendar visita ao ${property.name}`}
          className="fixed bottom-[5.5rem] right-5 z-40 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-3 text-sm font-semibold text-brand shadow-lg shadow-black/15 transition-transform hover:scale-105 focus-visible:scale-105"
        >
          <CalendarDays className="size-5" aria-hidden />
          <span className="hidden sm:inline">Agendar visita</span>
        </a>
      ) : (
        <Link
          to="/contato"
          aria-label="Agendar visita"
          className="fixed bottom-[5.5rem] right-5 z-40 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-3 text-sm font-semibold text-brand shadow-lg shadow-black/15 transition-transform hover:scale-105 focus-visible:scale-105"
        >
          <CalendarDays className="size-5" aria-hidden />
          <span className="hidden sm:inline">Agendar visita</span>
        </Link>
      )}
    </>
  );
}
