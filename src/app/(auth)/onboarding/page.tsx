"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Sparkles, User, Target, ChevronRight, Check } from "lucide-react";
import Link from "next/link";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";

export default function OnboardingWizard() {
  const [step, setStep] = useState(1);
  const [nameInput, setNameInput] = useState("");
  const [selectedEras, setSelectedEras] = useState<string[]>([]);
  const { setUsername, setStreak } = useUserStore();
  const router = useRouter();

  const eras = ["Ancient Rome", "Feudal Japan", "Viking Age", "Ancient Egypt", "Renaissance", "WWII"];

  const handleToggleEra = (era: string) => {
    if (selectedEras.includes(era)) {
      setSelectedEras(selectedEras.filter(e => e !== era));
    } else {
      setSelectedEras([...selectedEras, era]);
    }
  };

  const handleComplete = () => {
    if (nameInput) {
      setUsername(nameInput);
    }
    setStreak(1); // Start with a 1-day streak
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-paladin-charcoal flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.15),transparent_50%)]" />
      
      {/* ── Background Particles ── */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
         {Array.from({ length: 20 }).map((_, i) => (
           <motion.div
             key={i}
             className="absolute w-1 h-1 bg-paladin-gold rounded-full"
             initial={{ x: `${Math.random() * 100}%`, y: `${Math.random() * 100}%` }}
             animate={{ y: [null, `${Math.random() * 100}%`], opacity: [0, 1, 0] }}
             transition={{ duration: Math.random() * 10 + 10, repeat: Infinity }}
           />
         ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-full max-w-md flex gap-2 px-4 z-20">
        {[1, 2, 3].map((s) => (
          <div key={s} className="h-1.5 flex-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-paladin-gold"
              initial={{ width: 0 }}
              animate={{ width: step >= s ? "100%" : "0%" }}
            />
          </div>
        ))}
      </div>

      <div className="w-full max-w-lg relative z-10">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="glass-panel p-8 md:p-12 rounded-3xl border border-white/10 text-center shadow-2xl backdrop-blur-xl"
            >
              <div className="w-20 h-20 bg-paladin-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-paladin-gold/30">
                <User className="w-10 h-10 text-paladin-gold" />
              </div>
              <h2 className="font-cinzel text-4xl font-bold mb-4 text-white tracking-tighter">Your Identity?</h2>
              <p className="text-gray-400 mb-8 font-medium">Every legend begins with a name. How shall the scrolls remember you?</p>
              
              <div className="relative mb-8">
                <input 
                  type="text" 
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="The Nameless Knight" 
                  className="w-full bg-[#16161a] border border-white/10 rounded-2xl py-5 px-6 text-xl text-center text-white focus:outline-none focus:border-paladin-gold transition-all"
                />
                {nameInput && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute right-4 top-1/2 -translate-y-1/2 text-paladin-gold">
                    <Check className="w-6 h-6" />
                  </motion.div>
                )}
              </div>
              
              <button 
                onClick={() => nameInput && setStep(2)} 
                disabled={!nameInput}
                className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all
                  ${nameInput ? 'bg-paladin-gold text-black shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:scale-[1.02]' : 'bg-white/5 text-white/20 cursor-not-allowed'}
                `}
              >
                Next <ChevronRight className="w-6 h-6" />
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="glass-panel p-8 md:p-12 rounded-3xl border border-white/10 text-center shadow-2xl backdrop-blur-xl"
            >
              <div className="w-20 h-20 bg-paladin-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-paladin-gold/30">
                <Sparkles className="w-10 h-10 text-paladin-gold" />
              </div>
              <h2 className="font-cinzel text-4xl font-bold mb-4 text-white tracking-tighter">Choose Your Path</h2>
              <p className="text-gray-400 mb-8 font-medium">Which eras of history resonate with your soul?</p>
              
              <div className="grid grid-cols-2 gap-3 mb-8">
                {eras.map(era => (
                  <button 
                    key={era} 
                    onClick={() => handleToggleEra(era)}
                    className={`px-4 py-4 rounded-2xl border transition-all font-bold text-sm
                      ${selectedEras.includes(era) 
                        ? 'border-paladin-gold bg-paladin-gold/20 text-paladin-gold shadow-[0_0_20px_rgba(212,175,55,0.2)]' 
                        : 'border-white/5 bg-white/5 text-white/50 hover:border-white/20'}
                    `}
                  >
                    {era}
                  </button>
                ))}
              </div>
              
              <button 
                onClick={() => selectedEras.length > 0 && setStep(3)} 
                disabled={selectedEras.length === 0}
                className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all
                  ${selectedEras.length > 0 ? 'bg-paladin-gold text-black shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:scale-[1.02]' : 'bg-white/5 text-white/20 cursor-not-allowed'}
                `}
              >
                Assemble <ChevronRight className="w-6 h-6" />
              </button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="glass-panel p-8 md:p-12 rounded-3xl border border-white/10 text-center shadow-2xl backdrop-blur-xl"
            >
              <div className="w-20 h-20 bg-paladin-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-paladin-gold/30">
                <Target className="w-10 h-10 text-paladin-gold" />
              </div>
              <h2 className="font-cinzel text-4xl font-bold mb-4 text-white tracking-tighter">Seal Your Resolve</h2>
              <p className="text-gray-400 mb-8 font-medium">How often shall you return to the chronicles?</p>
              
              <div className="space-y-4 mb-8">
                {[
                  { title: "Squire", desc: "Casual learning (5 min/day)", time: "5m", color: "border-emerald-500/20" },
                  { title: "Knight", desc: "Regular training (10 min/day)", time: "10m", color: "border-blue-500/20" },
                  { title: "Paladin", desc: "Legendary mastery (20 min/day)", time: "20m", color: "border-paladin-gold/20" },
                ].map(goal => (
                  <button key={goal.title} className={`w-full group flex items-center justify-between p-5 rounded-2xl border ${goal.color} bg-white/5 hover:border-paladin-gold/40 hover:bg-paladin-gold/5 transition-all text-left`}>
                    <div>
                      <span className="block font-black text-white text-lg tracking-tighter uppercase">{goal.title}</span>
                      <span className="text-xs text-gray-500 font-medium">{goal.desc}</span>
                    </div>
                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-paladin-gold/40">
                       <span className="text-xs font-bold text-paladin-gold">{goal.time}</span>
                    </div>
                  </button>
                ))}
              </div>
              
              <button 
                onClick={handleComplete}
                className="w-full bg-paladin-gold text-black font-black uppercase tracking-[0.2em] py-5 rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] transition-all shadow-[0_0_50px_rgba(212,175,55,0.4)]"
              >
                Begin Journey <Shield className="w-6 h-6" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
