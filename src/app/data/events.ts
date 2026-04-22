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
  time: string;
  location: string;
  image: string;
  shortDescription: string; // <-- LA PHRASE D'ACCROCHE
  longDescription: string;  // <-- LE TEXTE COMPLET
  ticketLink?: string;
  facebookLink?: string;
  artists: Artist[];
}

export const MOCK_EVENTS: Event[] = [
  {
    id: "nexen-festival-26",
    title: "NEXEN FESTIVAL 2026",
    heroSubtitle: "Édition Anniversaire",
    date: "2026-08-15",
    time: "22:00 - 08:00",
    location: "Confinement Zone - Secteur 4",
    image: "https://images.unsplash.com/photo-1578300253266-dedd2cd40912?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    
    // NOUVELLE RÉPARTITION DES TEXTES :
    shortDescription: "Le festival principal de Dystopsy Element. Une nuit entière de fréquences sombres, de lumières stroboscopiques et de réalités altérées.",
    longDescription: "Préparez-vous à une immersion totale dans notre univers dystopique avec des line-ups exclusifs, des installations d'art génératif et des performances cyberpunk.\n\nLa Confinement Zone du Secteur 4 a été spécialement déverrouillée pour cette édition. Le protocole de sécurité habituel est suspendu. Repoussez vos limites et rejoignez le réseau.",
    
    ticketLink: "#",
    facebookLink: "#",
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
    id: "underground-rave-v4",
    title: "UNDERGROUND RAVE v4.0",
    heroSubtitle: "Secret Location",
    date: "2026-05-10",
    time: "23:00 - 06:00",
    location: "Basement 7 - The Grid",
    image: "https://images.unsplash.com/photo-1616709062048-788acece6a51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    
    shortDescription: "Retour aux sources avec une rave illégale (autorisée) dans les profondeurs de The Grid.",
    longDescription: "Capacité ultra-limitée, BPM élevés, aucune règle si ce n'est le respect du dancefloor.\n\nL'adresse exacte vous sera transmise sur un canal crypté 24h avant l'événement. Préparez-vous pour une nuit brute, sans artifices, dédiée à l'essence même de la Hard Techno.",
    
    ticketLink: "#",
    facebookLink: "#",
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