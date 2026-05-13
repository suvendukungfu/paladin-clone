import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  username: string;
  avatar: string;
  xp: number;
  level: number;
  streak: number;
  completedLessons: string[];
  unlockedAchievements: string[];
  rank: string;
  addXP: (amount: number) => void;
  completeLesson: (id: string) => void;
  unlockAchievement: (id: string) => void;
  incrementStreak: () => void;
  setStreak: (streak: number) => void;
  setUsername: (name: string) => void;
}

const RANKS = [
  { min: 0, title: "Novice Historian" },
  { min: 5, title: "Empire Scholar" },
  { min: 15, title: "Timeline Keeper" },
  { min: 25, title: "Grand Strategist" },
  { min: 36, title: "Master Historian" },
];

function getRank(level: number): string {
  let rank = RANKS[0].title;
  for (const r of RANKS) {
    if (level >= r.min) rank = r.title;
  }
  return rank;
}

function getLevel(xp: number): number {
  return Math.floor(xp / 500) + 1;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      username: "Historian",
      avatar: "🛡️",
      xp: 0,
      level: 1,
      streak: 5,
      completedLessons: [],
      unlockedAchievements: [],
      rank: "Novice Historian",

      addXP: (amount: number) =>
        set((state) => {
          const newXP = state.xp + amount;
          const newLevel = getLevel(newXP);
          return { xp: newXP, level: newLevel, rank: getRank(newLevel) };
        }),

      completeLesson: (id: string) =>
        set((state) => ({
          completedLessons: state.completedLessons.includes(id)
            ? state.completedLessons
            : [...state.completedLessons, id],
        })),

      unlockAchievement: (id: string) =>
        set((state) => ({
          unlockedAchievements: state.unlockedAchievements.includes(id)
            ? state.unlockedAchievements
            : [...state.unlockedAchievements, id],
        })),

      incrementStreak: () =>
        set((state) => ({ streak: state.streak + 1 })),

      setStreak: (streak: number) => set({ streak }),

      setUsername: (name: string) => set({ username: name }),
    }),
    { name: "paladin-user-store" }
  )
);
