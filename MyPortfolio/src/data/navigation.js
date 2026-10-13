// data/navigation.js

import {
  ContactRound,
  CodeXml,
  LayersPlus,
  Newspaper,
  GraduationCap
} from "lucide-react";

export const navigationHomeItems = [
  {
    name: "Sobre Mi",
    href: "#aboutSection",
    icon: ContactRound,
  },
  {
    name: "Soluciones",
    href: "#mySoluctionSection",
    icon: CodeXml,
  },
  { name: "Formaciones", 
    href: "#formationSection", 
    icon: GraduationCap 
  },
  {
    name: "Novedades",
    href: "#articlesSection",
    icon: LayersPlus,
  },
  {
    name: "Contacto",
    href: "#contactSection",
    icon: Newspaper,
  },
];