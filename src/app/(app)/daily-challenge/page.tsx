"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Flame, Clock, Target, Play } from "lucide-react";
import Link from "next/link";

export default function DailyChallengePage() {
  const [hasStarted, setHasStarted] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-8 pt-12">
      <div className="text-center mb-12">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-paladin-gold/20 border border-paladin-gold/50 mb-6 shadow-[0_0_40px_rgba(212,175,55,0.3)]"
        >
          <Flame className="w-10 h-10 text-paladin-gold" />
        </motion.div>
        <h1 className="font-cinzel text-4xl md:text-5xl font-bold text-white mb-4">Daily Challenge</h1>
        <p className="text-xl text-gray-400">Prove your mastery. Earn double XP.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="glass-panel p-6 rounded-2xl border border-white/5 text-center">
          <Clock className="w-8 h-8 text-blue-400 mx-auto mb-3" />
          <h3 className="font-bold text-lg text-white mb-1">Time Limit</h3>
          <p className="text-gray-400">15s per question</p>
        </div>
        <div className="glass-panel p-6 rounded-2xl border border-paladin-gold/30 text-center bg-paladin-gold/5 shadow-[0_0_20px_rgba(212,175,55,0.1)]">
          <Target className="w-8 h-8 text-paladin-gold mx-auto mb-3" />
          <h3 className="font-bold text-lg text-white mb-1">XP Multiplier</h3>
          <p className="text-paladin-gold font-bold">2.0x Bonus</p>
        </div>
        <div className="glass-panel p-6 rounded-2xl border border-white/5 text-center">
          <Flame className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
          <h3 className="font-bold text-lg text-white mb-1">Streak Bonus</h3>
          <p className="text-gray-400">+50 XP active</p>
        </div>
      </div>

      <div className="text-center">
        {!hasStarted ? (
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setHasStarted(true)}
            className="bg-paladin-gold text-black font-bold text-xl px-12 py-5 rounded-2xl shadow-[0_0_40px_rgba(212,175,55,0.4)] flex items-center gap-3 mx-auto"
          >
            <Play className="w-6 h-6 fill-black" /> Start Challenge
          </motion.button>
        ) : (
          <div className="glass-panel p-8 rounded-3xl border border-paladin-gold/20">
            <h2 className="text-2xl font-bold text-white mb-4">Challenge Active!</h2>
            <p className="text-gray-400 mb-8">You would typically be redirected to the Quiz Engine with the Daily Challenge flag set to true.</p>
            <Link href="/quiz/demo">
              <button className="bg-paladin-gold text-black font-bold px-8 py-3 rounded-xl">Go to Quiz Engine</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
