import type { Broker } from "@/types";

/**
 * Configuracao do profissional. Para vender a plataforma a outro corretor,
 * troque APENAS este arquivo, nenhum componente contem dados pessoais.
 *
 * Conformidade: enquanto nao houver registro, `creci` fica vazio e `role`
 * usa um termo neutro ("Consultor imobiliario"), nunca "corretor de imóveis".
 *
 * `email` vazio por opcao do cliente, o unico canal de contato e o WhatsApp;
 * componentes escondem o botao/link de e-mail quando este campo esta vazio.
 *
 * Segundo numero de contato (11) 94322-3327, somente WhatsApp, reservado
 * para uso futuro, ainda nao ligado a nenhum componente.
 */
export const broker: Broker = {
  // Comunicacao institucional (equipe), nao pessoal: o site fala como
  // "Bueno Imóveis". Responsavel tecnico: Thiago (CRECI 194198-F). O nome civil
  // do responsavel nao e exibido no site, usado apenas se exigido legalmente.
  name: "Bueno Imóveis",
  preferredName: "Bueno",
  brandName: "Bueno Imóveis",
  role: "Consultoria imobiliária em São Paulo",
  creci: "194198-F",
  phone: "5511925272694",
  email: "",
  city: "São Paulo",
  serviceRegion: "São Paulo",
  instagram: "",
  // Sem foto/retrato pessoal, a marca e institucional (equipe).
  photo: "",
  // Simbolo da marca (predio dourado). O wordmark "Bueno Imóveis" e texto.
  logo: "/logo-bueno-mark.png",
  // Mascote/figura amigavel exibida junto ao botao de WhatsApp.
  mascot: "/consultor-bueno.png",
  whatsappCta: "Fale com minha equipe",
  // Enquanto nao houver CRECI proprio, o site tem carater academico/curricular.
  // Aparece no rodape e omite o rotulo de CRECI (ver identity/Footer).
  academicNotice:
    "Bueno Imóveis é um projeto de caráter acadêmico e curricular. Ainda não possui registro CRECI próprio; o conteúdo é demonstrativo e não constitui oferta de corretagem.",
};
