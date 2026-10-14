import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useGamification } from '../context/GamificationContext';
import { QUICK_CHALLENGES } from '../data/gamificationData';
import { 
  X, 
  Award, 
  Zap, 
  Flame, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Sparkles, 
  Lock, 
  Unlock, 
  Search, 
  ShieldCheck, 
  AlertTriangle 
} from 'lucide-react';

interface GamificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'desafio' | 'medallas';
}

export const GamificationModal: React.FC<GamificationModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'desafio',
}) => {
  const { state, addXp, incrementStreak, resetStreak, unlockBadge, incrementChallenges } = useGamification();
  const [activeTab, setActiveTab] = useState<'desafio' | 'medallas'>(initialTab);

  // Challenge game state
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  if (!isOpen) return null;

  const currentChallenge = QUICK_CHALLENGES[currentChallengeIndex];

  const handleSelectOption = (idx: number) => {
    if (hasAnswered) return;
    setSelectedOptionIndex(idx);
    setHasAnswered(true);

    const option = currentChallenge.options[idx];
    if (option.isCorrect) {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#39A900', '#f59e0b', '#38bdf8'],
      });
      addXp(30, '¡Desafío Rápido Correcto!');
      incrementStreak();
      incrementChallenges();
    } else {
      resetStreak();
    }
  };

  const handleNextChallenge = () => {
    setSelectedOptionIndex(null);
    setHasAnswered(false);
    setCurrentChallengeIndex((prev) => (prev + 1) % QUICK_CHALLENGES.length);
  };

  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Search':
        return Search;
      case 'ShieldCheck':
        return ShieldCheck;
      case 'Award':
        return Award;
      case 'Zap':
        return Zap;
      case 'Flame':
        return Flame;
      default:
        return Sparkles;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl border-2 border-amber-500/40 w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#00324D] via-[#00273c] to-slate-900 text-white flex items-center justify-between border-b-2 border-amber-500">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 font-black text-sm flex items-center justify-center shadow-md">
              ⚡
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold tracking-tight text-white flex items-center gap-2">
                Centro de Gamificación SST
              </h3>
              <p className="text-xs text-amber-300 font-medium">
                Gana puntos XP, sube de rango y desbloquea insignias de seguridad
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b border-slate-200 bg-slate-100 text-xs font-bold">
          <button
            onClick={() => setActiveTab('desafio')}
            className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 transition ${
              activeTab === 'desafio'
                ? 'bg-white text-slate-900 border-b-2 border-[#39A900] shadow-2xs font-extrabold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>Desafío Rápido de Autoprotección</span>
          </button>
          <button
            onClick={() => setActiveTab('medallas')}
            className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 transition ${
              activeTab === 'medallas'
                ? 'bg-white text-slate-900 border-b-2 border-[#39A900] shadow-2xs font-extrabold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Award className="w-4 h-4 text-amber-500" />
            <span>Muro de Medallas e Insignias ({state.badges.filter((b) => b.unlocked).length}/{state.badges.length})</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-50/50">
          {activeTab === 'desafio' ? (
            <div className="space-y-6">
              {/* Challenge Status Bar */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs text-xs">
                <span className="font-bold text-slate-700">
                  Caso #{currentChallengeIndex + 1} de {QUICK_CHALLENGES.length}
                </span>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 font-bold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    +30 XP por Acierto
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-orange-100 text-orange-900 font-bold flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-orange-600 fill-orange-600" />
                    Racha: {state.streak}
                  </span>
                </div>
              </div>

              {/* Scenario Box */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-[#00273c] text-white shadow-md border-l-4 border-amber-500 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">
                  Situación de Riesgo en Campo:
                </span>
                <p className="text-sm sm:text-base font-bold leading-relaxed">
                  {currentChallenge.scenario}
                </p>
                <div className="text-[11px] text-slate-300 font-mono pt-1">
                  Base Técnica: {currentChallenge.normativa}
                </div>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {currentChallenge.options.map((opt, oIdx) => {
                  const isSelected = selectedOptionIndex === oIdx;
                  let btnStyle = 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800';

                  if (hasAnswered) {
                    if (opt.isCorrect) {
                      btnStyle = 'bg-emerald-100/80 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-500/30';
                    } else if (isSelected && !opt.isCorrect) {
                      btnStyle = 'bg-rose-100 border-rose-500 text-rose-950 font-bold';
                    } else {
                      btnStyle = 'bg-white border-slate-200 text-slate-400 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={oIdx}
                      disabled={hasAnswered}
                      onClick={() => handleSelectOption(oIdx)}
                      className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-3 shadow-2xs ${btnStyle}`}
                    >
                      <span
                        className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          hasAnswered
                            ? opt.isCorrect
                              ? 'bg-emerald-600 text-white'
                              : isSelected
                              ? 'bg-rose-600 text-white'
                              : 'bg-slate-200 text-slate-600'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {String.fromCharCode(65 + oIdx)}
                      </span>
                      <div className="flex-1">
                        <span>{opt.text}</span>
                        {hasAnswered && isSelected && (
                          <div
                            className={`mt-2 p-2.5 rounded-lg text-xs font-medium flex items-start gap-1.5 ${
                              opt.isCorrect
                                ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                                : 'bg-rose-50 text-rose-900 border border-rose-200'
                            }`}
                          >
                            {opt.isCorrect ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                            ) : (
                              <XCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                            )}
                            <span>{opt.feedback}</span>
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Next Button */}
              {hasAnswered && (
                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleNextChallenge}
                    className="btn-sst-green px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md"
                  >
                    <span>Siguiente Situación</span>
                    <Zap className="w-4 h-4 fill-current" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Badges Wall Tab */
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-sky-500/10 border border-amber-300/30 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-black text-slate-900">
                    Tu Rango Actual: {state.levelTitle} (Nivel {state.level})
                  </h4>
                  <p className="text-xs text-slate-600">
                    Acumula XP en evaluaciones, listas de chequeo y simulaciones para ascender de rango.
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xl font-black text-amber-600">{state.xp} XP</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {state.badges.map((badge) => {
                  const Icon = getBadgeIcon(badge.icon);
                  return (
                    <div
                      key={badge.id}
                      className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                        badge.unlocked
                          ? 'bg-white border-amber-400/80 shadow-sm ring-1 ring-amber-400/20'
                          : 'bg-slate-100/70 border-slate-200 opacity-60'
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          badge.unlocked
                            ? 'bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 shadow-md ring-2 ring-amber-200'
                            : 'bg-slate-200 text-slate-400'
                        }`}
                      >
                        {badge.unlocked ? <Icon className="w-6 h-6" /> : <Lock className="w-5 h-5" />}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <h5 className="text-xs sm:text-sm font-bold text-slate-900">{badge.name}</h5>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              badge.unlocked
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-slate-200 text-slate-500'
                            }`}
                          >
                            +{badge.xpReward} XP
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1 leading-snug">{badge.description}</p>
                        {badge.unlocked && badge.unlockedAt && (
                          <span className="text-[10px] text-emerald-700 font-semibold block mt-1">
                            ✓ Desbloqueada el {badge.unlockedAt}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <span>Gamificación Pedagógica en SST • SENA CDATH Huila</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold transition"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
