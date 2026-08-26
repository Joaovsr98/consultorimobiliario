/**
 * Busca guiada, perguntas mínimas e úteis, todas por card/botão (nada de
 * formulário bancário). NÃO pedimos CPF, RG, renda exata, telefone ou e-mail:
 * primeiro ajudamos o usuário a ver opções; o contato acontece no WhatsApp.
 *
 * O matching de imóveis usa a fonte única em lib/property-filters (região +
 * dormitórios + faixa de preço). `goal` e `payment` são contexto para a equipe,
 * não filtram o catálogo.
 */

export type Goal = "morar" | "investir";
export const goalLabels: Record<Goal, string> = {
  morar: "Quero morar",
  investir: "Quero investir",
};
export const goalDescriptions: Record<Goal, string> = {
  morar: "Encontre seu novo lar em São Paulo",
  investir: "Busque oportunidades com potencial",
};

export type BedroomChoice = "1" | "2" | "3+" | "tanto-faz";
export const bedroomChoiceLabels: Record<BedroomChoice, string> = {
  "1": "1 dorm.",
  "2": "2 dorm.",
  "3+": "3+ dorm.",
  "tanto-faz": "Tanto faz",
};

/** Como pretende pagar, contexto opcional para a equipe (não é análise de crédito). */
export type PaymentChoice = "a-vista" | "financiar" | "nao-sei";
export const paymentLabels: Record<PaymentChoice, string> = {
  "a-vista": "À vista",
  financiar: "Financiar",
  "nao-sei": "Ainda não sei",
};

/** Valor sentinela de "sem preferência" para região e faixa de preço. */
export const ANY = "sem-preferencia";

export type GuidedSearchData = {
  goal?: Goal;
  /** id da opção de quartos/suítes ("1","2","3","3+","4+","tanto-faz"). */
  bedrooms?: string;
  region?: string; // bairro do catálogo ou ANY
  priceBand?: string; // PriceBandId ou ANY
  payment?: PaymentChoice; // opcional
};

export const stepTitles = ["Perfil", "Preferências"];
