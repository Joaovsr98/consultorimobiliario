/**
 * Monta um link wa.me com mensagem opcional pre-preenchida. O numero e
 * sempre explicito — nunca lido de uma config fixa — porque cada tenant
 * (corretor individual ou imobiliaria) pode ter um canal de WhatsApp
 * diferente, ou nenhum ainda confirmado.
 */
export function buildWhatsappLink(phone: string, message?: string): string {
  const base = `https://wa.me/${phone}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

/** Mensagem padrao de primeiro contato. */
export const defaultWhatsappMessage = `Ola! Vim pelo site e gostaria de entender minhas opcoes de imovel.`;
