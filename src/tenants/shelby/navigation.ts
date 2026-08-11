import type { NavItem } from "@/types";

/** Navegacao principal (cabecalho). Identica ao joao-victor. */
export const mainNav: NavItem[] = [
  { label: "Inicio", to: "/" },
  { label: "Imoveis", to: "/imoveis" },
  { label: "Sobre", to: "/sobre" },
  { label: "Guias", to: "/guias" },
  { label: "Contato", to: "/contato" },
];

/** Links do rodape agrupados. */
export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Navegacao",
    items: [
      { label: "Inicio", to: "/" },
      { label: "Imoveis", to: "/imoveis" },
      { label: "Sobre", to: "/sobre" },
    ],
  },
  {
    title: "Conteudo",
    items: [
      { label: "Guias", to: "/guias" },
      { label: "Contato", to: "/contato" },
      { label: "Politica de privacidade", to: "/privacidade" },
    ],
  },
];
