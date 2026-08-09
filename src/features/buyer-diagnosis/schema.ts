import { z } from "zod";

/**
 * Diagnostico do comprador. Os 3 passos cobrem exatamente os campos usados
 * na mensagem final para o WhatsApp — nenhum campo e coletado sem uso.
 */
export const diagnosisSchema = z.object({
  goal: z.enum(["morar", "investir"], {
    message: "Selecione uma opcao",
  }),
  region: z
    .string()
    .trim()
    .min(2, "Informe a regiao de interesse"),
  bedrooms: z.enum(["1", "2", "3+"], {
    message: "Selecione uma opcao",
  }),
  income: z.coerce
    .number({ message: "Informe um valor" })
    .positive("Informe um valor valido"),
  downPayment: z.coerce
    .number({ message: "Informe um valor" })
    .min(0, "Informe um valor valido"),
  fgts: z.enum(["sim", "nao"], {
    message: "Selecione uma opcao",
  }),
  timeline: z.enum(["ate-3-meses", "ate-6-meses", "mais-de-6-meses"], {
    message: "Selecione uma opcao",
  }),
});

export type DiagnosisData = z.infer<typeof diagnosisSchema>;

export const goalLabels: Record<DiagnosisData["goal"], string> = {
  morar: "Morar",
  investir: "Investir",
};

export const bedroomsLabels: Record<DiagnosisData["bedrooms"], string> = {
  "1": "1 dormitorio",
  "2": "2 dormitorios",
  "3+": "3 ou mais dormitorios",
};

export const fgtsLabels: Record<DiagnosisData["fgts"], string> = {
  sim: "Sim",
  nao: "Nao",
};

export const timelineLabels: Record<DiagnosisData["timeline"], string> = {
  "ate-3-meses": "Ate 3 meses",
  "ate-6-meses": "Ate 6 meses",
  "mais-de-6-meses": "Mais de 6 meses",
};

/** Campos validados em cada passo do wizard. */
export const stepFields: (keyof DiagnosisData)[][] = [
  ["goal"],
  ["region", "bedrooms"],
  ["income", "downPayment", "fgts", "timeline"],
];

export const stepTitles = ["Objetivo", "Onde e como", "Financeiro"];
