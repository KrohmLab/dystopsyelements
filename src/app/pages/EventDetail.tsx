import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, MapPin, Clock, Ticket, ArrowLeft, Disc, Zap, Music, X, ExternalLink, Instagram } from "lucide-react";
import { MOCK_EVENTS, Artist } from "../data/events";
import { CyberSeparator } from "../components/CyberSeparator";
import { FloatingPattern } from "../components/FloatingPattern";

export function EventDetail() {
  const { id } = useParams();
  const event = MOCK_EVENTS.find(e => e.id === id);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);

  // Force le scroll tout en haut au chargement de la page
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
      
      {/* Back Button Overlay */}
      <Link to="/events" className="fixed top-24 left-4 sm:left-8 z-40 group flex items-center space-x-2 text-gray-400 hover:text-[#75feed] transition-colors bg-[#050505]/50 backdrop-blur-md px-4 py-2 border border-gray-800 hover:border-[#75feed]/50" style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}>
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="font-orbitron text-sm uppercase tracking-widest">Retour</span>
      </Link>

      {/* Specific Hero Event */}
      <section className="relative w-full min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Main Gradient overlay - kept for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#020202]/80 via-[#020202]/40 to-[#020202] z-10" />
          
          {/* Image lumineuse avec flou */}
          <motion.img 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: isUpcoming ? 1.0 : 0.7 }} 
            transition={{ duration: 1.5 }}
            src={event.image} 
            alt={event.title} 
            className={`w-full h-full object-cover blur-sm ${!isUpcoming ? 'grayscale' : ''}`}
          />
          
          {/* Cyber grid */}
          <div className="absolute inset-0 z-10 bg-[linear-gradient(rgba(252,2,155,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(252,2,155,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-50" />
        </div>
        
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 lg:mt-0 flex flex-col lg:flex-row items-center gap-12">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 text-center lg:text-left"
          >
            <div className="inline-block bg-[#050505]/80 border border-[#75feed]/50 px-4 py-2 mb-6 backdrop-blur-md" style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}>
              <span className={`font-orbitron font-bold tracking-[0.2em] uppercase ${isUpcoming ? 'text-[#75feed] animate-pulse' : 'text-gray-400'}`}>
                {isUpcoming ? 'EVENT_UPCOMING' : 'EVENT_PAST'}
              </span>
            </div>
            
            <h1 className="font-orbitron text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-gray-500 uppercase tracking-tighter mb-6 leading-none">
              {event.title}
            </h1>
            
            <p className="font-rajdhani text-xl lg:text-2xl text-gray-300 max-w-2xl mx-auto lg:mx-0 mb-8 border-l-4 border-[#fc029b] pl-6 py-2 bg-gradient-to-r from-[#fc029b]/10 to-transparent">
              {event.description}
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
                <a href={event.ticketLink} className="w-full sm:w-auto relative group px-8 py-4 bg-[#050505]/80 backdrop-blur-md border border-[#75feed] overflow-hidden text-center" style={{ clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)' }}>
                  <span className="absolute inset-0 bg-[#75feed]/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                  <div className="relative z-10 flex items-center justify-center space-x-3 text-white font-orbitron font-bold tracking-[0.2em] uppercase text-lg">
                    <Ticket className="w-6 h-6 text-[#75feed] group-hover:animate-pulse" />
                    <span>Billetterie</span>
                  </div>
                </a>
              )}
              
              {event.facebookLink && (
                <a href={event.facebookLink} className="w-full sm:w-auto flex items-center justify-center space-x-2 text-gray-400 hover:text-white font-rajdhani uppercase tracking-widest font-bold px-6 py-4 border border-transparent hover:border-gray-700 transition-colors">
                  <ExternalLink className="w-5 h-5 text-[#fc029b]" />
                  <span>Événement Facebook</span>
                </a>
              )}
            </div>
          </motion.div>

        </div>
      </section>

      <CyberSeparator variant={3} color="cyan" direction="left" />

      {/* Description & Line-up */}
      <section className="py-24 relative z-10 bg-[#020202]">
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
                  className="group cursor-pointer relative"
                >
                  <div className="relative aspect-[3/4] mb-4 bg-[#050505] overflow-hidden" style={{ clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)' }}>
                    
                    {/* Hover Glitch overlays */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#fc029b]/20 to-transparent translate-y-[-100%] group-hover:animate-[scan_2s_ease-in-out_infinite] z-20 pointer-events-none" />
                    
                    <img 
                      src={artist.photo} 
                      alt={artist.name}
                      className={`relative z-10 w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${!isUpcoming ? 'grayscale opacity-70 group-hover:opacity-100 group-hover:grayscale-0' : 'grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0'}`}
                    />
                    
                    {/* Tags overlay */}
                    <div className="absolute top-0 left-0 z-30 flex flex-col items-start space-y-1 p-2">
                      <span className={`font-orbitron text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-[#050505]/90 border-l-2 ${artist.type === 'Live' ? 'border-[#fc029b] text-[#fc029b]' : 'border-[#75feed] text-[#75feed]'}`}>
                        {artist.type}
                      </span>
                    </div>

                    {/* Borders */}
                    <div className="absolute inset-0 border border-gray-800 group-hover:border-[#75feed]/50 z-30 pointer-events-none transition-colors" />
                  </div>
                  
                  <div className="px-1">
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

      {/* Cyberpunk Modal for Artist */}
      <AnimatePresence>
        {selectedArtist && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          >
            <div 
              className="absolute inset-0 bg-[#020202]/90 backdrop-blur-xl"
              onClick={() => setSelectedArtist(null)}
            />
            
            <motion.div 
              initial={{ scale: 0.9, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl bg-[#050505] border border-[#75feed]/50 shadow-[0_0_50px_rgba(117,254,237,0.1)] flex flex-col md:flex-row overflow-hidden"
              style={{ clipPath: 'polygon(30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0 30px)' }}
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedArtist(null)}
                className="absolute top-4 right-4 z-50 text-gray-400 hover:text-[#fc029b] transition-colors p-2 bg-[#020202]/50 border border-gray-800 hover:border-[#fc029b]/50 backdrop-blur-md"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Left: Photo & Glitch Effect */}
              <div className="w-full md:w-2/5 relative aspect-square md:aspect-auto">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(117,254,237,0.2)_1px,transparent_1px)] bg-[size:4px_4px] mix-blend-overlay z-20 pointer-events-none" />
                <img 
                  src={selectedArtist.photo} 
                  alt={selectedArtist.name}
                  className="absolute inset-0 w-full h-full object-cover grayscale mix-blend-luminosity filter contrast-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10" />
                
                {/* Cyber lines overlay */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#75feed] via-[#fc029b] to-[#75feed] z-30" />
              </div>

              {/* Right: Info & Embed */}
              <div className="w-full md:w-3/5 p-8 sm:p-12 relative flex flex-col">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#75feed]/5 blur-[100px] pointer-events-none" />
                
                <div className="mb-8 relative z-10">
                  <div className="flex items-center space-x-4 mb-4">
                    <span className={`font-orbitron text-xs font-bold uppercase tracking-widest px-3 py-1 bg-[#050505] border border-gray-800 ${selectedArtist.type === 'Live' ? 'text-[#fc029b] border-[#fc029b]/30' : 'text-[#75feed] border-[#75feed]/30'}`}>
                      {selectedArtist.type}
                    </span>
                    <span className="font-rajdhani text-gray-400 text-sm uppercase tracking-widest">
                      {selectedArtist.label}
                    </span>
                  </div>
                  
                  <h2 className="font-orbitron text-4xl sm:text-5xl font-black text-white uppercase tracking-tight mb-2 flex items-center gap-4">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">{selectedArtist.name}</span>
                  </h2>
                  <p className="font-rajdhani text-[#75feed] text-xl uppercase tracking-widest flex items-center space-x-2">
                    <Zap className="w-5 h-5 text-[#fc029b]" />
                    <span>{selectedArtist.style}</span>
                  </p>
                </div>

                {/* Soundcloud Embed */}
                <div className="w-full bg-[#020202] border border-gray-800 p-1 mb-8 flex-grow">
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

                {/* External Links */}
                <div className="flex flex-col sm:flex-row gap-4 mt-auto relative z-10">
                  <a 
                    href={selectedArtist.soundcloudUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex-1 border border-gray-800 hover:border-[#75feed] bg-[#020202] px-4 py-3 flex items-center justify-center space-x-3 group transition-colors"
                  >
                    <Disc className="w-5 h-5 text-gray-400 group-hover:text-[#75feed]" />
                    <span className="font-orbitron text-sm font-bold uppercase tracking-widest text-gray-300 group-hover:text-white">SoundCloud</span>
                  </a>
                  <a 
                    href={selectedArtist.instagramUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex-1 border border-gray-800 hover:border-[#fc029b] bg-[#020202] px-4 py-3 flex items-center justify-center space-x-3 group transition-colors"
                  >
                    <Instagram className="w-5 h-5 text-gray-400 group-hover:text-[#fc029b]" />
                    <span className="font-orbitron text-sm font-bold uppercase tracking-widest text-gray-300 group-hover:text-white">Instagram</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0% { transform: translateY(-100%); }
          50% { transform: translateY(100%); }
          100% { transform: translateY(-100%); }
        }
      `}} />
    </div>
  );
}