import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import type { ThemeMode, UserLevel, InteractiveWord } from '../types';

interface QuizResultEntry {
  date: string;
  score: number;
  total: number;
  percentage: number;
}

interface AppContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentStepId: number;
  setCurrentStepId: (stepId: number) => void;
  xp: number;
  userLevel: UserLevel;
  nextLevelXp: number;
  levelProgress: number;
  unlockedSteps: number[];
  unlockStep: (stepId: number) => void;
  learnedWordIds: string[];
  toggleLearnedWord: (wordId: string) => void;
  quizHistory: QuizResultEntry[];
  addQuizResult: (entry: QuizResultEntry) => void;
  completedActivityIds: string[];
  addXP: (amount: number, activityId?: string, triggerConfetti?: boolean) => boolean;
  selectedWord: InteractiveWord | null;
  openWordModal: (word: InteractiveWord) => void;
  closeWordModal: () => void;
  resetProgress: () => void;
}

const STORAGE_KEYS = {
  THEME: 'knizhny_mir_theme',
  XP: 'knizhny_mir_xp',
  UNLOCKED_STEPS: 'knizhny_mir_unlocked_steps',
  LEARNED_WORDS: 'knizhny_mir_learned_words',
  QUIZ_HISTORY: 'knizhny_mir_quiz_history',
  COMPLETED_ACTIVITIES: 'knizhny_mir_completed_activities'
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme - Default to clean light theme
  const [theme, setTheme] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.THEME);
      if (saved === 'dark') return 'dark';
    } catch {
      // ignore
    }
    return 'light';
  });


  // Navigation
  const [activeTab, setActiveTab] = useState<string>('home');
  const [currentStepId, setCurrentStepId] = useState<number>(1);

  // Gamification & Progress
  const [xp, setXp] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.XP);
      if (saved) return parseInt(saved, 10) || 0;
    } catch {
      // ignore
    }
    return 0;
  });

  const [unlockedSteps, setUnlockedSteps] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.UNLOCKED_STEPS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [1];
  });

  const [learnedWordIds, setLearnedWordIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LEARNED_WORDS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  const [quizHistory, setQuizHistory] = useState<QuizResultEntry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.QUIZ_HISTORY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  const [completedActivityIds, setCompletedActivityIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COMPLETED_ACTIVITIES);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  // Modal
  const [selectedWord, setSelectedWord] = useState<InteractiveWord | null>(null);

  // Sync theme to document body class
  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Determine user level based on XP
  const getUserLevelInfo = (currentXp: number): { level: UserLevel; nextXp: number; progress: number } => {
    if (currentXp < 100) {
      return {
        level: 'Новичок',
        nextXp: 100,
        progress: Math.min(100, Math.round((currentXp / 100) * 100))
      };
    }
    if (currentXp < 250) {
      return {
        level: 'Читатель',
        nextXp: 250,
        progress: Math.min(100, Math.round(((currentXp - 100) / 150) * 100))
      };
    }
    if (currentXp < 500) {
      return {
        level: 'Знаток',
        nextXp: 500,
        progress: Math.min(100, Math.round(((currentXp - 250) / 250) * 100))
      };
    }
    if (currentXp < 900) {
      return {
        level: 'Мастер слов',
        nextXp: 900,
        progress: Math.min(100, Math.round(((currentXp - 500) / 400) * 100))
      };
    }
    return {
      level: 'Книжный эксперт',
      nextXp: 1200,
      progress: 100
    };
  };

  const levelInfo = getUserLevelInfo(xp);

  const addXP = (amount: number, activityId?: string, triggerConfetti: boolean = false): boolean => {
    if (activityId && completedActivityIds.includes(activityId)) {
      return false; // Prevent double XP reward
    }

    setXp(prev => {
      const next = prev + amount;
      try {
        localStorage.setItem(STORAGE_KEYS.XP, next.toString());
      } catch {
        // ignore
      }
      return next;
    });

    if (activityId) {
      setCompletedActivityIds(prev => {
        const next = [...prev, activityId];
        try {
          localStorage.setItem(STORAGE_KEYS.COMPLETED_ACTIVITIES, JSON.stringify(next));
        } catch {
          // ignore
        }
        return next;
      });
    }

    if (triggerConfetti) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#8b5cf6', '#06b6d4', '#3b82f6', '#ec4899', '#f59e0b']
        });
      } catch {
        // ignore
      }
    }

    return true;
  };

  const unlockStep = (stepId: number) => {
    setUnlockedSteps(prev => {
      if (prev.includes(stepId)) return prev;
      const next = [...prev, stepId];
      try {
        localStorage.setItem(STORAGE_KEYS.UNLOCKED_STEPS, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const toggleLearnedWord = (wordId: string) => {
    setLearnedWordIds(prev => {
      const exists = prev.includes(wordId);
      const next = exists ? prev.filter(id => id !== wordId) : [...prev, wordId];
      try {
        localStorage.setItem(STORAGE_KEYS.LEARNED_WORDS, JSON.stringify(next));
      } catch {
        // ignore
      }
      if (!exists) {
        addXP(5, `word-${wordId}`);
      }
      return next;
    });
  };

  const addQuizResult = (entry: QuizResultEntry) => {
    setQuizHistory(prev => {
      const next = [entry, ...prev].slice(0, 20);
      try {
        localStorage.setItem(STORAGE_KEYS.QUIZ_HISTORY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const openWordModal = (word: InteractiveWord) => {
    setSelectedWord(word);
  };

  const closeWordModal = () => {
    setSelectedWord(null);
  };

  const resetProgress = () => {
    localStorage.removeItem(STORAGE_KEYS.XP);
    localStorage.removeItem(STORAGE_KEYS.UNLOCKED_STEPS);
    localStorage.removeItem(STORAGE_KEYS.LEARNED_WORDS);
    localStorage.removeItem(STORAGE_KEYS.QUIZ_HISTORY);
    localStorage.removeItem(STORAGE_KEYS.COMPLETED_ACTIVITIES);
    setXp(0);
    setUnlockedSteps([1]);
    setLearnedWordIds([]);
    setQuizHistory([]);
    setCompletedActivityIds([]);
    setCurrentStepId(1);
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        activeTab,
        setActiveTab,
        currentStepId,
        setCurrentStepId,
        xp,
        userLevel: levelInfo.level,
        nextLevelXp: levelInfo.nextXp,
        levelProgress: levelInfo.progress,
        unlockedSteps,
        unlockStep,
        learnedWordIds,
        toggleLearnedWord,
        quizHistory,
        addQuizResult,
        completedActivityIds,
        addXP,
        selectedWord,
        openWordModal,
        closeWordModal,
        resetProgress
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
