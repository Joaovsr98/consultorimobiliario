import type { NavItem } from "@/types";

/** Navegação principal (cabecalho). */
export const mainNav: NavItem[] = [
  { label: "Início", to: "/" },
  { label: "Imóveis", to: "/imoveis" },
  { label: "Sobre", to: "/sobre" },
  { label: "Guias", to: "/guias" },
  { label: "Contato", to: "/contato" },
];

/** Links do rodape agrupados. */
export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Navegação",
    items: [
      { label: "Início", to: "/" },
      { label: "Imóveis", to: "/imoveis" },
      { label: "Sobre", to: "/sobre" },
    ],
  },
  {
    title: "Conteúdo",
    items: [
      { label: "Guias", to: "/guias" },
      { label: "Contato", to: "/contato" },
      { label: "Politica de privacidade", to: "/privacidade" },
    ],
  },
];
