import { z } from "zod";

/**
 * Diagnostico do comprador. Os 3 passos cobrem exatamente os campos usados
 * na mensagem final para o WhatsApp — nenhum campo e coletado sem uso.
 */
export const diagnosisSchema = z.object({
  goal: z.enum(["morar", "investir"], {
    message: "Selecione uma opção",
  }),
  region: z
    .string()
    .trim()
    .min(2, "Informe a região de interesse"),
  bedrooms: z.enum(["1", "2", "3+"], {
    message: "Selecione uma opção",
  }),
  income: z.coerce
    .number({ message: "Informe um valor" })
    .positive("Informe um valor válido"),
  downPayment: z.coerce
    .number({ message: "Informe um valor" })
    .min(0, "Informe um valor válido"),
  fgts: z.enum(["sim", "nao"], {
    message: "Selecione uma opção",
  }),
  timeline: z.enum(["a-vista", "menos-240-meses", "mais-240-meses"], {
    message: "Selecione uma opção",
  }),
  contact: z.enum(["ligacao", "mensagem"], {
    message: "Selecione uma opção",
  }),
});

export type DiagnosisData = z.infer<typeof diagnosisSchema>;

export const goalLabels: Record<DiagnosisData["goal"], string> = {
  morar: "Quero morar",
  investir: "Quero investir",
};

/** Subtitulo de apoio de cada objetivo, exibido nos cards de escolha do passo 1. */
export const goalDescriptions: Record<DiagnosisData["goal"], string> = {
  morar: "Encontre seu novo lar em São Paulo",
  investir: "Busque oportunidades com potencial",
};

export const bedroomsLabels: Record<DiagnosisData["bedrooms"], string> = {
  "1": "1 dormitório",
  "2": "2 dormitórios",
  "3+": "3 ou mais dormitórios",
};

export const fgtsLabels: Record<DiagnosisData["fgts"], string> = {
  sim: "Sim",
  nao: "Não",
};

export const timelineLabels: Record<DiagnosisData["timeline"], string> = {
  "a-vista": "À vista",
  "menos-240-meses": "Financiar em menos de 240 meses",
  "mais-240-meses": "Financiar em mais de 240 meses",
};

export const contactLabels: Record<DiagnosisData["contact"], string> = {
  ligacao: "Ligação",
  mensagem: "Mensagem",
};

/** Campos validados em cada passo do wizard. */
export const stepFields: (keyof DiagnosisData)[][] = [
  ["goal"],
  ["region", "bedrooms"],
  ["income", "downPayment", "fgts", "timeline", "contact"],
];

export const stepTitles = ["Perfil", "Preferências", "Financeiro"];
