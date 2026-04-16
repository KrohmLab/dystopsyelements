import { motion } from "motion/react";
import { ShoppingCart } from "lucide-react";
import { FloatingPattern } from "./FloatingPattern";

const PRODUCTS = [
  {
    id: 1,
    name: "T-Shirt 'Neon Grid'",
    price: "25.00 €",
    image: "https://images.unsplash.com/photo-1634032188532-f11af97817ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGhvb2RpZSUyMHN0cmVldHdlYXIlMjBtb2NrdXB8ZW58MXx8fHwxNzc2MTY2OTUwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Vêtements"
  },
  {
    id: 2,
    name: "Hoodie 'Glitch Society'",
    price: "45.00 €",
    image: "https://images.unsplash.com/photo-1605727328079-f3115619d3a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBuZW9uJTIwY2l0eSUyMGFic3RyYWN0fGVufDF8fHx8MTc3NjE2Njk1MHww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Vêtements"
  },
  {
    id: 3,
    name: "Affiche Holographique 2026",
    price: "15.00 €",
    image: "https://images.unsplash.com/photo-1755564362883-6328cc8a5e15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwc3l0cmFuY2UlMjBwc3ljaGVkZWxpYyUyMGRlY29yYXRpb258ZW58MXx8fHwxNzc2MTY2OTUwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Art"
  }
];

export function MerchSection() {
  return (
    <section className="py-24 bg-[#020202] relative overflow-hidden">
      
      {/* Floating Animated Patterns */}
      <FloatingPattern variant={1} color="pink" className="w-[300px] h-[300px] left-10 top-[20%] opacity-10" delay={0.5} />
      <FloatingPattern variant={2} color="cyan" className="w-[350px] h-[350px] right-10 bottom-[10%] opacity-15" delay={2.5} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-800 pb-6">
          <div>
            <span className="font-orbitron text-[#fc029b] text-sm font-bold tracking-[0.2em] uppercase mb-2 block">
              Supportez l'Asso
            </span>
            <h2 className="font-orbitron text-4xl md:text-5xl font-black text-white uppercase tracking-wider">
              Boutique Officielle
            </h2>
          </div>
          
          {/* NOUVEAU BOUTON : Style synchronisé avec NexenSection mais en version Cyan */}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 md:mt-0 relative group px-8 py-4 bg-[#050505]/60 backdrop-blur-md border border-[#75feed] overflow-hidden"
          >
            {/* Animated Cyber Borders (Lignes laser en haut et en bas) */}
            <span className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#75feed] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
            <span className="absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-l from-transparent via-[#75feed] to-transparent translate-x-full group-hover:-translate-x-full transition-transform duration-1000 ease-in-out" />
            
            {/* Fill Scanner (Le fond qui monte) */}
            <span className="absolute inset-0 bg-[#75feed]/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />

            <div className="relative z-10 flex items-center space-x-3 text-white font-orbitron font-bold tracking-[0.2em] uppercase text-sm">
              <span className="group-hover:text-glow-cyan transition-all">Voir tout le shop</span>
              {/* L'icône se décale légèrement au survol */}
              <ShoppingCart className="w-5 h-5 text-[#75feed] group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.button>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {PRODUCTS.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group cursor-pointer flex flex-col h-full"
            >
              <div className="relative mb-6 w-full shrink-0 aspect-[4/5]">
                
                {/* Cyberpunk Angular Frame */}
                <div 
                  className="absolute -inset-3 border-2 border-[#75feed]/20 bg-transparent group-hover:border-[#75feed]/50 transition-colors duration-500" 
                  style={{ clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)' }} 
                />
                
                {/* Second Frame */}
                <div 
                  className="absolute -inset-1.5 border border-[#fc029b]/10 bg-transparent group-hover:border-[#fc029b]/40 transition-colors duration-500 delay-75" 
                  style={{ clipPath: 'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)' }} 
                />
                
                {/* Corner accents */}
                <div className="absolute -top-3 -left-3 w-3 h-3 border-t-2 border-l-2 border-[#75feed] group-hover:w-6 group-hover:h-6 transition-all duration-500" />
                <div className="absolute -bottom-3 -right-3 w-3 h-3 border-b-2 border-r-2 border-[#fc029b] group-hover:w-6 group-hover:h-6 transition-all duration-500" />
                
                {/* Image Container with ClipPath and Hover Effects */}
                <div 
                  className="relative z-10 w-full h-full overflow-hidden bg-[#080808] border border-gray-900 group-hover:border-gray-800 transition-colors" 
                  style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
                >
                  
                  {/* Effet de scan vertical */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#fc029b]/10 to-transparent translate-y-[-100%] group-hover:animate-[scan_2.5s_ease-in-out_infinite] z-20 pointer-events-none" />
                  
                  {/* RGB Glitch Layers */}
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-40 mix-blend-screen -translate-x-1 translate-y-0.5 filter hue-rotate-90 group-hover:animate-[glitch-anim-1_0.2s_infinite] transition-all duration-300 z-10"
                  />
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-40 mix-blend-screen translate-x-1 -translate-y-0.5 filter hue-rotate-[270deg] group-hover:animate-[glitch-anim-2_0.3s_infinite] transition-all duration-300 z-10"
                  />
                  
                  {/* Main Image */}
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="relative z-0 w-full h-full object-cover grayscale opacity-70 mix-blend-lighten group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />

                  {/* Étiquette de catégorie */}
                  <div className="absolute top-0 left-0 z-30 bg-[#050505] px-3 py-1 border-b border-r border-gray-800 group-hover:border-[#75feed]/50 transition-colors" style={{ clipPath: 'polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%)' }}>
                    <span className="font-rajdhani text-[10px] md:text-xs text-gray-400 uppercase tracking-widest group-hover:text-[#75feed] transition-colors">
                      {product.category}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-start mt-auto px-1">
                <div>
                  <h3 className="font-orbitron text-lg text-white font-bold mb-1 group-hover:text-[#fc029b] transition-colors uppercase tracking-tight">
                    {product.name}
                  </h3>
                  <p className="font-rajdhani text-[#75feed] text-2xl font-bold box-glow-cyan-text">
                    {product.price}
                  </p>
                </div>
                <button className="w-11 h-11 rounded-full border border-gray-800 flex items-center justify-center text-gray-500 group-hover:border-[#fc029b] group-hover:text-[#fc029b] group-hover:bg-[#fc029b]/10 transition-all duration-300 hover:scale-110 active:scale-95 mt-1">
                  <ShoppingCart className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0% { transform: translateY(-100%); }
          50% { transform: translateY(100%); }
          100% { transform: translateY(-100%); }
        }
        @keyframes slide-right {
          0% { left: -100%; }
          100% { left: 200%; }
        }
        @keyframes glitch-anim-1 {
          0% { clip-path: inset(20% 0 80% 0); transform: translate(-2px, 1px); }
          20% { clip-path: inset(60% 0 10% 0); transform: translate(2px, -1px); }
          40% { clip-path: inset(40% 0 50% 0); transform: translate(-2px, 2px); }
          60% { clip-path: inset(80% 0 5% 0); transform: translate(2px, -2px); }
          80% { clip-path: inset(10% 0 70% 0); transform: translate(-1px, 1px); }
          100% { clip-path: inset(30% 0 50% 0); transform: translate(1px, -1px); }
        }
        @keyframes glitch-anim-2 {
          0% { clip-path: inset(10% 0 60% 0); transform: translate(2px, -1px); }
          20% { clip-path: inset(80% 0 5% 0); transform: translate(-2px, 1px); }
          40% { clip-path: inset(30% 0 40% 0); transform: translate(2px, -2px); }
          60% { clip-path: inset(50% 0 30% 0); transform: translate(-2px, 2px); }
          80% { clip-path: inset(5% 0 80% 0); transform: translate(1px, -1px); }
          100% { clip-path: inset(70% 0 10% 0); transform: translate(-1px, 1px); }
        }
      `}} />
    </section>
  );
}