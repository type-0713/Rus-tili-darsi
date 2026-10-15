import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Library,
  Volume2,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Award
} from 'lucide-react';

import { GRAMMAR_TOPICS } from '../../data/grammarData';
import { useAudio } from '../../context/AudioContext';
import { useApp } from '../../context/AppContext';

export const GrammarSection: React.FC = () => {
  const { speak } = useAudio();
  const { addXP } = useApp();

  const [selectedLevel, setSelectedLevel] = useState<string>('Все');
  const [expandedTopicId, setExpandedTopicId] = useState<string>('topic-a');
  const [exerciseAnswers, setExerciseAnswers] = useState<Record<string, number>>({});
  const [submittedExercises, setSubmittedExercises] = useState<Record<string, boolean>>({});

  const levels = ['Все', 'Начальный уровень', 'Средний уровень', 'Продвинутый уровень'];

  const filteredTopics = GRAMMAR_TOPICS.filter((t) => {
    if (selectedLevel === 'Все') return true;
    return t.level === selectedLevel;
  });

  const handleSelectOption = (exerciseId: string, optionIndex: number) => {
    if (submittedExercises[exerciseId]) return;
    setExerciseAnswers((prev) => ({ ...prev, [exerciseId]: optionIndex }));
  };

  const handleCheckExercise = (exerciseId: string, correctIndex: number) => {
    if (exerciseAnswers[exerciseId] === undefined) return;
    setSubmittedExercises((prev) => ({ ...prev, [exerciseId]: true }));
    if (exerciseAnswers[exerciseId] === correctIndex) {
      addXP(10, `grammar-ex-${exerciseId}`, true);
    }
  };

  return (
    <div className="space-y-8 py-4 max-w-5xl mx-auto text-left">
      {/* Header Banner - Clean Light Design */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-2 rounded-xl bg-purple-50 text-purple-700 border border-purple-200">
              <Library className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold text-purple-700 tracking-wider uppercase">
              Академия Русской Грамматики
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Grammatika Mavzulari (A dan K gacha)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Formulalar, to‘g‘ri/noto‘g‘ri namunalar, ovozli talaffuz va interaktiv mashqlar bilan rus tili grammatikasi.
          </p>
        </div>

        {/* Level Filter Tabs */}
        <div className="flex flex-wrap gap-1.5 p-1.5 rounded-2xl bg-slate-100 border border-slate-200 self-start md:self-auto">
          {levels.map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedLevel === lvl
                  ? 'bg-purple-600 text-white shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Topics Accordion List */}
      <div className="space-y-4">
        {filteredTopics.map((topic) => {
          const isExpanded = expandedTopicId === topic.id;

          return (
            <div
              key={topic.id}
              className={`rounded-2xl transition-all border overflow-hidden ${
                isExpanded
                  ? 'bg-white border-purple-300 ring-2 ring-purple-100 shadow-md'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
              }`}
            >
              {/* Accordion Trigger */}
              <button
                onClick={() => setExpandedTopicId(isExpanded ? '' : topic.id)}
                className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left hover:bg-slate-50/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 font-black text-base flex items-center justify-center flex-shrink-0 border border-purple-200 shadow-sm">
                    {topic.letterCode}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-base sm:text-lg text-slate-900">
                        {topic.titleRu}
                      </h3>
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                        {topic.level}
                      </span>
                    </div>
                    <p className="text-xs text-purple-700 mt-0.5 font-medium">
                      {topic.titleUz}
                    </p>
                  </div>
                </div>

                <div className="text-slate-400 p-1">
                  {isExpanded ? <ChevronUp className="w-5 h-5 text-purple-600" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {/* Accordion Expanded Body */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="p-5 sm:p-6 border-t border-slate-100 space-y-6 bg-slate-50/40"
                  >
                    {/* Uzbek Explanation */}
                    <div className="p-4 rounded-2xl bg-purple-50/80 border border-purple-200/90 shadow-sm">
                      <div className="flex items-center gap-2 mb-1.5 text-xs font-bold text-purple-900 uppercase tracking-wider">
                        <Lightbulb className="w-4 h-4 text-amber-500" />
                        <span>O‘zbek tilida tushuntirish:</span>
                      </div>
                      <p className="text-sm text-slate-800 leading-relaxed font-sans">
                        {topic.summaryUz}
                      </p>
                    </div>

                    {/* Russian Rule & Formula */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                      <p className="text-xs font-bold text-cyan-800 uppercase tracking-wider">
                        Правило русского языка:
                      </p>
                      <p className="text-sm text-slate-800 whitespace-pre-line leading-relaxed font-sans">
                        {topic.ruleRu}
                      </p>
                      {topic.formula && (
                        <div className="mt-3 p-3 rounded-xl bg-cyan-50 border border-cyan-200 text-xs font-mono text-cyan-950 font-bold">
                          <span className="uppercase mr-1.5 text-cyan-800">Формула:</span>
                          {topic.formula}
                        </div>
                      )}
                    </div>

                    {/* Examples with Audio */}
                    <div className="space-y-2.5">
                      <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                        <span>Namuna misollar (Ovoz bilan):</span>
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {topic.examples.map((eg, idx) => (
                          <div
                            key={idx}
                            className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start justify-between gap-2 hover:border-purple-300 transition-all"
                          >
                            <div>
                              <p className="text-sm font-semibold text-slate-900">
                                {eg.ru}
                              </p>
                              <p className="text-xs text-slate-500 mt-1 italic">
                                {eg.uz}
                              </p>
                            </div>
                            <button
                              onClick={() => speak(eg.ru)}
                              className="p-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 flex-shrink-0 transition-colors"
                              title="Tinglash"
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Comparisons (To'g'ri va Noto'g'ri) */}
                    {topic.comparisons && topic.comparisons.length > 0 && (
                      <div className="space-y-2.5">
                        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                          Taqqoslash: To‘g‘ri va noto‘g‘ri shakllar
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {topic.comparisons.map((c, idx) => (
                            <div
                              key={idx}
                              className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2 text-xs"
                            >
                              <div className="flex items-center gap-2 text-emerald-700 font-bold">
                                <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-600" />
                                <span>{c.correctRu}</span>
                              </div>
                              <div className="flex items-center gap-2 text-red-700 font-medium line-through">
                                <XCircle className="w-4 h-4 flex-shrink-0 text-red-500" />
                                <span>{c.incorrectRu}</span>
                              </div>
                              <p className="text-slate-500 text-[11px] pt-1.5 border-t border-slate-100">
                                {c.explanationUz}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Common Mistakes */}
                    {topic.commonMistakesUz && topic.commonMistakesUz.length > 0 && (
                      <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs shadow-sm">
                        <div className="flex items-center gap-1.5 text-amber-900 font-bold mb-1.5 uppercase tracking-wide">
                          <AlertTriangle className="w-4 h-4 text-amber-600" />
                          <span>Keng tarqalgan xatolar (Типичные ошибки):</span>
                        </div>
                        <ul className="list-disc list-inside space-y-1 text-slate-700 font-medium">
                          {topic.commonMistakesUz.map((m, mIdx) => (
                            <li key={mIdx}>{m}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Interactive Exercises for this Topic */}
                    {topic.exercises && topic.exercises.length > 0 && (
                      <div className="pt-2 space-y-4">
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                          <Award className="w-4 h-4 text-amber-600" />
                          <span>Interaktiv mashq va mini-test (+10 XP):</span>
                        </h4>

                        {topic.exercises.map((ex) => {
                          const isSubmitted = submittedExercises[ex.id];
                          const selected = exerciseAnswers[ex.id];
                          const isCorrect = selected === ex.correctIndex;

                          return (
                            <div
                              key={ex.id}
                              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3"
                            >
                              <p className="text-xs text-purple-700 font-semibold">
                                {ex.instructionUz}
                              </p>
                              <p className="text-sm font-bold text-slate-900">
                                {ex.question}
                              </p>

                              {/* Options */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {ex.options.map((opt, oIdx) => {
                                  let btnStyle = 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100';

                                  if (selected === oIdx) {
                                    btnStyle = 'bg-purple-50 text-purple-900 border-purple-400 font-semibold';
                                  }

                                  if (isSubmitted) {
                                    if (oIdx === ex.correctIndex) {
                                      btnStyle = 'bg-emerald-50 text-emerald-900 border-emerald-500 font-bold';
                                    } else if (selected === oIdx) {
                                      btnStyle = 'bg-red-50 text-red-900 border-red-400 line-through';
                                    }
                                  }

                                  return (
                                    <button
                                      key={oIdx}
                                      onClick={() => handleSelectOption(ex.id, oIdx)}
                                      disabled={isSubmitted}
                                      className={`p-3 rounded-xl text-xs text-left border transition-all ${btnStyle}`}
                                    >
                                      {opt}
                                    </button>
                                  );
                                })}
                              </div>

                              {/* Submit or Result */}
                              <div className="flex items-center justify-between pt-1">
                                {!isSubmitted ? (
                                  <button
                                    onClick={() => handleCheckExercise(ex.id, ex.correctIndex)}
                                    disabled={selected === undefined}
                                    className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 shadow-sm disabled:opacity-40"
                                  >
                                    Tekshirish
                                  </button>
                                ) : (
                                  <div className="w-full space-y-1">
                                    <p className={`text-xs font-bold ${isCorrect ? 'text-emerald-700' : 'text-red-700'}`}>
                                      {isCorrect ? '✓ To‘g‘ri javob! (+10 XP)' : '✕ Noto‘g‘ri javob!'}
                                    </p>
                                    <p className="text-xs text-slate-600">
                                      {ex.explanationUz}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};
