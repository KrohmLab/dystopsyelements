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
          <button className="mt-6 md:mt-0 flex items-center space-x-2 px-6 py-3 border border-[#75feed] text-[#75feed] font-orbitron text-sm font-bold uppercase tracking-widest hover:bg-[#75feed] hover:text-black transition-all box-glow-cyan">
            <span>Voir tout le shop</span>
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[#111] mb-4 border border-gray-900 group-hover:border-[#fc029b]/50 transition-colors">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 mix-blend-lighten"
                />
                {/* Cyber Scanner effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#fc029b]/20 to-transparent translate-y-[-100%] group-hover:animate-[scan_2s_ease-in-out_infinite]" />
                
                <div className="absolute top-3 left-3 bg-[#050505] px-2 py-1 border border-gray-700">
                  <span className="font-rajdhani text-xs text-gray-400 uppercase tracking-widest">{product.category}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-orbitron text-lg text-white font-bold mb-1 group-hover:text-[#fc029b] transition-colors uppercase">
                    {product.name}
                  </h3>
                  <p className="font-rajdhani text-[#75feed] text-xl font-medium">
                    {product.price}
                  </p>
                </div>
                <button className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 group-hover:border-[#fc029b] group-hover:text-[#fc029b] group-hover:bg-[#fc029b]/10 transition-all">
                  <ShoppingCart className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Required scan animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0% { transform: translateY(-100%); }
          50% { transform: translateY(100%); }
          100% { transform: translateY(-100%); }
        }
      `}} />
    </section>
  );
}