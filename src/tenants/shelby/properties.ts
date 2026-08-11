import type { Property } from "@/types";

/**
 * Empreendimentos do Shelby. Comeca VAZIO de proposito — nenhum imovel
 * inventado. Ao adicionar, use APENAS dados/imagens autorizados, no mesmo
 * formato do tenant joao-victor (ver src/tenants/joao-victor/properties.ts).
 *
 * Com a lista vazia, a Home nao mostra catalogo/destaque e /imoveis fica sem
 * cards — comportamento correto ate haver produto real.
 */
export const properties: Property[] = [];
