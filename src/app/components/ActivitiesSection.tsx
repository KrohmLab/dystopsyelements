import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { FloatingPattern } from "./FloatingPattern";

const ACTIVITIES = [
  {
    id: "deco",
    title: "Décoration & Scénographie",
    desc: "Création de décors immersifs, mapping 3D, et atmosphères cyberpunk pour transformer tout espace en une réalité alternative.",
    color: "#75feed",
    borderClass: "border-[#75feed]",
    textClass: "text-[#75feed]",
    hoverClass: "hover:box-glow-cyan"
  },
  {
    id: "arts",
    title: "Arts Vivants & Performers",
    desc: "Jongleurs de feu, danseurs LED, cracheurs d'étincelles : des performances visuelles qui transcendent la musique.",
    color: "#fc029b",
    borderClass: "border-[#fc029b]",
    textClass: "text-[#fc029b]",
    hoverClass: "hover:box-glow-pink"
  },
  {
    id: "prod",
    title: "Production d'Événements",
    desc: "De la logistique au booking, l'association prend en charge la gestion complète de rassemblements alternatifs.",
    color: "#ffffff",
    borderClass: "border-gray-600",
    textClass: "text-white",
    hoverClass: "hover:border-white"
  }
];

export function ActivitiesSection() {
  return (
    <section className="py-24 bg-[#050505] relative border-t border-b border-gray-900 overflow-hidden">
      {/* Glitch Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-50" />
      
      {/* Floating Animated Patterns */}
      <FloatingPattern variant={3} color="cyan" className="w-[500px] h-[500px] right-0 top-[10%] opacity-15" delay={1} />
      <FloatingPattern variant={4} color="pink" className="w-[400px] h-[400px] -left-20 bottom-0 opacity-15" delay={3} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-orbitron text-4xl md:text-5xl font-black text-white uppercase tracking-wider inline-block relative"
          >
            <span className="relative z-10">Nos Activités</span>
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#75feed] to-transparent opacity-50" />
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ACTIVITIES.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ 
                y: -5,
                boxShadow: `0 0 30px ${item.color}60, inset 0 0 20px ${item.color}30`,
                borderColor: item.color
              }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5, y: { duration: 0.2 }, boxShadow: { duration: 0.2 } }}
              className={`bg-[#0a0a0a] border p-8 group relative overflow-hidden transition-all duration-300`}
              style={{ borderColor: `${item.color}40` }}
            >
              {/* Hover Light Radial */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-screen"
                style={{ 
                  background: `radial-gradient(circle at center, ${item.color}15 0%, transparent 70%)`
                }}
              />

              {/* Corner Accents that expand and glow on hover */}
              <div 
                className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 transition-all duration-300 group-hover:w-8 group-hover:h-8 opacity-60 group-hover:opacity-100" 
                style={{ borderColor: item.color, boxShadow: `-2px -2px 10px ${item.color}00` }} 
              />
              <div 
                className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 transition-all duration-300 group-hover:w-8 group-hover:h-8 opacity-60 group-hover:opacity-100" 
                style={{ borderColor: item.color, boxShadow: `2px 2px 10px ${item.color}00` }} 
              />
              
              <div className="relative z-10">
                <h3 
                  className={`font-orbitron text-2xl font-bold mb-4 uppercase tracking-wide transition-all duration-300 ${item.textClass}`}
                  style={{ textShadow: `0 0 0px ${item.color}00` }}
                >
                  <span className="group-hover:drop-shadow-[0_0_8px_currentColor] transition-all duration-300">
                    {item.title}
                  </span>
                </h3>
                <p className="font-rajdhani text-gray-400 text-lg leading-relaxed mb-8 group-hover:text-gray-200 transition-colors duration-300">
                  {item.desc}
                </p>
                
                <button className={`flex items-center space-x-2 font-rajdhani text-lg font-semibold uppercase group-hover:tracking-widest transition-all duration-300 ${item.textClass}`}>
                  <span className="group-hover:drop-shadow-[0_0_8px_currentColor] transition-all duration-300">Découvrir</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform drop-shadow-none group-hover:drop-shadow-[0_0_8px_currentColor]" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}