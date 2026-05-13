"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Lock, Unlock, Shield, Compass, Search, Target, Sparkles, Map as MapIcon, Layers } from "lucide-react";
import { SKILL_NODES } from "@/data/seed";
import { useXP } from "@/hooks/useXP";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function SkillTreePage() {
  const { currentXP } = useXP();
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Smooth pan values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { damping: 25, stiffness: 120 });
  const smoothY = useSpring(y, { damping: 25, stiffness: 120 });

  useEffect(() => {
    setMounted(true);
    // Center the active node after mount
    const activeNode = SKILL_NODES.slice().reverse().find(n => currentXP >= n.required_xp) || SKILL_NODES[0];
    const initialX = -(activeNode.position_x / 100 * 2000) + (window.innerWidth / 2);
    const initialY = -(activeNode.position_y / 100 * 2000) + (window.innerHeight / 2);
    x.set(initialX);
    y.set(initialY);
  }, []);

  if (!mounted) {
    return <div className="w-full h-screen bg-[#0A0A0C]" />;
  }

  return (
    <div className="w-full h-[calc(100vh-64px)] relative overflow-hidden bg-[#0A0A0C] cursor-grab active:cursor-grabbing select-none" ref={containerRef}>
      {/* ── Background Layers ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05),transparent_70%)]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />
      </div>

      {/* ── HUD / Overlay UI ── */}
      <div className="absolute top-8 left-8 z-30 pointer-events-none flex flex-col gap-4">
        <motion.div 
          initial={{ x: -50, opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }}
          className="glass-panel p-6 rounded-3xl border border-paladin-gold/20 shadow-2xl backdrop-blur-xl"
        >
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 bg-paladin-gold/10 rounded-2xl border border-paladin-gold/30">
              <Compass className="w-8 h-8 text-paladin-gold animate-spin-slow" />
            </div>
            <div>
              <h1 className="font-cinzel text-3xl font-bold text-white tracking-tighter">Path of Legend</h1>
              <p className="text-paladin-gold/60 text-sm font-medium">Unlock the secrets of time</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ x: -50, opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2"
        >
          <div className="glass-panel px-4 py-2 rounded-full border border-white/5 flex items-center gap-2">
             <Target className="w-4 h-4 text-paladin-gold" />
             <span className="text-xs font-bold text-white/70 uppercase">Discovering Era: Ancient Rome</span>
          </div>
        </motion.div>
      </div>

      <div className="absolute top-8 right-8 z-30 flex flex-col gap-3 pointer-events-none">
        <div className="glass-panel p-4 rounded-2xl border border-white/5 flex items-center gap-4">
          <div className="text-right">
             <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Total Progress</p>
             <p className="text-lg font-cinzel font-bold text-paladin-gold">{Math.floor((currentXP / 5000) * 100)}%</p>
          </div>
          <div className="w-12 h-12 rounded-full border-2 border-paladin-gold/20 flex items-center justify-center relative">
             <Sparkles className="w-5 h-5 text-paladin-gold" />
             <svg className="absolute inset-0 w-full h-full -rotate-90">
               <circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeWidth="2" className="text-paladin-gold/10" />
               <circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="138" strokeDashoffset={138 - (138 * 0.4)} className="text-paladin-gold" />
             </svg>
          </div>
        </div>
      </div>

      {/* ── Interactive Map Canvas ── */}
      <motion.div 
        drag
        style={{ x: smoothX, y: smoothY }}
        className="w-[3000px] h-[3000px] absolute -top-[1500px] -left-[1500px] z-0 origin-center"
      >
        {/* Connection Lines Layer */}
        <svg className="w-full h-full absolute inset-0 pointer-events-none overflow-visible">
          {/* Defs removed for performance */ }
          {SKILL_NODES.map((node) => {
            return node.prerequisites.map((prereqId) => {
              const prereqNode = SKILL_NODES.find(n => n.id === prereqId);
              if (!prereqNode) return null;
              
              const isUnlocked = currentXP >= node.required_xp;
              const isPrereqUnlocked = currentXP >= prereqNode.required_xp;
              const pathActive = isUnlocked && isPrereqUnlocked;

              return (
                <g key={`${prereqId}-${node.id}`}>
                  {/* Outer Glow Path */}
                  <motion.line 
                    x1={`${prereqNode.position_x}%`} y1={`${prereqNode.position_y}%`} 
                    x2={`${node.position_x}%`} y2={`${node.position_y}%`} 
                    stroke={pathActive ? "#D4AF37" : "rgba(255,255,255,0.05)"} 
                    strokeWidth={pathActive ? "6" : "2"}
                    strokeOpacity={pathActive ? "0.2" : "1"}
                  />
                  {/* Main Line */}
                  <motion.line 
                    x1={`${prereqNode.position_x}%`} y1={`${prereqNode.position_y}%`} 
                    x2={`${node.position_x}%`} y2={`${node.position_y}%`} 
                    stroke={pathActive ? "#D4AF37" : "rgba(255,255,255,0.1)"} 
                    strokeWidth={pathActive ? "2" : "1"}
                    strokeDasharray={pathActive ? "0" : "10,10"}
                  />
                </g>
              );
            });
          })}
        </svg>

        {/* Nodes Layer */}
        {SKILL_NODES.map((node, i) => {
          const isUnlocked = currentXP >= node.required_xp;
          const isCurrent = isUnlocked && (i === SKILL_NODES.length - 1 || currentXP < SKILL_NODES[i+1].required_xp);
          
          return (
            <div 
              key={node.id}
              className="absolute z-10 pointer-events-auto"
              style={{ left: `${node.position_x}%`, top: `${node.position_y}%`, transform: 'translate(-50%, -50%)' }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 + (i * 0.05) }}
                whileHover={{ scale: 1.1 }}
                className="group relative"
              >
                {/* Node Label (Always Visible) */}
                <div className="absolute bottom-full mb-6 left-1/2 -translate-x-1/2 w-48 text-center pointer-events-none">
                   <p className={`font-cinzel text-lg font-bold tracking-tighter ${isUnlocked ? 'text-white' : 'text-gray-600'}`}>
                     {node.name}
                   </p>
                   <p className="text-[10px] uppercase tracking-widest text-paladin-gold/60 font-black">{node.category}</p>
                </div>

                {/* The Orb */}
                <div className={`
                  w-20 h-20 rounded-full flex items-center justify-center border-4 relative transition-all duration-500
                  ${isUnlocked 
                    ? 'bg-[#121215] border-paladin-gold shadow-[0_0_40px_rgba(212,175,55,0.3)]' 
                    : 'bg-[#0A0A0C] border-white/10 opacity-60'}
                  ${isCurrent ? 'scale-110 border-white gold-glow animate-pulse' : ''}
                `}>
                  {isUnlocked ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute inset-0 rounded-full border-t border-r border-paladin-gold/40" />
                  ) : null}
                  
                  {isUnlocked ? (
                    <div className="bg-paladin-gold text-black p-4 rounded-full">
                       <Shield className="w-8 h-8" />
                    </div>
                  ) : (
                    <Lock className="w-6 h-6 text-gray-700" />
                  )}

                  {/* Connection Tooltip on Hover */}
                  <div className="absolute inset-0 z-20 group-hover:opacity-100 opacity-0 transition-opacity">
                     <Link href={isUnlocked ? `/lessons` : "#"} className="w-full h-full block" />
                  </div>
                </div>

                {/* Progress bar below if locked */}
                {!isUnlocked && (
                  <div className="mt-4 w-20 h-1 bg-white/5 rounded-full overflow-hidden mx-auto">
                    <motion.div 
                      className="h-full bg-paladin-gold"
                      initial={{ width: 0 }}
                      animate={{ width: `${(currentXP / node.required_xp) * 100}%` }}
                    />
                  </div>
                )}
              </motion.div>
            </div>
          );
        })}
      </motion.div>

      {/* ── Map Controls HUD ── */}
      <div className="absolute bottom-8 right-8 z-30 flex gap-4">
        <button className="glass-panel p-4 rounded-2xl border border-white/10 hover:border-paladin-gold/50 transition-colors pointer-events-auto">
          <MapIcon className="w-6 h-6 text-paladin-gold" />
        </button>
        <button className="glass-panel p-4 rounded-2xl border border-white/10 hover:border-paladin-gold/50 transition-colors pointer-events-auto">
          <Layers className="w-6 h-6 text-white/60" />
        </button>
      </div>
    </div>
  );
}
