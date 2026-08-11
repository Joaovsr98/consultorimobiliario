import type { Broker } from "@/types";

/**
 * Configuracao do profissional Shelby. ESTRUTURA-PLACEHOLDER espelhando o
 * tenant joao-victor — preencha com os dados REAIS do Shelby antes de publicar.
 *
 * Disciplina de dado real (igual ao joao-victor): nada de CRECI, telefone ou
 * imovel inventado. Campos vazios sao escondidos automaticamente pelos
 * componentes (o WhatsApp/CTA some enquanto `phone` estiver vazio).
 *
 * A CONFIRMAR antes de ir ao ar:
 *  - `name` (nome civil completo)
 *  - `phone` (WhatsApp, formato 55DDDNUMERO)
 *  - `creci` (quando houver registro)
 *  - `city` / `serviceRegion`
 */
export const broker: Broker = {
  name: "Shelby", // TODO: nome civil completo do Shelby
  preferredName: "Shelby",
  brandName: "Shelby House",
  role: "Consultor imobiliario",
  creci: "",
  phone: "", // TODO: WhatsApp no formato 5511999999999 — CTAs ficam ocultos ate preencher
  email: "",
  city: "Sao Paulo", // TODO: confirmar
  serviceRegion: "",
  instagram: "",
  photo: "",
};
