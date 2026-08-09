import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/types";
import { cn } from "@/lib/utils";

type FaqProps = {
  items: FaqItem[];
};

/** Acordeao de perguntas frequentes, reutilizavel fora da Home se necessario. */
export function Faq({ items }: FaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-2xl divide-y divide-brand/10 rounded-[var(--radius-brand)] border border-brand/10 bg-paper">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="font-medium text-ink">{item.question}</span>
              <ChevronDown
                className={cn(
                  "size-4 shrink-0 text-ink/50 transition-transform",
                  isOpen && "rotate-180"
                )}
                aria-hidden
              />
            </button>
            {isOpen && (
              <p className="px-5 pb-4 text-sm leading-relaxed text-ink/70">{item.answer}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
