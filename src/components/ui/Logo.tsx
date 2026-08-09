import { Home } from "lucide-react";
import { identity } from "@/tenants";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /** Variante de cor conforme o fundo. */
  tone?: "brand" | "paper";
};

/**
 * Marca do tenant ativo. Usa `identity.logo` (marca grafica) quando existir;
 * caso contrario mantem o simbolo padrao — NUNCA usa `identity.photo` (foto
 * profissional) como substituto automatico de logo, sao usos diferentes.
 */
export function Logo({ className, tone = "brand" }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        className={cn(
          "grid size-9 place-items-center overflow-hidden rounded-[calc(var(--radius-brand)/2)]",
          tone === "paper" ? "bg-paper/10 text-paper" : "bg-brand text-paper"
        )}
      >
        {identity.logo ? (
          <img src={identity.logo} alt={identity.displayName} className="size-full object-cover" />
        ) : (
          <Home className="size-5" aria-hidden />
        )}
      </span>
      <span
        className={cn(
          "font-display text-lg font-semibold tracking-tight",
          tone === "paper" ? "text-paper" : "text-brand"
        )}
      >
        {identity.displayName}
      </span>
    </span>
  );
}
