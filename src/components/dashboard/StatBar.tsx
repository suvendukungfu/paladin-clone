"use client";

import { Flame, Zap, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { useXP } from "@/hooks/useXP";
import { useState, useEffect } from "react";

export function StatBar() {
  const { currentXP, level, progressPercent, rank } = useXP();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="flex gap-3 items-center flex-wrap">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass-panel px-4 py-2 rounded-full flex items-center gap-2 border border-white/5 shadow-lg"
      >
        <Flame className="w-4 h-4 text-red-500" />
        <span className="font-bold text-sm">5</span>
      </motion.div>

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="glass-panel px-4 py-2 rounded-full flex items-center gap-2 border border-white/5 shadow-lg"
      >
        <Zap className="w-4 h-4 text-paladin-gold" />
        <span className="font-bold text-sm">{currentXP.toLocaleString()} XP</span>
      </motion.div>

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="glass-panel px-4 py-2 rounded-full flex items-center gap-3 border border-white/5 shadow-lg"
      >
        <div className="w-24 h-2 bg-black/50 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
            className="h-full bg-gradient-to-r from-paladin-gold to-yellow-300 rounded-full"
          />
        </div>
        <span className="font-bold text-xs">LVL {level}</span>
      </motion.div>
    </div>
  );
}
