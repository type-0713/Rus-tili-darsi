import React, { useState, useEffect } from 'react';
import {
  Gamepad2,
  Trophy,
  RotateCcw,
  Volume2,
  Clock,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAudio } from '../../context/AudioContext';
import {
  MATCH_PAIRS_POOL,
  SENTENCE_PUZZLES,
  PARTS_OF_SPEECH_ITEMS,
  PERCENTAGE_CHALLENGES,
  CASE_TRAINER_ITEMS,
  AUDIO_GAME_ITEMS,
  BATTLE_QUESTIONS
} from '../../data/gamesData';

export const GamesSection: React.FC = () => {
  const { addXP } = useApp();
  const { speak } = useAudio();

  const [activeGameId, setActiveGameId] = useState<number>(1);

  const gameTabs = [
    { id: 1, nameRu: '1. Найди перевод', nameUz: 'Juftliklarni top' },
    { id: 2, nameRu: '2. Собери предложение', nameUz: 'Gapni yig‘' },
    { id: 3, nameRu: '3. Глагол или существительное?', nameUz: 'Fe’l yoki ot?' },
    { id: 4, nameRu: '4. Процентный вызов', nameUz: 'Foizlar sinovi' },
    { id: 5, nameRu: '5. Падежный тренажёр', nameUz: 'Kelishiklar' },
    { id: 6, nameRu: '6. Послушай и ответь', nameUz: 'Audio-savol' },
    { id: 7, nameRu: '7. Битва знаний', nameUz: '60s viktorina' }
  ];

  // ==========================================
  // GAME 1: НАЙДИ ПЕРЕВОД (Match pairs - Fixed & Polished)
  // ==========================================
  const Game1MatchPairs = () => {
    interface CardItem {
      uniqueKey: string;
      pairId: string;
      text: string;
      lang: 'ru' | 'uz';
    }

    const [cards, setCards] = useState<CardItem[]>([]);
    const [firstCard, setFirstCard] = useState<CardItem | null>(null);
    const [secondCard, setSecondCard] = useState<CardItem | null>(null);
    const [matchedPairIds, setMatchedPairIds] = useState<string[]>([]);
    const [wrongPairKeys, setWrongPairKeys] = useState<string[]>([]);
    const [score, setScore] = useState<number>(0);
    const [isWon, setIsWon] = useState<boolean>(false);

    const initGame = () => {
      const selected = [...MATCH_PAIRS_POOL].sort(() => 0.5 - Math.random()).slice(0, 6);
      const generated: CardItem[] = [];

      selected.forEach((pair) => {
        generated.push({
          uniqueKey: `${pair.id}-ru`,
          pairId: pair.id,
          text: pair.ru,
          lang: 'ru'
        });
        generated.push({
          uniqueKey: `${pair.id}-uz`,
          pairId: pair.id,
          text: pair.uz,
          lang: 'uz'
        });
      });

      setCards(generated.sort(() => 0.5 - Math.random()));
      setFirstCard(null);
      setSecondCard(null);
      setMatchedPairIds([]);
      setWrongPairKeys([]);
      setScore(0);
      setIsWon(false);
    };

    useEffect(() => {
      initGame();
    }, []);

    const handleCardClick = (card: CardItem) => {
      if (firstCard && secondCard) return; // Wait for flip back
      if (matchedPairIds.includes(card.pairId)) return;
      
      // If user clicks the exact same first card, deselect it
      if (firstCard && firstCard.uniqueKey === card.uniqueKey) {
        setFirstCard(null);
        return;
      }

      if (card.lang === 'ru') {
        speak(card.text);
      }

      if (!firstCard) {
        setFirstCard(card);
        setWrongPairKeys([]);
        return;
      }

      // Second card chosen
      setSecondCard(card);

      if (firstCard.pairId === card.pairId && firstCard.lang !== card.lang) {
        // MATCH!
        const nextMatched = [...matchedPairIds, card.pairId];
        setMatchedPairIds(nextMatched);
        setScore((prev) => prev + 15);
        setFirstCard(null);
        setSecondCard(null);

        if (nextMatched.length === 6) {
          setIsWon(true);
          addXP(25, 'game1-won', true);
        }
      } else {
        // MISMATCH - show red and reset
        setWrongPairKeys([firstCard.uniqueKey, card.uniqueKey]);
        setTimeout(() => {
          setFirstCard(null);
          setSecondCard(null);
          setWrongPairKeys([]);
        }, 800);
      }
    };

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-xs sm:text-sm text-slate-700 font-medium">
            Ruscha so‘z va uning o‘zbekcha tarjimasini juftlab toping:
          </p>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold text-amber-900 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
              Ball: {score}
            </span>
            <button
              onClick={initGame}
              className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200"
              title="Qayta boshlash"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {isWon ? (
          <div className="p-8 rounded-3xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
            <Trophy className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
            <h3 className="text-xl font-bold text-emerald-950">Ajoyib! Barcha 6 ta juftlik topildi!</h3>
            <p className="text-xs text-emerald-800 font-semibold">+25 XP hisobingizga qo‘shildi!</p>
            <button
              onClick={initGame}
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm"
            >
              Yangi juftliklar bilan o‘ynash
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {cards.map((c) => {
              const isMatched = matchedPairIds.includes(c.pairId);
              const isSelected =
                (firstCard && firstCard.uniqueKey === c.uniqueKey) ||
                (secondCard && secondCard.uniqueKey === c.uniqueKey);
              const isWrong = wrongPairKeys.includes(c.uniqueKey);

              let style = 'bg-white border-slate-200/90 hover:border-purple-300 text-slate-800 hover:shadow-sm';

              if (isSelected) {
                style = 'bg-purple-50 border-purple-500 text-purple-900 font-bold shadow-md scale-105';
              }
              if (isWrong) {
                style = 'bg-red-50 border-red-400 text-red-900 animate-shake';
              }
              if (isMatched) {
                style = 'bg-emerald-50 border-emerald-200 text-emerald-800 font-semibold opacity-70 pointer-events-none';
              }

              return (
                <button
                  key={c.uniqueKey}
                  onClick={() => handleCardClick(c)}
                  className={`p-3.5 rounded-2xl border text-xs sm:text-sm font-semibold transition-all h-24 flex items-center justify-center text-center shadow-sm select-none ${style}`}
                >
                  {c.text}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  // ==========================================
  // GAME 2: СОБЕРИ ПРЕДЛОЖЕНИЕ (Sentence builder - Fixed token IDs)
  // ==========================================
  const Game2SentenceBuilder = () => {
    interface WordToken {
      id: string;
      text: string;
    }

    const [puzzleIdx, setPuzzleIdx] = useState<number>(0);
    const [selectedTokens, setSelectedTokens] = useState<WordToken[]>([]);
    const [poolTokens, setPoolTokens] = useState<WordToken[]>([]);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    const currentPuzzle = SENTENCE_PUZZLES[puzzleIdx] || SENTENCE_PUZZLES[0];

    const loadPuzzle = (idx: number) => {
      const p = SENTENCE_PUZZLES[idx];
      const tokens: WordToken[] = p.scrambledWords.map((word, wIdx) => ({
        id: `${p.id}-${wIdx}-${word}`,
        text: word
      }));
      setPoolTokens([...tokens].sort(() => 0.5 - Math.random()));
      setSelectedTokens([]);
      setIsCorrect(null);
    };

    useEffect(() => {
      loadPuzzle(puzzleIdx);
    }, [puzzleIdx]);

    const handlePickToken = (token: WordToken) => {
      setSelectedTokens([...selectedTokens, token]);
      setPoolTokens(poolTokens.filter((t) => t.id !== token.id));
      setIsCorrect(null);
    };

    const handleRemoveToken = (token: WordToken) => {
      setSelectedTokens(selectedTokens.filter((t) => t.id !== token.id));
      setPoolTokens([...poolTokens, token]);
      setIsCorrect(null);
    };

    const handleCheck = () => {
      const built = selectedTokens.map((t) => t.text).join(' ');
      const normalize = (s: string) => s.toLowerCase().replace(/[.,!?;:]/g, '').replace(/\s+/g, ' ').trim();
      const builtNorm = normalize(built);
      const targetNorm = normalize(currentPuzzle.targetSentenceRu);
      const isMatch =
        builtNorm === targetNorm ||
        Boolean(currentPuzzle.acceptableVariants && currentPuzzle.acceptableVariants.some((v) => normalize(v) === builtNorm));

      if (isMatch) {
        setIsCorrect(true);
        addXP(15, `game2-${currentPuzzle.id}`, true);
        speak(currentPuzzle.targetSentenceRu);
      } else {
        setIsCorrect(false);
      }
    };

    const handleNext = () => {
      setPuzzleIdx((prev) => (prev + 1) % SENTENCE_PUZZLES.length);
    };

    return (
      <div className="space-y-6 text-left">
        <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 uppercase tracking-wider">
            O‘zbekcha tarjimasi:
          </span>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
            «{currentPuzzle.translationUz}»
          </h3>
        </div>

        {/* Selected Words Area (Sentence placeholder) */}
        <div className="min-h-[75px] p-4 rounded-2xl bg-white border-2 border-dashed border-purple-200 flex flex-wrap items-center gap-2">
          {selectedTokens.length === 0 ? (
            <span className="text-xs text-slate-600">
              Quyidagi aralashgan so‘zlarni ketma-ket bosib, to‘g‘ri gapni yig‘ing...
            </span>
          ) : (
            selectedTokens.map((t) => (
              <button
                key={t.id}
                onClick={() => handleRemoveToken(t)}
                className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
              >
                <span>{t.text}</span>
                <span className="text-purple-200 text-[10px]">✕</span>
              </button>
            ))
          )}
        </div>

        {/* Pool of Scrambled Words */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-700">Mavjud so‘zlar:</span>
          <div className="flex flex-wrap items-center gap-2">
            {poolTokens.map((t) => (
              <button
                key={t.id}
                onClick={() => handlePickToken(t)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-800 hover:bg-purple-100 hover:text-purple-900 border border-slate-200 text-xs font-semibold shadow-sm transition-all"
              >
                {t.text}
              </button>
            ))}
          </div>
        </div>

        {/* Result Message */}
        {isCorrect !== null && (
          <div
            className={`p-3.5 rounded-xl border text-xs font-bold ${
              isCorrect ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-red-50 border-red-300 text-red-900'
            }`}
          >
            {isCorrect ? '✓ To‘g‘ri! Gap to‘liq va savodli tuzildi (+15 XP)!' : '✕ Noto‘g‘ri tartib! So‘zlarni qayta terib ko‘ring.'}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => loadPuzzle(puzzleIdx)}
            className="flex items-center gap-1 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Qayta tozalash</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCheck}
              disabled={selectedTokens.length === 0}
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white text-xs font-bold shadow-sm"
            >
              Tekshirish
            </button>
            <button
              onClick={handleNext}
              className="flex items-center gap-1 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold"
            >
              <span>Keyingi gap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ==========================================
  // GAME 3: ГЛАГОЛ ИЛИ СУЩЕСТВИТЕЛЬНОЕ?
  // ==========================================
  const Game3PartOfSpeech = () => {
    const [itemIdx, setItemIdx] = useState<number>(0);
    const [score, setScore] = useState<number>(0);
    const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

    const currentItem = PARTS_OF_SPEECH_ITEMS[itemIdx];

    const handleClassify = (chosen: 'verb' | 'noun') => {
      if (feedback !== null) return;
      speak(currentItem.wordRu);
      if (chosen === currentItem.type) {
        setScore((prev) => prev + 10);
        setFeedback('correct');
        addXP(10, `game3-${currentItem.id}`);
      } else {
        setFeedback('wrong');
      }

      setTimeout(() => {
        setFeedback(null);
        setItemIdx((prev) => (prev + 1) % PARTS_OF_SPEECH_ITEMS.length);
      }, 700);
    };

    return (
      <div className="space-y-6 text-center max-w-lg mx-auto">
        <div className="flex justify-between items-center text-xs text-slate-600">
          <span className="font-semibold">So‘z {itemIdx + 1} / {PARTS_OF_SPEECH_ITEMS.length}</span>
          <span className="font-mono text-amber-900 font-bold bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
            Ball: {score}
          </span>
        </div>

        {/* Word Display */}
        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {currentItem.wordRu}
          </h3>
          <p className="text-sm font-semibold text-purple-700">
            «{currentItem.wordUz}»
          </p>
          {feedback === 'correct' && (
            <p className="text-xs font-bold text-emerald-600 animate-bounce pt-2">✓ To‘g‘ri! (+10 XP)</p>
          )}
          {feedback === 'wrong' && (
            <p className="text-xs font-bold text-red-600 pt-2">✕ Noto‘g‘ri so‘z turkumi!</p>
          )}
        </div>

        {/* 2 Choice Baskets */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => handleClassify('verb')}
            className="p-5 rounded-2xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-950 font-bold text-sm shadow-sm hover:scale-105 transition-all"
          >
            <div className="text-xs text-purple-600 mb-1">Что делать?</div>
            <div>ГЛАГОЛ (Fe’l)</div>
          </button>

          <button
            onClick={() => handleClassify('noun')}
            className="p-5 rounded-2xl bg-cyan-50 hover:bg-cyan-100 border border-cyan-200 text-cyan-950 font-bold text-sm shadow-sm hover:scale-105 transition-all"
          >
            <div className="text-xs text-cyan-600 mb-1">Что?</div>
            <div>СУЩЕСТВИТЕЛЬНОЕ (Ot)</div>
          </button>
        </div>
      </div>
    );
  };

  // ==========================================
  // GAME 4: ПРОЦЕНТНЫЙ ВЫЗОВ (Percentage challenge)
  // ==========================================
  const Game4Percentage = () => {
    const [challengeIdx, setChallengeIdx] = useState<number>(0);
    const [selectedOpt, setSelectedOpt] = useState<string | null>(null);

    const currentChallenge = PERCENTAGE_CHALLENGES[challengeIdx] || PERCENTAGE_CHALLENGES[0];
    const isCorrect = selectedOpt === currentChallenge.correctText;

    const handlePick = (opt: string) => {
      setSelectedOpt(opt);
      if (opt === currentChallenge.correctText) {
        addXP(10, `game4-${currentChallenge.id}`);
        speak(opt);
      }
    };

    const handleNext = () => {
      setSelectedOpt(null);
      setChallengeIdx((prev) => (prev + 1) % PERCENTAGE_CHALLENGES.length);
    };

    return (
      <div className="space-y-6 max-w-lg mx-auto text-center">
        <div>
          <span className="text-xs text-purple-700 font-bold uppercase tracking-wider">
            Qaysi shakl to‘g‘ri?
          </span>
          <div className="text-5xl font-black text-cyan-600 font-mono mt-2">
            {currentChallenge.number} %
          </div>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {currentChallenge.options.map((opt, idx) => {
            const isSelected = selectedOpt === opt;
            let btnClass = 'bg-white border-slate-200 hover:border-purple-300 text-slate-800';

            if (selectedOpt !== null) {
              if (opt === currentChallenge.correctText) {
                btnClass = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold';
              } else if (isSelected) {
                btnClass = 'bg-red-50 border-red-400 text-red-950';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handlePick(opt)}
                disabled={selectedOpt !== null}
                className={`p-3.5 rounded-2xl border text-xs sm:text-sm font-semibold transition-all shadow-sm ${btnClass}`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {/* Rule Hint & Status */}
        {selectedOpt !== null && (
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
            <p className={`font-bold ${isCorrect ? 'text-emerald-700' : 'text-red-700'}`}>
              {isCorrect ? '✓ To‘g‘ri javob! (+10 XP)' : '✕ Noto‘g‘ri variant!'}
            </p>
            <p className="font-semibold text-cyan-800">Qoida izohi:</p>
            <p>{currentChallenge.ruleHintUz}</p>
          </div>
        )}

        <div className="flex justify-end pt-2">
          <button
            onClick={handleNext}
            className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-sm"
          >
            Keyingi son ➔
          </button>
        </div>
      </div>
    );
  };

  // ==========================================
  // GAME 5: ПАДЕЖНЫЙ ТРЕНАЖЁР (Case trainer)
  // ==========================================
  const Game5CaseTrainer = () => {
    const [itemIdx, setItemIdx] = useState<number>(0);
    const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
    const [isDone, setIsDone] = useState<boolean>(false);

    const currentItem = CASE_TRAINER_ITEMS[itemIdx] || CASE_TRAINER_ITEMS[0];

    const handlePick = (opt: string) => {
      setSelectedOpt(opt);
      setIsDone(true);
      if (opt === currentItem.correctAnswer) {
        addXP(10, `game5-${currentItem.id}`, true);
        speak(currentItem.sentenceWithBlankRu.replace('________', opt));
      }
    };

    const handleNext = () => {
      setSelectedOpt(null);
      setIsDone(false);
      setItemIdx((prev) => (prev + 1) % CASE_TRAINER_ITEMS.length);
    };

    return (
      <div className="space-y-6 max-w-xl mx-auto text-left">
        <div className="p-5 rounded-2xl bg-purple-50/70 border border-purple-200">
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 uppercase">
            {currentItem.targetCaseName}
          </span>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-2">
            {currentItem.sentenceWithBlankRu.replace('________', `[ ${selectedOpt || '...'} ]`)}
          </h3>
          <p className="text-xs text-slate-500 italic mt-1">
            Tarjimasi: {currentItem.sentenceUz}
          </p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-3">
          {currentItem.options.map((opt, idx) => {
            const isSelected = selectedOpt === opt;
            let btnClass = 'bg-white border-slate-200 hover:border-purple-300 text-slate-800';

            if (isDone) {
              if (opt === currentItem.correctAnswer) {
                btnClass = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold';
              } else if (isSelected) {
                btnClass = 'bg-red-50 border-red-400 text-red-950';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handlePick(opt)}
                disabled={isDone}
                className={`p-3.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all shadow-sm ${btnClass}`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {isDone && (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
            <p className="font-bold text-cyan-800">Tushuntirish:</p>
            <p>{currentItem.explanationUz}</p>
          </div>
        )}

        <div className="flex justify-end pt-2">
          <button
            onClick={handleNext}
            className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-sm"
          >
            Keyingi gap ➔
          </button>
        </div>
      </div>
    );
  };

  // ==========================================
  // GAME 6: ПОСЛУШАЙ И ОТВЕТЬ (Audio prompt)
  // ==========================================
  const Game6AudioQuiz = () => {
    const [itemIdx, setItemIdx] = useState<number>(0);
    const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
    const [isDone, setIsDone] = useState<boolean>(false);

    const currentItem = AUDIO_GAME_ITEMS[itemIdx] || AUDIO_GAME_ITEMS[0];

    const handlePick = (idx: number) => {
      setSelectedIdx(idx);
      setIsDone(true);
      if (idx === currentItem.correctIndex) {
        addXP(15, `game6-${currentItem.id}`, true);
      }
    };

    const handleNext = () => {
      setSelectedIdx(null);
      setIsDone(false);
      setItemIdx((prev) => (prev + 1) % AUDIO_GAME_ITEMS.length);
    };

    return (
      <div className="space-y-6 max-w-xl mx-auto text-left">
        <div className="p-6 rounded-3xl bg-cyan-50/70 border border-cyan-200 text-center space-y-3">
          <button
            onClick={() => speak(currentItem.audioPromptRu)}
            className="px-6 py-3 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md inline-flex items-center gap-2 hover:scale-105 transition-all"
          >
            <Volume2 className="w-5 h-5" />
            <span>Audioni eshitish uchun bosing</span>
          </button>
          <p className="text-xs text-slate-600">
            Jumlani diqqat bilan tinglang va savolga to‘g‘ri javobni tanlang.
          </p>
        </div>

        <div className="space-y-2">
          <h4 className="font-bold text-sm text-slate-900">
            Savol: {currentItem.questionUz}
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            {currentItem.optionsRu.map((opt, idx) => {
              const isSelected = selectedIdx === idx;
              let btnClass = 'bg-white border-slate-200 text-slate-800 hover:border-purple-300';

              if (isDone) {
                if (idx === currentItem.correctIndex) {
                  btnClass = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold';
                } else if (isSelected) {
                  btnClass = 'bg-red-50 border-red-400 text-red-950';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handlePick(idx)}
                  disabled={isDone}
                  className={`p-3.5 rounded-xl border text-xs sm:text-sm font-semibold text-left transition-all shadow-sm ${btnClass}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>

        {isDone && (
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
            {currentItem.explanationUz}
          </div>
        )}

        <div className="flex justify-end pt-2">
          <button
            onClick={handleNext}
            className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold"
          >
            Keyingi savol ➔
          </button>
        </div>
      </div>
    );
  };

  // ==========================================
  // GAME 7: БИТВА ЗНАНИЙ (60s speed trivia)
  // ==========================================
  const Game7KnowledgeBattle = () => {
    const [timeLeft, setTimeLeft] = useState<number>(60);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [qIdx, setQIdx] = useState<number>(0);
    const [score, setScore] = useState<number>(0);
    const [gameOver, setGameOver] = useState<boolean>(false);

    useEffect(() => {
      if (!isActive) return;
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsActive(false);
            setGameOver(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }, [isActive]);

    useEffect(() => {
      if (gameOver && score > 0) {
        addXP(score, 'game7-win', true);
      }
    }, [gameOver, score, addXP]);

    const startBattle = () => {
      setTimeLeft(60);
      setScore(0);
      setQIdx(0);
      setGameOver(false);
      setIsActive(true);
    };

    const currentQ = BATTLE_QUESTIONS[qIdx % BATTLE_QUESTIONS.length];

    const handleAnswer = (optionIdx: number) => {
      if (!isActive) return;
      if (optionIdx === currentQ.correctIndex) {
        setScore((prev) => prev + currentQ.points);
      }
      setQIdx((prev) => prev + 1);
    };

    return (
      <div className="space-y-6 max-w-xl mx-auto text-center">
        {!isActive && !gameOver ? (
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <Trophy className="w-12 h-12 text-amber-500 mx-auto" />
            <h3 className="text-2xl font-black text-slate-900">60 Soniyalik Bilimlar Jangi</h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
              1 daqiqa ichida rus tili qoidalari va so‘zlariga doir imkon qadar ko‘proq to‘g‘ri javob bering va maksimal XP to‘plang!
            </p>
            <button
              onClick={startBattle}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-md"
            >
              Jangni boshlash (60 soniya)
            </button>
          </div>
        ) : gameOver ? (
          <div className="p-8 rounded-3xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
            <Trophy className="w-14 h-14 text-emerald-600 mx-auto animate-bounce" />
            <h3 className="text-2xl font-extrabold text-slate-900">Vaqt tugadi! Ajoyib natija!</h3>
            <p className="text-xl font-mono font-bold text-emerald-700">
              To‘plangan ball: {score} XP
            </p>
            <button
              onClick={startBattle}
              className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs"
            >
              Qaytadan o‘ynash
            </button>
          </div>
        ) : (
          <div className="space-y-5 text-left">
            <div className="flex justify-between items-center p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-1.5 text-slate-800 text-xs font-mono font-bold">
                <Clock className="w-4 h-4 text-purple-600" />
                <span>00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}</span>
              </div>
              <div className="text-amber-900 text-xs font-mono font-bold">
                Ball: {score} XP
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
              <h4 className="text-base font-bold text-slate-900">
                {currentQ.questionRu}
              </h4>
              <p className="text-xs text-slate-500 italic">
                {currentQ.questionUz}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {currentQ.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  className="p-3.5 rounded-xl bg-slate-50 hover:bg-purple-600 hover:text-white text-slate-800 text-xs sm:text-sm font-semibold transition-all border border-slate-200 text-left"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8 py-4 max-w-5xl mx-auto text-left">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-2 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200">
              <Gamepad2 className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold text-indigo-700 tracking-wider uppercase">
              7 ta interaktiv o‘quv o‘yini
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            O‘quv O‘yinlari Arenasi
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Qiziqarli treynajorlar yordamida so‘zlar, grammatika va nutqni maroqli mustahkamlang!
          </p>
        </div>
      </div>

      {/* Game Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {gameTabs.map((g) => (
          <button
            key={g.id}
            onClick={() => setActiveGameId(g.id)}
            className={`flex-shrink-0 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all text-left ${
              activeGameId === g.id
                ? 'bg-purple-600 text-white shadow-sm border border-purple-500'
                : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
            }`}
          >
            <div>{g.nameRu}</div>
            <div className={`text-[10px] font-normal ${activeGameId === g.id ? 'text-purple-200' : 'text-slate-500'}`}>
              {g.nameUz}
            </div>
          </button>
        ))}
      </div>

      {/* Render Active Game */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm">
        {activeGameId === 1 && <Game1MatchPairs />}
        {activeGameId === 2 && <Game2SentenceBuilder />}
        {activeGameId === 3 && <Game3PartOfSpeech />}
        {activeGameId === 4 && <Game4Percentage />}
        {activeGameId === 5 && <Game5CaseTrainer />}
        {activeGameId === 6 && <Game6AudioQuiz />}
        {activeGameId === 7 && <Game7KnowledgeBattle />}
      </div>
    </div>
  );
};
