"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, BookOpen, Trophy, Map, Settings, Zap } from "lucide-react";

const navItems = [
  { icon: Home, label: "Home", path: "/dashboard" },
  { icon: BookOpen, label: "Lessons", path: "/lessons" },
  { icon: Map, label: "Skill Tree", path: "/skill-tree" },
  { icon: Trophy, label: "Ranks", path: "/leaderboard" },
  { icon: Settings, label: "Profile", path: "/settings" }, // Mock profile
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[60] px-4 pb-6 pt-2 bg-gradient-to-t from-black via-black/95 to-transparent">
      <div className="glass-panel h-16 rounded-2xl flex items-center justify-around border border-white/10 relative overflow-hidden">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link key={item.label} href={item.path} className="relative flex flex-col items-center justify-center w-full h-full group">
              {isActive && (
                <motion.div
                  layoutId="bottomNavActive"
                  className="absolute inset-0 bg-paladin-gold/10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <item.icon className={`w-6 h-6 mb-0.5 transition-all ${isActive ? "text-paladin-gold scale-110" : "text-gray-400 group-hover:text-white"}`} />
              <span className={`text-[10px] font-medium transition-colors ${isActive ? "text-paladin-gold" : "text-gray-500"}`}>
                {item.label}
              </span>
              {isActive && (
                <motion.div 
                  layoutId="navIndicator"
                  className="absolute bottom-0 w-8 h-1 bg-paladin-gold rounded-t-full shadow-[0_-2px_10px_rgba(212,175,55,1)]" 
                />
              )}
            </Link>
          );
        })}
      </div>
      
      {/* Quick Action Float */}
      <Link href="/daily-challenge" className="absolute -top-12 left-1/2 -translate-x-1/2">
        <motion.div 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 rounded-full bg-paladin-gold flex items-center justify-center text-black gold-glow border-4 border-paladin-charcoal"
        >
          <Zap className="w-7 h-7 fill-black" />
        </motion.div>
      </Link>
    </div>
  );
}
