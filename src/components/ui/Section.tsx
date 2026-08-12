import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

type SectionProps = {
  children: ReactNode;
  className?: string;
  /** Renderiza sem o Container interno (para secoes full-bleed). */
  bleed?: boolean;
  id?: string;
  "aria-label"?: string;
};

/** Bloco vertical com espacamento padrão entre secoes. */
export function Section({ children, className, bleed, id, ...rest }: SectionProps) {
  return (
    <section id={id} className={cn("py-16 sm:py-20 lg:py-24", className)} {...rest}>
      {bleed ? children : <Container>{children}</Container>}
    </section>
  );
}
