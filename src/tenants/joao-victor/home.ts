import type { HomeContent } from "../types";

/**
 * Conteudo da Home do Bueno. A Bueno vende do econômico (Vibra / Minha Casa
 * Minha Vida) ao ALTO PADRAO (EXTO) — a linguagem cobre os dois segmentos, sem
 * prometer "condições facilitadas" para quem busca alto padrao nem o contrario.
 */
export const home: HomeContent = {
  metaDescription:
    "Apartamentos e lançamentos em São Paulo — do Minha Casa Minha Vida ao alto padrão. Atendimento personalizado do início à entrega das chaves.",
  differentials: [
    {
      icon: "gem",
      title: "Do MCMV ao alto padrão",
      text: "Lançamentos para diferentes momentos — do Minha Casa Minha Vida a empreendimentos de alto padrão.",
    },
    {
      icon: "map",
      title: "Bem localizados",
      text: "Empreendimentos em regiões valorizadas de São Paulo, muitos próximos ao metrô.",
    },
    {
      icon: "users",
      title: "Atendimento personalizado",
      text: "Acompanhamos você em cada etapa, sem empurrar imóvel fora do seu perfil.",
    },
    {
      icon: "shield",
      title: "Segurança e transparência",
      text: "Informações claras, do primeiro contato à entrega das chaves.",
    },
  ],
};
