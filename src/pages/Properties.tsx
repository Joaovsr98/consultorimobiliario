import { tenant } from "@/tenants";
import type { Property } from "@/types";
import { Section } from "@/components/ui/Section";
import { Seo } from "@/components/shared/Seo";
import { PropertyCard } from "@/components/shared/PropertyCard";
import { maxAreaFromLabel } from "@/lib/utils";

const { properties } = tenant;

/** Faixas de metragem (pelo maior apartamento de cada empreendimento). */
const BANDS: { label: string; test: (m: number) => boolean }[] = [
  { label: "Até 35 m²", test: (m) => m > 0 && m <= 35 },
  { label: "36 a 45 m²", test: (m) => m > 35 && m <= 45 },
  { label: "Acima de 45 m²", test: (m) => m > 45 },
  { label: "Outros", test: (m) => m <= 0 },
];

/** Agrupa por faixa de metragem, ordenando cada grupo do menor preco para o maior. */
function groupByArea(list: Property[]) {
  return BANDS.map((band) => ({
    label: band.label,
    items: list
      .filter((p) => band.test(maxAreaFromLabel(p.area)))
      .sort((a, b) => (a.priceFrom ?? Infinity) - (b.priceFrom ?? Infinity)),
  })).filter((g) => g.items.length > 0);
}

export function Properties() {
  const groups = groupByArea(properties);
  let cardIndex = 0;

  return (
    <Section>
      <Seo
        title="Imóveis"
        description="Empreendimentos selecionados, organizados por metragem. Valores e disponibilidade sujeitos a alteração."
      />

      <p className="text-sm font-semibold uppercase tracking-wide text-accent">Imóveis</p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-brand sm:text-5xl">
        Empreendimentos selecionados
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-ink/70">
        Organizados por metragem para você comparar de um jeito rápido. Valores e disponibilidade
        sujeitos a alteração.
      </p>

      <div className="mt-12 space-y-14">
        {groups.map((group) => (
          <div key={group.label}>
            <div className="flex items-baseline gap-3 border-b border-brand/10 pb-3">
              <h2 className="font-display text-2xl font-semibold text-brand">{group.label}</h2>
              <span className="text-sm text-ink/50">
                {group.items.length}{" "}
                {group.items.length === 1 ? "empreendimento" : "empreendimentos"}
              </span>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  priority={cardIndex++ === 0}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
