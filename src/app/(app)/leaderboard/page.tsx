"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Award, Crown, Flame, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { DEMO_USERS } from "@/data/seed";
import { useUserStore } from "@/store/userStore";
import { useXP } from "@/hooks/useXP";

type Tab = "global" | "weekly" | "streak";

export default function LeaderboardPage() {
  const [tab, setTab] = useState<Tab>("global");
  const { xp, streak } = useUserStore();
  const { level } = useXP();

  const sortedUsers = [...DEMO_USERS].sort((a, b) => {
    if (tab === "streak") return b.streak - a.streak;
    return b.xp - a.xp;
  });

  const top3 = sortedUsers.slice(0, 3);
  const rest = sortedUsers.slice(3);

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-8">
      <header className="mb-10 text-center">
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-cinzel font-bold text-paladin-gold flex items-center justify-center gap-4">
          <Award className="w-10 h-10" /> Hall of Champions
        </motion.h1>
        <p className="text-gray-400 mt-2">The most esteemed historians of the realm.</p>
      </header>

      {/* Tabs */}
      <div className="flex gap-2 justify-center mb-10">
        {([["global", "Global XP"], ["weekly", "Weekly"], ["streak", "Streak Kings"]] as [Tab, string][]).map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)} className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${tab === key ? 'bg-paladin-gold text-black shadow-[0_0_20px_rgba(212,175,55,0.3)]' : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'}`}>
            {label}
          </button>
        ))}
      </div>

      {/* Podium */}
      <div className="flex items-end justify-center gap-4 mb-12 h-64">
        {/* 2nd place */}
        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="flex flex-col items-center">
          <span className="text-4xl mb-3">{top3[1]?.avatar}</span>
          <p className="text-sm font-bold text-white mb-1 truncate max-w-[100px]">{top3[1]?.username}</p>
          <p className="text-xs text-gray-400 mb-3">{tab === "streak" ? `${top3[1]?.streak} days` : `${top3[1]?.xp.toLocaleString()} XP`}</p>
          <div className="w-24 h-32 bg-gradient-to-t from-gray-600/30 to-gray-400/10 rounded-t-xl flex items-center justify-center border border-gray-400/20">
            <span className="text-3xl font-cinzel font-bold text-gray-300">2</span>
          </div>
        </motion.div>

        {/* 1st place */}
        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="flex flex-col items-center">
          <Crown className="w-8 h-8 text-paladin-gold mb-2" />
          <span className="text-5xl mb-3">{top3[0]?.avatar}</span>
          <p className="text-sm font-bold text-white mb-1">{top3[0]?.username}</p>
          <p className="text-xs text-paladin-gold font-bold mb-3">{tab === "streak" ? `${top3[0]?.streak} days` : `${top3[0]?.xp.toLocaleString()} XP`}</p>
          <div className="w-28 h-44 bg-gradient-to-t from-paladin-gold/20 to-paladin-gold/5 rounded-t-xl flex items-center justify-center border border-paladin-gold/30 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
            <span className="text-4xl font-cinzel font-bold text-paladin-gold">1</span>
          </div>
        </motion.div>

        {/* 3rd place */}
        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="flex flex-col items-center">
          <span className="text-4xl mb-3">{top3[2]?.avatar}</span>
          <p className="text-sm font-bold text-white mb-1 truncate max-w-[100px]">{top3[2]?.username}</p>
          <p className="text-xs text-gray-400 mb-3">{tab === "streak" ? `${top3[2]?.streak} days` : `${top3[2]?.xp.toLocaleString()} XP`}</p>
          <div className="w-24 h-24 bg-gradient-to-t from-amber-700/20 to-amber-600/5 rounded-t-xl flex items-center justify-center border border-amber-700/30">
            <span className="text-3xl font-cinzel font-bold text-amber-600">3</span>
          </div>
        </motion.div>
      </div>

      {/* Rank list */}
      <div className="glass-panel rounded-2xl overflow-hidden border border-white/5">
        {rest.map((user, i) => {
          const rank = i + 4;
          const delta = Math.floor(Math.random() * 5) - 2;
          return (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex items-center justify-between p-5 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex items-center gap-5">
                <span className="w-8 text-center font-cinzel font-bold text-gray-400">#{rank}</span>
                <span className="text-2xl">{user.avatar}</span>
                <div>
                  <span className="font-bold text-white block">{user.username}</span>
                  <span className="text-xs text-gray-500">Lvl {user.level}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold text-gray-300">{tab === "streak" ? `${user.streak}d` : `${user.xp.toLocaleString()} XP`}</span>
                {delta > 0 && <TrendingUp className="w-4 h-4 text-emerald-400" />}
                {delta < 0 && <TrendingDown className="w-4 h-4 text-red-400" />}
                {delta === 0 && <Minus className="w-4 h-4 text-gray-500" />}
              </div>
            </motion.div>
          );
        })}

        {/* Current user sticky */}
        <div className="bg-paladin-gold/10 border-t-2 border-paladin-gold p-5 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <span className="w-8 text-center font-cinzel font-bold text-paladin-gold">#12</span>
            <span className="text-2xl">🛡️</span>
            <div>
              <span className="font-bold text-paladin-gold block">You (Historian)</span>
              <span className="text-xs text-gray-400">Lvl {level}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-bold text-paladin-gold">
              {tab === "streak" ? `${streak}d` : `${xp.toLocaleString()} XP`}
            </span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
