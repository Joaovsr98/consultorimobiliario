/**
 * Paginas de bairro (landing pages de SEO local). Cada entrada tem conteudo
 * UNICO e util — nunca a mesma pagina trocando so o nome do bairro. Os imoveis
 * exibidos vem do tenant ativo, filtrados por `neighborhood`.
 *
 * Regra de dado real: nada de numero de venda, CRECI ou distancia inventada.
 * Fatos sobre transporte/lazer sao gerais e verificaveis; onde nao ha certeza,
 * o texto usa linguagem prudente ("na regiao", "por perto").
 */
export type NeighborhoodPage = {
  /** Slug flat, com a palavra-chave que as pessoas buscam. */
  slug: string;
  /** Precisa bater com `Property.neighborhood` para listar os imoveis. */
  neighborhood: string;
  city: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  /** Paragrafos de abertura. */
  intro: string[];
  /** Como se locomover a partir do bairro. */
  transport: string[];
  /** O que tem por perto / porque morar ali. */
  highlights: string[];
  /** Para quem o bairro costuma fazer sentido. */
  buyerProfile: string[];
  faq: { question: string; answer: string }[];
};

export const neighborhoods: NeighborhoodPage[] = [
  {
    slug: "apartamentos-vila-sonia",
    neighborhood: "Vila Sônia",
    city: "São Paulo",
    metaTitle: "Apartamentos na Vila Sônia, São Paulo",
    metaDescription:
      "Apartamentos e lançamentos na Vila Sônia, São Paulo — ao lado da Estação Vila Sônia (Linha 4-Amarela), com opções no Minha Casa Minha Vida. Atendimento imobiliário personalizado.",
    h1: "Apartamentos à venda na Vila Sônia, São Paulo",
    intro: [
      "A Vila Sônia é um bairro residencial da Zona Oeste de São Paulo que ganhou destaque com a chegada da Estação Vila Sônia, ponto final da Linha 4-Amarela do metrô. De lá, dá para chegar a Butantã, Pinheiros, Faria Lima e Paulista sem baldeação — o que tornou a região muito procurada por quem trabalha nesses polos e quer morar perto do trabalho.",
      "É uma área que combina o clima mais tranquilo de bairro com boa infraestrutura de comércio, escolas, hospitais e áreas verdes. Abaixo você encontra os lançamentos que atendemos na Vila Sônia, com valores e condições, além de um resumo do que a região oferece.",
    ],
    transport: [
      "Estação Vila Sônia (Linha 4-Amarela) — terminal da linha, com ligação direta a Butantã, Pinheiros, Faria Lima e República/Paulista.",
      "Terminal de ônibus Vila Sônia, integrando o bairro a diversas linhas municipais e intermunicipais.",
      "Acesso rápido à Rodovia Raposo Tavares e à Marginal Pinheiros para quem se locomove de carro.",
    ],
    highlights: [
      "Parque Chácara do Jockey, uma das maiores áreas verdes da Zona Oeste, para lazer ao ar livre.",
      "Proximidade do Butantã, da USP e de importantes hospitais da região.",
      "Comércio de bairro no dia a dia e vários shoppings a poucos minutos (Jardim Sul, Butantã e outros).",
      "Região com boa oferta de escolas e serviços, prática para famílias.",
    ],
    buyerProfile: [
      "Quem trabalha na Faria Lima, em Pinheiros ou na Paulista e quer reduzir o tempo de deslocamento morando perto do metrô.",
      "Quem busca o primeiro imóvel e quer aproveitar as condições do Programa Minha Casa Minha Vida.",
      "Quem investe pensando em locação, aproveitando a demanda gerada pela Linha 4-Amarela, pela USP e pelos hospitais da região.",
    ],
    faq: [
      {
        question: "Tem apartamento no Minha Casa Minha Vida na Vila Sônia?",
        answer:
          "Sim. Os lançamentos que atendemos na Vila Sônia têm unidades enquadradas no Programa Minha Casa Minha Vida. As condições dependem do seu perfil e das regras vigentes — avaliamos isso no diagnóstico gratuito.",
      },
      {
        question: "Qual é a estação de metrô da Vila Sônia?",
        answer:
          "A Estação Vila Sônia é o terminal da Linha 4-Amarela. De lá é possível chegar a Butantã, Pinheiros, Faria Lima e Paulista sem baldeação.",
      },
      {
        question: "Dá para chegar à Faria Lima e à Paulista de metrô?",
        answer:
          "Sim. A Linha 4-Amarela conecta a Vila Sônia diretamente às estações da Faria Lima e da região da Paulista, sem precisar trocar de linha.",
      },
    ],
  },
];

export function getNeighborhoodBySlug(slug: string): NeighborhoodPage | undefined {
  return neighborhoods.find((n) => n.slug === slug);
}
