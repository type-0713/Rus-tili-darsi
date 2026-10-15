import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BookA,
  Search,
  Volume2,
  BookmarkCheck,
  Bookmark,
  Layers,
  RotateCw,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

import { DICTIONARY_DATA } from '../../data/dictionaryData';
import { useAudio } from '../../context/AudioContext';
import { useApp } from '../../context/AppContext';

export const DictionarySection: React.FC = () => {
  const { speak } = useAudio();
  const { learnedWordIds, toggleLearnedWord } = useApp();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'flashcard'>('grid');
  const [flashcardIndex, setFlashcardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  // Filter dictionary items
  const filteredWords = DICTIONARY_DATA.filter((item) => {
    const matchesSearch =
      item.wordRu.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.wordUz.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (selectedFilter === 'learned') return learnedWordIds.includes(item.id);
    if (selectedFilter === 'unlearned') return !learnedWordIds.includes(item.id);
    if (selectedFilter === 'verbs') return item.partOfSpeech === 'глагол';
    if (selectedFilter === 'nouns') return item.partOfSpeech === 'существительное';
    return true;
  });

  const currentFlashcard = filteredWords[flashcardIndex] || filteredWords[0];

  const handleNextFlashcard = () => {
    setIsFlipped(false);
    setFlashcardIndex((prev) => (prev + 1) % filteredWords.length);
  };

  const handlePrevFlashcard = () => {
    setIsFlipped(false);
    setFlashcardIndex((prev) => (prev - 1 + filteredWords.length) % filteredWords.length);
  };

  return (
    <div className="space-y-8 py-4 max-w-5xl mx-auto text-left">
      {/* Header Banner - Clean Light Design */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-2 rounded-xl bg-cyan-50 text-cyan-700 border border-cyan-200">
              <BookA className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold text-cyan-700 tracking-wider uppercase">
              Интерактивный словарь
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Ruscha–O‘zbekcha Lug‘at (27+ so‘z)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Yodlangan so‘zlar: <span className="text-cyan-700 font-bold">{learnedWordIds.length}</span> / {DICTIONARY_DATA.length}
          </p>
        </div>

        {/* View Mode Toggle: Grid vs Flashcards */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 border border-slate-200 self-start md:self-auto">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              viewMode === 'grid'
                ? 'bg-white text-purple-700 shadow-sm border border-slate-200/60'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Ro‘yxat ko‘rinishi
          </button>
          <button
            onClick={() => setViewMode('flashcard')}
            className={`flex items-center gap-1 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              viewMode === 'flashcard'
                ? 'bg-white text-cyan-700 shadow-sm border border-slate-200/60'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Flashcard rejimi</span>
          </button>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Ruscha yoki o‘zbekcha so‘z qidiring..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:border-purple-500 shadow-sm"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'all', label: 'Barchasi' },
            { id: 'unlearned', label: 'Yodlanmagan' },
            { id: 'learned', label: 'Yodlangan' },
            { id: 'verbs', label: 'Fe’llar' },
            { id: 'nouns', label: 'Otlar' }
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedFilter(f.id)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedFilter === f.id
                  ? 'bg-purple-600 text-white shadow-sm font-bold'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* View Mode: Flashcards */}
      {viewMode === 'flashcard' && currentFlashcard && (
        <div className="flex flex-col items-center justify-center space-y-6 py-6">
          <div className="text-xs text-slate-500 font-mono font-semibold">
            Karta {flashcardIndex + 1} / {filteredWords.length}
          </div>

          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full max-w-md h-72 cursor-pointer perspective-1000"
          >
            <motion.div
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.5 }}
              className="relative w-full h-full rounded-3xl p-6 bg-white border-2 border-purple-200 shadow-xl flex flex-col justify-between text-center select-none"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {!isFlipped ? (
                // Front Side (Russian)
                <div className="h-full flex flex-col justify-between items-center">
                  <div className="w-full flex justify-between items-center">
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 font-semibold">
                      {currentFlashcard.partOfSpeech}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speak(currentFlashcard.wordRu);
                      }}
                      className="p-2 rounded-full bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors"
                      title="Ovoz chiqarib o‘qish"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-wide">
                      {currentFlashcard.wordRu}
                    </h3>
                    {currentFlashcard.transcription && (
                      <p className="text-sm font-mono text-cyan-700 mt-1 font-semibold">
                        {currentFlashcard.transcription}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>Tarjimani ko‘rish uchun kartani bosing</span>
                  </div>
                </div>
              ) : (
                // Back Side (Uzbek translation & example)
                <div
                  className="h-full flex flex-col justify-between items-center"
                  style={{ transform: 'rotateY(180deg)' }}
                >
                  <span className="text-xs text-cyan-800 font-bold uppercase tracking-wider">
                    O‘zbekcha tarjima
                  </span>

                  <div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2">
                      {currentFlashcard.wordUz}
                    </h3>
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 max-w-sm mx-auto shadow-sm">
                      <p className="text-purple-800 font-semibold">{currentFlashcard.exampleRu}</p>
                      <p className="text-slate-500 mt-1 italic">{currentFlashcard.exampleUz}</p>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLearnedWord(currentFlashcard.id);
                    }}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                      learnedWordIds.includes(currentFlashcard.id)
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                        : 'bg-purple-600 hover:bg-purple-500 text-white'
                    }`}
                  >
                    <BookmarkCheck className="w-4 h-4" />
                    <span>
                      {learnedWordIds.includes(currentFlashcard.id) ? 'Yodlandi' : 'Yodladim deb belgilash'}
                    </span>
                  </button>
                </div>
              )}
            </motion.div>
          </div>

          {/* Flashcard Next/Prev buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={handlePrevFlashcard}
              className="p-3 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-sm"
              title="Oldingi so‘z"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="px-5 py-2.5 rounded-2xl bg-white text-xs font-bold text-slate-700 border border-slate-200 hover:bg-slate-50 shadow-sm flex items-center gap-1.5"
            >
              <RotateCw className="w-4 h-4" />
              <span>Aylantirish</span>
            </button>
            <button
              onClick={handleNextFlashcard}
              className="p-3 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-sm"
              title="Keyingi so‘z"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* View Mode: Grid Cards */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredWords.map((item) => {
            const isLearned = learnedWordIds.includes(item.id);

            return (
              <div
                key={item.id}
                className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 hover:border-purple-300 transition-all flex flex-col justify-between gap-3 shadow-sm hover:shadow-md"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 tracking-tight">
                        {item.wordRu}
                      </h4>
                      {item.transcription && (
                        <p className="text-xs font-mono text-cyan-700 font-semibold">
                          {item.transcription}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => speak(item.wordRu)}
                      className="p-2 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors"
                      title="Tinglash"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Uzbek translation */}
                  <p className="text-sm font-semibold text-slate-800 mt-2">
                    {item.wordUz}
                  </p>

                  {/* Example */}
                  <div className="mt-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                    <p className="text-purple-900 font-medium">{item.exampleRu}</p>
                    <p className="text-slate-500 italic mt-0.5">{item.exampleUz}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold">
                    {item.partOfSpeech}
                  </span>

                  <button
                    onClick={() => toggleLearnedWord(item.id)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      isLearned
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                        : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                    }`}
                  >
                    {isLearned ? (
                      <>
                        <BookmarkCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Yodlandi</span>
                      </>
                    ) : (
                      <>
                        <Bookmark className="w-3.5 h-3.5" />
                        <span>Yodlash</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
