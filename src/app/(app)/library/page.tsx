"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

export default function LibraryPage() {
  return (
    <div className="max-w-6xl mx-auto p-8">
      <header className="mb-12">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-cinzel font-bold text-paladin-gold flex items-center gap-4"
        >
          <BookOpen className="w-10 h-10" />
          The Grand Library
        </motion.h1>
        <p className="text-gray-400 mt-2">Explore past lessons, stories, and historical archives.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel h-48 rounded-2xl p-6 border border-white/5 hover:border-paladin-gold/50 cursor-pointer flex flex-col justify-end relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-paladin-gold/5 group-hover:bg-paladin-gold/10 transition-colors" />
            <h3 className="relative z-10 font-cinzel font-bold text-xl">Archive Tome #{i}</h3>
            <p className="relative z-10 text-sm text-gray-400">Locked</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
