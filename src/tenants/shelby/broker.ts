import type { Broker } from "@/types";

/**
 * Configuracao do profissional Shelby. ESTRUTURA-PLACEHOLDER espelhando o
 * tenant joao-victor, preencha com os dados REAIS do Shelby antes de publicar.
 *
 * Disciplina de dado real (igual ao joao-victor): nada de CRECI, telefone ou
 * imovel inventado. Campos vazios sao escondidos automaticamente pelos
 * componentes (o WhatsApp/CTA some enquanto `phone` estiver vazio).
 *
 * A CONFIRMAR antes de ir ao ar:
 *  - `name` (nome civil completo)
 *  - `creci` (quando houver registro)
 *  - `city` / `serviceRegion`
 */
export const broker: Broker = {
  name: "Shelby", // TODO: nome civil completo do Shelby
  preferredName: "Shelby",
  brandName: "Shelby House",
  role: "Consultor imobiliario",
  creci: "",
  phone: "5511934510849",
  email: "",
  city: "São Paulo", // TODO: confirmar
  serviceRegion: "",
  instagram: "",
  photo: "/consultor-shelby-terno.jpg",
  // Enquanto nao houver CRECI proprio, o site tem carater academico/curricular.
  academicNotice:
    "Shelby House é um projeto de caráter acadêmico e curricular. Ainda não possui registro CRECI próprio; o conteúdo é demonstrativo e não constitui oferta de corretagem.",
};
