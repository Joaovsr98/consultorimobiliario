import { Check } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { tenant } from "@/tenants";

/**
 * Camada de CONFIANCA da Home: "Por que comprar com a <marca>?". Reforca a
 * seguranca de decidir com a empresa, DEPOIS de o cliente ja ter conhecido os
 * imoveis. Conteudo vem do tenant (`home.whyUs`); sem ele, a secao nao aparece.
 * Tom consultivo, sem numero inventado nem promessa comercial (regra do cliente).
 */
export function WhyUs() {
  const whyUs = tenant.kind === "individual" ? tenant.home?.whyUs : undefined;
  if (!whyUs?.items.length) return null;

  return (
    <Section className="bg-surface">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-brand sm:text-4xl">
          {whyUs.title}
        </h2>
        {whyUs.intro && <p className="mt-4 text-ink/70">{whyUs.intro}</p>}
      </div>

      <div className="mx-auto mt-10 grid max-w-4xl gap-5 sm:grid-cols-2">
        {whyUs.items.map((item) => (
          <div
            key={item.title}
            className="flex items-start gap-4 rounded-card border border-brand/10 bg-paper p-5 shadow-card"
          >
            <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">
              <Check className="size-4" strokeWidth={3} aria-hidden />
            </span>
            <div>
              <h3 className="font-display text-base font-semibold text-brand">{item.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink/65">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
