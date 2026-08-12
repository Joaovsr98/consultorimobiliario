import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { cn } from "@/lib/utils";

type PropertyGalleryProps = {
  images: string[];
  alt: string;
};

const GRID_PREVIEW_COUNT = 6;

/**
 * Grade de fotos com lightbox. So renderiza quando ha imagens (o próprio
 * Property.images pode vir vazio, e isso e um estado normal, nao um erro).
 * O lightbox troca de imagem instantaneamente (sem animar a troca) para nao
 * repetir o bug do wizard: uma transicao que so avanca quando a animacao de
 * saida termina trava se a aba nao estiver compondo frames.
 */
export function PropertyGallery({ images, alt }: PropertyGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const isOpen = openIndex !== null;
  const remaining = images.length - GRID_PREVIEW_COUNT;

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") setOpenIndex((i) => (i === null ? i : (i + 1) % images.length));
      if (e.key === "ArrowLeft")
        setOpenIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length));
    }

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, images.length]);

  if (images.length === 0) return null;

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.slice(0, GRID_PREVIEW_COUNT).map((src, index) => {
          const isLastVisible = index === GRID_PREVIEW_COUNT - 1 && remaining > 0;
          return (
            <button
              key={src}
              type="button"
              onClick={() => setOpenIndex(index)}
              className={cn(
                "group relative aspect-[4/3] overflow-hidden rounded-[calc(var(--radius-brand)/1.5)]",
                index === 0 && "col-span-2 aspect-[16/9] sm:col-span-2 sm:row-span-2 sm:aspect-square"
              )}
            >
              <img
                src={src}
                alt={`${alt} — foto ${index + 1}`}
                loading={index === 0 ? "eager" : "lazy"}
                className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-brand/0 transition-colors group-hover:bg-brand/10" />
              {isLastVisible && (
                <span className="absolute inset-0 flex items-center justify-center bg-brand/60 text-lg font-semibold text-paper">
                  +{remaining}
                </span>
              )}
              {index === 0 && (
                <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-brand/80 px-3 py-1.5 text-xs font-medium text-paper opacity-0 transition-opacity group-hover:opacity-100">
                  <Expand className="size-3.5" aria-hidden />
                  Ampliar
                </span>
              )}
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-4"
            onClick={() => setOpenIndex(null)}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(null)}
              aria-label="Fechar"
              className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-paper/10 text-paper transition-colors hover:bg-paper/20"
            >
              <X className="size-5" aria-hidden />
            </button>

            <p className="absolute left-4 top-5 text-sm text-paper/70">
              {openIndex! + 1} / {images.length}
            </p>

            <button
              type="button"
              aria-label="Foto anterior"
              onClick={(e) => {
                e.stopPropagation();
                setOpenIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length));
              }}
              className="absolute left-2 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-paper/10 text-paper transition-colors hover:bg-paper/20 sm:left-4"
            >
              <ChevronLeft className="size-6" aria-hidden />
            </button>

            <img
              src={images[openIndex!]}
              alt={`${alt} — foto ${openIndex! + 1}`}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] max-w-full rounded-[var(--radius-brand)] object-contain"
            />

            <button
              type="button"
              aria-label="Proxima foto"
              onClick={(e) => {
                e.stopPropagation();
                setOpenIndex((i) => (i === null ? i : (i + 1) % images.length));
              }}
              className="absolute right-2 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-paper/10 text-paper transition-colors hover:bg-paper/20 sm:right-4"
            >
              <ChevronRight className="size-6" aria-hidden />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
