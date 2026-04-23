export interface Artist {
  id: string;
  name: string;
  photo: string;
  type: "Live" | "DJ Set";
  style: string;
  label: string;
  soundcloudUrl: string;
  instagramUrl: string;
}

export interface Event {
  id: string;
  title: string;
  heroSubtitle: string;
  date: string; // ISO date string YYYY-MM-DD
  displayDate?: string;
  time: string;
  location: string;
  image: string;
  shortDescription: string; // <-- LA PHRASE D'ACCROCHE
  longDescription: string;  // <-- LE TEXTE COMPLET
  ticketLink?: string;
  facebookLink?: string;
  artists: Artist[];
}

import nexen2026 from "../../imports/NXN26---Banner-FB.jpg";
import nexenshome from "../../imports/NexensHome---Banner-FB.png";

export const MOCK_EVENTS: Event[] = [
  {
    id: "nexen-festival-26",
    title: "NEXEN FESTIVAL",
    heroSubtitle: "Édition 2026",
    date: "2026-06-05",
    displayDate: "Du 05 au 07 Juin 2026", // Ce que les humains vont lire !
    time: "17:00",
    location: "Maine et Loire",
    image: nexen2026,
    
    // NOUVELLE RÉPARTITION DES TEXTES :
    shortDescription: "Le festival principal de Dystopsy Element. Une nuit entière de fréquences sombres, de lumières stroboscopiques et de réalités altérées.",
    longDescription: "Préparez-vous à une immersion totale dans notre univers dystopique avec des line-ups exclusifs, des installations d'art génératif et des performances cyberpunk.\n\nLa Confinement Zone du Secteur 4 a été spécialement déverrouillée pour cette édition. Le protocole de sécurité habituel est suspendu. Repoussez vos limites et rejoignez le réseau.",
    
    ticketLink: "https://www.helloasso.com/associations/dystopsy-elements/evenements/nexen-festival-2026",
    facebookLink: "https://www.facebook.com/events/1363260745173238",
    artists: [
      {
        id: "a1",
        name: "NEO-TRINITY",
        photo: "https://images.unsplash.com/photo-1711221024071-c0c934920ff0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        type: "Live",
        style: "Industrial Techno / Cyberpunk",
        label: "Dystopsy Records",
        soundcloudUrl: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/123456789&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true",
        instagramUrl: "#"
      },
      {
        id: "a2",
        name: "GLITCH.SYS",
        photo: "https://images.unsplash.com/photo-1758200519616-56bac165cb33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        type: "DJ Set",
        style: "Dark Electro / Synthwave",
        label: "Neon Collective",
        soundcloudUrl: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/987654321&color=%2375feed&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true",
        instagramUrl: "#"
      }
    ]
  },
  {
    id: "nexens-home",
    title: "NEXEN'S HOME",
    heroSubtitle: "INDOOR PARTY",
    date: "2026-05-07",
    time: "21:00 - 01:00",
    location: "La Maison Café Nantes",
    image: nexenshome,
    
    shortDescription: "Dans les profondeurs du refuge, les systèmes s’allument un à un. Les murs vibrent, les circuits se réveillent, et le noyau du bunker s’apprête à pulser toute la nuit.",
    longDescription: "Dans un futur où la surface s’effrite, où les villes se fracturent et où la lumière se réfugie sous terre, un abri subsiste. Un refuge organique et mécanique, où les murs vibrent encore d’une énergie indomptable. Un lieu où l’on se retrouve, où l’on respire, où l’on danse.\n\nPour cette édition spéciale, le NEXEN descend sous la surface et réactive la composition originelle de son noyau : Engine et Nexus fusionnent pour créer un sas entre les deux univers, un abri commun, un point de convergence.",
    
    ticketLink: "#",
    facebookLink: "https://www.facebook.com/events/1132770079034517",
    artists: [
      {
        id: "a3",
        name: "VOID_WALKER",
        photo: "https://images.unsplash.com/photo-1558716074-f898b23f1fe0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        type: "Live",
        style: "Hard Techno / Acid",
        label: "Acid Underground",
        soundcloudUrl: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/456123789&color=%23fc029b&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true",
        instagramUrl: "#"
      }
    ]
  },
  {
    id: "system-failure-1",
    title: "SYSTEM FAILURE [01]",
    heroSubtitle: "Hard Techno Night",
    date: "2025-11-20",
    time: "22:00 - 07:00",
    location: "Abandoned Warehouse Sector B",
    image: "https://images.unsplash.com/photo-1753328603565-ea65252428df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    
    shortDescription: "Le premier événement de la série System Failure. Une expérience audiovisuelle fondatrice.",
    longDescription: "L'événement qui a marqué le début de l'ère Dystopsy Element. Les survivants s'en souviennent encore. Une warehouse abandonnée, un sound system poussé dans ses retranchements et un public en symbiose totale avec les machines.",
    
    facebookLink: "#",
    artists: [
      {
        id: "a4",
        name: "CYBER_PUNK",
        photo: "https://images.unsplash.com/photo-1711221024071-c0c934920ff0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        type: "DJ Set",
        style: "EBM / Industrial",
        label: "Dystopsy Records",
        soundcloudUrl: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/111222333&color=%2375feed&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true",
        instagramUrl: "#"
      }
    ]
  }
];