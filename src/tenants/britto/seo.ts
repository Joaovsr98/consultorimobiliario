import type { SeoConfig } from "@/types";
import { broker } from "./broker";

/** Metadados base do Britto (foco EXTO). `%s` e substituido pelo titulo da pagina. */
export const seo: SeoConfig = {
  siteName: broker.brandName,
  titleTemplate: `%s | ${broker.brandName}`,
  defaultTitle: `${broker.brandName}, Alto padrão EXTO em São Paulo`,
  defaultDescription:
    "Empreendimentos de alto padrão da EXTO Incorporadora nos bairros mais desejados de São Paulo, com atendimento pessoal do início à entrega das chaves.",
  baseUrl: "https://consultoriabritto.vercel.app",
  locale: "pt-BR",
};
