import type { Guide } from "@/types";

/**
 * Conteúdo educativo. Ajuda no SEO local e na autoridade do profissional.
 * Nao promete aprovação de crédito nem substitui a análise oficial das
 * instituicoes financeiras — sempre reforcar isso no conteudo.
 */
export const guides: Guide[] = [
  {
    slug: "como-funciona-o-financiamento-imobiliario",
    title: "Como funciona o financiamento imobiliario",
    summary:
      "Entenda as etapas da análise de crédito, os principais sistemas de amortizacao e o que os bancos avaliam antes de aprovar um financiamento.",
    content: [
      "O financiamento imobiliario e um contrato de longo prazo em que a instituição financeira paga o imóvel a vista ao vendedor e você devolve o valor em parcelas, com juros.",
      "Antes da aprovação, o banco avalia renda, historico de crédito, idade e o valor de entrada disponivel. O imóvel também passa por uma avaliacao de engenharia.",
      "Nao existe garantia de aprovação antes da análise oficial. O papel do atendimento e ajudar você a chegar organizado a essa etapa, com a documentação correta.",
    ],
  },
  {
    slug: "como-usar-o-fgts",
    title: "Como usar o FGTS na compra do imóvel",
    summary:
      "Veja em quais situacoes o FGTS pode ser usado na entrada ou na amortizacao do financiamento e quais sao os requisitos gerais.",
    content: [
      "O FGTS pode ser utilizado para compor a entrada, amortizar parcelas ou quitar parte do saldo devedor, dependendo das regras vigentes do programa.",
      "Em geral, ha exigencias como tempo de contribuicao, tipo de imóvel e faixa de valor. Cada caso deve ser confirmado junto ao agente financeiro.",
      "Durante o diagnostico de perfil, verificamos se o seu FGTS pode ser aproveitado e como ele impacta a simulação.",
    ],
  },
  {
    slug: "quanto-preciso-ter-de-entrada",
    title: "Quanto preciso ter de entrada",
    summary:
      "Descubra como calcular a entrada necessaria de acordo com o valor do imóvel e a condicao de financiamento.",
    content: [
      "A entrada costuma representar uma porcentagem do valor do imóvel nao coberta pelo financiamento. Esse percentual varia conforme o banco e o perfil do comprador.",
      "Alem da entrada, e importante considerar custos adicionais como ITBI, registro e documentação, que nao entram no financiamento.",
      "Fazemos essa conta junto com você durante a simulação, considerando o que ja esta disponivel e o que ainda precisa ser planejado.",
    ],
  },
  {
    slug: "comprar-imovel-sozinho-ou-compor-renda",
    title: "Comprar imóvel sozinho ou compor renda",
    summary:
      "Entenda quando faz sentido somar a renda de outra pessoa no financiamento e como isso muda a análise de crédito.",
    content: [
      "Compor renda significa incluir um segundo comprador (conjuge, familiar ou parceiro) no financiamento, somando as rendas para atingir o valor necessario.",
      "Essa estrategia pode aumentar o poder de compra, mas também soma responsabilidades e historico de crédito de ambas as partes na análise.",
      "Avaliamos junto com você se compor renda faz sentido para o seu objetivo antes de seguir para a simulação.",
    ],
  },
  {
    slug: "documentos-para-analise-de-credito",
    title: "Documentos para análise de crédito",
    summary:
      "Lista geral dos documentos costumeiramente solicitados na análise de crédito para financiamento imobiliario.",
    content: [
      "De forma geral, a análise costuma pedir documentos pessoais, comprovante de renda, comprovante de residencia e informações sobre o imóvel escolhido.",
      "Trabalhadores CLT, autonomos e empresarios podem ter exigencias diferentes de comprovacao de renda.",
      "Nao solicitamos documentos sensíveis pelo site. A organização da documentação acontece diretamente com você, no momento adequado do atendimento.",
    ],
  },
  {
    slug: "diferenca-entre-lancamento-e-imovel-pronto",
    title: "Diferenca entre lancamento e imóvel pronto",
    summary:
      "Compare vantagens e pontos de atenção entre comprar na planta e comprar um imóvel ja construido.",
    content: [
      "Imóveis em lancamento costumam ter condicoes de pagamento mais flexiveis durante a obra, mas a entrega acontece apenas no futuro.",
      "Imóveis prontos permitem mudança imediata e visita presencial completa, porem geralmente exigem financiamento bancario desde a assinatura.",
      "A escolha depende do seu prazo, da urgência de mudança e do perfil de investimento que você busca.",
    ],
  },
  {
    slug: "como-escolher-um-apartamento-para-investir",
    title: "Como escolher um apartamento para investir",
    summary:
      "Pontos de atenção para quem busca um imóvel com foco em valorizacao ou renda de aluguel.",
    content: [
      "Para investimento, localização, infraestrutura do entorno e perfil do publico locatario da região pesam mais do que preferencias pessoais de decoracao.",
      "Vale considerar o potencial de valorizacao da região, a liquidez de revenda e a demanda por aluguel no bairro.",
      "Durante o atendimento, ajudamos a comparar opções com foco no seu objetivo declarado: morar ou investir.",
    ],
  },
  {
    slug: "como-funciona-a-compra-do-primeiro-imovel",
    title: "Como funciona a compra do primeiro imóvel",
    summary:
      "Um guia geral das etapas para quem esta comprando um imóvel pela primeira vez, do planejamento a entrega das chaves.",
    content: [
      "Comprar o primeiro imóvel costuma gerar dúvidas sobre por onde comecar. O primeiro passo e entender objetivo, orçamento e prazo antes de visitar opções.",
      "Depois vem a simulação de crédito, a escolha do imóvel, a assinatura da proposta e o acompanhamento da análise ate a aprovação.",
      "Nosso atendimento acompanha cada uma dessas etapas para que você chegue as chaves com segurança e sem surpresas.",
    ],
  },
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
