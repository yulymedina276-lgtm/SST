import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Badge, GamificationState } from '../types/gamification';
import { INITIAL_BADGES } from '../data/gamificationData';

interface GamificationContextType {
  state: GamificationState;
  addXp: (amount: number, reason?: string) => void;
  unlockBadge: (badgeId: string) => void;
  incrementStreak: () => void;
  resetStreak: () => void;
  incrementChallenges: () => void;
  toastMessage: string | null;
  setToastMessage: (msg: string | null) => void;
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

export const GamificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<GamificationState>(() => {
    const saved = localStorage.getItem('sst_cdath_gamification');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error loading gamification state', e);
      }
    }
    return {
      xp: 120,
      level: 1,
      levelTitle: 'Aprendiz en Prevención',
      streak: 1,
      badges: INITIAL_BADGES,
      challengesCompleted: 0,
    };
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('sst_cdath_gamification', JSON.stringify(state));
  }, [state]);

  const calculateLevel = (xp: number): { level: number; title: string } => {
    if (xp >= 800) return { level: 4, title: 'Especialista Máster en SST' };
    if (xp >= 500) return { level: 3, title: 'Líder de Autocuidado 5S' };
    if (xp >= 250) return { level: 2, title: 'Vigía de Seguridad Activo' };
    return { level: 1, title: 'Aprendiz en Prevención' };
  };

  const addXp = (amount: number, reason?: string) => {
    setState((prev) => {
      const newXp = prev.xp + amount;
      const { level, title } = calculateLevel(newXp);
      const leveledUp = level > prev.level;

      if (leveledUp) {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#39A900', '#f59e0b', '#ea580c', '#38bdf8'],
        });
        setToastMessage(`🎉 ¡SUBISTE DE RANGO! Ahora eres: ${title}`);
      } else if (reason) {
        setToastMessage(`+${amount} XP • ${reason}`);
      }

      setTimeout(() => setToastMessage(null), 3500);

      return {
        ...prev,
        xp: newXp,
        level,
        levelTitle: title,
      };
    });
  };

  const unlockBadge = (badgeId: string) => {
    setState((prev) => {
      const badge = prev.badges.find((b) => b.id === badgeId);
      if (!badge || badge.unlocked) return prev;

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#39A900', '#ffffff'],
      });

      const updatedBadges = prev.badges.map((b) =>
        b.id === badgeId
          ? { ...b, unlocked: true, unlockedAt: new Date().toLocaleDateString() }
          : b
      );

      setToastMessage(`🏆 ¡MEDALLA DESBLOQUEADA! "${badge.name}" (+${badge.xpReward} XP)`);
      setTimeout(() => setToastMessage(null), 4000);

      const newXp = prev.xp + badge.xpReward;
      const { level, title } = calculateLevel(newXp);

      return {
        ...prev,
        xp: newXp,
        level,
        levelTitle: title,
        badges: updatedBadges,
      };
    });
  };

  const incrementStreak = () => {
    setState((prev) => {
      const newStreak = prev.streak + 1;
      if (newStreak >= 5) {
        unlockBadge('racha_segura');
      }
      return { ...prev, streak: newStreak };
    });
  };

  const resetStreak = () => {
    setState((prev) => ({ ...prev, streak: 0 }));
  };

  const incrementChallenges = () => {
    setState((prev) => ({ ...prev, challengesCompleted: prev.challengesCompleted + 1 }));
  };

  return (
    <GamificationContext.Provider
      value={{
        state,
        addXp,
        unlockBadge,
        incrementStreak,
        resetStreak,
        incrementChallenges,
        toastMessage,
        setToastMessage,
      }}
    >
      {children}
    </GamificationContext.Provider>
  );
};

export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (!context) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
};
