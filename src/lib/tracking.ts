const STORAGE_KEY = "cp_utm";

type UtmData = {
  source?: string;
  medium?: string;
  campaign?: string;
};

/**
 * Captura utm_source/utm_medium/utm_campaign da URL e guarda na sessao.
 * Sem backend nesta fase — o objetivo e anexar a origem do contato na
 * mensagem de WhatsApp, nao alimentar um dashboard.
 */
export function captureUtm(): void {
  const params = new URLSearchParams(window.location.search);
  const source = params.get("utm_source");
  const medium = params.get("utm_medium");
  const campaign = params.get("utm_campaign");

  if (!source && !medium && !campaign) return;

  const data: UtmData = {
    ...(source && { source }),
    ...(medium && { medium }),
    ...(campaign && { campaign }),
  };
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function getStoredUtm(): UtmData | null {
  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as UtmData;
  } catch {
    return null;
  }
}

/** Linha "Origem: ..." para anexar as mensagens de WhatsApp, se houver UTM na sessao. */
export function getStoredUtmLine(): string | null {
  const utm = getStoredUtm();
  if (!utm) return null;
  const parts = [utm.source, utm.medium, utm.campaign].filter(Boolean);
  if (parts.length === 0) return null;
  return `Origem: ${parts.join("/")}`;
}
