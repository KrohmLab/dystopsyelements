import { motion } from "motion/react";

interface CyberSeparatorProps {
  variant?: 1 | 2 | 3 | 4;
  color?: "cyan" | "pink";
  direction?: "left" | "right";
}

export function CyberSeparator({ variant = 1, color = "cyan", direction = "left" }: CyberSeparatorProps) {
  const isCyan = color === "cyan";
  const hexColor = isCyan ? "#75feed" : "#fc029b";
  const textClass = isCyan ? "text-[#75feed]" : "text-[#fc029b]";
  const borderClass = isCyan ? "border-[#75feed]" : "border-[#fc029b]";
  const bgClass = isCyan ? "bg-[#75feed]" : "bg-[#fc029b]";

  // Content generators based on variant
  const renderContent = () => {
    switch (variant) {
      case 1:
        return (
          <div className="flex items-center space-x-8 px-4 w-max select-none">
            {Array.from({ length: 8 }).map((_, i) => {
              const terms = [
                "SYS_BOOT::DYSTOPSY", 
                "INIT_NEXEN_FESTIVAL", 
                "LOADING_LINEUP...", 
                "SYNC_BPM:145",
                "CONNECT_MATRIX"
              ];
              const term = terms[i % terms.length];
              return (
              <div key={i} className="flex items-center space-x-8">
                <div className="flex space-x-1 h-12 items-center opacity-80">
                  <div className={`w-1 h-full ${bgClass}`} />
                  <div className={`w-3 h-full ${bgClass}`} />
                  <div className={`w-1 h-full ${bgClass}`} />
                  <div className={`w-0.5 h-full ${bgClass}`} />
                  <div className={`w-2 h-full ${bgClass}`} />
                  <div className={`w-4 h-full ${bgClass}`} />
                  <div className={`w-1 h-full ${bgClass}`} />
                </div>
                <span className={`font-orbitron font-bold text-xl md:text-2xl ${textClass} tracking-[0.3em]`}>
                  {term}_0X{(i * 142 + 8192).toString(16).toUpperCase()}
                </span>
                <div className={`h-1.5 w-16 md:w-24 ${bgClass} opacity-80`} />
              </div>
            )})}
          </div>
        );
      case 2:
        return (
          <div className="flex items-center space-x-8 px-4 w-max select-none">
            {Array.from({ length: 8 }).map((_, i) => {
              const errors = [
                "// WARNING: BASS_OVERLOAD //",
                "// CRITICAL_BEAT_DROP //",
                "// SYSTEM_HACKED_BY_DYSTOPSY //",
                "// ERROR_404: REALITY_NOT_FOUND //"
              ];
              const error = errors[i % errors.length];
              return (
              <div key={i} className="flex items-center space-x-8">
                <div 
                  className={`h-6 w-24 md:w-32 opacity-80`}
                  style={{
                    backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 4px, ${hexColor} 4px, ${hexColor} 8px)`
                  }}
                />
                <span className={`font-orbitron font-black text-xl md:text-2xl ${textClass} tracking-widest`}>
                  {error}
                </span>
                <div 
                  className={`h-6 w-24 md:w-32 opacity-80`}
                  style={{
                    backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 4px, ${hexColor} 4px, ${hexColor} 8px)`
                  }}
                />
              </div>
            )})}
          </div>
        );
      case 3:
        return (
          <div className="flex items-center space-x-6 px-4 w-max select-none">
            {Array.from({ length: 12 }).map((_, i) => {
              const files = ["NEXEN.exe", "PSYTRANCE.dll", "TECHNO.dat", "SCENOGRAPHY.bin", "MAPPING.sys"];
              const file = files[i % files.length];
              return (
              <div key={i} className="flex items-center space-x-6">
                <div className={`w-3 h-3 ${bgClass} rounded-full`} />
                <div className={`w-16 md:w-24 h-0 border-t-2 ${borderClass} opacity-60`} style={{ borderStyle: 'dashed' }} />
                <span className={`font-rajdhani font-bold text-xl md:text-2xl ${textClass}`}>
                  DOWNLOADING: {file} [{1024 + i * 128}MB/s]
                </span>
                <div className={`w-8 h-6 md:w-12 md:h-8 border-2 ${borderClass} flex items-center justify-center opacity-80`}>
                  <div className={`w-2 h-2 ${bgClass} animate-pulse`} />
                </div>
              </div>
            )})}
          </div>
        );
      case 4:
        return (
          <div className="flex items-center space-x-8 md:space-x-12 px-4 w-max select-none">
            {Array.from({ length: 6 }).map((_, i) => {
              const commands = [">_LAUNCH_NEXEN_FESTIVAL", ">_EXECUTE_DECORATION", ">_START_MAPPING", ">_INITIALIZE_SOUND_SYSTEM"];
              const command = commands[i % commands.length];
              return (
              <div key={i} className="flex items-center space-x-8 md:space-x-12">
                <span className={`font-orbitron font-black text-2xl md:text-3xl ${textClass} tracking-[0.2em] uppercase`}>
                  {command}
                </span>
                <div className={`w-6 h-6 md:w-8 md:h-8 ${bgClass} transform rotate-45 opacity-80`} />
                <span className={`font-orbitron font-black text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r ${isCyan ? 'from-[#75feed] to-white' : 'from-[#fc029b] to-white'} tracking-[0.2em]`}>
                  DYSTOPSY_ELEMENT.exe
                </span>
                <div className={`w-6 h-6 md:w-8 md:h-8 border-4 ${borderClass} transform rotate-45 opacity-80`} />
              </div>
            )})}
          </div>
        );
    }
  };

  return (
    <div className="w-full h-16 md:h-24 overflow-hidden relative bg-[#050505] border-y border-gray-900 flex items-center z-20">
      {/* Enhanced scanline & glow overlay */}
      <motion.div 
        className={`absolute inset-0 z-10 pointer-events-none border-y ${isCyan ? 'border-[#75feed]/40 shadow-[inset_0_0_30px_rgba(117,254,237,0.2)]' : 'border-[#fc029b]/40 shadow-[inset_0_0_30px_rgba(252,2,155,0.2)]'} mix-blend-screen`}
        style={{
          backgroundImage: `linear-gradient(90deg, transparent 0%, ${isCyan ? 'rgba(117,254,237,0.15)' : 'rgba(252,2,155,0.15)'} 50%, transparent 100%), repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.6) 2px, rgba(0,0,0,0.6) 4px)`
        }}
        animate={{ opacity: [0.7, 1, 0.8, 0.9, 0.6] }}
        transition={{ duration: 0.15, repeat: Infinity, repeatType: "mirror" }}
      />

      {/* Marquee Wrapper */}
      <motion.div
        className="flex whitespace-nowrap h-full items-center absolute"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"]
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: variant === 1 || variant === 3 ? 20 : 30
        }}
      >
        {/* Render two copies of the content to ensure seamless looping */}
        <div className="flex">
          {renderContent()}
          {renderContent()}
        </div>
      </motion.div>

      {/* Occasional Global Glitch Flash */}
      <motion.div
        className="absolute inset-0 z-20 bg-white mix-blend-overlay opacity-0 pointer-events-none"
        animate={{
          opacity: [0, 0, 0.8, 0, 0, 0.5, 0],
          x: [0, 0, -10, 0, 0, 10, 0]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          times: [0, 0.8, 0.82, 0.85, 0.95, 0.97, 1]
        }}
      />
    </div>
  );
}