export interface Product {
  id: string;
  name: string;
  category: "T-Shirts" | "Pulls" | "Autres";
  price: number;
  image: string;
  description: string;
  sizes?: string[];
  inStock: boolean;
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "ts-01",
    name: "T-Shirt Dystopsy Glitch",
    category: "T-Shirts",
    price: 25.00,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHRzaGlydCUyMGN5YmVycHVua3xlbnwxfHx8fDE3Nzg3NTAwMDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "T-shirt noir coupe oversize avec logo Dystopsy Element déformé effet glitch sur le devant. Coton bio 100%, impression sérigraphie.",
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
  },
  {
    id: "pl-01",
    name: "Hoodie Neon Core",
    category: "Pulls",
    price: 55.00,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGhvb2RpZXxlbnwxfHx8fDE3Nzg3NTAwMTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Sweat à capuche épais avec bandes néon réactives aux UV sur les manches. Parfait pour les nuits en entrepôt.",
    sizes: ["M", "L", "XL"],
    inStock: true,
  },
  {
    id: "au-01",
    name: "Masque Anti-Smog",
    category: "Autres",
    price: 15.00,
    image: "https://images.unsplash.com/photo-1586942548236-4740e5318536?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMG1hc2slMjBjeWJlcnB1bmt8ZW58MXx8fDE3Nzg3NTAwMjB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Masque en tissu lavable, design cyberpunk avec logo minimaliste brodé. Protégez-vous des miasmes urbains.",
    sizes: ["Taille Unique"],
    inStock: true,
  },
  {
    id: "ts-02",
    name: "Longsleeve Cyber-Grid",
    category: "T-Shirts",
    price: 35.00,
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGxvbmdzbGVldmV8ZW58MXx8fDE3Nzg3NTAwMzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "T-shirt manches longues avec grille vectorielle magenta sur le dos et coordonnées du QG Dystopsy Element sur la manche droite.",
    sizes: ["S", "M", "L"],
    inStock: false,
  }
];
