import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Volume2,
  Award,
  TrendingUp,
  UserCheck,
  UserX
} from 'lucide-react';
import {
  TEXTBOOK_RULE_1,
  TEXTBOOK_EXERCISES_54,
  TEXTBOOK_RULE_2,
  TEXTBOOK_EXERCISES_59,
  TEXTBOOK_COMPARISONS_READING
} from '../../data/textbookData';
import { useAudio } from '../../context/AudioContext';
import { useApp } from '../../context/AppContext';

export const TextbookSection: React.FC = () => {
  const { speak } = useAudio();
  const { addXP } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'ex54' | 'ex59' | 'compare'>('ex54');

  // Exercise 54 State
  const [selectedEx54, setSelectedEx54] = useState<Record<string, number>>({});
  const [submittedEx54, setSubmittedEx54] = useState<Record<string, boolean>>({});

  // Exercise 59 State
  const [selectedNouns59, setSelectedNouns59] = useState<Record<string, number>>({});
  const [selectedPredicates59, setSelectedPredicates59] = useState<Record<string, number>>({});
  const [submittedEx59, setSubmittedEx59] = useState<Record<string, boolean>>({});

  const handleSelectEx54 = (exId: string, optIdx: number) => {
    if (submittedEx54[exId]) return;
    setSelectedEx54((prev) => ({ ...prev, [exId]: optIdx }));
  };

  const handleCheckEx54 = (exId: string, correctAns: string, options: string[]) => {
    const chosenIdx = selectedEx54[exId];
    if (chosenIdx === undefined) return;
    setSubmittedEx54((prev) => ({ ...prev, [exId]: true }));
    if (options[chosenIdx] === correctAns) {
      addXP(15, `tb-54-${exId}`, true);
      speak(correctAns);
    }
  };

  const handleCheckEx59 = (exId: string, correctNounIdx: number, correctPredIdx: number, fullSentence: string) => {
    const chosenNoun = selectedNouns59[exId];
    const chosenPred = selectedPredicates59[exId];
    if (chosenNoun === undefined || chosenPred === undefined) return;

    setSubmittedEx59((prev) => ({ ...prev, [exId]: true }));
    if (chosenNoun === correctNounIdx && chosenPred === correctPredIdx) {
      addXP(15, `tb-59-${exId}`, true);
      speak(fullSentence);
    }
  };

  return (
    <div className="space-y-8 py-4 max-w-5xl mx-auto text-left">
      {/* Header Banner - Clean Light Design */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-2 rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
              <BookOpen className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold text-amber-700 tracking-wider uppercase">
              Darslik amaliyoti (54 & 59-mashqlar)
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Kitobdagi Asosiy Grammatika va Mashqlar
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Darslikdagi «Запомните!» qoidalari, maqsad birikmalari (54-mashq), foizlar va kesim moslashuvi (59-mashq).
          </p>
        </div>

        {/* Sub-Tabs */}
        <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-slate-100 border border-slate-200 self-start md:self-auto">
          <button
            onClick={() => setActiveSubTab('ex54')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'ex54'
                ? 'bg-white text-purple-700 shadow-sm border border-slate-200/60'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            54-mashq: ДЛЯ ➔ ЧТОБЫ
          </button>
          <button
            onClick={() => setActiveSubTab('ex59')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'ex59'
                ? 'bg-white text-cyan-700 shadow-sm border border-slate-200/60'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            59-mashq: Foizlar va Kesim
          </button>
          <button
            onClick={() => setActiveSubTab('compare')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'compare'
                ? 'bg-white text-emerald-700 shadow-sm border border-slate-200/60'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Kitobxon vs O‘qimaydigan
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 1-RASM BO‘LIMI: 54-MASHQ VA «ДЛЯ ➔ ЧТОБЫ» QOIDASI */}
      {/* ======================================================== */}
      {activeSubTab === 'ex54' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Authentic Textbook "Запомните!" Box from Image 1 */}
          <div className="p-6 rounded-3xl bg-amber-50/80 border-2 border-amber-300 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-amber-500 text-white font-black text-center flex items-center justify-center text-sm">
                  !
                </span>
                <h3 className="text-lg font-black text-amber-950 uppercase tracking-wide">
                  {TEXTBOOK_RULE_1.titleRu} ({TEXTBOOK_RULE_1.sourceLabel})
                </h3>
              </div>
              <button
                onClick={() => speak(TEXTBOOK_RULE_1.formula)}
                className="p-1.5 rounded-lg bg-amber-200/60 text-amber-900 hover:bg-amber-200 flex items-center gap-1 text-xs font-semibold"
              >
                <Volume2 className="w-4 h-4" />
                <span>Ovoz</span>
              </button>
            </div>

            <p className="text-sm text-slate-800 leading-relaxed font-sans">
              Для того чтобы выразить цель, в <strong>простом предложении</strong> используют предлог <strong>для + родительный падеж</strong>, а в <strong>сложном предложении</strong> — союзы <strong>чтобы, для того чтобы</strong>:
            </p>

            {/* Formula badge */}
            <div className="p-3 rounded-xl bg-amber-100/80 border border-amber-300 text-xs font-mono font-bold text-amber-950">
              Формула: {TEXTBOOK_RULE_1.formula}
            </div>

            <div className="p-4 rounded-2xl bg-white border border-amber-200 space-y-2 text-xs sm:text-sm">
              <div className="flex items-start gap-2">
                <span className="font-bold text-amber-700 flex-shrink-0">Oddiy gap:</span>
                <span className="text-slate-900 font-medium">
                  <strong>Для сохранения</strong> ясности ума нужно постоянно тренировать свой мозг.
                </span>
              </div>
              <div className="text-center font-bold text-slate-400">=</div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-purple-700 flex-shrink-0">Qo‘shma gap:</span>
                <span className="text-slate-900 font-medium">
                  <strong>Чтобы сохранить</strong> ясность ума, нужно постоянно тренировать свой мозг.
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-100/60 border border-amber-200 text-xs text-amber-900">
              <strong>Muhim qoida:</strong> Murakkab qo‘shma gaplarda «чтобы» yoki «для того чтобы» bog‘lovchisidan oldin yoki keyin vergul qat’iy qo‘yiladi!
            </div>
          </div>

          {/* 4 Textbook Values from Image 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { title: 'Tahlil va mulohaza', textRu: 'Чтение учит рассуждать, анализировать' },
              { title: 'Muvaffaqiyat poydevori', textRu: 'Чтение — основа успешности в школе и во взрослой жизни' },
              { title: 'Tasavvur va ijod', textRu: 'Чтение развивает воображение и творческие способности' },
              { title: 'Nutq va savodxonlik', textRu: 'Повышает общую грамотность и развивает навыки красивой речи' }
            ].map((b, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-sm text-left">
                <h4 className="text-xs font-bold text-purple-700 mb-1">{b.title}</h4>
                <p className="text-xs text-slate-800 font-medium leading-snug">{b.textRu}</p>
              </div>
            ))}
          </div>

          {/* 54-MASHQ TOPSHIRIQLARI */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Award className="w-5 h-5 text-purple-600" />
                  <span>54-mashq: Oddiy gapni qo‘shma gapga aylantiring</span>
                </h3>
                <p className="text-xs text-slate-500">
                  «ДЛЯ» predlogi o‘rniga «ЧТОБЫ / ДЛЯ ТОГО ЧТОБЫ» qo‘yib, to‘g‘ri gapni tanlang (+15 XP):
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {TEXTBOOK_EXERCISES_54.map((ex) => {
                const isSubmitted = submittedEx54[ex.id];
                const selectedIdx = selectedEx54[ex.id];
                const isCorrect = selectedIdx !== undefined && ex.optionsRu[selectedIdx] === ex.correctAnswerRu;

                return (
                  <div
                    key={ex.id}
                    className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-mono">
                          {ex.number}-topshiriq
                        </span>
                        <p className="text-sm font-bold text-slate-900 mt-1">
                          Oddiy gap: «{ex.simpleSentenceRu}»
                        </p>
                        <p className="text-xs text-slate-500 italic mt-0.5">
                          Ma’nosi: {ex.simpleSentenceUz}
                        </p>
                      </div>
                      <button
                        onClick={() => speak(ex.simpleSentenceRu)}
                        className="p-1.5 rounded-lg bg-purple-50 text-purple-600 hover:bg-purple-100"
                        title="Tinglash"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* 4 Variants */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {ex.optionsRu.map((opt, oIdx) => {
                        const isChosen = selectedIdx === oIdx;
                        let btnStyle = 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100';

                        if (isChosen) {
                          btnStyle = 'bg-purple-50 text-purple-900 border-purple-400 font-semibold';
                        }

                        if (isSubmitted) {
                          if (opt === ex.correctAnswerRu) {
                            btnStyle = 'bg-emerald-50 text-emerald-900 border-emerald-500 font-bold';
                          } else if (isChosen) {
                            btnStyle = 'bg-red-50 text-red-900 border-red-400 line-through';
                          }
                        }

                        return (
                          <button
                            key={oIdx}
                            onClick={() => handleSelectEx54(ex.id, oIdx)}
                            disabled={isSubmitted}
                            className={`p-3 rounded-xl text-xs text-left border transition-all ${btnStyle}`}
                          >
                            <span className="font-mono text-purple-500 mr-1.5 font-bold">
                              {String.fromCharCode(65 + oIdx)}.
                            </span>
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {/* Check Button & Explanation */}
                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      {!isSubmitted ? (
                        <button
                          onClick={() => handleCheckEx54(ex.id, ex.correctAnswerRu, ex.optionsRu)}
                          disabled={selectedIdx === undefined}
                          className="px-5 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white shadow-sm disabled:opacity-40"
                        >
                          Tekshirish
                        </button>
                      ) : (
                        <div className="space-y-1">
                          <p className={`text-xs font-bold ${isCorrect ? 'text-emerald-600' : 'text-red-600'}`}>
                            {isCorrect ? '✓ To‘g‘ri almashtirildi! (+15 XP)' : '✕ Noto‘g‘ri variant!'}
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
          </div>
        </motion.div>
      )}

      {/* ======================================================== */}
      {/* 2-RASM BO‘LIMI: 59-QOIDA VA FOIZLAR KESIMI (ЧИТАЕТ/ЧИТАЮТ) */}
      {/* ======================================================== */}
      {activeSubTab === 'ex59' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Authentic Textbook "Запомните!" Box from Image 2 */}
          <div className="p-6 rounded-3xl bg-cyan-50/80 border-2 border-cyan-300 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-cyan-600 text-white font-black text-center flex items-center justify-center text-sm">
                  !
                </span>
                <h3 className="text-lg font-black text-cyan-950 uppercase tracking-wide">
                  {TEXTBOOK_RULE_2.titleRu} ({TEXTBOOK_RULE_2.sourceLabel})
                </h3>
              </div>
              <button
                onClick={() => speak('31 процент россиян читает книги для детей. 22 процента россиян читают женские детективы. 13 процентов россиян читают книги о красоте и здоровье.')}
                className="p-1.5 rounded-lg bg-cyan-200/60 text-cyan-900 hover:bg-cyan-200 flex items-center gap-1 text-xs font-semibold"
              >
                <Volume2 className="w-4 h-4" />
                <span>Ovoz</span>
              </button>
            </div>

            <p className="text-sm text-slate-800 leading-relaxed font-sans">
              Вспомните, в какой форме стоят имена существительные после числительных. <strong>Обратите внимание на форму сказуемого!</strong>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-white border border-cyan-200 space-y-2">
                <span className="px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-800 font-bold font-mono">
                  1, 21, 31...
                </span>
                <p className="text-slate-800">
                  Существительное в <strong>именительном падеже ед. ч.</strong> + сказуемое в <strong>единственном числе</strong>:
                </p>
                <p className="font-semibold text-cyan-900 bg-cyan-50 p-2 rounded-lg">
                  31 <u>процент</u> россиян <u>читает</u> книги для детей.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-cyan-200 space-y-2">
                <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 font-bold font-mono">
                  2, 3, 4, 22, 33, 44, 52...
                </span>
                <p className="text-slate-800">
                  Существительное в <strong>родительном падеже ед. ч.</strong> + сказуемое во <strong>множественном числе</strong>:
                </p>
                <p className="font-semibold text-purple-900 bg-purple-50 p-2 rounded-lg">
                  22 <u>процента</u> россиян <u>читают</u> женские детективы.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-cyan-200 space-y-2">
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold font-mono">
                  5... 10... 13... 100
                </span>
                <p className="text-slate-800">
                  Существительное в <strong>родительном падеже мн. ч.</strong> + сказуемое во <strong>множественном числе</strong>:
                </p>
                <p className="font-semibold text-emerald-900 bg-emerald-50 p-2 rounded-lg">
                  13 <u>процентов</u> россиян <u>читают</u> книги о красоте и здоровье.
                </p>
              </div>
            </div>
          </div>

          {/* 59-MASHQ INTERAKTIV TREYNAJORI */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-cyan-600" />
                <span>59-mashq: Foiz shakli va kesimni tanlang</span>
              </h3>
              <p className="text-xs text-slate-500">
                Har bir gap uchun otning to‘g‘ri shakli (процент/процента/процентов) va fe’lning (читает/читают) mos shaklini belgilang:
              </p>
            </div>

            <div className="space-y-4">
              {TEXTBOOK_EXERCISES_59.map((item) => {
                const isSubmitted = submittedEx59[item.id];
                const nounIdx = selectedNouns59[item.id];
                const predIdx = selectedPredicates59[item.id];

                const isAllCorrect =
                  nounIdx === item.correctNounIndex && predIdx === item.correctPredicateIndex;

                return (
                  <div
                    key={item.id}
                    className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-mono">
                          {item.ruleCategory}
                        </span>
                        <h4 className="text-base font-bold text-slate-900 mt-1">
                          {item.number} [ ... ] россиян [ ... ]
                        </h4>
                        <p className="text-xs text-slate-500 italic mt-0.5">
                          Tarjimasi: {item.translationUz}
                        </p>
                      </div>

                      <button
                        onClick={() => speak(item.fullSentenceRu)}
                        className="p-1.5 rounded-lg bg-cyan-50 text-cyan-700 hover:bg-cyan-100"
                        title="Tinglash"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Step 1: Noun Selection */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">
                        1) «{item.number}» sonidan keyin «процент» qaysi shaklda bo‘ladi?
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {item.nounOptionsRu.map((nOpt, nIdx) => {
                          const isPicked = nounIdx === nIdx;
                          let btnClass = 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100';

                          if (isPicked) {
                            btnClass = 'bg-cyan-50 border-cyan-400 text-cyan-950 font-bold';
                          }

                          if (isSubmitted) {
                            if (nIdx === item.correctNounIndex) {
                              btnClass = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                            } else if (isPicked) {
                              btnClass = 'bg-red-50 border-red-400 text-red-900';
                            }
                          }

                          return (
                            <button
                              key={nIdx}
                              onClick={() => {
                                if (!isSubmitted) setSelectedNouns59((prev) => ({ ...prev, [item.id]: nIdx }));
                              }}
                              disabled={isSubmitted}
                              className={`px-3.5 py-1.5 rounded-xl text-xs border transition-all ${btnClass}`}
                            >
                              {nOpt}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Step 2: Predicate Selection */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">
                        2) Kesim qaysi sonda bo‘ladi? (читает / читают)
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {item.predicateOptionsRu.map((pOpt, pIdx) => {
                          const isPicked = predIdx === pIdx;
                          let btnClass = 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100';

                          if (isPicked) {
                            btnClass = 'bg-purple-50 border-purple-400 text-purple-950 font-bold';
                          }

                          if (isSubmitted) {
                            if (pIdx === item.correctPredicateIndex) {
                              btnClass = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                            } else if (isPicked) {
                              btnClass = 'bg-red-50 border-red-400 text-red-900';
                            }
                          }

                          return (
                            <button
                              key={pIdx}
                              onClick={() => {
                                if (!isSubmitted) setSelectedPredicates59((prev) => ({ ...prev, [item.id]: pIdx }));
                              }}
                              disabled={isSubmitted}
                              className={`px-3.5 py-1.5 rounded-xl text-xs border transition-all ${btnClass}`}
                            >
                              {pOpt}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Check & Explanation */}
                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      {!isSubmitted ? (
                        <button
                          onClick={() => handleCheckEx59(item.id, item.correctNounIndex, item.correctPredicateIndex, item.fullSentenceRu)}
                          disabled={nounIdx === undefined || predIdx === undefined}
                          className="px-5 py-2 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-sm disabled:opacity-40"
                        >
                          Tekshirish
                        </button>
                      ) : (
                        <div className="space-y-1">
                          <p className={`text-xs font-bold ${isAllCorrect ? 'text-emerald-600' : 'text-red-600'}`}>
                            {isAllCorrect ? '✓ To‘g‘ri! Gap to‘liq moslashtirildi (+15 XP)' : '✕ Xatolik bor!'}
                          </p>
                          <p className="text-xs text-slate-600">
                            {item.grammaticalReasonUz}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}

      {/* ======================================================== */}
      {/* 3-BO‘LIM: KITOBXON VA O‘QIMAYDIGAN INSON TAQQOSLOVI */}
      {/* ======================================================== */}
      {activeSubTab === 'compare' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-xl font-black text-slate-900 text-center">
              {TEXTBOOK_COMPARISONS_READING.titleRu}
            </h3>
            <p className="text-xs text-slate-500 text-center max-w-xl mx-auto">
              {TEXTBOOK_COMPARISONS_READING.titleUz}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3">
              {/* Reader Card */}
              <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm pb-2 border-b border-emerald-200">
                  <UserCheck className="w-5 h-5 text-emerald-600" />
                  <span>{TEXTBOOK_COMPARISONS_READING.bookReader.titleRu}</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-800">
                  {TEXTBOOK_COMPARISONS_READING.bookReader.points.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Non-Reader Card */}
              <div className="p-5 rounded-2xl bg-red-50/70 border border-red-200 space-y-3">
                <div className="flex items-center gap-2 text-red-800 font-bold text-sm pb-2 border-b border-red-200">
                  <UserX className="w-5 h-5 text-red-600" />
                  <span>{TEXTBOOK_COMPARISONS_READING.nonReader.titleRu}</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-800">
                  {TEXTBOOK_COMPARISONS_READING.nonReader.points.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-red-500 font-bold">✕</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
