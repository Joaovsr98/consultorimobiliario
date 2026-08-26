import type { Broker } from "@/types";

/**
 * Configuracao do consultor Britto, site com foco nos empreendimentos da
 * EXTO Incorporadora (alto padrao em bairros nobres de Sao Paulo).
 *
 * Disciplina de dado real: nada de CRECI, imovel ou dado inventado. Campos
 * vazios sao escondidos automaticamente pelos componentes.
 *
 * A CONFIRMAR antes de ir ao ar:
 *  - `name` (nome civil completo)
 *  - `creci` (quando houver registro)
 *  - `photo`/`logo` (material proprio do Britto)
 */
export const broker: Broker = {
  name: "Britto", // TODO: nome civil completo
  preferredName: "Britto",
  brandName: "Britto",
  role: "Consultoria de imóveis EXTO, alto padrão em São Paulo",
  creci: "104954",
  phone: "5511995804240",
  email: "",
  city: "São Paulo",
  serviceRegion: "São Paulo · Bairros nobres",
  instagram: "",
  photo: "",
  whatsappCta: "Fale com o Britto",
};
