import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { applyTheme } from "@/lib/theme";
import { captureUtm } from "@/lib/tracking";
import { tenant } from "@/tenants";
import "./index.css";

// Sincroniza os tokens de tema do tenant ativo com as CSS variables.
applyTheme(tenant.theme);
// Guarda utm_source/utm_medium/utm_campaign da URL, se presentes.
captureUtm();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
