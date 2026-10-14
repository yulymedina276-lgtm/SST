import React from 'react';
import { useGamification } from '../context/GamificationContext';
import { Award, Flame, Zap, Shield, Sparkles, ChevronRight } from 'lucide-react';

interface GamificationBarProps {
  onOpenModal: (tab?: 'desafio' | 'medallas') => void;
}

export const GamificationBar: React.FC<GamificationBarProps> = ({ onOpenModal }) => {
  const { state } = useGamification();

  // Next level target
  const getNextLevelTarget = (level: number) => {
    switch (level) {
      case 1:
        return 250;
      case 2:
        return 500;
      case 3:
        return 800;
      default:
        return 1200;
    }
  };

  const targetXp = getNextLevelTarget(state.level);
  const progressPercent = Math.min(Math.round((state.xp / targetXp) * 100), 100);
  const unlockedBadgesCount = state.badges.filter((b) => b.unlocked).length;

  return (
    <div className="bg-[#00273c] text-white border-b border-amber-500/20 px-4 sm:px-6 lg:px-8 py-2.5 shadow-inner">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* User Rank & Level Indicator */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 text-slate-950 font-black text-xs flex items-center justify-center shadow-md ring-2 ring-amber-300/40">
              N{state.level}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-extrabold text-amber-300 tracking-wide uppercase">
                  {state.levelTitle}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">({state.xp} XP)</span>
              </div>
              {/* Progress bar to next level */}
              <div className="w-36 sm:w-44 h-2 bg-slate-800 rounded-full overflow-hidden mt-1 border border-slate-700">
                <div
                  className="h-full bg-gradient-to-r from-[#39A900] via-emerald-400 to-amber-400 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Streak Flame */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-orange-950/60 border border-orange-500/40 text-orange-300 text-xs font-bold shadow-xs">
            <Flame className="w-4 h-4 text-orange-400 fill-orange-400 animate-pulse" />
            <span>Racha: {state.streak}</span>
          </div>
        </div>

        {/* Gamification Actions: Quick Challenge & Badges */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <button
            onClick={() => onOpenModal('medallas')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 transition shadow-2xs"
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Medallas ({unlockedBadgesCount}/{state.badges.length})</span>
          </button>

          <button
            onClick={() => onOpenModal('desafio')}
            className="btn-sst-yellow flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs tracking-tight shadow-md"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Desafío Rápido SST (+30 XP)</span>
            <ChevronRight className="w-3 h-3 ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
