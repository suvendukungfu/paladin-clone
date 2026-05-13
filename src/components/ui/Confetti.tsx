"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Piece {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  rotation: number;
  drift: number;
}

export function Confetti({ count = 50 }) {
  const [pieces, setPieces] = useState<Piece[]>([]);
  const colors = ["#D4AF37", "#C41E3A", "#22C55E", "#3B82F6", "#FFFFFF"];

  useEffect(() => {
    const newPieces = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: 50, // Start center
      y: 80, // Start bottom-ish
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 4,
      rotation: Math.random() * 360,
      drift: Math.random() * 400 - 200,
    }));
    setPieces(newPieces);
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[110] overflow-hidden">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          initial={{ x: "50vw", y: "80vh", opacity: 1, scale: 0, rotate: 0 }}
          animate={{
            x: `calc(50vw + ${p.drift}px)`,
            y: "-10vh",
            opacity: [1, 1, 0],
            scale: [0, 1, 0.5],
            rotate: p.rotation + 720,
          }}
          transition={{
            duration: Math.random() * 2 + 2,
            ease: "easeOut",
          }}
          className="absolute"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
          }}
        />
      ))}
    </div>
  );
}
