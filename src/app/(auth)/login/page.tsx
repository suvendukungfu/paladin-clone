"use client";

import { motion } from "framer-motion";
import { Shield, Mail, Lock, ArrowRight, Github } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-paladin-charcoal flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.15),transparent_70%)]" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-8 md:p-12 rounded-3xl border border-paladin-gold/20 w-full max-w-md relative z-10 shadow-[0_0_50px_rgba(212,175,55,0.1)]"
      >
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-paladin-gold/10 rounded-2xl flex items-center justify-center mb-4 border border-paladin-gold/30">
            <Shield className="w-8 h-8 text-paladin-gold" />
          </div>
          <h1 className="font-cinzel text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400 text-center">Continue your historical journey.</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" />
              <input 
                type="email" 
                placeholder="historian@example.com" 
                className="w-full bg-[#16161a] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-paladin-gold focus:ring-1 focus:ring-paladin-gold transition-all"
              />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-sm font-medium text-gray-300">Password</label>
              <Link href="#" className="text-sm text-paladin-gold hover:text-white transition-colors">Forgot?</Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" />
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full bg-[#16161a] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-paladin-gold focus:ring-1 focus:ring-paladin-gold transition-all"
              />
            </div>
          </div>

          <Link href="/dashboard" className="block mt-6">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-paladin-gold text-black font-bold py-3.5 rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all flex items-center justify-center gap-2"
            >
              Sign In <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10">
          <button className="w-full bg-white/5 hover:bg-white/10 text-white font-medium py-3.5 rounded-xl border border-white/10 transition-colors flex items-center justify-center gap-3">
            <Github className="w-5 h-5" />
            Continue with Github
          </button>
        </div>

        <p className="text-center text-gray-400 mt-8 text-sm">
          Don't have an account? <Link href="/onboarding" className="text-paladin-gold font-semibold hover:text-white transition-colors">Begin Your Journey</Link>
        </p>
      </motion.div>
    </div>
  );
}
