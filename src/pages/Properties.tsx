import { tenant } from "@/tenants";
import { Section } from "@/components/ui/Section";
import { Seo } from "@/components/shared/Seo";
import { PropertyCard } from "@/components/shared/PropertyCard";

const { properties } = tenant;

export function Properties() {
  return (
    <Section>
      <Seo
        title="Imoveis"
        description="Empreendimentos selecionados. Valores e disponibilidade sujeitos a alteracao."
      />

      <p className="text-sm font-semibold uppercase tracking-wide text-accent">
        Imoveis
      </p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-brand sm:text-5xl">
        Empreendimentos selecionados
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-ink/70">
        Valores e disponibilidade sujeitos a alteracao.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((property, index) => (
          <PropertyCard key={property.id} property={property} priority={index === 0} />
        ))}
      </div>
    </Section>
  );
}
