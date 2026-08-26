import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Home } from "@/pages/Home";

/**
 * A Home carrega junto (primeira tela). As demais paginas entram por code-splitting
 *, cada rota vira um chunk separado, aliviando o bundle inicial.
 */
const Properties = lazy(() => import("@/pages/Properties").then((m) => ({ default: m.Properties })));
const PropertyDetails = lazy(() =>
  import("@/pages/PropertyDetails").then((m) => ({ default: m.PropertyDetails }))
);
const About = lazy(() => import("@/pages/About").then((m) => ({ default: m.About })));
const Guides = lazy(() => import("@/pages/Guides").then((m) => ({ default: m.Guides })));
const GuideDetails = lazy(() =>
  import("@/pages/GuideDetails").then((m) => ({ default: m.GuideDetails }))
);
const Contact = lazy(() => import("@/pages/Contact").then((m) => ({ default: m.Contact })));
const Neighborhood = lazy(() =>
  import("@/pages/Neighborhood").then((m) => ({ default: m.Neighborhood }))
);
const Privacy = lazy(() => import("@/pages/Privacy").then((m) => ({ default: m.Privacy })));
const NotFound = lazy(() => import("@/pages/NotFound").then((m) => ({ default: m.NotFound })));

function RouteFallback() {
  return <div className="min-h-[60vh]" aria-hidden />;
}

export function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="imoveis" element={<Properties />} />
            <Route path="imoveis/:slug" element={<PropertyDetails />} />
            <Route path="sobre" element={<About />} />
            <Route path="guias" element={<Guides />} />
            <Route path="guias/:slug" element={<GuideDetails />} />
            <Route path="contato" element={<Contact />} />
            <Route path="privacidade" element={<Privacy />} />
            {/* Landing pages de bairro (SEO local): /apartamentos-<bairro> */}
            <Route path=":neighborhoodSlug" element={<Neighborhood />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
