import type { ThemeConfig } from "@/types";

/**
 * Paleta placeholder tecnica — reaproveita os mesmos tokens do tenant
 * joao-victor apenas para o site renderizar corretamente durante o
 * desenvolvimento. NAO e a identidade visual oficial da Ajuda Imoveis.
 * `themeConfirmed` (exportado abaixo, consumido por AgencyTenant) marca
 * isso explicitamente ate a marca real ser definida.
 */
export const theme: ThemeConfig = {
  colors: {
    primary: "#132238",
    secondary: "#B99555",
    surface: "#F5F1E8",
    paper: "#FFFFFF",
    ink: "#17202A",
  },
  radius: "18px",
};

/** false = paleta provisoria. Nunca tratar como identidade oficial enquanto estiver assim. */
export const themeConfirmed = false;
