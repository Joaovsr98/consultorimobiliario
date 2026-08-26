/**
 * Paginas de bairro (landing pages de SEO local). Cada entrada tem conteudo
 * UNICO e util, nunca a mesma pagina trocando so o nome do bairro. Os imoveis
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
      "Apartamentos e lançamentos na Vila Sônia, São Paulo, ao lado da Estação Vila Sônia (Linha 4-Amarela), com opções no Minha Casa Minha Vida. Atendimento imobiliário personalizado.",
    h1: "Apartamentos à venda na Vila Sônia, São Paulo",
    intro: [
      "A Vila Sônia é um bairro residencial da Zona Oeste de São Paulo que ganhou destaque com a chegada da Estação Vila Sônia, ponto final da Linha 4-Amarela do metrô. De lá, dá para chegar a Butantã, Pinheiros, Faria Lima e Paulista sem baldeação, o que tornou a região muito procurada por quem trabalha nesses polos e quer morar perto do trabalho.",
      "É uma área que combina o clima mais tranquilo de bairro com boa infraestrutura de comércio, escolas, hospitais e áreas verdes. Abaixo você encontra os lançamentos que atendemos na Vila Sônia, com valores e condições, além de um resumo do que a região oferece.",
    ],
    transport: [
      "Estação Vila Sônia (Linha 4-Amarela), terminal da linha, com ligação direta a Butantã, Pinheiros, Faria Lima e República/Paulista.",
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
          "Sim. Os lançamentos que atendemos na Vila Sônia têm unidades enquadradas no Programa Minha Casa Minha Vida. As condições dependem do seu perfil e das regras vigentes, avaliamos isso no diagnóstico gratuito.",
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
  {
    slug: "apartamentos-campo-limpo",
    neighborhood: "Campo Limpo",
    city: "São Paulo",
    metaTitle: "Apartamentos em Campo Limpo, São Paulo",
    metaDescription:
      "Apartamentos e lançamentos em Campo Limpo, Zona Sul de São Paulo, perto das Estações Campo Limpo e Vila das Belezas (Linha 5-Lilás), com opções no Minha Casa Minha Vida.",
    h1: "Apartamentos à venda em Campo Limpo, São Paulo",
    intro: [
      "Campo Limpo é uma região da Zona Sul de São Paulo atendida pela Linha 5-Lilás do metrô, com as Estações Campo Limpo e Vila das Belezas. A Linha 5 conecta a região a Santo Amaro e à Chácara Klabin, com integração a outras linhas do metrô, o que facilita bastante o dia a dia de quem depende do transporte público.",
      "É uma área com comércio forte, shopping, hospital e opções de lazer no próprio bairro. Abaixo estão os lançamentos que atendemos em Campo Limpo, com valores e condições, além de um resumo do que a região oferece.",
    ],
    transport: [
      "Estações Campo Limpo e Vila das Belezas (Linha 5-Lilás), que liga a região a Santo Amaro e à Chácara Klabin, com integração a outras linhas.",
      "Boa oferta de linhas de ônibus municipais atendendo o bairro e o entorno.",
      "Acesso pela Estrada de Itapecerica, uma das principais vias da região.",
    ],
    highlights: [
      "Shopping Campo Limpo, com lojas, serviços e cinema.",
      "Hospital Campo Limpo e Sesc Campo Limpo, referências de saúde e lazer na região.",
      "Comércio de rua variado e atacadistas para as compras do dia a dia.",
      "Região consolidada, com boa oferta de escolas e serviços.",
    ],
    buyerProfile: [
      "Quem busca o primeiro imóvel e quer aproveitar as condições do Programa Minha Casa Minha Vida.",
      "Quem usa a Linha 5-Lilás no dia a dia e quer morar perto do metrô.",
      "Quem investe pensando em locação, aproveitando a demanda por moradia perto de metrô, shopping e hospital.",
    ],
    faq: [
      {
        question: "Tem apartamento no Minha Casa Minha Vida em Campo Limpo?",
        answer:
          "Sim. O lançamento que atendemos em Campo Limpo tem unidades enquadradas no Programa Minha Casa Minha Vida. As condições dependem do seu perfil e das regras vigentes, avaliamos isso no diagnóstico gratuito.",
      },
      {
        question: "Qual linha de metrô atende Campo Limpo?",
        answer:
          "A Linha 5-Lilás, com as Estações Campo Limpo e Vila das Belezas. Ela conecta a região a Santo Amaro e à Chácara Klabin, com integração a outras linhas.",
      },
      {
        question: "O bairro tem shopping e hospital por perto?",
        answer:
          "Sim. Campo Limpo conta com o Shopping Campo Limpo, o Hospital Campo Limpo e o Sesc Campo Limpo, além de comércio de rua variado.",
      },
    ],
  },
  {
    slug: "apartamentos-jardim-bonfiglioli",
    neighborhood: "Jardim Bonfiglioli",
    city: "São Paulo",
    metaTitle: "Apartamentos no Jardim Bonfiglioli, São Paulo",
    metaDescription:
      "Apartamentos e lançamentos no Jardim Bonfiglioli, Zona Oeste de São Paulo, perto de estação da Linha 4-Amarela, com acesso rápido a Pinheiros e Paulista e opções no Minha Casa Minha Vida.",
    h1: "Apartamentos à venda no Jardim Bonfiglioli, São Paulo",
    intro: [
      "O Jardim Bonfiglioli é um bairro residencial da Zona Oeste de São Paulo, na região do Butantã, próximo de uma estação da Linha 4-Amarela do metrô. Isso dá acesso rápido a Pinheiros e à Avenida Paulista sem baldeação, uma vantagem para quem trabalha nesses polos.",
      "É uma área tranquila e bem localizada, perto da USP e do comércio do Butantã. Abaixo estão os lançamentos que atendemos no Jardim Bonfiglioli, com valores e condições, além de um resumo do que a região oferece.",
    ],
    transport: [
      "Estação da Linha 4-Amarela a cerca de 10 minutos a pé, com ligação direta a Pinheiros, Faria Lima e Paulista.",
      "Proximidade da Rodovia Raposo Tavares e da Marginal Pinheiros para quem se locomove de carro.",
      "Diversas linhas de ônibus atendendo o Butantã e o entorno.",
    ],
    highlights: [
      "Proximidade da USP e do comércio consolidado do Butantã.",
      "Cerca de 10 minutos de Pinheiros e 15 da Avenida Paulista pela Linha 4-Amarela.",
      "Bairro residencial e tranquilo, prático para quem quer sossego perto do metrô.",
      "Boa oferta de escolas, serviços e áreas verdes na região.",
    ],
    buyerProfile: [
      "Quem trabalha em Pinheiros, na Faria Lima ou na Paulista e quer reduzir o tempo de deslocamento.",
      "Quem busca o primeiro imóvel e quer aproveitar as condições do Programa Minha Casa Minha Vida.",
      "Quem investe pensando em locação, aproveitando a proximidade do metrô e da USP.",
    ],
    faq: [
      {
        question: "Tem apartamento no Minha Casa Minha Vida no Jardim Bonfiglioli?",
        answer:
          "Sim. O lançamento que atendemos no Jardim Bonfiglioli tem unidades enquadradas no Programa Minha Casa Minha Vida. As condições dependem do seu perfil e das regras vigentes, avaliamos isso no diagnóstico gratuito.",
      },
      {
        question: "Qual linha de metrô atende o Jardim Bonfiglioli?",
        answer:
          "A Linha 4-Amarela, com uma estação a cerca de 10 minutos a pé. De lá dá para chegar a Pinheiros, Faria Lima e Paulista sem baldeação.",
      },
      {
        question: "Dá para chegar à Paulista de metrô?",
        answer:
          "Sim. Pela Linha 4-Amarela é possível chegar à região da Paulista sem trocar de linha, em torno de 15 minutos a partir do bairro.",
      },
    ],
  },
];

export function getNeighborhoodBySlug(slug: string): NeighborhoodPage | undefined {
  return neighborhoods.find((n) => n.slug === slug);
}
