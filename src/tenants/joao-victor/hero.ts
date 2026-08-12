import type { HeroConfig } from "../types";

/**
 * Hero da primeira dobra. A imagem e usada como ATMOSFERA de marca — decisao
 * explicita do cliente de nao vincula-la a um empreendimento especifico. Por
 * isso o `imageAlt` descreve a cena real (edificios em SP ao entardecer) sem
 * afirmar que e um lancamento nomeado.
 *
 * `subtitle` sem "prontos": os empreendimentos atuais sao todos lancamento.
 */
export const hero: HeroConfig = {
  image: "/properties/vibra-estacao-vila-sonia/fachada-torres.jpg",
  imageAlt: "Edificios residenciais em São Paulo ao entardecer",
  headline: "Encontre um imóvel para o seu próximo momento",
  subtitle: "São Paulo · Zona Oeste · Lançamentos",
};
