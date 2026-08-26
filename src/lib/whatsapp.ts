/**
 * Monta um link wa.me com mensagem opcional pre-preenchida. O numero e
 * sempre explicito, nunca lido de uma config fixa, porque cada tenant
 * (corretor individual ou imobiliaria) pode ter um canal de WhatsApp
 * diferente, ou nenhum ainda confirmado.
 */
export function buildWhatsappLink(phone: string, message?: string): string {
  const base = `https://wa.me/${phone}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

/** Mensagem padrão de primeiro contato. */
export const defaultWhatsappMessage = `Olá! Vim pelo site e gostaria de entender minhas opções de imóvel.`;

/**
 * Mensagem contextual da página de um empreendimento, limpa, sem UTM nem
 * código técnico. A origem (imóvel/UTM) é registrada via analytics, não aqui.
 */
export function propertyWhatsappMessage(name: string): string {
  return `Olá! Tenho interesse no ${name} e gostaria de receber valores e condições disponíveis.`;
}
