import { StrictMode, useEffect } from "react";
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

// Remove o splash de carregamento com um fade suave, so DEPOIS que o React
// montou o app. O render do createRoot e assincrono: um requestAnimationFrame
// logo apos render() podia rodar antes do commit e mostrar, por ~0,5 s no
// celular, o conteudo pre-renderizado (SEO) sem estilo. useEffect roda apos o
// commit; o rAF espera o quadro com o app ja pintado.
function RemoveSplash() {
  useEffect(() => {
    requestAnimationFrame(() => {
      const splash = document.getElementById("splash");
      if (!splash) return;
      splash.classList.add("is-hidden");
      splash.addEventListener("transitionend", () => splash.remove(), { once: true });
      window.setTimeout(() => splash.remove(), 700);
    });
  }, []);
  return null;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <RemoveSplash />
  </StrictMode>
);
