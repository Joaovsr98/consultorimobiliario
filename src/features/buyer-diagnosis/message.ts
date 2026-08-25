import type { Property } from "@/types";
import { tenant, identity } from "@/tenants";
import { priceBandLabel } from "@/lib/property-filters";
import { ANY, goalLabels, paymentLabels, type GuidedSearchData } from "./schema";

/**
 * Monta a mensagem do WhatsApp da busca guiada. Limpa e contextual: resume o
 * perfil e cita os empreendimentos compatíveis (do catálogo). NUNCA inclui UTM,
 * código técnico ou dado pessoal (CPF/renda/telefone/e-mail).
 */
export function buildGuidedMessage(data: GuidedSearchData, matches: Property[]): string {
  const suites =
    tenant.kind === "individual" && tenant.home?.search?.unit === "suites";
  const unitWord = suites ? "suítes" : "dorm.";
  const unitLabel = suites ? "Suítes" : "Dormitórios";

  const lines: string[] = [
    `Olá! Fiz a busca de imóveis no site da ${identity.displayName} e gostaria de conhecer as opções que combinam com o meu perfil.`,
    "",
  ];

  if (data.goal) lines.push(`Objetivo: ${goalLabels[data.goal]}`);
  if (data.bedrooms && data.bedrooms !== "tanto-faz")
    lines.push(`${unitLabel}: ${data.bedrooms} ${unitWord}`);
  if (data.region && data.region !== ANY) lines.push(`Região: ${data.region}`);
  if (data.priceBand && data.priceBand !== ANY)
    lines.push(`Faixa de valor: ${priceBandLabel(data.priceBand)}`);
  if (data.payment) lines.push(`Pagamento: ${paymentLabels[data.payment]}`);

  // Cita os empreendimentos quando há de 1 a 3 compatíveis (contexto forte
  // para a equipe, sem poluir a mensagem quando o resultado é amplo).
  if (matches.length > 0 && matches.length <= 3) {
    lines.push("", `Empreendimentos de interesse: ${matches.map((m) => m.name).join(", ")}.`);
  }

  return lines.join("\n");
}
