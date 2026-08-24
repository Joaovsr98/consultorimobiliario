import { Gem, KeyRound, MapPin, PenTool, ShieldCheck, Sparkles, Tag, Train, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { tenant } from "@/tenants";
import type { DifferentialIcon } from "@/tenants/types";

const ICONS: Record<DifferentialIcon, LucideIcon> = {
  train: Train,
  tag: Tag,
  users: Users,
  shield: ShieldCheck,
  map: MapPin,
  gem: Gem,
  pen: PenTool,
  sparkles: Sparkles,
  key: KeyRound,
};

/**
 * Faixa de diferenciais. O conteudo vem do tenant (`home.differentials`);
 * sem ele, usa o padrao econômico (Bueno). Assim cada marca fala a sua
 * linguagem sem regressao para os demais.
 */
const DEFAULT_ITEMS: { icon: DifferentialIcon; title: string; text: string }[] = [
  { icon: "train", title: "Ao lado do metrô", text: "Empreendimentos bem localizados, próximos a estações." },
  { icon: "tag", title: "Condições facilitadas", text: "Opções no Minha Casa Minha Vida e planos que cabem no seu bolso." },
  { icon: "users", title: "Atendimento personalizado", text: "Acompanhamos você em cada etapa, sem empurrar imóvel." },
  { icon: "shield", title: "Segurança e transparência", text: "Informações claras, do primeiro contato à entrega das chaves." },
];

export function Differentials() {
  const items =
    tenant.kind === "individual" && tenant.home?.differentials?.length
      ? tenant.home.differentials
      : DEFAULT_ITEMS;
  return (
    <Section className="bg-surface pt-14 pb-12 sm:pt-16 sm:pb-14">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ icon, title, text }) => {
          const Icon = ICONS[icon];
          return (
          <div key={title} className="flex flex-col items-start gap-3">
            <span className="grid size-12 place-items-center rounded-full border border-accent/40 text-accent">
              <Icon className="size-6" aria-hidden />
            </span>
            <h3 className="font-display text-base font-semibold uppercase tracking-wide text-brand">
              {title}
            </h3>
            <p className="text-sm leading-relaxed text-ink/65">{text}</p>
          </div>
          );
        })}
      </div>
    </Section>
  );
}
