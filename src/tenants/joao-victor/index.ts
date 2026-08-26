import type { IndividualTenant } from "../types";
import { broker } from "./broker";
import { theme } from "./theme";
import { seo } from "./seo";
import { mainNav, footerNav } from "./navigation";
import { properties } from "./properties";
import { hero } from "./hero";
import { home } from "./home";

export const joaoVictorTenant: IndividualTenant = {
  kind: "individual",
  broker,
  theme,
  seo,
  navigation: { main: mainNav, footer: footerNav },
  properties,
  hero,
  home,
};
