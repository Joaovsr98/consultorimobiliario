import type { AgencyCompany } from "../types";

/**
 * Identidade institucional da Ajuda Imoveis. `brandName` e o CRECI juridico
 * sao informacao publica confirmada; `legalName` (razao social) NAO foi
 * confirmada e nao deve ser tratada como tal em nenhuma tela ate a
 * confirmacao do cliente.
 *
 * `contact.whatsapp` fica ausente de proposito: os telefones publicos
 * levantados sao institucionais (alguns 0800/central) e nao ha confirmacao
 * de qual e o canal oficial de WhatsApp da empresa.
 */
export const company: AgencyCompany = {
  brandName: "Ajuda Imóveis",
  legalName: "CONFIRMAR COM O CLIENTE",
  legalCreci: "35394-J",
  foundedAt: "Abril de 2020",
  positioning:
    "Empresa voltada para apresentar soluções na compra do seu imóvel e fazer com que você faca o melhor investimento.",
  history: [
    "Fundacao em abril de 2020",
    "Atua na compra de imóveis",
    "Atua na venda de imóveis",
    "Atua com locacao",
    "Atua com imóveis novos",
    "Atua com imóveis usados",
  ],
  services: [
    "Compra de imóveis",
    "Venda de imóveis",
    "Locacao",
    "Simulacao de financiamento",
    "Cadastro de imóvel",
    "Encomenda de imóvel",
    "Busca completa de imóveis",
  ],
  contact: {
    // whatsapp ausente ate confirmacao do canal oficial.
  },
  institutionalPhones: [
    "0800 606 5977",
    "(11) 5026-6093",
    "(11) 3135-5681",
    "(11) 98618-0306",
    "(11) 95476-2160",
    "(11) 98261-5099",
  ],
  hours: "Segunda a Segunda, 08h30 as 20h00",
};
