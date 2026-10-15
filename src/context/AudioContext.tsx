import React, { createContext, useContext, useEffect, useState, useRef, useCallback } from 'react';

export interface VoiceSettings {
  rate: number; // 0.7 - 1.2
  volume: number; // 0 - 1
  selectedVoiceURI: string | null;
}

interface AudioContextType {
  isSpeaking: boolean;
  isPaused: boolean;
  activeSentenceIndex: number | null;
  voices: SpeechSynthesisVoice[];
  russianVoices: SpeechSynthesisVoice[];
  selectedVoice: SpeechSynthesisVoice | null;
  settings: VoiceSettings;
  hasRussianVoice: boolean;
  isSupported: boolean;
  speak: (text: string, onEnd?: () => void, customRate?: number) => void;
  speakSentenceQueue: (sentences: string[], onIndexChange?: (index: number) => void, onComplete?: () => void) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  updateSettings: (newSettings: Partial<VoiceSettings>) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

const LOCAL_STORAGE_AUDIO_KEY = 'knizhny_mir_voice_settings';

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSupported, setIsSupported] = useState<boolean>(true);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [russianVoices, setRussianVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [activeSentenceIndex, setActiveSentenceIndex] = useState<number | null>(null);

  const [settings, setSettings] = useState<VoiceSettings>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_AUDIO_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return {
      rate: 1.0,
      volume: 1.0,
      selectedVoiceURI: null
    };
  });

  const queueRef = useRef<string[]>([]);
  const queueIndexRef = useRef<number>(0);
  const onQueueChangeRef = useRef<((idx: number) => void) | undefined>(undefined);
  const onQueueCompleteRef = useRef<(() => void) | undefined>(undefined);

  // Load voices safely
  const loadVoices = useCallback(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSupported(false);
      return;
    }
    setIsSupported(true);
    const available = window.speechSynthesis.getVoices();
    setVoices(available);

    const ru = available.filter(
      v => v.lang.toLowerCase().startsWith('ru') || v.name.toLowerCase().includes('russian')
    );
    setRussianVoices(ru);

    // Auto-select preferred voice
    if (ru.length > 0) {
      if (settings.selectedVoiceURI) {
        const found = ru.find(v => v.voiceURI === settings.selectedVoiceURI);
        if (found) {
          setSelectedVoice(found);
          return;
        }
      }
      // Prefer Google or Microsoft or natural sounding voice if present
      const preferred = ru.find(v => v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Microsoft')) || ru[0];
      setSelectedVoice(preferred);
    } else {
      setSelectedVoice(null);
    }
  }, [settings.selectedVoiceURI]);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSupported(false);
      return;
    }

    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [loadVoices]);

  const updateSettings = (newSettings: Partial<VoiceSettings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings };
      try {
        localStorage.setItem(LOCAL_STORAGE_AUDIO_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });

    if (newSettings.selectedVoiceURI) {
      const match = voices.find(v => v.voiceURI === newSettings.selectedVoiceURI);
      if (match) setSelectedVoice(match);
    }
  };

  const stop = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    queueRef.current = [];
    queueIndexRef.current = 0;
    setIsSpeaking(false);
    setIsPaused(false);
    setActiveSentenceIndex(null);
  }, []);

  const pause = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  }, []);

  const resume = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  }, []);

  const speak = useCallback((text: string, onEnd?: () => void, customRate?: number) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    // Cancel current
    window.speechSynthesis.cancel();

    if (!text || text.trim() === '') return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ru-RU';
    utterance.rate = customRate ?? settings.rate;
    utterance.volume = settings.volume;

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      console.warn('Speech synthesis utterance error:', e);
      setIsSpeaking(false);
      setIsPaused(false);
      if (onEnd) onEnd();
    };

    window.speechSynthesis.speak(utterance);
  }, [selectedVoice, settings.rate, settings.volume]);

  // Read sentence by sentence queue
  const playNextInQueue = useCallback(() => {
    if (queueIndexRef.current >= queueRef.current.length) {
      setIsSpeaking(false);
      setIsPaused(false);
      setActiveSentenceIndex(null);
      if (onQueueCompleteRef.current) {
        onQueueCompleteRef.current();
      }
      return;
    }

    const currentSentence = queueRef.current[queueIndexRef.current];
    const currentIndex = queueIndexRef.current;
    setActiveSentenceIndex(currentIndex);
    if (onQueueChangeRef.current) {
      onQueueChangeRef.current(currentIndex);
    }

    const utterance = new SpeechSynthesisUtterance(currentSentence);
    utterance.lang = 'ru-RU';
    utterance.rate = settings.rate;
    utterance.volume = settings.volume;
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      queueIndexRef.current += 1;
      playNextInQueue();
    };

    utterance.onerror = () => {
      queueIndexRef.current += 1;
      playNextInQueue();
    };

    window.speechSynthesis.speak(utterance);
  }, [selectedVoice, settings.rate, settings.volume]);

  const speakSentenceQueue = useCallback((
    sentences: string[],
    onIndexChange?: (index: number) => void,
    onComplete?: () => void
  ) => {
    stop();
    if (sentences.length === 0) return;

    queueRef.current = sentences;
    queueIndexRef.current = 0;
    onQueueChangeRef.current = onIndexChange;
    onQueueCompleteRef.current = onComplete;

    playNextInQueue();
  }, [stop, playNextInQueue]);

  return (
    <AudioContext.Provider
      value={{
        isSpeaking,
        isPaused,
        activeSentenceIndex,
        voices,
        russianVoices,
        selectedVoice,
        settings,
        hasRussianVoice: russianVoices.length > 0,
        isSupported,
        speak,
        speakSentenceQueue,
        pause,
        resume,
        stop,
        updateSettings
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
