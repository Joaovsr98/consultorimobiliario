import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { applyTheme } from "@/lib/theme";
import { captureUtm } from "@/lib/tracking";
import { initAnalytics } from "@/lib/analytics";
import { tenant, activeTenantId } from "@/tenants";
import "./index.css";

// Marca o tenant ativo no <html> para estilos escopados (ex.: fonte serifada
// do britto). Fica antes do applyTheme para nao causar flash de fonte.
document.documentElement.dataset.tenant = activeTenantId;
// Sincroniza os tokens de tema do tenant ativo com as CSS variables.
applyTheme(tenant.theme);
// Guarda os UTMs da URL, se presentes (usados pela camada de analytics).
captureUtm();
// Inicializa GA4/Meta Pixel se os IDs estiverem configurados (senao, no-op).
initAnalytics();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Remove o splash de carregamento assim que o app pinta o primeiro quadro,
// com um fade suave. O conteudo pre-renderizado (SEO) ja foi substituido pelo
// React neste ponto.
requestAnimationFrame(() => {
  const splash = document.getElementById("splash");
  if (!splash) return;
  splash.classList.add("is-hidden");
  splash.addEventListener("transitionend", () => splash.remove(), { once: true });
  window.setTimeout(() => splash.remove(), 700);
});
