import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { tenant, identity } from "@/tenants";
import { Container } from "@/components/ui/Container";
import { PropertyImage } from "@/components/ui/PropertyImage";
import { buttonClasses } from "@/lib/button-styles";
import { buildWhatsappLink, defaultWhatsappMessage } from "@/lib/whatsapp";

/**
 * Hero da primeira dobra. Conteudo (imagem, headline, subtitle) vem de
 * `tenant.hero` — este componente e compartilhado e nao contem dado de marca.
 *
 * Imagem tratada como CRITICA (LCP): eager + fetchPriority alta, nunca lazy.
 * Quando o tenant nao tem imagem de Hero, cai para um fundo solido de marca —
 * nunca o placeholder "imagem em breve" (esse e dos cards).
 */
export function Hero() {
  const hero = tenant.hero;
  const whatsapp = identity.contact.whatsapp;
  const reduce = useReducedMotion();

  if (!hero) return null;

  const rise = reduce ? {} : { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 } };

  return (
    <section className="relative isolate flex min-h-[70vh] items-end overflow-hidden">
      {hero.image ? (
        <PropertyImage
          fill
          src={hero.image}
          alt={hero.imageAlt ?? ""}
          loading="eager"
          fetchPriority="high"
          objectPosition="center 30%"
        />
      ) : (
        <div className="absolute inset-0 bg-brand" aria-hidden />
      )}

      {/* Gradiente para legibilidade do texto sobre a imagem. */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-brand/90 via-brand/45 to-brand/10"
        aria-hidden
      />

      <Container className="relative py-16 sm:py-20 lg:py-24">
        <motion.div {...rise} transition={{ duration: 0.6, ease: "easeOut" }} className="max-w-2xl">
          {hero.subtitle && (
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-paper/85">
              {hero.subtitle}
            </p>
          )}
          <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-paper sm:text-5xl lg:text-6xl">
            {hero.headline}
          </h1>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/imoveis" className={buttonClasses("secondary", "lg")}>
              Ver empreendimentos
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            {whatsapp && (
              <a
                href={buildWhatsappLink(whatsapp, defaultWhatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses("outline", "lg", "border-paper/40 text-paper hover:bg-paper/10")}
              >
                <MessageCircle className="size-4" aria-hidden />
                Falar pelo WhatsApp
              </a>
            )}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
