import { Building2, Home, Leaf, MapPin, Ruler, ShieldCheck, Sparkles, TrainFront, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { HighlightIcon } from "@/types";

const ICONS: Record<HighlightIcon, LucideIcon> = {
  train: TrainFront,
  home: Home,
  leaf: Leaf,
  map: MapPin,
  users: Users,
  shield: ShieldCheck,
  sparkles: Sparkles,
  ruler: Ruler,
  building: Building2,
};

type Highlight = { icon: HighlightIcon; title: string; text: string };

/**
 * Curadoria consultiva do imóvel: "Por que este imóvel pode fazer sentido?".
 * Posicionamento deliberado , tom de quem AJUDA A AVALIAR, nao de vendedor.
 * O conteudo vem do dado do empreendimento (`property.highlights`), sempre
 * baseado em fato real (mobilidade, plantas, lazer, regiao). Sem highlights,
 * a secao nao aparece (nada de texto generico forcado).
 */
export function PropertyHighlights({ items }: { items: Highlight[] }) {
  if (!items.length) return null;
  return (
    <div className="mt-12">
      <h2 className="font-display text-2xl font-semibold text-brand">
        Por que este imóvel pode fazer sentido?
      </h2>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {items.map(({ icon, title, text }) => {
          const Icon = ICONS[icon];
          return (
            <div
              key={title}
              className="flex items-start gap-4 rounded-card border border-brand/10 bg-paper p-5 shadow-card"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-full border border-accent/40 text-accent">
                <Icon className="size-5" aria-hidden />
              </span>
              <div>
                <h3 className="font-display text-base font-semibold text-brand">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink/65">{text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
