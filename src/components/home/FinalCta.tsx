import { ArrowRight, MessageCircle } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { buttonClasses } from "@/lib/button-styles";
import { buildWhatsappLink, defaultWhatsappMessage } from "@/lib/whatsapp";
import { identity } from "@/tenants";

/** Ultimo convite a acao antes do rodape. */
export function FinalCta() {
  return (
    <Section>
      <div className="rounded-[var(--radius-brand)] bg-brand px-6 py-14 text-center sm:px-12">
        <h2 className="font-display text-3xl font-semibold text-paper sm:text-4xl">
          Pronto para dar o próximo passo?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-paper/70">
          Fale agora e receba uma orientacao inicial sem compromisso sobre o seu
          momento de compra.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          {identity.contact.whatsapp && (
            <a
              href={buildWhatsappLink(identity.contact.whatsapp, defaultWhatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses("secondary", "lg")}
            >
              <MessageCircle className="size-4" aria-hidden />
              Falar pelo WhatsApp
            </a>
          )}
          <a href="/#diagnostico" className={buttonClasses("ghost", "lg", "text-paper hover:bg-paper/10")}>
            Fazer a busca guiada
            <ArrowRight className="size-4" aria-hidden />
          </a>
        </div>
      </div>
    </Section>
  );
}
