"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Lock, Shield, Crown, Zap, Flame, Star, Map, Swords, BookOpen, Clock } from "lucide-react";
import { ACHIEVEMENTS } from "@/data/seed";

type Filter = "all" | "unlocked" | "locked" | "common" | "rare" | "epic" | "legendary";

const iconMap: Record<string, any> = {
  footprints: Shield, crown: Crown, zap: Zap, shield: Shield, map: Map, swords: Swords,
  clock: Clock, flame: Flame, trophy: Trophy, star: Star, book: BookOpen,
};

export default function AchievementsPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [selectedAch, setSelectedAch] = useState<string | null>(null);

  // Mock: first 4 achievements are unlocked
  const unlockedIds = new Set(["a1", "a6", "a11", "a12"]);

  const filtered = ACHIEVEMENTS.filter(a => {
    if (filter === "all") return true;
    if (filter === "unlocked") return unlockedIds.has(a.id);
    if (filter === "locked") return !unlockedIds.has(a.id);
    return a.rarity === filter;
  });

  const rarityConfig = {
    common: { border: "border-gray-500", bg: "bg-gray-500/10", text: "text-gray-400", glow: "" },
    rare: { border: "border-blue-500", bg: "bg-blue-500/10", text: "text-blue-400", glow: "shadow-[0_0_20px_rgba(59,130,246,0.2)]" },
    epic: { border: "border-purple-500", bg: "bg-purple-500/10", text: "text-purple-400", glow: "shadow-[0_0_20px_rgba(168,85,247,0.2)]" },
    legendary: { border: "border-paladin-gold", bg: "bg-paladin-gold/10", text: "text-paladin-gold", glow: "shadow-[0_0_30px_rgba(212,175,55,0.3)]" },
  };

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-8">
      <header className="mb-8">
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-cinzel font-bold text-paladin-gold flex items-center gap-4">
          <Trophy className="w-10 h-10" /> Hall of Achievements
        </motion.h1>
        <p className="text-gray-400 mt-2">Display your hard-earned honors and badges.</p>
      </header>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {(["all", "unlocked", "locked", "common", "rare", "epic", "legendary"] as Filter[]).map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all ${filter === f ? 'bg-paladin-gold text-black font-bold' : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'}`}>
            {f}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((ach, i) => {
          const isLocked = !unlockedIds.has(ach.id);
          const config = rarityConfig[ach.rarity as keyof typeof rarityConfig] || rarityConfig.common;
          const Icon = iconMap[ach.icon] || Shield;

          return (
            <motion.div
              key={ach.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              onClick={() => !isLocked && setSelectedAch(ach.id)}
              className={`glass-panel rounded-2xl p-6 border relative overflow-hidden cursor-pointer transition-all ${
                isLocked ? 'border-white/5 opacity-60' : `${config.border} ${config.glow}`
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${isLocked ? 'bg-[#16161a] border border-white/10' : config.bg}`}>
                  {isLocked ? <Lock className="w-6 h-6 text-gray-500" /> : <Icon className={`w-7 h-7 ${config.text}`} />}
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${isLocked ? 'bg-white/5 text-gray-500' : `${config.bg} ${config.text}`}`}>
                  {ach.rarity}
                </span>
              </div>
              <h3 className={`text-lg font-bold mb-1 ${isLocked ? 'text-gray-500' : 'text-white'}`}>{ach.name}</h3>
              <p className="text-sm text-gray-400 mb-3">{ach.description}</p>
              {!isLocked && (
                <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="text-sm font-semibold text-paladin-gold">+{ach.xp} XP</span>
                  <span className="text-xs text-gray-500">Unlocked ✓</span>
                </div>
              )}
              {isLocked && (
                <div className="pt-3 border-t border-white/5">
                  <span className="text-xs text-gray-500">🔒 Complete the challenge to unlock</span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Achievement Detail Modal */}
      <AnimatePresence>
        {selectedAch && (() => {
          const ach = ACHIEVEMENTS.find(a => a.id === selectedAch);
          if (!ach) return null;
          const config = rarityConfig[ach.rarity as keyof typeof rarityConfig] || rarityConfig.common;
          const Icon = iconMap[ach.icon] || Shield;
          return (
            <motion.div key="modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" onClick={() => setSelectedAch(null)}>
              <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} onClick={(e) => e.stopPropagation()} className={`glass-panel p-10 rounded-3xl border ${config.border} ${config.glow} max-w-sm w-full text-center`}>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }} className={`w-24 h-24 rounded-full ${config.bg} flex items-center justify-center mx-auto mb-6`}>
                  <Icon className={`w-12 h-12 ${config.text}`} />
                </motion.div>
                <h2 className="font-cinzel text-2xl font-bold text-white mb-2">{ach.name}</h2>
                <p className={`text-sm font-bold uppercase tracking-wider ${config.text} mb-4`}>{ach.rarity}</p>
                <p className="text-gray-400 mb-6">{ach.description}</p>
                <p className="text-2xl font-bold text-paladin-gold">+{ach.xp} XP</p>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}
