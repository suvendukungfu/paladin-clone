"use client";

import { motion } from "framer-motion";
import { BookOpen, Clock, Zap, ArrowRight, Shield } from "lucide-react";
import Link from "next/link";
import { LESSONS } from "@/data/seed";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function LessonsPage() {
  return (
    <div className="max-w-6xl mx-auto p-6 md:p-8">
      <header className="mb-10">
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-cinzel font-bold text-paladin-gold flex items-center gap-4">
          <BookOpen className="w-10 h-10" /> Lesson Library
        </motion.h1>
        <p className="text-gray-400 mt-2">Choose your next historical adventure.</p>
      </header>

      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {LESSONS.map((lesson) => (
          <motion.div key={lesson.id} variants={item}>
            <Link href={`/lessons/${lesson.id}`}>
              <div className="glass-panel rounded-2xl overflow-hidden border border-white/5 group cursor-pointer hover:border-paladin-gold/30 transition-colors h-full">
                <div className="h-48 bg-cover bg-center relative" style={{ backgroundImage: `url(${lesson.cover_image})` }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#16161a] via-black/40 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                      lesson.difficulty === 'Easy' ? 'bg-emerald-500/20 text-emerald-400' :
                      lesson.difficulty === 'Medium' ? 'bg-paladin-gold/20 text-paladin-gold' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {lesson.difficulty}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-6">
                    <span className="text-xs font-bold text-paladin-gold/80 uppercase tracking-wider">{lesson.era}</span>
                    <h3 className="font-cinzel text-2xl font-bold text-white mt-1">{lesson.title}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-400 text-sm mb-4">{lesson.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1 text-xs text-paladin-gold font-bold">
                        <Zap className="w-3.5 h-3.5" /> +{lesson.xp_reward} XP
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <Clock className="w-3.5 h-3.5" /> {lesson.scenes.length} scenes
                      </span>
                    </div>
                    <div className="bg-paladin-gold/10 p-2 rounded-lg group-hover:bg-paladin-gold/20 transition-colors">
                      <ArrowRight className="w-4 h-4 text-paladin-gold" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
