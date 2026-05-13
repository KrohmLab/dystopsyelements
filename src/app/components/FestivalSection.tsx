import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
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
        BIENVENUE DANS{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#75feed] to-[#fc029b]">
          LA MATRICE
        </span>
      </>
    ),
    body: "Dystopsy Element n'est pas une association — c'est un protocole. Un mouvement voué à l'expansion des consciences par la musique électronique underground.",
    icon: Radio,
    accent: "cyan",
  },
  {
    tag: "// LAYER.01 — SONIC",
    title: (
      <>
        MUSIQUE{" "}
        <span className="text-[#75feed]">ALTERNATIVE</span>
      </>
    ),
    body: "Des line-ups pointus, où Psytrance et Techno fusionnent avec l'esthétique cyberpunk. Talents émergents et figures emblématiques de l'underground convergent ici.",
    icon: Disc,
    accent: "cyan",
  },
  {
    tag: "// LAYER.02 — VISUAL",
    title: (
      <>
        SCÉNOGRAPHIE{" "}
        <span className="text-[#fc029b]">IMMERSIVE</span>
      </>
    ),
    body: "Décors sci-fi, mapping vidéo et installations lasers transforment l'espace en un univers parallèle. Chaque événement est une réalité augmentée à vivre.",
    icon: Zap,
    accent: "pink",
  },
  {
    tag: "// LAYER.03 — FREQUENCY",
    title: (
      <>
        SYSTÈME SON{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fc029b] to-[#75feed]">
          DÉVASTATEUR
        </span>
      </>
    ),
    body: "Une clarté sonore chirurgicale. Ressentez chaque fréquence au plus profond de vous-même — là où la musique cesse d'être écoutée pour devenir une expérience corporelle.",
    icon: Headphones,
    accent: "cyan",
  },
];

function ScenePanel({
  scene,
  index,
  total,
  progress,
}: {
  scene: Scene;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const step = 1 / total;
  const start = index * step;
  const end = start + step;
  const fadeIn = start + step * 0.25;
  const fadeOut = end - step * 0.25;

  const isFirst = index === 0;
  const isLast = index === total - 1;

  const opacity = useTransform(
    progress,
    [start, fadeIn, fadeOut, end],
    [isFirst ? 1 : 0, 1, 1, isLast ? 1 : 0]
  );
  const y = useTransform(
    progress,
    [start, fadeIn, fadeOut, end],
    [isFirst ? 0 : 40, 0, 0, isLast ? 0 : -40]
  );
  const skew = useTransform(
    progress,
    [start, fadeIn, fadeOut, end],
    [isFirst ? 0 : 6, 0, 0, isLast ? 0 : -6]
  );

  const Icon = scene.icon;
  const accentColor = scene.accent === "cyan" ? "#75feed" : "#fc029b";

  return (
    <motion.div
      style={{ opacity, y, skewX: skew }}
      className="absolute inset-0 flex items-center justify-center px-6 sm:px-10 lg:px-16 pointer-events-none"
    >
      <div className="max-w-3xl w-full">
        <div className="flex items-center space-x-3 mb-4 sm:mb-6">
          <span
            className="h-px w-8 sm:w-12"
            style={{ backgroundColor: accentColor }}
          />
          <span
            className="font-orbitron text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase"
            style={{ color: accentColor }}
          >
            {scene.tag}
          </span>
          <span className="font-rajdhani text-gray-500 text-[10px] sm:text-xs ml-auto">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>

        <div className="relative mb-6 sm:mb-8">
          <div
            className="absolute -inset-3 sm:-inset-4 border opacity-30 pointer-events-none"
            style={{
              borderColor: accentColor,
              clipPath:
                "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)",
            }}
          />
          <div
            className="absolute -top-2 -left-2 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-l-2"
            style={{ borderColor: accentColor }}
          />
          <div
            className="absolute -bottom-2 -right-2 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-r-2"
            style={{ borderColor: accentColor }}
          />

          <div className="flex items-start gap-4 sm:gap-6 p-4 sm:p-6">
            <div
              className="hidden sm:flex shrink-0 p-3 border bg-black/60 backdrop-blur-sm"
              style={{ borderColor: `${accentColor}80`, color: accentColor }}
            >
              <Icon className="w-6 h-6" />
            </div>
            <h3 className="font-orbitron text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-black leading-tight">
              {scene.title}
            </h3>
          </div>
        </div>

        <p className="font-rajdhani text-gray-200 text-lg sm:text-xl md:text-2xl leading-relaxed max-w-2xl">
          {scene.body}
        </p>

        <div className="mt-6 sm:mt-8 flex items-center space-x-3">
          <span
            className="font-orbitron text-[10px] sm:text-xs tracking-widest"
            style={{ color: accentColor }}
          >
            SIGNAL.LOCKED
          </span>
          <span className="font-rajdhani text-gray-500 text-[10px] sm:text-xs">
            FREQ: {142 + index * 7}.BPM
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export function FestivalSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const total = SCENES.length;

  const bgScale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);
  const bgHue = useTransform(scrollYProgress, [0, 0.5, 1], [0, 60, 0]);
  const bgFilter = useTransform(
    bgHue,
    (h) => `grayscale(0.6) hue-rotate(${h}deg) saturate(1.3)`
  );

  const scanlineY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={containerRef}
      className="relative bg-[#020202]"
      style={{ height: `${total * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background image with parallax + filter shift */}
        <motion.div
          style={{ scale: bgScale, y: bgY, filter: bgFilter }}
          className="absolute inset-0"
        >
          <ImageWithFallback
            src={festivalImage}
            alt="Dystopsy Element"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Dark gradient overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#020202] via-[#020202]/80 to-[#020202]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-[#020202]/60" />

        {/* Glitch RGB ghost layers */}
        <motion.div
          style={{ scale: bgScale, y: bgY }}
          className="absolute inset-0 mix-blend-screen opacity-20 pointer-events-none"
        >
          <ImageWithFallback
            src={festivalImage}
            alt=""
            className="w-full h-full object-cover translate-x-[2px] -translate-y-[1px]"
            style={{ filter: "hue-rotate(90deg) saturate(2)" }}
          />
        </motion.div>
        <motion.div
          style={{ scale: bgScale, y: bgY }}
          className="absolute inset-0 mix-blend-screen opacity-20 pointer-events-none"
        >
          <ImageWithFallback
            src={festivalImage}
            alt=""
            className="w-full h-full object-cover -translate-x-[2px] translate-y-[1px]"
            style={{ filter: "hue-rotate(270deg) saturate(2)" }}
          />
        </motion.div>

        {/* Floating Animated Patterns */}
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

        {/* Scanlines */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_3px,rgba(117,254,237,0.04)_3px,rgba(117,254,237,0.04)_4px)] pointer-events-none" />

        {/* Moving horizontal scanline */}
        <motion.div
          style={{ top: scanlineY }}
          className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#75feed]/60 to-transparent pointer-events-none"
        />

        {/* Top/bottom HUD bars */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 sm:px-8 py-3 sm:py-4 z-20 pointer-events-none">
          <span className="font-orbitron text-[10px] sm:text-xs text-[#75feed] tracking-[0.3em]">
            DYSTOPSY.ELEMENT
          </span>
          <span className="font-rajdhani text-gray-500 text-[10px] sm:text-xs">
            SYS.ACTIVE
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-4 sm:px-8 py-3 sm:py-4 z-20 pointer-events-none">
          <span className="font-rajdhani text-gray-500 text-[10px] sm:text-xs hidden sm:block">
            SCROLL.TO.CONTINUE ↓
          </span>
          <span className="font-orbitron text-[10px] sm:text-xs text-[#fc029b] tracking-[0.3em] ml-auto">
            REC ●
          </span>
        </div>

        {/* Scene panels */}
        <div className="relative z-10 h-full">
          {SCENES.map((scene, i) => (
            <ScenePanel
              key={i}
              scene={scene}
              index={i}
              total={total}
              progress={scrollYProgress}
            />
          ))}
        </div>

        {/* Right side progress / scene indicator */}
        <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center space-y-3 sm:space-y-4">
          {SCENES.map((_, i) => {
            const step = 1 / total;
            const active = useTransform(
              scrollYProgress,
              [i * step, i * step + step * 0.15, (i + 1) * step - step * 0.15, (i + 1) * step],
              [0.3, 1, 1, 0.3]
            );
            const scale = useTransform(
              scrollYProgress,
              [i * step, i * step + step * 0.15, (i + 1) * step - step * 0.15, (i + 1) * step],
              [1, 1.4, 1.4, 1]
            );
            return (
              <motion.div
                key={i}
                style={{ opacity: active, scale }}
                className="w-2 h-2 sm:w-2.5 sm:h-2.5 border border-[#75feed] bg-[#75feed]/30"
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
