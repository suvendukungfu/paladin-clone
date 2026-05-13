"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUserStore } from "@/store/userStore";
import { useXP } from "@/hooks/useXP";
import { Trophy, Star } from "lucide-react";
import { Confetti } from "./Confetti";

export default function LevelUpOverlay() {
  const { level } = useXP();
  const [prevLevel, setPrevLevel] = useState(level);
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Only show if level increased and it's not the first load (prevLevel 0)
    if (level > prevLevel && prevLevel !== 0) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), 5000);
      return () => clearTimeout(timer);
    }
    setPrevLevel(level);
  }, [level, prevLevel]);

  return (
    <AnimatePresence>
      {show && (
        <div key="level-up-modal">
          <Confetti count={100} />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.5, y: 50, rotate: -5 }}
              animate={{ scale: 1, y: 0, rotate: 0 }}
              exit={{ scale: 1.5, opacity: 0 }}
              className="relative p-10 md:p-14 rounded-[2rem] border-2 border-paladin-gold/50 bg-[#121215] text-center shadow-[0_0_80px_rgba(212,175,55,0.3)] max-w-lg w-full mx-4"
            >
              {/* Floating Trophy Icon */}
              <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-28 h-28 bg-paladin-gold rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.6)] animate-bounce-slow">
                <Trophy className="w-14 h-14 text-black" />
              </div>

              <div className="mt-12 space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="text-5xl font-cinzel font-bold text-paladin-gold mb-2 tracking-tighter">
                    LEVEL UP!
                  </h2>
                  <div className="h-1 w-24 bg-paladin-gold mx-auto rounded-full opacity-50" />
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-2xl text-white/90"
                >
                  You have ascended to <br />
                  <span className="text-white font-bold text-4xl">Level {level}</span>
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center justify-center gap-3 py-4 border-y border-white/10"
                >
                  <Star className="w-6 h-6 text-paladin-gold fill-paladin-gold" />
                  <span className="font-cinzel text-lg uppercase tracking-[0.2em] text-paladin-gold/80">New Rank Unlocked</span>
                  <Star className="w-6 h-6 text-paladin-gold fill-paladin-gold" />
                </motion.div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(212,175,55,0.4)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShow(false)}
                className="mt-12 w-full py-5 bg-paladin-gold text-black font-black text-xl rounded-2xl transition-all uppercase tracking-widest"
              >
                Claim Your Reward
              </motion.button>
              
              {/* Background Rotating Glow */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[2rem] -z-10">
                 <motion.div 
                   animate={{ rotate: 360 }}
                   transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                   className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(212,175,55,0.1)_0%,transparent_70%)]"
                 />
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
