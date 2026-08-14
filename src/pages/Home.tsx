import { Seo } from "@/components/shared/Seo";
import { Hero } from "@/components/home/Hero";
import { BuyerDiagnosis } from "@/features/buyer-diagnosis/BuyerDiagnosis";
import { Opportunities } from "@/components/home/Opportunities";
import { FeaturedShowcase } from "@/components/home/FeaturedShowcase";
import { BuyerJourney } from "@/components/home/BuyerJourney";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { GuidesTeaser } from "@/components/home/GuidesTeaser";
import { HomeFaq } from "@/components/home/HomeFaq";
import { FinalCta } from "@/components/home/FinalCta";

export function Home() {
  return (
    <>
      <Seo title="Início" />

      <Hero />

      <BuyerDiagnosis
        id="diagnostico"
        eyebrow="Busca guiada"
        title="Encontre opções compatíveis com o seu perfil"
        description="Responda em 3 passos rápidos e receba um direcionamento inicial pelo WhatsApp — sem compromisso."
      />
      <Opportunities />
      <FeaturedShowcase />
      <BuyerJourney />
      <AboutTeaser />
      <GuidesTeaser />
      <HomeFaq />
      <FinalCta />
    </>
  );
}
