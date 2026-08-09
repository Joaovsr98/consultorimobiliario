import type { AgencyTenant } from "../types";
import { company } from "./company";
import { offices } from "./offices";
import { team } from "./team";
import { regions } from "./regions";
import { theme, themeConfirmed } from "./theme";
import { seo } from "./seo";
import { mainNav, footerNav } from "./navigation";
import { properties } from "./properties";

export const ajudaImoveisTenant: AgencyTenant = {
  kind: "agency",
  company,
  offices,
  team,
  regions,
  theme,
  themeConfirmed,
  seo,
  navigation: { main: mainNav, footer: footerNav },
  properties,
};
