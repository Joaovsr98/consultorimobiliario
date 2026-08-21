import { getStoredUtm } from "./tracking";

/**
 * Camada de analytics centralizada — GA4 + Meta Pixel. Os IDs vêm de variáveis
 * de ambiente (VITE_GA4_ID, VITE_META_PIXEL_ID). Sem ID => no-op seguro: nada
 * carrega e nenhum evento dispara. Nunca ha ID hardcoded.
 *
 * Todo evento carrega internamente contexto do imóvel + UTMs (dado de
 * analytics) — isso NUNCA aparece na mensagem do WhatsApp.
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

// Eventos mapeados para eventos padrao do Meta Pixel (melhor otimizacao de
// campanha); os demais vao como custom com o mesmo nome.
const PIXEL_STANDARD: Partial<Record<AnalyticsEvent, string>> = {
  whatsapp_click: "Contact",
  diagnosis_submit: "Lead",
};

function initGa4(id: string) {
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(s);
  window.gtag("js", new Date());
  window.gtag("config", id);
  ga4Ready = true;
}

function initPixel(id: string) {
  /* Snippet oficial do Meta Pixel, adaptado. */
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

/** Inicializa GA4 e/ou Meta Pixel se os IDs existirem. Idempotente. */
export function initAnalytics(): void {
  if (typeof window === "undefined") return;
  if (GA4_ID && !ga4Ready) initGa4(GA4_ID);
  if (PIXEL_ID && !pixelReady) initPixel(PIXEL_ID);
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

/** Dispara um evento para GA4 e Meta Pixel (quando ativos). No-op se nenhum ID. */
export function trackEvent(name: AnalyticsEvent, params: EventParams = {}): void {
  if (!ga4Ready && !pixelReady) return;
  const payload = cleanParams(params);
  if (ga4Ready && window.gtag) window.gtag("event", name, payload);
  if (pixelReady && window.fbq) {
    const std = PIXEL_STANDARD[name];
    if (std) window.fbq("track", std, payload);
    window.fbq("trackCustom", name, payload);
  }
}
