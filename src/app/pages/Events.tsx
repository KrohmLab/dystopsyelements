import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import { Link } from "react-router";
import { Calendar, MapPin, Clock, Ticket, ArrowRight } from "lucide-react";
import { MOCK_EVENTS } from "../data/events";
import { CyberSeparator } from "../components/CyberSeparator";

export function Events() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

  // Configuration de la barre de scroll (Style Home.tsx)
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Force le retour en haut de page quand on revient depuis un événement
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const today = new Date("2026-04-22"); // Today's date

  const upcomingEvents = useMemo(() => {
    return MOCK_EVENTS.filter(event => new Date(event.date) >= today).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [today]);

  const pastEvents = useMemo(() => {
    return MOCK_EVENTS.filter(event => new Date(event.date) < today).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [today]);

  const displayedEvents = activeTab === "upcoming" ? upcomingEvents : pastEvents;

  return (
    <div className="relative bg-[#020202] text-white min-h-screen overflow-x-hidden">
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#75feed] to-[#fc029b] transform origin-left z-[100] pointer-events-none"
        style={{ scaleX }}
      />

      {/* Specific Hero for the pages */}
      <section className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-transparent to-[#020202] z-10" />
          <div className="absolute inset-0 bg-black/60 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1578300253266-dedd2cd40912?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920" 
            alt="Events Background" 
            className="w-full h-full object-cover mix-blend-luminosity filter hue-rotate-180 opacity-40"
          />
          {/* Cyber grid */}
          <div className="absolute inset-0 z-10 bg-[linear-gradient(rgba(117,254,237,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(117,254,237,0.1)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30" />
        </div>
        
        <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto mt-16 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-orbitron font-black text-transparent bg-clip-text bg-gradient-to-r from-[#75feed] to-[#fc029b] uppercase tracking-widest mb-4 text-[clamp(2.5rem,10vw,5rem)] text-balance leading-tight">
              Billetterie
            </h1>
            <p className="font-rajdhani text-xl text-gray-300 max-w-2xl mx-auto box-glow-cyan-text">
              Accédez à toutes nos expériences immersives. Du prochain Nexen Festival aux soirées underground passées.
            </p>
          </motion.div>
        </div>
      </section>

      <CyberSeparator variant={1} color="pink" direction="right" />

      {/* Tabs & Content */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Tabs */}
          <div className="flex justify-center mb-16">
            <div className="inline-flex p-1 border border-gray-800 bg-[#050505]/80 backdrop-blur-md relative" style={{ clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)' }}>
              
              <button
                onClick={() => setActiveTab("upcoming")}
                className={`relative px-8 py-3 font-orbitron font-bold uppercase tracking-wider transition-all duration-300 z-10 ${
                  activeTab === "upcoming" ? "text-white" : "text-gray-500 hover:text-gray-300"
                }`}
              >
                À venir
                {activeTab === "upcoming" && (
                  <motion.div layoutId="activeTab" className="absolute inset-0 border border-[#75feed] bg-[#75feed]/10 z-[-1]" style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }} />
                )}
              </button>
              
              <button
                onClick={() => setActiveTab("past")}
                className={`relative px-8 py-3 font-orbitron font-bold uppercase tracking-wider transition-all duration-300 z-10 ${
                  activeTab === "past" ? "text-white" : "text-gray-500 hover:text-gray-300"
                }`}
              >
                Passés
                {activeTab === "past" && (
                  <motion.div layoutId="activeTab" className="absolute inset-0 border border-[#fc029b] bg-[#fc029b]/10 z-[-1]" style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }} />
                )}
              </button>
              
            </div>
          </div>

          {/* Events Grid */}
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
          >
            {displayedEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group cursor-pointer flex flex-col h-full relative"
              >
                <Link to={`/events/${event.id}`} className="relative block mb-6 w-full shrink-0 aspect-[4/3] bg-[#050505]">
                  <div className={`absolute -inset-3 border-2 ${activeTab === 'upcoming' ? 'border-[#75feed]/20 group-hover:border-[#75feed]/50' : 'border-[#fc029b]/20 group-hover:border-[#fc029b]/50'} bg-transparent transition-colors duration-500`} style={{ clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)' }} />
                  <div className="absolute -inset-1.5 border border-gray-800/50 bg-transparent group-hover:border-gray-500/40 transition-colors duration-500 delay-75" style={{ clipPath: 'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)' }} />
                  <div className={`absolute -top-3 -left-3 w-3 h-3 border-t-2 border-l-2 ${activeTab === 'upcoming' ? 'border-[#75feed]' : 'border-gray-500'} group-hover:w-6 group-hover:h-6 transition-all duration-500 z-20`} />
                  <div className={`absolute -bottom-3 -right-3 w-3 h-3 border-b-2 border-r-2 ${activeTab === 'upcoming' ? 'border-[#fc029b]' : 'border-gray-500'} group-hover:w-6 group-hover:h-6 transition-all duration-500 z-20`} />
                  <div className="relative z-10 w-full h-full overflow-hidden bg-[#080808] border border-gray-900 group-hover:border-gray-800 transition-colors" style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}>
                    <div className={`absolute inset-0 bg-gradient-to-b from-transparent ${activeTab === 'upcoming' ? 'via-[#75feed]/10' : 'via-[#fc029b]/10'} to-transparent translate-y-[-100%] group-hover:animate-[scan_2.5s_ease-in-out_infinite] z-20 pointer-events-none`} />
                    <img src={event.image} alt={event.title} className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-50 mix-blend-screen -translate-x-1 translate-y-0.5 filter hue-rotate-90 group-hover:animate-[glitch-anim-1_0.2s_infinite] transition-all duration-300 z-10" />
                    <img src={event.image} alt={event.title} className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-50 mix-blend-screen translate-x-1 -translate-y-0.5 filter hue-rotate-[270deg] group-hover:animate-[glitch-anim-2_0.3s_infinite] transition-all duration-300 z-10" />
                    <img src={event.image} alt={event.title} className={`relative z-0 w-full h-full object-cover ${activeTab === 'past' ? 'grayscale opacity-70 group-hover:opacity-100' : 'opacity-90 group-hover:opacity-100'} mix-blend-lighten group-hover:scale-105 transition-all duration-700`} />
                    <div className="absolute top-0 left-0 z-30 bg-[#050505]/90 backdrop-blur-sm px-4 py-2 border-b border-r border-gray-800" style={{ clipPath: 'polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%)' }}>
                      <span className={`font-rajdhani text-sm font-bold uppercase tracking-widest ${activeTab === 'upcoming' ? 'text-[#75feed]' : 'text-gray-400'}`}>
                        {new Date(event.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                  </div>
                </Link>
                
                <div className="flex flex-col flex-grow px-2">
                  <Link to={`/events/${event.id}`} className="block w-fit">
                    <h3 className={`font-orbitron text-2xl font-black mb-3 uppercase tracking-tight transition-colors ${activeTab === 'upcoming' ? 'text-white group-hover:text-[#75feed]' : 'text-gray-300 group-hover:text-white'}`}>
                      {event.title}
                    </h3>
                  </Link>
                  <div className="space-y-2 mb-6 font-rajdhani text-gray-400">
                    <div className="flex items-center space-x-2"><Clock className="w-4 h-4 text-[#fc029b]" /><span>{event.time}</span></div>
                    <div className="flex items-center space-x-2"><MapPin className="w-4 h-4 text-[#75feed]" /><span>{event.location}</span></div>
                  </div>
                  <div className="mt-auto pt-4 flex flex-col space-y-3">
                    {activeTab === 'upcoming' && (
                      <a href={event.ticketLink} className="group/btn block w-full">
                        <div className="relative px-4 py-3 bg-[#050505]/60 backdrop-blur-md border border-[#75feed] overflow-hidden flex items-center justify-center">
                          <div className="absolute inset-0 bg-gradient-to-r from-[#75feed] to-[#fc029b] opacity-20 group-hover/btn:opacity-30 transition-opacity duration-300" />
                          <span className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#75feed] to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-in-out" />
                          <span className="absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-l from-transparent via-[#75feed] to-transparent translate-x-full group-hover/btn:-translate-x-full transition-transform duration-1000 ease-in-out" />
                          <span className="absolute inset-0 bg-[#75feed]/20 translate-y-[100%] group-hover/btn:translate-y-0 transition-transform duration-300 ease-in-out" />
                          <div className="relative z-10 flex items-center space-x-2 text-white font-orbitron font-bold tracking-[0.1em] uppercase text-sm">
                            <Ticket className="w-4 h-4 text-[#75feed] group-hover/btn:animate-pulse" />
                            <span className="group-hover/btn:text-glow-cyan transition-all">Billetterie</span>
                          </div>
                        </div>
                      </a>
                    )}
                    <Link to={`/events/${event.id}`} className="group/info block w-full">
                      <div className={`relative px-4 py-3 bg-[#050505]/60 backdrop-blur-md border ${activeTab === 'upcoming' ? 'border-[#75feed]' : 'border-[#fc029b]'} overflow-hidden flex items-center justify-center`}>
                        <span className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent ${activeTab === 'upcoming' ? 'via-[#75feed]' : 'via-[#fc029b]'} to-transparent -translate-x-full group-hover/info:translate-x-full transition-transform duration-1000 ease-in-out`} />
                        <span className={`absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-l from-transparent ${activeTab === 'upcoming' ? 'via-[#75feed]' : 'via-[#fc029b]'} to-transparent translate-x-full group-hover/info:-translate-x-full transition-transform duration-1000 ease-in-out`} />
                        <span className={`absolute inset-0 ${activeTab === 'upcoming' ? 'bg-[#75feed]/10' : 'bg-[#fc029b]/10'} translate-y-[100%] group-hover/info:translate-y-0 transition-transform duration-300 ease-in-out`} />
                        <div className="relative z-10 flex items-center space-x-2 text-white font-orbitron font-bold tracking-[0.1em] uppercase text-sm">
                          <span className={`transition-all ${activeTab === 'upcoming' ? 'group-hover/info:text-glow-cyan' : 'group-hover/info:text-glow-pink'}`}>Plus d'infos</span>
                          <ArrowRight className={`w-4 h-4 ${activeTab === 'upcoming' ? 'text-[#75feed]' : 'text-[#fc029b]'} group-hover/info:translate-x-1 transition-transform`} />
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {displayedEvents.length === 0 && (
            <div className="text-center py-20">
              <p className="font-orbitron text-xl text-gray-500 uppercase tracking-widest">
                Aucun événement dans cette catégorie pour le moment.
              </p>
            </div>
          )}

        </div>
      </section>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan { 0% { transform: translateY(-100%); } 50% { transform: translateY(100%); } 100% { transform: translateY(-100%); } }
        @keyframes glitch-anim-1 { 0% { clip-path: inset(20% 0 80% 0); transform: translate(-2px, 1px); } 20% { clip-path: inset(60% 0 10% 0); transform: translate(2px, -1px); } 40% { clip-path: inset(40% 0 50% 0); transform: translate(-2px, 2px); } 60% { clip-path: inset(80% 0 5% 0); transform: translate(2px, -2px); } 80% { clip-path: inset(10% 0 70% 0); transform: translate(-1px, 1px); } 100% { clip-path: inset(30% 0 50% 0); transform: translate(1px, -1px); } }
        @keyframes glitch-anim-2 { 0% { clip-path: inset(10% 0 60% 0); transform: translate(2px, -1px); } 20% { clip-path: inset(80% 0 5% 0); transform: translate(-2px, 1px); } 40% { clip-path: inset(30% 0 40% 0); transform: translate(2px, -2px); } 60% { clip-path: inset(50% 0 30% 0); transform: translate(-2px, 2px); } 80% { clip-path: inset(5% 0 80% 0); transform: translate(1px, -1px); } 100% { clip-path: inset(70% 0 10% 0); transform: translate(-1px, 1px); } }
      `}} />
    </div>
  );
}