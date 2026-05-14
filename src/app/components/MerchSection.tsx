import { useState, useRef } from "react";
import { motion } from "motion/react";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FloatingPattern } from "./FloatingPattern";
import { MOCK_PRODUCTS } from "../data/products";

export function MerchSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    beforeChange: (current: number, next: number) => setCurrentSlide(next),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "12%",
        }
      }
    ]
  };
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
          
          {/* New Cyberpunk styled button */}
          <Link to="/shop">
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
          </Link>

        </div>

        <div className="relative mx-auto px-4 sm:px-6 md:px-12">
          <Slider ref={sliderRef} {...settings} className="merch-slider">
            {MOCK_PRODUCTS.map((product, index) => (
              <div key={product.id} className="px-3 md:px-5 h-full py-4">
                <Link to={`/shop/${product.id}`} className="block h-full">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="group cursor-pointer flex flex-col h-full"
                  >
                  <div className="relative mb-6 w-full shrink-0 aspect-square">
                
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
              
              <div className="flex justify-between items-start mt-auto px-1 h-[60px]">
                <div className="flex-1 pr-4">
                  <h3 className="font-orbitron text-lg text-white font-bold mb-1 group-hover:text-[#fc029b] transition-colors uppercase tracking-tight line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="font-rajdhani text-[#75feed] text-2xl font-bold box-glow-cyan-text">
                    {product.price.toFixed(2)} €
                  </p>
                </div>
                <button 
                  onClick={(e) => e.preventDefault()}
                  className="snipcart-add-item shrink-0 w-11 h-11 rounded-full border border-gray-800 flex items-center justify-center text-gray-500 group-hover:border-[#fc029b] group-hover:text-[#fc029b] group-hover:bg-[#fc029b]/10 transition-all duration-300 hover:scale-110 active:scale-95 mt-1"
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
            </motion.div>
            </Link>
            </div>
          ))}
        </Slider>

        {/* NAVIGATION HUD */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 mt-12 relative z-30 pointer-events-auto">
          <button 
            onClick={() => sliderRef.current?.slickPrev()}
            className="p-3 border border-[#75feed]/30 text-[#75feed] hover:bg-[#75feed] hover:text-black transition-all rounded-full bg-[#050505]/60 backdrop-blur-md"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 -ml-0.5" />
          </button>
          
          <div className="flex items-center gap-2 sm:gap-3">
            {MOCK_PRODUCTS.map((_, index) => (
              <button 
                key={index}
                onClick={() => sliderRef.current?.slickGoTo(index)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  index === currentSlide ? 'w-8 sm:w-12 bg-[#75feed] shadow-[0_0_10px_#75feed]' : 'w-3 sm:w-4 bg-gray-600/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button 
            onClick={() => sliderRef.current?.slickNext()}
            className="p-3 border border-[#75feed]/30 text-[#75feed] hover:bg-[#75feed] hover:text-black transition-all rounded-full bg-[#050505]/60 backdrop-blur-md"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 -mr-0.5" />
          </button>
        </div>
      </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        /* Slick Slider overrides to enforce identical height and correct padding */
        .merch-slider .slick-track {
          display: flex;
        }
        .merch-slider .slick-slide {
          height: auto;
        }
        .merch-slider .slick-slide > div {
          height: 100%;
        }
        
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