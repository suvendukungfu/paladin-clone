"use client";

import { motion } from "framer-motion";
import { Landmark, Swords, Crown, Anchor, Factory, Lock, Shield, Map } from "lucide-react";
import { SKILL_NODES } from "@/data/seed";
import { useXP } from "@/hooks/useXP";
import { useState, useEffect } from "react";
import Link from "next/link";

export function LearningMap() {
  const { currentXP } = useXP();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="py-8 flex flex-col items-center min-h-[500px]" />;
  }

  // Sort nodes by required XP to create a linear path for the dashboard
  const sortedNodes = [...SKILL_NODES].sort((a, b) => a.required_xp - b.required_xp);

  return (
    <div className="py-8 flex flex-col items-center">
      {sortedNodes.map((node, index) => {
        const isUnlocked = currentXP >= node.required_xp;
        
        // A node is "current" if it's the highest required_xp node that is currently unlocked
        const isCurrent = isUnlocked && (index === sortedNodes.length - 1 || currentXP < sortedNodes[index + 1].required_xp);
        
        const isLocked = !isUnlocked;
        const progress = isLocked ? Math.min(100, Math.max(0, (currentXP / node.required_xp) * 100)) : 100;
        
        // Choose icon based on category or index (mock logic)
        let Icon = Landmark;
        if (node.category.includes("Medieval")) Icon = Swords;
        if (node.category.includes("Asian")) Icon = Crown;

        return (
          <div key={node.id} className="relative flex flex-col items-center">
            {/* The Node */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.15 }}
              whileHover={!isLocked ? { scale: 1.1 } : {}}
              className={`
                w-24 h-24 rounded-full flex items-center justify-center relative z-10 cursor-pointer
                ${isLocked ? 'bg-[#16161a] border-2 border-gray-700' : 
                  isCurrent ? 'bg-[#16161a] border-2 border-paladin-gold gold-glow' : 
                  'bg-paladin-gold border-2 border-paladin-gold text-black'}
              `}
            >
              <Link href={isLocked ? "#" : `/skill-tree`} className="absolute inset-0 z-20" />

              {/* Progress Ring for Current Node */}
              {(isCurrent || (!isUnlocked && progress > 0)) && (
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="46"
                    fill="none"
                    stroke="rgba(212,175,55,0.2)"
                    strokeWidth="4"
                  />
                  <motion.circle
                    cx="48"
                    cy="48"
                    r="46"
                    fill="none"
                    stroke="#D4AF37"
                    strokeWidth="4"
                    strokeDasharray="289"
                    initial={{ strokeDashoffset: 289 }}
                    animate={{ strokeDashoffset: 289 - (289 * progress) / 100 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  />
                </svg>
              )}

              {isLocked ? (
                <Lock className="w-8 h-8 text-gray-600" />
              ) : (
                <Icon className={`w-10 h-10 ${isCurrent ? 'text-paladin-gold' : 'text-black'}`} />
              )}

              {/* Node Label */}
              <div className="absolute top-full mt-4 text-center w-40">
                <p className={`font-cinzel font-bold text-lg ${isCurrent ? 'text-paladin-gold' : isLocked ? 'text-gray-500' : 'text-white'}`}>
                  {node.name}
                </p>
                {isCurrent && (
                  <span className="text-xs text-paladin-gold/80 uppercase tracking-widest font-semibold">
                    Current Era
                  </span>
                )}
                {isLocked && (
                  <span className="text-xs text-gray-500 block">
                    {node.required_xp} XP
                  </span>
                )}
              </div>
            </motion.div>

            {/* Connecting Line */}
            {index < sortedNodes.length - 1 && (
              <div className="h-20 w-1 relative my-2">
                <div className="absolute inset-0 bg-gray-800 rounded-full" />
                {isUnlocked && (
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: "100%" }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                    className="absolute top-0 left-0 w-full bg-paladin-gold rounded-full" 
                  />
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
