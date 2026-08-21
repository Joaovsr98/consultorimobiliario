import type { ThemeConfig } from "@/types";

/**
 * Fonte da verdade do tema. Estes valores sao injetados como CSS variables
 * em `:root` por `applyTheme()` (src/lib/theme.ts), e o Tailwind expoe
 * utilitarios semanticos (bg-brand, text-accent, bg-surface, text-ink).
 *
 * Para re-tematizar para outro corretor, troque apenas as cores abaixo.
 */
// Paleta oficial da marca Bueno House (brand board).
export const theme: ThemeConfig = {
  colors: {
    primary: "#0D1B2A", // navy da marca
    secondary: "#D4AF37", // dourado da marca
    surface: "#F5F5F5", // off-white da marca
    paper: "#FFFFFF", // branco
    ink: "#0D1B2A", // texto em navy profundo
  },
  radius: "18px",
};
