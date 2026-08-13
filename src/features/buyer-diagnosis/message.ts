import { tenant, identity } from "@/tenants";
import { formatCurrency } from "@/lib/utils";
import { getStoredUtmLine } from "@/lib/tracking";
import {
  bedroomsLabels,
  contactLabels,
  fgtsLabels,
  goalLabels,
  timelineLabels,
  type DiagnosisData,
} from "./schema";

/**
 * Monta a mensagem estruturada enviada ao corretor via WhatsApp, no formato
 * "Olá, {nome pelo qual prefere ser chamado}! Fiz o diagnostico no site."
 * seguido dos dados informados. Anexa a origem (UTM) quando disponivel na
 * sessao. Para tenants sem `preferredName` (ex.: uma imobiliaria), usa o
 * nome de exibicao normal.
 */
export function buildDiagnosisMessage(data: DiagnosisData): string {
  const greetingName = tenant.kind === "individual" ? tenant.broker.preferredName : identity.displayName;
  const utmLine = getStoredUtmLine();

  const lines = [
    `Olá, ${greetingName}! Fiz o diagnostico no site.`,
    "",
    `Objetivo: ${goalLabels[data.goal]}`,
    `Região: ${data.region}`,
    `Renda familiar: ${formatCurrency(data.income)}`,
    `Entrada: ${formatCurrency(data.downPayment)}`,
    `FGTS: ${fgtsLabels[data.fgts]}`,
    `Dormitórios: ${bedroomsLabels[data.bedrooms]}`,
    `Forma de pagamento: ${timelineLabels[data.timeline]}`,
    `Prefere contato por: ${contactLabels[data.contact]}`,
    ...(utmLine ? ["", utmLine] : []),
  ];

  return lines.join("\n");
}
