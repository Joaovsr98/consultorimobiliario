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
    <div className="fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom))] right-5 z-30 flex items-end gap-1">
      {identity.mascot && (
        // Mascote decorativo. Anima (flutua/cutuca em direção ao botão) e pausa
        // no hover, quando o zoom da própria imagem entra.
        <span className="mascot-idle hidden origin-bottom hover:[animation-play-state:paused] sm:block">
          <img
            src={identity.mascot}
            alt=""
            aria-hidden
            className="h-24 w-auto origin-bottom cursor-pointer select-none drop-shadow-xl transition-transform duration-300 ease-out hover:scale-[1.35] motion-reduce:transition-none"
          />
        </span>
      )}
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
