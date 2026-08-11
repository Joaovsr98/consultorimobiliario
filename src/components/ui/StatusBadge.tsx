import type { PropertyStatus } from "@/types";
import { cn } from "@/lib/utils";

/**
 * Rotulo + cor de cada status de empreendimento. `Record` fechado sobre
 * `PropertyStatus`: adicionar um status ao tipo forca preencher aqui (erro de
 * compilacao caso esqueca). Cores sao semanticas (estado), nao a cor de marca.
 */
const statusConfig: Record<PropertyStatus, { label: string; dot: string }> = {
  "breve-lancamento": { label: "Breve lançamento", dot: "bg-ink/40" },
  lancamento: { label: "Lançamento", dot: "bg-accent" },
  "em-obras": { label: "Em obras", dot: "bg-amber-500" },
  pronto: { label: "Pronto para morar", dot: "bg-emerald-600" },
};

type StatusBadgeProps = {
  status: PropertyStatus;
  className?: string;
};

/**
 * Selo de status. Fundo claro semitransparente com blur para permanecer
 * legivel sobre qualquer fotografia. Sem dependencia de tenant.
 */
export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-paper/90 px-2.5 py-1 text-xs font-semibold text-brand shadow-sm backdrop-blur-sm",
        className
      )}
    >
      <span className={cn("size-1.5 rounded-full", config.dot)} aria-hidden />
      {config.label}
    </span>
  );
}
