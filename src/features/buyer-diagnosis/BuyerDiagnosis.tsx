import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Home, MessageCircle, RotateCcw, Search, TrendingUp } from "lucide-react";
import { tenant, identity } from "@/tenants";
import { Section } from "@/components/ui/Section";
import { PropertyCard } from "@/components/shared/PropertyCard";
import { buttonClasses } from "@/lib/button-styles";
import { cn } from "@/lib/utils";
import { buildWhatsappLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import {
  PRICE_BANDS,
  expandAboveBudget,
  matchProperties,
  regionsOf,
  type MatchResult,
  type PropertyFilters,
} from "@/lib/property-filters";
import {
  ANY,
  goalDescriptions,
  goalLabels,
  paymentLabels,
  stepTitles,
  type Goal,
  type GuidedSearchData,
  type PaymentChoice,
} from "./schema";
import { buildGuidedMessage } from "./message";

const goalIcons: Record<Goal, typeof Home> = { morar: Home, investir: TrendingUp };
const PAYMENT_ORDER: PaymentChoice[] = ["a-vista", "financiar", "nao-sei"];

const BEDROOM_OPTIONS_DORM = [
  { id: "1", label: "1 dorm." },
  { id: "2", label: "2 dorm." },
  { id: "3+", label: "3+ dorm." },
  { id: "tanto-faz", label: "Tanto faz" },
];
const BEDROOM_OPTIONS_SUITES = [
  { id: "2", label: "2 suítes" },
  { id: "3", label: "3 suítes" },
  { id: "4+", label: "4+ suítes" },
];

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
          : "border-brand/15 bg-surface text-ink/75 hover:border-brand/40 hover:text-brand"
      )}
    >
      {children}
    </button>
  );
}

/** Cards de escolha do objetivo (ícone + título + subtítulo). */
function GoalCards({
  value,
  onChange,
}: {
  value: Goal | undefined;
  onChange: (v: Goal) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {(["morar", "investir"] as const).map((goal) => {
        const Icon = goalIcons[goal];
        const selected = value === goal;
        return (
          <button
            key={goal}
            type="button"
            onClick={() => onChange(goal)}
            aria-pressed={selected}
            className={cn(
              "group relative flex flex-col items-start gap-3 rounded-image border p-5 text-left transition-all duration-200",
              selected
                ? "-translate-y-0.5 border-brand bg-brand/[0.04] shadow-card"
                : "border-brand/15 bg-surface hover:-translate-y-0.5 hover:border-brand/40 hover:bg-paper hover:shadow-card"
            )}
          >
            {selected && (
              <span className="absolute right-3 top-3 grid size-5 place-items-center rounded-full bg-accent text-paper">
                <Check className="size-3" strokeWidth={3} aria-hidden />
              </span>
            )}
            <span
              className={cn(
                "grid size-10 place-items-center rounded-full transition-colors",
                selected ? "bg-brand text-paper" : "bg-brand/10 text-brand"
              )}
            >
              <Icon className="size-5" aria-hidden />
            </span>
            <span className="font-display text-base font-semibold text-brand">{goalLabels[goal]}</span>
            <span className="text-sm leading-snug text-ink/60">{goalDescriptions[goal]}</span>
          </button>
        );
      })}
    </div>
  );
}

type BuyerDiagnosisProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
};

/**
 * Busca guiada em 2 passos (Perfil, Preferências) que termina mostrando os
 * EMPREENDIMENTOS COMPATÍVEIS do catálogo (fonte única lib/property-filters) e
 * um CTA "Fale com minha equipe" com mensagem limpa e contextual. Reaproveitado
 * na Home e em /contato.
 */
export function BuyerDiagnosis({
  id,
  eyebrow = "Busca guiada",
  title = "Encontre opções compatíveis com o seu perfil",
  description = "Responda 2 perguntas rápidas e veja os empreendimentos que combinam com você, sem compromisso.",
}: BuyerDiagnosisProps) {
  const properties = tenant.properties;
  const regions = useMemo(() => regionsOf(properties), [properties]);
  const whatsapp = identity.contact.whatsapp;
  const reduce = useReducedMotion();

  // Config por tenant: dormitórios<->suítes e se pergunta faixa de valor.
  const search = tenant.kind === "individual" ? tenant.home?.search : undefined;
  const unit = search?.unit ?? "dormitorios";
  const askPrice = search?.askPrice ?? true;
  const bedroomOptions = unit === "suites" ? BEDROOM_OPTIONS_SUITES : BEDROOM_OPTIONS_DORM;
  const bedroomLegend = unit === "suites" ? "Quantas suítes?" : "Quantos dormitórios?";

  const [step, setStep] = useState(0);
  const [data, setData] = useState<GuidedSearchData>({});
  const [result, setResult] = useState<MatchResult | null>(null);
  const startedRef = useRef(false);

  const set = <K extends keyof GuidedSearchData>(key: K, value: GuidedSearchData[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  const canStep0 = Boolean(data.goal && data.bedrooms);
  const canStep1 = askPrice ? Boolean(data.region && data.priceBand) : Boolean(data.region);

  const searchFilters: PropertyFilters = {
    region: data.region === ANY ? undefined : data.region,
    dorm: data.bedrooms === "tanto-faz" ? undefined : data.bedrooms,
    priceBand: data.priceBand === ANY ? undefined : data.priceBand,
  };

  const runSearch = () => {
    const match = matchProperties(properties, searchFilters);
    setResult(match);
    trackEvent("diagnosis_submit", { goal: data.goal, results: match.properties.length });
  };

  const handleNext = () => {
    if (!startedRef.current) {
      startedRef.current = true;
      trackEvent("simulation_start");
    }
    if (step === 0) {
      if (canStep0) setStep(1);
    } else if (canStep1) {
      runSearch();
    }
  };

  const restart = () => {
    setResult(null);
    setStep(0);
    setData({});
    startedRef.current = false;
  };

  // ---------- Tela de RESULTADO ----------
  if (result) {
    const matches = result.properties;
    const hasMatches = matches.length > 0;

    let heading: string;
    let subtext: string | null = null;
    if (!hasMatches) {
      heading = "Não encontramos opções nessa faixa";
      subtext =
        "Não encontramos empreendimentos dentro da sua faixa de valor com esses filtros. Nossa equipe pode buscar mais alternativas para você.";
    } else if (result.aboveBudget) {
      heading =
        matches.length === 1
          ? "1 opção acima da faixa que você informou"
          : `${matches.length} opções acima da faixa que você informou`;
      subtext = "Atenção: estas opções estão acima da faixa de valor que você escolheu.";
    } else if (result.exact) {
      heading =
        matches.length === 1
          ? "Encontramos 1 empreendimento para o seu perfil"
          : `Encontramos ${matches.length} empreendimentos para o seu perfil`;
    } else {
      const parts: string[] = [];
      if (result.relaxed.includes("região")) parts.push("em regiões próximas");
      if (result.relaxed.includes("dormitórios"))
        parts.push(unit === "suites" ? "com outra opção de suítes" : "com outra opção de dormitórios");
      heading = askPrice ? "Veja opções próximas dentro da sua faixa" : "Veja opções próximas ao seu perfil";
      const faixa = askPrice ? "dentro da sua faixa de valor " : "";
      subtext = `Não encontramos uma opção exata, mas ${faixa}encontramos ${matches.length} ${
        matches.length === 1 ? "empreendimento" : "empreendimentos"
      }${parts.length ? " " + parts.join(" e ") : ""}.`;
    }

    return (
      <Section id={id} className="bg-surface">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-accent">
            <Search className="size-4" aria-hidden />
            Resultado da busca
          </div>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-brand sm:text-4xl">
            {heading}
          </h2>
          {subtext && <p className="mt-3 max-w-2xl text-ink/70">{subtext}</p>}

          {hasMatches ? (
            <>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {matches.map((property, i) => (
                  <PropertyCard key={property.id} property={property} priority={i === 0} />
                ))}
              </div>

              {/* Contexto opcional para a equipe, não é análise de crédito. */}
              <div className="mt-10 rounded-card border border-brand/10 bg-paper p-5 shadow-card">
                <p className="text-sm font-medium text-ink">
                  Como pretende pagar? <span className="font-normal text-ink/50">(opcional)</span>
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {PAYMENT_ORDER.map((p) => (
                    <Chip key={p} active={data.payment === p} onClick={() => set("payment", p)}>
                      {paymentLabels[p]}
                    </Chip>
                  ))}
                </div>
                <p className="mt-3 text-xs text-ink/45">
                  Estimativa para orientar o atendimento, não é aprovação de financiamento.
                </p>
              </div>
            </>
          ) : (
            result.overBudgetAvailable && (
              <div className="mt-8 rounded-card border border-brand/10 bg-paper p-6 text-center shadow-card">
                <p className="text-ink/70">
                  Existem empreendimentos que atendem sua região e dormitórios, mas acima da faixa de
                  valor que você informou.
                </p>
                <button
                  type="button"
                  onClick={() => setResult(expandAboveBudget(properties, searchFilters))}
                  className={cn(buttonClasses("outline", "md"), "mt-4")}
                >
                  Ver opções acima dessa faixa
                </button>
              </div>
            )
          )}

          <div className="mt-8 flex flex-col items-center gap-3 text-center">
            {whatsapp ? (
              <a
                href={buildWhatsappLink(whatsapp, buildGuidedMessage(data, matches))}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("whatsapp_click", { location: "guided_result" })}
                className={buttonClasses("primary", "lg")}
              >
                <MessageCircle className="size-4" aria-hidden />
                {identity.whatsappCta}
              </a>
            ) : (
              <p className="text-ink/70">Utilize os canais de contato da empresa.</p>
            )}
            <button type="button" onClick={restart} className={buttonClasses("ghost", "sm")}>
              <RotateCcw className="size-3.5" aria-hidden />
              Refazer busca
            </button>
          </div>
        </div>
      </Section>
    );
  }

  // ---------- WIZARD ----------
  const rise = reduce ? {} : { initial: { opacity: 0, x: 12 }, animate: { opacity: 1, x: 0 } };
  const canProceed = step === 0 ? canStep0 : canStep1;

  return (
    <Section id={id} className="bg-surface">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-14">
        <div className="lg:sticky lg:top-24">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">{eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-brand sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-ink/70">{description}</p>
          <ul className="mt-8 grid gap-3 text-sm text-ink/70">
            <li>• Sem compromisso e sem custo</li>
            <li>• Mostramos os empreendimentos que combinam com você</li>
            <li>• O contato acontece no WhatsApp, quando você quiser</li>
          </ul>
        </div>

        <div className="relative overflow-hidden rounded-[20px] border border-brand/[0.08] bg-gradient-to-br from-paper to-surface/40 p-6 shadow-[0_24px_60px_-20px_rgba(19,34,56,0.18),0_4px_12px_-4px_rgba(19,34,56,0.06)] sm:p-8">
          <span
            className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent/40 via-accent to-accent/40"
            aria-hidden
          />

          {/* Progresso */}
          <div className="flex items-start justify-center gap-1.5">
            {stepTitles.map((label, index) => (
              <div key={label} className="flex flex-1 items-start gap-1.5">
                <div className="flex flex-1 flex-col items-center gap-1.5">
                  <span
                    className={cn(
                      "grid size-8 place-items-center rounded-full text-xs font-semibold tabular-nums transition-colors",
                      index < step
                        ? "bg-brand text-paper"
                        : index === step
                          ? "bg-brand text-paper ring-4 ring-brand/10"
                          : "bg-brand/10 text-ink/45"
                    )}
                  >
                    {index < step ? <Check className="size-4" strokeWidth={3} aria-hidden /> : `0${index + 1}`}
                  </span>
                  <span
                    className={cn(
                      "text-[0.7rem] font-medium transition-colors",
                      index <= step ? "text-brand" : "text-ink/40"
                    )}
                  >
                    {label}
                  </span>
                </div>
                {index < stepTitles.length - 1 && (
                  <span
                    className={cn(
                      "mt-4 h-px flex-1 transition-colors",
                      index < step ? "bg-brand" : "bg-brand/15"
                    )}
                    aria-hidden
                  />
                )}
              </div>
            ))}
          </div>

          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={step}
              {...rise}
              exit={reduce ? undefined : { opacity: 0, x: -12 }}
              transition={{ duration: 0.2 }}
              className="mt-8 grid gap-6"
            >
              {step === 0 && (
                <>
                  <fieldset>
                    <legend className="text-sm font-medium text-ink">Qual é o seu objetivo?</legend>
                    <div className="mt-3">
                      <GoalCards value={data.goal} onChange={(v) => set("goal", v)} />
                    </div>
                  </fieldset>
                  <fieldset>
                    <legend className="text-sm font-medium text-ink">{bedroomLegend}</legend>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {bedroomOptions.map((b) => (
                        <Chip
                          key={b.id}
                          active={data.bedrooms === b.id}
                          onClick={() => set("bedrooms", b.id)}
                        >
                          {b.label}
                        </Chip>
                      ))}
                    </div>
                  </fieldset>
                </>
              )}

              {step === 1 && (
                <>
                  <fieldset>
                    <legend className="text-sm font-medium text-ink">Região de interesse</legend>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Chip active={data.region === ANY} onClick={() => set("region", ANY)}>
                        Sem preferência
                      </Chip>
                      {regions.map((r) => (
                        <Chip key={r} active={data.region === r} onClick={() => set("region", r)}>
                          {r}
                        </Chip>
                      ))}
                    </div>
                  </fieldset>
                  {askPrice && (
                    <fieldset>
                      <legend className="text-sm font-medium text-ink">Faixa de valor</legend>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <Chip active={data.priceBand === ANY} onClick={() => set("priceBand", ANY)}>
                          Sem preferência
                        </Chip>
                        {PRICE_BANDS.map((b) => (
                          <Chip
                            key={b.id}
                            active={data.priceBand === b.id}
                            onClick={() => set("priceBand", b.id)}
                          >
                            {b.label}
                          </Chip>
                        ))}
                      </div>
                    </fieldset>
                  )}
                </>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 border-t border-brand/10 pt-6">
            <div className={cn("flex items-center gap-3", step === 0 ? "justify-end" : "justify-between")}>
              {step > 0 && (
                <button type="button" onClick={() => setStep(0)} className={buttonClasses("ghost", "md")}>
                  <ArrowLeft className="size-4" aria-hidden />
                  Voltar
                </button>
              )}
              <button
                type="button"
                onClick={handleNext}
                disabled={!canProceed}
                className={cn(
                  buttonClasses("primary", "md"),
                  step === 0 && "w-full sm:w-auto",
                  !canProceed && "cursor-not-allowed opacity-50"
                )}
              >
                {step === 0 ? "Continuar" : "Ver opções"}
                <ArrowRight className="size-4" aria-hidden />
              </button>
            </div>
            <p className="mt-5 text-center text-xs text-ink/45">
              Sem compromisso, não pedimos CPF, renda exata nem documentos.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
