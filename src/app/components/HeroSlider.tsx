import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CyberFrame } from "./CyberFrame";
import { ChevronRight, ChevronLeft, Calendar } from "lucide-react";

const SLIDES = [
  {
    id: 1,
    title: "NEON TRANCE FESTIVAL",
    subtitle: "Édition 2026",
    date: "15 - 18 Août 2026",
    location: "Forêt de Brocéliande",
    image: "https://images.unsplash.com/photo-1763854492868-a0679273ccfe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm8lMjBmZXN0aXZhbCUyMGxhc2VyJTIwc3RhZ2V8ZW58MXx8fHwxNzc2MTY2OTUwfDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 2,
    title: "CYBER CITY RAVE",
    subtitle: "Underground Party",
    date: "31 Octobre 2026",
    location: "Sector 7 Warehouse",
    image: "https://images.unsplash.com/photo-1605727328079-f3115619d3a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBuZW9uJTIwY2l0eSUyMGFic3RyYWN0fGVufDF8fHx8MTc3NjE2Njk1MHww&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 3,
    title: "SYNTHETIC DIMENSIONS",
    subtitle: "Art & Techno",
    date: "12 Décembre 2026",
    location: "Le Trabendo, Paris",
    image: "https://images.unsplash.com/photo-1755564362883-6328cc8a5e15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwc3l0cmFuY2UlMjBwc3ljaGVkZWxpYyUyMGRlY29yYXRpb258ZW58MXx8fHwxNzc2MTY2OTUwfDA&ixlib=rb-4.1.0&q=80&w=1080"
  }
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = right, -1 = left

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  return (
    <section className="relative w-full h-screen bg-[#050505] overflow-hidden flex items-center justify-center">
      <CyberFrame />
      
      {/* Slider Content */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          initial={{ opacity: 0, scale: 1.1, filter: "blur(4px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={SLIDES[currentSlide].image} 
            alt={SLIDES[currentSlide].title} 
            className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-[#020202]/50" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-20 w-full max-w-7xl mx-auto px-8 md:px-16 flex flex-col items-start pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#fc029b]/10 border border-[#fc029b]/50 rounded-sm mb-4">
              <span className="w-2 h-2 rounded-full bg-[#fc029b] animate-pulse" />
              <span className="text-[#fc029b] font-orbitron text-xs font-bold uppercase tracking-widest">{SLIDES[currentSlide].subtitle}</span>
            </div>
            <h1 
              className="font-orbitron text-5xl md:text-7xl font-black text-white mb-6 leading-tight glitch-effect tracking-tighter uppercase"
              data-text={SLIDES[currentSlide].title}
            >
              {SLIDES[currentSlide].title}
            </h1>
            
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-8 mb-10">
              <div className="flex items-center space-x-3">
                <div className="p-2 border border-[#75feed]/30 rounded-sm bg-[#75feed]/10">
                  <Calendar className="w-5 h-5 text-[#75feed]" />
                </div>
                <span className="font-rajdhani text-xl text-gray-300 font-medium tracking-wide">
                  {SLIDES[currentSlide].date}
                </span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <span className="font-orbitron text-[#75feed] text-lg">&gt;</span>
                <span className="font-rajdhani text-xl font-medium tracking-wide uppercase">
                  {SLIDES[currentSlide].location}
                </span>
              </div>
            </div>

            <button className="relative group px-8 py-4 bg-transparent overflow-hidden">
              <>
                <div className="absolute inset-0 bg-[#75feed] opacity-10 group-hover:opacity-20 transition-opacity duration-300" />
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-75 pointer-events-none mix-blend-screen"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(117, 254, 237, 0.4) 2px, rgba(117, 254, 237, 0.4) 4px)'
                  }}
                />
              </>
              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#75feed]" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#75feed]" />
              <span className="relative font-orbitron font-bold text-white tracking-widest uppercase flex items-center space-x-3 text-glow-cyan">
                <span>Billetterie</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="absolute bottom-10 right-10 z-20 flex space-x-4">
        <button 
          onClick={handlePrev}
          className="p-3 border border-gray-700 bg-[#050505]/50 hover:border-[#75feed] hover:text-[#75feed] text-gray-400 transition-all backdrop-blur-md"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={handleNext}
          className="p-3 border border-gray-700 bg-[#050505]/50 hover:border-[#75feed] hover:text-[#75feed] text-gray-400 transition-all backdrop-blur-md"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Glitch Overlay Effect */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-10 mix-blend-overlay">
        <div className="w-full h-full bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#fff_2px,#fff_4px)] opacity-20" />
      </div>
    </section>
  );
}