import { faq } from "@/data/faq";
import { Section } from "@/components/ui/Section";
import { Faq } from "@/components/shared/Faq";

export function HomeFaq() {
  return (
    <Section className="bg-paper">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">FAQ</p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-brand sm:text-4xl">
          Perguntas frequentes
        </h2>
      </div>

      <div className="mt-10">
        <Faq items={faq} />
      </div>
    </Section>
  );
}
