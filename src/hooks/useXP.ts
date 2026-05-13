import { useUserStore } from '@/store/userStore';

export function useXP() {
  const addXP = useUserStore((state) => state.addXP);
  const xp = useUserStore((state) => state.xp);
  const level = useUserStore((state) => state.level);
  const rank = useUserStore((state) => state.rank);

  const xpToNextLevel = level * 500;
  const xpInCurrentLevel = xp - ((level - 1) * 500);
  const progressPercent = Math.min(100, Math.max(0, (xpInCurrentLevel / 500) * 100));

  const earnXP = (amount: number, source: string) => {
    console.log(`Earned ${amount} XP from ${source}`);
    addXP(amount);
  };

  return {
    currentXP: xp,
    level,
    rank,
    xpToNextLevel,
    progressPercent,
    earnXP
  };
}
