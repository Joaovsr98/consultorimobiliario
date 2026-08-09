import type { AgencyRegion } from "../types";

/**
 * Bairros publicos destacados como busca frequente no site de origem.
 * `source: "site-search-highlight"` deixa explicito que isso NAO e uma
 * declaracao de especialidade oficial da empresa, so um levantamento de
 * bairros mencionados publicamente.
 */
export const regions: AgencyRegion[] = [
  "Perdizes",
  "Jaguare",
  "Barra Funda",
  "Pinheiros",
  "Bela Vista",
  "Butanta",
  "Tatuape",
  "Vila Leopoldina",
  "Vila Mariana",
  "Bras",
  "Vila Olimpia",
  "Cambuci",
  "Ipiranga",
  "Itaim Bibi",
  "Brooklin",
  "Belenzinho",
].map((name) => ({ name, source: "site-search-highlight" }));
