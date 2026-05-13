import { HeroSlider } from "../components/HeroSlider";
import { FestivalSection } from "../components/FestivalSection";
import { NexenSection } from "../components/NexenSection";
import { ActivitiesSection } from "../components/ActivitiesSection";
import { MerchSection } from "../components/MerchSection";
import { CyberSeparator } from "../components/CyberSeparator";
import { motion, useScroll, useSpring } from "motion/react";

export function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative bg-[#020202] text-white min-h-screen">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#75feed] to-[#fc029b] transform origin-left z-[100] pointer-events-none"
        style={{ scaleX }}
      />
      
      <HeroSlider />
      
      <CyberSeparator variant={1} color="cyan" direction="left" />
      
      <FestivalSection />
      
      <CyberSeparator variant={2} color="pink" direction="right" />
      
      <NexenSection />
      
      <CyberSeparator variant={3} color="cyan" direction="left" />
      
      <ActivitiesSection />
      
      <CyberSeparator variant={4} color="pink" direction="right" />
      
      <MerchSection />
    </div>
  );
}
