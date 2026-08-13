import { MessageCircle } from "lucide-react";
import { identity } from "@/tenants";
import { buildWhatsappLink, defaultWhatsappMessage } from "@/lib/whatsapp";

/**
 * Botao flutuante fixo de WhatsApp, com o mascote do consultor ao lado. So
 * renderiza quando o tenant ativo tem um canal de WhatsApp confirmado
 * (`identity.contact.whatsapp`) — nunca usa telefone institucional como
 * substituto. O mascote e decorativo (pointer-events-none) e some em telas
 * pequenas para nao competir com o conteudo.
 */
export function WhatsAppButton() {
  if (!identity.contact.whatsapp) return null;

  return (
    <div className="fixed bottom-5 right-5 z-30 flex items-end gap-1">
      <img
        src="/consultor-bueno.png"
        alt=""
        aria-hidden
        className="pointer-events-none hidden h-24 w-auto select-none drop-shadow-xl sm:block"
      />
      <a
        href={buildWhatsappLink(identity.contact.whatsapp, defaultWhatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar pelo WhatsApp"
        className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-medium text-white shadow-lg shadow-black/15 transition-transform hover:scale-105 focus-visible:scale-105"
      >
        <MessageCircle className="size-5" aria-hidden />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>
    </div>
  );
}
