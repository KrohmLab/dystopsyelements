import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import { Calendar, MapPin, Clock, Ticket, ArrowLeft, Disc, Zap, Music, X, ExternalLink, Instagram, ChevronDown, ChevronUp } from "lucide-react";
import { MOCK_EVENTS, Artist } from "../data/events";
import { CyberSeparator } from "../components/CyberSeparator";
import { FloatingPattern } from "../components/FloatingPattern";

export function EventDetail() {
  const { id } = useParams();
  const event = MOCK_EVENTS.find(e => e.id === id);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  // Configuration de la barre de scroll (Style Home.tsx)
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (selectedArtist) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedArtist]);

  if (!event) {
    return (
      <div className="min-h-screen bg-[#020202] text-white flex flex-col items-center justify-center p-4">
        <h1 className="font-orbitron text-4xl text-[#fc029b] mb-4">ERROR 404</h1>
        <p className="font-rajdhani text-xl text-gray-400 mb-8">EVENT_NOT_FOUND</p>
        <Link to="/events" className="border border-[#75feed] px-6 py-3 text-[#75feed] font-orbitron uppercase tracking-widest hover:bg-[#75feed]/10 transition-colors">
          RETOUR AU SYSTEME
        </Link>
      </div>
    );
  }

  const isUpcoming = new Date(event.date) >= new Date("2026-04-22");

  return (
    <div className="relative bg-[#020202] text-white min-h-screen overflow-x-hidden">
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#75feed] to-[#fc029b] transform origin-left z-[100] pointer-events-none"
        style={{ scaleX }}
      />

      <Link to="/events" className="fixed top-24 left-4 sm:left-8 z-40 group flex items-center space-x-2 text-gray-400 hover:text-[#75feed] transition-colors bg-[#050505]/80 backdrop-blur-md px-4 py-2 border border-gray-800 hover:border-[#75feed]/50">
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="font-orbitron text-sm uppercase tracking-widest">Retour</span>
      </Link>

      <section className="relative w-full min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#020202]/80 via-[#020202]/40 to-[#020202] z-10" />
          <motion.img 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: isUpcoming ? 1.0 : 0.7 }} 
            transition={{ duration: 1.5 }}
            src={event.image} 
            alt={event.title} 
            className={`w-full h-full object-cover blur-sm ${!isUpcoming ? 'grayscale' : ''}`}
          />
          <div className="absolute inset-0 z-10 bg-[linear-gradient(rgba(252,2,155,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(252,2,155,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-50" />
        </div>
        
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 lg:mt-0 flex flex-col lg:flex-row items-center gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 text-center lg:text-left w-full"
          >
            <div className="inline-block bg-[#050505]/80 border border-[#75feed]/50 px-4 py-2 mb-6 backdrop-blur-md">
              <span className={`font-orbitron font-bold tracking-[0.2em] uppercase ${isUpcoming ? 'text-[#75feed] animate-pulse' : 'text-gray-400'}`}>
                {isUpcoming ? 'EVENT_UPCOMING' : 'EVENT_PAST'}
              </span>
            </div>
            
            <h1 className="font-orbitron font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-gray-500 uppercase tracking-tighter mb-6 leading-none text-[clamp(2.5rem,8vw,6rem)] text-balance">
              {event.title}
            </h1>
            
            <p className="font-rajdhani text-xl lg:text-2xl text-gray-300 max-w-2xl mx-auto lg:mx-0 mb-8 border-l-4 border-[#fc029b] pl-6 py-2 bg-gradient-to-r from-[#fc029b]/10 to-transparent">
              {event.shortDescription}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 font-rajdhani text-lg">
              <div className="flex items-center space-x-3 text-gray-300 bg-[#050505]/40 p-4 border border-gray-800">
                <Calendar className="w-6 h-6 text-[#75feed]" />
                <span className="uppercase tracking-widest">{new Date(event.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300 bg-[#050505]/40 p-4 border border-gray-800">
                <Clock className="w-6 h-6 text-[#fc029b]" />
                <span className="uppercase tracking-widest">{event.time}</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300 bg-[#050505]/40 p-4 border border-gray-800">
                <MapPin className="w-6 h-6 text-[#75feed]" />
                <span className="uppercase tracking-widest">{event.location}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              {isUpcoming && event.ticketLink && (
                <a href={event.ticketLink} className="w-full sm:w-auto relative group/btn block">
                  <div className="relative px-8 py-4 bg-[#050505]/60 backdrop-blur-md border border-[#75feed] overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#75feed] to-[#fc029b] opacity-20 group-hover/btn:opacity-30 transition-opacity duration-300" />
                    <span className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#75feed] to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-in-out" />
                    <span className="absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-l from-transparent via-[#75feed] to-transparent translate-x-full group-hover/btn:-translate-x-full transition-transform duration-1000 ease-in-out" />
                    <span className="absolute inset-0 bg-[#75feed]/20 translate-y-[100%] group-hover/btn:translate-y-0 transition-transform duration-300 ease-in-out" />
                    <div className="relative z-10 flex items-center justify-center space-x-3 text-white font-orbitron font-bold tracking-[0.2em] uppercase text-lg">
                      <Ticket className="w-6 h-6 text-[#75feed] group-hover/btn:animate-pulse" />
                      <span className="group-hover/btn:text-glow-cyan transition-all">Billetterie</span>
                    </div>
                  </div>
                </a>
              )}
              
              {event.facebookLink && (
                <a href={event.facebookLink} className="w-full sm:w-auto relative group/info block">
                  <div className="relative px-8 py-4 bg-transparent overflow-hidden flex items-center justify-center">
                    <span className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#fc029b] to-transparent -translate-x-full group-hover/info:translate-x-full transition-transform duration-1000 ease-in-out" />
                    <span className="absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-l from-transparent via-[#fc029b] to-transparent translate-x-full group-hover/info:-translate-x-full transition-transform duration-1000 ease-in-out" />
                    <span className="absolute inset-0 bg-[#fc029b]/10 translate-y-[100%] group-hover/info:translate-y-0 transition-transform duration-300 ease-in-out" />
                    <div className="relative z-10 flex items-center justify-center space-x-3 text-gray-400 font-orbitron font-bold tracking-[0.2em] uppercase text-sm">
                      <ExternalLink className="w-5 h-5 text-[#fc029b]" />
                      <span className="group-hover/info:text-glow-pink group-hover/info:text-white transition-all">Événement FB</span>
                    </div>
                  </div>
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <CyberSeparator variant={3} color="cyan" direction="left" />

      <section className="pt-24 pb-12 relative z-10 bg-[#020202]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#050505] border border-gray-800 p-6 md:p-10 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#fc029b]" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#75feed]" />
            <div className="absolute top-0 right-10 w-20 h-[1px] bg-gradient-to-r from-transparent via-[#75feed] to-transparent opacity-50" />

            <h2 className="font-orbitron text-2xl md:text-3xl font-black text-white uppercase tracking-wider mb-6 flex items-center space-x-3">
              <span className="w-8 h-1 bg-[#fc029b]"></span>
              <span>Transmission_</span>
            </h2>

            <div className="relative">
              <motion.div
                initial={false}
                animate={{ height: isDescriptionExpanded ? "auto" : "120px" }}
                className="overflow-hidden relative"
              >
                <p className="font-rajdhani text-lg md:text-xl text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {event.longDescription}
                </p>
                {!isDescriptionExpanded && (
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#050505] to-transparent" />
                )}
              </motion.div>

              <button
                onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                className="mt-6 group/btn overflow-hidden relative inline-flex items-center space-x-2 px-6 py-2 border border-gray-800 bg-[#020202] hover:border-[#fc029b] transition-colors"
              >
                <span className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#fc029b] to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-in-out" />
                <span className="font-orbitron text-xs font-bold uppercase tracking-widest text-gray-400 group-hover/btn:text-[#fc029b] group-hover/btn:text-glow-pink transition-all">
                  {isDescriptionExpanded ? "Fermer la transmission" : "Décrypter la suite"}
                </span>
                {isDescriptionExpanded ? (
                  <ChevronUp className="w-4 h-4 text-gray-500 group-hover/btn:text-[#fc029b] transition-colors" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500 group-hover/btn:text-[#fc029b] transition-colors" />
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 relative z-10 bg-[#020202]">
        <FloatingPattern variant={2} color="pink" className="w-[400px] h-[400px] right-0 top-[10%] opacity-5" delay={1} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="mb-20">
            <h2 className="font-orbitron text-4xl md:text-5xl font-black text-white uppercase tracking-wider mb-8 flex items-center space-x-4">
              <span className="w-12 h-1 bg-[#75feed]"></span>
              <span>Line-up_</span>
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {event.artists.map((artist, idx) => (
                <motion.div
                  key={artist.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  onClick={() => setSelectedArtist(artist)}
                  className="group cursor-pointer flex flex-col relative"
                >
                  <div className="relative aspect-[3/4] mb-4 w-full shrink-0">
                    <div className={`absolute -inset-2 border border-gray-800/50 ${artist.type === 'Live' ? 'group-hover:border-[#fc029b]/40' : 'group-hover:border-[#75feed]/40'} bg-transparent transition-colors duration-500`} />
                    <div className={`absolute -top-2 -left-2 w-3 h-3 border-t-2 border-l-2 ${artist.type === 'Live' ? 'border-[#fc029b]' : 'border-[#75feed]'} group-hover:w-6 group-hover:h-6 transition-all duration-500 z-20`} />
                    <div className={`absolute -bottom-2 -right-2 w-3 h-3 border-b-2 border-r-2 ${artist.type === 'Live' ? 'border-[#fc029b]' : 'border-[#75feed]'} group-hover:w-6 group-hover:h-6 transition-all duration-500 z-20`} />

                    <div className="relative z-10 w-full h-full overflow-hidden bg-[#080808] border border-gray-900 group-hover:border-gray-800 transition-colors">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#fc029b]/20 to-transparent translate-y-[-100%] group-hover:animate-[scan_2s_ease-in-out_infinite] z-20 pointer-events-none" />
                      <img 
                        src={artist.photo} 
                        alt={artist.name}
                        className={`relative z-10 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${!isUpcoming ? 'grayscale opacity-70 group-hover:opacity-100 group-hover:grayscale-0' : 'grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0'}`}
                      />
                      <div className="absolute top-0 left-0 z-30 bg-[#050505]/90 backdrop-blur-sm px-3 py-1 border-b border-r border-gray-800">
                        <span className={`font-orbitron text-[10px] font-bold uppercase tracking-widest ${artist.type === 'Live' ? 'text-[#fc029b]' : 'text-[#75feed]'}`}>
                          {artist.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-1 mt-2">
                    <h3 className="font-orbitron text-2xl font-black text-white group-hover:text-[#fc029b] transition-colors uppercase tracking-tight mb-1">
                      {artist.name}
                    </h3>
                    <p className="font-rajdhani text-gray-400 text-sm uppercase tracking-widest flex items-center space-x-2">
                      <Music className="w-3 h-3 text-[#75feed]" />
                      <span>{artist.style}</span>
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedArtist && (
          <motion.div 
            key="artist-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.3 } }}
            exit={{ opacity: 0, transition: { delay: 0.4, duration: 0.3 } }} 
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          >
            <div 
              className="absolute inset-0 bg-[#020202]/90 backdrop-blur-xl"
              onClick={() => setSelectedArtist(null)}
            />
            
            <motion.div 
              initial={{ clipPath: "inset(50% 50% 50% 50%)", boxShadow: "0 0 0px rgba(117,254,237,0)" }}
              animate={{ 
                clipPath: ["inset(50% 50% 50% 50%)", "inset(49.8% 0% 49.8% 0%)", "inset(0% 0% 0% 0%)"],
                boxShadow: ["0 0 0px rgba(117,254,237,0)", "0 0 100px rgba(117,254,237,1)", "0 0 40px rgba(0,0,0,0.8)"]
              }}
              exit={{ 
                clipPath: ["inset(0% 0% 0% 0%)", "inset(49.8% 0% 49.8% 0%)", "inset(50% 50% 50% 50%)"],
                boxShadow: ["0 0 40px rgba(0,0,0,0.8)", "0 0 100px rgba(252,2,155,1)", "0 0 0px rgba(252,2,155,0)"]
              }}
              transition={{ duration: 0.6, times: [0, 0.4, 1], ease: "easeInOut" }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-[#050505] border border-gray-800 flex flex-col md:flex-row overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#75feed] z-20 pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#fc029b] z-20 pointer-events-none" />

              <button 
                onClick={() => setSelectedArtist(null)}
                className="absolute top-4 right-4 z-50 text-gray-400 hover:text-[#fc029b] transition-colors p-2 bg-[#020202]/80 border border-gray-800 hover:border-[#fc029b]/50 backdrop-blur-md"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="w-full h-[30vh] md:h-auto md:w-2/5 shrink-0 relative">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(117,254,237,0.2)_1px,transparent_1px)] bg-[size:4px_4px] mix-blend-overlay z-20 pointer-events-none" />
                <img 
                  src={selectedArtist.photo} 
                  alt={selectedArtist.name}
                  className="absolute inset-0 w-full h-full object-cover grayscale mix-blend-luminosity filter contrast-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10" />
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#75feed] via-[#fc029b] to-[#75feed] z-30" />
              </div>

              <div className="w-full md:w-3/5 p-6 sm:p-8 md:p-12 relative flex flex-col overflow-y-auto">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#75feed]/5 blur-[100px] pointer-events-none" />
                
                <div className="mb-6 relative z-10">
                  <div className="flex items-center space-x-4 mb-4">
                    <span className={`font-orbitron text-xs font-bold uppercase tracking-widest px-3 py-1 bg-[#050505] border border-gray-800 ${selectedArtist.type === 'Live' ? 'text-[#fc029b] border-[#fc029b]/30' : 'text-[#75feed] border-[#75feed]/30'}`}>
                      {selectedArtist.type}
                    </span>
                    <span className="font-rajdhani text-gray-400 text-sm uppercase tracking-widest">
                      {selectedArtist.label}
                    </span>
                  </div>
                  
                  <h2 className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-2 flex items-center gap-4 break-words">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">{selectedArtist.name}</span>
                  </h2>
                  <p className="font-rajdhani text-[#75feed] text-xl uppercase tracking-widest flex items-center space-x-2">
                    <Zap className="w-5 h-5 text-[#fc029b]" />
                    <span>{selectedArtist.style}</span>
                  </p>
                </div>

                <div className="w-full bg-[#020202] border border-gray-800 p-1 mb-6 shrink-0">
                  <iframe 
                    width="100%" 
                    height="166" 
                    scrolling="no" 
                    frameBorder="no" 
                    allow="autoplay" 
                    src={selectedArtist.soundcloudUrl}
                    className="filter grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                  ></iframe>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-auto relative z-10 shrink-0">
                  <a 
                    href={selectedArtist.soundcloudUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="group/sc relative flex-1 bg-[#020202] border border-gray-800 overflow-hidden flex items-center justify-center py-4 transition-colors"
                  >
                    <span className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#75feed] to-transparent -translate-x-full group-hover/sc:translate-x-full transition-transform duration-1000 ease-in-out" />
                    <span className="absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-l from-transparent via-[#75feed] to-transparent translate-x-full group-hover/sc:-translate-x-full transition-transform duration-1000 ease-in-out" />
                    <span className="absolute inset-0 bg-[#75feed]/10 translate-y-[100%] group-hover/sc:translate-y-0 transition-transform duration-300 ease-in-out" />
                    <div className="relative z-10 flex items-center space-x-3">
                      <Disc className="w-5 h-5 text-gray-400 group-hover/sc:text-[#75feed] transition-colors" />
                      <span className="font-orbitron text-sm font-bold uppercase tracking-widest text-gray-300 group-hover/sc:text-glow-cyan group-hover/sc:text-white transition-all">SoundCloud</span>
                    </div>
                  </a>
                  
                  <a 
                    href={selectedArtist.instagramUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="group/ig relative flex-1 bg-[#020202] border border-gray-800 overflow-hidden flex items-center justify-center py-4 transition-colors"
                  >
                    <span className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#fc029b] to-transparent -translate-x-full group-hover/ig:translate-x-full transition-transform duration-1000 ease-in-out" />
                    <span className="absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-l from-transparent via-[#fc029b] to-transparent translate-x-full group-hover/ig:-translate-x-full transition-transform duration-1000 ease-in-out" />
                    <span className="absolute inset-0 bg-[#fc029b]/10 translate-y-[100%] group-hover/ig:translate-y-0 transition-transform duration-300 ease-in-out" />
                    <div className="relative z-10 flex items-center space-x-3">
                      <Instagram className="w-5 h-5 text-gray-400 group-hover/ig:text-[#fc029b] transition-colors" />
                      <span className="font-orbitron text-sm font-bold uppercase tracking-widest text-gray-300 group-hover/ig:text-glow-pink group-hover/ig:text-white transition-all">Instagram</span>
                    </div>
                  </a>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan { 0% { transform: translateY(-100%); } 50% { transform: translateY(100%); } 100% { transform: translateY(-100%); } }
      `}} />
    </div>
  );
}