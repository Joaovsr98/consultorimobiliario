import type { ThemeConfig } from "@/types";

/**
 * Fonte da verdade do tema. Estes valores sao injetados como CSS variables
 * em `:root` por `applyTheme()` (src/lib/theme.ts), e o Tailwind expoe
 * utilitarios semanticos (bg-brand, text-accent, bg-surface, text-ink).
 *
 * Para re-tematizar para outro corretor, troque apenas as cores abaixo.
 */
export const theme: ThemeConfig = {
  colors: {
    primary: "#132238", // azul-marinho
    secondary: "#B99555", // dourado discreto
    surface: "#F5F1E8", // areia clara
    paper: "#FFFFFF", // branco
    ink: "#17202A", // grafite
  },
  radius: "18px",
};
