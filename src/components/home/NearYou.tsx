import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, LocateFixed, MapPin, MessageCircle, Search } from "lucide-react";
import { tenant, identity } from "@/tenants";
import type { Property } from "@/types";
import { Section } from "@/components/ui/Section";
import { PropertyCard } from "@/components/shared/PropertyCard";
import { buttonClasses } from "@/lib/button-styles";
import { buildWhatsappLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { rankByDistance, resolveRegion, type GeoPoint } from "@/lib/geo";

const MAX_RESULTS = 3;

type Result = {
  title: string;
  /** Trecho da regiao para a mensagem do WhatsApp (ex.: "de Vila Sônia"). */
  waRegion: string;
  list: Property[];
};

/**
 * Bloco "onde voce quer morar": transforma localizacao em INTENCAO de compra.
 * A pessoa digita um bairro/regiao (sem prompt intrusivo) ou, opcionalmente,
 * usa o GPS (so no clique). Mostramos os empreendimentos ordenados por
 * proximidade , SEM exibir distancia em km (linha reta engana), e o CTA leva a
 * regiao escolhida para o WhatsApp, ja qualificando o lead. Reaproveitado na
 * Home e na pagina de imoveis.
 */
export function NearYou({ id }: { id?: string }) {
  const whatsapp = identity.contact.whatsapp;
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [locating, setLocating] = useState(false);

  const rank = (from: GeoPoint) => rankByDistance(tenant.properties, from).slice(0, MAX_RESULTS);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const region = resolveRegion(query);
    if (!region) {
      setResult(null);
      setError("Não reconhecemos essa região. Tente um bairro de São Paulo, como Vila Sônia, Butantã ou Pinheiros.");
      return;
    }
    const list = rank(region.coords);
    setError(null);
    setResult({
      title: `Imóveis próximos de ${region.label}`,
      waRegion: `de ${region.label}`,
      list,
    });
    trackEvent("near_you_search", { region: region.label, method: "typed", results: list.length });
  };

  const handleGeo = () => {
    if (!("geolocation" in navigator)) {
      setError("Seu navegador não permite usar a localização. Digite um bairro acima.");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const list = rank({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setError(null);
        setResult({ title: "Imóveis próximos de onde você está", waRegion: "da minha região", list });
        setLocating(false);
        trackEvent("near_you_search", { region: "gps", method: "gps", results: list.length });
      },
      () => {
        setLocating(false);
        setError("Não foi possível obter sua localização. Você pode digitar um bairro acima.");
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 600000 }
    );
  };

  const waMessage =
    result &&
    `Olá! Encontrei alguns imóveis próximos ${result.waRegion} no site da ${identity.displayName} e gostaria de conhecer as opções disponíveis.`;

  return (
    <Section id={id} className="bg-surface">
      <div className="mx-auto max-w-3xl text-center">
        <p className="flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-wide text-accent">
          <MapPin className="size-4" aria-hidden />
          Onde você quer morar
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-brand sm:text-4xl">
          Encontre imóveis perto de onde você quer morar
        </h2>
        <p className="mt-3 text-ink/70">
          Digite um bairro ou região de São Paulo e veja os empreendimentos mais próximos.
        </p>

        <form onSubmit={handleSearch} className="mt-6 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-ink/40"
              aria-hidden
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ex.: Vila Sônia, Butantã, Pinheiros..."
              aria-label="Bairro ou região de São Paulo"
              className="w-full rounded-full border border-brand/15 bg-paper py-3 pl-11 pr-4 text-ink shadow-card outline-none transition-colors placeholder:text-ink/40 focus:border-accent"
            />
          </div>
          <button type="submit" className={buttonClasses("primary", "md")}>
            Encontrar imóveis
            <ArrowRight className="size-4" aria-hidden />
          </button>
        </form>

        <button
          type="button"
          onClick={handleGeo}
          disabled={locating}
          className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-ink/60 transition-colors hover:text-brand disabled:opacity-60"
        >
          <LocateFixed className="size-4 text-accent" aria-hidden />
          {locating ? "Localizando..." : "Usar minha localização"}
        </button>

        {error && <p className="mt-4 text-sm text-ink/70">{error}</p>}
      </div>

      {result && (
        <div className="mx-auto mt-10 max-w-5xl">
          <div className="flex items-baseline justify-between gap-3 border-b border-brand/10 pb-3">
            <h3 className="font-display text-xl font-semibold text-brand sm:text-2xl">
              {result.title}
            </h3>
            <span className="shrink-0 text-sm text-ink/50">
              ordenados por proximidade
            </span>
          </div>

          {result.list.length > 0 ? (
            <>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {result.list.map((property, i) => (
                  <PropertyCard key={property.id} property={property} priority={i === 0} />
                ))}
              </div>

              <div className="mt-8 flex flex-col items-center gap-3">
                {whatsapp && waMessage && (
                  <a
                    href={buildWhatsappLink(whatsapp, waMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackEvent("whatsapp_click", { location: "near_you", region: result.waRegion })
                    }
                    className={buttonClasses("primary", "lg")}
                  >
                    <MessageCircle className="size-4" aria-hidden />
                    {identity.whatsappCta}
                  </a>
                )}
                <Link
                  to="/imoveis"
                  className="text-sm font-medium text-accent transition-colors hover:text-brand"
                >
                  Ver todos os imóveis
                </Link>
              </div>
            </>
          ) : (
            <p className="mt-6 text-center text-ink/70">
              Ainda não temos empreendimentos cadastrados nessa região. Fale com a equipe que
              buscamos alternativas para você.
            </p>
          )}
        </div>
      )}
    </Section>
  );
}
