import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router";
import { CyberFrame } from "./CyberFrame";
import { ChevronRight, ChevronLeft, Calendar } from "lucide-react";
import { MOCK_EVENTS } from "../data/events";

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);

  // 2. FILTRE ÉVÉNEMENTS (Sécurité chargement)
  let upcomingEvents = MOCK_EVENTS.filter(event => {
    if (!event.date) return false;
    const eventDate = new Date(event.date);
    return !isNaN(eventDate.getTime()) && eventDate >= new Date();
  });

  if (!upcomingEvents || upcomingEvents.length === 0) {
    upcomingEvents = MOCK_EVENTS;
  }

  // 3. LOGIQUE SLIDER
  useEffect(() => {
    if (upcomingEvents.length <= 1) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % upcomingEvents.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [upcomingEvents.length]);

  if (!upcomingEvents || upcomingEvents.length === 0) {
    return (
      <div className="w-full h-[calc(var(--vh,1vh)*100)] bg-[#050505] flex items-center justify-center text-white font-orbitron tracking-widest uppercase">
        Initialisation du système...
      </div>
    );
  }

  const safeSlideIndex = currentSlide < upcomingEvents.length ? currentSlide : 0;
  const currentEvent = upcomingEvents[safeSlideIndex];

  const handleNext = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % upcomingEvents.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + upcomingEvents.length) % upcomingEvents.length);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  };

  return (
    <section 
      className="relative w-full h-[calc(var(--vh,1vh)*100)] min-h-[calc(var(--vh,1vh)*100)] bg-[#050505] overflow-hidden flex items-center justify-center"
    >
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={safeSlideIndex}
            custom={direction}
            initial={{ opacity: 0, scale: 1.1, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {currentEvent?.image && (
              <img 
                src={currentEvent.image} 
                alt={currentEvent.title} 
                className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/40 to-[#020202]/80" />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-10 w-full h-full max-w-[1920px] max-h-[1080px] flex items-center justify-center">
        <CyberFrame />
        
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center xl:items-start px-8 sm:px-[10%] md:px-[15%] lg:px-[18%] xl:pl-[16%] xl:pr-[8%]">
          <AnimatePresence mode="wait">
            <motion.div
              key={safeSlideIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-5xl w-full flex flex-col items-center xl:items-start"
            >
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#fc029b]/10 border border-[#fc029b]/50 rounded-sm mb-3 xl:mb-4">
                <span className="w-2 h-2 rounded-full bg-[#fc029b] animate-pulse" />
                <span className="text-[#fc029b] font-orbitron text-[10px] md:text-xs font-bold uppercase tracking-widest">
                  {currentEvent?.heroSubtitle}
                </span>
              </div>

              <h1 
                className="font-orbitron font-black text-white mb-4 xl:mb-6 leading-[1.1] xl:leading-tight glitch-effect tracking-tighter uppercase text-center xl:text-left text-[clamp(2.2rem,6vw,5.5rem)] text-balance w-full"
                data-text={currentEvent?.title}
              >
                {currentEvent?.title}
              </h1>
              
              <div className="flex flex-col sm:flex-row items-center justify-center xl:justify-start space-y-3 sm:space-y-0 sm:space-x-6 mb-8 xl:mb-10 w-full">
                <div className="flex items-center space-x-3">
                  <div className="p-1.5 xl:p-2 border border-[#75feed]/30 rounded-sm bg-[#75feed]/10">
                    <Calendar className="w-4 h-4 xl:w-5 xl:h-5 text-[#75feed]" />
                  </div>
                  <span className="font-rajdhani text-lg xl:text-xl text-gray-300 font-medium tracking-wide capitalize">
                    {currentEvent?.displayDate || formatDate(currentEvent?.date || new Date().toISOString())}
                  </span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <span className="font-orbitron text-[#75feed] text-base xl:text-lg hidden sm:inline">&gt;</span>
                  <span className="font-rajdhani text-lg xl:text-xl font-medium tracking-wide uppercase text-center">
                    {currentEvent?.location}
                  </span>
                </div>
              </div>

              <Link to={`/events/${currentEvent?.id}`}>
                <button className="relative group px-6 py-3 xl:px-8 xl:py-4 bg-transparent overflow-hidden">
                  <div className="absolute inset-0 bg-[#75feed] opacity-10 group-hover:opacity-20 transition-opacity duration-300" />
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-75 pointer-events-none mix-blend-screen"
                    style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(117, 254, 237, 0.4) 2px, rgba(117, 254, 237, 0.4) 4px)' }}
                  />
                  <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#75feed]" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#75feed]" />
                  <span className="relative font-orbitron font-bold text-sm xl:text-base text-white tracking-widest uppercase flex items-center space-x-2 xl:space-x-3 text-glow-cyan">
                    <span>Voir l'événement</span>
                    <ChevronRight className="w-4 h-4 xl:w-5 xl:h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* NAVIGATION HUD : Centrée PARTOUT sauf sur les très grands écrans (xl) */}
        <div className="absolute z-30 pointer-events-auto flex items-center justify-center gap-4 sm:gap-6 left-0 right-0 bottom-8 md:bottom-38 lg:bottom-38 xl:left-auto xl:right-[11%] xl:bottom-[16%]">
          <button 
            onClick={handlePrev}
            className="p-3 border border-[#75feed]/30 text-[#75feed] hover:bg-[#75feed] hover:text-black transition-all rounded-full bg-[#050505]/60 backdrop-blur-md"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 -ml-0.5" />
          </button>
          
          <div className="flex items-center gap-2 sm:gap-3">
            {upcomingEvents.map((_, index) => (
              <div 
                key={index}
                className={`h-1.5 rounded-full transition-all duration-500 flex items-center ${
                  index === safeSlideIndex ? 'w-8 sm:w-12 bg-[#75feed] shadow-[0_0_10px_#75feed]' : 'w-3 sm:w-4 bg-gray-600/50'
                }`}
              />
            ))}
          </div>

          <button 
            onClick={handleNext}
            className="p-3 border border-[#75feed]/30 text-[#75feed] hover:bg-[#75feed] hover:text-black transition-all rounded-full bg-[#050505]/60 backdrop-blur-md"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 -mr-0.5" />
          </button>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none z-10 opacity-10 mix-blend-overlay">
        <div className="w-full h-full bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#fff_2px,#fff_4px)] opacity-20" />
      </div>
    </section>
  );
}