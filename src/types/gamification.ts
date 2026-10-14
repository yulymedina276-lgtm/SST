export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  xpReward: number;
}

export interface GamificationState {
  xp: number;
  level: number;
  levelTitle: string;
  streak: number;
  badges: Badge[];
  challengesCompleted: number;
}

export interface QuickChallenge {
  id: number;
  scenario: string;
  category: 'agro' | 'admin' | 'emergencia' | 'epp';
  options: {
    text: string;
    isCorrect: boolean;
    feedback: string;
  }[];
  normativa: string;
}
