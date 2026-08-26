import type { AgencyTeamMember } from "../types";

/**
 * Corretores da equipe. O perfil institucional "Ajuda Imóveis" NAO entra
 * aqui, empresa e pessoa sao entidades diferentes (ver company.ts). Todos
 * comecam com `isPublished: false`; nenhum dado ausente foi completado por
 * inferencia (ex.: nao presumimos que o telefone publico de Rugiere seja
 * necessariamente o WhatsApp dele).
 */
export const team: AgencyTeamMember[] = [
  {
    id: "rugiere",
    name: "Rugiere",
    creci: "257055",
    phone: "5511972684065",
    isPublished: false,
  },
];

export function getTeamMemberById(id: string): AgencyTeamMember | undefined {
  return team.find((member) => member.id === id);
}
