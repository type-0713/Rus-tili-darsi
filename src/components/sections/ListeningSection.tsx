import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Headphones,
  Volume2,
  Eye,
  EyeOff,
  HelpCircle
} from 'lucide-react';

import { LISTENING_DATA } from '../../data/listeningData';
import { useAudio } from '../../context/AudioContext';
import { useApp } from '../../context/AppContext';

export const ListeningSection: React.FC = () => {
  const { speak, isSpeaking, stop } = useAudio();
  const { addXP } = useApp();

  const [activeLevel, setActiveLevel] = useState<'Лёгкий' | 'Средний' | 'Сложный'>('Лёгкий');
  const [activeExerciseIndex, setActiveExerciseIndex] = useState<number>(0);
  const [showScript, setShowScript] = useState<boolean>(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submittedExercises, setSubmittedExercises] = useState<Record<string, boolean>>({});

  const filteredExercises = LISTENING_DATA.filter((e) => e.level === activeLevel);
  const currentEx = filteredExercises[activeExerciseIndex] || filteredExercises[0];

  const handleSelectLevel = (lvl: 'Лёгкий' | 'Средний' | 'Сложный') => {
    stop();
    setActiveLevel(lvl);
    setActiveExerciseIndex(0);
    setShowScript(false);
  };

  const handleAnswer = (optionIdx: number) => {
    if (submittedExercises[currentEx.id]) return;
    setSelectedAnswers((prev) => ({ ...prev, [currentEx.id]: optionIdx }));
  };

  const handleCheck = () => {
    if (selectedAnswers[currentEx.id] === undefined) return;
    setSubmittedExercises((prev) => ({ ...prev, [currentEx.id]: true }));
    if (selectedAnswers[currentEx.id] === currentEx.correctIndex) {
      addXP(15, `listening-${currentEx.id}`, true);
    }
  };

  const handleNextExercise = () => {
    stop();
    setShowScript(false);
    if (activeExerciseIndex < filteredExercises.length - 1) {
      setActiveExerciseIndex(activeExerciseIndex + 1);
    }
  };

  const handlePrevExercise = () => {
    stop();
    setShowScript(false);
    if (activeExerciseIndex > 0) {
      setActiveExerciseIndex(activeExerciseIndex - 1);
    }
  };

  return (
    <div className="space-y-8 py-4 max-w-4xl mx-auto text-left">
      {/* Header Banner - Clean Light Design */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-2 rounded-xl bg-blue-50 text-blue-700 border border-blue-200">
              <Headphones className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold text-blue-700 tracking-wider uppercase">
              Аудирование (15 упражнений)
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Tinglab Tushunish Moduli
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Ruscha audiomatnni tinglang, so‘ng savolga to‘g‘ri javob berib, eshitish malakangizni oshiring.
          </p>
        </div>

        {/* Level Selector Tabs */}
        <div className="flex gap-1.5 p-1 rounded-2xl bg-slate-100 border border-slate-200 self-start md:self-auto">
          {(['Лёгкий', 'Средний', 'Сложный'] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => handleSelectLevel(lvl)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeLevel === lvl
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {lvl} (5)
            </button>
          ))}
        </div>
      </div>

      {/* Exercise Indicator */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {filteredExercises.map((ex, idx) => (
            <button
              key={ex.id}
              onClick={() => {
                stop();
                setActiveExerciseIndex(idx);
                setShowScript(false);
              }}
              className={`w-9 h-9 rounded-xl text-xs font-bold transition-all border ${
                idx === activeExerciseIndex
                  ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                  : submittedExercises[ex.id]
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
        <span className="text-xs text-purple-700 font-bold font-mono">
          +15 XP har bir to‘g‘ri javob uchun
        </span>
      </div>

      {/* Main Exercise Card */}
      {currentEx && (
        <motion.div
          key={currentEx.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6"
        >
          {/* Card Top Details */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-semibold">
                {currentEx.level} daraja • Topshiriq {activeExerciseIndex + 1} / 5
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">
                {currentEx.titleRu}
              </h3>
              <p className="text-xs text-slate-500">{currentEx.titleUz}</p>
            </div>

            {/* Play Audio Button */}
            <button
              onClick={() => speak(currentEx.audioTextRu)}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-sm transition-all self-start sm:self-auto hover:scale-[1.02]"
            >
              <Volume2 className="w-4 h-4" />
              <span>{isSpeaking ? 'Qayta tinglash' : 'Matnni tinglash (Audio)'}</span>
            </button>
          </div>

          {/* Show / Hide Script Button */}
          <div className="flex justify-end">
            <button
              onClick={() => setShowScript(!showScript)}
              className="flex items-center gap-1.5 text-xs text-purple-700 hover:text-purple-900 font-semibold transition-colors"
            >
              {showScript ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{showScript ? 'Ruscha matnni yashirish' : 'Ruscha matnni ko‘rish'}</span>
            </button>
          </div>

          {/* Hidden or Shown Audio Script */}
          {showScript && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 space-y-2"
            >
              <p className="font-sans leading-relaxed text-slate-900">
                {currentEx.audioTextRu}
              </p>
              <p className="text-slate-500 italic text-xs border-t border-slate-200 pt-2">
                Tarjimasi: {currentEx.audioTextUz}
              </p>
            </motion.div>
          )}

          {/* Question Box */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-purple-600" />
              <h4 className="text-base font-bold text-slate-900">
                {currentEx.questionRu}
              </h4>
            </div>
            <p className="text-xs text-slate-500 italic">
              {currentEx.questionUz}
            </p>

            {/* 4 Answer Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              {currentEx.optionsRu.map((opt, oIdx) => {
                const isSelected = selectedAnswers[currentEx.id] === oIdx;
                const isSubmitted = submittedExercises[currentEx.id];

                let btnClass = 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100';

                if (isSelected) {
                  btnClass = 'bg-purple-50 text-purple-900 border-purple-400 font-semibold';
                }

                if (isSubmitted) {
                  if (oIdx === currentEx.correctIndex) {
                    btnClass = 'bg-emerald-50 text-emerald-900 border-emerald-500 font-bold';
                  } else if (isSelected) {
                    btnClass = 'bg-red-50 text-red-900 border-red-400 line-through';
                  }
                }

                return (
                  <button
                    key={oIdx}
                    onClick={() => handleAnswer(oIdx)}
                    disabled={isSubmitted}
                    className={`p-3.5 rounded-2xl text-xs sm:text-sm text-left border transition-all ${btnClass}`}
                  >
                    <span className="font-mono text-purple-500 mr-2 font-bold">{String.fromCharCode(65 + oIdx)}.</span>
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Check / Explanation Section */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {!submittedExercises[currentEx.id] ? (
              <button
                onClick={handleCheck}
                disabled={selectedAnswers[currentEx.id] === undefined}
                className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 disabled:opacity-40 shadow-sm"
              >
                Javobni tekshirish
              </button>
            ) : (
              <div className="space-y-1">
                <p className={`text-xs font-bold ${
                  selectedAnswers[currentEx.id] === currentEx.correctIndex
                    ? 'text-emerald-700'
                    : 'text-red-700'
                }`}>
                  {selectedAnswers[currentEx.id] === currentEx.correctIndex
                    ? '✓ To‘g‘ri javob! (+15 XP)'
                    : '✕ Noto‘g‘ri javob!'}
                </p>
                <p className="text-xs text-slate-600">
                  {currentEx.explanationUz}
                </p>
              </div>
            )}

            {/* Next / Prev Buttons */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={handlePrevExercise}
                disabled={activeExerciseIndex === 0}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 disabled:opacity-30 text-slate-700"
              >
                Oldingi
              </button>
              <button
                onClick={handleNextExercise}
                disabled={activeExerciseIndex === filteredExercises.length - 1}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 disabled:opacity-30 text-white shadow-sm"
              >
                Keyingi mashq
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
