import { ArrowRight, CalendarCheck, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { buttonClasses } from "@/lib/button-styles";
import { buildWhatsappLink, defaultWhatsappMessage } from "@/lib/whatsapp";
import { identity } from "@/tenants";
import { Seo } from "@/components/shared/Seo";
import { BuyerDiagnosis } from "@/features/buyer-diagnosis/BuyerDiagnosis";
import { FeaturedProperty } from "@/components/home/FeaturedProperty";
import { BuyerJourney } from "@/components/home/BuyerJourney";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { GuidesTeaser } from "@/components/home/GuidesTeaser";
import { HomeFaq } from "@/components/home/HomeFaq";
import { FinalCta } from "@/components/home/FinalCta";

const indicators = [
  { icon: Sparkles, label: "Atendimento personalizado" },
  { icon: ShieldCheck, label: "Simulacao sem compromisso" },
  { icon: CalendarCheck, label: "Visitas acompanhadas" },
  { icon: MessageCircle, label: "Imoveis selecionados" },
];

export function Home() {
  return (
    <>
      <Seo title="Inicio" />

      <Section className="pt-14 sm:pt-16 lg:pt-20">
        <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-brand sm:text-5xl lg:text-6xl"
          >
            Seu proximo imovel comeca com uma orientacao segura
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/70"
          >
            Encontre apartamentos compativeis com seu perfil, simule
            possibilidades de compra e receba atendimento personalizado do
            inicio a entrega das chaves.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <a href="/imoveis" className={buttonClasses("primary", "lg")}>
              Encontrar meu imovel
              <ArrowRight className="size-4" aria-hidden />
            </a>
            {identity.contact.whatsapp && (
              <a
                href={buildWhatsappLink(identity.contact.whatsapp, defaultWhatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses("outline", "lg")}
              >
                Falar pelo WhatsApp
              </a>
            )}
          </motion.div>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {indicators.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="rounded-[var(--radius-brand)] border border-brand/10 bg-paper p-5"
            >
              <Icon className="size-6 text-accent" aria-hidden />
              <p className="mt-3 text-sm font-medium text-ink">{label}</p>
            </div>
          ))}
        </div>
      </Section>

      <BuyerDiagnosis
        id="diagnostico"
        eyebrow="Busca guiada"
        title="Encontre opcoes compativeis com o seu perfil"
        description="Responda em 3 passos rapidos e receba um direcionamento inicial pelo WhatsApp — sem compromisso."
      />
      <FeaturedProperty />
      <BuyerJourney />
      <AboutTeaser />
      <GuidesTeaser />
      <HomeFaq />
      <FinalCta />
    </>
  );
}
