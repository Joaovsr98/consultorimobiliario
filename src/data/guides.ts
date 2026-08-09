import type { Guide } from "@/types";

/**
 * Conteudo educativo. Ajuda no SEO local e na autoridade do profissional.
 * Nao promete aprovacao de credito nem substitui a analise oficial das
 * instituicoes financeiras — sempre reforcar isso no conteudo.
 */
export const guides: Guide[] = [
  {
    slug: "como-funciona-o-financiamento-imobiliario",
    title: "Como funciona o financiamento imobiliario",
    summary:
      "Entenda as etapas da analise de credito, os principais sistemas de amortizacao e o que os bancos avaliam antes de aprovar um financiamento.",
    content: [
      "O financiamento imobiliario e um contrato de longo prazo em que a instituicao financeira paga o imovel a vista ao vendedor e voce devolve o valor em parcelas, com juros.",
      "Antes da aprovacao, o banco avalia renda, historico de credito, idade e o valor de entrada disponivel. O imovel tambem passa por uma avaliacao de engenharia.",
      "Nao existe garantia de aprovacao antes da analise oficial. O papel do atendimento e ajudar voce a chegar organizado a essa etapa, com a documentacao correta.",
    ],
  },
  {
    slug: "como-usar-o-fgts",
    title: "Como usar o FGTS na compra do imovel",
    summary:
      "Veja em quais situacoes o FGTS pode ser usado na entrada ou na amortizacao do financiamento e quais sao os requisitos gerais.",
    content: [
      "O FGTS pode ser utilizado para compor a entrada, amortizar parcelas ou quitar parte do saldo devedor, dependendo das regras vigentes do programa.",
      "Em geral, ha exigencias como tempo de contribuicao, tipo de imovel e faixa de valor. Cada caso deve ser confirmado junto ao agente financeiro.",
      "Durante o diagnostico de perfil, verificamos se o seu FGTS pode ser aproveitado e como ele impacta a simulacao.",
    ],
  },
  {
    slug: "quanto-preciso-ter-de-entrada",
    title: "Quanto preciso ter de entrada",
    summary:
      "Descubra como calcular a entrada necessaria de acordo com o valor do imovel e a condicao de financiamento.",
    content: [
      "A entrada costuma representar uma porcentagem do valor do imovel nao coberta pelo financiamento. Esse percentual varia conforme o banco e o perfil do comprador.",
      "Alem da entrada, e importante considerar custos adicionais como ITBI, registro e documentacao, que nao entram no financiamento.",
      "Fazemos essa conta junto com voce durante a simulacao, considerando o que ja esta disponivel e o que ainda precisa ser planejado.",
    ],
  },
  {
    slug: "comprar-imovel-sozinho-ou-compor-renda",
    title: "Comprar imovel sozinho ou compor renda",
    summary:
      "Entenda quando faz sentido somar a renda de outra pessoa no financiamento e como isso muda a analise de credito.",
    content: [
      "Compor renda significa incluir um segundo comprador (conjuge, familiar ou parceiro) no financiamento, somando as rendas para atingir o valor necessario.",
      "Essa estrategia pode aumentar o poder de compra, mas tambem soma responsabilidades e historico de credito de ambas as partes na analise.",
      "Avaliamos junto com voce se compor renda faz sentido para o seu objetivo antes de seguir para a simulacao.",
    ],
  },
  {
    slug: "documentos-para-analise-de-credito",
    title: "Documentos para analise de credito",
    summary:
      "Lista geral dos documentos costumeiramente solicitados na analise de credito para financiamento imobiliario.",
    content: [
      "De forma geral, a analise costuma pedir documentos pessoais, comprovante de renda, comprovante de residencia e informacoes sobre o imovel escolhido.",
      "Trabalhadores CLT, autonomos e empresarios podem ter exigencias diferentes de comprovacao de renda.",
      "Nao solicitamos documentos sensiveis pelo site. A organizacao da documentacao acontece diretamente com voce, no momento adequado do atendimento.",
    ],
  },
  {
    slug: "diferenca-entre-lancamento-e-imovel-pronto",
    title: "Diferenca entre lancamento e imovel pronto",
    summary:
      "Compare vantagens e pontos de atencao entre comprar na planta e comprar um imovel ja construido.",
    content: [
      "Imoveis em lancamento costumam ter condicoes de pagamento mais flexiveis durante a obra, mas a entrega acontece apenas no futuro.",
      "Imoveis prontos permitem mudanca imediata e visita presencial completa, porem geralmente exigem financiamento bancario desde a assinatura.",
      "A escolha depende do seu prazo, da urgencia de mudanca e do perfil de investimento que voce busca.",
    ],
  },
  {
    slug: "como-escolher-um-apartamento-para-investir",
    title: "Como escolher um apartamento para investir",
    summary:
      "Pontos de atencao para quem busca um imovel com foco em valorizacao ou renda de aluguel.",
    content: [
      "Para investimento, localizacao, infraestrutura do entorno e perfil do publico locatario da regiao pesam mais do que preferencias pessoais de decoracao.",
      "Vale considerar o potencial de valorizacao da regiao, a liquidez de revenda e a demanda por aluguel no bairro.",
      "Durante o atendimento, ajudamos a comparar opcoes com foco no seu objetivo declarado: morar ou investir.",
    ],
  },
  {
    slug: "como-funciona-a-compra-do-primeiro-imovel",
    title: "Como funciona a compra do primeiro imovel",
    summary:
      "Um guia geral das etapas para quem esta comprando um imovel pela primeira vez, do planejamento a entrega das chaves.",
    content: [
      "Comprar o primeiro imovel costuma gerar duvidas sobre por onde comecar. O primeiro passo e entender objetivo, orcamento e prazo antes de visitar opcoes.",
      "Depois vem a simulacao de credito, a escolha do imovel, a assinatura da proposta e o acompanhamento da analise ate a aprovacao.",
      "Nosso atendimento acompanha cada uma dessas etapas para que voce chegue as chaves com seguranca e sem surpresas.",
    ],
  },
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
