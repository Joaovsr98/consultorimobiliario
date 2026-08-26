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
      src: "/properties/chateau-jardin-lumiere/vista-area-do-lazer.jpg",
      alt: "Vista aérea do lazer de um empreendimento de alto padrão na Cidade Jardim",
    },
    {
      src: "/properties/vibra-estacao-campo-limpo/rooftop.jpg",
      alt: "Rooftop com espreguiçadeiras e vista da cidade de São Paulo",
    },
    {
      src: "/properties/palm-collection-pacaembu/piscina.jpg",
      alt: "Piscina com raia de 20m de um residencial de alto padrão no Pacaembu",
    },
    {
      src: "/properties/vibra-parque-vila-sonia/churrasqueira.jpg",
      alt: "Área de churrasqueira e convivência ao ar livre em condomínio",
    },
    {
      src: "/properties/legacy-guedala/voo-de-passaro.jpg",
      alt: "Vista aérea de uma torre residencial de alto padrão no Jardim Guedala",
    },
  ],
  headline: "O lugar certo para o seu novo começo",
  subtitle: "Bueno Imóveis · São Paulo",
  description:
    "Do primeiro apartamento ao alto padrão — encontre o imóvel ideal em São Paulo com o atendimento da Bueno Imóveis.",
};
