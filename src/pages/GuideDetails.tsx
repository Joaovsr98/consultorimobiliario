import { Link, useParams } from "react-router-dom";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { getGuideBySlug } from "@/data/guides";
import { buildWhatsappLink, defaultWhatsappMessage } from "@/lib/whatsapp";
import { identity } from "@/tenants";
import { Section } from "@/components/ui/Section";
import { buttonClasses } from "@/lib/button-styles";
import { Seo } from "@/components/shared/Seo";
import { NotFound } from "./NotFound";

export function GuideDetails() {
  const { slug } = useParams();
  const guide = slug ? getGuideBySlug(slug) : undefined;

  if (!guide) return <NotFound />;

  return (
    <Section>
      <Seo title={guide.title} description={guide.summary} />

      <Link
        to="/guias"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink/60 transition-colors hover:text-brand"
      >
        <ArrowLeft className="size-4" aria-hidden />
        Voltar para guias
      </Link>

      <article className="mt-6 max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">Guia</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-brand sm:text-5xl">
          {guide.title}
        </h1>

        <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink/70">
          {guide.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <p className="mt-8 text-sm text-ink/50">
          Este conteúdo é educativo e não substitui a análise oficial da
          instituição financeira nem constitui garantia de aprovação de crédito.
        </p>

        {identity.contact.whatsapp && (
          <a
            href={buildWhatsappLink(identity.contact.whatsapp, defaultWhatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses("primary", "lg", "mt-6")}
          >
            <MessageCircle className="size-4" aria-hidden />
            {identity.whatsappCta}
          </a>
        )}
      </article>
    </Section>
  );
}
