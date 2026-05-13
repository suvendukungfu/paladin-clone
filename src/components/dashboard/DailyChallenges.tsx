"use client";

import { motion } from "framer-motion";
import { Target, CheckCircle2 } from "lucide-react";
import DailyChest from "./DailyChest";

const challenges = [
  { id: 1, title: "The Punic Wars Quiz", progress: 2, total: 3, xp: 50, color: "bg-paladin-gold" },
  { id: 2, title: "Read 2 Stories", progress: 0, total: 2, xp: 100, color: "bg-blue-500" },
  { id: 3, title: "Win History Duel", progress: 1, total: 1, xp: 150, color: "bg-emerald-500", completed: true },
];

export function DailyChallenges() {
  return (
    <div className="glass-panel rounded-2xl p-6">
      <DailyChest />
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-cinzel font-bold text-paladin-gold">Daily Quests</h3>
        <Target className="w-5 h-5 text-gray-400" />
      </div>

      <div className="space-y-4">
        {challenges.map((challenge, i) => (
          <motion.div 
            key={challenge.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#24242b]/50 p-4 rounded-xl border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <span className={`font-medium ${challenge.completed ? 'text-gray-400 line-through' : 'text-gray-200'}`}>
                {challenge.title}
              </span>
              {challenge.completed ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              ) : (
                <span className="text-xs font-bold text-paladin-gold bg-paladin-gold/10 px-2 py-1 rounded">
                  +{challenge.xp} XP
                </span>
              )}
            </div>

            {!challenge.completed && (
              <>
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Progress</span>
                  <span>{challenge.progress}/{challenge.total}</span>
                </div>
                <div className="h-1.5 bg-black/50 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                    transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                    className={`h-full ${challenge.color} rounded-full`}
                  />
                </div>
              </>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
