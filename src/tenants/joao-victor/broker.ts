import type { Broker } from "@/types";

/**
 * Configuracao do profissional. Para vender a plataforma a outro corretor,
 * troque APENAS este arquivo — nenhum componente contem dados pessoais.
 *
 * Conformidade: enquanto nao houver registro, `creci` fica vazio e `role`
 * usa um termo neutro ("Consultor imobiliario"), nunca "corretor de imoveis".
 *
 * `email` vazio por opcao do cliente — o unico canal de contato e o WhatsApp;
 * componentes escondem o botao/link de e-mail quando este campo esta vazio.
 *
 * Segundo numero de contato (11) 94322-3327, somente WhatsApp, reservado
 * para uso futuro — ainda nao ligado a nenhum componente.
 */
export const broker: Broker = {
  name: "Joao Victor dos Santos Rodrigues",
  preferredName: "Bueno",
  brandName: "Bueno House",
  role: "Consultor imobiliario",
  creci: "",
  phone: "5511953080670",
  email: "",
  city: "Sao Paulo",
  serviceRegion: "Zona Oeste de Sao Paulo",
  instagram: "",
  photo: "",
};
