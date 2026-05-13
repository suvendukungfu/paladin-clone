"use client";

import { Shield, Map, BookOpen, Users, Award, Settings, Compass, Swords, Trophy, ChevronLeft, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const navItems = [
  { icon: Map, label: "Dashboard", href: "/dashboard" },
  { icon: BookOpen, label: "Lessons", href: "/lessons" },
  { icon: Compass, label: "Skill Tree", href: "/skill-tree" },
  { icon: Trophy, label: "Achievements", href: "/achievements" },
  { icon: Users, label: "Leaderboard", href: "/leaderboard" },
  { icon: Settings, label: "Admin", href: "/admin" },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button onClick={() => setCollapsed(!collapsed)} className="md:hidden fixed top-4 left-4 z-50 bg-[#16161a] p-2 rounded-lg border border-white/10">
        <Menu className="w-5 h-5 text-paladin-gold" />
      </button>

      <aside className={`${collapsed ? 'w-20' : 'w-64'} hidden md:flex bg-[#16161a] border-r border-white/5 p-4 flex-col h-full shrink-0 transition-all duration-300 relative`}>
        {/* Logo */}
        <div className="flex items-center gap-3 text-paladin-gold font-cinzel font-bold tracking-wider mb-10 px-2">
          <Shield className="w-7 h-7 shrink-0" />
          {!collapsed && <span className="text-xl">PALADIN</span>}
        </div>

        {/* Collapse toggle */}
        <button onClick={() => setCollapsed(!collapsed)} className="absolute -right-3 top-16 bg-[#16161a] border border-white/10 rounded-full p-1 z-10 hover:bg-white/5 transition-colors">
          <ChevronLeft className={`w-3.5 h-3.5 text-gray-400 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
        </button>

        {/* Nav */}
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.label} href={item.href}>
                <span className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                  isActive ? "text-paladin-gold" : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                }`} title={collapsed ? item.label : undefined}>
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute inset-0 bg-paladin-gold/10 rounded-xl border border-paladin-gold/20"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <item.icon className="w-5 h-5 relative z-10 shrink-0" />
                  {!collapsed && <span className="font-medium relative z-10 text-sm">{item.label}</span>}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Pro CTA */}
        {!collapsed && (
          <div className="mt-auto p-4 glass-panel rounded-2xl text-center">
            <div className="w-10 h-10 bg-paladin-gold/20 rounded-full mx-auto mb-2 flex items-center justify-center border border-paladin-gold/30">
              <Shield className="text-paladin-gold w-5 h-5" />
            </div>
            <p className="text-sm font-semibold text-white">Pro Status</p>
            <p className="text-xs text-gray-400 mt-0.5">Unlock all eras</p>
            <button className="w-full mt-3 bg-paladin-gold/10 text-paladin-gold hover:bg-paladin-gold hover:text-black py-2 rounded-lg text-xs font-bold transition-colors">
              Upgrade
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
