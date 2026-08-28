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
 * `tenant.hero`, este componente e compartilhado e nao contem dado de marca.
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
  // Controle de carga: como todos os slides ficam sobrepostos (absolute inset-0),
  // eles estao "na viewport" e o loading=lazy nao segura , o navegador baixaria
  // TODAS as fotos no primeiro paint. Montamos apenas os slides ja vistos, entao
  // o carregamento inicial pega so a primeira imagem; as demais entram conforme
  // o carrossel avanca ou o usuario navega.
  const [seen, setSeen] = useState<Set<number>>(() => new Set([0]));
  const goTo = (i: number) => {
    setIndex(i);
    setSeen((prev) => (prev.has(i) ? prev : new Set(prev).add(i)));
  };
  const go = (dir: number) => goTo((index + dir + slides.length) % slides.length);

  useEffect(() => {
    if (reduce || slides.length < 2) return;
    const id = setInterval(() => {
      setIndex((i) => {
        const next = (i + 1) % slides.length;
        setSeen((prev) => (prev.has(next) ? prev : new Set(prev).add(next)));
        return next;
      });
    }, 5500);
    return () => clearInterval(id);
  }, [reduce, slides.length]);

  if (!hero) return null;

  const rise = reduce ? {} : { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 } };

  return (
    <section className="relative isolate flex min-h-[70vh] items-center overflow-hidden sm:min-h-[82vh]">
      {slides.length > 0 ? (
        slides.map((slide, i) =>
          seen.has(i) ? (
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
          ) : null
        )
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

      <Container className="relative py-12 sm:py-20 lg:py-28">
        <motion.div {...rise} transition={{ duration: 0.6, ease: "easeOut" }} className="max-w-2xl">
          {hero.subtitle && (
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-paper/85">
              {hero.subtitle}
            </p>
          )}
          <h1 className="mt-4 font-display text-3xl font-semibold leading-[1.1] tracking-tight text-paper sm:text-5xl sm:leading-[1.08] lg:text-6xl">
            {hero.headlineShort ? (
              <>
                <span className="sm:hidden">{hero.headlineShort}</span>
                <span className="hidden sm:inline">{hero.headline}</span>
              </>
            ) : (
              hero.headline
            )}
          </h1>
          {hero.descriptionShort ? (
            <>
              <p className="mt-4 max-w-md text-base leading-relaxed text-paper/85 sm:hidden">
                {hero.descriptionShort}
              </p>
              <p className="mt-5 hidden max-w-md text-lg leading-relaxed text-paper/85 sm:block">
                {hero.description}
              </p>
            </>
          ) : (
            hero.description && (
              <p className="mt-5 max-w-md text-lg leading-relaxed text-paper/85">
                {hero.description}
              </p>
            )
          )}

          <div className="mt-6 flex flex-col items-start gap-3 sm:mt-8 sm:flex-row sm:items-stretch">
            <Link to="/imoveis" className={buttonClasses("secondary", "lg")}>
              Conhecer imóveis
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
            className="absolute left-3 top-1/2 z-10 hidden size-10 -translate-y-1/2 place-items-center rounded-full bg-paper/15 text-paper backdrop-blur-sm transition-colors hover:bg-paper/30 sm:left-5 sm:grid"
          >
            <ChevronLeft className="size-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Próxima foto"
            className="absolute right-3 top-1/2 z-10 hidden size-10 -translate-y-1/2 place-items-center rounded-full bg-paper/15 text-paper backdrop-blur-sm transition-colors hover:bg-paper/30 sm:right-5 sm:grid"
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
              onClick={() => goTo(i)}
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
