import { buildWhatsappLink, defaultWhatsappMessage } from "@/lib/whatsapp";
import { identity } from "@/tenants";
import { buttonClasses } from "@/lib/button-styles";
import { Seo } from "@/components/shared/Seo";
import { Section } from "@/components/ui/Section";
import { BuyerDiagnosis } from "@/features/buyer-diagnosis/BuyerDiagnosis";

export function Contact() {
  return (
    <>
      <Seo
        title="Contato"
        description="Faça o diagnóstico do comprador ou fale direto pelo WhatsApp para conversar sobre o seu próximo imóvel."
      />

      <Section className="pb-0 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">Contato</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-brand sm:text-5xl">
          Vamos conversar sobre o seu próximo imóvel
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-ink/70">
          Faça o diagnóstico abaixo para receber um direcionamento inicial, ou
          fale diretamente pelos canais abaixo.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          {identity.contact.whatsapp && (
            <a
              href={buildWhatsappLink(identity.contact.whatsapp, defaultWhatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses("outline", "md")}
            >
              {identity.whatsappCta}
            </a>
          )}
          {identity.contact.email && (
            <a href={`mailto:${identity.contact.email}`} className={buttonClasses("ghost", "md")}>
              Enviar e-mail
            </a>
          )}
        </div>
      </Section>

      <BuyerDiagnosis
        eyebrow="Diagnóstico do comprador"
        title="Vamos entender o seu momento de compra"
        description="Responda em 3 passos rápidos para receber um direcionamento inicial pelo WhatsApp — sem compromisso."
      />
    </>
  );
}
