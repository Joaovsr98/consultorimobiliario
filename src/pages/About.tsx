import { MapPin, MessageCircle, ShieldCheck } from "lucide-react";
import { identity, tenant } from "@/tenants";
import { Section } from "@/components/ui/Section";
import { buttonClasses } from "@/lib/button-styles";
import { buildWhatsappLink, defaultWhatsappMessage } from "@/lib/whatsapp";
import { Seo } from "@/components/shared/Seo";

const DEFAULT_INTRO = [
  "Nosso trabalho é ajudar você a entender as opções disponíveis, organizar as etapas da compra e encontrar um imóvel compatível com a sua realidade financeira. Não acreditamos em empurrar decisão antes do momento certo — acreditamos em explicar cada passo com clareza para que você decida com segurança.",
];
const DEFAULT_STEPS = [
  "Entendemos juntos seu objetivo, sua região de interesse e sua realidade financeira.",
  "Selecionamos opções compatíveis com o que você nos contou — sem empurrar imóvel fora do seu perfil.",
  "Acompanhamos você nas visitas, na proposta e até a entrega das chaves.",
];

/**
 * Pagina "Sobre" — comunicacao INSTITUCIONAL (equipe), nao pessoal. Fala como
 * a marca (identity.displayName), sem foto e sem nome de pessoa fisica. So usa
 * dado que ja existe em config/tenant — nada inventado.
 */
export function About() {
  const whatsapp = identity.contact.whatsapp;
  const about = tenant.kind === "individual" ? tenant.home?.about : undefined;
  const intro = about?.intro?.length ? about.intro : DEFAULT_INTRO;
  const steps = about?.steps?.length ? about.steps : DEFAULT_STEPS;

  return (
    <Section>
      <Seo
        title="Sobre"
        description="Conheca a proposta de atendimento personalizado para quem busca um imóvel compatível com sua realidade financeira."
      />

      <div className="mx-auto max-w-2xl">
        {identity.tagline && (
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">
            {identity.tagline}
          </p>
        )}
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-brand sm:text-5xl">
          {identity.displayName}
        </h1>
        {identity.registrationLabel && (
          <p className="mt-2 text-sm font-medium text-ink/60">{identity.registrationLabel}</p>
        )}

        <div className="mt-8 space-y-4 text-lg leading-relaxed text-ink/80">
          {intro.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>

        <dl className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {identity.serviceRegion && (
            <div className="flex items-start gap-3 rounded-[var(--radius-brand)] border border-brand/10 bg-paper p-4">
              <MapPin className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden />
              <div>
                <dt className="text-xs uppercase tracking-wide text-ink/50">
                  Região de atuação
                </dt>
                <dd className="mt-1 font-medium text-brand">{identity.serviceRegion}</dd>
              </div>
            </div>
          )}

          <div className="flex items-start gap-3 rounded-[var(--radius-brand)] border border-brand/10 bg-paper p-4">
            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden />
            <div>
              <dt className="text-xs uppercase tracking-wide text-ink/50">Registro profissional</dt>
              <dd className="mt-1 font-medium text-brand">
                {identity.registrationLabel ?? "Em regularização"}
              </dd>
            </div>
          </div>
        </dl>

        <div className="mt-10 rounded-[var(--radius-brand)] border border-brand/10 bg-paper p-6">
          <h2 className="font-display text-xl font-semibold text-brand">Como funciona o atendimento</h2>
          <ul className="mt-4 space-y-3 text-ink/80">
            {steps.map((step, i) => (
              <li key={step} className="flex gap-3">
                <span className="text-accent">{i + 1}.</span>
                {step}
              </li>
            ))}
          </ul>
        </div>

        {whatsapp && (
          <a
            href={buildWhatsappLink(whatsapp, defaultWhatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses("primary", "lg", "mt-10")}
          >
            <MessageCircle className="size-4" aria-hidden />
            {identity.whatsappCta}
          </a>
        )}
      </div>
    </Section>
  );
}
