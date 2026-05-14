import { useState, useEffect } from "react";
import { Link } from "react-router";
import { motion, useScroll, useSpring } from "motion/react";
import { ShoppingCart, Tag } from "lucide-react";
import { MOCK_PRODUCTS } from "../data/products";
import { CyberSeparator } from "../components/CyberSeparator";

const CATEGORIES = ["Tous", "T-Shirts", "Pulls", "Autres"];

export function Shop() {
  const [activeCategory, setActiveCategory] = useState<string>("Tous");

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const displayedProducts = activeCategory === "Tous" 
    ? MOCK_PRODUCTS 
    : MOCK_PRODUCTS.filter(product => product.category === activeCategory);

  return (
    <div className="relative bg-[#020202] text-white min-h-screen overflow-x-hidden pt-24 pb-12">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#75feed] to-[#fc029b] transform origin-left z-[100] pointer-events-none"
        style={{ scaleX }}
      />

      <section className="relative w-full py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-orbitron font-black text-transparent bg-clip-text bg-gradient-to-r from-[#75feed] to-[#fc029b] uppercase tracking-widest text-[clamp(2.5rem,6vw,4.5rem)] mb-4"
          >
            Black_Market_
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-rajdhani text-xl text-gray-400 max-w-2xl mx-auto box-glow-cyan-text"
          >
            Équipez-vous. Le merch officiel Dystopsy Element.
          </motion.p>
        </div>

        {/* Filters */}
        <div className="flex justify-center mb-16 overflow-x-auto pb-4">
          <div
            className="inline-flex p-1 border border-gray-800 bg-[#050505]/80 backdrop-blur-md relative whitespace-nowrap"
            style={{
              clipPath: "polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)",
            }}
          >
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative px-6 py-3 font-orbitron font-bold uppercase tracking-wider transition-all duration-300 z-10 text-sm sm:text-base ${
                  activeCategory === category
                    ? "text-white"
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                {category}
                {activeCategory === category && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 border border-[#75feed] bg-[#75feed]/10 z-[-1]"
                    style={{
                      clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <motion.div 
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {displayedProducts.map((product, idx) => (
            <Link
              key={product.id}
              to={`/shop/${product.id}`}
              className="group flex flex-col relative w-full h-full focus:outline-none bg-[#050505] border border-gray-800 hover:border-[#75feed] transition-all duration-300"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="w-full h-full flex flex-col"
              >
                <div className="relative aspect-square w-full shrink-0 overflow-hidden border-b border-gray-800">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#75feed]/20 to-transparent translate-y-[-100%] group-hover:animate-[scan_2s_ease-in-out_infinite] z-20 pointer-events-none" />
                  <img
                    src={product.image}
                    alt={product.name}
                    className="relative z-10 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  />
                  {!product.inStock && (
                    <div className="absolute inset-0 z-30 bg-[#020202]/70 backdrop-blur-[2px] flex items-center justify-center">
                      <span className="font-orbitron font-bold text-xl uppercase text-red-500 tracking-widest border border-red-500/50 px-4 py-2 bg-red-500/10">
                        Out of Stock
                      </span>
                    </div>
                  )}
                  <div className="absolute top-0 left-0 z-30 bg-[#050505]/90 backdrop-blur-sm px-3 py-1 border-b border-r border-gray-800">
                    <span className="font-orbitron text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-[#75feed] transition-colors">
                      {product.category}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex flex-col items-center justify-center flex-grow w-full text-center relative z-10">
                  <h3 className="font-orbitron text-lg font-black text-white group-hover:text-[#75feed] transition-colors uppercase tracking-tight mb-2 line-clamp-1 w-full">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between w-full mt-2">
                    <p className="font-rajdhani text-[#75feed] text-xl font-bold box-glow-cyan-text">
                      {product.price.toFixed(2)} €
                    </p>
                    <button 
                      onClick={(e) => e.preventDefault()}
                      className="snipcart-add-item shrink-0 w-11 h-11 rounded-full border border-gray-800 flex items-center justify-center text-gray-500 group-hover:border-[#fc029b] group-hover:text-[#fc029b] group-hover:bg-[#fc029b]/10 transition-all duration-300 hover:scale-110 active:scale-95"
                      data-item-id={product.id}
                      data-item-price={product.price}
                      data-item-url={`/shop/${product.id}`}
                      data-item-description={product.description}
                      data-item-image={product.image}
                      data-item-name={product.name}
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#75feed] z-20 transition-all duration-300 group-hover:w-6 group-hover:h-6 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#fc029b] z-20 transition-all duration-300 group-hover:w-6 group-hover:h-6 pointer-events-none" />
                <div className="absolute inset-0 bg-[#75feed]/0 group-hover:bg-[#75feed]/5 transition-colors duration-300 pointer-events-none" />
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {displayedProducts.length === 0 && (
          <div className="text-center py-20">
            <ShoppingCart className="w-12 h-12 text-gray-700 mx-auto mb-4" />
            <p className="font-orbitron text-xl text-gray-500 uppercase tracking-widest">
              Stock épuisé dans ce secteur.
            </p>
          </div>
        )}
      </section>
      
      <CyberSeparator variant={1} color="magenta" direction="right" />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan { 0% { transform: translateY(-100%); } 50% { transform: translateY(100%); } 100% { transform: translateY(-100%); } }
      `}} />
    </div>
  );
}
