import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Home, MessageCircle, RotateCcw, ShieldCheck, TrendingUp } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { buttonClasses } from "@/lib/button-styles";
import { cn } from "@/lib/utils";
import { buildWhatsappLink } from "@/lib/whatsapp";
import { identity } from "@/tenants";
import {
  bedroomsLabels,
  contactLabels,
  diagnosisSchema,
  fgtsLabels,
  goalDescriptions,
  goalLabels,
  stepFields,
  stepTitles,
  timelineLabels,
  type DiagnosisData,
} from "./schema";
import { buildDiagnosisMessage } from "./message";

const goalIcons: Record<DiagnosisData["goal"], typeof Home> = {
  morar: Home,
  investir: TrendingUp,
};

/**
 * Cards de escolha do objetivo (passo 1). Diferente dos pills de opcao, cada
 * objetivo ganha icone, titulo e subtitulo — transmite atendimento consultivo,
 * nao um formulario. Selecionado: borda navy, fundo suave e selo dourado.
 */
function GoalCards({
  value,
  onChange,
}: {
  value: DiagnosisData["goal"] | undefined;
  onChange: (value: DiagnosisData["goal"]) => void;
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
            <span className="font-display text-base font-semibold text-brand">
              {goalLabels[goal]}
            </span>
            <span className="text-sm leading-snug text-ink/60">{goalDescriptions[goal]}</span>
          </button>
        );
      })}
    </div>
  );
}

type OptionButtonsProps<T extends string> = {
  value: T | undefined;
  options: readonly T[];
  labels: Record<T, string>;
  onChange: (value: T) => void;
};

function OptionButtons<T extends string>({
  value,
  options,
  labels,
  onChange,
}: OptionButtonsProps<T>) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          aria-pressed={value === option}
          className={cn(
            "flex-1 rounded-image border px-4 py-3 text-sm font-medium transition-all",
            value === option
              ? "border-brand bg-brand text-paper shadow-card"
              : "border-brand/15 bg-surface text-ink/75 hover:border-brand/40 hover:bg-paper"
          )}
        >
          {labels[option]}
        </button>
      ))}
    </div>
  );
}

/** Resumo legivel dos dados que serao enviados — mesma informacao da mensagem, em lista. */
function ResponsePreview({ data }: { data: DiagnosisData }) {
  const rows: [string, string][] = [
    ["Objetivo", goalLabels[data.goal]],
    ["Região", data.region],
    ["Dormitórios", bedroomsLabels[data.bedrooms]],
    ["Renda familiar", `R$ ${data.income.toLocaleString("pt-BR")}`],
    ["Entrada", `R$ ${data.downPayment.toLocaleString("pt-BR")}`],
    ["FGTS", fgtsLabels[data.fgts]],
    ["Forma de pagamento", timelineLabels[data.timeline]],
    ["Prefere contato por", contactLabels[data.contact]],
  ];

  return (
    <dl className="mt-6 divide-y divide-brand/10 overflow-hidden rounded-image border border-brand/10 text-left text-sm">
      {rows.map(([label, value]) => (
        <div key={label} className="flex items-center justify-between gap-4 bg-surface/50 px-4 py-2.5">
          <dt className="text-ink/50">{label}</dt>
          <dd className="text-right font-medium text-ink">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

type BuyerDiagnosisProps = {
  id?: string;
  /** Titulo e texto de apoio, para reaproveitar o mesmo wizard em paginas diferentes. */
  eyebrow?: string;
  title?: string;
  description?: string;
};

/**
 * Diagnostico do comprador em 3 passos (Objetivo, Onde e como, Financeiro).
 * Componente único reaproveitado na Home e em /contato — evita manter duas
 * implementacoes divergentes do mesmo formulario de captacao.
 */
export function BuyerDiagnosis({
  id,
  eyebrow = "Diagnóstico do comprador",
  title = "Encontre opções compatíveis com o seu perfil",
  description = "Responda em 3 passos rápidos e receba um direcionamento inicial pelo WhatsApp — sem compromisso.",
}: BuyerDiagnosisProps) {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState<DiagnosisData | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const isNavigatingRef = useRef(false);
  const stepHeadingRef = useRef<HTMLParagraphElement>(null);

  const {
    register,
    trigger,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<DiagnosisData>({
    resolver: zodResolver(diagnosisSchema),
    mode: "onChange",
  });

  const values = watch();
  const isLastStep = step === stepFields.length - 1;

  // Move o foco para o cabecalho do passo atual, para quem navega por teclado
  // ou leitor de tela perceber a troca de conteudo (o foco nao acompanha
  // sozinho, ja que o botao "Continuar" nao se move).
  useEffect(() => {
    stepHeadingRef.current?.focus();
  }, [step]);

  async function handleNext() {
    // Trava contra clique duplo/rapido. Precisa ser um ref, nao state: dois
    // cliques disparados na mesma tarefa sincrona (ex.: clique duplo real)
    // ainda leriam o `isNavigating` da ultima render via closure, ja que
    // setState nao atualiza o valor imediatamente — a trava de estado sozinha
    // NAO bloqueia essa corrida. O ref muda na hora, entao o segundo clique
    // ve o valor atualizado de verdade.
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    setIsNavigating(true);
    try {
      const valid = await trigger(stepFields[step]);
      if (!valid) return;

      if (isLastStep) {
        handleSubmit((data) => setSubmitted(data))();
      } else {
        setStep((s) => s + 1);
      }
    } finally {
      isNavigatingRef.current = false;
      setIsNavigating(false);
    }
  }

  function handleBack() {
    setStep((s) => Math.max(0, s - 1));
  }

  function handleEdit() {
    setSubmitted(null);
    setStep(stepFields.length - 1);
  }

  function handleRestart() {
    setSubmitted(null);
    setStep(0);
  }

  if (submitted) {
    const whatsapp = identity.contact.whatsapp;

    return (
      <Section id={id} className="bg-surface">
        <div className="mx-auto max-w-xl rounded-card border border-brand/10 bg-paper p-8 text-center shadow-card sm:p-10">
          <span className="mx-auto grid size-12 place-items-center rounded-full bg-accent/15 text-accent">
            <CheckCircle2 className="size-6" aria-hidden />
          </span>
          <h2 className="mt-5 font-display text-2xl font-semibold tracking-tight text-brand">
            Encontramos opções que podem combinar com seu perfil.
          </h2>
          <p className="mt-3 text-ink/70">
            A confirmação depende da disponibilidade e da análise oficial.
          </p>

          <ResponsePreview data={submitted} />

          {whatsapp ? (
            <>
              <p className="mt-6 text-xs text-ink/50">
                Ao continuar, essas respostas serão organizadas em uma
                mensagem para iniciar seu atendimento pelo WhatsApp. Nenhuma
                análise de crédito é realizada neste site.
              </p>
              <a
                href={buildWhatsappLink(whatsapp, buildDiagnosisMessage(submitted))}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses("primary", "lg", "mt-4")}
              >
                <MessageCircle className="size-4" aria-hidden />
                Continuar no WhatsApp
              </a>
            </>
          ) : (
            <p className="mt-6 text-ink/70">
              O atendimento pelo WhatsApp ainda não está disponível. Utilize os
              canais de contato da empresa.
            </p>
          )}

          <div className="mt-4">
            <button
              type="button"
              onClick={handleEdit}
              className={buttonClasses("ghost", "sm")}
            >
              Editar respostas
            </button>
            <button
              type="button"
              onClick={handleRestart}
              className={buttonClasses("ghost", "sm", "ml-2")}
            >
              <RotateCcw className="size-3.5" aria-hidden />
              Recomeçar
            </button>
          </div>
        </div>
      </Section>
    );
  }

  return (
    <Section id={id} className="bg-surface">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-14">
        <div className="lg:sticky lg:top-24">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">{eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-brand sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-ink/70">{description}</p>
          <ul className="mt-8 grid gap-4">
            {[
              { icon: CheckCircle2, text: "Sem compromisso e sem custo" },
              { icon: MessageCircle, text: "Direcionamento direto pelo WhatsApp" },
              { icon: ShieldCheck, text: "Nenhuma análise de crédito e feita neste site" },
            ].map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-start gap-3 text-sm text-ink/75">
                <Icon className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden />
                {text}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative overflow-hidden rounded-[20px] border border-brand/[0.08] bg-gradient-to-br from-paper to-surface/40 p-6 shadow-[0_24px_60px_-20px_rgba(19,34,56,0.18),0_4px_12px_-4px_rgba(19,34,56,0.06)] sm:p-8">
          {/* Fio dourado no topo — detalhe premium, sem exagero */}
          <span
            className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent/40 via-accent to-accent/40"
            aria-hidden
          />

          <div className="text-center">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-accent">
              Consultoria personalizada
            </p>
            <p className="mt-1.5 text-xs text-ink/45">Responda 3 perguntas · menos de 1 minuto</p>
          </div>

          {/* Progresso com etapas nomeadas */}
          <div className="mt-6 flex items-start justify-center gap-1.5">
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
        <p
          ref={stepHeadingRef}
          tabIndex={-1}
          className="sr-only outline-none"
        >
          Passo {step + 1} de {stepTitles.length} &middot; {stepTitles[step]}
        </p>

        <AnimatePresence initial={false}>
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12, position: "absolute" }}
            transition={{ duration: 0.2 }}
            className="mt-8 grid gap-6"
          >
            {step === 0 && (
              <fieldset>
                <legend className="text-sm font-medium text-ink">Qual é o seu objetivo?</legend>
                <div className="mt-3">
                  <GoalCards
                    value={values.goal}
                    onChange={(v) => setValue("goal", v, { shouldValidate: true })}
                  />
                </div>
                {errors.goal && (
                  <p role="alert" className="mt-2 text-sm text-red-600">
                    {errors.goal.message}
                  </p>
                )}
              </fieldset>
            )}

            {step === 1 && (
              <>
                <div>
                  <label htmlFor="region" className="text-sm font-medium text-ink">
                    Região de interesse
                  </label>
                  <input
                    id="region"
                    type="text"
                    placeholder="Ex.: Vila Sônia"
                    {...register("region")}
                    className="mt-3 w-full rounded-image border border-brand/15 bg-surface px-4 py-3 text-sm text-ink outline-none placeholder:text-ink/40 focus-visible:border-brand"
                  />
                  {errors.region && (
                    <p role="alert" className="mt-2 text-sm text-red-600">
                      {errors.region.message}
                    </p>
                  )}
                </div>

                <fieldset>
                  <legend className="text-sm font-medium text-ink">Dormitórios</legend>
                  <div className="mt-3">
                    <OptionButtons
                      value={values.bedrooms}
                      options={["1", "2", "3+"] as const}
                      labels={bedroomsLabels}
                      onChange={(v) => setValue("bedrooms", v, { shouldValidate: true })}
                    />
                  </div>
                  {errors.bedrooms && (
                    <p role="alert" className="mt-2 text-sm text-red-600">
                      {errors.bedrooms.message}
                    </p>
                  )}
                </fieldset>
              </>
            )}

            {step === 2 && (
              <>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="income" className="text-sm font-medium text-ink">
                      Renda familiar aproximada (R$)
                    </label>
                    <input
                      id="income"
                      type="number"
                      placeholder="Ex.: 6000"
                      {...register("income")}
                      className="mt-3 w-full rounded-image border border-brand/15 bg-surface px-4 py-3 text-sm text-ink outline-none placeholder:text-ink/40 focus-visible:border-brand"
                    />
                    {errors.income && (
                      <p role="alert" className="mt-2 text-sm text-red-600">
                        {errors.income.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="downPayment" className="text-sm font-medium text-ink">
                      Entrada disponível (R$)
                    </label>
                    <input
                      id="downPayment"
                      type="number"
                      placeholder="Ex.: 25000"
                      {...register("downPayment")}
                      className="mt-3 w-full rounded-image border border-brand/15 bg-surface px-4 py-3 text-sm text-ink outline-none placeholder:text-ink/40 focus-visible:border-brand"
                    />
                    {errors.downPayment && (
                      <p role="alert" className="mt-2 text-sm text-red-600">
                        {errors.downPayment.message}
                      </p>
                    )}
                  </div>
                </div>

                <fieldset>
                  <legend className="text-sm font-medium text-ink">Possui FGTS?</legend>
                  <div className="mt-3">
                    <OptionButtons
                      value={values.fgts}
                      options={["sim", "nao"] as const}
                      labels={fgtsLabels}
                      onChange={(v) => setValue("fgts", v, { shouldValidate: true })}
                    />
                  </div>
                  {errors.fgts && (
                    <p role="alert" className="mt-2 text-sm text-red-600">
                      {errors.fgts.message}
                    </p>
                  )}
                </fieldset>

                <fieldset>
                  <legend className="text-sm font-medium text-ink">Como pretende pagar?</legend>
                  <div className="mt-3">
                    <OptionButtons
                      value={values.timeline}
                      options={["a-vista", "menos-240-meses", "mais-240-meses"] as const}
                      labels={timelineLabels}
                      onChange={(v) => setValue("timeline", v, { shouldValidate: true })}
                    />
                  </div>
                  {errors.timeline && (
                    <p role="alert" className="mt-2 text-sm text-red-600">
                      {errors.timeline.message}
                    </p>
                  )}
                </fieldset>

                <fieldset>
                  <legend className="text-sm font-medium text-ink">
                    Prefere receber o contato por ligação ou mensagem?
                  </legend>
                  <div className="mt-3">
                    <OptionButtons
                      value={values.contact}
                      options={["ligacao", "mensagem"] as const}
                      labels={contactLabels}
                      onChange={(v) => setValue("contact", v, { shouldValidate: true })}
                    />
                  </div>
                  {errors.contact && (
                    <p role="alert" className="mt-2 text-sm text-red-600">
                      {errors.contact.message}
                    </p>
                  )}
                </fieldset>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 border-t border-brand/10 pt-6">
          <div className={cn("flex items-center gap-3", step === 0 ? "justify-end" : "justify-between")}>
            {step > 0 && (
              <button
                type="button"
                onClick={handleBack}
                className={buttonClasses("ghost", "md")}
              >
                <ArrowLeft className="size-4" aria-hidden />
                Voltar
              </button>
            )}

            <button
              type="button"
              onClick={handleNext}
              disabled={isNavigating}
              aria-busy={isNavigating}
              className={cn(
                buttonClasses("primary", "md"),
                step === 0 && "w-full sm:w-auto",
                isNavigating && "opacity-70"
              )}
            >
              {isLastStep ? "Receber opções pelo WhatsApp" : "Continuar minha busca"}
              <ArrowRight className="size-4" aria-hidden />
            </button>
          </div>

          <p className="mt-5 flex items-center justify-center gap-1.5 text-center text-xs text-ink/45">
            <ShieldCheck className="size-3.5 shrink-0 text-accent" aria-hidden />
            Atendimento personalizado e sem custo — seus dados servem apenas para o atendimento.
          </p>
        </div>
        </div>
      </div>
    </Section>
  );
}
