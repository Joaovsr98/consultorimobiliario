import { getStoredUtm } from "./tracking";
import { getConsent, onConsentChange, type ConsentPrefs } from "./consent";

/**
 * Camada de analytics centralizada, GA4 + Meta Pixel, governada por
 * CONSENTIMENTO no modelo Google Consent Mode v2 em BASIC MODE (modo básico).
 * Os IDs vêm de variáveis de ambiente (VITE_GA4_ID, VITE_META_PIXEL_ID). Sem
 * ID => no-op seguro.
 *
 * Basic Mode (deliberado, NÃO migrar para Advanced Mode agora):
 * - As tags do GA4 e do Meta Pixel ficam BLOQUEADAS até a interação com o
 *   banner; nada é carregado antes do consentimento.
 * - Consentimento NEGADO por padrão.
 * - Ao Aceitar, inicializa a categoria correspondente (analytics -> GA4;
 *   marketing -> Meta Pixel).
 * - Ao Recusar, nenhum dado é transmitido.
 * - Preferência persistente e alterável (ver lib/consent.ts).
 * - No Advanced Mode as tags carregariam antes, com estado negado, enviando
 *   sinais sem cookies, NÃO é o caso aqui.
 *
 * Mapa Consent Mode v2: analytics_storage (analytics) e ad_storage,
 * ad_user_data, ad_personalization (marketing).
 *
 * Eventos carregam SÓ dados de contexto (imóvel + UTM), NUNCA PII (nome,
 * telefone, e-mail ou texto digitado pelo lead).
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
    _fbq?: any;
  }
}

const GA4_ID = import.meta.env.VITE_GA4_ID as string | undefined;
const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID as string | undefined;

let ga4Ready = false;
let pixelReady = false;

export type AnalyticsEvent =
  | "property_view"
  | "whatsapp_click"
  | "simulation_start"
  | "diagnosis_submit";

export type EventParams = {
  property_id?: string;
  property_name?: string;
  property_slug?: string;
  location?: string;
  [key: string]: string | number | undefined;
};

const PIXEL_STANDARD: Partial<Record<AnalyticsEvent, string>> = {
  whatsapp_click: "Contact",
  diagnosis_submit: "Lead",
};

function updateConsentMode(prefs: ConsentPrefs) {
  if (!window.gtag) return;
  window.gtag("consent", "update", {
    analytics_storage: prefs.analytics ? "granted" : "denied",
    ad_storage: prefs.marketing ? "granted" : "denied",
    ad_user_data: prefs.marketing ? "granted" : "denied",
    ad_personalization: prefs.marketing ? "granted" : "denied",
  });
}

function initGa4(id: string, prefs: ConsentPrefs) {
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  // Consent Mode v2: default negado antes de qualquer coisa.
  window.gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(s);
  window.gtag("js", new Date());
  window.gtag("config", id);
  ga4Ready = true;
  updateConsentMode(prefs);
}

function initPixel(id: string) {
  const n: any = (window.fbq = function () {
    // eslint-disable-next-line prefer-rest-params
    n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
  });
  if (!window._fbq) window._fbq = n;
  n.push = n;
  n.loaded = true;
  n.version = "2.0";
  n.queue = [];
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(s);
  window.fbq!("init", id);
  window.fbq!("track", "PageView");
  pixelReady = true;
}

/** Aplica a preferência de consentimento: carrega/atualiza GA4 e Pixel. */
function applyConsent(prefs: ConsentPrefs) {
  if (GA4_ID) {
    if (prefs.analytics && !ga4Ready) initGa4(GA4_ID, prefs);
    else if (ga4Ready) updateConsentMode(prefs);
  }
  if (PIXEL_ID && prefs.marketing && !pixelReady) initPixel(PIXEL_ID);
}

/**
 * Inicializa a camada de analytics ligada ao consentimento. Se o visitante já
 * havia decidido, aplica a escolha; e passa a reagir a mudanças futuras.
 */
export function initAnalytics(): void {
  if (typeof window === "undefined") return;
  applyConsent(getConsent());
  onConsentChange(applyConsent);
}

function cleanParams(params: EventParams): EventParams {
  const utm = getStoredUtm();
  const merged: EventParams = {
    ...params,
    utm_source: utm.source,
    utm_medium: utm.medium,
    utm_campaign: utm.campaign,
    utm_content: utm.content,
    utm_term: utm.term,
  };
  Object.keys(merged).forEach((k) => merged[k] === undefined && delete merged[k]);
  return merged;
}

/**
 * Dispara um evento. Gated por consentimento em runtime: GA4 só recebe com
 * `analytics`; Meta Pixel só com `marketing`. No-op se nada estiver ativo.
 */
export function trackEvent(name: AnalyticsEvent, params: EventParams = {}): void {
  if (!ga4Ready && !pixelReady) return;
  const prefs = getConsent();
  const payload = cleanParams(params);
  if (ga4Ready && prefs.analytics && window.gtag) window.gtag("event", name, payload);
  if (pixelReady && prefs.marketing && window.fbq) {
    const std = PIXEL_STANDARD[name];
    if (std) window.fbq("track", std, payload);
    window.fbq("trackCustom", name, payload);
  }
}
