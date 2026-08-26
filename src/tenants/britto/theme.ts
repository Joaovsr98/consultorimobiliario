import type { ThemeConfig } from "@/types";

/**
 * Tema do Britto, inspirado na identidade da EXTO Incorporadora: minimalista,
 * alto padrao. Off-white, grafite quase preto e um bronze/champagne discreto
 * como destaque. Cantos mais retos (arquitetonico), diferente do econômico.
 */
export const theme: ThemeConfig = {
  colors: {
    primary: "#143240", // azul-petroleo profundo, cor de marca EXTO
    secondary: "#1C2B33", // grafite azulado, destaque monocromatico sobrio
    surface: "#DBE6F0", // azul claro perceptivel (airy), superficie/fundo
    paper: "#FFFFFF", // branco, cartoes
    ink: "#152730", // grafite azulado, texto principal
  },
  radius: "6px",
};
