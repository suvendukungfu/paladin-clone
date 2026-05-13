"use client";

import { useState, useEffect, use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Timer, Zap, ArrowRight, ShieldCheck, XCircle, Sparkles, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { DEMO_QUIZZES } from "@/data/seed";

export default function QuizPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const quiz = DEMO_QUIZZES.find(q => q.lesson_id === id) || DEMO_QUIZZES[0];

  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(1);
  const [timeLeft, setTimeLeft] = useState(20);
  const [isFinished, setIsFinished] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [showXP, setShowXP] = useState(false);

  const question = quiz.questions[currentQ];

  useEffect(() => {
    if (timeLeft > 0 && !isAnswered && !isFinished) {
      const t = setTimeout(() => setTimeLeft(l => l - 1), 1000);
      return () => clearTimeout(t);
    } else if (timeLeft === 0 && !isAnswered) {
      handleAnswer(-1);
    }
  }, [timeLeft, isAnswered, isFinished]);

  const handleAnswer = (index: number) => {
    if (isAnswered) return;
    setSelected(index);
    setIsAnswered(true);

    if (index === question.correctIndex) {
      const xpGain = 100 * combo;
      setScore(s => s + xpGain);
      setCombo(c => Math.min(c + 1, 5));
      setCorrect(c => c + 1);
      setShowXP(true);
      setTimeout(() => setShowXP(false), 1200);
    } else {
      setCombo(1);
    }
  };

  const nextQuestion = () => {
    if (currentQ < quiz.questions.length - 1) {
      setCurrentQ(q => q + 1);
      setSelected(null);
      setIsAnswered(false);
      setTimeLeft(20);
    } else {
      setIsFinished(true);
    }
  };

  const accuracy = quiz.questions.length > 0 ? Math.round((correct / quiz.questions.length) * 100) : 0;

  // ── Completion Screen ─────────────────
  if (isFinished) {
    const grade = accuracy >= 90 ? "S" : accuracy >= 70 ? "A" : accuracy >= 50 ? "B" : "C";
    const gradeColor = grade === "S" ? "text-paladin-gold" : grade === "A" ? "text-emerald-400" : grade === "B" ? "text-blue-400" : "text-gray-400";

    return (
      <div className="max-w-2xl mx-auto p-8 text-center pt-16">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-panel p-10 rounded-3xl border border-paladin-gold shadow-[0_0_50px_rgba(212,175,55,0.2)]">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }}>
            <ShieldCheck className="w-20 h-20 text-paladin-gold mx-auto mb-4" />
          </motion.div>
          <h1 className="font-cinzel text-4xl font-bold mb-2 text-white">Quest Complete!</h1>
          <p className="text-gray-400 mb-8">Your historical knowledge has been tested.</p>
          
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-[#16161a] p-5 rounded-2xl border border-white/5">
              <p className="text-gray-400 text-xs mb-1">Grade</p>
              <motion.p initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4 }} className={`text-4xl font-cinzel font-bold ${gradeColor}`}>{grade}</motion.p>
            </div>
            <div className="bg-[#16161a] p-5 rounded-2xl border border-white/5">
              <p className="text-gray-400 text-xs mb-1">Score</p>
              <motion.p initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }} className="text-3xl font-bold text-paladin-gold">{score}</motion.p>
            </div>
            <div className="bg-[#16161a] p-5 rounded-2xl border border-white/5">
              <p className="text-gray-400 text-xs mb-1">Accuracy</p>
              <motion.p initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.6 }} className="text-3xl font-bold text-emerald-400">{accuracy}%</motion.p>
            </div>
          </div>

          <Link href="/dashboard">
            <button className="bg-paladin-gold text-black px-10 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform w-full shadow-[0_0_20px_rgba(212,175,55,0.3)]">
              Return to Dashboard
            </button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 md:p-8 pt-12">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${combo > 1 ? 'bg-paladin-gold/10 border-paladin-gold' : 'bg-[#16161a] border-white/5'}`}>
            <Zap className={`w-5 h-5 ${combo > 1 ? 'text-paladin-gold fill-paladin-gold' : 'text-gray-500'}`} />
            <span className={`font-bold ${combo > 1 ? 'text-paladin-gold' : 'text-white'}`}>{combo}x</span>
          </div>
          <span className="text-sm text-gray-400">Q{currentQ + 1}/{quiz.questions.length}</span>
        </div>

        {/* Score with floating XP animation */}
        <div className="relative">
          <p className="font-cinzel text-2xl font-bold text-paladin-gold">
            {score} <span className="text-sm text-gray-400">XP</span>
          </p>
          <AnimatePresence>
            {showXP && (
              <motion.span
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 0, y: -30 }}
                exit={{ opacity: 0 }}
                className="absolute -top-4 right-0 text-sm font-bold text-emerald-400"
              >
                +{100 * combo}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Timer Bar */}
      <div className="w-full h-2.5 bg-[#16161a] rounded-full overflow-hidden mb-10 border border-white/5">
        <motion.div 
          className={`h-full rounded-full transition-colors ${timeLeft < 5 ? 'bg-red-500' : timeLeft < 10 ? 'bg-orange-400' : 'bg-paladin-gold'}`}
          animate={{ width: `${(timeLeft / 20) * 100}%` }}
          transition={{ duration: 1, ease: "linear" }}
        />
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentQ}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          className="glass-panel p-8 rounded-3xl border border-white/10"
        >
          <h2 className="text-xl md:text-2xl font-semibold leading-relaxed mb-8 text-white">
            {question.question}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {question.options.map((opt: string, i: number) => {
              let stateClass = "bg-[#16161a] border-white/10 hover:border-paladin-gold/50 hover:bg-white/[0.03]";
              if (isAnswered) {
                if (i === question.correctIndex) stateClass = "bg-emerald-500/15 border-emerald-500 text-emerald-300";
                else if (i === selected) stateClass = "bg-red-500/15 border-red-500 text-red-300";
                else stateClass = "bg-[#16161a] border-white/5 opacity-40";
              }

              return (
                <motion.button 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleAnswer(i)}
                  disabled={isAnswered}
                  className={`p-5 rounded-xl border text-left font-medium transition-all flex items-center gap-3 ${stateClass}`}
                >
                  {isAnswered && i === question.correctIndex && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
                  {isAnswered && i === selected && i !== question.correctIndex && <XCircle className="w-5 h-5 text-red-400 shrink-0" />}
                  <span>{opt}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Feedback */}
          <AnimatePresence>
            {isAnswered && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-6 p-5 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border ${
                  selected === question.correctIndex 
                    ? 'bg-emerald-500/10 border-emerald-500/30' 
                    : 'bg-red-500/10 border-red-500/30'
                }`}
              >
                <div>
                  <p className={`font-bold mb-1 ${selected === question.correctIndex ? 'text-emerald-400' : 'text-red-400'}`}>
                    {selected === question.correctIndex ? "Excellent!" : "Not quite."}
                  </p>
                  <p className="text-gray-300 text-sm">{question.explanation}</p>
                </div>
                <button onClick={nextQuestion} className="bg-paladin-gold text-black px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:scale-105 transition-transform shrink-0">
                  {currentQ < quiz.questions.length - 1 ? "Next" : "Finish"} <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
