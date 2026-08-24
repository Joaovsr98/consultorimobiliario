import type { HomeContent } from "../types";

/**
 * Conteudo da Home do Britto — linguagem de ALTO PADRAO (EXTO). Substitui a
 * copy econômica (MCMV/metrô) do padrao compartilhado. Nada inventado sobre
 * empreendimentos: fala da curadoria e do atendimento, nao de dados de imovel.
 */
export const home: HomeContent = {
  metaTitle: "Alto padrão em São Paulo",
  metaDescription:
    "Empreendimentos de alto padrão da EXTO Incorporadora nos bairros mais desejados de São Paulo, com curadoria e atendimento pessoal do Britto.",
  differentials: [
    {
      icon: "map",
      title: "Localização nobre",
      text: "Endereços nos bairros mais desejados de São Paulo — Pacaembu, Perdizes, Cidade Jardim, Moema e Ibirapuera.",
    },
    {
      icon: "pen",
      title: "Projeto assinado",
      text: "Arquitetura e acabamento de alto padrão da EXTO, com atenção a cada detalhe.",
    },
    {
      icon: "gem",
      title: "Curadoria EXTO",
      text: "Uma seleção de empreendimentos com a solidez de quase quatro décadas de incorporação.",
    },
    {
      icon: "sparkles",
      title: "Atendimento exclusivo",
      text: "Acompanhamento pessoal do Britto, com discrição, do primeiro contato à entrega das chaves.",
    },
  ],
  guided: {
    eyebrow: "Curadoria personalizada",
    title: "Encontre o endereço à altura do seu próximo momento",
    description:
      "Conte seu perfil em poucos passos e receba uma seleção de empreendimentos EXTO pelo WhatsApp — com toda a discrição.",
  },
};
