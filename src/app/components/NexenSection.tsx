import { useRef, MouseEvent } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "motion/react";
import { Link } from "react-router";
import { Sparkles, ArrowRight } from "lucide-react";

import logoNexen from "../../imports/Logo-NEXEN.png";
import fondVierge from "../../imports/NXN26---Fond-Vierge-(Carré).jpg";
import ecaillesFull from "../../imports/Ecailles_FULL.jpg";

export function NexenSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const bgX = useTransform(smoothX, [-0.5, 0.5], ["-3%", "3%"]);
  const bgY = useTransform(smoothY, [-0.5, 0.5], ["-3%", "3%"]);

  const orb1X = useTransform(smoothX, [-0.5, 0.5], ["-15%", "15%"]);
  const orb1Y = useTransform(smoothY, [-0.5, 0.5], ["-15%", "15%"]);

  const orb2X = useTransform(smoothX, [-0.5, 0.5], ["15%", "-15%"]);
  const orb2Y = useTransform(smoothY, [-0.5, 0.5], ["15%", "-15%"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const yContent = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]);

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-[80vh] min-h-[600px] overflow-hidden flex items-center justify-center border-y border-[#fc029b]/30 bg-[#020202]"
    >
      {/* Interactive Background Group */}
      <motion.div 
        className="absolute inset-0 z-0 w-[110%] h-[110%] -left-[5%] -top-[5%]"
        style={{ x: bgX, y: bgY }}
      >
        <motion.div className="w-full h-full relative" style={{ y: yParallax }}>
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-60 mix-blend-screen"
            style={{ backgroundImage: `url("${fondVierge}")` }}
          />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
            style={{ backgroundImage: `url("${ecaillesFull}")` }}
          />
        </motion.div>
      </motion.div>

      {/* Cyber Grid & Vignette Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[linear-gradient(rgba(252,2,155,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(252,2,155,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-t from-[#020202] via-transparent to-[#020202]/80" />
      
      {/* Floating Orbs linked to mouse */}
      <motion.div 
        className="absolute w-96 h-96 bg-[#fc029b] rounded-full blur-[150px] opacity-30 pointer-events-none z-0"
        style={{ x: orb1X, y: orb1Y }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute right-0 w-[500px] h-[500px] bg-[#75feed] rounded-full blur-[200px] opacity-20 pointer-events-none z-0"
        style={{ x: orb2X, y: orb2Y }}
        animate={{ scale: [1.2, 1, 1.2] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content Container */}
      <motion.div 
        className="relative z-10 flex flex-col items-center justify-center text-center px-4"
        style={{ y: yContent }}
      >
        {/* Animated Logo */}
        <motion.div
          whileHover={{ scale: 1.05, filter: "drop-shadow(0 0 25px rgba(252, 2, 155, 0.6))" }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="relative mb-12 group cursor-pointer"
        >
          <img 
            src={logoNexen} 
            alt="Nexen Festival Logo" 
            className="w-full max-w-[400px] md:max-w-[600px] h-auto drop-shadow-[0_0_15px_rgba(117,254,237,0.3)] z-10 relative"
          />
          
          {/* Glitch Overlay on Hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none">
            <img src={logoNexen} alt="" className="absolute inset-0 translate-x-2 -translate-y-1 opacity-70 filter hue-rotate-180 mix-blend-screen" />
            <img src={logoNexen} alt="" className="absolute inset-0 -translate-x-2 translate-y-1 opacity-70 filter hue-rotate-[250deg] mix-blend-screen" />
          </div>
        </motion.div>

        {/* CTA Button */}
        <Link to="/festival" className="group">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative px-8 py-4 bg-[#050505]/60 backdrop-blur-md border border-[#fc029b] overflow-hidden"
          >
            {/* Animated Cyber Borders */}
            <span className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#75feed] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
            <span className="absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-l from-transparent via-[#fc029b] to-transparent translate-x-full group-hover:-translate-x-full transition-transform duration-1000 ease-in-out" />
            
            {/* Fill Scanner */}
            <span className="absolute inset-0 bg-[#fc029b]/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />

            <div className="relative z-10 flex items-center space-x-3 text-white font-orbitron font-bold tracking-[0.2em] uppercase">
              <Sparkles className="w-5 h-5 text-[#75feed] group-hover:animate-pulse" />
              <span className="group-hover:text-glow-pink transition-all">Rejoindre le Nexen</span>
              <ArrowRight className="w-5 h-5 text-[#fc029b] group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>
        </Link>
      </motion.div>

      {/* Cyberpunk UI Corner Accents */}
      <div className="absolute top-8 left-8 border-l-2 border-t-2 border-[#75feed] w-8 h-8 opacity-60 z-10 pointer-events-none" />
      <div className="absolute bottom-8 right-8 border-r-2 border-b-2 border-[#fc029b] w-8 h-8 opacity-60 z-10 pointer-events-none" />
      
      {/* Abstract Tech Bars */}
      <div className="absolute top-1/2 left-4 -translate-y-1/2 flex flex-col space-y-2 opacity-40 z-10 pointer-events-none">
        <span className="w-[3px] h-8 bg-[#75feed] shadow-[0_0_8px_#75feed]" />
        <span className="w-[3px] h-4 bg-[#75feed]" />
        <span className="w-[3px] h-12 bg-[#75feed] shadow-[0_0_8px_#75feed]" />
      </div>
      
      <div className="absolute top-1/2 right-4 -translate-y-1/2 flex flex-col items-end space-y-2 opacity-40 z-10 pointer-events-none">
        <div className="font-rajdhani text-[10px] tracking-widest text-[#fc029b] -rotate-90 origin-right translate-x-2 -translate-y-8 absolute right-4 top-[-100px]">NEXEN_OVERRIDE</div>
        <span className="w-[3px] h-12 bg-[#fc029b] shadow-[0_0_8px_#fc029b]" />
        <span className="w-[3px] h-4 bg-[#fc029b]" />
        <span className="w-[3px] h-8 bg-[#fc029b] shadow-[0_0_8px_#fc029b]" />
      </div>
    </section>
  );
}