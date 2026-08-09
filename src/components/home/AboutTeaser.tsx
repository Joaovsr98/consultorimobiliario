import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { identity } from "@/tenants";
import { Section } from "@/components/ui/Section";
import { buttonClasses } from "@/lib/button-styles";
import { cn } from "@/lib/utils";

/**
 * Teaser da pagina "Sobre", com a proposta orientada ao cliente.
 * A foto so ocupa espaco quando `identity.photo` existir — evitamos um
 * placeholder vazio que sinalizaria "incompleto" em vez de "premium".
 */
export function AboutTeaser() {
  const hasPhoto = Boolean(identity.photo);

  return (
    <Section className="bg-paper">
      <div className={cn("grid gap-10", hasPhoto && "lg:grid-cols-[1fr_1.3fr] lg:items-center")}>
        {hasPhoto && (
          <img
            src={identity.photo}
            alt={identity.displayName}
            className="w-full rounded-[var(--radius-brand)] object-cover lg:h-full"
          />
        )}

        <div className={cn(!hasPhoto && "mx-auto max-w-2xl text-center")}>
          {identity.tagline && (
            <p className="text-sm font-semibold uppercase tracking-wide text-accent">
              {identity.tagline}
            </p>
          )}
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-brand sm:text-4xl">
            Uma orientacao pensada para o seu momento
          </h2>
          <p className="mt-4 max-w-xl text-ink/70">
            Meu trabalho e ajudar voce a entender as opcoes disponiveis,
            organizar as etapas da compra e encontrar um imovel compativel com
            a sua realidade financeira.
          </p>
          {identity.serviceRegion && (
            <p className="mt-2 text-sm text-ink/50">Atuacao em {identity.serviceRegion}.</p>
          )}
          <Link
            to="/sobre"
            className={cn(buttonClasses("outline", "md"), "mt-6", !hasPhoto && "mx-auto")}
          >
            Conhecer mais
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </Section>
  );
}
