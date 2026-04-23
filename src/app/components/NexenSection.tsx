import { useRef, MouseEvent } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "motion/react";
import { Link } from "react-router";
import { ArrowRight, Music, Globe, Info, Ticket } from "lucide-react";

import logoNexen from "../../imports/Logo-NEXEN.png";
import fondVierge from "../../imports/NXN26---Fond-Vierge-(Carré).jpg";
import ecaillesFull from "../../imports/Ecailles_FULL.jpg";
import patternDivider from "../../imports/Pattern_01-solo.png";

export function NexenSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const bgX = useTransform(smoothX, [-0.5, 0.5], ["-2%", "2%"]);
  const bgY = useTransform(smoothY, [-0.5, 0.5], ["-2%", "2%"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full overflow-hidden flex flex-col items-center justify-center border-y border-[#fc029b]/30 bg-[#020202] pt-0 pb-10 md:pb-14"
    >
      {/* Background Layers */}
      <motion.div 
        className="absolute inset-0 z-0 w-[105%] h-[105%] -left-[2.5%] -top-[2.5%]"
        style={{ x: bgX, y: bgY }}
      >
        <div className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-screen" style={{ backgroundImage: `url("${fondVierge}")` }} />
        <div className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay" style={{ backgroundImage: `url("${ecaillesFull}")` }} />
      </motion.div>

      {/* Overlays */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[linear-gradient(rgba(252,2,155,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(252,2,155,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      {/* Container principal */}
      <div className="relative z-10 flex flex-col items-center px-4 w-full max-w-5xl">
        
        {/* 1. Logo - Marge négative haute et basse pour coller aux éléments */}
        <motion.div
          whileHover={{ scale: 1.02, filter: "drop-shadow(0 0 25px rgba(117, 254, 237, 0.4))" }}
          className="relative group cursor-pointer -mt-6 md:-mt-10 -mb-4 md:-mb-6"
        >
          <img 
            src={logoNexen} 
            alt="Nexen" 
            className="w-full max-w-[320px] md:max-w-[500px] lg:max-w-[550px] h-auto drop-shadow-[0_0_15px_rgba(117,254,237,0.2)]"
          />
        </motion.div>

        {/* 2. Boutons secondaires - On force la marge haute à zéro */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 w-full max-w-3xl mt-0">
          {[
            { label: "Programmation", to: "/programmation", icon: Music },
            { label: "L'univers", to: "/univers", icon: Globe },
            { label: "Infos Pratiques", to: "/infos", icon: Info },
          ].map((btn) => (
            <Link key={btn.label} to={btn.to} className="group/nav relative block w-full">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative h-12 md:h-14 bg-[#050505]/40 backdrop-blur-md border border-[#75feed]/20 overflow-hidden flex items-center justify-center transition-all duration-300"
              >
                <span className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#75feed] to-transparent -translate-x-full group-hover/nav:translate-x-full transition-transform duration-1000" />
                <span className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-l from-transparent via-[#75feed] to-transparent translate-x-full group-hover/nav:-translate-x-full transition-transform duration-1000" />
                <span className="absolute inset-0 bg-[#75feed]/5 translate-y-full group-hover/nav:translate-y-0 transition-transform duration-300" />
                <div className="relative z-10 flex items-center space-x-3">
                  <btn.icon className="w-3.5 h-3.5 text-[#75feed]" />
                  <span className="font-orbitron text-[10px] font-bold tracking-[0.2em] uppercase text-gray-300 group-hover/nav:text-white">
                    {btn.label}
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* 3. Divider */}
        <img 
          src={patternDivider} 
          alt="divider" 
          className="w-full max-w-[550px] md:max-w-[750px] h-auto opacity-40 select-none pointer-events-none scale-x-[-1] mt-4 md:mt-6" 
        />

        {/* 4. Billetterie */}
        <div className="w-full flex justify-center mt-4 md:mt-6">
          <Link 
            to="/events" 
            className="relative inline-flex items-center justify-center px-14 py-5 md:px-20 md:py-6 font-orbitron text-base md:text-lg font-bold uppercase tracking-[0.3em] text-white group overflow-hidden"
            style={{ clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)' }}
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#75feed] via-[#fc029b] to-[#75feed] bg-[size:200%_auto] group-hover:bg-right transition-all duration-700 ease-in-out" />
            <span className="absolute inset-[3px] bg-[#020202]" style={{ clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)' }} />
            
            <div className="relative z-10 flex items-center space-x-4 group-hover:scale-105 transition-transform duration-300">
              <Ticket className="w-6 h-6 text-[#fc029b]" />
              <span className="group-hover:text-glow-cyan transition-all">Billetterie</span>
              <ArrowRight className="w-5 h-5 text-[#75feed] group-hover:translate-x-2 transition-transform" />
            </div>

            <span className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform skew-x-[-20deg] group-hover:animate-[slide-right_1.5s_ease-in-out_infinite]" />
          </Link>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slide-right {
          0% { left: -100%; }
          100% { left: 200%; }
        }
      `}} />
    </section>
  );
}