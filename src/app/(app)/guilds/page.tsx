"use client";

import { motion } from "framer-motion";
import { Users } from "lucide-react";

export default function GuildsPage() {
  return (
    <div className="max-w-6xl mx-auto p-8">
      <header className="mb-12">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-cinzel font-bold text-paladin-gold flex items-center gap-4"
        >
          <Users className="w-10 h-10" />
          Guilds & Alliances
        </motion.h1>
        <p className="text-gray-400 mt-2">Join forces with other historians and compete in guild wars.</p>
      </header>

      <div className="flex flex-col items-center justify-center h-[50vh] text-center">
        <div className="w-24 h-24 rounded-full bg-paladin-gold/10 flex items-center justify-center mb-6">
          <Users className="w-12 h-12 text-paladin-gold" />
        </div>
        <h2 className="text-2xl font-cinzel font-bold mb-2">Guild System Locked</h2>
        <p className="text-gray-400 max-w-md mb-6">Reach Level 10 to unlock Guilds and participate in multiplayer historical events.</p>
        <button className="bg-paladin-gold text-black font-bold px-8 py-3 rounded-full opacity-50 cursor-not-allowed">
          Unlock at Level 10
        </button>
      </div>
    </div>
  );
}
