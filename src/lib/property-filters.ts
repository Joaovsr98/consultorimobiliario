import type { Property } from "@/types";

/**
 * Fonte ÚNICA de lógica de filtro/matching de imóveis. Usada pelo catálogo
 * (/imoveis) e pela busca guiada — nunca duplicar imóveis, preços ou regras
 * dentro dos componentes. Os dados vêm sempre de `tenant.properties`.
 */

export type DormOption = "1" | "2" | "3+";
export const DORM_OPTIONS: { id: DormOption; label: string }[] = [
  { id: "1", label: "1 dorm." },
  { id: "2", label: "2 dorm." },
  { id: "3+", label: "3+ dorm." },
];

export type PriceBandId = "ate-260" | "260-300" | "acima-300";
export const PRICE_BANDS: { id: PriceBandId; label: string; test: (p: number) => boolean }[] = [
  { id: "ate-260", label: "Até R$ 260 mil", test: (p) => p <= 260_000 },
  { id: "260-300", label: "R$ 260–300 mil", test: (p) => p > 260_000 && p <= 300_000 },
  { id: "acima-300", label: "Acima de R$ 300 mil", test: (p) => p > 300_000 },
];

/** Rótulo curto de uma faixa de preço (para a mensagem/resumo). */
export function priceBandLabel(id: string): string {
  return PRICE_BANDS.find((b) => b.id === id)?.label ?? id;
}

/** Um empreendimento "cobre" a opção de dormitório? Ex.: "1 e 2 dormitórios" cobre 1 e 2. */
export function bedroomsCovers(bedrooms: string, option: string): boolean {
  const nums = (bedrooms.match(/\d+/g) ?? []).map(Number);
  return option === "3+" ? nums.some((n) => n >= 3) : nums.includes(Number(option));
}

/** Regiões (bairros) distintas presentes no catálogo. */
export function regionsOf(props: Property[]): string[] {
  return Array.from(new Set(props.map((p) => p.neighborhood)));
}

export type PropertyFilters = {
  region?: string;
  dorm?: string;
  priceBand?: string;
};

/** Aplica os filtros (campos vazios/indefinidos = sem restrição). */
export function filterProperties(props: Property[], f: PropertyFilters): Property[] {
  return props.filter((p) => {
    if (f.region && p.neighborhood !== f.region) return false;
    if (f.dorm && !bedroomsCovers(p.bedrooms, f.dorm)) return false;
    if (f.priceBand) {
      if (p.priceFrom === undefined) return false;
      const band = PRICE_BANDS.find((b) => b.id === f.priceBand);
      if (band && !band.test(p.priceFrom)) return false;
    }
    return true;
  });
}

export type MatchResult = {
  /** Imóveis a exibir (do catálogo — nunca inventados). */
  properties: Property[];
  /** true = correspondência exata; false = alternativas próximas. */
  exact: boolean;
  /** Quais filtros foram afrouxados para achar alternativas (para explicar ao usuário). */
  relaxed: string[];
  /** true quando NÃO há nada dentro do orçamento, mas há opções acima da faixa. */
  overBudgetAvailable?: boolean;
  /** true quando estas opções estão ACIMA da faixa informada (só via ação do usuário). */
  aboveBudget?: boolean;
};

const RELAX_LABEL: Record<string, string> = {
  region: "região",
  dorm: "dormitórios",
  priceBand: "faixa de preço",
};

/** Afrouxa, na ordem dada, apenas as chaves indicadas — mantendo as demais (ex.: o preço). */
function relaxInOrder(
  props: Property[],
  base: PropertyFilters,
  order: (keyof PropertyFilters)[]
): MatchResult {
  let cur: PropertyFilters = { ...base };
  const relaxed: string[] = [];
  for (const key of order) {
    if (!cur[key]) continue;
    cur = { ...cur, [key]: undefined };
    relaxed.push(RELAX_LABEL[key]);
    const r = filterProperties(props, cur);
    if (r.length > 0) return { properties: sortByPrice(r), exact: false, relaxed };
  }
  return { properties: [], exact: false, relaxed };
}

/**
 * Busca guiada. O ORÇAMENTO é restrição FORTE: nunca mostramos automaticamente
 * um imóvel acima da faixa informada. Ordem:
 *  1. correspondência exata;
 *  2. mantendo a faixa de preço, procurar em regiões próximas;
 *  3. mantendo a faixa, flexibilizar dormitórios (avisando);
 *  4. se nada couber no orçamento, sinalizar que existem opções acima da faixa
 *     — que só aparecem por ação explícita do usuário (ver `expandAboveBudget`).
 * Nunca inventa imóvel — só reordena/relaxa o que existe no catálogo.
 */
export function matchProperties(props: Property[], f: PropertyFilters): MatchResult {
  const exact = filterProperties(props, f);
  if (exact.length > 0) return { properties: sortByPrice(exact), exact: true, relaxed: [] };

  // Sem faixa informada => orçamento não é restrição; relaxa região e depois dormitórios.
  if (!f.priceBand) {
    const r = relaxInOrder(props, f, ["region", "dorm"]);
    if (r.properties.length > 0) return r;
    return { properties: sortByPrice(props), exact: false, relaxed: ["todos os filtros"] };
  }

  // Faixa informada = restrição FORTE. Mantém o preço; relaxa região e depois dormitórios.
  const within = relaxInOrder(props, f, ["region", "dorm"]);
  if (within.properties.length > 0) return within;

  // Nada dentro do orçamento. Há opções acima da faixa (ignorando o preço)?
  const overBudget = filterProperties(props, { region: f.region, dorm: f.dorm });
  return { properties: [], exact: false, relaxed: [], overBudgetAvailable: overBudget.length > 0 };
}

/**
 * Expansão ACIMA da faixa — só chamada por ação explícita do usuário
 * ("Ver opções acima dessa faixa"). Ignora o preço, casa por região/dormitórios
 * (relaxando se preciso) e marca tudo como acima do orçamento informado.
 */
export function expandAboveBudget(props: Property[], f: PropertyFilters): MatchResult {
  const base: PropertyFilters = { region: f.region, dorm: f.dorm };
  const exact = filterProperties(props, base);
  if (exact.length > 0) {
    return { properties: sortByPrice(exact), exact: false, relaxed: ["faixa de preço"], aboveBudget: true };
  }
  const r = relaxInOrder(props, base, ["region", "dorm"]);
  const list = r.properties.length > 0 ? r.properties : sortByPrice(props);
  return { properties: list, exact: false, relaxed: ["faixa de preço", ...r.relaxed], aboveBudget: true };
}

function sortByPrice(list: Property[]): Property[] {
  return [...list].sort((a, b) => (a.priceFrom ?? Infinity) - (b.priceFrom ?? Infinity));
}
