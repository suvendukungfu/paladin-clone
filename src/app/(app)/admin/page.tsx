"use client";

import { motion } from "framer-motion";
import { Users, BookOpen, BrainCircuit, ShieldAlert, Award } from "lucide-react";

export default function AdminPanel() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-cinzel text-3xl font-bold text-white mb-2">Grandmaster Archives</h1>
          <p className="text-gray-400">Admin Control Panel</p>
        </div>
        <div className="bg-red-500/20 text-red-400 border border-red-500/50 px-4 py-2 rounded-lg font-bold flex items-center gap-2">
          <ShieldAlert className="w-5 h-5" /> Admin Access
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { label: "Total Historians", value: "1,248", icon: Users, color: "text-blue-400" },
          { label: "Active Lessons", value: "24", icon: BookOpen, color: "text-emerald-400" },
          { label: "Quizzes Taken", value: "8,932", icon: BrainCircuit, color: "text-purple-400" },
          { label: "XP Distributed", value: "1.4M", icon: Award, color: "text-paladin-gold" }
        ].map((stat) => (
          <div key={stat.label} className="glass-panel p-6 rounded-2xl border border-white/5">
            <div className="flex justify-between items-start mb-4">
              <p className="text-gray-400 font-medium">{stat.label}</p>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <p className="text-3xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-panel p-6 rounded-2xl border border-white/5">
          <h2 className="text-xl font-bold text-white mb-6">Recent User Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="flex justify-between items-center p-4 bg-[#16161a] rounded-xl border border-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-800 rounded-full" />
                  <div>
                    <p className="text-white font-medium">User_{1000 + i}</p>
                    <p className="text-xs text-gray-500">Completed Lesson: Rome Fall</p>
                  </div>
                </div>
                <span className="text-paladin-gold font-bold">+250 XP</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-white/5">
          <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-6 bg-[#16161a] hover:bg-white/5 border border-white/10 rounded-xl text-center transition-colors">
              <BookOpen className="w-8 h-8 text-paladin-gold mx-auto mb-3" />
              <span className="font-bold text-white">New Lesson</span>
            </button>
            <button className="p-6 bg-[#16161a] hover:bg-white/5 border border-white/10 rounded-xl text-center transition-colors">
              <BrainCircuit className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <span className="font-bold text-white">Create Quiz</span>
            </button>
            <button className="p-6 bg-[#16161a] hover:bg-white/5 border border-white/10 rounded-xl text-center transition-colors">
              <Award className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
              <span className="font-bold text-white">Set Daily</span>
            </button>
            <button className="p-6 bg-[#16161a] hover:bg-white/5 border border-white/10 rounded-xl text-center transition-colors">
              <Users className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <span className="font-bold text-white">Manage Users</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
