import { Section } from "@/components/ui/Section";

const steps = [
  "Conhecemos seu perfil",
  "Selecionamos as opcoes",
  "Fazemos a simulacao",
  "Agendamos a visita",
  "Acompanhamos a proposta",
  "Seguimos ate as chaves",
];

/** Jornada de compra em 6 etapas — reduz a inseguranca de quem nunca comprou imovel. */
export function BuyerJourney() {
  return (
    <Section className="bg-paper">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">
          Como funciona
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-brand sm:text-4xl">
          A jornada de compra
        </h2>
      </div>

      <ol className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((step, index) => (
          <li
            key={step}
            className="flex items-start gap-4 rounded-[var(--radius-brand)] border border-brand/10 bg-surface p-5"
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand font-display text-sm font-semibold text-paper">
              {index + 1}
            </span>
            <span className="pt-1.5 text-sm font-medium text-ink">{step}</span>
          </li>
        ))}
      </ol>
    </Section>
  );
}
