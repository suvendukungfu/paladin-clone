"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Sparkles } from "lucide-react";
import { useUserStore } from "@/store/userStore";
import { Confetti } from "@/components/ui/Confetti";

export default function DailyChest() {
  const { addXP } = useUserStore();
  const [claimed, setClaimed] = useState(false);
  const [showReward, setShowReward] = useState(false);

  const handleClaim = () => {
    if (claimed) return;
    setClaimed(true);
    setShowReward(true);
    addXP(100);

    setTimeout(() => setShowReward(false), 3000);
  };

  return (
    <div className="relative mb-6">
      <motion.div
        whileHover={!claimed ? { scale: 1.02, y: -2 } : {}}
        whileTap={!claimed ? { scale: 0.98 } : {}}
        onClick={handleClaim}
        className={`relative overflow-hidden p-6 rounded-2xl border-2 transition-all cursor-pointer ${
          claimed 
            ? "bg-white/5 border-white/5 opacity-60" 
            : "bg-gradient-to-br from-paladin-gold/20 to-paladin-gold/5 border-paladin-gold/30 gold-glow group"
        }`}
      >
        <div className="flex items-center gap-4">
          <div className={`p-4 rounded-xl ${claimed ? "bg-white/5" : "bg-paladin-gold/20 group-hover:bg-paladin-gold/30 transition-colors"}`}>
            <Gift className={`w-8 h-8 ${claimed ? "text-gray-500" : "text-paladin-gold animate-float"}`} />
          </div>
          <div>
            <h4 className={`font-cinzel font-bold text-lg ${claimed ? "text-gray-500" : "text-paladin-gold"}`}>
              {claimed ? "Daily Reward Claimed" : "Daily Explorer Chest"}
            </h4>
            <p className="text-sm text-gray-400">
              {claimed ? "Come back tomorrow for more artifacts." : "Claim your daily historical artifacts!"}
            </p>
          </div>
        </div>

        {!claimed && (
          <motion.div 
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute top-2 right-2"
          >
            <Sparkles className="w-5 h-5 text-paladin-gold" />
          </motion.div>
        )}

        {showReward && <Confetti count={40} />}

        <AnimatePresence>
          {showReward && (
            <motion.div
              initial={{ y: 20, opacity: 0, scale: 0.5 }}
              animate={{ y: -40, opacity: 1, scale: 1.2 }}
              exit={{ y: -80, opacity: 0 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-3xl text-paladin-gold drop-shadow-[0_0_10px_rgba(212,175,55,1)]"
            >
              +100 XP
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
