import type { Broker } from "@/types";

/**
 * Configuracao do profissional. Para vender a plataforma a outro corretor,
 * troque APENAS este arquivo — nenhum componente contem dados pessoais.
 *
 * Conformidade: enquanto nao houver registro, `creci` fica vazio e `role`
 * usa um termo neutro ("Consultor imobiliario"), nunca "corretor de imóveis".
 *
 * `email` vazio por opcao do cliente — o unico canal de contato e o WhatsApp;
 * componentes escondem o botao/link de e-mail quando este campo esta vazio.
 *
 * Segundo numero de contato (11) 94322-3327, somente WhatsApp, reservado
 * para uso futuro — ainda nao ligado a nenhum componente.
 */
export const broker: Broker = {
  // Comunicacao institucional (equipe), nao pessoal: o site fala como
  // "Bueno House". Responsavel tecnico: Thiago (CRECI 194198-F). O nome civil
  // do responsavel nao e exibido no site — usado apenas se exigido legalmente.
  name: "Bueno House",
  preferredName: "Bueno",
  brandName: "Bueno House",
  role: "Consultoria imobiliária em São Paulo",
  creci: "194198-F",
  phone: "5511925272694",
  email: "",
  city: "São Paulo",
  serviceRegion: "São Paulo",
  instagram: "",
  // Sem foto/retrato pessoal — a marca e institucional (equipe).
  photo: "",
  whatsappCta: "Fale com minha equipe",
};
