const STORAGE_KEY = "cp_utm";

export type UtmData = {
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
  term?: string;
};

/**
 * Captura os parametros UTM da URL e guarda na sessao. Sem backend nesta fase:
 * a origem NAO vai para a mensagem do WhatsApp (dado de analytics, nao de
 * conteudo) — e consumida pela camada de analytics (lib/analytics.ts).
 */
export function captureUtm(): void {
  const params = new URLSearchParams(window.location.search);
  const data: UtmData = {};
  const source = params.get("utm_source");
  const medium = params.get("utm_medium");
  const campaign = params.get("utm_campaign");
  const content = params.get("utm_content");
  const term = params.get("utm_term");
  if (source) data.source = source;
  if (medium) data.medium = medium;
  if (campaign) data.campaign = campaign;
  if (content) data.content = content;
  if (term) data.term = term;

  if (Object.keys(data).length === 0) return;
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/** Retorna os UTMs guardados na sessao (para anexar em eventos de analytics). */
export function getStoredUtm(): UtmData {
  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw) as UtmData;
  } catch {
    return {};
  }
}
