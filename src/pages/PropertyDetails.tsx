import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, BedDouble, CalendarDays, Clock, MapPin, MessageCircle, Ruler, Tag, TrainFront } from "lucide-react";
import { tenant, identity } from "@/tenants";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { buttonClasses } from "@/lib/button-styles";
import { buildWhatsappLink, propertyWhatsappMessage } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { Seo } from "@/components/shared/Seo";
import { PropertyGallery, type PropertyGalleryHandle } from "@/components/shared/PropertyGallery";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { cn, formatArea, formatCurrency } from "@/lib/utils";
import { NotFound } from "./NotFound";

const STOPWORDS = new Set(["e", "de", "do", "da", "com", "a", "o", "para", "em"]);
const normalize = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

/** Casa um diferencial com a foto da galeria pelo nome do arquivo (maior sobreposicao de palavras). */
function matchFeatureImage(feature: string, galeria: string[]): number {
  const ftokens = normalize(feature)
    .split(/[^a-z0-9]+/)
    .filter((t) => t && !STOPWORDS.has(t));
  let best = -1;
  let bestScore = 0;
  galeria.forEach((src, i) => {
    const base = normalize(src.split("/").pop() ?? "").replace(/\.[a-z0-9]+$/, "");
    const btokens = base.split(/[^a-z0-9]+/).filter(Boolean);
    const score = ftokens.filter((t) => btokens.includes(t)).length;
    if (score > bestScore) {
      bestScore = score;
      best = i;
    }
  });
  return bestScore > 0 ? best : -1;
}

/** Separa as imagens por tipo pelo nome do arquivo (convencao atual dos assets). */
function splitImages(images: string[]) {
  const plantas = images.filter((s) => s.includes("/planta"));
  const localizacao = images.filter((s) => /mapa-localizacao|foto-aerea|implantacao/.test(s));
  const galeria = images.filter((s) => !plantas.includes(s) && !localizacao.includes(s));
  return { galeria, plantas, localizacao };
}

export function PropertyDetails() {
  const { slug } = useParams();
  const galeriaRef = useRef<PropertyGalleryHandle>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapFocus, setMapFocus] = useState<string | null>(null);
  const property = tenant.properties.find((p) => p.slug === slug);

  // Evento de visualizacao do imovel (analytics; contexto interno, nunca no WhatsApp).
  useEffect(() => {
    if (!property) return;
    trackEvent("property_view", {
      property_id: property.id,
      property_name: property.name,
      property_slug: property.slug,
    });
  }, [property]);

  if (!property) return <NotFound />;

  const whatsapp = identity.contact.whatsapp;
  const heroImage = property.images[0];
  const { galeria, plantas, localizacao } = splitImages(property.images);

  // Proximidade do metro — SO quando existir no dado do empreendimento (nao inventar).
  const metroNearby = property.nearby?.find((n) => /metr[ôo]|esta[çc][ãa]o/i.test(n.place));

  /** Contexto do imovel para os eventos de analytics. */
  const eventCtx = {
    property_id: property.id,
    property_name: property.name,
    property_slug: property.slug,
  };
  const onWhatsappClick = (location: string) => trackEvent("whatsapp_click", { ...eventCtx, location });

  const facts = [
    { icon: BedDouble, label: "Dormitórios", value: property.bedrooms },
    { icon: Ruler, label: "Metragem", value: formatArea(property.area) },
    { icon: CalendarDays, label: "Entrega", value: property.delivery ?? "A definir" },
    ...(property.priceFrom !== undefined
      ? [{ icon: Tag, label: "A partir de", value: formatCurrency(property.priceFrom) }]
      : []),
  ];

  const contactLink = whatsapp
    ? buildWhatsappLink(whatsapp, propertyWhatsappMessage(property.name))
    : null;
  const ctaLabel = identity.whatsappCta;

  const propertyQuery =
    property.address ?? `${property.name}, ${property.neighborhood}, ${property.city}`;
  // Coordenadas exatas fixam o pin melhor que o endereco; sem elas, cai no texto.
  const originPoint = property.coords
    ? `${property.coords.lat},${property.coords.lng}`
    : propertyQuery;
  // Sem foco: mostra o empreendimento. Com foco num ponto: mostra a ROTA do
  // empreendimento ate o ponto — assim o empreendimento continua visivel e da
  // pra ter nocao da distancia.
  const mapEmbedSrc = mapFocus
    ? `https://maps.google.com/maps?saddr=${encodeURIComponent(originPoint)}&daddr=${encodeURIComponent(mapFocus)}&output=embed`
    : `https://maps.google.com/maps?q=${encodeURIComponent(originPoint)}&z=16&output=embed`;
  const mapsLink = mapFocus
    ? `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(originPoint)}&destination=${encodeURIComponent(mapFocus)}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(originPoint)}`;

  const focusOnMap = (place: string) => {
    setMapFocus(`${place}, ${property.neighborhood}, ${property.city}`);
    mapRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

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

          {/* Essencial na 1a dobra: preco (quando valido) + dorm + metragem */}
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-paper">
            {property.priceFrom !== undefined && (
              <span className="text-sm">
                A partir de{" "}
                <span className="font-display text-xl font-semibold text-accent">
                  {formatCurrency(property.priceFrom)}
                </span>
              </span>
            )}
            <span className="text-sm text-paper/85">{property.bedrooms}</span>
            <span className="text-sm text-paper/85">{formatArea(property.area)}</span>
          </div>

          {metroNearby && (
            <p className="mt-2 flex items-center gap-1.5 text-sm text-paper/85">
              <TrainFront className="size-4 shrink-0 text-accent" aria-hidden />
              {metroNearby.place}
              {metroNearby.time ? ` · ${metroNearby.time}` : ""}
            </p>
          )}

          {contactLink && (
            <a
              href={contactLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onWhatsappClick("property_hero")}
              className={buttonClasses("secondary", "md", "mt-5")}
            >
              <MessageCircle className="size-4" aria-hidden />
              {ctaLabel}
            </a>
          )}
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
              <PropertyGallery ref={galeriaRef} images={galeria} alt={property.name} />
            </div>
          </div>
        )}

        {property.features.length > 0 && (
          <div className="mt-12">
            <h2 className="font-display text-2xl font-semibold text-brand">Diferenciais</h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {property.features.map((feature) => {
                const imgIndex = matchFeatureImage(feature, galeria);
                if (imgIndex >= 0) {
                  return (
                    <li key={feature}>
                      <button
                        type="button"
                        onClick={() => galeriaRef.current?.openAt(imgIndex)}
                        className="rounded-full border border-brand/10 bg-paper px-4 py-2 text-sm text-ink/80 transition-colors hover:border-accent hover:bg-accent/10 hover:text-brand"
                      >
                        {feature}
                      </button>
                    </li>
                  );
                }
                return (
                  <li
                    key={feature}
                    className="rounded-full border border-brand/10 bg-paper px-4 py-2 text-sm text-ink/80"
                  >
                    {feature}
                  </li>
                );
              })}
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
            {mapFocus ? "Ver rota no Google Maps" : "Ver no Google Maps"}
          </a>
          {property.address && <p className="mt-3 text-sm text-ink/60">{property.address}</p>}
          <div ref={mapRef} className="mt-5 overflow-hidden rounded-card border border-brand/10 shadow-card">
            <iframe
              title={`Mapa de ${property.name}`}
              src={mapEmbedSrc}
              className="h-[320px] w-full sm:h-[440px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          {mapFocus && (
            <button
              type="button"
              onClick={() => setMapFocus(null)}
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-brand"
            >
              <ArrowLeft className="size-4" aria-hidden />
              Voltar ao empreendimento no mapa
            </button>
          )}
          {property.nearby && property.nearby.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-ink/50">
                O que tem por perto <span className="font-normal normal-case text-ink/40">— toque para ver no mapa</span>
              </h3>
              <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {property.nearby.map((item) => {
                  const isActive = mapFocus === `${item.place}, ${property.neighborhood}, ${property.city}`;
                  return (
                    <li key={item.place}>
                      <button
                        type="button"
                        onClick={() => focusOnMap(item.place)}
                        aria-pressed={isActive}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-card border p-3 text-left text-sm shadow-card transition-colors",
                          isActive
                            ? "border-accent bg-accent/10"
                            : "border-brand/10 bg-paper hover:border-accent hover:bg-accent/5"
                        )}
                      >
                        <MapPin className="size-4 shrink-0 text-accent" aria-hidden />
                        <span className="flex-1 text-ink/80">{item.place}</span>
                        {item.time && (
                          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-brand/5 px-2 py-0.5 text-xs font-medium text-brand">
                            <Clock className="size-3" aria-hidden />
                            {item.time}
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
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

      {/* Fecho comercial */}
      <Section className="bg-brand text-paper">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold text-paper sm:text-4xl">
            Interessado no {property.name}?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-paper/70">
            Fale com nossa equipe e receba valores, plantas e as condições disponíveis.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            {contactLink ? (
              <a
                href={contactLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onWhatsappClick("property_bottom")}
                className={buttonClasses("secondary", "lg")}
              >
                <MessageCircle className="size-4" aria-hidden />
                {ctaLabel}
              </a>
            ) : (
              <Link to="/contato" className={buttonClasses("secondary", "lg")}>
                {ctaLabel}
              </Link>
            )}
          </div>
          <p className="mt-6 text-xs text-paper/55">
            {identity.displayName}
            {identity.registrationLabel ? ` · ${identity.registrationLabel}` : ""} · Valores e
            disponibilidade sujeitos a alteração.
          </p>
        </div>
      </Section>

      {/* Conversao UNICA na pagina do imovel (o WhatsApp global fica oculto aqui,
          ver WhatsAppButton.tsx): barra fixa no mobile + pill flutuante no desktop. */}
      {contactLink && (
        <>
          {/* Mobile: barra inferior fixa, com preco + CTA */}
          <div className="fixed inset-x-0 bottom-0 z-40 border-t border-brand/10 bg-paper/95 px-4 py-3 shadow-[0_-6px_24px_-8px_rgba(13,27,42,0.25)] backdrop-blur sm:hidden">
            <div className="flex items-center gap-3">
              <div className="min-w-0">
                {property.priceFrom !== undefined ? (
                  <>
                    <p className="text-[0.7rem] uppercase tracking-wide text-ink/50">A partir de</p>
                    <p className="font-display text-base font-semibold leading-tight text-brand">
                      {formatCurrency(property.priceFrom)}
                    </p>
                  </>
                ) : (
                  <p className="truncate font-display text-sm font-semibold text-brand">
                    {property.name}
                  </p>
                )}
              </div>
              <a
                href={contactLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onWhatsappClick("property_sticky_mobile")}
                className={cn(buttonClasses("primary", "md"), "ml-auto shrink-0")}
              >
                <MessageCircle className="size-4" aria-hidden />
                {ctaLabel}
              </a>
            </div>
          </div>

          {/* Desktop: pill flutuante de WhatsApp, contextual */}
          <a
            href={contactLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onWhatsappClick("property_float_desktop")}
            aria-label={ctaLabel}
            className="fixed bottom-5 right-5 z-40 hidden items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-medium text-white shadow-lg shadow-black/15 transition-transform hover:scale-105 focus-visible:scale-105 sm:inline-flex"
          >
            <MessageCircle className="size-5" aria-hidden />
            {ctaLabel}
          </a>

          {/* Espaco para a barra fixa nao cobrir o rodape no mobile */}
          <div className="h-20 sm:hidden" aria-hidden />
        </>
      )}
    </>
  );
}
