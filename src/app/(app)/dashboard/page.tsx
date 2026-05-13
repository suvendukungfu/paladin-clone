"use client";

import { motion } from "framer-motion";
import { Shield, Swords, Crown, Flame, Zap, BookOpen, Target, Trophy, ArrowRight, Calendar, Star, Info } from "lucide-react";
import { StatBar } from "@/components/dashboard/StatBar";
import { DailyChallenges } from "@/components/dashboard/DailyChallenges";
import { LearningMap } from "@/components/dashboard/LearningMap";
import Link from "next/link";
import { LESSONS } from "@/data/seed";
import { useXP } from "@/hooks/useXP";
import { useUserStore } from "@/store/userStore";
import { useState, useEffect } from "react";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function DashboardPage() {
  const { xp, streak, username } = useUserStore();
  const { level, rank } = useXP();
  const [mounted, setMounted] = useState(false);
  const continueLesson = LESSONS[0];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-8 pb-24">
      {/* ── Global Announcement Ticker ── */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8 p-3 rounded-2xl bg-paladin-gold/5 border border-paladin-gold/20 flex items-center justify-between gap-4 px-6 overflow-hidden"
      >
        <div className="flex items-center gap-3">
           <div className="w-2 h-2 rounded-full bg-paladin-gold animate-pulse" />
           <p className="text-[10px] font-black uppercase tracking-widest text-paladin-gold/80">World Event: Siege of Carthage Live Now</p>
        </div>
        <div className="hidden md:flex items-center gap-2 text-[10px] font-bold text-white/40 uppercase">
           <span>Total Historians Online: 12.4K</span>
           <Info className="w-3 h-3" />
        </div>
      </motion.div>

      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
        <div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl md:text-5xl font-cinzel font-bold text-white tracking-tighter"
          >
            Hail, <span className="text-paladin-gold drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]">{username || "Historian"}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-gray-400 mt-2 flex items-center gap-2 font-medium">
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500/20" /> 
            You&apos;re on a <span className="text-white font-bold">{streak}-day streak</span>. Your legacy grows.
          </motion.p>
        </div>
        <StatBar />
      </header>

      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ── LEFT COLUMN ── */}
        <div className="lg:col-span-2 space-y-8">
          {/* Continue Learning Card */}
          <motion.div variants={item}>
            <Link href={`/lessons/${continueLesson.id}`}>
              <div className="glass-panel rounded-[2rem] overflow-hidden border border-white/5 group cursor-pointer hover:border-paladin-gold/30 transition-all shadow-xl hover:shadow-paladin-gold/5">
                <div className="h-56 bg-cover bg-center relative" style={{ backgroundImage: `url(${continueLesson.cover_image})` }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-black/40 to-transparent" />
                  <div className="absolute bottom-6 left-8 right-8">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-black text-black bg-paladin-gold px-3 py-1 rounded-full uppercase tracking-widest">{continueLesson.era}</span>
                      <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full border border-white/5">Current Quest</span>
                    </div>
                    <h3 className="font-cinzel text-3xl font-bold text-white mt-2 tracking-tight group-hover:text-paladin-gold transition-colors">{continueLesson.title}</h3>
                  </div>
                </div>
                <div className="p-8 flex items-center justify-between bg-[#0A0A0C]">
                  <div className="max-w-md">
                    <p className="text-gray-400 text-sm leading-relaxed">{continueLesson.description}</p>
                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center gap-1.5 text-xs text-paladin-gold font-bold uppercase tracking-widest">
                         <Zap className="w-3.5 h-3.5 fill-paladin-gold" />
                         +{continueLesson.xp_reward} XP
                      </div>
                      <div className="w-1 h-1 rounded-full bg-white/10" />
                      <div className="text-xs text-gray-500 font-bold uppercase tracking-widest">{continueLesson.difficulty}</div>
                    </div>
                  </div>
                  <motion.div whileHover={{ scale: 1.1, x: 5 }} className="bg-paladin-gold text-black p-4 rounded-2xl shadow-[0_0_30px_rgba(212,175,55,0.3)] group-hover:shadow-[0_0_40px_rgba(212,175,55,0.6)] transition-all">
                    <ArrowRight className="w-6 h-6" />
                  </motion.div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Learning Map */}
          <motion.div variants={item} className="relative">
             <div className="absolute -top-4 -left-4 w-24 h-24 bg-paladin-gold/5 blur-3xl rounded-full" />
             <LearningMap />
          </motion.div>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div className="space-y-8">
          {/* Profile Card */}
          <motion.div variants={item} className="glass-panel rounded-[2rem] p-8 border border-white/5 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
               <Shield className="w-24 h-24 text-paladin-gold" />
            </div>
            <div className="w-24 h-24 rounded-full bg-paladin-gold/5 border-2 border-paladin-gold mx-auto mb-6 flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.2)] relative">
              <Shield className="w-12 h-12 text-paladin-gold drop-shadow-lg" />
              <div className="absolute -bottom-2 -right-2 bg-black border border-paladin-gold w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black text-paladin-gold">LV.{level}</div>
            </div>
            <h3 className="font-cinzel text-2xl font-bold text-white tracking-tight">{username || "Historian"}</h3>
            <div className="inline-block mt-2 px-4 py-1 rounded-full bg-paladin-gold/10 border border-paladin-gold/20">
               <p className="text-paladin-gold text-[10px] font-black uppercase tracking-[0.2em]">{rank}</p>
            </div>
            
            <div className="mt-8 grid grid-cols-3 gap-2">
              <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                <p className="text-xl font-black text-white">{level}</p>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Level</p>
              </div>
              <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                <p className="text-xl font-black text-paladin-gold">{xp >= 1000 ? (xp/1000).toFixed(1) + 'K' : xp}</p>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">XP</p>
              </div>
              <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                <p className="text-xl font-black text-red-400 flex items-center justify-center gap-1">{streak}</p>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Streak</p>
              </div>
            </div>
          </motion.div>

          {/* Daily Challenge */}
          <motion.div variants={item}>
            <DailyChallenges />
          </motion.div>

          {/* Streak Calendar */}
          <motion.div variants={item} className="glass-panel rounded-[2rem] p-8 border border-white/5 shadow-lg">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-paladin-gold mb-6 flex items-center gap-3">
              <Calendar className="w-4 h-4" /> Weekly Devotion
            </h3>
            <div className="flex justify-between items-center px-2">
              {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
                <div key={i} className="flex flex-col items-center gap-3">
                  <span className="text-[10px] font-black text-white/30 tracking-widest">{day}</span>
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${
                    i < 5 
                      ? 'bg-paladin-gold/10 border border-paladin-gold/30 text-paladin-gold shadow-[0_0_15px_rgba(212,175,55,0.1)]' 
                      : 'bg-white/5 border border-white/5 text-gray-600'
                  }`}>
                    {i < 5 ? <Flame className="w-5 h-5 fill-paladin-gold/20" /> : <div className="w-1.5 h-1.5 rounded-full bg-white/10" />}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Leaderboard Preview */}
          <motion.div variants={item} className="glass-panel rounded-[2rem] p-8 border border-white/5 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-paladin-gold flex items-center gap-3">
                <Star className="w-4 h-4" /> Grand Ranks
              </h3>
              <Link href="/leaderboard" className="text-[10px] font-black text-white/40 hover:text-paladin-gold transition-colors uppercase tracking-widest">Full Rankings →</Link>
            </div>
            <div className="space-y-1">
              {[
                { rank: 1, name: "AlexanderTheGreat", xp: "15.4K", avatar: "🏛️" },
                { rank: 2, name: "CleopatraVII", xp: "14.2K", avatar: "👑" },
                { rank: 3, name: "SunTzu", xp: "13.8K", avatar: "⚔️" },
              ].map((user, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-2xl hover:bg-white/5 transition-colors group cursor-pointer border border-transparent hover:border-white/5">
                  <div className="flex items-center gap-4">
                    <span className={`w-6 text-xs font-black ${i === 0 ? 'text-yellow-400' : i === 1 ? 'text-gray-300' : 'text-amber-600'}`}>0{user.rank}</span>
                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-lg border border-white/5 group-hover:border-white/10 transition-all">{user.avatar}</div>
                    <span className="text-xs font-bold text-white group-hover:text-paladin-gold transition-colors">{user.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-black text-white/70">{user.xp}</p>
                    <p className="text-[8px] font-black text-gray-600 uppercase tracking-tighter">XP</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
