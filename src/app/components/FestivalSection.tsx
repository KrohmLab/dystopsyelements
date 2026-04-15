import { motion } from "motion/react";
import { Disc, Zap, Headphones } from "lucide-react";
import { FloatingPattern } from "./FloatingPattern";
import { ImageWithFallback } from "./figma/ImageWithFallback";

import festivalImage from "../../imports/nexen_jour.jpg";

export function FestivalSection() {
  return (
    <section className="relative py-32 bg-[#020202] overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#75feed]/5 to-transparent pointer-events-none" />
      <div className="absolute -left-32 top-1/2 w-64 h-64 bg-[#fc029b]/10 blur-[100px] rounded-full pointer-events-none" />
      
      {/* Floating Animated Patterns */}
      <FloatingPattern variant={1} color="cyan" className="w-[400px] h-[400px] -right-20 top-0 opacity-20" delay={0} />
      <FloatingPattern variant={2} color="pink" className="w-[300px] h-[300px] -left-20 bottom-10 opacity-20" delay={2} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column - Image */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative group"
          >
            {/* Cyberpunk Angular Frame */}
            <div className="absolute -inset-4 border-2 border-[#75feed]/20 bg-transparent group-hover:border-[#75feed]/60 transition-colors duration-500" style={{ clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)' }} />
            <div className="absolute -inset-2 border border-[#fc029b]/20 bg-transparent group-hover:border-[#fc029b]/60 transition-colors duration-500 delay-100" style={{ clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)' }} />
            
            {/* Corner accents */}
            <div className="absolute -top-4 -left-4 w-4 h-4 border-t-4 border-l-4 border-[#75feed] group-hover:w-8 group-hover:h-8 transition-all duration-500" />
            <div className="absolute -bottom-4 -right-4 w-4 h-4 border-b-4 border-r-4 border-[#fc029b] group-hover:w-8 group-hover:h-8 transition-all duration-500" />
            
            {/* Image Container with Glitch Effect on Hover */}
            <div className="relative z-10 w-full h-auto overflow-hidden bg-black" style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}>
              {/* Scanline overlay */}
              <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.05)_2px,rgba(255,255,255,0.05)_4px)] opacity-0 group-hover:opacity-100 pointer-events-none z-20 transition-opacity duration-500" />
              
              {/* RGB Glitch Layers */}
              <ImageWithFallback 
                src={festivalImage} 
                alt="Festival Dystopsy Element"
                className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-50 mix-blend-screen -translate-x-1 translate-y-0.5 filter hue-rotate-90 group-hover:animate-[glitch-anim-1_0.2s_infinite] transition-opacity z-10"
              />
              <ImageWithFallback 
                src={festivalImage} 
                alt="Festival Dystopsy Element"
                className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-50 mix-blend-screen translate-x-1 -translate-y-0.5 filter hue-rotate-[270deg] group-hover:animate-[glitch-anim-2_0.3s_infinite] transition-opacity z-10"
              />
              
              {/* Main Image */}
              <ImageWithFallback 
                src={festivalImage} 
                alt="Festival Dystopsy Element"
                className="relative z-0 w-full h-auto object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              />
            </div>
            
            {/* Cyberpunk details */}
            <div className="absolute top-0 left-0 z-30 bg-[#050505] px-3 py-1 border-b border-r border-[#75feed]/50 group-hover:border-[#75feed] transition-colors" style={{ clipPath: 'polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%)' }}>
              <span className="font-orbitron text-xs text-[#75feed] tracking-widest block group-hover:text-white transition-colors">SYS.ON</span>
              <span className="font-rajdhani text-gray-500 text-[10px] group-hover:text-[#fc029b] transition-colors">FREQ: 142.BPM</span>
            </div>
          </motion.div>
          
          <style dangerouslySetInnerHTML={{__html: `
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

          {/* Right Column - Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center space-x-4 mb-6">
              <span className="h-px w-12 bg-[#fc029b]" />
              <h2 className="font-orbitron text-sm text-[#fc029b] font-bold tracking-[0.3em] uppercase">
                L'Expérience
              </h2>
            </div>
            
            <h3 className="font-orbitron text-4xl md:text-5xl text-white font-black leading-tight mb-8">
              BIENVENUE DANS <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#75feed] to-[#fc029b]">
                LA MATRICE
              </span>
            </h3>
            
            <p className="font-rajdhani text-gray-300 text-xl leading-relaxed mb-8">
              Dystopsy Element n'est pas qu'une association. C'est un mouvement voué à l'expansion des consciences par la musique électronique. Plongez dans des univers visuels et sonores où la Psytrance et la Techno fusionnent avec l'esthétique Cyberpunk.
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-[#1a1a1a] border border-gray-800 text-[#75feed] rounded-sm group hover:border-[#75feed] transition-colors">
                  <Disc className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h4 className="font-orbitron text-lg text-white mb-1">Musique Alternative</h4>
                  <p className="font-rajdhani text-gray-400 text-lg">Des line-ups pointus, alliant talents émergents et figures emblématiques de l'underground.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-[#1a1a1a] border border-gray-800 text-[#fc029b] rounded-sm group hover:border-[#fc029b] transition-colors">
                  <Zap className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h4 className="font-orbitron text-lg text-white mb-1">Scénographie Immersive</h4>
                  <p className="font-rajdhani text-gray-400 text-lg">Des décors sci-fi, mapping vidéo et installations lasers qui transforment l'espace.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-[#1a1a1a] border border-gray-800 text-[#75feed] rounded-sm group hover:border-[#75feed] transition-colors">
                  <Headphones className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h4 className="font-orbitron text-lg text-white mb-1">Système Son Dévastateur</h4>
                  <p className="font-rajdhani text-gray-400 text-lg">Une clarté sonore chirurgicale pour ressentir chaque fréquence au plus profond de vous-même.</p>
                </div>
              </div>
            </div>
            
          </motion.div>

        </div>
      </div>
    </section>
  );
}