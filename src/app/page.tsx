"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Shield, Sword, Crown, Scroll, Sparkles, ChevronRight, Flame, Target, Trophy, ArrowRight, Zap, Star } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useEffect, useState } from "react";

// ── Particles Component ──────────────────
function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-paladin-gold/30"
          initial={{
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            opacity: 0,
          }}
          animate={{
            y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
            opacity: [0, 0.8, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: Math.random() * 8 + 5,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
          style={{ willChange: "transform, opacity" }}
        />
      ))}
    </div>
  );
}

// ── Feature Card ────────────────────────
function FeatureCard({ icon: Icon, title, desc, delay }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="glass-panel p-8 rounded-[2rem] border border-white/5 hover:border-paladin-gold/30 transition-all group"
    >
      <div className="w-14 h-14 bg-paladin-gold/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        <Icon className="w-7 h-7 text-paladin-gold" />
      </div>
      <h3 className="text-2xl font-cinzel font-bold text-white mb-3 tracking-tighter">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{desc}</p>
    </motion.div>
  );
}

export default function LandingPage() {
  const router = useRouter();
  const { scrollYProgress } = useScroll();
  
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  return (
    <div className="min-h-screen bg-paladin-charcoal selection:bg-paladin-gold/30">
      
      {/* ── Fixed Navigation ── */}
      <nav className="fixed top-0 left-0 right-0 z-[100] px-6 md:px-12 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between glass-panel px-8 py-4 rounded-full border-white/5 backdrop-blur-2xl">
          <div className="flex items-center gap-3 text-paladin-gold font-cinzel text-2xl font-bold tracking-widest">
            <Shield className="w-8 h-8 drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
            PALADIN
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-black uppercase tracking-widest text-white/60">
             <Link href="#features" className="hover:text-paladin-gold transition-colors">Chronicles</Link>
             <Link href="#story" className="hover:text-paladin-gold transition-colors">Our Lore</Link>
             <Link href="#community" className="hover:text-paladin-gold transition-colors">Legion</Link>
          </div>

          <div className="flex items-center gap-4">
             <Link href="/login" className="text-white/60 hover:text-white transition-colors font-bold uppercase tracking-widest text-xs hidden sm:block">
               Historian Login
             </Link>
             <Link href="/onboarding">
               <motion.button
                 whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(212,175,55,0.4)" }}
                 whileTap={{ scale: 0.95 }}
                 className="bg-paladin-gold text-black px-6 py-2.5 rounded-full font-black uppercase tracking-widest text-xs"
               >
                 Enlist Now
               </motion.button>
             </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero Section ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-4 overflow-hidden">
        {/* Background Visuals */}
        <div className="absolute inset-0 -z-10">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15),transparent_70%)]" />
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10" />
           <Particles />
        </div>

        <motion.div style={{ opacity, scale, y }} className="text-center max-w-5xl relative z-50">
           <motion.div
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-paladin-gold/10 border border-paladin-gold/30 text-paladin-gold mb-8 backdrop-blur-md"
           >
             <Sparkles className="w-4 h-4" />
             <span className="text-[10px] font-black uppercase tracking-[0.2em]">The Future of History</span>
           </motion.div>

           <motion.h1 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
             className="text-6xl sm:text-8xl md:text-9xl font-cinzel font-black mb-8 tracking-tighter leading-[0.9]"
           >
             LIVE THE <br />
             <span className="text-gold-gradient drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]">CHRONICLES</span>
           </motion.h1>

           <motion.p
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.5, duration: 1 }}
             className="text-lg md:text-2xl text-white/50 max-w-2xl mx-auto mb-12 font-medium"
           >
             Master history through cinematic adventures, branching destinies, and an RPG system that rewards your wisdom.
           </motion.p>

           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.8 }}
             className="flex flex-col sm:flex-row items-center justify-center gap-6"
           >
             <motion.button 
               whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(212,175,55,0.5)" }} 
               whileTap={{ scale: 0.95 }} 
               onClick={() => router.push("/onboarding")}
               className="group relative flex items-center gap-4 bg-paladin-gold text-black px-12 py-5 rounded-2xl text-xl font-black uppercase tracking-widest transition-all"
             >
               Begin Your Quest 
               <div className="bg-black/10 p-1 rounded-lg group-hover:translate-x-1 transition-transform">
                  <ChevronRight className="w-6 h-6" />
               </div>
             </motion.button>
             
             <motion.button 
               whileHover={{ scale: 1.05, background: "rgba(255,255,255,0.05)" }}
               whileTap={{ scale: 0.95 }} 
               onClick={() => router.push("/dashboard")}
               className="flex items-center gap-3 px-10 py-5 rounded-2xl text-lg font-bold text-white/70 border border-white/10 hover:border-white/30 transition-all uppercase tracking-widest"
             >
               <Zap className="w-5 h-5 text-paladin-gold" />
               Enter Archive
             </motion.button>
           </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/20"
        >
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
             <div className="w-1 h-2 bg-paladin-gold rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* ── Features Section ── */}
      <section id="features" className="py-32 px-6 bg-[#08080A]">
        <div className="max-w-7xl mx-auto">
           <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-cinzel font-bold text-white mb-6">A New Era of Learning</h2>
              <div className="h-1.5 w-32 bg-paladin-gold mx-auto rounded-full" />
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard 
                icon={Sword} 
                title="Cinematic Lore" 
                desc="Experience history like a high-budget visual novel. Every decision shapes your legacy." 
                delay={0.1}
              />
              <FeatureCard 
                icon={Trophy} 
                title="RPG Progression" 
                desc="Earn XP, unlock powerful artifacts, and climb the global ranks of the Grand Historians." 
                delay={0.2}
              />
              <FeatureCard 
                icon={Target} 
                title="Legendary Skill Tree" 
                desc="Navigate an interactive 2D map of human civilization. Unlock new eras with your wisdom." 
                delay={0.3}
              />
           </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-20 border-t border-white/5 text-center">
         <div className="flex justify-center gap-6 mb-8 text-white/30">
            <Shield className="w-6 h-6 hover:text-paladin-gold transition-colors cursor-pointer" />
            <Crown className="w-6 h-6 hover:text-paladin-gold transition-colors cursor-pointer" />
            <Target className="w-6 h-6 hover:text-paladin-gold transition-colors cursor-pointer" />
         </div>
         <p className="text-white/20 text-sm font-bold tracking-[0.3em] uppercase">Paladin Studios © 2024</p>
      </footer>
    </div>
  );
}
