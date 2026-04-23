import { Link } from "react-router";
import { Menu, X, Terminal } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import PlanDeTravail from "../../imports/PlanDeTravail21-65-11";

const NavLink = ({ to, children, dataText }: { to: string, children: React.ReactNode, dataText: string }) => (
  <Link 
    to={to} 
    className="group relative px-4 py-2 font-rajdhani font-bold uppercase tracking-[0.2em] text-sm overflow-hidden flex items-center"
  >
    <span className="absolute left-0 opacity-0 -translate-x-4 text-[#75feed] transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 font-orbitron">[</span>
    <span className="relative z-10 text-gray-300 transition-colors duration-300 group-hover:text-white group-hover:text-glow-cyan" data-text={dataText}>
      {children}
    </span>
    <span className="absolute right-0 opacity-0 translate-x-4 text-[#75feed] transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 font-orbitron">]</span>
    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#75feed] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 shadow-[0_0_8px_#75feed]" />
  </Link>
);

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      if (scrolled !== isScrolled) {
        setIsScrolled(scrolled);
        if (scrolled) {
          setIsGlitching(true);
          setTimeout(() => setIsGlitching(false), 500);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled]);

  const mobileLinks = [
    { name: 'Accueil', to: '/' },
    { name: 'Nexen Festival 2026', to: '/' },
    { name: 'Agenda', to: '/events' },
    { name: 'Prestations', to: '/' },
    { name: 'Shop', to: '/' },
    { name: 'Contact', to: '/' }
  ];

  return (
    <nav className="fixed top-0 w-full z-50 pt-4 pb-3 md:py-3">
      
      {/* CALQUE 1 : LE FOND SOMBRE ET LE FLOU (z-[-2]) */}
      <div 
  className={`absolute inset-0 z-[-2] transition-all duration-500 ${
    // Si le menu mobile est ouvert, on met un fond noir opaque
    isOpen 
      ? "bg-[#020202] opacity-100 backdrop-blur-none" 
      : isScrolled 
        ? "bg-[#020202]/40 backdrop-blur-xl border-b border-[#75feed]/30 shadow-[0_4px_30px_rgba(117,254,237,0.1)]" 
        : "bg-transparent border-b border-transparent shadow-none"
  }`}
/>

      {/* CALQUE 2 : LA GRILLE CYBERPUNK (z-[-1], au dessus du flou mais sous le texte) */}
      <div 
        className={`absolute inset-0 z-[-1] pointer-events-none bg-[linear-gradient(rgba(117,254,237,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(117,254,237,0.05)_1px,transparent_1px)] bg-[size:20px_20px] transition-opacity duration-500 ${
          isScrolled ? "opacity-100" : "opacity-0"
        }`} 
      />

      <AnimatePresence>
        {isGlitching && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#75feed] mix-blend-overlay z-[0] pointer-events-none glitch-anim"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 10%, 0 10%)' }}
          />
        )}
      </AnimatePresence>

      {/* CONTENU DU MENU - MODIFICATION ICI : px-10 md:px-16 lg:px-20 */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 lg:px-20">
        <div className="flex justify-between items-center h-14">
          
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="group relative w-12 h-12 flex items-center justify-center transition-all duration-300">
              <div 
                className={`absolute inset-0 pointer-events-none z-10 mix-blend-screen transition-opacity duration-100 ${isGlitching ? 'opacity-100 animate-[glitch-anim_0.2s_infinite]' : 'opacity-0'}`}
                style={{ '--fill-0': '#75feed' } as React.CSSProperties}
              >
                <PlanDeTravail />
              </div>

              <div 
                className={`absolute inset-0 pointer-events-none z-10 mix-blend-screen transition-opacity duration-100 ${isGlitching ? 'opacity-100 animate-[glitch-anim-2_0.3s_infinite]' : 'opacity-0'}`}
                style={{ '--fill-0': '#fc029b' } as React.CSSProperties}
              >
                <PlanDeTravail />
              </div>
              
              <div 
                className="relative z-0 w-full h-full group-hover:drop-shadow-[0_0_8px_#75feed] group-hover:animate-pulse transition-all duration-300"
                style={{ '--fill-0': 'white' } as React.CSSProperties}
              >
                <PlanDeTravail />
              </div>
            </Link>
          </div>

          <div className="hidden md:flex space-x-4 items-center">
            <NavLink to="/" dataText="Accueil">Accueil</NavLink>
            <NavLink to="/" dataText="Nexen Festival 2026">Nexen Festival 2026</NavLink>
            <NavLink to="/events" dataText="Agenda">Agenda</NavLink>
            <NavLink to="/" dataText="Prestations">Prestations</NavLink>
            <NavLink to="/" dataText="Shop">Shop</NavLink>
            <NavLink to="/" dataText="Contact">Contact</NavLink>
            
            <div className="ml-8 pl-8 border-l border-gray-800">
              <Link 
                to="/events" 
                className="relative inline-flex items-center justify-center px-6 py-2 font-orbitron text-xs font-bold uppercase tracking-widest text-white group overflow-hidden"
                style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
              >
                <span className="absolute inset-0 w-full h-full bg-[#fc029b] group-hover:bg-[#75feed] transition-colors duration-300" />
                <span className="absolute inset-[2px] bg-[#020202]" style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }} />
                <span className="relative z-10 flex items-center space-x-2 group-hover:text-[#75feed] transition-colors">
                  <Terminal className="w-4 h-4" />
                  <span>Billetterie</span>
                </span>
                <span className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-[-20deg] group-hover:animate-[slide-right_1s_ease-in-out_infinite]" />
              </Link>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-[#75feed] focus:outline-none transition-colors">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#050505]/95 backdrop-blur-xl border-b border-[#75feed]/30 overflow-hidden relative z-10"
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              {mobileLinks.map((item) => (
                <Link 
                  key={item.name}
                  to={item.to} 
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-lg font-orbitron uppercase text-gray-300 hover:text-[#75feed] hover:bg-[#75feed]/10 hover:pl-6 transition-all duration-300 border-l-2 border-transparent hover:border-[#75feed]"
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 mt-4 border-t border-gray-800">
                <Link 
                  to="/events" 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 text-lg font-orbitron uppercase text-[#fc029b] hover:bg-[#fc029b]/10 transition-all border border-[#fc029b]/30"
                >
                  <Terminal className="w-5 h-5" />
                  <span>Billetterie</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slide-right {
          0% { left: -100%; }
          100% { left: 200%; }
        }
      `}} />
    </nav>
  );
}