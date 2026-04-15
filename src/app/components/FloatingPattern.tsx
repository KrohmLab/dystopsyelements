import { motion } from "motion/react";

interface FloatingPatternProps {
  variant?: 1 | 2 | 3 | 4;
  color?: "cyan" | "pink";
  className?: string;
  delay?: number;
}

export function FloatingPattern({ variant = 1, color = "cyan", className = "", delay = 0 }: FloatingPatternProps) {
  const isCyan = color === "cyan";
  const hexColor = isCyan ? "#75feed" : "#fc029b";
  const filterClass = isCyan 
    ? "drop-shadow-[0_0_20px_rgba(117,254,237,0.4)]" 
    : "drop-shadow-[0_0_20px_rgba(252,2,155,0.4)]";

  const renderTechShape = () => {
    switch(variant) {
      case 1:
        return (
          <svg viewBox="0 0 100 100" fill="none" stroke={hexColor} strokeWidth="2" className="w-full h-full opacity-30">
            <circle cx="50" cy="50" r="40" strokeDasharray="10 5 2 5" />
            <circle cx="50" cy="50" r="30" strokeDasharray="5 20" strokeWidth="4" />
            <path d="M50 0L50 20M50 80L50 100M0 50L20 50M80 50L100 50" />
            <rect x="45" y="45" width="10" height="10" fill={hexColor} />
          </svg>
        );
      case 2:
        return (
          <svg viewBox="0 0 100 100" fill="none" stroke={hexColor} strokeWidth="1.5" className="w-full h-full opacity-30">
            <polygon points="50,10 85,30 85,70 50,90 15,70 15,30" strokeDasharray="10 5" />
            <polygon points="50,25 70,38 70,62 50,75 30,62 30,38" />
            <circle cx="50" cy="50" r="5" fill={hexColor} />
            <path d="M50 10L50 25M85 30L70 38M85 70L70 62M50 90L50 75M15 70L30 62M15 30L30 38" />
          </svg>
        );
      case 3:
        return (
          <svg viewBox="0 0 100 100" fill="none" stroke={hexColor} strokeWidth="2" className="w-full h-full opacity-30">
            <path d="M10 90L40 60H60L90 30" />
            <path d="M10 10L30 30V60L60 90" />
            <circle cx="10" cy="90" r="4" fill={hexColor} />
            <circle cx="40" cy="60" r="3" fill={hexColor} />
            <circle cx="60" cy="60" r="3" fill={hexColor} />
            <circle cx="90" cy="30" r="4" fill={hexColor} />
            <circle cx="10" cy="10" r="4" fill={hexColor} />
            <circle cx="30" cy="30" r="3" fill={hexColor} />
            <circle cx="60" cy="90" r="4" fill={hexColor} />
            <rect x="70" y="70" width="20" height="20" strokeDasharray="4 2" />
            <rect x="75" y="75" width="10" height="10" fill={hexColor} opacity="0.5"/>
          </svg>
        );
      case 4:
        return (
          <svg viewBox="0 0 100 100" fill={hexColor} className="w-full h-full opacity-20">
            <rect x="10" y="10" width="5" height="80" />
            <rect x="20" y="10" width="15" height="80" />
            <rect x="40" y="10" width="2" height="80" />
            <rect x="45" y="10" width="8" height="80" />
            <rect x="60" y="10" width="20" height="80" />
            <rect x="85" y="10" width="5" height="80" />
            <rect x="0" y="30" width="100" height="5" fill="#020202" />
            <rect x="0" y="60" width="100" height="8" fill="#020202" />
            <rect x="0" y="75" width="100" height="2" fill="#020202" />
          </svg>
        );
    }
  }

  return (
    <motion.div 
      className={`absolute pointer-events-none z-0 ${className} ${filterClass} mix-blend-screen`}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 5, -5, 0],
        scale: [1, 1.05, 1]
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay
      }}
    >
      {renderTechShape()}

      {/* Glitch burst */}
      <motion.div
        className={`absolute inset-0 w-full h-full text-white mix-blend-overlay`}
        animate={{
          x: [-10, 10, -10, 0],
          opacity: [0, 1, 1, 0],
          scale: [1, 1.1, 1, 1],
          filter: ["hue-rotate(0deg)", "hue-rotate(90deg)", "hue-rotate(-90deg)", "hue-rotate(0deg)"]
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 4 + delay // Randomize based on delay
        }}
      >
        {renderTechShape()}
      </motion.div>
    </motion.div>
  );
}