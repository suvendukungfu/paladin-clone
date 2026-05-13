"use client";

import { motion } from "framer-motion";
import { Settings, User, Bell, Shield as ShieldIcon } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <header className="mb-12">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-cinzel font-bold text-paladin-gold flex items-center gap-4"
        >
          <Settings className="w-10 h-10" />
          Settings
        </motion.h1>
      </header>

      <div className="space-y-6">
        {[
          { icon: User, title: "Profile Settings", desc: "Change your avatar, username, and bio." },
          { icon: Bell, title: "Notifications", desc: "Manage alerts for daily streaks and guild wars." },
          { icon: ShieldIcon, title: "Account Security", desc: "Password, 2FA, and connected accounts." },
        ].map((section, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel p-6 rounded-2xl border border-white/5 flex items-start gap-4 hover:border-paladin-gold/30 transition-colors cursor-pointer"
          >
            <div className="p-3 bg-white/5 rounded-xl">
              <section.icon className="w-6 h-6 text-paladin-gold" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">{section.title}</h3>
              <p className="text-gray-400">{section.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
