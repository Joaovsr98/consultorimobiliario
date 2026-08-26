import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";

type PropertyImageProps = {
  /** Caminho da imagem autorizada. Vazio/ausente -> placeholder honesto. */
  src?: string;
  /** Texto alternativo obrigatório para acessibilidade. */
  alt: string;
  /** Proporcao do quadro (CSS aspect-ratio). Padrao 4:3, padrão imobiliario. */
  ratio?: string;
  /**
   * Preenche um pai posicionado (absolute inset-0), sem aspect-ratio próprio, 
   * para fundos de Hero, onde a altura vem do container, nao da proporcao.
   */
  fill?: boolean;
  /** Posicao do recorte (object-position), util quando a imagem e cortada. */
  objectPosition?: string;
  /**
   * `lazy` (padrão) para imagens fora da primeira dobra; `eager` para a imagem
   * critica de uma Hero. Nunca lazy no conteudo LCP.
   */
  loading?: "lazy" | "eager";
  /** `high` para a imagem critica da Hero; `auto`/`low` para o resto. */
  fetchPriority?: "high" | "low" | "auto";
  className?: string;
  /** Classe aplicada ao <img> (ex.: zoom no hover controlado pelo card pai). */
  imgClassName?: string;
};

/**
 * Convencao única de imagem de imóvel. Garante:
 * - proporcao estavel via aspect-ratio (zero CLS, sem width/height fixos);
 * - object-fit cover;
 * - lazy loading por padrão, ajustavel para conteudo critico;
 * - placeholder HONESTO quando nao ha imagem autorizada, nunca uma foto
 *   generica fingindo ser o empreendimento.
 *
 * Nao depende de nenhum tenant/marca. Serve qualquer Property.
 */
export function PropertyImage({
  src,
  alt,
  ratio = "4 / 3",
  fill = false,
  objectPosition,
  loading = "lazy",
  fetchPriority = "auto",
  className,
  imgClassName,
}: PropertyImageProps) {
  return (
    <div
      className={cn(
        "overflow-hidden bg-surface",
        fill ? "absolute inset-0" : "relative rounded-image",
        className
      )}
      style={fill ? undefined : { aspectRatio: ratio }}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          loading={loading}
          fetchPriority={fetchPriority}
          decoding="async"
          style={objectPosition ? { objectPosition } : undefined}
          className={cn("size-full object-cover", imgClassName)}
        />
      ) : (
        <div
          className="flex size-full flex-col items-center justify-center gap-2 bg-brand/5 text-ink/40"
          role="img"
          aria-label={`${alt}, imagem oficial em breve`}
        >
          <ImageOff className="size-7" aria-hidden />
          <span className="text-xs font-medium tracking-wide">Imagem em breve</span>
        </div>
      )}
    </div>
  );
}
