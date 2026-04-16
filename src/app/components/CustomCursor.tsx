import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const IS_CURSOR_ENABLED = false;

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!IS_CURSOR_ENABLED) return;
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const checkPointer = () => {
      // Find what's currently under the cursor
      const hoveredElement = document.elementFromPoint(position.x, position.y);
      if (hoveredElement) {
        const computedStyle = window.getComputedStyle(hoveredElement);
        const clickable = 
          hoveredElement.tagName.toLowerCase() === 'a' ||
          hoveredElement.tagName.toLowerCase() === 'button' ||
          hoveredElement.closest('a') !== null ||
          hoveredElement.closest('button') !== null ||
          computedStyle.cursor === 'pointer';
          
        setIsPointer(clickable);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    
    // Periodically check pointer state or rely on mousemove
    // A fast interval is fine for a custom cursor to avoid missing hover states when elements animate under the stationary cursor
    const interval = setInterval(checkPointer, 50);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      clearInterval(interval);
    };
  }, [position.x, position.y, isVisible]);

  if (typeof window === 'undefined' || !IS_CURSOR_ENABLED) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        * { cursor: none !important; }
      `}} />
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-screen"
        animate={{
          x: position.x,
          y: position.y,
          opacity: isVisible ? 1 : 0
        }}
        transition={{ 
          type: "tween", 
          ease: "linear", 
          duration: 0.05, // very fast follow
          opacity: { duration: 0.2 }
        }}
      >
        {/* Inner glowing dot */}
        <motion.div 
          className="absolute -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#75feed] shadow-[0_0_10px_#75feed]"
          animate={{
            scale: isPointer ? 0 : 1,
            opacity: isPointer ? 0 : 1
          }}
          transition={{ duration: 0.2 }}
        />
        
        {/* Cyberpunk Outer Frame */}
        <motion.div
          className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
          animate={{
            width: isPointer ? 40 : 24,
            height: isPointer ? 40 : 24,
            rotate: isPointer ? 45 : 0,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* Border changes color and shape */}
          <motion.div 
            className="absolute inset-0 border border-[#75feed]/50"
            animate={{
              borderColor: isPointer ? 'rgba(252, 2, 155, 0.2)' : 'rgba(117, 254, 237, 0.5)',
              borderRadius: isPointer ? '0%' : '50%', // from circle to square
              scale: isPointer ? 0.8 : 1
            }}
          />

          {/* Corner targets that only appear on hover */}
          <AnimatePresence>
            {isPointer && (
              <motion.div
                initial={{ opacity: 0, scale: 1.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.5 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0"
              >
                <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[#fc029b] shadow-[-2px_-2px_10px_rgba(252,2,155,0.4)]" />
                <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-[#fc029b] shadow-[2px_-2px_10px_rgba(252,2,155,0.4)]" />
                <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-[#fc029b] shadow-[-2px_2px_10px_rgba(252,2,155,0.4)]" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-[#fc029b] shadow-[2px_2px_10px_rgba(252,2,155,0.4)]" />
                
                {/* Center target dot for precision */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-[#fc029b] rotate-[-45deg]" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </>
  );
}