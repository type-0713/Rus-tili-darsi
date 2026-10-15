import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  Volume2,
  Trophy,
  Award,
  Sparkles,
  BookOpen
} from 'lucide-react';

import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import { useAudio } from '../../context/AudioContext';

export const SummarySection: React.FC = () => {
  const { xp, userLevel, learnedWordIds, resetProgress, setActiveTab } = useApp();
  const { speak } = useAudio();

  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8b5cf6', '#06b6d4', '#ec4899', '#f59e0b', '#10b981']
      });
    } catch {
      // ignore
    }
  }, []);

  const russianSummary = `Чтение — один из лучших способов развивать память, мышление, речь и воображение. Книги помогают нам получать знания, становиться грамотнее и лучше понимать окружающий мир.`;

  return (
    <div className="space-y-8 py-4 max-w-4xl mx-auto text-center">
      {/* Celebration Header - Clean Light Design */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6"
      >
        <div className="w-20 h-20 rounded-3xl bg-purple-100 text-purple-700 flex items-center justify-center mx-auto shadow-sm border border-purple-200">
          <GraduationCap className="w-10 h-10" />
        </div>

        <div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-50 text-purple-800 border border-purple-200 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>Курс Успешно Завершён!</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Итоги урока «О пользе чтения»
          </h2>
          <p className="text-sm text-slate-600 font-medium mt-1">
            Dars xulosasi va yakuniy natijalar
          </p>
        </div>

        {/* The Exact Required Summary Text in Russian */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 text-left space-y-3 relative group shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">
              Главный вывод урока:
            </span>
            <button
              onClick={() => speak(russianSummary)}
              className="p-2 rounded-xl bg-purple-100 text-purple-800 hover:bg-purple-200 flex items-center gap-1.5 text-xs font-semibold transition-colors"
              title="Ovoz chiqarib o‘qish"
            >
              <Volume2 className="w-4 h-4" />
              <span>Ovoz bilan tinglash</span>
            </button>
          </div>

          <blockquote className="text-lg sm:text-xl font-medium text-slate-900 leading-relaxed font-sans">
            «Чтение — один из лучших способов развивать память, мышление, речь и воображение.
            <br />
            Книги помогают нам получать знания, становиться грамотнее и лучше понимать окружающий мир».
          </blockquote>

          {/* Exact Required Uzbek Translation */}
          <div className="pt-3 border-t border-slate-200 text-sm text-slate-600 leading-relaxed italic">
            «Kitob o‘qish — xotira, fikrlash, nutq va tasavvurni rivojlantirishning eng yaxshi usullaridan biridir.
            Kitoblar bizga bilim olishga, savodliroq bo‘lishga va atrofimizdagi olamni yaxshiroq tushunishga yordam beradi».
          </div>
        </div>

        {/* User Achievement Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
            <Trophy className="w-6 h-6 text-amber-500 mx-auto" />
            <div className="text-3xl font-black text-slate-900 font-mono">{xp}</div>
            <div className="text-xs text-slate-500 font-medium">Jami to‘plangan XP</div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
            <Award className="w-6 h-6 text-purple-600 mx-auto" />
            <div className="text-lg font-bold text-purple-700">{userLevel}</div>
            <div className="text-xs text-slate-500 font-medium">Erishilgan daraja</div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
            <BookOpen className="w-6 h-6 text-cyan-600 mx-auto" />
            <div className="text-3xl font-black text-slate-900 font-mono">{learnedWordIds.length}</div>
            <div className="text-xs text-slate-500 font-medium">Yodlangan yangi so‘zlar</div>
          </div>
        </div>

        {/* Thank You Note */}
        <div className="py-4 space-y-1 border-t border-slate-100">
          <h3 className="text-2xl sm:text-3xl font-black text-purple-700">
            «Спасибо за внимание!»
          </h3>
          <p className="text-base sm:text-lg font-semibold text-slate-700">
            «E’tiboringiz uchun rahmat!»
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => setActiveTab('lesson')}
            className="px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-sm transition-all"
          >
            Darsni boshidan takrorlash
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className="px-6 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs border border-slate-200"
          >
            Test natijasini yangilash
          </button>

          <button
            onClick={() => {
              if (window.confirm('Haqiqatan ham barcha natijalarni qayta boshlang‘ich holatga qaytarmoqchimisiz?')) {
                resetProgress();
              }
            }}
            className="px-4 py-3 rounded-2xl bg-slate-50 hover:bg-red-50 text-slate-500 hover:text-red-700 text-xs border border-slate-200 transition-colors"
          >
            Progressni tozalash
          </button>
        </div>
      </motion.div>
    </div>
  );
};
