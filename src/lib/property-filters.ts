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
};

/**
 * Busca guiada: tenta a correspondência exata; se não houver, afrouxa os
 * filtros nesta ordem (preço → dormitórios → região) e explica o que mudou.
 * Nunca inventa imóvel — só reordena/relaxa o que existe no catálogo.
 */
export function matchProperties(props: Property[], f: PropertyFilters): MatchResult {
  const exact = filterProperties(props, f);
  if (exact.length > 0) return { properties: sortByPrice(exact), exact: true, relaxed: [] };

  const relaxed: string[] = [];
  let cur: PropertyFilters = { ...f };
  const steps: [keyof PropertyFilters, string][] = [
    ["priceBand", "faixa de preço"],
    ["dorm", "dormitórios"],
    ["region", "região"],
  ];
  for (const [key, label] of steps) {
    if (!cur[key]) continue;
    cur = { ...cur, [key]: undefined };
    relaxed.push(label);
    const r = filterProperties(props, cur);
    if (r.length > 0) return { properties: sortByPrice(r), exact: false, relaxed };
  }
  return { properties: sortByPrice(props), exact: false, relaxed: ["todos os filtros"] };
}

function sortByPrice(list: Property[]): Property[] {
  return [...list].sort((a, b) => (a.priceFrom ?? Infinity) - (b.priceFrom ?? Infinity));
}
