import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import { Mail, Phone, User, Send, X, Instagram, Zap, Briefcase, MessageSquare } from "lucide-react";
import { CyberSeparator } from "../components/CyberSeparator";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  team: string;
  email: string;
  phone: string;
  bio: string;
  photo: string;
  skills: string[];
  instagramUrl: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "1",
    name: "Alex 'Zero' Mercer",
    role: "Fondateur & Directeur Artistique",
    team: "Direction",
    email: "zero@dystopsyelement.com",
    phone: "+33 6 12 34 56 78",
    bio: "Visionnaire derrière Dystopsy Element, Alex insuffle son esthétique cyberpunk dans chaque production de l'association.",
    photo: "https://images.unsplash.com/photo-1580046939256-c377c5b099f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBwb3J0cmFpdCUyMG1hbnxlbnwxfHx8fDE3Nzg3MjA1ODF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    skills: ["Direction", "Design 3D", "Scénographie"],
    instagramUrl: "#"
  },
  {
    id: "2",
    name: "Sarah 'Nova' Chen",
    role: "Responsable Événementiel",
    team: "Organisation",
    email: "nova@dystopsyelement.com",
    phone: "+33 6 98 76 54 32",
    bio: "Maîtresse de l'organisation, Sarah s'assure que chaque festival et soirée respecte l'expérience immersive promise.",
    photo: "https://images.unsplash.com/photo-1645976531514-33221ad57007?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBwb3J0cmFpdCUyMHdvbWFufGVufDF8fHx8MTc3ODY4MTczNHww&ixlib=rb-4.1.0&q=80&w=1080",
    skills: ["Logistique", "Booking", "Relations Publiques"],
    instagramUrl: "#"
  },
  {
    id: "3",
    name: "Marcus 'Glitch' Vane",
    role: "Lead Développeur VJ",
    team: "Technique",
    email: "glitch@dystopsyelement.com",
    phone: "+33 6 45 67 89 01",
    bio: "Créateur des algorithmes visuels génératifs qui animent les écrans géants de nos événements underground.",
    photo: "https://images.unsplash.com/photo-1541294054180-6c46ae51bbf2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwcG9ydHJhaXQlMjBtYW58ZW58MXx8fHwxNzc4NjU3MjU4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    skills: ["VJing", "Code Créatif", "Mapping"],
    instagramUrl: "#"
  },
  {
    id: "4",
    name: "Elena 'Flux' Silva",
    role: "Communication & Réseaux",
    team: "Organisation",
    email: "flux@dystopsyelement.com",
    phone: "+33 6 23 45 67 89",
    bio: "Voix de la rébellion numérique, Elena gère la communauté et transmet nos manifestes sur toutes les fréquences.",
    photo: "https://images.unsplash.com/photo-1519097186222-b26cc78c3077?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwcG9ydHJhaXQlMjB3b21hbnxlbnwxfHx8fDE3Nzg2NTcyNTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    skills: ["Social Media", "Copywriting", "RP"],
    instagramUrl: "#"
  }
];

const TEAMS = ["Tous", "Direction", "Organisation", "Technique"];

export function Contact() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [activeTeam, setActiveTeam] = useState<string>("Tous");

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (selectedMember) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedMember]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic for form submission would go here
    console.log("Formulaire envoyé");
  };

  const displayedMembers = activeTeam === "Tous" 
    ? TEAM_MEMBERS 
    : TEAM_MEMBERS.filter(member => member.team === activeTeam);

  return (
    <div className="relative bg-[#020202] text-white min-h-screen overflow-x-hidden pt-24 pb-12">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#75feed] to-[#fc029b] transform origin-left z-[100] pointer-events-none"
        style={{ scaleX }}
      />

      <section className="relative w-full py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-orbitron font-black text-transparent bg-clip-text bg-gradient-to-r from-[#75feed] to-[#fc029b] uppercase tracking-widest text-[clamp(2rem,6vw,4rem)] mb-4"
          >
            Transmission_
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-rajdhani text-xl text-gray-400 max-w-2xl mx-auto box-glow-cyan-text"
          >
            Établissez le contact avec Dystopsy Element. Envoyez vos requêtes sur notre réseau crypté.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Formulaire de Contact */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#050505] border border-gray-800 p-8 relative overflow-hidden group"
          >
            {/* Décoration Cyberpunk du Formulaire */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#75feed]" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#fc029b]" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#75feed]/5 to-transparent pointer-events-none" />
            <div className="absolute top-0 right-10 w-20 h-[1px] bg-gradient-to-r from-transparent via-[#75feed] to-transparent opacity-50" />

            <h2 className="font-orbitron text-2xl font-black text-white uppercase tracking-wider mb-8 flex items-center space-x-3">
              <span className="w-8 h-1 bg-[#75feed]"></span>
              <span>Terminal_</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-orbitron text-xs text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <User className="w-3 h-3 text-[#75feed]" /> Prénom
                  </label>
                  <input 
                    type="text" 
                    required
                    className="w-full bg-[#020202] border border-gray-800 p-3 text-white font-rajdhani text-lg focus:border-[#75feed] focus:outline-none focus:ring-1 focus:ring-[#75feed] transition-all"
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-orbitron text-xs text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <User className="w-3 h-3 text-[#fc029b]" /> Nom
                  </label>
                  <input 
                    type="text" 
                    required
                    className="w-full bg-[#020202] border border-gray-800 p-3 text-white font-rajdhani text-lg focus:border-[#fc029b] focus:outline-none focus:ring-1 focus:ring-[#fc029b] transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-orbitron text-xs text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Mail className="w-3 h-3 text-[#75feed]" /> Adresse Email
                </label>
                <input 
                  type="email" 
                  required
                  className="w-full bg-[#020202] border border-gray-800 p-3 text-white font-rajdhani text-lg focus:border-[#75feed] focus:outline-none focus:ring-1 focus:ring-[#75feed] transition-all"
                  placeholder="john.doe@network.com"
                />
              </div>

              <div className="space-y-2">
                <label className="font-orbitron text-xs text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <MessageSquare className="w-3 h-3 text-[#fc029b]" /> Message
                </label>
                <textarea 
                  required
                  rows={5}
                  className="w-full bg-[#020202] border border-gray-800 p-3 text-white font-rajdhani text-lg focus:border-[#fc029b] focus:outline-none focus:ring-1 focus:ring-[#fc029b] transition-all resize-none"
                  placeholder="Entrez vos données ici..."
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full relative group/btn block"
              >
                <div className="relative px-8 py-4 bg-[#050505]/60 backdrop-blur-md border border-[#75feed] overflow-hidden flex items-center justify-center transition-all duration-300 hover:border-[#fc029b]">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#75feed] to-[#fc029b] opacity-10 group-hover/btn:opacity-20 transition-opacity duration-300" />
                  <span className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#75feed] to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-in-out" />
                  <span className="absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-l from-transparent via-[#fc029b] to-transparent translate-x-full group-hover/btn:-translate-x-full transition-transform duration-1000 ease-in-out" />
                  <span className="absolute inset-0 bg-gradient-to-r from-[#75feed]/20 to-[#fc029b]/20 translate-y-[100%] group-hover/btn:translate-y-0 transition-transform duration-300 ease-in-out" />
                  <div className="relative z-10 flex items-center justify-center space-x-3 text-white font-orbitron font-bold tracking-[0.2em] uppercase text-lg">
                    <Send className="w-5 h-5 text-[#75feed] group-hover/btn:text-[#fc029b] group-hover/btn:animate-pulse transition-colors" />
                    <span className="group-hover/btn:text-glow-pink transition-all">
                      Envoyer
                    </span>
                  </div>
                </div>
              </button>
            </form>
          </motion.div>

          {/* Informations ou Visuel secondaire */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col justify-center"
          >
             <div className="relative aspect-square sm:aspect-video w-full border border-gray-800 bg-[#050505] overflow-hidden group">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(117,254,237,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(117,254,237,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-30 group-hover:opacity-50 transition-opacity" />
                <img 
                  src="https://images.unsplash.com/photo-1558470598-a5fd90cb26fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxjeWJlcnB1bmt8ZW58MXx8fHwxNzc4NzIwNjQwfDA&ixlib=rb-4.1.0&q=80&w=1080" 
                  alt="Dystopsy Element Contact" 
                  className="w-full h-full object-cover filter grayscale opacity-60 mix-blend-luminosity group-hover:filter-none group-hover:opacity-80 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/50 to-transparent" />
                
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <h3 className="font-orbitron font-black text-2xl text-white uppercase tracking-widest mb-4">
                    QG Dystopsy
                  </h3>
                  <div className="space-y-3 font-rajdhani text-gray-400">
                    <p className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-[#75feed]" />
                      <span>contact@dystopsyelement.com</span>
                    </p>
                    <p className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-[#fc029b]" />
                      <span>+33 1 23 45 67 89</span>
                    </p>
                  </div>
                </div>
             </div>
          </motion.div>

        </div>
      </section>

      <CyberSeparator variant={2} color="cyan" direction="right" />

      {/* L'Équipe / Team Members */}
      <section className="py-24 relative z-10 bg-[#020202]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="mb-16 text-center">
            <h2 className="font-orbitron text-4xl md:text-5xl font-black text-white uppercase tracking-wider mb-4 flex items-center justify-center space-x-4">
              <span className="w-12 h-1 bg-[#fc029b]"></span>
              <span>L'Équipe_</span>
              <span className="w-12 h-1 bg-[#75feed]"></span>
            </h2>
            <p className="font-rajdhani text-xl text-gray-400 max-w-2xl mx-auto">
              Les agents derrière Dystopsy Element.
            </p>
          </div>

          <div className="flex justify-center mb-16 overflow-x-auto pb-4">
            <div
              className="inline-flex p-1 border border-gray-800 bg-[#050505]/80 backdrop-blur-md relative whitespace-nowrap"
              style={{
                clipPath:
                  "polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)",
              }}
            >
              {TEAMS.map((team) => (
                <button
                  key={team}
                  onClick={() => setActiveTeam(team)}
                  className={`relative px-6 py-3 font-orbitron font-bold uppercase tracking-wider transition-all duration-300 z-10 text-sm sm:text-base ${
                    activeTeam === team
                      ? "text-white"
                      : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  {team}
                  {activeTeam === team && (
                    <motion.div
                      layoutId="activeTeam"
                      className="absolute inset-0 border border-[#75feed] bg-[#75feed]/10 z-[-1]"
                      style={{
                        clipPath:
                          "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          <motion.div 
            key={activeTeam}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {displayedMembers.map((member, idx) => (
              <motion.button
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                onClick={() => setSelectedMember(member)}
                className="group cursor-pointer flex flex-col relative w-full h-full focus:outline-none bg-[#050505] border border-gray-800 hover:border-[#75feed] transition-all duration-300"
              >
                <div className="relative aspect-square w-full shrink-0 overflow-hidden border-b border-gray-800">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#75feed]/20 to-transparent translate-y-[-100%] group-hover:animate-[scan_2s_ease-in-out_infinite] z-20 pointer-events-none" />
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="relative z-10 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 grayscale opacity-70 group-hover:opacity-100 group-hover:grayscale-0"
                  />
                  <div className="absolute top-0 left-0 z-30 bg-[#050505]/90 backdrop-blur-sm px-3 py-1 border-b border-r border-gray-800">
                    <span className="font-orbitron text-[10px] font-bold uppercase tracking-widest text-[#75feed]">
                      {member.role.split(' ')[0]}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex flex-col items-center justify-center flex-grow w-full text-center relative z-10">
                  <h3 className="font-orbitron text-lg font-black text-white group-hover:text-[#75feed] transition-colors uppercase tracking-tight mb-2 line-clamp-1 w-full">
                    {member.name}
                  </h3>
                  <p className="font-rajdhani text-gray-400 text-xs sm:text-sm uppercase tracking-widest flex items-center justify-center space-x-2 w-full">
                    <Briefcase className="w-3 h-3 text-[#fc029b] shrink-0" />
                    <span className="line-clamp-2">{member.role}</span>
                  </p>
                </div>

                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#75feed] z-20 transition-all duration-300 group-hover:w-6 group-hover:h-6" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#fc029b] z-20 transition-all duration-300 group-hover:w-6 group-hover:h-6" />
                <div className="absolute inset-0 bg-[#75feed]/0 group-hover:bg-[#75feed]/5 transition-colors duration-300 pointer-events-none" />
              </motion.button>
            ))}
          </motion.div>

          {displayedMembers.length === 0 && (
            <div className="text-center py-10">
              <p className="font-orbitron text-xl text-gray-500 uppercase tracking-widest">
                Aucun agent trouvé dans cette section.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* MODAL POUR LES MEMBRES DE L'ÉQUIPE (similaire à EventDetail) */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            key="member-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.3 } }}
            exit={{ opacity: 0, transition: { delay: 0.4, duration: 0.3 } }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          >
            <div
              className="absolute inset-0 bg-[#020202]/90 backdrop-blur-xl"
              onClick={() => setSelectedMember(null)}
            />

            <motion.div
              initial={{
                clipPath: "inset(50% 50% 50% 50%)",
                boxShadow: "0 0 0px rgba(117,254,237,0)",
              }}
              animate={{
                clipPath: [
                  "inset(50% 50% 50% 50%)",
                  "inset(49.8% 0% 49.8% 0%)",
                  "inset(0% 0% 0% 0%)",
                ],
                boxShadow: [
                  "0 0 0px rgba(117,254,237,0)",
                  "0 0 100px rgba(117,254,237,1)",
                  "0 0 40px rgba(0,0,0,0.8)",
                ],
              }}
              exit={{
                clipPath: [
                  "inset(0% 0% 0% 0%)",
                  "inset(49.8% 0% 49.8% 0%)",
                  "inset(50% 50% 50% 50%)",
                ],
                boxShadow: [
                  "0 0 40px rgba(0,0,0,0.8)",
                  "0 0 100px rgba(252,2,155,1)",
                  "0 0 0px rgba(252,2,155,0)",
                ],
              }}
              transition={{
                duration: 0.6,
                times: [0, 0.4, 1],
                ease: "easeInOut",
              }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-[#050505] border border-gray-800 flex flex-col md:flex-row overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#75feed] z-20 pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#fc029b] z-20 pointer-events-none" />

              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 z-50 text-gray-400 hover:text-[#fc029b] transition-colors p-2 bg-[#020202]/80 border border-gray-800 hover:border-[#fc029b]/50 backdrop-blur-md"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="w-full h-[30vh] md:h-auto md:w-2/5 shrink-0 relative">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(117,254,237,0.2)_1px,transparent_1px)] bg-[size:4px_4px] mix-blend-overlay z-20 pointer-events-none" />
                <img
                  src={selectedMember.photo}
                  alt={selectedMember.name}
                  className="absolute inset-0 w-full h-full object-cover grayscale mix-blend-luminosity filter contrast-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10" />
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#75feed] via-[#fc029b] to-[#75feed] z-30" />
              </div>

              <div className="w-full md:w-3/5 p-6 sm:p-8 md:p-12 relative flex flex-col overflow-y-auto">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#75feed]/5 blur-[100px] pointer-events-none" />

                <div className="mb-6 relative z-10">
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="font-orbitron text-xs font-bold uppercase tracking-widest px-3 py-1 bg-[#050505] border border-[#75feed]/30 text-[#75feed]">
                      Membre
                    </span>
                    <span className="font-rajdhani text-gray-400 text-sm uppercase tracking-widest">
                      Agent Dystopsy
                    </span>
                  </div>

                  <h2 className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-2 break-words">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                      {selectedMember.name}
                    </span>
                  </h2>
                  <p className="font-rajdhani text-[#fc029b] text-xl uppercase tracking-widest flex items-center space-x-2">
                    <Zap className="w-5 h-5 text-[#75feed]" />
                    <span>{selectedMember.role}</span>
                  </p>
                </div>

                <div className="font-rajdhani text-gray-300 text-lg mb-8 leading-relaxed">
                  <p>{selectedMember.bio}</p>
                  
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-[#75feed]" />
                      <a href={`mailto:${selectedMember.email}`} className="hover:text-[#75feed] transition-colors hover:underline underline-offset-4 decoration-[#75feed]/50">
                        {selectedMember.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-[#fc029b]" />
                      <a href={`tel:${selectedMember.phone.replace(/\s+/g, '')}`} className="hover:text-[#fc029b] transition-colors hover:underline underline-offset-4 decoration-[#fc029b]/50">
                        {selectedMember.phone}
                      </a>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {selectedMember.skills.map((skill) => (
                      <span key={skill} className="px-2 py-1 bg-[#020202] border border-gray-800 text-xs font-orbitron uppercase text-gray-400">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-auto relative z-10 shrink-0">
                  <a
                    href={`mailto:${selectedMember.email}`}
                    className="group/mail relative flex-1 bg-[#020202] border border-gray-800 overflow-hidden flex items-center justify-center py-4 transition-colors"
                  >
                    <span className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#75feed] to-transparent -translate-x-full group-hover/mail:translate-x-full transition-transform duration-1000 ease-in-out" />
                    <span className="absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-l from-transparent via-[#75feed] to-transparent translate-x-full group-hover/mail:-translate-x-full transition-transform duration-1000 ease-in-out" />
                    <span className="absolute inset-0 bg-[#75feed]/10 translate-y-[100%] group-hover/mail:translate-y-0 transition-transform duration-300 ease-in-out" />
                    <div className="relative z-10 flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-gray-400 group-hover/mail:text-[#75feed] transition-colors" />
                      <span className="font-orbitron text-sm font-bold uppercase tracking-widest text-gray-300 group-hover/mail:text-glow-cyan group-hover/mail:text-white transition-all">
                        Contacter
                      </span>
                    </div>
                  </a>

                  <a
                    href={selectedMember.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group/ig relative flex-1 bg-[#020202] border border-gray-800 overflow-hidden flex items-center justify-center py-4 transition-colors"
                  >
                    <span className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#fc029b] to-transparent -translate-x-full group-hover/ig:translate-x-full transition-transform duration-1000 ease-in-out" />
                    <span className="absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-l from-transparent via-[#fc029b] to-transparent translate-x-full group-hover/ig:-translate-x-full transition-transform duration-1000 ease-in-out" />
                    <span className="absolute inset-0 bg-[#fc029b]/10 translate-y-[100%] group-hover/ig:translate-y-0 transition-transform duration-300 ease-in-out" />
                    <div className="relative z-10 flex items-center space-x-3">
                      <Instagram className="w-5 h-5 text-gray-400 group-hover/ig:text-[#fc029b] transition-colors" />
                      <span className="font-orbitron text-sm font-bold uppercase tracking-widest text-gray-300 group-hover/ig:text-glow-pink group-hover/ig:text-white transition-all">
                        Instagram
                      </span>
                    </div>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan { 0% { transform: translateY(-100%); } 50% { transform: translateY(100%); } 100% { transform: translateY(-100%); } }
      `}} />
    </div>
  );
}
