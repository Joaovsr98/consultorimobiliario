import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Home } from "@/pages/Home";
import { Properties } from "@/pages/Properties";
import { PropertyDetails } from "@/pages/PropertyDetails";
import { About } from "@/pages/About";
import { Guides } from "@/pages/Guides";
import { GuideDetails } from "@/pages/GuideDetails";
import { Contact } from "@/pages/Contact";
import { Privacy } from "@/pages/Privacy";
import { NotFound } from "@/pages/NotFound";

export function App() {
  return (
    <BrowserRouter>
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
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
