import { MapPin, MessageCircle, ShieldCheck } from "lucide-react";
import { tenant, identity } from "@/tenants";
import { Section } from "@/components/ui/Section";
import { buttonClasses } from "@/lib/button-styles";
import { buildWhatsappLink, defaultWhatsappMessage } from "@/lib/whatsapp";
import { Seo } from "@/components/shared/Seo";

/**
 * Pagina "Sobre". So usa dado que ja existe em config/tenant — nada de foto,
 * depoimento ou registro profissional inventado. Assume o formato de
 * corretor individual (unico tenant com pagina Sobre construida ate agora);
 * uma imobiliaria (equipe/empresa) precisaria de uma versao propria desta
 * pagina, ainda nao construida.
 */
export function About() {
  const broker = tenant.kind === "individual" ? tenant.broker : null;
  const whatsapp = identity.contact.whatsapp;

  return (
    <Section>
      <Seo
        title="Sobre"
        description="Conheca a proposta de atendimento personalizado para quem busca um imovel compativel com sua realidade financeira."
      />

      <div className="mx-auto max-w-2xl">
        {identity.tagline && (
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">
            {identity.tagline}
          </p>
        )}
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-brand sm:text-5xl">
          {broker?.preferredName ?? identity.displayName}
        </h1>
        {broker && broker.name !== broker.preferredName && (
          <p className="mt-1 text-sm text-ink/50">{broker.name}</p>
        )}

        {identity.photo && (
          <img
            src={identity.photo}
            alt={identity.displayName}
            className="mt-8 aspect-[4/3] w-full rounded-[var(--radius-brand)] object-cover"
          />
        )}

        <p className="mt-8 text-lg leading-relaxed text-ink/80">
          Meu trabalho e ajudar voce a entender as opcoes disponiveis,
          organizar as etapas da compra e encontrar um imovel compativel com a
          sua realidade financeira. Nao acredito em empurrar decisao antes do
          momento certo — acredito em explicar cada passo com clareza para que
          voce decida com seguranca.
        </p>

        <dl className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {identity.serviceRegion && (
            <div className="flex items-start gap-3 rounded-[var(--radius-brand)] border border-brand/10 bg-paper p-4">
              <MapPin className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden />
              <div>
                <dt className="text-xs uppercase tracking-wide text-ink/50">
                  Regiao de atuacao
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
                {identity.registrationLabel ?? "Em regularizacao"}
              </dd>
            </div>
          </div>
        </dl>

        <div className="mt-10 rounded-[var(--radius-brand)] border border-brand/10 bg-paper p-6">
          <h2 className="font-display text-xl font-semibold text-brand">Como funciona o atendimento</h2>
          <ul className="mt-4 space-y-3 text-ink/80">
            <li className="flex gap-3">
              <span className="text-accent">1.</span>
              Entendemos juntos seu objetivo, sua regiao de interesse e sua
              realidade financeira.
            </li>
            <li className="flex gap-3">
              <span className="text-accent">2.</span>
              Selecionamos opcoes compativeis com o que voce me contou — sem
              empurrar imovel fora do seu perfil.
            </li>
            <li className="flex gap-3">
              <span className="text-accent">3.</span>
              Acompanho voce nas visitas, na proposta e ate a entrega das
              chaves.
            </li>
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
            Falar pelo WhatsApp
          </a>
        )}
      </div>
    </Section>
  );
}
