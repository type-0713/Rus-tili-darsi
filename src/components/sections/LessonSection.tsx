import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Volume2,
  Pause,
  Play,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Info
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAudio } from '../../context/AudioContext';
import { LESSON_STEPS, MAIN_LESSON_TEXT, INTERACTIVE_WORDS_MAP } from '../../data/lessonData';

export const LessonSection: React.FC = () => {
  const {
    currentStepId,
    setCurrentStepId,
    unlockStep,
    addXP,
    openWordModal,
    setActiveTab
  } = useApp();

  const {
    speak,
    speakSentenceQueue,
    isSpeaking,
    isPaused,
    pause,
    resume,
    stop,
    activeSentenceIndex
  } = useAudio();

  const [showTranslations, setShowTranslations] = useState<boolean>(true);

  const currentStep = LESSON_STEPS.find((s) => s.id === currentStepId) || LESSON_STEPS[0];

  const handleNextStep = () => {
    stop();
    const nextId = currentStepId + 1;
    if (nextId <= LESSON_STEPS.length) {
      addXP(currentStep.xpReward, `step-${currentStepId}`, true);
      unlockStep(nextId);
      setCurrentStepId(nextId);
    }
  };

  const handlePrevStep = () => {
    stop();
    if (currentStepId > 1) {
      setCurrentStepId(currentStepId - 1);
    }
  };

  const handleReadFullText = () => {
    const sentences = MAIN_LESSON_TEXT.map((s) => s.ru);
    speakSentenceQueue(sentences);
  };

  return (
    <div className="space-y-8 py-4 max-w-5xl mx-auto text-left">
      {/* Lesson Navigation Header - Clean White */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800">
              Bosqich {currentStep.id} / 11
            </span>
            <span className="text-xs text-amber-700 font-bold font-mono">
              +{currentStep.xpReward} XP
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {currentStep.titleRu}
          </h2>
          <p className="text-xs sm:text-sm text-purple-700 font-medium">
            {currentStep.titleUz}
          </p>
        </div>

        {/* Next / Prev Step Controls */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          <button
            onClick={handlePrevStep}
            disabled={currentStepId === 1}
            className="flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:pointer-events-none text-slate-700 border border-slate-200"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Oldingi</span>
          </button>

          <button
            onClick={handleNextStep}
            disabled={currentStepId === LESSON_STEPS.length}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-40 disabled:pointer-events-none text-white shadow-sm"
          >
            <span>Keyingi</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Steps Horizontal Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {LESSON_STEPS.map((s) => (
          <button
            key={s.id}
            onClick={() => {
              stop();
              setCurrentStepId(s.id);
            }}
            className={`flex-shrink-0 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              s.id === currentStepId
                ? 'bg-purple-600 text-white shadow-sm font-bold'
                : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
            }`}
          >
            {s.id}. {s.titleRu.replace(/^\d+\.\s*/, '')}
          </button>
        ))}
      </div>

      {/* Step 1: Введение */}
      {currentStepId === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6 text-left"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-purple-50 text-purple-700 border border-purple-200">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Введение в тему «О пользе чтения»</h3>
              <p className="text-xs text-slate-500">Kitob mutolaasining qudrati va inson tafakkuriga ta’siri</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-purple-50/60 border border-purple-200 text-slate-800 leading-relaxed text-sm sm:text-base space-y-3">
            <p>
              Добро пожаловать в Академию русского языка! Чтение — это не просто механический процесс складывания букв в слова. 
              Это сложнейшая интеллектуальная тренировка, активирующая миллиарды нейронов.
            </p>
            <p className="text-purple-800 text-xs sm:text-sm font-medium border-t border-purple-200/60 pt-2">
              Rus tili akademiyasiga xush kelibsiz! Kitob o‘qish shunchaki harflarni birlashtirish emas, balki milliardlab neyronlarni harakatga keltiruvchi buyuk aqliy mashg‘ulotdir.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <h4 className="font-bold text-sm text-purple-900 mb-1">Xotira mashqi</h4>
              <p className="text-xs text-slate-600">
                Muntazam o‘qish miyaning kognitiv zaxirasini oshiradi va yangi axborotlarni eslab qolishni osonlashtiradi.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <h4 className="font-bold text-sm text-cyan-900 mb-1">Boy so‘z zaxirasi</h4>
              <p className="text-xs text-slate-600">
                Har bir yangi kitob o‘nlab yangi so‘zlar, iboralar va chiroyli nutq tuzilmalarini taqdim etadi.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <h4 className="font-bold text-sm text-emerald-900 mb-1">Stressni kamaytirish</h4>
              <p className="text-xs text-slate-600">
                Kuniga atigi 15 daqiqa mutolaa qon bosimi va asabiy zo‘riqishni 68% gacha kamaytiradi.
              </p>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={handleNextStep}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm text-white bg-purple-600 hover:bg-purple-500 shadow-md"
            >
              <span>2-bosqich: Matnni o‘qishga o‘tish</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}

      {/* Steps 2 & 3: Main Text Reading with Sync Audio */}
      {(currentStepId === 2 || currentStepId === 3) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6 text-left"
        >
          {/* Audio Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2">
              {!isSpeaking ? (
                <button
                  onClick={handleReadFullText}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-sm"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Matnni to‘liq tinglash</span>
                </button>
              ) : (
                <>
                  {isPaused ? (
                    <button
                      onClick={resume}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Davom ettirish</span>
                    </button>
                  ) : (
                    <button
                      onClick={pause}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-white"
                    >
                      <Pause className="w-3.5 h-3.5 fill-current" />
                      <span>Pauza</span>
                    </button>
                  )}
                  <button
                    onClick={stop}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-red-600 hover:bg-red-700 text-white"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>To‘xtatish</span>
                  </button>
                </>
              )}
            </div>

            {/* Toggle Uzbek Translations */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowTranslations(!showTranslations)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${
                  showTranslations
                    ? 'bg-purple-100 text-purple-900 border-purple-300'
                    : 'bg-white text-slate-600 border-slate-200'
                }`}
              >
                {showTranslations ? 'Tarjimani yashirish' : 'O‘zbekcha tarjimani ko‘rsatish'}
              </button>
            </div>
          </div>

          {/* Hint banner */}
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-cyan-50 border border-cyan-200 text-xs text-cyan-900">
            <Info className="w-4 h-4 flex-shrink-0 text-cyan-600" />
            <span>
              Matndagi tagiga chizilgan binafsha so‘zlarni bosing — to‘liq tarjima, grammatik tushuntirish va audio chiqadi!
            </span>
          </div>

          {/* Sentences List */}
          <div className="space-y-3.5">
            {MAIN_LESSON_TEXT.map((sentence, idx) => {
              const isCurrentPlaying = isSpeaking && activeSentenceIndex === idx;

              return (
                <div
                  key={sentence.id}
                  className={`p-4 sm:p-5 rounded-2xl transition-all border ${
                    isCurrentPlaying
                      ? 'bg-purple-50/80 border-purple-400 shadow-md scale-[1.01]'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    {/* Russian Sentence with Interactive Words */}
                    <div className="text-base sm:text-lg text-slate-900 font-medium leading-relaxed">
                      {sentence.words.map((w, wIdx) => {
                        if (w.clickableWord && INTERACTIVE_WORDS_MAP[w.clickableWord]) {
                          const info = INTERACTIVE_WORDS_MAP[w.clickableWord];
                          return (
                            <button
                              key={wIdx}
                              onClick={() => openWordModal(info)}
                              className="inline-block text-purple-700 hover:text-purple-900 font-bold underline decoration-purple-400 decoration-2 underline-offset-4 hover:bg-purple-100 px-1 py-0.5 rounded transition-all cursor-pointer"
                              title={`${info.translation} (Bosib ko‘ring)`}
                            >
                              {w.text}
                            </button>
                          );
                        }
                        return <span key={wIdx}>{w.text}</span>;
                      })}
                    </div>

                    {/* Sentence Audio Button */}
                    <button
                      onClick={() => speak(sentence.ru)}
                      className="p-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 flex-shrink-0 transition-colors"
                      title="Ushbu gapni eshitish"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Uzbek Translation */}
                  {showTranslations && (
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 font-normal italic border-t border-slate-100 pt-2">
                      {sentence.uz}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Next Step Action */}
          <div className="pt-4 flex justify-between items-center border-t border-slate-100">
            <span className="text-xs text-slate-500">Matnni o‘qib bo‘ldingizmi?</span>
            <button
              onClick={handleNextStep}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-purple-600 hover:bg-purple-500 shadow-sm"
            >
              <span>Keyingi bosqichga o‘tish</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}

      {/* Steps 4 to 11 Shortcuts - Clean Light Style */}
      {currentStepId >= 4 && currentStepId <= 11 && (
        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm text-center space-y-4">
          <h3 className="text-xl font-bold text-slate-900">{currentStep.titleRu}</h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">{currentStep.descriptionUz}</p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            {currentStepId === 4 && (
              <button
                onClick={() => setActiveTab('dictionary')}
                className="px-6 py-3 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-sm"
              >
                To‘liq lug‘at bo‘limini ochish (27 so‘z)
              </button>
            )}
            {currentStepId === 5 && (
              <button
                onClick={() => setActiveTab('textbook')}
                className="px-6 py-3 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-sm"
              >
                Darslik mashqlarini ochish (54 va 59-betlar)
              </button>
            )}
            {currentStepId === 6 && (
              <button
                onClick={() => setActiveTab('grammar')}
                className="px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-sm"
              >
                Sonlar va foizlar qoidalarini ko‘rish
              </button>
            )}
            {currentStepId === 7 && (
              <button
                onClick={() => setActiveTab('pronunciation')}
                className="px-6 py-3 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-sm"
              >
                Talaffuz laboratoriyasiga o‘tish
              </button>
            )}
            {currentStepId === 8 && (
              <button
                onClick={() => setActiveTab('listening')}
                className="px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-sm"
              >
                Tinglab tushunish modulini ochish (15 mashq)
              </button>
            )}
            {currentStepId === 9 && (
              <button
                onClick={() => setActiveTab('games')}
                className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-sm"
              >
                7 ta o‘quv o‘yinini ochish
              </button>
            )}
            {currentStepId === 10 && (
              <button
                onClick={() => setActiveTab('quiz')}
                className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm"
              >
                Yakuniy testni boshlash (15 savol)
              </button>
            )}
            {currentStepId === 11 && (
              <button
                onClick={() => setActiveTab('summary')}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs shadow-sm"
              >
                Yakuniy xulosani ko‘rish
              </button>
            )}
            <button
              onClick={handleNextStep}
              className="px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-200"
            >
              Keyingi bosqich ➔
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
