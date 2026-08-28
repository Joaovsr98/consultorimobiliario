import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { tenant } from "@/tenants";
import type { Property } from "@/types";
import { Section } from "@/components/ui/Section";
import { Seo } from "@/components/shared/Seo";
import { PropertyCard } from "@/components/shared/PropertyCard";
import { NearYou } from "@/components/home/NearYou";
import { neighborhoods } from "@/data/neighborhoods";
import { cn, maxAreaFromLabel } from "@/lib/utils";
import {
  DORM_OPTIONS,
  PRICE_BANDS,
  filterProperties,
  regionsOf,
} from "@/lib/property-filters";

const { properties } = tenant;

/**
 * Faixas de metragem (pelo maior apartamento de cada empreendimento). Precisam
 * escalar do MCMV compacto (26-50 m²) ao alto padrao (200-355 m²) sem jogar tudo
 * num unico balde "acima de 45". Por isso 3 faixas semanticas com um teto alto.
 */
const BANDS: { label: string; test: (m: number) => boolean }[] = [
  { label: "Compactos · até 45 m²", test: (m) => m > 0 && m <= 45 },
  { label: "Médios · 46 a 120 m²", test: (m) => m > 45 && m <= 120 },
  { label: "Amplos · acima de 120 m²", test: (m) => m > 120 },
  { label: "Outras metragens", test: (m) => m <= 0 },
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

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex min-h-[2.75rem] items-center rounded-full border px-4 py-2 text-sm font-medium transition-colors",
        active
          ? "border-brand bg-brand text-paper"
          : "border-brand/15 bg-paper text-ink/75 hover:border-brand/40 hover:text-brand"
      )}
    >
      {children}
    </button>
  );
}

function FilterRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
      <span className="shrink-0 text-xs font-semibold uppercase tracking-wide text-ink/45 sm:w-24">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

export function Properties() {
  const regions = useMemo(() => regionsOf(properties), []);
  const [regiao, setRegiao] = useState("");
  const [dorm, setDorm] = useState("");
  const [preco, setPreco] = useState("");

  const filtered = filterProperties(properties, {
    region: regiao || undefined,
    dorm: dorm || undefined,
    priceBand: preco || undefined,
  });

  const [filtersOpen, setFiltersOpen] = useState(false);
  const groups = groupByArea(filtered);
  const hasFilters = Boolean(regiao || dorm || preco);
  // Agrupar por metragem so ajuda na visao geral com volume. Ao filtrar (ou com
  // poucos resultados), um titulo de faixa sobre 1-2 cards parece quebrado , entao
  // mostramos uma grade unica ordenada por preco.
  const showGroups = !hasFilters && filtered.length > 3;
  const flatSorted = [...filtered].sort(
    (a, b) => (a.priceFrom ?? Infinity) - (b.priceFrom ?? Infinity)
  );
  const clear = () => {
    setRegiao("");
    setDorm("");
    setPreco("");
  };
  const activeSummary =
    [
      regiao,
      DORM_OPTIONS.find((d) => d.id === dorm)?.label,
      PRICE_BANDS.find((b) => b.id === preco)?.label,
    ]
      .filter(Boolean)
      .join(" · ") || "Todos os imóveis";
  let cardIndex = 0;

  return (
    <>
      <Seo
        title="Imóveis"
        description="Empreendimentos selecionados em São Paulo, filtre por região, dormitórios e faixa de preço. Valores e disponibilidade sujeitos a alteração."
      />

      <NearYou />

      <Section>

      <p className="text-sm font-semibold uppercase tracking-wide text-accent">Imóveis</p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-brand sm:text-5xl">
        Empreendimentos selecionados
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-ink/70">
        Filtre por região, dormitórios e faixa de preço. Valores e disponibilidade sujeitos a
        alteração.
      </p>

      {/* Filtros */}
      <div className="mt-8">
        {/* Mobile: botão que abre os filtros + resumo dos filtros ativos */}
        <button
          type="button"
          onClick={() => setFiltersOpen((o) => !o)}
          aria-expanded={filtersOpen}
          className="flex w-full items-center justify-between rounded-card border border-brand/15 bg-paper px-4 py-3 text-left shadow-card sm:hidden"
        >
          <span className="flex items-center gap-2 font-medium text-brand">
            <SlidersHorizontal className="size-4 text-accent" aria-hidden />
            Filtrar imóveis
          </span>
          <span className="flex items-center gap-2 text-sm text-ink/55">
            {filtered.length}
            <ChevronDown
              className={cn("size-4 transition-transform", filtersOpen && "rotate-180")}
              aria-hidden
            />
          </span>
        </button>
        {!filtersOpen && (
          <p className="mt-2 px-1 text-sm text-ink/60 sm:hidden">{activeSummary}</p>
        )}

        {/* Controles: sempre no desktop; no mobile só quando aberto */}
        <div
          className={cn(
            "mt-3 space-y-4 rounded-card border border-brand/10 bg-paper p-5 shadow-card sm:mt-0 sm:block",
            filtersOpen ? "block" : "hidden"
          )}
        >
          <FilterRow label="Região">
          <Chip active={regiao === ""} onClick={() => setRegiao("")}>
            Todas
          </Chip>
          {regions.map((r) => (
            <Chip key={r} active={regiao === r} onClick={() => setRegiao(r)}>
              {r}
            </Chip>
          ))}
        </FilterRow>

        <FilterRow label="Dormitórios">
          <Chip active={dorm === ""} onClick={() => setDorm("")}>
            Todos
          </Chip>
          {DORM_OPTIONS.map((d) => (
            <Chip key={d.id} active={dorm === d.id} onClick={() => setDorm(d.id)}>
              {d.label}
            </Chip>
          ))}
        </FilterRow>

        <FilterRow label="Preço">
          <Chip active={preco === ""} onClick={() => setPreco("")}>
            Qualquer
          </Chip>
          {PRICE_BANDS.map((b) => (
            <Chip key={b.id} active={preco === b.id} onClick={() => setPreco(b.id)}>
              {b.label}
            </Chip>
          ))}
        </FilterRow>

        <div className="flex items-center justify-between border-t border-brand/10 pt-3">
          <span className="text-sm text-ink/60">
            {filtered.length}{" "}
            {filtered.length === 1 ? "empreendimento" : "empreendimentos"}
          </span>
          {hasFilters && (
            <button
              type="button"
              onClick={clear}
              className="text-sm font-medium text-accent transition-colors hover:text-brand"
            >
              Limpar filtros
            </button>
          )}
          </div>
        </div>
      </div>

      {filtered.length > 0 ? (
        showGroups ? (
          <div className="mt-10 space-y-14">
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
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {flatSorted.map((property) => (
              <PropertyCard key={property.id} property={property} priority={cardIndex++ === 0} />
            ))}
          </div>
        )
      ) : (
        <div className="mt-10 rounded-card border border-dashed border-brand/20 bg-brand/[0.02] p-8 text-center">
          <p className="text-ink/70">Nenhum empreendimento com esses filtros.</p>
          <button
            type="button"
            onClick={clear}
            className="mt-3 text-sm font-medium text-accent transition-colors hover:text-brand"
          >
            Limpar filtros
          </button>
        </div>
      )}

      {neighborhoods.length > 0 && (
        <div className="mt-16 border-t border-brand/10 pt-8">
          <h2 className="font-display text-xl font-semibold text-brand">Busca por região</h2>
          <p className="mt-2 text-sm text-ink/60">
            Veja apartamentos e o que a região oferece, bairro a bairro.
          </p>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {neighborhoods.map((n) => (
              <Link
                key={n.slug}
                to={`/${n.slug}`}
                className="rounded-full border border-brand/15 bg-paper px-4 py-2 text-sm font-medium text-brand transition-colors hover:border-brand/40 hover:bg-surface"
              >
                Apartamentos em {n.neighborhood}
              </Link>
            ))}
          </div>
        </div>
      )}
      </Section>
    </>
  );
}
