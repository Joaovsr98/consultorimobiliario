import { Link } from "react-router-dom";
import { Section } from "@/components/ui/Section";
import { buttonClasses } from "@/lib/button-styles";
import { Seo } from "@/components/shared/Seo";

export function NotFound() {
  return (
    <Section className="text-center">
      <Seo title="Pagina nao encontrada" />
      <p className="font-display text-6xl font-semibold text-accent">404</p>
      <h1 className="mt-4 font-display text-3xl font-semibold text-brand">
        Pagina nao encontrada
      </h1>
      <p className="mx-auto mt-3 max-w-md text-ink/70">
        O endereco que voce tentou acessar nao existe ou foi movido.
      </p>
      <div className="mt-8">
        <Link to="/" className={buttonClasses("primary", "lg")}>
          Voltar ao inicio
        </Link>
      </div>
    </Section>
  );
}
