import type { HomeContent } from "../types";

/**
 * Conteudo da Home do Britto, alto padrao (EXTO), com foco em conforto,
 * experiencia e qualidade de vida. Nada inventado sobre empreendimentos:
 * fala da curadoria e do atendimento, nao de dados de imovel.
 */
export const home: HomeContent = {
  metaTitle: "Alto padrão em São Paulo",
  metaDescription:
    "Consultoria de imóveis EXTO de alto padrão em São Paulo, conforto, arquitetura, privacidade, localização e qualidade de vida, com atendimento personalizado do Britto.",
  differentials: [
    {
      icon: "sparkles",
      title: "Conforto e bem-estar",
      text: "Espaços pensados para viver com tranquilidade, receber bem e criar memórias com a sua família.",
    },
    {
      icon: "pen",
      title: "Arquitetura assinada",
      text: "Projetos EXTO com design, materiais nobres e acabamento de altíssimo padrão.",
    },
    {
      icon: "map",
      title: "Localização nobre",
      text: "Endereços nos bairros mais desejados de São Paulo, com privacidade e conveniência.",
    },
    {
      icon: "users",
      title: "Atendimento personalizado",
      text: "Entendemos o seu estilo de vida para apresentar imóveis que realmente fazem sentido para você.",
    },
  ],
  guided: {
    eyebrow: "Curadoria personalizada",
    title: "Seu próximo lar começa com uma escolha bem feita",
    description:
      "Conte um pouco sobre o seu estilo de vida e receba uma seleção de imóveis EXTO que combinam com você e a sua família, com toda a discrição.",
  },
  // Alto padrão: por SUÍTES e sem faixa de valor (tudo "Sob consulta").
  search: { unit: "suites", askPrice: false },
  about: {
    intro: [
      "Morar bem é sentir que cada detalhe foi pensado para você. Selecionamos imóveis EXTO para quem valoriza conforto, arquitetura, privacidade, localização e qualidade de vida.",
      "O atendimento é personalizado e cuidadoso, buscando compreender o seu estilo de vida para apresentar imóveis que realmente façam sentido para você e a sua família. Mais do que encontrar um endereço, o objetivo é encontrar um espaço onde você possa viver com tranquilidade, receber bem, criar memórias e aproveitar cada momento com mais conforto.",
      "Seu próximo lar começa com uma escolha bem feita.",
    ],
    steps: [
      "Entendemos o seu estilo de vida e as suas preferências.",
      "Apresentamos os empreendimentos EXTO que combinam com você e a sua família.",
      "Acompanhamos você nas visitas, na proposta e até a entrega das chaves.",
    ],
  },
};
