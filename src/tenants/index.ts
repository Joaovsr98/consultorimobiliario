import type { Tenant, TenantId } from "./types";
import { getIdentity } from "./identity";
import { joaoVictorTenant } from "./joao-victor";
import { ajudaImoveisTenant } from "./ajuda-imoveis";
import { shelbyTenant } from "./shelby";

/**
 * Seleciona o tenant ativo via VITE_TENANT_ID (definida por deploy na
 * Vercel, sem exigir commit para trocar de cliente). Valor invalido ou
 * ausente cai em "joao-victor" — nunca ativa uma configuracao por acaso.
 */
function resolveTenantId(value: unknown): TenantId {
  if (value === "joao-victor" || value === "ajuda-imoveis" || value === "shelby") {
    return value;
  }

  if (import.meta.env.DEV && value) {
    console.warn(
      `[tenant] VITE_TENANT_ID invalido: "${String(value)}". Usando "joao-victor".`
    );
  }

  return "joao-victor";
}

export const activeTenantId: TenantId = resolveTenantId(import.meta.env.VITE_TENANT_ID);

/** Tenants disponíveis. O padrão continua "joao-victor" (ver resolveTenantId acima). */
const tenantsById: Partial<Record<TenantId, Tenant>> = {
  "joao-victor": joaoVictorTenant,
  "ajuda-imoveis": ajudaImoveisTenant,
  shelby: shelbyTenant,
};

export const tenant: Tenant = tenantsById[activeTenantId] ?? joaoVictorTenant;
export const identity = getIdentity(tenant);
