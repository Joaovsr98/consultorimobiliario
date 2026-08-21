import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { applyTheme } from "@/lib/theme";
import { captureUtm } from "@/lib/tracking";
import { initAnalytics } from "@/lib/analytics";
import { tenant } from "@/tenants";
import "./index.css";

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
