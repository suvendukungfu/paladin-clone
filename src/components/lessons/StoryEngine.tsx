"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, X, Scroll, Shield, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { Confetti } from "@/components/ui/Confetti";
import { LESSONS } from "@/data/seed";
import type { Scene } from "@/data/seed";

// ── Typewriter Effect ───────────────────
function Typewriter({ text, speed = 30, onComplete }: { text: string; speed?: number; onComplete?: () => void }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(timer);
        setDone(true);
        onComplete?.();
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <span>
      {displayed}
      {!done && <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.5 }} className="inline-block w-0.5 h-5 bg-paladin-gold ml-0.5 align-text-bottom" />}
    </span>
  );
}

export function StoryEngine({ lessonId }: { lessonId?: string }) {
  const lesson = LESSONS.find(l => l.id === lessonId) || LESSONS[0];
  const scenes = lesson.scenes;

  const [sceneIndex, setSceneIndex] = useState(0);
  const [textDone, setTextDone] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);

  const scene = scenes[sceneIndex];

  const advance = useCallback(() => {
    if (!textDone) return;
    if (scene.choices) return; // Must pick a choice
    if (sceneIndex < scenes.length - 1) {
      setSceneIndex(i => i + 1);
      setTextDone(false);
    } else {
      setIsComplete(true);
    }
  }, [textDone, scene, sceneIndex, scenes.length]);

  const handleChoice = (choice: { nextSceneId: string; xp?: number }) => {
    setXpEarned(x => x + (choice.xp || 0));
    const nextIdx = scenes.findIndex(s => s.id === choice.nextSceneId);
    if (nextIdx >= 0) {
      setSceneIndex(nextIdx);
    } else {
      // If the next scene ID doesn't exist, just go to the next sequential scene
      if (sceneIndex < scenes.length - 1) setSceneIndex(i => i + 1);
      else setIsComplete(true);
    }
    setTextDone(false);
  };

  // ── Completion Screen ─────────────────
  if (isComplete) {
    return (
      <div className="relative w-full h-screen flex items-center justify-center bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.2),transparent_60%)]" />
        <Confetti count={40} />
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-panel p-12 rounded-3xl border border-paladin-gold text-center max-w-lg mx-4 relative z-10 shadow-[0_0_60px_rgba(212,175,55,0.2)]">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.3 }}>
            <Shield className="w-20 h-20 text-paladin-gold mx-auto mb-6" />
          </motion.div>
          <h1 className="font-cinzel text-4xl font-bold text-white mb-2">Lesson Complete!</h1>
          <p className="text-gray-400 mb-8">{lesson.title}</p>
          <div className="bg-[#16161a] p-6 rounded-2xl border border-white/5 mb-8">
            <p className="text-gray-400 text-sm mb-1">XP Earned</p>
            <motion.p
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.5 }}
              className="text-4xl font-bold text-paladin-gold"
            >
              +{lesson.xp_reward + xpEarned}
            </motion.p>
          </div>
          <div className="flex gap-4">
            <Link href={`/quiz/${lesson.id}`} className="flex-1">
              <button className="w-full bg-paladin-gold text-black py-4 rounded-xl font-bold hover:scale-105 transition-transform shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                Take the Quiz
              </button>
            </Link>
            <Link href="/dashboard" className="flex-1">
              <button className="w-full bg-white/5 border border-white/10 text-white py-4 rounded-xl font-bold hover:bg-white/10 transition-colors">
                Dashboard
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // ── Scene Renderer ────────────────────
  return (
    <div className="relative w-full h-screen overflow-hidden cursor-pointer select-none" onClick={advance}>
      {/* Dynamic Background with crossfade and Ken Burns */}
      <AnimatePresence mode="wait">
        <motion.div
          key={scene.id}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ 
            scale: [1.1, 1],
            opacity: 1 
          }}
          exit={{ opacity: 0 }}
          transition={{ 
            duration: 1.5,
            scale: { duration: 10, ease: "linear" } // Slow zoom
          }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${scene.backgroundUrl})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Character Portrait */}
      <AnimatePresence>
        {scene.characterImageUrl && (
          <motion.div
            key={`portrait-${scene.id}`}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 50 }}
            className="absolute bottom-32 left-8 md:left-20 z-10 w-48 md:w-80 pointer-events-none"
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border-2 border-paladin-gold/30 gold-glow">
              <img 
                src={scene.characterImageUrl} 
                alt={scene.character} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 z-30 px-4 pt-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-paladin-gold rounded-full"
              animate={{ width: `${((sceneIndex + 1) / scenes.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <span className="text-xs text-gray-400 shrink-0">{sceneIndex + 1}/{scenes.length}</span>
          <Link href="/dashboard" onClick={(e) => e.stopPropagation()}>
            <X className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
          </Link>
        </div>
      </div>

      {/* Lore Card overlay */}
      {scene.type === "lore_card" && (
        <div className="absolute inset-0 z-20 flex items-center justify-center p-8">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="max-w-lg glass-panel p-10 rounded-2xl border border-paladin-gold/30 text-center shadow-[0_0_40px_rgba(212,175,55,0.15)]"
          >
            <Scroll className="w-10 h-10 text-paladin-gold mx-auto mb-4" />
            <p className="text-lg text-gray-200 leading-relaxed">
              <Typewriter text={scene.dialogue} speed={20} onComplete={() => setTextDone(true)} />
            </p>
            {textDone && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-paladin-gold text-sm mt-6 flex items-center justify-center gap-1">
                Tap to continue <ChevronRight className="w-4 h-4" />
              </motion.p>
            )}
          </motion.div>
        </div>
      )}

      {/* Dialogue / Narration UI */}
      {scene.type !== "lore_card" && (
        <div className="absolute bottom-0 left-0 w-full p-4 md:p-8 z-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={scene.id}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="glass-panel p-6 md:p-8 rounded-xl border border-paladin-gold/20 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
            >
              {scene.character && (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-paladin-gold/10 border border-paladin-gold/30 mb-3">
                  <h3 className="font-cinzel text-sm font-bold text-paladin-gold">{scene.character}</h3>
                </div>
              )}

              <p className="text-base md:text-lg text-gray-200 leading-relaxed mb-4">
                <Typewriter text={scene.dialogue} speed={25} onComplete={() => setTextDone(true)} />
              </p>

              {/* Branching Choices */}
              {scene.choices && textDone && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-3 mt-4" onClick={(e) => e.stopPropagation()}>
                  {scene.choices.map((choice, i) => (
                    <motion.button
                      key={choice.id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                      onClick={() => handleChoice(choice)}
                      className="flex items-center justify-between w-full p-4 rounded-lg bg-white/5 hover:bg-paladin-gold/20 border border-white/10 hover:border-paladin-gold text-left transition-all group"
                    >
                      <span className="text-gray-200 group-hover:text-white">{choice.text}</span>
                      <div className="flex items-center gap-2 shrink-0">
                        {choice.xp && <span className="text-xs text-paladin-gold font-bold">+{choice.xp} XP</span>}
                        <ChevronRight className="w-5 h-5 text-paladin-gold" />
                      </div>
                    </motion.button>
                  ))}
                </motion.div>
              )}

              {/* Tap to continue */}
              {!scene.choices && textDone && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 2 }} className="text-paladin-gold/70 text-sm flex items-center gap-1">
                  Tap to continue <ChevronRight className="w-4 h-4" />
                </motion.p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
