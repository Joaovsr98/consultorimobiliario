import type { Property } from "@/types";

/**
 * Base geografica para a busca "onde voce quer morar". Usamos um dicionario
 * CURADO de bairros/regioes de Sao Paulo (centroides reais, aproximados) em vez
 * de chamar uma API externa: e mais rapido, privado, previsivel e nao depende de
 * rede no caminho de conversao. As coordenadas servem apenas para ORDENAR por
 * proximidade , nunca exibimos distancia em km para uma regiao digitada, porque
 * linha reta engana o cliente (decisao de produto).
 */

/** Normaliza para casar entrada do usuario com as chaves (sem acento, minusculo). */
export function normalize(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

/** Centroides aproximados de bairros/regioes de SP (reais). Chaves normalizadas. */
const REGIONS: Record<string, { label: string; lat: number; lng: number }> = {
  "vila sonia": { label: "Vila Sônia", lat: -23.5972, lng: -46.7317 },
  butanta: { label: "Butantã", lat: -23.5716, lng: -46.708 },
  "jardim bonfiglioli": { label: "Jardim Bonfiglioli", lat: -23.5834, lng: -46.7353 },
  "campo limpo": { label: "Campo Limpo", lat: -23.6483, lng: -46.758 },
  "vila das belezas": { label: "Vila das Belezas", lat: -23.6376, lng: -46.7449 },
  "santo amaro": { label: "Santo Amaro", lat: -23.6547, lng: -46.7089 },
  socorro: { label: "Socorro", lat: -23.6486, lng: -46.7027 },
  pinheiros: { label: "Pinheiros", lat: -23.567, lng: -46.702 },
  "vila madalena": { label: "Vila Madalena", lat: -23.5545, lng: -46.69 },
  perdizes: { label: "Perdizes", lat: -23.5378, lng: -46.677 },
  pacaembu: { label: "Pacaembu", lat: -23.5417, lng: -46.664 },
  "agua branca": { label: "Água Branca", lat: -23.5225, lng: -46.6857 },
  "barra funda": { label: "Barra Funda", lat: -23.5257, lng: -46.6647 },
  "cidade jardim": { label: "Cidade Jardim", lat: -23.6, lng: -46.702 },
  morumbi: { label: "Morumbi", lat: -23.6, lng: -46.725 },
  "jardim guedala": { label: "Jardim Guedala", lat: -23.606, lng: -46.728 },
  "itaim bibi": { label: "Itaim Bibi", lat: -23.585, lng: -46.678 },
  moema: { label: "Moema", lat: -23.601, lng: -46.664 },
  "vila mariana": { label: "Vila Mariana", lat: -23.589, lng: -46.634 },
  "jardins": { label: "Jardins", lat: -23.567, lng: -46.66 },
  "vila olimpia": { label: "Vila Olímpia", lat: -23.595, lng: -46.685 },
  "brooklin": { label: "Brooklin", lat: -23.61, lng: -46.69 },
  "jabaquara": { label: "Jabaquara", lat: -23.646, lng: -46.641 },
  "saude": { label: "Saúde", lat: -23.618, lng: -46.639 },
  ipiranga: { label: "Ipiranga", lat: -23.591, lng: -46.61 },
  tatuape: { label: "Tatuapé", lat: -23.54, lng: -46.576 },
  santana: { label: "Santana", lat: -23.5, lng: -46.628 },
  "centro": { label: "Centro", lat: -23.5505, lng: -46.6333 },
  // Regioes amplas (fallback util para quem digita a zona).
  "zona oeste": { label: "Zona Oeste", lat: -23.56, lng: -46.71 },
  "zona sul": { label: "Zona Sul", lat: -23.64, lng: -46.71 },
  "zona leste": { label: "Zona Leste", lat: -23.54, lng: -46.55 },
  "zona norte": { label: "Zona Norte", lat: -23.49, lng: -46.63 },
};

export type GeoPoint = { lat: number; lng: number };
export type ResolvedRegion = { label: string; coords: GeoPoint };

/**
 * Resolve a entrada do usuario para uma regiao conhecida. Casa por chave exata,
 * depois por inclusao (nos dois sentidos). Retorna null se nao reconhecer.
 */
export function resolveRegion(query: string): ResolvedRegion | null {
  const q = normalize(query);
  if (!q) return null;
  if (REGIONS[q]) return { label: REGIONS[q].label, coords: pick(REGIONS[q]) };
  for (const key of Object.keys(REGIONS)) {
    if (q.includes(key) || key.includes(q)) {
      return { label: REGIONS[key].label, coords: pick(REGIONS[key]) };
    }
  }
  return null;
}

function pick(r: { lat: number; lng: number }): GeoPoint {
  return { lat: r.lat, lng: r.lng };
}

/** Distancia aproximada (Haversine, km) , usada so para ORDENAR, nunca exibida. */
export function distanceKm(a: GeoPoint, b: GeoPoint): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 + Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return 2 * R * Math.asin(Math.sqrt(h));
}

/** Ordena os empreendimentos (que tem coords) do mais proximo ao mais distante. */
export function rankByDistance(properties: Property[], from: GeoPoint): Property[] {
  return properties
    .filter((p) => p.coords)
    .map((p) => ({ p, d: distanceKm(from, p.coords as GeoPoint) }))
    .sort((a, b) => a.d - b.d)
    .map((x) => x.p);
}
