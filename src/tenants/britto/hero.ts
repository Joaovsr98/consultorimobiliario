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
  headline: "Morar bem é sentir que cada detalhe foi pensado para você",
  subtitle: "Consultoria de imóveis EXTO · Alto padrão em São Paulo",
  description:
    "Selecionamos imóveis EXTO para quem valoriza conforto, arquitetura, privacidade, localização e qualidade de vida.",
};
