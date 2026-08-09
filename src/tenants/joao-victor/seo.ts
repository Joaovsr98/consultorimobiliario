import type { SeoConfig } from "@/types";
import { broker } from "./broker";

/** Metadados base. `%s` no titulo e substituido pelo titulo da pagina. */
export const seo: SeoConfig = {
  siteName: broker.brandName,
  titleTemplate: `%s | ${broker.brandName}`,
  defaultTitle: `${broker.brandName} — Seu proximo imovel comeca com uma orientacao segura`,
  defaultDescription:
    "Encontre imoveis compativeis com seu perfil, simule possibilidades de compra e receba atendimento personalizado do inicio a entrega das chaves.",
  baseUrl: "https://exemplo.com.br",
  locale: "pt-BR",
};
