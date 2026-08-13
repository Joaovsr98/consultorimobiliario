import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Combina classes condicionais e resolve conflitos do Tailwind. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** Formata um valor em Real brasileiro. */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
}

/** Preco "a partir de" arredondado para o milhar mais proximo (numeros inteiros e limpos). */
export function formatPriceFrom(value: number): string {
  return formatCurrency(Math.round(value / 1000) * 1000);
}

/** Metragem maxima (em m2) a partir do texto de area, ex.: "26,82 a 43,25 m2" -> 43. */
export function maxAreaFromLabel(area: string): number {
  const nums = area.replace(/,/g, ".").match(/\d+(\.\d+)?/g)?.map(Number) ?? [];
  return nums.length ? Math.max(...nums) : 0;
}
