import { MessageCircle } from "lucide-react";
import { useLocation } from "react-router-dom";
import { identity } from "@/tenants";
import { buildWhatsappLink, defaultWhatsappMessage } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

/**
 * Botao flutuante fixo de WhatsApp (global). So renderiza quando o tenant ativo
 * tem WhatsApp confirmado. Comunicacao institucional (equipe), sem retrato
 * pessoal. Fica OCULTO na pagina de detalhe do imovel (`/imoveis/:slug`), onde
 * a conversao e propria e contextual — evita mensagem generica e botao duplicado.
 */
export function WhatsAppButton() {
  const { pathname } = useLocation();
  const onPropertyDetail = /^\/imoveis\/[^/]+$/.test(pathname);

  if (!identity.contact.whatsapp || onPropertyDetail) return null;

  return (
    <div className="fixed bottom-5 right-5 z-30">
      <a
        href={buildWhatsappLink(identity.contact.whatsapp, defaultWhatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent("whatsapp_click", { location: "global" })}
        aria-label={identity.whatsappCta}
        className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-medium text-white shadow-lg shadow-black/15 transition-transform hover:scale-105 focus-visible:scale-105"
      >
        <MessageCircle className="size-5" aria-hidden />
        <span className="hidden sm:inline">{identity.whatsappCta}</span>
      </a>
    </div>
  );
}
