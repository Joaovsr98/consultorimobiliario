import type { NavItem } from "@/types";

/**
 * Proposta de navegacao para o formato agencia, ainda nao renderizada por
 * nenhum componente. Nao copia a ordem/rotulos do site atual da Ajuda
 * Imoveis; estrutura propria pensada para o novo produto.
 *
 * Itens cuja pagina ainda nao existe ficam marcados com `enabled: false`
 * para que, quando esta navegacao for conectada, nenhum link quebrado seja
 * exposto por acidente, cada item precisa ser ligado a uma rota real e
 * ter `enabled` alternado explicitamente.
 */
export type AgencyNavItem = NavItem & { enabled: boolean };

export const mainNav: AgencyNavItem[] = [
  { label: "Início", to: "/", enabled: false },
  { label: "Comprar", to: "/comprar", enabled: false },
  { label: "Alugar", to: "/alugar", enabled: false },
  { label: "Lancamentos", to: "/lancamentos", enabled: false },
  { label: "Corretores", to: "/corretores", enabled: false },
  { label: "Unidades", to: "/unidades", enabled: false },
  { label: "Anuncie seu imóvel", to: "/anuncie", enabled: false },
  { label: "Sobre", to: "/sobre", enabled: false },
  { label: "Contato", to: "/contato", enabled: false },
];

export const footerNav: { title: string; items: AgencyNavItem[] }[] = [
  {
    title: "Navegação",
    items: [
      { label: "Início", to: "/", enabled: false },
      { label: "Comprar", to: "/comprar", enabled: false },
      { label: "Alugar", to: "/alugar", enabled: false },
    ],
  },
  {
    title: "Empresa",
    items: [
      { label: "Sobre", to: "/sobre", enabled: false },
      { label: "Corretores", to: "/corretores", enabled: false },
      { label: "Unidades", to: "/unidades", enabled: false },
      { label: "Contato", to: "/contato", enabled: false },
    ],
  },
];
