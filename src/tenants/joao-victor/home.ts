import type { HomeContent } from "../types";

/**
 * Conteudo da Home do Bueno. A Bueno vende do econômico (Vibra / Minha Casa
 * Minha Vida) ao ALTO PADRAO (EXTO), a linguagem cobre os dois segmentos, sem
 * prometer "condições facilitadas" para quem busca alto padrao nem o contrario.
 */
export const home: HomeContent = {
  metaDescription:
    "Apartamentos e lançamentos em São Paulo, do Minha Casa Minha Vida ao alto padrão. Atendimento personalizado do início à entrega das chaves.",
  differentials: [
    {
      icon: "gem",
      title: "Do MCMV ao alto padrão",
      text: "Lançamentos para diferentes momentos, do Minha Casa Minha Vida a empreendimentos de alto padrão.",
    },
    {
      icon: "map",
      title: "Bem localizados",
      text: "Empreendimentos em regiões valorizadas de São Paulo, muitos próximos ao metrô.",
    },
    {
      icon: "users",
      title: "Atendimento personalizado",
      text: "Acompanhamos você em cada etapa, sem empurrar imóvel fora do seu perfil.",
    },
    {
      icon: "shield",
      title: "Segurança e transparência",
      text: "Informações claras, do primeiro contato à entrega das chaves.",
    },
  ],
  whyUs: {
    title: "Por que comprar com a Bueno Imóveis?",
    intro:
      "Uma compra segura começa com uma boa orientação. Comprar um imóvel envolve uma decisão importante e, por isso, a Bueno Imóveis acompanha cada etapa com transparência, proximidade e atenção aos detalhes.",
    items: [
      {
        title: "Atendimento personalizado",
        text: "Entendemos seu momento para apresentar opções alinhadas ao que você procura.",
      },
      {
        title: "Informações claras sobre cada empreendimento",
        text: "Apresentamos características, condições e detalhes para uma decisão mais segura.",
      },
      {
        title: "Apoio durante as etapas da compra",
        text: "Acompanhamento desde o primeiro contato até a evolução da negociação.",
      },
      {
        title: "Suporte até a entrega das chaves",
        text: "Continuamos próximos durante toda a jornada.",
      },
    ],
  },
  aboutBlurb: {
    title: "Sobre a Bueno Imóveis",
    paragraphs: [
      "A Bueno Imóveis nasceu com o objetivo de tornar a compra de um imóvel mais simples, transparente e segura.",
      "Nosso trabalho é oferecer um atendimento próximo, ajudando cada cliente a encontrar uma escolha alinhada ao seu momento, suas necessidades e seus objetivos.",
      "Mais do que apresentar imóveis, buscamos orientar decisões importantes com clareza e confiança.",
    ],
  },
};
