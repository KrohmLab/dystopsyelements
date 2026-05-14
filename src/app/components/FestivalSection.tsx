import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
} from "motion/react";
import { Disc, Zap, Headphones, Radio } from "lucide-react";
import { FloatingPattern } from "./FloatingPattern";
import { ImageWithFallback } from "./figma/ImageWithFallback";

import festivalImage from "../../imports/nexen_jour.jpg";

type Scene = {
  tag: string;
  title: React.ReactNode;
  body: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: "cyan" | "pink";
};

const SCENES: Scene[] = [
  {
    tag: "// INIT.SEQUENCE",
    title: (
      <>
        BIENVENUE DANS <span className="highlight">LA MATRICE</span>
      </>
    ),
    body: "Dystopsy Element n'est pas une association — c'est un protocole. Un mouvement voué à l'expansion des consciences par la musique électronique underground.",
    icon: Radio,
    accent: "pink",
  },
  {
    tag: "// LAYER.01 — SONIC",
    title: (
      <>
        MUSIQUE <span className="highlight">ALTERNATIVE</span>
      </>
    ),
    body: "Des line-ups pointus où Psytrance et Techno fusionnent avec l'esthétique cyberpunk. Talents émergents et figures emblématiques de l'underground convergent ici.",
    icon: Disc,
    accent: "cyan",
  },
  {
    tag: "// LAYER.02 — VISUAL",
    title: (
      <>
        SCÉNOGRAPHIE <span className="highlight">IMMERSIVE</span>
      </>
    ),
    body: "Décors sci-fi, mapping vidéo et installations lasers transforment l'espace en univers parallèle. Chaque événement est une réalité augmentée à vivre.",
    icon: Zap,
    accent: "pink",
  },
  {
    tag: "// LAYER.03 — FREQUENCY",
    title: (
      <>
        SYSTÈME SON <span className="highlight">DÉVASTATEUR</span>
      </>
    ),
    body: "Une clarté sonore chirurgicale. Ressentez chaque fréquence au plus profond de vous-même — là où la musique cesse d'être écoutée pour devenir une expérience corporelle.",
    icon: Headphones,
    accent: "cyan",
  },
];

const TOTAL = SCENES.length;

export function FestivalSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [active, setActive] = useState(0);
  const [flashKey, setFlashKey] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const clamped = Math.max(0, Math.min(0.9999, v));
    const idx = Math.min(TOTAL - 1, Math.floor(clamped * TOTAL));
    setActive((prev) => {
      if (prev !== idx) {
        setFlashKey((k) => k + 1);
        return idx;
      }
      return prev;
    });
  });

  const scene = SCENES[active];
  const accentColor = scene.accent === "cyan" ? "#75feed" : "#fc029b";

  // Background motion values
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.15, 1.02]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  const scanlineY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={containerRef}
      className="relative bg-[#020202]"
      style={{ height: `calc((var(--vh, 1vh) * 100) + ${TOTAL * 65}vh)` }}
    >
      <div className="sticky top-0 h-[calc(var(--vh,1vh)*100)] w-full overflow-hidden">
        {/* Background image with parallax */}
        <motion.div
          style={{ scale: bgScale, y: bgY, filter: "grayscale(0.6) saturate(1.2) contrast(1.1)" }}
          className="absolute inset-0 will-change-transform"
        >
          <ImageWithFallback
            src={festivalImage}
            alt="Dystopsy Element"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Theme color overlay harmonized with active scene */}
        <motion.div
          className="absolute inset-0 pointer-events-none mix-blend-color"
          animate={{ backgroundColor: accentColor }}
          initial={false}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{ opacity: 0.4 }}
        />

        {/* Background pulse on scene change */}
        <AnimatePresence>
          <motion.div
            key={`pulse-${flashKey}`}
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: [0, 0.5, 0], scale: [1, 1.05, 1.02] }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="absolute inset-0 pointer-events-none mix-blend-screen"
            style={{
              background: `radial-gradient(circle at center, ${accentColor}40 0%, transparent 60%)`,
            }}
          />
        </AnimatePresence>

        {/* Darkening gradients for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#020202]/95 via-[#020202]/70 to-[#020202]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-[#020202]/70" />

        {/* TV Static Noise Glitch Effect on slide change */}
        <AnimatePresence>
          <motion.div
            key={`static-${flashKey}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.15, 0.05, 0.1, 0] }}
            transition={{ duration: 0.5, times: [0, 0.2, 0.4, 0.6, 1] }}
            className="absolute inset-0 pointer-events-none z-10 mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xNSIvPjxwYXRoIGQ9Ik0wIDBoNHYxSDB6bTAgMmg0djFIMHoiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4yNSIvPjwvc3ZnPg==')]"
          />
        </AnimatePresence>

        {/* Floating patterns */}
        <FloatingPattern
          variant={1}
          color="cyan"
          className="w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] -right-20 -top-20 opacity-20"
          delay={0}
        />
        <FloatingPattern
          variant={2}
          color="pink"
          className="w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] -left-20 -bottom-20 opacity-20"
          delay={2}
        />

        {/* Static scanlines */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_3px,rgba(255,255,255,0.03)_3px,rgba(255,255,255,0.03)_4px)] pointer-events-none" />

        {/* Moving horizontal scanline */}
        <motion.div
          style={{ top: scanlineY }}
          className="absolute left-0 right-0 h-[2px] pointer-events-none z-10"
        >
          <motion.div 
            className="w-full h-full"
            animate={{ background: `linear-gradient(90deg, transparent, ${accentColor}80, transparent)` }}
            transition={{ duration: 0.8 }}
          />
        </motion.div>

        {/* RGB ghost layers on transition */}
        <AnimatePresence>
          <motion.div
            key={`rgb1-${flashKey}`}
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: [0, 0.4, 0], x: [0, -8, 0] }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 mix-blend-screen pointer-events-none"
          >
            <ImageWithFallback
              src={festivalImage}
              alt=""
              className="w-full h-full object-cover"
              style={{ filter: "hue-rotate(90deg) saturate(2)" }}
            />
          </motion.div>
          <motion.div
            key={`rgb2-${flashKey}`}
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: [0, 0.4, 0], x: [0, 8, 0] }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 mix-blend-screen pointer-events-none"
          >
            <ImageWithFallback
              src={festivalImage}
              alt=""
              className="w-full h-full object-cover"
              style={{ filter: "hue-rotate(270deg) saturate(2)" }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Glitch flash on scene transition (darkened) */}
        <AnimatePresence>
          <motion.div
            key={`flash-${flashKey}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.2, 0, 0.1, 0] }}
            transition={{ duration: 0.45, times: [0, 0.1, 0.3, 0.5, 1] }}
            className="absolute inset-0 pointer-events-none z-30"
            style={{
              background: `linear-gradient(90deg, transparent 0%, ${accentColor}30 50%, transparent 100%)`,
            }}
          />
        </AnimatePresence>

        {/* Top/bottom HUD */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 sm:px-8 py-3 sm:py-4 z-20 pointer-events-none">
          <span 
            className="font-orbitron text-[10px] sm:text-xs tracking-[0.3em] transition-colors duration-500" 
            style={{ color: accentColor }}
          >
            DYSTOPSY.ELEMENT
          </span>
          <span className="font-rajdhani text-gray-400 text-[10px] sm:text-xs">
            SYS.ACTIVE
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-4 sm:px-8 py-3 sm:py-4 z-20 pointer-events-none">
          <span className="font-rajdhani text-gray-400 text-[10px] sm:text-xs hidden sm:block">
            SCROLL.TO.CONTINUE ↓
          </span>
          <span
            className="font-orbitron text-[10px] sm:text-xs tracking-[0.3em] ml-auto transition-colors duration-500"
            style={{ color: accentColor }}
          >
            REC ●
          </span>
        </div>

        {/* Scene content — only one active at a time */}
        <div className="relative z-10 h-full flex items-center justify-center px-6 sm:px-10 lg:px-16">
          <div className="max-w-3xl w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: -30, filter: "blur(8px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: 30, filter: "blur(8px)" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <SceneContent
                  scene={scene}
                  index={active}
                  accentColor={accentColor}
                  flashKey={flashKey}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center space-y-3 sm:space-y-4">
          {SCENES.map((_, i) => {
            const isActive = i === active;
            const itemAccent = SCENES[i].accent === "cyan" ? "#75feed" : "#fc029b";
            return (
              <motion.div
                key={i}
                animate={{
                  opacity: isActive ? 1 : 0.3,
                  scale: isActive ? 1.4 : 1,
                  borderColor: isActive ? itemAccent : `${itemAccent}60`,
                  backgroundColor: isActive ? `${itemAccent}50` : "transparent",
                }}
                transition={{ duration: 0.3 }}
                className="w-2 h-2 sm:w-2.5 sm:h-2.5 border transition-colors duration-500"
              />
            );
          })}
          <div className="relative w-px h-24 sm:h-32 bg-white/10 mt-2">
            <motion.div
              style={{ scaleY: progressScale, transformOrigin: "top" }}
              className="absolute inset-0 bg-gradient-to-b from-[#75feed] to-[#fc029b]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function SceneContent({
  scene,
  index,
  accentColor,
  flashKey,
}: {
  scene: Scene;
  index: number;
  accentColor: string;
  flashKey: number;
}) {
  const Icon = scene.icon;

  return (
    <div style={{ "--scene-accent": accentColor } as React.CSSProperties}>
      <style>{`
        .highlight {
          color: var(--scene-accent);
          text-shadow: 0 0 8px var(--scene-accent), 0 0 16px var(--scene-accent);
        }
      `}</style>
      
      {/* Tag line */}
      <div className="flex items-center space-x-3 mb-4 sm:mb-6">
        <span className="h-px w-8 sm:w-12 transition-colors duration-500" style={{ backgroundColor: accentColor }} />
        <span
          className="font-orbitron text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase transition-colors duration-500"
          style={{ color: accentColor }}
        >
          {scene.tag}
        </span>
        <span className="font-rajdhani text-gray-400 text-[10px] sm:text-xs ml-auto">
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(TOTAL).padStart(2, "0")}
        </span>
      </div>

      {/* Title panel with backdrop for readability */}
      <div className="relative mb-12 sm:mb-16">
        <div
          className="absolute -inset-4 sm:-inset-6 border-[1.5px] pointer-events-none transition-colors duration-500"
          style={{
            borderColor: `${accentColor}80`,
            boxShadow: `inset 0 0 20px ${accentColor}10, 0 0 20px ${accentColor}20`,
            clipPath:
              "polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)",
          }}
        />
        <div
          className="absolute -inset-4 sm:-inset-6 bg-black/60 backdrop-blur-md pointer-events-none transition-colors duration-500"
          style={{
            clipPath:
              "polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)",
          }}
        />
        
        {/* Frame corner accents */}
        <div
          className="absolute -top-4 -left-4 w-4 h-4 sm:w-6 sm:h-6 border-t-[3px] border-l-[3px] transition-colors duration-500"
          style={{ borderColor: accentColor }}
        />
        <div
          className="absolute -bottom-4 -right-4 w-4 h-4 sm:w-6 sm:h-6 border-b-[3px] border-r-[3px] transition-colors duration-500"
          style={{ borderColor: accentColor }}
        />

        <div className="relative flex items-center gap-5 sm:gap-8 p-2 sm:p-4">
          <div
            className="flex shrink-0 p-3 sm:p-4 border-[1.5px] bg-black/80 transition-all duration-500"
            style={{ 
              borderColor: `${accentColor}AA`, 
              color: accentColor,
              boxShadow: `0 0 15px ${accentColor}40, inset 0 0 15px ${accentColor}40`
            }}
          >
            <Icon className="w-6 h-6 sm:w-8 sm:h-8 drop-shadow-[0_0_8px_currentColor]" />
          </div>
          <motion.h3
            key={`title-glitch-${flashKey}`}
            initial={{ x: 0 }}
            animate={{ x: [-4, 4, -2, 0] }}
            transition={{ duration: 0.3 }}
            style={{ 
              textShadow: `0 0 12px ${accentColor}40, 0 2px 4px rgba(0,0,0,0.8)` 
            }}
            className="font-orbitron text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-black leading-tight tracking-wide uppercase"
          >
            {scene.title}
          </motion.h3>
        </div>
      </div>

      {/* Body text on dark backdrop */}
      <div className="relative max-w-2xl mt-8 sm:mt-12">
        <div className="absolute -inset-x-4 -inset-y-4 bg-black/40 backdrop-blur-sm pointer-events-none border-l-2 transition-colors duration-500" style={{ borderColor: `${accentColor}60` }} />
        <p
          className="relative font-rajdhani text-gray-100 text-lg sm:text-xl md:text-2xl leading-relaxed px-2 py-2"
          style={{ textShadow: "0 2px 4px rgba(0,0,0,1)" }}
        >
          {scene.body}
        </p>
      </div>

      <div className="mt-6 sm:mt-8 flex items-center space-x-3">
        <span
          className="font-orbitron text-[10px] sm:text-xs tracking-widest"
          style={{ color: accentColor }}
        >
          SIGNAL.LOCKED
        </span>
        <span className="font-rajdhani text-gray-300 text-[10px] sm:text-xs">
          FREQ: {142 + index * 7}.BPM
        </span>
      </div>
    </div>
  );
}
