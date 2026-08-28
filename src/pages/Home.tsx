import { Seo } from "@/components/shared/Seo";
import { Hero } from "@/components/home/Hero";
import { Differentials } from "@/components/home/Differentials";
import { BuyerDiagnosis } from "@/features/buyer-diagnosis/BuyerDiagnosis";
import { Opportunities } from "@/components/home/Opportunities";
import { FeaturedShowcase } from "@/components/home/FeaturedShowcase";
import { NearYou } from "@/components/home/NearYou";
import { BuyerJourney } from "@/components/home/BuyerJourney";
import { WhyUs } from "@/components/home/WhyUs";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { GuidesTeaser } from "@/components/home/GuidesTeaser";
import { HomeFaq } from "@/components/home/HomeFaq";
import { FinalCta } from "@/components/home/FinalCta";
import { tenant } from "@/tenants";

const DEFAULT_META = {
  title: "Apartamentos em São Paulo",
  description:
    "Apartamentos e lançamentos em São Paulo, inclusive próximos ao metrô e no Minha Casa Minha Vida. Atendimento imobiliário personalizado do início à entrega das chaves.",
};
const DEFAULT_GUIDED = {
  eyebrow: "Busca guiada",
  title: "Encontre opções compatíveis com o seu perfil",
  description:
    "Responda em 2 passos rápidos e receba um direcionamento inicial pelo WhatsApp, sem compromisso.",
};

export function Home() {
  const home = tenant.kind === "individual" ? tenant.home : undefined;
  const meta = {
    title: home?.metaTitle ?? DEFAULT_META.title,
    description: home?.metaDescription ?? DEFAULT_META.description,
  };
  const guided = home?.guided ?? DEFAULT_GUIDED;

  return (
    <>
      <Seo title={meta.title} description={meta.description} />

      <Hero />

      <NearYou />

      <FeaturedShowcase />

      <Differentials />

      <BuyerDiagnosis
        id="diagnostico"
        eyebrow={guided.eyebrow}
        title={guided.title}
        description={guided.description}
      />
      <Opportunities />
      <BuyerJourney />
      <WhyUs />
      <AboutTeaser />
      <GuidesTeaser />
      <HomeFaq />
      <FinalCta />
    </>
  );
}
