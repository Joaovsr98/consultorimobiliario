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
  image: "/properties/vibra-parque-vila-sonia/piscina.jpg",
  imageAlt: "Piscina de um condomínio residencial em São Paulo em dia de céu azul",
  images: [
    {
      src: "/properties/vibra-parque-vila-sonia/piscina.jpg",
      alt: "Piscina de um condomínio residencial em São Paulo em dia de céu azul",
    },
    {
      src: "/properties/vibra-estacao-campo-limpo/rooftop.jpg",
      alt: "Rooftop com espreguiçadeiras e vista da cidade de São Paulo",
    },
    {
      src: "/properties/vibra-parque-vila-sonia/churrasqueira.jpg",
      alt: "Área de churrasqueira e convivência ao ar livre em condomínio",
    },
  ],
  headline: "Encontre o imóvel ideal para você",
  subtitle: "Bueno House · Imóveis em São Paulo",
  description:
    "Apartamentos selecionados, condições facilitadas e atendimento personalizado da nossa equipe em São Paulo.",
};
