import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius-brand)] font-medium transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50";

export const buttonVariants: Record<ButtonVariant, string> = {
  primary: "bg-brand text-paper hover:bg-brand/90",
  secondary: "bg-accent text-brand hover:bg-accent/90",
  outline: "border border-brand/25 text-brand hover:bg-brand/5",
  ghost: "text-brand hover:bg-brand/5",
};

export const buttonSizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-base",
};

/** Estilos compartilhados para links com aparencia de botao. */
export function buttonClasses(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string
): string {
  return cn(buttonBase, buttonVariants[variant], buttonSizes[size], className);
}
