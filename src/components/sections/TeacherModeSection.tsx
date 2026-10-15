import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Presentation,
  Play,
  Pause,
  RotateCcw,
  Eye,
  EyeOff,
  Clock,
  Gamepad2,
  FileCheck2,
  GraduationCap,
  MessageSquare,
  Volume2
} from 'lucide-react';

import { TEACHER_LESSON_PLAN } from '../../data/teacherData';
import { useApp } from '../../context/AppContext';
import { useAudio } from '../../context/AudioContext';

export const TeacherModeSection: React.FC = () => {
  const { setActiveTab } = useApp();
  const { speak } = useAudio();

  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [showUzbek, setShowUzbek] = useState<boolean>(true);
  const [showAnswers, setShowAnswers] = useState<boolean>(false);

  // 30 minute countdown timer (1800 seconds)
  const [timerSeconds, setTimerSeconds] = useState<number>(1800);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  // Keyboard navigation: ArrowLeft, ArrowRight
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        setCurrentStepIndex((prev) => Math.min(TEACHER_LESSON_PLAN.length - 1, prev + 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        setCurrentStepIndex((prev) => Math.max(0, prev - 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const currentStep = TEACHER_LESSON_PLAN[currentStepIndex];

  const formatTimer = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m < 10 ? `0${m}` : m}:${s < 10 ? `0${s}` : s}`;
  };

  return (
    <div className="space-y-6 py-4 max-w-5xl mx-auto text-left">
      {/* Teacher Mode Control Header - Clean Light Design */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-2 rounded-xl bg-purple-50 text-purple-700 border border-purple-200">
              <Presentation className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold text-purple-700 tracking-wider uppercase">
              Режим Учителя • Sinf / Proyektor Taqdimoti
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            30 Daqiqalik Dars Rejasi
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Klaviaturadagi <kbd className="px-2 py-0.5 rounded bg-slate-100 border border-slate-300 text-slate-800 font-mono text-xs">←</kbd> va <kbd className="px-2 py-0.5 rounded bg-slate-100 border border-slate-300 text-slate-800 font-mono text-xs">→</kbd> tugmalari orqali slaydni boshqarish mumkin.
          </p>
        </div>

        {/* 30 Min Timer Widget */}
        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 self-start md:self-auto shadow-sm">
          <Clock className="w-5 h-5 text-purple-600" />
          <span className="font-mono font-black text-xl text-slate-900">
            {formatTimer(timerSeconds)}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="p-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white shadow-sm"
              title={isTimerRunning ? 'Pauza' : 'Taymerni boshlash'}
            >
              {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            </button>
            <button
              onClick={() => {
                setIsTimerRunning(false);
                setTimerSeconds(1800);
              }}
              className="p-2 rounded-xl bg-slate-200 text-slate-700 hover:bg-slate-300"
              title="Qayta sozlash (30 min)"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Steps Timeline Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {TEACHER_LESSON_PLAN.map((step, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentStepIndex(idx)}
            className={`flex-shrink-0 px-4 py-2.5 rounded-2xl text-xs font-semibold text-left transition-all ${
              idx === currentStepIndex
                ? 'bg-purple-600 text-white shadow-sm font-bold border border-purple-500'
                : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
            }`}
          >
            <div className={`font-mono text-[10px] ${idx === currentStepIndex ? 'text-purple-200' : 'text-purple-600'}`}>
              {step.minuteRange}
            </div>
            <div className="font-bold">{step.titleRu.replace(/Этап \d+:\s*/, '')}</div>
          </button>
        ))}
      </div>

      {/* Presentation Screen (Big Projector View) */}
      <motion.div
        key={currentStepIndex}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-6 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6"
      >
        {/* Top Controls: Toggles & Shortcuts */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
              Vaqt: {currentStep.minuteRange}
            </span>
            <span className="text-xs text-slate-600 font-semibold">
              Bosqich {currentStepIndex + 1} / 7
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowUzbek(!showUzbek)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs bg-slate-100 text-slate-700 hover:bg-slate-200 font-semibold transition-colors"
            >
              {showUzbek ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{showUzbek ? 'Tarjimani yashirish' : 'Tarjimani ko‘rsatish'}</span>
            </button>

            <button
              onClick={() => setShowAnswers(!showAnswers)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs bg-slate-100 text-slate-700 hover:bg-slate-200 font-semibold transition-colors"
            >
              {showAnswers ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{showAnswers ? 'Javoblarni yashirish' : 'Javoblarni ko‘rsatish'}</span>
            </button>
          </div>
        </div>

        {/* Projector Big Screen Content */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-50 to-indigo-50/40 border border-slate-200 text-center space-y-4 shadow-sm">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 whitespace-pre-line leading-relaxed">
            {currentStep.screenContentRu}
          </h3>
          {showUzbek && (
            <p className="text-sm sm:text-base text-purple-800 font-medium italic whitespace-pre-line border-t border-slate-200/80 pt-4 max-w-2xl mx-auto">
              {currentStep.screenContentUz}
            </p>
          )}
        </div>

        {/* Teacher Metodic Script Box */}
        <div className="p-5 sm:p-6 rounded-2xl bg-purple-50/70 border border-purple-200 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-purple-900 uppercase tracking-wider">
              <MessageSquare className="w-4 h-4 text-purple-600" />
              <span>O‘qituvchi uchun namunaviy nutq (Teacher script):</span>
            </div>
            <button
              onClick={() => speak(currentStep.teacherScriptRu)}
              className="p-1.5 rounded-xl bg-purple-100 text-purple-800 hover:bg-purple-200 flex items-center gap-1 text-xs font-semibold"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Ovoz berish</span>
            </button>
          </div>

          <p className="text-sm text-slate-800 italic font-medium leading-relaxed bg-white p-4 rounded-xl border border-purple-100 shadow-sm">
            «{currentStep.teacherScriptRu}»
          </p>
          {showUzbek && (
            <p className="text-xs text-purple-700 leading-relaxed font-medium">
              O‘zbekcha ma’nosi: «{currentStep.teacherScriptUz}»
            </p>
          )}
        </div>

        {/* Key Points & Action */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="font-bold text-cyan-800 uppercase tracking-wide">
              Metodik tavsiya:
            </span>
            <p className="text-slate-700 leading-relaxed">
              {currentStep.suggestedAction}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="font-bold text-purple-800 uppercase tracking-wide">
              Ushbu bosqich vazifalari:
            </span>
            <ul className="list-disc list-inside space-y-1 text-slate-700 font-medium">
              {currentStep.keyPoints.map((pt, pIdx) => (
                <li key={pIdx}>{pt}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quick Launch Buttons on Screen */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('games')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white shadow-sm"
            >
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>O‘yinni boshlash</span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-sm"
            >
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>Testni ochish</span>
            </button>

            <button
              onClick={() => setActiveTab('summary')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Xulosaga o‘tish</span>
            </button>
          </div>

          {/* Prev / Next Slide */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentStepIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentStepIndex === 0}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 disabled:opacity-30 text-slate-700"
            >
              ← Oldingi bosqich
            </button>
            <button
              onClick={() => setCurrentStepIndex((prev) => Math.min(TEACHER_LESSON_PLAN.length - 1, prev + 1))}
              disabled={currentStepIndex === TEACHER_LESSON_PLAN.length - 1}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 disabled:opacity-30 text-white shadow-sm"
            >
              Keyingi bosqich →
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
