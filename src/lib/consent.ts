/**
 * Estado de consentimento (LGPD / Google Consent Mode v2). Duas categorias:
 * - analytics  -> mede uso do site (GA4: analytics_storage)
 * - marketing  -> anúncios/otimização (Meta Pixel; GA4: ad_storage,
 *                 ad_user_data, ad_personalization)
 *
 * Padrão = NEGADO até o visitante escolher. A escolha fica salva no
 * localStorage e pode ser alterada depois (banner reaberto pelo rodapé).
 * Cookies estritamente necessários ao funcionamento NÃO passam por aqui.
 */
export type ConsentPrefs = {
  analytics: boolean;
  marketing: boolean;
};

export const DENIED: ConsentPrefs = { analytics: false, marketing: false };
export const GRANTED: ConsentPrefs = { analytics: true, marketing: true };

const STORAGE_KEY = "bueno_consent_v1";
const CHANGE_EVENT = "bueno:consent-change";
/** Evento para (re)abrir o gerenciador de preferências a partir do rodapé. */
export const OPEN_CONSENT_EVENT = "bueno:open-consent";

function load(): ConsentPrefs | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ConsentPrefs>;
    return { analytics: !!parsed.analytics, marketing: !!parsed.marketing };
  } catch {
    return null;
  }
}

let current: ConsentPrefs | null = typeof window !== "undefined" ? load() : null;

/** Já houve uma decisão explícita do visitante? */
export function hasDecided(): boolean {
  return current !== null;
}

/** Preferência atual (negado por padrão enquanto não houver decisão). */
export function getConsent(): ConsentPrefs {
  return current ?? DENIED;
}

/** Salva a escolha e notifica quem estiver ouvindo (ex.: a camada de analytics). */
export function setConsent(prefs: ConsentPrefs): void {
  current = prefs;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    /* storage indisponível — segue só em memória */
  }
  window.dispatchEvent(new CustomEvent<ConsentPrefs>(CHANGE_EVENT, { detail: prefs }));
}

/** Assina mudanças de consentimento. Retorna a função de cancelamento. */
export function onConsentChange(cb: (prefs: ConsentPrefs) => void): () => void {
  const handler = (e: Event) => cb((e as CustomEvent<ConsentPrefs>).detail);
  window.addEventListener(CHANGE_EVENT, handler);
  return () => window.removeEventListener(CHANGE_EVENT, handler);
}

/** Reabre o banner de preferências (usar no link do rodapé). */
export function openConsentSettings(): void {
  window.dispatchEvent(new Event(OPEN_CONSENT_EVENT));
}
