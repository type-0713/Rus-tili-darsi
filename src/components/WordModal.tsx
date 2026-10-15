import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, Bookmark, Check, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAudio } from '../context/AudioContext';

export const WordModal: React.FC = () => {
  const { selectedWord, closeWordModal, learnedWordIds, toggleLearnedWord } = useApp();
  const { speak } = useAudio();

  if (!selectedWord) return null;

  const isLearned = learnedWordIds.includes(selectedWord.lemma);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-lg p-6 sm:p-7 rounded-3xl bg-white shadow-2xl border border-slate-200 text-slate-800"
        >
          {/* Close button */}
          <button
            onClick={closeWordModal}
            className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-start gap-3.5 mb-5">
            <div className="p-3 rounded-2xl bg-purple-50 border border-purple-200 text-purple-700">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                  {selectedWord.word}
                </h3>
                <button
                  onClick={() => speak(selectedWord.word)}
                  className="p-1.5 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-800 transition-all flex items-center gap-1 text-xs font-bold"
                  title="Tinglash"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Ovoz</span>
                </button>
              </div>
              {selectedWord.transcription && (
                <p className="text-xs font-mono text-cyan-700 font-bold mt-0.5">
                  {selectedWord.transcription}
                </p>
              )}
              <span className="inline-block mt-1 text-[11px] px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium">
                {selectedWord.partOfSpeech}
              </span>
            </div>
          </div>

          {/* Translation Box */}
          <div className="p-4 mb-4 rounded-2xl bg-purple-50/70 border border-purple-200">
            <p className="text-[11px] text-purple-800 font-bold uppercase tracking-wider mb-0.5">
              O‘zbekcha tarjimasi:
            </p>
            <p className="text-lg font-bold text-purple-950">
              {selectedWord.translation}
            </p>
          </div>

          {/* Explanation */}
          <div className="mb-4">
            <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider mb-1">
              Grammatik tushuntirish:
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
              {selectedWord.explanation}
            </p>
          </div>

          {/* Examples */}
          {selectedWord.examples && selectedWord.examples.length > 0 && (
            <div className="mb-5">
              <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider mb-2">
                Matndan misollar:
              </p>
              <div className="space-y-2">
                {selectedWord.examples.map((eg, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-2 text-xs"
                  >
                    <div>
                      <p className="text-slate-900 font-semibold">{eg.ru}</p>
                      <p className="text-slate-500 italic mt-0.5">{eg.uz}</p>
                    </div>
                    <button
                      onClick={() => speak(eg.ru)}
                      className="text-purple-600 hover:text-purple-800 p-1 flex-shrink-0"
                      title="Misolni eshitish"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <button
              onClick={() => toggleLearnedWord(selectedWord.lemma)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                isLearned
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                  : 'bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-600/20'
              }`}
            >
              {isLearned ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Yodlandi (Lug‘atda)</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-4 h-4" />
                  <span>Yodladim deb belgilash (+5 XP)</span>
                </>
              )}
            </button>

            <button
              onClick={closeWordModal}
              className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-2xl transition-colors"
            >
              Yopish
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
