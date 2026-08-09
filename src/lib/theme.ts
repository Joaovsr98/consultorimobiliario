import { theme } from "@/config/theme";
import type { ThemeConfig } from "@/types";

/**
 * Injeta os tokens do tema (config/theme.ts) como CSS variables em :root.
 * O Tailwind consome essas variaveis via `@theme` em index.css, entao trocar
 * o tema em runtime (white-label) e apenas chamar applyTheme(outroTema).
 */
export function applyTheme(config: ThemeConfig = theme): void {
  const root = document.documentElement;
  root.style.setProperty("--brand-primary", config.colors.primary);
  root.style.setProperty("--brand-secondary", config.colors.secondary);
  root.style.setProperty("--brand-surface", config.colors.surface);
  root.style.setProperty("--brand-paper", config.colors.paper);
  root.style.setProperty("--brand-ink", config.colors.ink);
  root.style.setProperty("--brand-radius", config.radius);
}
