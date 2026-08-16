import { useParams } from "react-router-dom";
import { MapPin, MessageCircle, Sparkles, Train, Users } from "lucide-react";
import { tenant, identity } from "@/tenants";
import { getNeighborhoodBySlug } from "@/data/neighborhoods";
import { Section } from "@/components/ui/Section";
import { Seo } from "@/components/shared/Seo";
import { JsonLd } from "@/components/shared/JsonLd";
import { PropertyCard } from "@/components/shared/PropertyCard";
import { buttonClasses } from "@/lib/button-styles";
import { buildWhatsappLink, defaultWhatsappMessage } from "@/lib/whatsapp";
import { NotFound } from "./NotFound";

/**
 * Landing page de bairro (SEO local). Conteudo unico vem de data/neighborhoods,
 * e os imoveis do bairro sao filtrados do tenant ativo por `neighborhood`.
 * Mesma pagina serve todos os bairros — o que muda e o dado, nao o layout.
 */
export function Neighborhood() {
  const { neighborhoodSlug } = useParams();
  const data = neighborhoodSlug ? getNeighborhoodBySlug(neighborhoodSlug) : undefined;

  if (!data) return <NotFound />;

  const properties = tenant.properties.filter((p) => p.neighborhood === data.neighborhood);
  const whatsapp = identity.contact.whatsapp;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <Seo title={data.metaTitle} description={data.metaDescription} />
      <JsonLd id="faq-jsonld" data={faqJsonLd} />

      <Section className="pb-0">
        <p className="flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wide text-accent">
          <MapPin className="size-4" aria-hidden />
          {data.neighborhood} · {data.city}
        </p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold tracking-tight text-brand sm:text-5xl">
          {data.h1}
        </h1>
        <div className="mt-5 max-w-2xl space-y-4 text-lg leading-relaxed text-ink/75">
          {data.intro.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </Section>

      {properties.length > 0 && (
        <Section>
          <h2 className="font-display text-2xl font-semibold text-brand sm:text-3xl">
            Empreendimentos em {data.neighborhood}
          </h2>
          <p className="mt-2 text-ink/60">
            Valores e disponibilidade sujeitos a alteração.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property, index) => (
              <PropertyCard key={property.id} property={property} priority={index === 0} />
            ))}
          </div>
        </Section>
      )}

      <Section className="bg-surface">
        <div className="grid gap-10 lg:grid-cols-3 lg:gap-8">
          <div>
            <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-brand">
              <Train className="size-5 text-accent" aria-hidden />
              Mobilidade
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-ink/75">
              {data.transport.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-brand">
              <Sparkles className="size-5 text-accent" aria-hidden />
              O que tem por perto
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-ink/75">
              {data.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-brand">
              <Users className="size-5 text-accent" aria-hidden />
              Para quem faz sentido
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-ink/75">
              {data.buyerProfile.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section>
        <h2 className="font-display text-2xl font-semibold text-brand sm:text-3xl">
          Perguntas frequentes
        </h2>
        <dl className="mt-8 max-w-2xl space-y-6">
          {data.faq.map((item) => (
            <div key={item.question} className="border-b border-brand/10 pb-6">
              <dt className="font-display text-lg font-semibold text-brand">{item.question}</dt>
              <dd className="mt-2 leading-relaxed text-ink/75">{item.answer}</dd>
            </div>
          ))}
        </dl>

        {whatsapp && (
          <a
            href={buildWhatsappLink(whatsapp, defaultWhatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses("primary", "lg", "mt-10")}
          >
            <MessageCircle className="size-4" aria-hidden />
            Falar sobre imóveis em {data.neighborhood}
          </a>
        )}
      </Section>
    </>
  );
}
