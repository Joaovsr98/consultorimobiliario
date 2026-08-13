import type { HeroConfig } from "../types";

/**
 * Hero do Shelby. Espelha o joao-victor por decisão do cliente — mesma imagem
 * de marca (atmosfera, sem afirmar um empreendimento especifico). Troque
 * quando o Shelby tiver material próprio.
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
  headline: "Encontre um imóvel para o seu próximo momento",
  subtitle: "São Paulo · Zona Oeste · Lançamentos",
};
