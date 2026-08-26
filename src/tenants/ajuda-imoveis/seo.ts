import type { SeoConfig } from "@/types";
import { company } from "./company";

/**
 * Metadados base, ainda nao conectados a nenhuma pagina. Deliberadamente
 * factual: sem superlativos ("melhor", "lider de mercado", "maior equipe")
 * e sem numeros de clientes/vendas/anos de experiencia nao confirmados.
 * `legalName` (nao confirmado) nunca aparece aqui, so `brandName`.
 */
export const seo: SeoConfig = {
  siteName: company.brandName,
  titleTemplate: `%s | ${company.brandName}`,
  defaultTitle: `${company.brandName}, Compra, venda e locacao de imóveis em São Paulo`,
  defaultDescription:
    "Solucoes para compra, venda e locacao de imóveis novos e usados, com atendimento durante todo o processo.",
  baseUrl: "https://exemplo.com.br",
  locale: "pt-BR",
};
