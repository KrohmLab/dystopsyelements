import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { motion, useScroll, useSpring } from "motion/react";
import { ArrowLeft, ShoppingCart, Info, AlertTriangle, ShieldCheck } from "lucide-react";
import { MOCK_PRODUCTS } from "../data/products";

export function ProductDetail() {
  const { id } = useParams();
  const product = MOCK_PRODUCTS.find((p) => p.id === id);
  const [selectedSize, setSelectedSize] = useState<string>("");

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#020202] text-white flex flex-col items-center justify-center p-4">
        <h1 className="font-orbitron text-4xl text-[#fc029b] mb-4">ERROR 404</h1>
        <p className="font-rajdhani text-xl text-gray-400 mb-8">ARTICLE_NOT_FOUND</p>
        <Link
          to="/shop"
          className="border border-[#75feed] px-6 py-3 text-[#75feed] font-orbitron uppercase tracking-widest hover:bg-[#75feed]/10 transition-colors"
        >
          RETOUR AU MARCHE
        </Link>
      </div>
    );
  }

  return (
    <div className="relative bg-[#020202] text-white min-h-screen overflow-x-hidden pt-24 pb-12">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#75feed] to-[#fc029b] transform origin-left z-[100] pointer-events-none"
        style={{ scaleX }}
      />

      <Link
        to="/shop"
        className="fixed top-24 left-1/2 -translate-x-1/2 sm:left-8 sm:translate-x-0 z-40 group flex items-center space-x-2 text-gray-400 hover:text-[#75feed] transition-colors bg-[#050505]/80 backdrop-blur-md px-4 py-2 border border-gray-800 hover:border-[#75feed]/50 whitespace-nowrap"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="font-orbitron text-sm uppercase tracking-widest">
          Retour au Shop
        </span>
      </Link>

      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 lg:mt-12 flex flex-col lg:flex-row gap-12 lg:gap-20">
        
        {/* Left: Product Image */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full lg:w-1/2 flex justify-center"
        >
          <div className="relative aspect-[4/5] w-full max-w-md bg-[#050505] border border-gray-800 p-4">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#75feed] z-20 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#fc029b] z-20 pointer-events-none" />
            
            <div className="relative w-full h-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#75feed]/10 to-transparent translate-y-[-100%] animate-[scan_3s_ease-in-out_infinite] z-20 pointer-events-none" />
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover relative z-10"
              />
              {/* Scanline overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(117,254,237,0.05)_1px,transparent_1px)] bg-[size:100%_4px] z-20 pointer-events-none" />
            </div>
          </div>
        </motion.div>

        {/* Right: Product Details */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full lg:w-1/2 flex flex-col justify-center"
        >
          <div className="mb-6 flex items-center space-x-4">
            <span className="font-orbitron text-xs font-bold uppercase tracking-widest px-3 py-1 bg-[#050505] border border-gray-800 text-[#fc029b]">
              {product.category}
            </span>
            <span className={`font-rajdhani text-sm uppercase tracking-widest flex items-center gap-1 ${product.inStock ? "text-green-400" : "text-red-500"}`}>
              {product.inStock ? (
                <><ShieldCheck className="w-4 h-4" /> En Stock</>
              ) : (
                <><AlertTriangle className="w-4 h-4" /> Rupture de stock</>
              )}
            </span>
          </div>

          <h1 className="font-orbitron text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight mb-4 break-words">
            {product.name}
          </h1>

          <div className="font-orbitron text-3xl text-[#75feed] mb-8 font-bold flex items-baseline gap-2">
            {product.price.toFixed(2)} <span className="text-xl">€</span>
          </div>

          <p className="font-rajdhani text-lg text-gray-300 leading-relaxed mb-10 border-l-2 border-gray-800 pl-4 py-1">
            {product.description}
          </p>

          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-10">
              <h3 className="font-orbitron text-sm text-gray-400 uppercase tracking-widest flex items-center gap-2 mb-4">
                <Info className="w-4 h-4 text-[#75feed]" /> Choisir la taille
              </h3>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    disabled={!product.inStock}
                    className={`relative px-6 py-2 font-orbitron text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                      !product.inStock ? "opacity-50 cursor-not-allowed" : ""
                    } ${
                      selectedSize === size
                        ? "bg-[#75feed]/20 border border-[#75feed] text-white"
                        : "bg-[#050505] border border-gray-800 text-gray-400 hover:border-[#75feed]/50 hover:text-white"
                    }`}
                    style={{
                      clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)"
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Bouton Snipcart */}
          <button
            disabled={!product.inStock || (product.sizes && product.sizes.length > 0 && !selectedSize)}
            className={`w-full sm:w-auto relative group/btn block snipcart-add-item ${
              !product.inStock || (product.sizes && product.sizes.length > 0 && !selectedSize)
                ? "opacity-50 cursor-not-allowed grayscale"
                : ""
            }`}
            data-item-id={product.id}
            data-item-price={product.price}
            data-item-description={product.description}
            data-item-image={product.image}
            data-item-name={product.name}
            data-item-custom1-name={product.sizes && product.sizes.length > 0 ? "Taille" : ""}
            data-item-custom1-options={product.sizes && product.sizes.length > 0 ? product.sizes.join("|") : ""}
            data-item-custom1-value={selectedSize}
          >
            <div className="relative px-8 py-5 bg-[#050505] border border-[#fc029b] overflow-hidden flex items-center justify-center transition-colors hover:bg-[#fc029b]/10">
              <span className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#fc029b] to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-in-out" />
              <span className="absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-l from-transparent via-[#fc029b] to-transparent translate-x-full group-hover/btn:-translate-x-full transition-transform duration-1000 ease-in-out" />
              
              <div className="relative z-10 flex items-center justify-center space-x-3 text-white font-orbitron font-bold tracking-[0.2em] uppercase text-lg">
                <ShoppingCart className="w-5 h-5 text-[#fc029b] group-hover/btn:animate-pulse" />
                <span className="group-hover/btn:text-glow-pink transition-all">
                  Ajouter au panier
                </span>
              </div>
            </div>
          </button>
          
          {/* Helper text for size selection */}
          {product.sizes && product.sizes.length > 0 && !selectedSize && product.inStock && (
            <p className="mt-3 font-rajdhani text-sm text-[#75feed] animate-pulse">
              [ Veuillez sélectionner une taille pour commander ]
            </p>
          )}

        </motion.div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan { 0% { transform: translateY(-100%); } 50% { transform: translateY(100%); } 100% { transform: translateY(-100%); } }
      `}} />
    </div>
  );
}
