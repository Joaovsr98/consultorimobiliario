import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { tenant, identity } from "@/tenants";
import { Container } from "@/components/ui/Container";
import { buttonClasses } from "@/lib/button-styles";
import { buildWhatsappLink, defaultWhatsappMessage } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

/**
 * Hero da primeira dobra. Conteudo (imagens, headline, subtitle) vem de
 * `tenant.hero` — este componente e compartilhado e nao contem dado de marca.
 *
 * Suporta carrossel: quando `hero.images` tem 2+ itens, alterna entre elas com
 * crossfade e auto-avanco (respeitando prefers-reduced-motion). A PRIMEIRA
 * imagem e tratada como CRITICA (LCP): eager + fetchPriority alta.
 */
export function Hero() {
  const hero = tenant.hero;
  const whatsapp = identity.contact.whatsapp;
  const reduce = useReducedMotion();

  const slides = hero?.images?.length
    ? hero.images
    : hero?.image
      ? [{ src: hero.image, alt: hero.imageAlt ?? "" }]
      : [];

  const [index, setIndex] = useState(0);
  const go = (dir: number) => setIndex((i) => (i + dir + slides.length) % slides.length);

  useEffect(() => {
    if (reduce || slides.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5500);
    return () => clearInterval(id);
  }, [reduce, slides.length]);

  if (!hero) return null;

  const rise = reduce ? {} : { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 } };

  return (
    <section className="relative isolate flex min-h-[82vh] items-center overflow-hidden">
      {slides.length > 0 ? (
        slides.map((slide, i) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={i === index ? slide.alt : ""}
            loading={i === 0 ? "eager" : "lazy"}
            fetchPriority={i === 0 ? "high" : undefined}
            aria-hidden={i !== index}
            className={cn(
              "absolute inset-0 size-full object-cover transition-opacity duration-1000 ease-out motion-reduce:transition-none",
              i === index ? "opacity-100" : "opacity-0"
            )}
            style={{ objectPosition: "center 40%" }}
          />
        ))
      ) : (
        <div className="absolute inset-0 bg-brand" aria-hidden />
      )}

      {/* Gradientes para legibilidade e aparencia premium: vertical (base) +
          horizontal navy da esquerda (onde vive o texto) para a direita. */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-brand/90 via-brand/45 to-brand/10"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-brand/85 via-brand/45 to-transparent"
        aria-hidden
      />

      <Container className="relative py-16 sm:py-20 lg:py-28">
        <motion.div {...rise} transition={{ duration: 0.6, ease: "easeOut" }} className="max-w-2xl">
          {hero.subtitle && (
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-paper/85">
              {hero.subtitle}
            </p>
          )}
          <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-paper sm:text-5xl lg:text-6xl">
            {hero.headline}
          </h1>
          {hero.description && (
            <p className="mt-5 max-w-md text-lg leading-relaxed text-paper/85">
              {hero.description}
            </p>
          )}

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
                {identity.whatsappCta}
              </a>
            )}
          </div>
        </motion.div>
      </Container>

      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Foto anterior"
            className="absolute left-3 top-1/2 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-paper/15 text-paper backdrop-blur-sm transition-colors hover:bg-paper/30 sm:left-5"
          >
            <ChevronLeft className="size-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Próxima foto"
            className="absolute right-3 top-1/2 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-paper/15 text-paper backdrop-blur-sm transition-colors hover:bg-paper/30 sm:right-5"
          >
            <ChevronRight className="size-5" aria-hidden />
          </button>
        </>
      )}

      {slides.length > 1 && (
        <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Ver foto ${i + 1}`}
              aria-current={i === index}
              className={cn(
                "h-2 rounded-full transition-all",
                i === index ? "w-6 bg-paper" : "w-2 bg-paper/50 hover:bg-paper/80"
              )}
            />
          ))}
        </div>
      )}
    </section>
  );
}
