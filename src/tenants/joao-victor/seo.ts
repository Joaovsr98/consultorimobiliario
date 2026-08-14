import type { SeoConfig } from "@/types";
import { broker } from "./broker";

/** Metadados base. `%s` no titulo e substituido pelo titulo da pagina. */
export const seo: SeoConfig = {
  siteName: broker.brandName,
  titleTemplate: `%s | ${broker.brandName}`,
  defaultTitle: `${broker.brandName} — Seu próximo imóvel começa com uma orientação segura`,
  defaultDescription:
    "Encontre imóveis compatíveis com seu perfil, simule possibilidades de compra e receba atendimento personalizado do início à entrega das chaves.",
  baseUrl: "https://consultorimobiliario.vercel.app",
  locale: "pt-BR",
};
