import type { HeroConfig } from "../types";

/**
 * Hero do Britto (foco EXTO). Carrossel com renders oficiais dos empreendimentos
 * — rotaciona com crossfade (igual ao Bueno). A primeira imagem e o LCP.
 * Imagens reais e autorizadas dos empreendimentos EXTO (nao atmosfera generica).
 */
export const hero: HeroConfig = {
  images: [
    {
      src: "/properties/chateau-jardin-lumiere/vista-area-do-lazer.jpg",
      alt: "Vista aérea do lazer do Château Jardin Lumière, com piscina e paisagismo",
    },
    {
      src: "/properties/chateau-jardin-lumiere/praca-externa.jpg",
      alt: "Praça externa com fontes e jardins do Château Jardin, na Cidade Jardim",
    },
    {
      src: "/properties/palm-collection-pacaembu/piscina.jpg",
      alt: "Piscina externa com raia de 20m do Palm Collection Pacaembu",
    },
    {
      src: "/properties/legacy-guedala/voo-de-passaro.jpg",
      alt: "Vista aérea do Legacy Guedala, torre residencial no Jardim Guedala",
    },
  ],
  headline: "O endereço certo para o seu próximo capítulo",
  subtitle: "São Paulo · Alto padrão · EXTO Incorporadora",
  description:
    "Empreendimentos da EXTO nos bairros mais desejados de São Paulo, com a curadoria e o atendimento pessoal do Britto.",
};
