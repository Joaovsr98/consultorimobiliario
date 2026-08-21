import { ShieldCheck, Tag, Train, Users } from "lucide-react";
import { Section } from "@/components/ui/Section";

/**
 * Faixa de diferenciais da marca Bueno Imóveis (brand board). Conteudo fixo,
 * alinhado a identidade — reforca posicionamento logo apos o hero.
 */
const items = [
  { icon: Train, title: "Ao lado do metrô", text: "Empreendimentos bem localizados, próximos a estações." },
  { icon: Tag, title: "Condições facilitadas", text: "Opções no Minha Casa Minha Vida e planos que cabem no seu bolso." },
  { icon: Users, title: "Atendimento personalizado", text: "Acompanhamos você em cada etapa, sem empurrar imóvel." },
  { icon: ShieldCheck, title: "Segurança e transparência", text: "Informações claras, do primeiro contato à entrega das chaves." },
];

export function Differentials() {
  return (
    <Section className="bg-surface py-10 sm:py-12 lg:py-14">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex flex-col items-start gap-3">
            <span className="grid size-12 place-items-center rounded-full border border-accent/40 text-accent">
              <Icon className="size-6" aria-hidden />
            </span>
            <h3 className="font-display text-base font-semibold uppercase tracking-wide text-brand">
              {title}
            </h3>
            <p className="text-sm leading-relaxed text-ink/65">{text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
