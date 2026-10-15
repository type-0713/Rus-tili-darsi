import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FileCheck2,
  Trophy,
  XCircle,
  RotateCcw,
  ArrowRight,
  ListRestart
} from 'lucide-react';
import { QUIZ_BANK } from '../../data/quizData';
import type { QuizQuestion } from '../../types';
import { useApp } from '../../context/AppContext';

export const QuizSection: React.FC = () => {
  const { addXP, addQuizResult } = useApp();

  const [currentQuestions, setCurrentQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [isRetryingErrors, setIsRetryingErrors] = useState<boolean>(false);

  // Initialize a test session with 15 random questions
  const startNewQuiz = () => {
    const shuffled = [...QUIZ_BANK].sort(() => 0.5 - Math.random()).slice(0, 15);
    setCurrentQuestions(shuffled);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setIsFinished(false);
    setIsRetryingErrors(false);
  };

  useEffect(() => {
    startNewQuiz();
  }, []);

  const handleSelectOption = (optionIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: optionIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      finishQuiz();
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const finishQuiz = () => {
    setIsFinished(true);

    let correctCount = 0;
    currentQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correctCount += 1;
      }
    });

    const percentage = Math.round((correctCount / currentQuestions.length) * 100);

    // Add result to history
    addQuizResult({
      date: new Date().toLocaleDateString(),
      score: correctCount,
      total: currentQuestions.length,
      percentage
    });

    // Reward XP
    if (percentage >= 90) {
      addXP(50, `quiz-perfect-${Date.now()}`, true);
    } else if (percentage >= 70) {
      addXP(30, `quiz-good-${Date.now()}`, true);
    } else {
      addXP(15, `quiz-attempt-${Date.now()}`);
    }
  };

  // Get mistakes list
  const mistakeQuestions = currentQuestions.filter(
    (q, idx) => selectedAnswers[idx] !== q.correctIndex
  );

  const handleRetryMistakes = () => {
    if (mistakeQuestions.length === 0) return;
    setCurrentQuestions(mistakeQuestions);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setIsFinished(false);
    setIsRetryingErrors(true);
  };

  const currentQ = currentQuestions[currentQuestionIndex];

  // Calculation for results
  let correctCount = 0;
  currentQuestions.forEach((q, idx) => {
    if (selectedAnswers[idx] === q.correctIndex) correctCount += 1;
  });
  const scorePercent = currentQuestions.length > 0
    ? Math.round((correctCount / currentQuestions.length) * 100)
    : 0;

  const getGradeInfo = (pct: number) => {
    if (pct >= 90) {
      return {
        titleRu: 'Отлично! Превосходный результат!',
        titleUz: 'A’lo! Mukammal bilim darajasi!',
        color: 'text-emerald-700',
        badgeColor: 'bg-emerald-50 border-emerald-300 text-emerald-800',
        xpBonus: '+50 XP'
      };
    }
    if (pct >= 70) {
      return {
        titleRu: 'Хорошо! Достойные знания!',
        titleUz: 'Yaxshi! Barqaror natija!',
        color: 'text-cyan-800',
        badgeColor: 'bg-cyan-50 border-cyan-300 text-cyan-800',
        xpBonus: '+30 XP'
      };
    }
    if (pct >= 50) {
      return {
        titleRu: 'Нужно ещё повторить!',
        titleUz: 'Yana bir oz takrorlash lozim!',
        color: 'text-amber-800',
        badgeColor: 'bg-amber-50 border-amber-300 text-amber-900',
        xpBonus: '+15 XP'
      };
    }
    return {
      titleRu: 'Попробуй ещё раз!',
      titleUz: 'Qaytadan urinib ko‘ring!',
      color: 'text-red-700',
      badgeColor: 'bg-red-50 border-red-300 text-red-800',
      xpBonus: '+10 XP'
    };
  };

  const grade = getGradeInfo(scorePercent);

  return (
    <div className="space-y-8 py-4 max-w-4xl mx-auto text-left">
      {/* Header Banner - Clean Light Design */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
              <FileCheck2 className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase">
              Итоговый тест (Банк из 32 задач)
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Yakuniy Nazorat Testi
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Matn mazmuni, grammatika, kelishiklar, foizlar va leksikani to‘liq tekshiruvchi 15 talik test.
          </p>
        </div>

        <button
          onClick={startNewQuiz}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold self-start md:self-auto border border-slate-200 shadow-sm"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Yangi 15 ta savol olish</span>
        </button>
      </div>

      {!isFinished && currentQ ? (
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6"
        >
          {/* Progress Indicator */}
          <div className="flex items-center justify-between text-xs text-slate-500 pb-3 border-b border-slate-100">
            <span className="font-bold text-purple-700">
              Savol {currentQuestionIndex + 1} / {currentQuestions.length}
              {isRetryingErrors && (
                <span className="ml-2 text-amber-600 font-bold">(Xatolarni qayta ishlash)</span>
              )}
            </span>

            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold">
              Bo‘lim: {currentQ.category}
            </span>
          </div>

          {/* Question Text */}
          <div className="space-y-2">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-relaxed">
              {currentQ.questionRu}
            </h3>
            <p className="text-xs text-slate-500 italic">
              {currentQ.questionUz}
            </p>
          </div>

          {/* 4 Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {currentQ.optionsRu.map((opt, idx) => {
              const isSelected = selectedAnswers[currentQuestionIndex] === idx;

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`p-4 rounded-2xl border text-xs sm:text-sm text-left transition-all font-medium ${
                    isSelected
                      ? 'bg-purple-50 text-purple-950 border-purple-500 shadow-sm font-bold'
                      : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                >
                  <span className="font-mono font-bold text-purple-600 mr-2">
                    {String.fromCharCode(65 + idx)}.
                  </span>
                  {opt}
                </button>
              );
            })}
          </div>

          {/* Bottom Nav */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={handlePrev}
              disabled={currentQuestionIndex === 0}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 text-slate-600 hover:text-slate-900 disabled:opacity-30"
            >
              Oldingi
            </button>

            <button
              onClick={handleNext}
              disabled={selectedAnswers[currentQuestionIndex] === undefined}
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white shadow-sm disabled:opacity-40"
            >
              <span>{currentQuestionIndex === currentQuestions.length - 1 ? 'Testni yakunlash' : 'Keyingi savol'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      ) : (
        /* Final Results & Mistakes Review Screen */
        <div className="space-y-6">
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-sm text-center space-y-4">
            <Trophy className="w-16 h-16 text-amber-500 mx-auto animate-bounce" />
            <div>
              <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full border mb-2 ${grade.badgeColor}`}>
                {grade.xpBonus} qozonildi!
              </span>
              <h3 className={`text-2xl sm:text-3xl font-extrabold ${grade.color}`}>
                {grade.titleRu}
              </h3>
              <p className="text-sm text-slate-600 mt-1 font-semibold">
                {grade.titleUz}
              </p>
            </div>

            <div className="text-4xl font-black text-slate-900 font-mono">
              {correctCount} / {currentQuestions.length}{' '}
              <span className="text-2xl text-purple-700 font-sans">({scorePercent}%)</span>
            </div>

            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <button
                onClick={startNewQuiz}
                className="px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-sm"
              >
                Yangi test topshirish
              </button>

              {mistakeQuestions.length > 0 && (
                <button
                  onClick={handleRetryMistakes}
                  className="flex items-center gap-1.5 px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-sm"
                >
                  <ListRestart className="w-4 h-4" />
                  <span>Xatolarni qayta ishlash ({mistakeQuestions.length})</span>
                </button>
              )}
            </div>
          </div>

          {/* Mistakes Breakdown List */}
          {mistakeQuestions.length > 0 && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <XCircle className="w-4 h-4 text-red-500" />
                <span>Yo‘l qo‘yilgan xatolar va izohlar ({mistakeQuestions.length}):</span>
              </h4>

              <div className="space-y-3">
                {mistakeQuestions.map((q, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white border border-red-200 space-y-2 text-xs shadow-sm"
                  >
                    <p className="font-bold text-slate-900 text-sm">
                      {q.questionRu}
                    </p>
                    <p className="text-slate-500 italic">
                      {q.questionUz}
                    </p>
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                      <p className="text-emerald-700 font-bold">
                        To‘g‘ri javob: {q.optionsRu[q.correctIndex]}
                      </p>
                      <p className="text-slate-600 text-[11px] leading-relaxed">
                        Izoh: {q.explanationUz}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
